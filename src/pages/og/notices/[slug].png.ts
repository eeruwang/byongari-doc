import type { APIRoute, GetStaticPaths } from 'astro';
import { getSortedNotices, type Notice } from '../../../lib/notices';
import { renderCard } from '../../../lib/og';
import { noticeCard, eventCard } from '../../../lib/cards';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const notices = await getSortedNotices();
  return notices.map((notice) => ({ params: { slug: notice.id }, props: { notice } }));
};

export const GET: APIRoute = async ({ props }) => {
  const notice = props.notice as Notice;
  const markup = notice.data.category === '이벤트' ? eventCard(notice) : noticeCard(notice);
  const png = await renderCard(markup);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
