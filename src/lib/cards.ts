import { fmtFull, type Notice } from './notices';
import { site } from '../data/site';

// satori는 자식이 2개 이상인 요소에 display:flex가 필요하므로 모든 컨테이너에 명시합니다.

/** 병아리 (단색 노랑 + 눈 2 + 삼각 부리) — radial-gradient 대신 satori 안전 버전 */
function chick(size: number): string {
  const h = Math.round(size * 0.94);
  const eye = Math.max(6, Math.round(size * 0.12));
  const eyeTop = Math.round(size * 0.38);
  const eyeSide = Math.round(size * 0.27);
  const bl = Math.max(4, Math.round(size * 0.08));
  const bt = Math.max(7, Math.round(size * 0.14));
  const beakTop = Math.round(size * 0.52);
  const beakLeft = Math.round((size - bl * 2) / 2);
  return `
    <div style="position:relative;display:flex;width:${size}px;height:${h}px;border-radius:50% 50% 48% 48%;background:#F2CE3E">
      <div style="position:absolute;top:${eyeTop}px;left:${eyeSide}px;width:${eye}px;height:${eye}px;border-radius:50%;background:#2b2b2b"></div>
      <div style="position:absolute;top:${eyeTop}px;right:${eyeSide}px;width:${eye}px;height:${eye}px;border-radius:50%;background:#2b2b2b"></div>
      <div style="position:absolute;top:${beakTop}px;left:${beakLeft}px;width:0;height:0;border-left:${bl}px solid transparent;border-right:${bl}px solid transparent;border-top:${bt}px solid #EE7E5A"></div>
    </div>`;
}

function pill(text: string, color: string, bg: string): string {
  return `<div style="display:flex;align-items:center;justify-content:center;line-height:1;font-family:'Jua';font-size:22px;color:${color};background:${bg};padding:13px 24px;border-radius:999px">${esc(text)}</div>`;
}

/** HTML 특수문자 이스케이프 */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 1. 서버 초대 (사이트 기본 OG) */
export function inviteCard(): string {
  return `
  <div style="width:1200px;height:630px;background:#46AEA6;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:56px;font-family:'Gowun Dodum'">
    <div style="display:flex;align-items:center;justify-content:center;line-height:1;font-family:'Jua';font-size:22px;color:#2E8C86;background:#F4C64A;padding:9px 22px;border-radius:999px">미스키 체리픽 서버</div>
    <div style="display:flex;font-family:'Jua';font-size:84px;line-height:1.1;color:#ffffff;margin-top:22px;text-shadow:0 4px 0 rgba(0,0,0,0.1)">삐약삐약 모이는 곳</div>
    <div style="display:flex;max-width:840px;font-family:'Gowun Dodum';font-size:25px;line-height:1.55;color:#EAF6EC;margin-top:16px;text-align:center">천천히 흐르는 타임라인, 다정한 사람들이 모인 작은 둥지예요.</div>
    <div style="display:flex;margin-top:30px">
      <div style="display:flex;align-items:center;justify-content:center;line-height:1;font-family:'Jua';font-size:26px;color:#ffffff;background:#EC5B41;padding:16px 34px;border-radius:999px;box-shadow:0 6px 0 #c8462f">가입 신청하기</div>
    </div>
    <div style="display:flex;gap:14px;margin-top:32px;align-items:flex-end">
      ${chick(58)}${chick(72)}${chick(58)}
    </div>
  </div>`;
}

/** 2. 공지 공유 */
export function noticeCard(notice: Notice): string {
  const d = notice.data;
  const date = fmtFull(d.date);
  const info = d.info ?? [];
  let pills = '';
  if (info.length >= 1) pills += pill(`${info[0].label} ${info[0].value}`, '#3c4a3f', '#F4C64A');
  if (info.length >= 2) pills += pill(info[1].value, '#2E8C86', '#ffffff');
  if (info.length === 0 && d.tags.length > 0) pills += pill(`#${d.tags[0]}`, '#2E8C86', '#ffffff');

  return `
  <div style="width:1200px;height:630px;background:#EC5B41;padding:68px 72px;display:flex;flex-direction:column;justify-content:center;position:relative;font-family:'Jua'">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="display:flex;align-items:center;justify-content:center;line-height:1;font-family:'Jua';font-size:21px;color:#EC5B41;background:#ffffff;padding:9px 20px;border-radius:999px">${esc(d.category)}</div>
      <div style="display:flex;align-items:center;line-height:1;font-family:'Jua';font-size:21px;color:#ffffff;opacity:0.92">${date}</div>
    </div>
    <div style="display:flex;max-width:1010px;font-family:'Jua';font-size:66px;line-height:1.15;color:#ffffff;margin-top:20px;text-shadow:0 3px 0 rgba(0,0,0,0.1)">${esc(d.title)}</div>
    ${pills ? `<div style="display:flex;align-items:center;gap:12px;margin-top:28px;flex-wrap:wrap">${pills}</div>` : ''}
    <div style="display:flex;align-items:center;line-height:1;position:absolute;right:60px;bottom:44px;font-family:'Jua';font-size:24px;color:#ffffff;opacity:0.9">${esc(site.name)} · byongari.com</div>
  </div>`;
}

/** 3. 이벤트 */
export function eventCard(notice: Notice): string {
  const d = notice.data;
  const sub = d.summary ?? '';
  let pills = pill(fmtFull(d.date), '#ffffff', '#46AEA6');
  if (d.tags.length > 0) pills += pill(`참여 #${d.tags[0]}`, '#ffffff', '#2E5FC6');

  return `
  <div style="width:1200px;height:630px;background:#F4C64A;padding:66px 72px;display:flex;flex-direction:column;justify-content:center;position:relative;font-family:'Jua'">
    <div style="position:absolute;top:50px;right:90px;width:20px;height:20px;border-radius:50%;background:#EC5B41"></div>
    <div style="position:absolute;top:130px;right:180px;width:16px;height:16px;border-radius:4px;background:#46AEA6;transform:rotate(18deg)"></div>
    <div style="position:absolute;bottom:70px;left:60px;width:16px;height:16px;border-radius:50%;background:#2E5FC6"></div>
    <div style="display:flex;align-items:center;justify-content:center;line-height:1;font-family:'Jua';font-size:22px;color:#ffffff;background:#EC5B41;padding:10px 22px;border-radius:999px">EVENT</div>
    <div style="display:flex;max-width:1010px;font-family:'Jua';font-size:74px;line-height:1.12;color:#3c2f0a;margin-top:18px">${esc(d.title)}</div>
    ${sub ? `<div style="display:flex;max-width:1010px;font-family:'Gowun Dodum';font-size:24px;line-height:1.5;color:#6b5a2e;margin-top:16px">${esc(sub)}</div>` : ''}
    <div style="display:flex;align-items:center;gap:12px;margin-top:26px;flex-wrap:wrap">${pills}</div>
  </div>`;
}
