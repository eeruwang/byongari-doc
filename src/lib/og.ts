import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

// 폰트는 레포에 내장한 TTF를 사용 (외부 의존성 없음, 빌드 타임 로드)
// 빌드 시 cwd는 프로젝트 루트이므로 루트 기준으로 읽습니다.
const fontDir = path.join(process.cwd(), 'src/assets/fonts');
const jua = fs.readFileSync(path.join(fontDir, 'Jua-Regular.ttf'));
const gowun = fs.readFileSync(path.join(fontDir, 'GowunDodum-Regular.ttf'));

const fonts = [
  { name: 'Jua', data: jua, weight: 400, style: 'normal' },
  { name: 'Gowun Dodum', data: gowun, weight: 400, style: 'normal' },
] as any;

// satori-html이 빈 요소를 children:[] 로 내보내면 satori가 오류내므로 빈 배열을 제거
function normalize(node: any): any {
  if (!node || typeof node !== 'object') return node;
  const props = node.props ?? {};
  const c = props.children;
  if (Array.isArray(c)) {
    if (c.length === 0) delete props.children;
    else c.forEach(normalize);
  } else if (c && typeof c === 'object') {
    normalize(c);
  }
  return node;
}

/** 1200×630 OG 카드 HTML 문자열 → PNG 버퍼 */
export async function renderCard(markup: string): Promise<Buffer> {
  // 태그 사이 공백(줄바꿈/들여쓰기)이 텍스트 노드로 잡혀 satori가 오류내는 것을 방지
  const cleaned = markup.replace(/>\s+</g, '><').trim();
  const vnode = normalize(html(cleaned));
  const svg = await satori(vnode as any, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return png;
}
