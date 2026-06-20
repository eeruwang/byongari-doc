// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 정적(static) 출력 — Cloudflare Pages가 dist/를 그대로 서빙합니다.
// 서버 런타임/어댑터가 필요 없어 가장 저렴하고 관리가 쉽습니다.
export default defineConfig({
  // ▼▼ 배포할 실제 도메인으로 바꿔주세요 (sitemap·canonical용)
  site: 'https://byongari.example.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
