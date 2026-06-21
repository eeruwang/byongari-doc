import type { APIRoute } from 'astro';
import { renderCard } from '../../lib/og';
import { inviteCard } from '../../lib/cards';

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderCard(inviteCard());
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
