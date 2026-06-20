// =============================================================
//  사이트 전역 콘텐츠 (단일 소스)
//  공지를 제외한 모든 텍스트/링크/운영진 정보를 여기서 관리합니다.
//  값만 바꾸고 저장 → git push 하면 자동 배포됩니다.
// =============================================================

export const site = {
  // 기본 정보
  name: '노란집',
  nameEn: 'Yellow House',
  tagline: '작고 다정한 미스키 체리픽 서버',

  // 히어로(상단) 카피 — 테마별로 분위기가 조금씩 다릅니다.
  hero: {
    // 테마 A (그림책)
    a: {
      title: '햇살 드는<br>작은 둥지',
      sub: 'A cozy little corner of the fediverse —<br>where the timeline moves a little slower.',
    },
    // 테마 B (미니멀)
    b: {
      eyebrow: 'Misskey · CherryPick',
      title: '작고 다정한<br><span class="accent">둥지</span> 같은 서버',
      desc: '천천히 흐르는 타임라인을 좋아하는 사람들을 위한 작은 공간. 부담 없이 머무르고, 가볍게 하루를 나눠요.',
      sub: 'A cozy corner of the fediverse for a slower timeline.',
    },
    // 테마 C (팝)
    c: {
      badge: '미스키 체리픽 서버',
      title: '삐약삐약<br>모이는 곳',
      desc: '천천히 흐르는 타임라인,<br>다정한 사람들이 모인 작은 둥지예요.',
    },
  },

  // 서버 소개
  about: {
    title: '천천히, 다정하게',
    bodyA:
      '노란집은 천천히 흐르는 시간을 좋아하는 사람들이 모인 작은 미스키 체리픽 서버예요. 서로의 하루를 가볍게 나누고, 부담 없이 머무를 수 있는 공간을 지향해요.',
    subEn: 'A small Misskey (CherryPick) server for a slower, gentler timeline.',
    bodyB:
      '노란집은 ‘천천히, 다정하게’를 모토로 하는 작은 미스키 체리픽 서버예요. 큰 화제보다 소소한 일상의 기록을 환영해요.',
    bodyC:
      '노란집은 작은 일상의 기록을 환영하는 미스키 체리픽 서버예요. 부담 없이 머무를 수 있는 공간을 함께 만들어가요.',
  },

  // 컨셉 칩
  concepts: [
    { ko: '천천히', en: 'Slow' },
    { ko: '다정하게', en: 'Kind' },
    { ko: '작게', en: 'Small' },
  ],

  // 가입 방법 (3-step)
  join: [
    { title: '가입 신청', desc: '신청 폼을 작성해 주세요.' },
    { title: '운영진 승인', desc: '1~2일 내에 확인해 드려요.' },
    { title: '환영합니다', desc: '첫 글로 가볍게 인사해 주세요!' },
  ],

  // 서버 규칙
  rules: [
    '서로를 존중하고 다정하게 대해 주세요.',
    '혐오·차별 표현은 허용되지 않아요.',
    '민감한 내용은 CW(접힘)로 올려 주세요.',
    '무단 홍보·스팸은 금지예요.',
  ],

  // 운영진
  staff: [
    { handle: '@hina', role: '서버 운영 · 관리', roleShort: '운영·관리', initial: 'H' },
    { handle: '@yuki', role: '모더레이션 · 신고 처리', roleShort: '모더레이션', initial: 'Y' },
    { handle: '@momo', role: '커뮤니티 · 이벤트', roleShort: '커뮤니티', initial: 'M' },
  ],

  // 후원
  support: {
    amount: '₩40,000',
    note: '부담 없는 선에서의 후원이 큰 힘이 됩니다.',
    url: '#',
  },

  // FAQ
  faq: [
    { q: '초대 코드가 꼭 필요한가요?', a: '아니요, 신청 후 승인제로 운영돼요.' },
    { q: '마스토돈과 다른가요?', a: '체리픽은 미스키 기반이라 사용감이 비슷하지만 더 아기자기해요.' },
    { q: '비공개 서버인가요?', a: '연합(페디버스)과 연결되어 있어요.' },
  ],

  // 외부 링크 — 실제 URL로 교체하세요.
  links: {
    signup: 'https://byongari.com/signup', // 미스키 체리픽 서버 가입 페이지
    discord: '#', // 디스코드 초대
    status: '#', // 서버 상태 페이지
  },
};

export type Site = typeof site;
