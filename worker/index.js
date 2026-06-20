/**
 * 노란집 공지 사이트 Worker
 *
 * 정적 자산(dist/)은 Cloudflare가 자동으로 먼저 서빙하고,
 * 자산이 아닌 경로(/auth · /callback)만 이 Worker가 처리합니다.
 *
 * 역할: Sveltia CMS(/admin)의 GitHub 로그인을 위한 OAuth 중개.
 *   /auth     → GitHub 인증 페이지로 이동
 *   /callback → 인증 코드를 토큰으로 교환 후 CMS 창으로 전달
 *
 * 필요한 시크릿(Cloudflare 대시보드 또는 `wrangler secret put`):
 *   - GITHUB_CLIENT_ID
 *   - GITHUB_CLIENT_SECRET
 */

const PROVIDER = 'github';
const STATE_COOKIE = 'yh_oauth_state';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') return handleAuth(request, env, url);
    if (url.pathname === '/callback') return handleCallback(request, env, url);

    // 그 외 비자산 경로는 자산 핸들러로 위임(없으면 404).
    return env.ASSETS.fetch(request);
  },
};

/** 1단계: GitHub 인증 페이지로 리다이렉트 */
function handleAuth(request, env, url) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response(
      'OAuth가 설정되지 않았어요. Cloudflare Worker에 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET 시크릿을 추가하세요.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const provider = url.searchParams.get('provider') || PROVIDER;
  if (provider !== PROVIDER) {
    return new Response('지원하지 않는 provider 예요.', { status: 400 });
  }

  // 비공개 레포 쓰기까지 필요하므로 기본 scope는 repo.
  const scope = url.searchParams.get('scope') || 'repo,user';
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authorize.searchParams.set('scope', scope);
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.href,
      'Set-Cookie': `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}

/** 2단계: code → access_token 교환 후 CMS 창으로 결과 전달 */
async function handleCallback(request, env, url) {
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  const savedState = readCookie(request, STATE_COOKIE);

  if (!code || !returnedState || returnedState !== savedState) {
    return renderResult('error', { error: 'CSRF 검증 실패 또는 코드 누락' }, url.origin);
  }

  let data;
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'sveltia-cms-auth',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/callback`,
      }),
    });
    data = await res.json();
  } catch (e) {
    return renderResult('error', { error: '토큰 교환 요청 실패' }, url.origin);
  }

  if (data.error || !data.access_token) {
    return renderResult('error', { error: data.error_description || '토큰 교환 실패' }, url.origin);
  }

  return renderResult('success', { token: data.access_token, provider: PROVIDER }, url.origin);
}

/** 쿠키 한 개 읽기 */
function readCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

/**
 * 결과를 팝업에서 opener(CMS)로 postMessage 전달.
 * (Decap/Sveltia OAuth 핸드셰이크 프로토콜)
 */
function renderResult(status, payload, origin) {
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payload)}`;
  const expireCookie = `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
  const note =
    status === 'success'
      ? '로그인되었어요. 창이 자동으로 닫혀요.'
      : '로그인에 실패했어요. 이 창을 닫고 다시 시도해 주세요.';

  const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>인증</title></head>
<body style="font-family:sans-serif;padding:24px;color:#3c4a3f">
<p>${note}</p>
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function send(origin) {
    if (window.opener) window.opener.postMessage(msg, origin || '*');
  }
  window.addEventListener('message', function (e) { send(e.origin); }, false);
  // CMS에 "준비됨" 신호 → CMS가 응답하면 위 핸들러가 토큰 전달
  send('*');
  if (window.opener) window.opener.postMessage('authorizing:${PROVIDER}', '*');
})();
</script>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': expireCookie,
    },
  });
}
