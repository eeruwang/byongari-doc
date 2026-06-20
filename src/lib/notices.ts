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
