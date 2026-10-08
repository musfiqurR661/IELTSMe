/* My Learning: four modules, today's Listening Map lesson, picture notes, and checked practice. */
import { esc, ic, hero, shell, store, today } from "../core.js?v=3";

export const learnState = { mod: "listening", group: "all" };
export const mapTry = { picks: {}, result: null };

const DAY = "8 October 2026";
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

function itemsOf(group) {
  return group.items.map((item) => Array.isArray(item) ? { en: item[0], bn: item[1], pic: item[2] } : item);
}
function card(item) {
  const pic = (PICS[item.pic] || PICS.next)();
  return `<article class="note-card${item.wide ? " span" : ""}"><div class="note-art">${pic}</div><div class="note-copy"><b>${esc(item.en)}</b><p class="bn">${esc(item.bn)}</p></div></article>`;
}
export function noteBoard() {
  const groups = learnState.group === "all" ? NOTES : NOTES.filter((g) => g.id === learnState.group);
  return groups.map((g) => `<h3 class="note-kicker">${ic(g.icon)}${esc(g.title)}</h3><div class="note-grid">${itemsOf(g).map(card).join("")}</div>`).join("");
}
function notePills() {
  const pills = [["all", "All"], ...NOTES.map((g) => [g.id, g.title])];
  return pills.map(([id, label]) => `<button type="button" class="pill ${learnState.group === id ? "on" : ""}" data-act="notegroup" data-v="${id}">${esc(label)}</button>`).join("");
}

function savedScore() {
  const saved = store.get("mmi-maplesson", null);
  return saved && typeof saved.score === "number" ? saved : null;
}
function practiceBody() {
  const result = mapTry.result;
  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    const msg = result.score === result.total ? "All six. The map is clear." : result.score >= 4 ? "Most of the map is in place." : "Listen once more, from where you are standing.";
    const rows = result.rows.map((r) => `<article class="q-result ${r.right ? "ok" : "bad"}"><div><b>${r.n} ${esc(r.name)}</b><span>${r.right ? `You chose ${esc(r.pick)}` : `You chose ${esc(r.pick)} · answer ${esc(r.answer)}`}</span><p>${esc(r.why)}</p></div><em>${r.right ? "Correct" : "Not this one"}</em></article>`).join("");
    return `<div class="score-banner"><div class="plan-meter" style="--p:${pct}"><b>${result.score}/${result.total}</b></div><div><b>${msg}</b><p class="note">Checked just now. Your score stays on this browser.</p></div></div><div class="q-results">${rows}</div><button type="button" class="btn" data-act="mapretry">${ic("refresh")}Try again</button>`;
  }
  const saved = savedScore();
  const lines = QS.map((q) => `<div class="q-line"><div class="q-name"><b>${q.n}</b> ${esc(q.name)}</div><div class="letters" role="group" aria-label="${esc(q.name)}">${LETTERS.map((L) => `<button type="button" class="letter ${mapTry.picks[q.n] === L ? "on" : ""}" data-act="mappick" data-q="${q.n}" data-v="${L}" aria-pressed="${mapTry.picks[q.n] === L ? "true" : "false"}">${L}</button>`).join("")}</div></div>`).join("");
  return `${saved ? `<p class="last-score">Last score ${saved.score}/${saved.total}${saved.date ? ` · ${esc(saved.date)}` : ""}</p>` : ""}<div class="q-lines">${lines}</div><button type="button" class="btn solid" data-act="mapsubmit">${ic("check")}Submit answers</button>`;
}

export function submitMapLesson() {
  if (QS.some((q) => !mapTry.picks[q.n])) return false;
  const rows = QS.map((q) => ({ ...q, pick: mapTry.picks[q.n], answer: KEY[q.n], right: mapTry.picks[q.n] === KEY[q.n] }));
  const score = rows.filter((r) => r.right).length;
  mapTry.result = { score, total: QS.length, rows };
  store.set("mmi-maplesson", { score, total: QS.length, date: today(), picks: { ...mapTry.picks } });
  return true;
}
export function resetMapLesson() {
  mapTry.picks = {};
  mapTry.result = null;
}

function lessonPanel() {
  const saved = savedScore();
  if (learnState.mod !== "listening") {
    const name = MODS.find((m) => m[0] === learnState.mod)[3];
    return `<div class="empty"><b>No ${esc(name)} lesson yet</b>Today's lesson is in Listening.</div><button type="button" class="btn solid learn-jump" data-act="learnmod" data-v="listening">${ic("head")}Open today's Listening lesson</button>`;
  }
  return `<a class="lesson" href="#listening-map"><span class="ico t-blue">${ic("map")}</span><span class="lesson-copy"><b>Listening Map</b><small>Today · ${DAY} · Questions 15–20</small><span class="bn">ফার্মের ম্যাপ। ছবির নোট দেখো, তারপর অডিও শুনে A–I বসাও।</span></span>${saved ? `<em class="lesson-score">${saved.score}/${saved.total}</em>` : `<span class="lesson-go">${ic("arrow")}</span>`}</a>`;
}

export function pageLearn() {
  const mods = MODS.map(([id, icon, tone, name]) => `<button type="button" class="mod g-${tone} ${learnState.mod === id ? "on" : ""}" data-act="learnmod" data-v="${id}"><span class="ico t-${tone}">${ic(icon)}</span><span class="body"><b>${name}</b><small>${id === "listening" ? "1 lesson" : "No lesson yet"}</small></span></button>`).join("");
  const main = `
    ${hero({
      scene: "listening",
      crumb: `<a href="#home">Home</a> › My Learning`,
      title: "My Learning",
      icon: "cap",
      tone: "violet",
      tag: "Reading · Writing · Speaking · Listening",
      sub: "Your own lessons, one module at a time. Today is a listening map.",
      actions: `<a class="btn solid" href="#listening-map">${ic("map")}Open today's lesson</a>`
    })}
    <section class="card learn-hub">
      <div class="section-head"><h2>${ic("grid")}Four modules</h2><span class="more">R · W · S · L</span></div>
      <div class="mod-row">${mods}</div>
      <div class="mod-panel">${lessonPanel()}</div>
    </section>`;
  return shell("l-main", "", main);
}

export function pageListeningMap() {
  const main = `
    ${hero({
      scene: "listening",
      crumb: `<a href="#home">Home</a> › <a href="#learn">My Learning</a> › Listening`,
      title: "Listening Map",
      icon: "map",
      tone: "blue",
      tag: `Today · ${DAY}`,
      sub: "Look at the farm map, learn the phrases from the pictures, then listen and submit letters A to I.",
      actions: `<button type="button" class="btn solid" data-act="scroll" data-v="map-practice">${ic("play")}Start practice</button><button type="button" class="btn" data-act="scroll" data-v="map-notes">${ic("note")}Picture notes</button>`
    })}
    <section class="card" id="map-view">
      <div class="section-head"><h2>${ic("map")}The map</h2><span class="more">For looking</span></div>
      <figure class="map-view"><img src="img/learn/listening-map.jpg" alt="Farm map for questions 15 to 20. Letters A to I mark the places. You are at the X by the New Barn."><figcaption>You are at the X, by the New Barn. Letters A–I are the places. Use this picture while you study. Put your answers in the practice.</figcaption></figure>
    </section>
    <section class="card" id="map-notes">
      <div class="section-head"><h2>${ic("note")}Picture notes</h2><span class="more">From your class notes</span></div>
      <p class="note-key"><span><i class="swatch you"></i>Blue arrow = you</span><span><i class="swatch pin"></i>Pink mark = the place</span><span class="bn">নীল তীর মানে তুমি। গোলাপি দাগ মানে জায়গাটা।</span></p>
      <div class="pills">${notePills()}</div>
      <div id="note-board">${noteBoard()}</div>
    </section>
    <section class="card" id="map-practice">
      <div class="section-head"><h2>${ic("target")}Practice</h2><span class="more">Questions 15–20</span></div>
      <div class="practice-grid">
        <figure class="map-sheet"><img src="img/learn/listening-map.jpg" alt="The same farm map, kept beside the questions."><figcaption>Keep this map in view while you listen.</figcaption></figure>
        <div class="practice-form">
          <h3>${ic("vol")}Section 2 audio</h3>
          <audio class="map-audio" controls preload="metadata" src="audio/a11t1l2.mp3">Your browser cannot play this audio.</audio>
          <p class="note">This is the full Section 2 recording. Questions 15–20 are the map. Choose a letter for every place, then submit.</p>
          ${practiceBody()}
        </div>
      </div>
    </section>`;
  return shell("l-main", "", main);
}
