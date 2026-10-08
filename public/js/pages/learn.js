/* My Learning: four modules, listening map lessons, picture notes, and checked practice. */
import { esc, ic, hero, shell, store, today, url } from "../core.js?v=5";

export const learnState = { mod: "listening", group: "all", day: today() };
export const mapTries = { farm: { picks: {}, result: null } };
export const mapTry = mapTries.farm;
export function mapAttempt(id) {
  if (!mapTries[id]) mapTries[id] = { picks: {}, result: null };
  return mapTries[id];
}

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const KEY = { 15: "F", 16: "G", 17: "D", 18: "H", 19: "C", 20: "A" };
const QS = [
  { n: 15, name: "Scarecrow", why: "In the car park, in the corner, beside the main path." },
  { n: 16, name: "Maze", why: "Look ahead: opposite the New Barn, beside the side path." },
  { n: 17, name: "Café", why: "Turn right just before the bridge. It is on the first bend." },
  { n: 18, name: "Black Barn", why: "Take the side path to the right by the New Barn, where that path first bends." },
  { n: 19, name: "Covered picnic area", why: "Just after you cross the bridge, on the right." },
  { n: 20, name: "Fiddy House", why: "Cross the bridge, then the building at the top, to the left of the farmyard." }
];

const MODS = [
  ["reading", "book", "green", "Reading"],
  ["writing", "pen", "violet", "Writing"],
  ["speaking", "mic", "red", "Speaking"],
  ["listening", "head", "blue", "Listening"]
];

function frame(bg, inner) {
  return `<svg class="note-pic" viewBox="0 0 220 128" aria-hidden="true"><rect width="220" height="128" fill="${bg}"/>${inner}</svg>`;
}
function txt(x, y, s, size = 11, fill = "#243056") {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="${size}" font-weight="800" fill="${fill}">${s}</text>`;
}
function you(x, y, dir = "n") {
  const rot = { e: 0, s: 90, w: 180, n: -90 }[dir];
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="10" fill="#1b8fe8" stroke="#fff" stroke-width="2"/><path d="M-1 -5.2 L11 0 L-1 5.2 Z" fill="#fff"/></g>`;
}
function pin(x, y) {
  return `<circle cx="${x}" cy="${y}" r="8" fill="#fff" stroke="#ec315a" stroke-width="3"/><circle cx="${x}" cy="${y}" r="3.2" fill="#ec315a"/>`;
}
function arrow(x1, y1, x2, y2, color = "#ec315a") {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const L = 9;
  const a = 0.48;
  const bx = x2 - Math.cos(ang) * 2;
  const by = y2 - Math.sin(ang) * 2;
  const p = (d) => [x2 - L * Math.cos(ang + d), y2 - L * Math.sin(ang + d)];
  const [x3, y3] = p(-a);
  const [x4, y4] = p(a);
  return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/><path d="M${x2} ${y2} L${x3.toFixed(1)} ${y3.toFixed(1)} L${x4.toFixed(1)} ${y4.toFixed(1)} Z" fill="${color}"/>`;
}
function pathV(x, y1, y2) {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#efd7ae" stroke-width="16" stroke-linecap="round"/><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#c4a06a" stroke-width="1.6" stroke-dasharray="1 7"/>`;
}
function barn(x, y, w, h, fill = "#e07a45") {
  return `<path d="M${x} ${y + 12} L${x + w / 2} ${y} L${x + w} ${y + 12} V${y + h} H${x} Z" fill="${fill}"/><rect x="${x + w / 2 - 6}" y="${y + h - 16}" width="12" height="16" fill="#fff6ea"/>`;
}

function farm(extra) {
  return frame("#e7f6df", `${pathV(108, 18, 116)}${txt(46, 22, "path", 10, "#8a6a3b")}${you(108, 104, "n")}${extra}`);
}
function block(x, y, w, h, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="#8aa0c8"/>`;
}
function ellipse(x, y, rx, ry) {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#8fd4f2"/>`;
}
function campus(extra) {
  return frame("#eef3ff", `<rect x="102" y="16" width="14" height="100" rx="4" fill="#d7deee"/>${extra}${you(109, 108, "n")}`);
}
function park(extra) {
  return frame("#f3fff6", `<path d="M34 14 C46 48 30 78 42 116" fill="none" stroke="#8fd4f2" stroke-width="16" stroke-linecap="round"/><rect x="108" y="16" width="12" height="100" rx="3" fill="#d7deee"/><circle cx="114" cy="58" r="20" fill="none" stroke="#d5deef" stroke-width="7"/>${extra}${you(114, 108, "n")}`);
}

const PICS = {
  compass() {
    return `<svg class="note-pic" viewBox="0 0 320 158" aria-hidden="true">
      <rect width="320" height="158" fill="#eef3ff"/>
      <circle cx="118" cy="78" r="46" fill="#fff" stroke="#d5def5" stroke-width="2"/>
      <polygon points="118,40 126,78 118,70 110,78" fill="#ec315a"/>
      <polygon points="118,116 126,78 118,86 110,78" fill="#b7c3de"/>
      <polygon points="80,78 118,70 110,78 118,86" fill="#b7c3de"/>
      <polygon points="156,78 118,70 126,78 118,86" fill="#1b8fe8"/>
      <text x="118" y="28" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#ec315a">N</text>
      <text x="176" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#1b8fe8">E</text>
      <text x="118" y="140" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#66709a">S</text>
      <text x="58" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#66709a">W</text>
      <text x="210" y="42" font-family="Noto Serif Bengali, serif" font-size="14" font-weight="650" fill="#ec315a">উত্তর</text>
      <text x="210" y="74" font-family="Noto Serif Bengali, serif" font-size="14" font-weight="650" fill="#1b8fe8">পূর্ব</text>
      <text x="210" y="106" font-family="Noto Serif Bengali, serif" font-size="14" font-weight="650" fill="#243056">দক্ষিণ</text>
      <text x="210" y="138" font-family="Noto Serif Bengali, serif" font-size="14" font-weight="650" fill="#243056">পশ্চিম</text>
    </svg>`;
  },
  next() {
    return frame("#f3f8ff", `<rect x="24" y="36" width="78" height="52" rx="12" fill="#1b8fe8"/>${txt(63, 66, "YOU", 13, "#fff")}<rect x="118" y="36" width="78" height="52" rx="12" fill="#ffe0cc"/>${txt(157, 66, "place", 13)}${txt(110, 112, "next to", 12, "#ec315a")}`);
  },
  front() {
    return frame("#f3f8ff", `<rect x="74" y="16" width="72" height="40" rx="8" fill="#ffe0cc"/>${txt(110, 40, "place", 12)}${you(110, 96, "n")}${txt(110, 70, "in front", 12, "#ec315a")}`);
  },
  behind() {
    return frame("#f3f8ff", `${you(110, 34, "n")}<rect x="74" y="70" width="72" height="40" rx="8" fill="#ffe0cc"/>${txt(110, 94, "place", 12)}${txt(168, 94, "behind", 12, "#ec315a")}`);
  },
  between() {
    return frame("#f3f8ff", `<circle cx="46" cy="64" r="22" fill="#8fd4a4"/><circle cx="174" cy="64" r="22" fill="#8fd4a4"/>${pin(110, 64)}${txt(110, 112, "between", 12, "#ec315a")}`);
  },
  opposite() {
    return frame("#f3f8ff", `<rect x="70" y="12" width="80" height="28" rx="8" fill="#ffe0cc"/>${txt(110, 30, "place", 11)}<rect x="16" y="52" width="188" height="12" rx="6" fill="#efd7ae"/>${txt(168, 80, "opposite", 11, "#ec315a")}${you(110, 104, "n")}`);
  },
  along() {
    return frame("#f3f8ff", `${pathV(70, 16, 112)}<path d="M108 108 C108 70 108 50 108 20" fill="none" stroke="#ec315a" stroke-width="3" stroke-dasharray="2 7"/>${you(108, 100, "n")}${txt(156, 28, "along", 12, "#ec315a")}`);
  },
  across() {
    return frame("#f3f8ff", `<rect x="16" y="54" width="188" height="20" rx="6" fill="#d9dde8"/>${txt(110, 68, "road", 11, "#66709a")}${arrow(110, 112, 110, 22)}${txt(156, 28, "across", 12, "#ec315a")}`);
  },
  through() {
    return frame("#f3f8ff", `<rect x="68" y="24" width="84" height="80" rx="8" fill="#e4dcff" stroke="#7240e8" stroke-width="3"/><path d="M96 104 V62 a14 14 0 0 1 28 0 V104" fill="#f3f8ff"/>${arrow(28, 84, 92, 84)}${arrow(128, 84, 196, 84)}${txt(110, 18, "through", 12, "#7240e8")}`);
  },
  towards() {
    return frame("#f3f8ff", `${barn(138, 36, 58, 58)}${you(42, 78, "e")}${arrow(58, 70, 128, 62)}${txt(96, 112, "towards", 12, "#ec315a")}`);
  },
  into() {
    return frame("#f3f8ff", `<rect x="78" y="22" width="92" height="86" rx="8" fill="#ffe0cc"/><rect x="110" y="58" width="28" height="50" rx="4" fill="#fff"/>${arrow(28, 84, 108, 84)}${txt(124, 42, "into", 12, "#ec315a")}`);
  },
  outof() {
    return frame("#f3f8ff", `<rect x="24" y="22" width="92" height="86" rx="8" fill="#ffe0cc"/><rect x="56" y="58" width="28" height="50" rx="4" fill="#fff"/>${arrow(88, 80, 176, 80)}${you(186, 80, "e")}${txt(150, 40, "out of", 12, "#ec315a")}`);
  },
  near() {
    return frame("#f3f8ff", `${pin(86, 62)}${pin(128, 62)}${txt(110, 108, "near", 12, "#ec315a")}`);
  },
  far() {
    return frame("#f3f8ff", `${pin(36, 62)}${pin(184, 62)}<line x1="52" y1="62" x2="168" y2="62" stroke="#ec315a" stroke-dasharray="4 5"/>${txt(110, 108, "far", 12, "#ec315a")}`);
  },
  corner() {
    return frame("#f3f8ff", `<path d="M36 22 H184 V50 H78 V108 H36 Z" fill="#e3ebf8" stroke="#8aa4cc" stroke-width="3"/>${pin(78, 50)}${txt(140, 92, "corner", 12, "#ec315a")}`);
  },
  proceed() {
    return frame("#f3fff8", `${pathV(110, 18, 116)}${arrow(110, 100, 110, 28)}${txt(158, 36, "proceed", 12, "#0d8a5b")}`);
  },
  turn() {
    return frame("#f3fff8", `<path d="M70 110 V48 H168" fill="none" stroke="#efd7ae" stroke-width="16" stroke-linejoin="round" stroke-linecap="round"/>${arrow(70, 96, 70, 56)}${arrow(86, 48, 150, 48)}${txt(150, 78, "turn", 12, "#0d8a5b")}`);
  },
  continue() {
    return frame("#f3fff8", `${pathV(110, 16, 116)}<circle cx="110" cy="78" r="7" fill="#12a36d"/>${arrow(110, 108, 110, 28)}${txt(160, 78, "continue", 11, "#0d8a5b")}`);
  },
  straight() {
    return frame("#f3fff8", `${pathV(110, 16, 116)}${arrow(110, 104, 110, 26)}${txt(162, 40, "straight", 12, "#0d8a5b")}`);
  },
  follow() {
    return frame("#f3fff8", `<path d="M48 100 C80 100 80 30 150 30" fill="none" stroke="#12a36d" stroke-width="3" stroke-dasharray="2 8"/>${you(58, 96, "e")}${txt(150, 78, "follow", 12, "#0d8a5b")}`);
  },
  cross() {
    return frame("#f3fff8", `<rect x="16" y="54" width="188" height="18" rx="6" fill="#d9dde8"/>${arrow(110, 112, 110, 20)}${txt(158, 40, "cross", 12, "#0d8a5b")}`);
  },
  pass() {
    return frame("#f3fff8", `${barn(78, 28, 64, 62)}${arrow(36, 108, 36, 70)}${arrow(36, 70, 180, 70)}${txt(160, 108, "pass", 12, "#0d8a5b")}`);
  },
  enter() {
    return frame("#f3fff8", `<rect x="86" y="20" width="84" height="92" rx="8" fill="#ffe0cc"/><rect x="112" y="62" width="30" height="50" fill="#fff"/>${you(48, 88, "e")}${arrow(64, 84, 110, 84)}${txt(128, 40, "enter", 12, "#0d8a5b")}`);
  },
  exit() {
    return frame("#f3fff8", `<rect x="24" y="20" width="84" height="92" rx="8" fill="#ffe0cc"/><rect x="50" y="62" width="30" height="50" fill="#fff"/>${arrow(84, 84, 150, 84)}${you(176, 88, "e")}${txt(150, 40, "exit", 12, "#0d8a5b")}`);
  },
  right() {
    return farm(`${arrow(122, 96, 168, 96)}${pin(176, 96)}${txt(170, 78, "right", 11, "#ec315a")}`);
  },
  pathstart() {
    return farm(`${pin(108, 112)}${txt(162, 112, "start", 11, "#ec315a")}`);
  },
  farmland() {
    return farm(`<rect x="16" y="28" width="188" height="36" rx="8" fill="#b7e7a4"/>${txt(110, 50, "farmland", 12, "#1d6b3a")}${arrow(108, 96, 108, 68)}`);
  },
  parkleft() {
    return farm(`<rect x="14" y="70" width="72" height="40" rx="8" fill="#e7eef8" stroke="#9aafd0"/>${txt(50, 94, "car park", 10)}${arrow(96, 96, 78, 90)}`);
  },
  inpark() {
    return farm(`<rect x="14" y="62" width="74" height="48" rx="8" fill="#e7eef8" stroke="#9aafd0"/>${pin(48, 86)}${txt(50, 78, "in", 11, "#ec315a")}`);
  },
  cornerpark() {
    return farm(`<rect x="14" y="62" width="78" height="48" rx="8" fill="#e7eef8" stroke="#9aafd0"/>${pin(84, 70)}${txt(52, 90, "corner", 11, "#ec315a")}`);
  },
  beside() {
    return farm(`${pin(78, 64)}${txt(64, 48, "beside", 11, "#ec315a")}`);
  },
  ahead() {
    return farm(`${arrow(108, 92, 108, 36)}${txt(156, 48, "ahead", 12, "#ec315a")}`);
  },
  maze() {
    return farm(`<rect x="86" y="24" width="44" height="34" rx="3" fill="#c9f0d4" stroke="#1f9d62" stroke-width="2"/><path d="M98 24 v16 M112 58 v-16 M86 40 h16" fill="none" stroke="#1f9d62" stroke-width="2"/>${arrow(108, 96, 108, 64)}${txt(164, 40, "maze", 12, "#1f9d62")}`);
  },
  oppban() {
    return farm(`${barn(20, 36, 52, 52)}${txt(46, 78, "barn", 10, "#fff")}${pin(150, 62)}${txt(150, 40, "opposite", 11, "#ec315a")}`);
  },
  side() {
    return farm(`<path d="M108 72 H190" stroke="#efd7ae" stroke-width="14" stroke-linecap="round"/>${pin(150, 54)}${txt(168, 40, "beside", 11, "#ec315a")}`);
  },
  overthere() {
    return farm(`${pin(176, 36)}${arrow(120, 92, 164, 46)}${txt(168, 24, "there", 11, "#ec315a")}`);
  },
  pool() {
    return farm(`<ellipse cx="108" cy="58" rx="40" ry="16" fill="#8fd4f2"/>${arrow(108, 96, 108, 28)}${txt(168, 62, "cross", 11, "#ec315a")}`);
  },
  further() {
    return farm(`<circle cx="108" cy="78" r="4" fill="#c4a06a"/>${arrow(108, 100, 108, 32)}${txt(162, 40, "further up", 11, "#ec315a")}`);
  },
  bridge() {
    return farm(`<ellipse cx="108" cy="52" rx="36" ry="14" fill="#8fd4f2"/><rect x="90" y="46" width="36" height="12" rx="3" fill="#8a6232"/>${arrow(108, 96, 108, 64)}${txt(168, 52, "bridge", 11, "#ec315a")}`);
  },
  turnright() {
    return farm(`<path d="M108 100 V62 H186" fill="none" stroke="#ec315a" stroke-width="3"/>${arrow(150, 62, 176, 62)}${txt(160, 48, "turn right", 11, "#ec315a")}`);
  },
  alongside() {
    return farm(`<path d="M108 78 H196" stroke="#efd7ae" stroke-width="14" stroke-linecap="round"/>${arrow(120, 78, 180, 78)}<text x="150" y="68" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="800" fill="#ec315a">along</text>`);
  },
  firstbend() {
    return farm(`<path d="M108 96 V70 H186 V28" fill="none" stroke="#efd7ae" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>${pin(186, 70)}${txt(150, 58, "first bend", 11, "#ec315a")}`);
  },
  takeright() {
    return farm(`<path d="M108 70 H190" stroke="#efd7ae" stroke-width="14" stroke-linecap="round"/>${arrow(118, 96, 118, 74)}${arrow(124, 70, 176, 70)}${txt(160, 52, "this path", 11, "#ec315a")}`);
  },
  bybarn() {
    return farm(`${barn(132, 40, 62, 64)}${pin(124, 78)}${txt(70, 50, "just by", 11, "#ec315a")}`);
  },
  blackbarn() {
    return farm(`<path d="M108 96 V74 H176" fill="none" stroke="#efd7ae" stroke-width="12" stroke-linejoin="round"/>${barn(156, 28, 50, 52, "#3a3532")}${arrow(120, 90, 168, 74)}${txt(70, 48, "arrive", 11, "#ec315a")}`);
  },
  farmyard() {
    return farm(`<path d="M132 34 h48 v28 h-18 v16 h-30 z" fill="#e07a45"/>${pin(118, 48)}${txt(70, 48, "near", 11, "#ec315a")}`);
  },
  afterbridge() {
    return farm(`<ellipse cx="108" cy="70" rx="34" ry="12" fill="#8fd4f2"/><rect x="92" y="64" width="32" height="10" rx="2" fill="#8a6232"/>${arrow(108, 100, 108, 40)}${pin(108, 40)}${txt(160, 36, "just after", 10, "#ec315a")}`);
  },
  stairs() {
    return frame("#f6f3ff", `<path d="M40 100 h24 v-16 h24 v-16 h24 v-16 h24" fill="none" stroke="#7240e8" stroke-width="4"/>${pin(52, 108)}${txt(150, 40, "bottom", 12, "#ec315a")}`);
  },
  farside() {
    return frame("#f6f3ff", `<rect x="28" y="36" width="164" height="56" rx="12" fill="#efe8ff"/>${you(52, 64, "e")}${pin(164, 64)}${txt(110, 112, "far side", 12, "#ec315a")}`);
  },
  intocorridor() {
    return frame("#f6f3ff", `<rect x="96" y="20" width="36" height="96" rx="8" fill="#efe8ff"/><rect x="96" y="48" width="108" height="28" rx="8" fill="#e4dcff"/>${arrow(114, 100, 114, 68)}${arrow(120, 62, 180, 62)}${txt(70, 40, "turn in", 11, "#ec315a")}`);
  },
  facing() {
    return frame("#f6f3ff", `${you(70, 64, "e")}${you(150, 64, "w")}${txt(110, 108, "facing you", 12, "#ec315a")}`);
  },
  immright() {
    return frame("#f6f3ff", `<rect x="20" y="28" width="180" height="72" rx="12" fill="#efe8ff"/>${you(70, 64, "n")}${pin(108, 64)}${txt(150, 112, "immediately right", 11, "#ec315a")}`);
  },
  crossarea() {
    return frame("#f6f3ff", `<rect x="36" y="28" width="148" height="72" rx="14" fill="#efe8ff"/>${txt(110, 52, "sitting area", 11, "#7240e8")}${arrow(48, 96, 168, 36)}`);
  },
  alongcorr() {
    return frame("#f6f3ff", `<rect x="16" y="46" width="188" height="36" rx="10" fill="#efe8ff"/>${arrow(36, 64, 184, 64)}${txt(110, 36, "along", 12, "#ec315a")}`);
  },
  leftside() {
    return frame("#f6f3ff", `<rect x="16" y="40" width="188" height="48" rx="10" fill="#efe8ff"/>${you(120, 64, "e")}${pin(48, 64)}${txt(48, 32, "left", 12, "#ec315a")}`);
  },
  lastdoor() {
    return frame("#f6f3ff", `<rect x="28" y="36" width="36" height="56" rx="4" fill="#e4dcff"/><rect x="78" y="36" width="36" height="56" rx="4" fill="#e4dcff"/><rect x="128" y="36" width="36" height="56" rx="4" fill="#7240e8"/>${arrow(146, 108, 146, 96)}${txt(146, 28, "last door", 11, "#7240e8")}`);
  },
  beforecorr() {
    return frame("#f6f3ff", `<rect x="120" y="28" width="40" height="80" rx="8" fill="#efe8ff"/>${txt(140, 70, "corridor", 9, "#7240e8")}${pin(70, 68)}${txt(70, 108, "before", 12, "#ec315a")}`);
  },
  floors() {
    return frame("#f6f3ff", `<rect x="70" y="16" width="80" height="100" rx="6" fill="#efe8ff" stroke="#7240e8"/><line x1="70" y1="48" x2="150" y2="48" stroke="#7240e8"/><line x1="70" y1="80" x2="150" y2="80" stroke="#7240e8"/>${pin(110, 32)}${pin(110, 64)}${pin(110, 96)}${txt(176, 64, "every floor", 10, "#ec315a")}`);
  },
  basement() {
    return frame("#f6f3ff", `<rect x="60" y="16" width="100" height="70" rx="6" fill="#efe8ff" stroke="#cfc3f0"/><rect x="60" y="86" width="100" height="28" rx="4" fill="#7240e8"/>${txt(110, 104, "basement", 11, "#fff")}<line x1="40" y1="86" x2="180" y2="86" stroke="#8a7ab8"/>`);
  },
  downleft() {
    return frame("#f6f3ff", `<path d="M150 24 v70 H70" fill="none" stroke="#7240e8" stroke-width="4" stroke-linejoin="round"/>${arrow(150, 36, 150, 80)}${arrow(140, 94, 78, 94)}${pin(62, 94)}${txt(90, 40, "down, then left", 11, "#ec315a")}`);
  },
  cNorth() {
    return campus(`${txt(109, 22, "N", 13, "#ec315a")}${arrow(109, 96, 109, 34)}${txt(164, 48, "north", 12, "#ec315a")}`);
  },
  cBottom() {
    return campus(`${pin(72, 100)}${txt(164, 100, "bottom", 12, "#ec315a")}`);
  },
  cRight() {
    return campus(`${arrow(122, 96, 176, 96)}${pin(184, 96)}${txt(164, 78, "right", 12, "#ec315a")}`);
  },
  cLeft() {
    return campus(`${pin(62, 78)}${txt(58, 62, "left", 12, "#ec315a")}`);
  },
  cRightOf() {
    return campus(`${block(124, 58, 46, 32, "#d9e6ff")}${txt(147, 78, "hall", 9)}${pin(186, 74)}${txt(168, 48, "right of", 11, "#ec315a")}`);
  },
  cAfter() {
    return campus(`${block(48, 78, 40, 24, "#ffe0cc")}${txt(68, 94, "library", 8)}${ellipse(68, 48, 28, 14)}${pin(68, 48)}${txt(150, 48, "after", 12, "#ec315a")}`);
  },
  cMiddle() {
    return campus(`${ellipse(78, 62, 36, 18)}${pin(78, 62)}${txt(150, 62, "middle", 12, "#ec315a")}`);
  },
  cCorner() {
    return campus(`<path d="M22 24 H96 V50 H22 Z" fill="#e7eef8" stroke="#8aa0c8"/>${pin(96, 50)}${txt(158, 86, "far corner", 11, "#ec315a")}`);
  },
  cTop() {
    return campus(`${pin(109, 28)}${txt(158, 32, "top", 12, "#ec315a")}`);
  },
  cAlong() {
    return campus(`${ellipse(70, 58, 34, 16)}<path d="M40 36 H190" stroke="#d7deee" stroke-width="12" stroke-linecap="round"/>${arrow(56, 36, 168, 36)}${txt(150, 24, "along", 11, "#ec315a")}`);
  },
  cEnd() {
    return campus(`<path d="M109 100 V48 H36" fill="none" stroke="#d7deee" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>${block(16, 34, 28, 28, "#ffe0cc")}${pin(30, 48)}${txt(150, 70, "the end", 11, "#ec315a")}`);
  },
  cFarLeft() {
    return campus(`${block(18, 36, 36, 28, "#ffe0cc")}${pin(36, 50)}${txt(150, 50, "far left", 12, "#ec315a")}`);
  },
  cBetween() {
    return campus(`${block(128, 70, 34, 36, "#d9e6ff")}${block(168, 70, 34, 36, "#ffe0cc")}<path d="M162 108 V52" stroke="#d7deee" stroke-width="10" stroke-linecap="round"/>${pin(162, 78)}${txt(70, 48, "between", 12, "#ec315a")}`);
  },
  cUpRight() {
    return campus(`<path d="M109 100 V62 H186" fill="none" stroke="#ec315a" stroke-width="3" stroke-linejoin="round"/>${arrow(150, 62, 176, 62)}${txt(150, 48, "up, right", 11, "#ec315a")}`);
  },
  cTopRight() {
    return campus(`<path d="M150 22 h46 v28 h-18 v18 h-28 z" fill="#ffe0cc" stroke="#8aa0c8"/>${pin(168, 40)}${txt(80, 40, "top right", 11, "#ec315a")}`);
  },
  cBehind() {
    return campus(`${block(128, 70, 48, 32, "#d9e6ff")}<circle cx="152" cy="48" r="12" fill="#d7eef8" stroke="#3a6ea5" stroke-width="2"/>${pin(152, 48)}${txt(70, 48, "behind", 12, "#ec315a")}`);
  },
  cOff() {
    return campus(`<path d="M128 100 V40 H196" fill="none" stroke="#d7deee" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><circle cx="150" cy="62" r="11" fill="#d7eef8" stroke="#3a6ea5" stroke-width="2"/>${txt(70, 48, "off path", 11, "#ec315a")}`);
  },
  cAcross() {
    return campus(`<rect x="28" y="24" width="164" height="26" rx="6" fill="#e7eef8" stroke="#8aa0c8"/>${txt(110, 41, "across the top", 10, "#243056")}`);
  },
  cFront() {
    return campus(`<rect x="36" y="22" width="146" height="28" rx="6" fill="#e7eef8" stroke="#8aa0c8"/>${arrow(109, 96, 109, 56)}${txt(110, 40, "in front", 11, "#ec315a")}`);
  },
  cThrough() {
    return campus(`<rect x="92" y="86" width="8" height="22" fill="#8aa0c8"/><rect x="118" y="86" width="8" height="22" fill="#8aa0c8"/>${arrow(109, 112, 109, 62)}${txt(164, 78, "through", 12, "#ec315a")}`);
  },
  cTurnR() {
    return campus(`<path d="M109 104 V70 H190" fill="none" stroke="#d7deee" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>${arrow(150, 70, 178, 70)}${txt(150, 56, "turn right", 11, "#ec315a")}`);
  },
  cFollow() {
    return campus(`<rect x="128" y="78" width="70" height="28" rx="6" fill="#e7eef8" stroke="#8aa0c8"/>${txt(163, 96, "car park", 8)}<path d="M109 112 H188 V74" fill="none" stroke="#ec315a" stroke-width="3" stroke-linejoin="round"/>${txt(70, 48, "follow", 12, "#ec315a")}`);
  },
  cStraight() {
    return campus(`${arrow(109, 100, 109, 30)}${txt(160, 48, "straight", 12, "#ec315a")}`);
  },
  cPass() {
    return campus(`${block(48, 70, 42, 26, "#ffe0cc")}${arrow(109, 100, 109, 36)}${txt(150, 48, "pass", 12, "#ec315a")}`);
  },
  cBridge() {
    return campus(`${ellipse(78, 58, 34, 16)}<rect x="62" y="52" width="32" height="10" rx="2" fill="#8a6232"/>${arrow(109, 96, 78, 64)}${txt(160, 58, "bridge", 12, "#ec315a")}`);
  },
  cAllWay() {
    return campus(`${arrow(109, 108, 109, 22)}${txt(160, 64, "all the way", 11, "#ec315a")}`);
  },
  cTurnL() {
    return campus(`<path d="M109 108 V40 H28" fill="none" stroke="#d7deee" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>${arrow(70, 40, 36, 40)}${txt(160, 70, "turn left", 11, "#ec315a")}`);
  },
  cTowards() {
    return campus(`${block(140, 36, 48, 32, "#d9e6ff")}${arrow(109, 96, 150, 58)}${txt(70, 48, "towards", 11, "#ec315a")}`);
  },
  cTake() {
    return campus(`<path d="M109 70 H190" stroke="#d7deee" stroke-width="12" stroke-linecap="round"/>${arrow(120, 100, 120, 76)}${arrow(126, 70, 176, 70)}${txt(70, 48, "this path", 11, "#ec315a")}`);
  },
  cWind() {
    return campus(`<path d="M120 108 C120 78 150 78 150 52 C150 36 176 36 190 28" fill="none" stroke="#ec315a" stroke-width="3"/>${txt(70, 48, "winds", 12, "#ec315a")}`);
  },
  gNorth() {
    return park(`${txt(114, 18, "N", 12, "#ec315a")}${arrow(114, 96, 114, 30)}${txt(168, 40, "north", 11, "#ec315a")}`);
  },
  gSouth() {
    return park(`${pin(114, 100)}${txt(168, 104, "south gate", 10, "#ec315a")}`);
  },
  gLeft() {
    return park(`${block(72, 78, 28, 22, "#ffe0cc")}${pin(86, 88)}${txt(70, 70, "left", 11, "#ec315a")}`);
  },
  gRight() {
    return park(`${block(132, 78, 32, 22, "#ffe0cc")}${pin(148, 88)}${txt(168, 72, "right", 11, "#ec315a")}`);
  },
  gAcross() {
    return park(`${block(70, 80, 26, 18, "#ffe0cc")}${block(132, 80, 26, 18, "#d9e6ff")}${pin(145, 88)}${txt(114, 74, "across", 10, "#ec315a")}`);
  },
  gCorner() {
    return park(`${block(150, 72, 36, 22, "#ffe0cc")}${pin(168, 82)}${txt(168, 64, "corner", 11, "#ec315a")}`);
  },
  gBefore() {
    return park(`<g fill="#7dbe78"><circle cx="168" cy="40" r="8"/><circle cx="184" cy="52" r="9"/><circle cx="172" cy="60" r="7"/></g>${pin(150, 72)}${txt(150, 96, "before", 11, "#ec315a")}`);
  },
  gFar() {
    return park(`${block(8, 40, 22, 18, "#ffe0cc")}${pin(18, 48)}${txt(80, 40, "far bank", 10, "#ec315a")}`);
  },
  gBridge() {
    return park(`<rect x="28" y="70" width="28" height="8" rx="2" fill="#8a6232"/>${pin(42, 74)}${txt(80, 68, "bridge", 11, "#ec315a")}`);
  },
  gAbove() {
    return park(`${pin(42, 62)}${txt(80, 58, "above water", 10, "#ec315a")}`);
  },
  gFurther() {
    return park(`${arrow(114, 90, 114, 24)}${txt(168, 36, "further north", 9, "#ec315a")}`);
  },
  gPast() {
    return park(`${arrow(114, 96, 114, 28)}${txt(168, 78, "past plaza", 10, "#ec315a")}`);
  },
  gBetween() {
    return park(`<g fill="#3a6ea5"><rect x="92" y="18" width="10" height="8"/><rect x="106" y="18" width="10" height="8"/><rect x="120" y="18" width="10" height="8"/></g>${block(96, 36, 36, 14, "#d9e6ff")}${pin(114, 43)}${txt(168, 40, "between", 11, "#ec315a")}`);
  },
  gBehind() {
    return park(`<g fill="#7dbe78"><circle cx="160" cy="48" r="8"/><circle cx="176" cy="58" r="9"/><circle cx="164" cy="68" r="7"/></g>${pin(176, 30)}${txt(80, 36, "behind", 11, "#ec315a")}`);
  },
  gParallel() {
    return park(`${block(52, 36, 16, 48, "#ffe0cc")}${pin(60, 58)}${txt(100, 40, "parallel", 10, "#ec315a")}`);
  },
  gEdge() {
    return park(`${block(50, 40, 14, 40, "#ffe0cc")}${pin(57, 58)}${txt(100, 48, "water's edge", 9, "#ec315a")}`);
  },
  gEast() {
    return park(`${pin(58, 70)}${txt(90, 64, "east bank", 10, "#ec315a")}`);
  },
  gCenter() {
    return park(`<polygon points="114,46 126,52 126,66 114,72 102,66 102,52" fill="#ffe0cc" stroke="#8aa0c8"/>${pin(114, 59)}${txt(168, 58, "center", 11, "#ec315a")}`);
  },
  gWind() {
    return park(`<g fill="#7dbe78"><circle cx="170" cy="36" r="8"/><circle cx="186" cy="48" r="8"/><circle cx="174" cy="56" r="6"/></g><path d="M128 96 C148 84 152 66 176 50" fill="none" stroke="#ec315a" stroke-width="3"/>${txt(90, 48, "winds", 11, "#ec315a")}`);
  },
  gEnter() {
    return park(`${arrow(114, 112, 114, 78)}${txt(168, 96, "enter", 11, "#ec315a")}`);
  },
  gWest() {
    return park(`${arrow(100, 70, 48, 70)}${txt(80, 58, "west", 11, "#ec315a")}`);
  },
  gRoad() {
    return park(`<path d="M16 112 H200" stroke="#d7deee" stroke-width="8"/>${arrow(40, 112, 170, 112)}${txt(114, 100, "River Road", 9, "#ec315a")}`);
  }
};

const NOTES = [
  {
    id: "compass", title: "Compass", icon: "target", tone: "blue",
    items: [{ wide: true, en: "North, east, south, west", bn: "উত্তর, পূর্ব, দক্ষিণ, পশ্চিম। ম্যাপে উপরের দিক উত্তর।", pic: "compass" }]
  },
  {
    id: "position", title: "Where things are", icon: "pin", tone: "blue",
    items: [
      ["Next to / Adjacent to", "পাশে, সংলগ্ন", "next"],
      ["In front of", "সামনে", "front"],
      ["Behind", "পিছনে", "behind"],
      ["Between", "দুইয়ের মাঝখানে", "between"],
      ["Opposite", "বিপরীত", "opposite"],
      ["Along", "বরাবর", "along"],
      ["Across", "পার হয়ে", "across"],
      ["Through", "ভিতর দিয়ে", "through"],
      ["Towards", "লক্ষ্যের দিকে", "towards"],
      ["Into", "ভেতরে", "into"],
      ["Out of", "বাইরে", "outof"],
      ["Close to / Near", "কাছাকাছি", "near"],
      ["Far from", "দূরে", "far"],
      ["At the corner of", "কোণায়", "corner"]
    ]
  },
  {
    id: "movement", title: "Movement", icon: "arrow", tone: "green",
    items: [
      ["Proceed", "এগিয়ে যাওয়া", "proceed"],
      ["Turn", "ঘোরা", "turn"],
      ["Continue", "চালিয়ে যাওয়া", "continue"],
      ["Go straight ahead", "সোজা যাওয়া", "straight"],
      ["Follow", "অনুসরণ করা", "follow"],
      ["Cross", "পার হওয়া", "cross"],
      ["Pass", "অতিক্রম করা", "pass"],
      ["Enter", "প্রবেশ করা", "enter"],
      ["Exit", "বের হওয়া", "exit"]
    ]
  },
  {
    id: "farm", title: "On this farm map", icon: "map", tone: "green",
    items: [
      ["Immediately to your right", "তোমার ডান পাশে", "right"],
      ["To the right", "ডানে", "right"],
      ["At the beginning of the main path", "মূল পথের শুরুতে", "pathstart"],
      ["To the farmland", "খামারের দিকে", "farmland"],
      ["The car park is on your left", "কার পার্ক তোমার বামে", "parkleft"],
      ["In the car park", "কার পার্কে", "inpark"],
      ["In the corner", "কোণায়", "cornerpark"],
      ["Beside the main path", "মূল পথের পাশে", "beside"],
      ["Look ahead of you", "সামনের দিকে তাকাও", "ahead"],
      ["You'll see a maze", "সামনে একটা মেজ দেখা যাবে", "maze"],
      ["It's opposite the New Barn", "নতুন বার্নের বিপরীতে", "oppban"],
      ["Beside the side path", "সাইড পথের পাশে", "side"],
      ["Just over there", "ওইদিকে", "overthere"],
      ["Crossing the fish pool", "ফিশ পুল পার হয়ে", "pool"],
      ["Further up the main path", "মূল পথ ধরে আরও উপরে", "further"],
      ["Go towards the bridge", "ব্রিজের দিকে যাও", "bridge"],
      ["Turn right", "ডানে ঘোরো", "turnright"],
      ["Walk along the side path", "সাইড পথ ধরে হাঁটো", "alongside"],
      ["On the first bend", "প্রথম বাঁকে", "firstbend"],
      ["If you take the side path to the right", "ডান দিকের সাইড পথ ধরলে", "takeright"],
      ["Here, just by the New Barn", "নতুন বার্নের ঠিক পাশে", "bybarn"],
      ["You'll come to the Black Barn", "কালো বার্নে পৌঁছাবে", "blackbarn"],
      ["Just where the path first bends", "যেখানে পথটা প্রথম বাঁক নেয়", "firstbend"],
      ["Near the farmyard", "ফার্মইয়ার্ডের কাছে", "farmyard"],
      ["Just after you cross the bridge", "ব্রিজ পার হওয়ার ঠিক পর", "afterbridge"]
    ]
  },
  {
    id: "indoor", title: "Indoors", icon: "home", tone: "violet",
    items: [
      ["At the bottom of the stairs", "সিঁড়ির নিচে", "stairs"],
      ["To the far side of the sitting area", "বসার জায়গার দূরের দিকে", "farside"],
      ["Turn right into the corridor", "করিডোরে ডানে ঢোকো", "intocorridor"],
      ["Facing you", "তোমার মুখোমুখি", "facing"],
      ["Immediately on the right", "ডানদিকে একদম কাছে", "immright"],
      ["Cross the sitting area", "বসার জায়গা পার হও", "crossarea"],
      ["Continue straight ahead along the corridor", "করিডোর ধরে সোজা এগিয়ে যাও", "alongcorr"],
      ["On the left-hand side", "বামপাশে", "leftside"],
      ["Through the last door", "শেষ দরজা দিয়ে", "lastdoor"],
      ["Before you come to the corridor", "করিডোরে আসার আগে", "beforecorr"],
      ["On every floor", "প্রতি তলায়", "floors"],
      ["In the basement", "বেসমেন্টে", "basement"],
      ["On the left when you get down there", "নিচে নামলে বামপাশে", "downleft"]
    ]
  }
];

const CAMPUS_NOTES = [
  {
    id: "compass", title: "Compass", icon: "target", tone: "blue",
    items: [{ wide: true, en: "North. On this map, up is north.", bn: "উত্তর। এই ম্যাপে উপরের দিক উত্তর।", pic: "cNorth" }]
  },
  {
    id: "position", title: "Where things are", icon: "pin", tone: "blue",
    items: [
      ["At the bottom of the map", "ম্যাপের নিচে", "cBottom"],
      ["Facing north", "উত্তর দিকে মুখ করে", "cNorth"],
      ["Immediately to your right", "সাথে সাথে তোমার ডানে", "cRight"],
      ["On your left", "তোমার বাম পাশে", "cLeft"],
      ["Directly to the right of", "ঠিক ডান পাশে", "cRightOf"],
      ["Immediately after", "ঠিক পরেই", "cAfter"],
      ["Right in the middle", "ঠিক মাঝখানে", "cMiddle"],
      ["In the far corner", "দূরের কোণায়", "cCorner"],
      ["At the very top", "একদম উপরে", "cTop"],
      ["Along the top edge", "উপরের কিনারা বরাবর", "cAlong"],
      ["At the very end", "একদম শেষে", "cEnd"],
      ["On the far left-hand side", "একদম বাম দিকে", "cFarLeft"],
      ["Between", "দুটোর মাঝখানে", "cBetween"],
      ["In the top right corner", "উপরের ডান কোণায়", "cTopRight"],
      ["Directly behind", "ঠিক পেছনে", "cBehind"],
      ["Just off the path", "পথের একটু পাশে", "cOff"],
      ["Across the top", "উপর দিয়ে আড়াআড়ি", "cAcross"],
      ["Directly in front of you", "তোমার ঠিক সামনে", "cFront"]
    ]
  },
  {
    id: "movement", title: "Movement", icon: "arrow", tone: "green",
    items: [
      ["Go through", "ভিতর দিয়ে যাও", "cThrough"],
      ["Turn immediately to your right", "সাথে সাথে ডানে ঘোরো", "cTurnR"],
      ["Follow the road", "রাস্তা ধরে যাও", "cFollow"],
      ["Walk straight up", "সোজা উপরে হাঁটো", "cStraight"],
      ["Pass", "পাশ কাটিয়ে যাও", "cPass"],
      ["Take the footbridge", "ছোট সেতু দিয়ে যাও", "cBridge"],
      ["Walk all the way up", "পুরো পথ উপরে যাও", "cAllWay"],
      ["Turn left", "বামে ঘোরো", "cTurnL"],
      ["Towards", "লক্ষ্যের দিকে", "cTowards"],
      ["Take the path", "পথটা ধরো", "cTake"],
      ["Winds upwards and to the right", "উপরে উঠে ডানে বেঁকে যায়", "cWind"]
    ]
  },
  {
    id: "campus", title: "On this campus map", icon: "map", tone: "green",
    items: [
      ["Starting at the main gate, facing north", "মূল গেটে, উত্তর দিকে মুখ করে", "cNorth"],
      ["Up University Avenue", "ইউনিভার্সিটি অ্যাভিনিউ ধরে উপরে", "cStraight"],
      ["The road loops around the bottom of the car park", "রাস্তাটা কার পার্কের নিচ দিয়ে ঘুরে গেছে", "cFollow"],
      ["The sports hall is on your left", "স্পোর্টস হল তোমার বামে", "cLeft"],
      ["The rectangular building to the right of the sports hall", "স্পোর্টস হলের ঠিক ডানের আয়তাকার ভবন", "cRightOf"],
      ["Pass the library on your left", "লাইব্রেরি বাম পাশে পার হও", "cPass"],
      ["The lake is immediately after the library", "লাইব্রেরির ঠিক পরেই লেক", "cAfter"],
      ["The island in the middle of the water", "পানির ঠিক মাঝের দ্বীপ", "cMiddle"],
      ["Take the small footbridge", "ছোট সেতু দিয়ে যাও", "cBridge"],
      ["The T-junction at the very top", "একদম উপরে, যেখানে রাস্তা মিশে টি হয়েছে", "cTop"],
      ["Turn left along the top edge of the lake", "বামে ঘুরে লেকের উপরের কিনারা ধরে", "cTurnL"],
      ["The standalone building on the far left", "একদম বামের আলাদা ভবন", "cFarLeft"],
      ["The path between the sports hall and the health centre", "স্পোর্টস হল আর হেলথ সেন্টারের মাঝের পথ", "cBetween"],
      ["The path winds upwards and to the right", "পথটা উপরে উঠে ডানে বেঁকেছে", "cWind"],
      ["The L-shaped buildings in the top right corner", "উপরের ডান কোণার এল-আকৃতির ভবন", "cTopRight"],
      ["The round tank directly behind the sports hall", "স্পোর্টস হলের ঠিক পেছনের গোল ট্যাংক", "cBehind"],
      ["Just off the path to the accommodation", "থাকার জায়গার পথ থেকে একটু সরে", "cOff"],
      ["The large open rectangle across the top", "উপর জুড়ে বড় খোলা আয়তক্ষেত্র", "cAcross"],
      ["In front of you at the end of the avenue", "অ্যাভিনিউয়ের শেষে, তোমার সামনে", "cFront"]
    ]
  }
];

const PARK_NOTES = [
  {
    id: "compass", title: "Compass", icon: "target", tone: "blue",
    items: [{ wide: true, en: "North, east, south, west", bn: "উত্তর, পূর্ব, দক্ষিণ, পশ্চিম। এই ম্যাপে কম্পাস আছে।", pic: "compass" }]
  },
  {
    id: "position", title: "Where things are", icon: "pin", tone: "blue",
    items: [
      ["At the south gate", "দক্ষিণ গেটে", "gSouth"],
      ["Facing north", "উত্তর দিকে মুখ করে", "gNorth"],
      ["Immediately to the left", "ঠিক বাম পাশে", "gLeft"],
      ["Directly across", "ঠিক উল্টো দিকে", "gAcross"],
      ["On the right-hand side", "ডান পাশে", "gRight"],
      ["The corner building", "কোণার ভবন", "gCorner"],
      ["Just before the path", "পথের ঠিক আগে", "gBefore"],
      ["On the far bank", "নদীর ওপারে", "gFar"],
      ["Right above the water", "পানির ঠিক উপরে", "gAbove"],
      ["Further north", "আরও উত্তরে", "gFurther"],
      ["Past the central plaza", "সেন্ট্রাল প্লাজা পার হয়ে", "gPast"],
      ["Between", "দুটোর মাঝখানে", "gBetween"],
      ["Behind", "পেছনে", "gBehind"],
      ["Parallel to the river", "নদীর সমান্তরাল", "gParallel"],
      ["Along the water's edge", "পানির কিনারা বরাবর", "gEdge"],
      ["On the east bank", "পূর্ব পাড়ে", "gEast"],
      ["In the absolute center", "একদম মাঝখানে", "gCenter"]
    ]
  },
  {
    id: "movement", title: "Movement", icon: "arrow", tone: "green",
    items: [
      ["Facing north into the park", "পার্কের ভিতরে উত্তরমুখী", "gNorth"],
      ["Enter and exit via River Road", "রিভার রোড দিয়ে ঢোকা ও বের হওয়া", "gRoad"],
      ["As you enter", "ঢোকার সময়", "gEnter"],
      ["The path winds into the wooded area", "পথটা জঙ্গলের দিকে বেঁকে গেছে", "gWind"],
      ["Looking towards the western edge", "পশ্চিম দিকের দিকে তাকানো", "gWest"],
      ["The bridge spans the river", "সেতুটা নদীর উপর দিয়ে গেছে", "gBridge"],
      ["Further north, past the plaza", "আরও উত্তরে, প্লাজা পার হয়ে", "gFurther"]
    ]
  },
  {
    id: "park", title: "On this park map", icon: "map", tone: "green",
    items: [
      ["We are at the south gate, facing north", "আমরা দক্ষিণ গেটে, উত্তরমুখী", "gSouth"],
      ["The building immediately left of the main entrance", "মূল গেটের ঠিক বামের ভবন", "gLeft"],
      ["Trucks use River Road", "ট্রাক রিভার রোড ব্যবহার করে", "gRoad"],
      ["Directly across the entrance gate", "গেটের ঠিক উল্টো পাশে", "gAcross"],
      ["The corner building on the right as you enter", "ঢুকলে ডান দিকের কোণার ভবন", "gCorner"],
      ["Just before the path into the wooded area", "জঙ্গলের পথের ঠিক আগে", "gBefore"],
      ["The building on the far bank is only the pump house", "নদীর ওপারের ভবনটা শুধু পাম্প হাউস", "gFar"],
      ["The turbine sits on the bridge, above the water", "টারবাইন সেতুর উপর, পানির উপরে", "gBridge"],
      ["The solar farm is further north, past the plaza", "সোলার ফার্ম আরও উত্তরে, প্লাজার পরে", "gFurther"],
      ["The rectangle between the plaza and the solar farm", "প্লাজা আর সোলার ফার্মের মাঝের আয়তক্ষেত্র", "gBetween"],
      ["It used to be behind the forest", "আগে এটা জঙ্গলের পেছনে ছিল", "gBehind"],
      ["The long building parallel to the river, on the east bank", "নদীর সমান্তরাল লম্বা ভবন, পূর্ব পাড়ে", "gParallel"],
      ["The hexagonal building in the center of the plaza", "প্লাজার মাঝের ছয়কোনা ভবন", "gCenter"]
    ]
  }
];

const LESSONS = [
  {
    id: "farm",
    short: "Farm",
    title: "Farm map",
    tag: "Map 1 · Farm",
    sub: "Look at the farm map, learn the phrases from the pictures, then listen and submit letters A to I.",
    img: "img/learn/listening-map.jpg",
    alt: "Farm map for questions 15 to 20. Letters A to I mark the places. You are at the X by the New Barn.",
    caption: "You are at the X, by the New Barn. Letters A–I are the places. Use this picture while you study. Put your answers in the practice.",
    sheetAlt: "The same farm map, kept beside the questions.",
    sheetCaption: "Keep this map in view while you listen.",
    audio: "audio/a11t1l2.mp3",
    audioNote: "This is the full Section 2 recording. Questions 15–20 are the map. Choose a letter for every place, then submit.",
    notesMore: "From your class notes",
    bn: "ফার্মের ম্যাপ। ছবির নোট, তারপর অডিও।",
    letters: LETTERS,
    key: KEY,
    qs: QS,
    storeKey: "mmi-maplesson",
    notes: NOTES
  },
  {
    id: "campus",
    short: "Campus",
    title: "University Campus (North Zone)",
    tag: "Map 2 · Campus",
    sub: "Look at this campus plan, learn only the phrases used on it, then listen and submit letters A to F.",
    img: "img/learn/campus-north.jpg",
    roomy: true,
    alt: "University Campus, North Zone. Letters A to F mark the places. North is up, and the main gate is at the bottom.",
    caption: "You start at the main gate, facing north up University Avenue. Letters A–F are the places. The library, the lake, the sports hall and the car park are already named.",
    sheetAlt: "The same campus map, kept beside the questions.",
    sheetCaption: "Keep this campus map in view while you listen.",
    audio: "audio/campus-north.mp3",
    audioNote: "The guide starts at the main gate and places six buildings. Choose a letter for every place, then submit.",
    notesMore: "Only phrases from this map",
    bn: "ক্যাম্পাসের উত্তর অংশ। শুধু এই ম্যাপের জায়গা, তারপর অডিও।",
    letters: ["A", "B", "C", "D", "E", "F"],
    qs: [
      { n: 11, name: "The Health Centre", answer: "C", why: "Through the main gate, turn right, and follow the road around the bottom of the car park. It is the rectangular building directly to the right of the sports hall." },
      { n: 12, name: "The \"Quiet Study\" Island", answer: "A", why: "Walk straight up University Avenue, pass the library on your left, and the island is in the middle of the lake." },
      { n: 13, name: "Engineering Workshops", answer: "E", why: "Go up to the T-junction, turn left, and follow the road along the top of the lake to the standalone building on the far left." },
      { n: 14, name: "Postgraduate Accommodation", answer: "F", why: "Take the path between the sports hall and the health centre. It winds up to the L-shaped buildings in the top right corner." },
      { n: 15, name: "Water Treatment Plant", answer: "B", why: "The round tank directly behind the sports hall, just off the path that leads to the accommodation." },
      { n: 16, name: "Future Building Site", answer: "D", why: "Walk straight up University Avenue to the end. The large open rectangle across the top is in front of you." }
    ],
    storeKey: "mmi-maplesson-campus",
    notes: CAMPUS_NOTES
  },
  {
    id: "greenleaf",
    short: "GreenLeaf",
    title: "GreenLeaf Innovation Park",
    tag: "Map 3 · GreenLeaf",
    sub: "Look at this site plan, learn only the phrases used on it, then listen and submit letters A to H.",
    img: "img/learn/greenleaf.jpg",
    roomy: true,
    alt: "GreenLeaf Innovation Park site plan. Letters A to H mark the places. The main entrance is at the south, and north is up.",
    caption: "You are at the south gate, facing north. Letters A–H are the places. The river, River Road, the central plaza, the solar farm and the forest are already named.",
    sheetAlt: "The same GreenLeaf site plan, kept beside the questions.",
    sheetCaption: "Keep this site plan in view while you listen.",
    audio: "audio/greenleaf.mp3",
    audioNote: "The architect starts at the south gate and places six buildings. Choose a letter for every place, then submit.",
    notesMore: "Only phrases from this map",
    bn: "গ্রিনলিফ পার্কের ম্যাপ। শুধু এই প্ল্যানের জায়গা, তারপর অডিও।",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    qs: [
      { n: 11, name: "The Bio-Fuel Lab", answer: "A", why: "The building immediately to the left of the main entrance, so trucks can use River Road." },
      { n: 12, name: "The Visitor Reception", answer: "B", why: "Directly across the gate: the corner building on the right as you enter, just before the path into the wooded area." },
      { n: 13, name: "The Hydro-Power Turbine", answer: "C", why: "It sits on the bridge that spans the river, above the water. The building on the far bank is only the pump house." },
      { n: 14, name: "The Seed Bank", answer: "E", why: "The large rectangle between the central plaza and the solar farm, further north." },
      { n: 15, name: "The Staff Canteen", answer: "H", why: "The long, narrow building running parallel to the river on the east bank. It used to be behind the forest." },
      { n: 16, name: "The Innovation Hub", answer: "D", why: "The hexagonal building in the absolute center of the plaza." }
    ],
    storeKey: "mmi-maplesson-greenleaf",
    notes: PARK_NOTES
  }
];

export function mapLessonHref(i) {
  const base = url("listening-map");
  return i > 0 ? `${base}?map=${i + 1}` : base;
}
export function mapLessonIndex() {
  const n = parseInt(new URLSearchParams(location.search).get("map") || "1", 10);
  if (!Number.isFinite(n) || n < 1 || n > LESSONS.length) return 0;
  return n - 1;
}
function currentLesson() {
  return LESSONS[mapLessonIndex()];
}
function lessonAnswer(lesson, q) {
  return q.answer || lesson.key[q.n];
}
function lessonPager(i) {
  const last = LESSONS.length - 1;
  const prev = i === 0
    ? `<span class="off">${ic("cl")}</span>`
    : `<a href="${mapLessonHref(i - 1)}" aria-label="Previous map">${ic("cl")}</a>`;
  const next = i === last
    ? `<span class="off">${ic("cr")}</span>`
    : `<a href="${mapLessonHref(i + 1)}" aria-label="Next map">${ic("cr")}</a>`;
  const nums = LESSONS.map((L, k) => `<a class="${k === i ? "on" : ""}" href="${mapLessonHref(k)}" aria-label="Map ${k + 1}, ${esc(L.short)}" ${k === i ? 'aria-current="page"' : ""}>${k + 1}</a>`).join("");
  return `<nav class="pager lesson-pager" aria-label="Map pages">${prev}${nums}${next}</nav>`;
}
export function mapLessonList() {
  return `<div class="map-lessons">${LESSONS.map((L, i) => {
    const saved = store.get(L.storeKey, null);
    const score = saved && typeof saved.score === "number" ? ` · last score ${saved.score}/${saved.total}` : "";
    const from = L.qs[0].n;
    const to = L.qs[L.qs.length - 1].n;
    return `<a class="lesson" href="${mapLessonHref(i)}"><span class="ico t-blue">${ic("map")}</span><span class="lesson-copy"><b>Map ${i + 1} · ${esc(L.short)}</b><small>Questions ${from}–${to}${score}</small><span class="bn">${esc(L.bn)}</span></span><span class="lesson-go">${ic("arrow")}</span></a>`;
  }).join("")}</div>`;
}
function mapScoreLine() {
  return LESSONS.map((L, i) => {
    const saved = store.get(L.storeKey, null);
    const score = saved && typeof saved.score === "number" ? ` ${saved.score}/${saved.total}` : "";
    return `Map ${i + 1} ${L.short}${score}`;
  }).join(" · ");
}

function itemsOf(group) {
  return group.items.map((item) => Array.isArray(item) ? { en: item[0], bn: item[1], pic: item[2] } : item);
}
function card(item) {
  const pic = (PICS[item.pic] || PICS.next)();
  return `<article class="note-card${item.wide ? " span" : ""}"><div class="note-art">${pic}</div><div class="note-copy"><b>${esc(item.en)}</b><p class="bn">${esc(item.bn)}</p></div></article>`;
}
function shownGroup(lesson) {
  return lesson.notes.some((g) => g.id === learnState.group) ? learnState.group : "all";
}
export function noteBoard() {
  const lesson = currentLesson();
  const group = shownGroup(lesson);
  const groups = group === "all" ? lesson.notes : lesson.notes.filter((g) => g.id === group);
  return groups.map((g) => `<h3 class="note-kicker">${ic(g.icon)}${esc(g.title)}</h3><div class="note-grid">${itemsOf(g).map(card).join("")}</div>`).join("");
}
function notePills() {
  const lesson = currentLesson();
  const group = shownGroup(lesson);
  const pills = [["all", "All"], ...lesson.notes.map((g) => [g.id, g.title])];
  return pills.map(([id, label]) => `<button type="button" class="pill ${group === id ? "on" : ""}" data-act="notegroup" data-v="${id}">${esc(label)}</button>`).join("");
}

function savedScore(lesson) {
  const saved = store.get(lesson.storeKey, null);
  return saved && typeof saved.score === "number" ? saved : null;
}
function practiceBody(lesson) {
  const attempt = mapAttempt(lesson.id);
  const result = attempt.result;
  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    const msg = result.score === result.total ? "Every place is in the right spot." : result.score >= 4 ? "Most of the map is in place." : "Listen once more, from where you are standing.";
    const rows = result.rows.map((r) => `<article class="q-result ${r.right ? "ok" : "bad"}"><div><b>${r.n} ${esc(r.name)}</b><span>${r.right ? `You chose ${esc(r.pick)}` : `You chose ${esc(r.pick)} · answer ${esc(r.answer)}`}</span><p>${esc(r.why)}</p></div><em>${r.right ? "Correct" : "Not this one"}</em></article>`).join("");
    return `<div class="score-banner"><div class="plan-meter" style="--p:${pct}"><b>${result.score}/${result.total}</b></div><div><b>${msg}</b><p class="note">Checked just now. Your score stays on this browser.</p></div></div><div class="q-results">${rows}</div><button type="button" class="btn" data-act="mapretry" data-lesson="${lesson.id}">${ic("refresh")}Try again</button>`;
  }
  const saved = savedScore(lesson);
  const lines = lesson.qs.map((q) => `<div class="q-line"><div class="q-name"><b>${q.n}</b> ${esc(q.name)}</div><div class="letters" role="group" aria-label="${esc(q.name)}">${lesson.letters.map((L) => `<button type="button" class="letter ${attempt.picks[q.n] === L ? "on" : ""}" data-act="mappick" data-lesson="${lesson.id}" data-q="${q.n}" data-v="${L}" aria-pressed="${attempt.picks[q.n] === L ? "true" : "false"}">${L}</button>`).join("")}</div></div>`).join("");
  return `${saved ? `<p class="last-score">Last score ${saved.score}/${saved.total}${saved.date ? ` · ${esc(saved.date)}` : ""}</p>` : ""}<div class="q-lines">${lines}</div><button type="button" class="btn solid" data-act="mapsubmit" data-lesson="${lesson.id}">${ic("check")}Submit answers</button>`;
}

export function submitMapLesson(id) {
  const lesson = LESSONS.find((L) => L.id === id) || LESSONS[0];
  const attempt = mapAttempt(lesson.id);
  if (lesson.qs.some((q) => !attempt.picks[q.n])) return false;
  const rows = lesson.qs.map((q) => {
    const answer = lessonAnswer(lesson, q);
    return { ...q, pick: attempt.picks[q.n], answer, right: attempt.picks[q.n] === answer };
  });
  const score = rows.filter((r) => r.right).length;
  attempt.result = { score, total: lesson.qs.length, rows };
  store.set(lesson.storeKey, { score, total: lesson.qs.length, date: today(), picks: { ...attempt.picks } });
  return true;
}
export function resetMapLesson(id) {
  const attempt = mapAttempt(id || "farm");
  attempt.picks = {};
  attempt.result = null;
}

const GO = {
  reading: ["book", "green", "Reading", url("reading"), "Question types and a passage."],
  writing: ["pen", "violet", "Writing", url("writing"), "Task 1, Task 2, then your draft."],
  speaking: ["mic", "red", "Speaking", url("speaking"), "A cue card and a short recording."],
  listening: ["head", "blue", "Listening", url("listening-map"), "Map lessons, picture notes, then the audio."]
};
export const learnLogs = () => store.get("mmi-learnlog", []);
export function saveLearnLog(module, date, note) {
  if (!GO[module]) return "Pick a module.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return "Pick a date.";
  const text = String(note || "").trim().slice(0, 280);
  if (!text) return "Write what you did.";
  const l = learnLogs();
  const row = { date, module, note: text, saved: new Date().toISOString() };
  const i = l.findIndex((x) => x.date === date && x.module === module);
  if (i >= 0) l[i] = row; else l.unshift(row);
  l.sort((a, b) => b.date.localeCompare(a.date));
  store.set("mmi-learnlog", l);
  return "";
}
function prettyDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function learnDay() {
  const q = new URLSearchParams(location.search).get("learn");
  return q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : (learnState.day || today());
}
export function learnSummary(limit = 5, module = "", date = "") {
  let rows = learnLogs().slice();
  if (module) rows = rows.filter((r) => r.module === module);
  if (date) rows = rows.filter((r) => r.date === date);
  rows = rows.slice(0, limit);
  if (!rows.length) return `<div class="empty"><b>No learning notes yet</b>Pick a date and a module, study in that section, then write what you did.</div>`;
  return `<div class="learn-log">${rows.map((r) => {
    const [icon, tone, name] = GO[r.module] || ["cap", "violet", r.module];
    return `<article class="learn-row g-${tone}"><span class="ico t-${tone}">${ic(icon)}</span><span><b>${esc(name)}</b><small>${esc(prettyDate(r.date))}</small></span><p>${esc(r.note)}</p></article>`;
  }).join("")}</div>`;
}
export function learnFinish(module) {
  const [icon, tone, name] = GO[module];
  const day = learnDay();
  const saved = learnLogs().find((x) => x.module === module && x.date === day);
  return `<section class="card learn-finish" id="learn-done">
    <div class="section-head"><h2>${ic("check")}After this ${esc(name)}</h2><span class="more">${esc(prettyDate(day))}</span></div>
    <p class="note">When you finish, write what you did. Home and this section keep the note.</p>
    <form class="learn-form" data-form="learnlog">
      <input type="hidden" name="module" value="${module}">
      <label class="field">Date<input type="date" name="date" value="${esc(day)}" required></label>
      <label class="field">What I did<textarea name="note" required maxlength="280" placeholder="For example: I practised a listening map and checked the letters.">${saved ? esc(saved.note) : ""}</textarea></label>
      <button class="btn solid" type="submit">${ic("check")}${saved ? "Update feedback" : "Save feedback"}</button>
    </form>
    <div class="learn-past"><h3>${ic(icon)}Your ${esc(name)} notes</h3>${learnSummary(4, module)}</div>
  </section>`;
}
function lessonPanel() {
  const [icon, tone, name, dest, blurb] = GO[learnState.mod];
  const day = learnState.day || today();
  const saved = learnLogs().find((x) => x.module === learnState.mod && x.date === day);
  return `<a class="lesson" href="${dest}?learn=${esc(day)}"><span class="ico t-${tone}">${ic(icon)}</span><span class="lesson-copy"><b>Start ${esc(name)}</b><small>${esc(prettyDate(day))} · ${esc(blurb)}</small><span>${saved ? esc(saved.note) : "Opens this section. Write what you did when you finish."}</span></span><span class="lesson-go">${ic("arrow")}</span></a>
    <div class="learn-past"><h3>Notes on ${esc(prettyDate(day))}</h3>${learnSummary(4, "", day)}</div>`;
}

export function pageLearn() {
  const mods = MODS.map(([id, icon, tone, name]) => `<button type="button" class="mod g-${tone} ${learnState.mod === id ? "on" : ""}" data-act="learnmod" data-v="${id}"><span class="ico t-${tone}">${ic(icon)}</span><span class="body"><b>${name}</b><small>${id === "listening" ? "Map lesson" : "Open section"}</small></span></button>`).join("");
  const main = `
    ${hero({
      cls: "listen wide", photo: true,
      crumb: `<a href="${url("home")}">Home</a> › My Learning`,
      title: "My Learning",
      icon: "cap",
      tone: "violet",
      tag: "Reading · Writing · Speaking · Listening",
      sub: "Pick a date, choose one module, and study in that section. When you finish, write what you did.",
      actions: `<button type="button" class="btn solid" data-act="scroll" data-v="learn-hub">${ic("cap")}Pick a module</button>`
    })}
    <section class="card learn-hub" id="learn-hub">
      <div class="section-head"><h2>${ic("grid")}Four modules</h2><span class="more">R · W · S · L</span></div>
      <label class="learn-date">${ic("cal")}Learn on<input id="learn-date" type="date" value="${esc(learnState.day || today())}"></label>
      <div class="mod-row">${mods}</div>
      <div class="mod-panel">${lessonPanel()}</div>
    </section>`;
  return shell("l-main", "", main);
}

export function pageListeningMap() {
  const i = mapLessonIndex();
  const lesson = LESSONS[i];
  const from = lesson.qs[0].n;
  const to = lesson.qs[lesson.qs.length - 1].n;
  const main = `
    ${hero({
      cls: "listen wide", photo: true,
      crumb: `<a href="${url("home")}">Home</a> › <a href="${url("learn")}">My Learning</a> › Listening`,
      title: "Listening Map",
      icon: "map",
      tone: "blue",
      tag: lesson.tag,
      sub: lesson.sub,
      actions: `<button type="button" class="btn solid" data-act="scroll" data-v="map-practice">${ic("play")}Start practice</button><button type="button" class="btn" data-act="scroll" data-v="map-notes">${ic("note")}Picture notes</button>`
    })}
    <section class="card lesson-switch">
      <div class="section-head"><h2>${ic("map")}Map pages</h2><span class="more">${i + 1} / ${LESSONS.length}</span></div>
      <p class="note">One map on each page. This page is ${esc(lesson.title)}.</p>
      ${lessonPager(i)}
    </section>
    <section class="card" id="map-view">
      <div class="section-head"><h2>${ic("map")}The map</h2><span class="more">For looking</span></div>
      <figure class="map-view${lesson.roomy ? " roomy" : ""}"><img src="${lesson.img}" alt="${esc(lesson.alt)}"><figcaption>${esc(lesson.caption)}</figcaption></figure>
    </section>
    <section class="card" id="map-notes">
      <div class="section-head"><h2>${ic("note")}Picture notes</h2><span class="more">${esc(lesson.notesMore)}</span></div>
      <p class="note-key"><span><i class="swatch you"></i>Blue arrow = you</span><span><i class="swatch pin"></i>Pink mark = the place</span><span class="bn">নীল তীর মানে তুমি। গোলাপি দাগ মানে জায়গাটা।</span></p>
      <div class="pills">${notePills()}</div>
      <div id="note-board">${noteBoard()}</div>
    </section>
    <section class="card" id="map-practice">
      <div class="section-head"><h2>${ic("target")}Practice</h2><span class="more">Questions ${from}–${to}</span></div>
      <div class="practice-grid">
        <figure class="map-sheet"><img src="${lesson.img}" alt="${esc(lesson.sheetAlt)}"><figcaption>${esc(lesson.sheetCaption)}</figcaption></figure>
        <div class="practice-form">
          <h3>${ic("vol")}Section 2 audio</h3>
          <audio class="map-audio" controls preload="metadata" src="${lesson.audio}">Your browser cannot play this audio.</audio>
          <p class="note">${esc(lesson.audioNote)}</p>
          ${practiceBody(lesson)}
        </div>
      </div>
    </section>
    ${learnFinish("listening")}`;
  return shell("l-main", "", main);
}

export function mapLessonHomeLine() {
  return mapScoreLine();
}
