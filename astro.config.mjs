// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 정적(static) 출력 — dist/를 Cloudflare가 정적 자산으로 서빙하고,
// /auth·/callback 만 worker/index.js 가 처리합니다(어댑터/SSR 불필요).
export default defineConfig({
  // 배포 도메인 (sitemap·canonical용)
  site: 'https://notice.byongari.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
