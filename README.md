# 노란집 — Misskey(CherryPick) 서버 공지·안내 사이트

작고 다정한 미스키 체리픽 서버 **노란집**의 공지·안내 사이트입니다.
서버 소개 · 공지사항(목록/상세) · 가입 방법 · 규칙 · 운영진 · 후원 · FAQ · 링크를 담았고,
상단 스위처로 **3가지 테마(그림책 / 미니멀 / 팝)** 를 실시간 전환할 수 있어요.

- **프레임워크**: [Astro 5](https://astro.build) (정적 출력, JS 최소)
- **호스팅**: Cloudflare Pages
- **공지 작성**: Markdown 파일 + [Pages CMS](https://pagescms.org) 폼 UI

---

## 빠른 시작 (로컬 개발)

```bash
npm install      # 최초 1회
npm run dev      # http://localhost:4321 개발 서버
npm run build    # dist/ 에 정적 사이트 빌드
npm run preview  # 빌드 결과 미리보기
```

---

## 📌 공지 관리 (가장 자주 하는 작업)

### 방법 1. 폼 UI — Pages CMS (코드 몰라도 OK, 설정 간단)

자체 OAuth 앱이나 워커 없이, **호스팅된 Pages CMS로 GitHub 로그인만** 하면 돼요.

1. <https://app.pagescms.org> 접속 → **Sign in with GitHub**
2. 안내에 따라 **Pages CMS GitHub App을 이 레포(`eeruwang/byongari-doc`)에 설치/승인**
3. 레포를 선택하면 루트의 `.pages.yml` 설정을 읽어 **공지 작성 폼**이 떠요
4. 작성·저장 → 레포에 자동 커밋 → Cloudflare 자동 재배포

> 편집 설정은 레포의 [`.pages.yml`](.pages.yml) 에 들어 있어요(컬렉션·필드 정의).

### 방법 2. Markdown 파일 직접 추가 (GitHub에서)

`src/content/notices/` 에 `.md` 파일을 하나 추가하면 공지 하나가 늘어나요.
파일명은 `YYYY-MM-DD-제목.md` 형식을 권장해요 (URL과 정렬에 사용).

```markdown
---
title: 7월 정기 점검 안내
date: 2026-07-20
category: 점검            # 점검 / 업데이트 / 안내 / 이벤트
categoryLabel: 점검 안내   # (선택) 상세 화면 태그 라벨
author: 운영팀
summary: 상세 상단에 보이는 한두 줄 요약.
info:                     # (선택) 일시/영향/내용 박스
  - { label: 일시, value: "7월 20일(일) 03:00~05:00 (KST)" }
  - { label: 영향, value: "타임라인·알림 일시 중단" }
tags: [점검, 공지]        # (선택) 해시태그
pinned: false             # (선택) 상단 고정
---

여기에 본문을 Markdown으로 작성해요.
```

- 홈에는 **최신 3건**, `/notices` 에는 **전체**가 자동 표시돼요.
- 정렬은 **고정글 → 최신 날짜순** 입니다.

---

## ✏️ 공지 외 내용 수정 (서버명·운영진·규칙·FAQ 등)

`src/data/site.ts` 한 파일에서 모두 관리해요. 값만 바꾸고 저장 → 커밋하면 끝.

| 항목 | 위치 |
|---|---|
| 서버명 · 태그라인 · 히어로 문구 | `site.name`, `site.tagline`, `site.hero` |
| 서버 소개 | `site.about` |
| 가입 3단계 | `site.join` |
| 서버 규칙 | `site.rules` |
| 운영진 | `site.staff` |
| 후원 금액·링크 | `site.support` |
| FAQ | `site.faq` |
| 외부 링크(가입폼/디스코드/상태) | `site.links` |

> 가입 신청 폼·디스코드·서버 상태 URL은 `site.links` 에서 **실제 주소로 교체**해 주세요.

배포 도메인은 `astro.config.mjs` 의 `site` 와 `public/robots.txt` 의 Sitemap 주소도 함께 바꿔주세요.

---

## ☁️ Cloudflare Pages 배포

1. 이 레포를 GitHub에 푸시.
2. Cloudflare 대시보드 → **Workers & Pages → Create → Pages → Connect to Git** → 이 레포 선택.
3. 빌드 설정:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. 배포 후 `main` 브랜치에 푸시할 때마다 **자동 재배포**됩니다. (PR마다 프리뷰 URL도 생성)

정적 사이트라 서버 런타임/어댑터/워커가 필요 없고, 무료 티어로 충분해요.
공지 편집은 Pages CMS(호스팅)가 담당하므로 사이트 쪽에 인증 설정이 없습니다.

---

## 🗂 프로젝트 구조

```
src/
├─ content/notices/        # 공지 Markdown (= 공지 하나당 파일 하나)
├─ content.config.ts       # 공지 스키마(frontmatter 정의)
├─ data/site.ts            # 공지 외 모든 사이트 콘텐츠 (단일 소스)
├─ lib/notices.ts          # 공지 정렬·날짜 포맷 헬퍼
├─ layouts/Base.astro      # 헤더 + 테마 스위처 + <head>
├─ components/
│  ├─ Chick.astro          # 병아리 (순수 CSS 도형)
│  ├─ themeA/ (그림책)     # Home / List / Detail
│  ├─ themeB/ (미니멀)     # Home / List / Detail
│  └─ themeC/ (팝)         # Home / List / Detail
└─ pages/
   ├─ index.astro          # /            홈
   └─ notices/
      ├─ index.astro       # /notices     전체 공지
      └─ [...slug].astro   # /notices/:id 공지 상세
public/
├─ uploads/                # 이미지 업로드(운영진 프로필 등)
├─ chick-favicon.png       # 병아리 파비콘
├─ _headers · robots.txt   # Cloudflare 헤더 / 크롤러 규칙
.pages.yml                 # Pages CMS 편집 폼 정의(공지 컬렉션·필드)
```

### 테마 전환 동작 방식

세 테마의 마크업을 모두 함께 렌더한 뒤, `<html data-theme="a|b|c">` 값에 따라
해당 테마 블록만 CSS로 노출해요. 그래서 스위처를 누르면 **JS 왕복 없이 즉시 전환**되고,
선택한 테마는 `localStorage` 에 저장돼 다음 방문에도 유지돼요.

---

## 디자인

색·타이포·간격은 핸드오프 문서(틸 하늘 · 노란 집 · 아기 병아리 톤)를 기준으로 재현했어요.
병아리·집은 이미지가 아니라 **순수 CSS 도형**입니다.
폰트는 Google Fonts(Jua · Gowun Dodum · Gaegu · Fredoka)를 사용해요.
