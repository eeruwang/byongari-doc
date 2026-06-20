import { getCollection, type CollectionEntry } from 'astro:content';

export type Notice = CollectionEntry<'notices'>;

/** 모든 공지를 최신순(고정글 우선)으로 정렬해 반환 */
export async function getSortedNotices(): Promise<Notice[]> {
  const all = await getCollection('notices');
  return all.sort((a, b) => {
    if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

const pad = (n: number) => String(n).padStart(2, '0');

/** 2026.06.18 형식 */
export function fmtFull(d: Date): string {
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

/** 06.18 형식 (월.일) */
export function fmtShort(d: Date): string {
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

/** 2026년 6월 18일 형식 */
export function fmtKorean(d: Date): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 카테고리별 대표 색 (흰 글씨 칩 기준으로 대비가 나오는 색들)
const CATEGORY_COLORS: Record<string, string> = {
  점검: '#EC5B41', // coral
  업데이트: '#46AEA6', // teal
  안내: '#2E5FC6', // blue
  이벤트: '#EBA93A', // orange
};

/** 카테고리 칩 배경/강조 색. 미정의 카테고리는 teal로 폴백. */
export function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? '#46AEA6';
}
