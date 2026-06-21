// =============================================================
//  사이트 전역 콘텐츠 (단일 소스)
//  공지를 제외한 모든 텍스트/링크/운영진 정보를 여기서 관리합니다.
//  값만 바꾸고 저장 → git push 하면 자동 배포됩니다.
// =============================================================

export const site = {
  // 기본 정보
  name: '뵹아리',
  nameEn: 'byongari',
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
      '뵹아리는 천천히 흐르는 시간을 좋아하는 사람들이 모인 작은 미스키 체리픽 서버예요. 서로의 하루를 가볍게 나누고, 부담 없이 머무를 수 있는 공간을 지향해요.',
    subEn: 'A small Misskey (CherryPick) server for a slower, gentler timeline.',
    bodyB:
      '뵹아리는 ‘천천히, 다정하게’를 모토로 하는 작은 미스키 체리픽 서버예요. 큰 화제보다 소소한 일상의 기록을 환영해요.',
    bodyC:
      '뵹아리는 작은 일상의 기록을 환영하는 미스키 체리픽 서버예요. 부담 없이 머무를 수 있는 공간을 함께 만들어가요.',
  },

  // 컨셉 칩
  concepts: [
    { ko: '천천히', en: 'Slow' },
    { ko: '다정하게', en: 'Kind' },
    { ko: '작게', en: 'Small' },
  ],

  // 가입 방법 (3-step) — 오픈 가입(승인·신청 불필요)
  join: [
    { title: '가입하기', desc: 'byongari.com에서 바로 계정을 만들어요.' },
    { title: '프로필 채우기', desc: '사진과 소개를 가볍게 적어요.' },
    { title: '환영합니다', desc: '첫 글로 가볍게 인사해 주세요!' },
  ],

  // 서버 규칙
  rules: [
    '서로를 존중하고 다정하게 대해 주세요.',
    '혐오·차별 표현은 허용되지 않아요.',
    '민감한 내용은 CW(접힘)로 올려 주세요.',
    '무단 홍보·스팸은 금지예요.',
  ],

  // 운영진 (avatar: /uploads/ 에 이미지 파일을 두면 사진으로 표시, 없으면 이니셜)
  staff: [
    {
      handle: '@eeruwang',
      role: '서버 운영 · 관리',
      roleShort: '운영·관리',
      initial: 'E',
      avatar: '/uploads/eeruwang.png',
    },
  ],

  // 후원 (Ko-fi — 핸들이 다르면 url만 바꾸세요)
  support: {
    amount: '₩40,000',
    note: '부담 없는 선에서의 후원이 큰 힘이 됩니다.',
    url: 'https://ko-fi.com/byongari',
    // 사이트 안에서 바로 후원받는 임베드 패널 주소
    embed: 'https://ko-fi.com/byongari/?hidefeed=true&widget=true&embed=true&preview=true',
  },

  // FAQ
  faq: [
    {
      q: '가입 신청이나 초대 코드가 필요합니까?',
      a: '아니요, 초대 코드나 별도의 신청·승인 절차 없이 누구나 byongari.com에서 바로 계정을 만들 수 있습니다. 가입 후에는 프로필을 채우고 첫 글로 가볍게 인사해 주시면 됩니다. 다만 지금은 가입이 열려 있지만, 이후 가입자 수에 따라 초대제로 바뀔 수 있습니다. 서버 규칙에 동의하고 지켜주시는 것만 부탁드립니다.',
    },
    {
      q: '마스토돈과 다릅니까?',
      a: '체리픽은 마스토돈과 같은 페디버스(ActivityPub)라 서로 팔로우하고 소통할 수 있습니다. 다만 마스토돈이 단순·텍스트 중심이라면, 체리픽은 미스키 기반이라 다양한 이모지 리액션, 글 꾸미기(MFM), 커스텀 이모지, 드라이브(파일 관리) 같은 기능이 풍부하고 UI도 더 아기자기합니다.',
    },
    {
      q: '비공개 서버입니까?',
      a: '아니요, 폐쇄형 서버는 아닙니다. 페디버스(연합)에 연결되어 있어서 마스토돈이나 다른 미스키·체리픽 서버의 사람들과도 서로 팔로우하고 소통할 수 있습니다. 다만 작고 조용한 커뮤니티를 지향합니다. 글마다 공개 범위(전체·홈·팔로워·다이렉트)를 직접 정할 수 있어서, 원하는 만큼만 공개하며 쓸 수 있습니다.',
    },
    {
      q: '공개 범위가 무엇입니까?',
      a: '글을 올릴 때 누구에게 보일지 고르는 설정입니다. 체리픽에는 보통 네 가지가 있습니다 — 전체 공개(누구나 볼 수 있고 연합 타임라인까지), 홈(내 팔로워와 홈 타임라인에만), 팔로워(나를 팔로우한 사람에게만), 다이렉트(지정한 사람에게만, DM처럼). 여기에 ‘로컬만(연합 안 함)’ 옵션으로 byongari 서버 안에서만 보이게 할 수도 있습니다. 글마다 자유롭게 바꿀 수 있어서 원하는 만큼만 공개하면 됩니다.',
    },
  ],

  // 외부 링크 — 실제 URL로 교체하세요.
  links: {
    signup: 'https://byongari.com/signup', // 미스키 체리픽 서버 가입 페이지
    contact: 'mailto:admin@byongari.com', // 문의 메일
    status: 'https://watch.byongari.com/', // 서버 상태 페이지
  },

  // 서버 상태 배지 + 운영 시작일
  status: {
    badge: 'https://watch.byongari.com/badge', // ?theme=dark|light 로 임베드
    url: 'https://watch.byongari.com/',
    since: '2025.10.24', // 운영 시작일
  },
};

export type Site = typeof site;
