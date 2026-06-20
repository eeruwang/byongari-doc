import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 공지 컬렉션 — src/content/notices/*.md 파일 하나가 공지 하나입니다.
// 새 공지를 올리려면 이 폴더에 .md 파일을 추가하면 됩니다.
const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: z.object({
    title: z.string(),
    // 작성 날짜 (목록·상세 정렬·표시에 사용)
    date: z.coerce.date(),
    // 카테고리: 점검 / 업데이트 / 안내 / 이벤트 등
    category: z.string(),
    // 상세 화면 상단 태그 라벨 (없으면 category 사용)
    categoryLabel: z.string().optional(),
    // 작성자 표기
    author: z.string().default('운영팀'),
    // 상세 본문 위의 짧은 인트로 (없으면 본문만 노출)
    summary: z.string().optional(),
    // 핵심정보 박스 (일시 / 영향 / 내용 등) — 없으면 표시 안 함
    info: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    // 해시태그 (#점검 #공지)
    tags: z.array(z.string()).default([]),
    // 상단 고정 여부 (선택)
    pinned: z.boolean().default(false),
  }),
});

export const collections = { notices };
