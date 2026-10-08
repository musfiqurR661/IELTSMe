/* Shared helpers, icons, state, and layout pieces. */
export const D = window.MMI_DATA;
export const W = window.MMI_WORDS;
export const G = window.MMI_GROUPS;
export const app = document.getElementById("app");
export const modal = document.getElementById("modal");
export const api = { render() {} };

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
};
const pad = (n) => String(n).padStart(2, "0");
const dkey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => dkey(new Date());
export const wordById = (id) => W.find((w) => w.id === id);
export const SK = ["listening", "speaking", "reading", "writing"];
export const SKN = { listening: "Listening", speaking: "Speaking", reading: "Reading", writing: "Writing" };
export const GCOL = { A: "#4a3af0", B: "#ec315a", C: "#f06a24", D: "#12a36d", E: "#7240e8", F: "#1b8fe8" };

/* ---------- icons ---------- */
const I = {
  home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/>',
  head: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  book: '<path d="M12 6c-2-1.5-5-2-8-1.5V18c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6z"/><path d="M12 6v13.5"/>',
  pen: '<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/><path d="m14.5 6.5 3 3"/>',
  books: '<rect x="4" y="4" width="4.5" height="16" rx="1"/><rect x="10" y="4" width="4.5" height="16" rx="1"/><path d="m16.5 6.5 4 1-3.5 12.5-4-1z"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 8.8 4.6 4.6 0 0 0 7 18z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  cl: '<path d="m15 6-6 6 6 6"/>',
  cr: '<path d="m9 6 6 6-6 6"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  mark: '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/>',
  trash: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M12 21c4 0 6.500-2.700 6.500-6 0-3.500-2.500-5-3.500-8-2 1.200-3 3-3 5-1.200-.5-2-1.500-2-3-2 1.500-4.500 3.500-4.500 6 0 3.500 2.500 6 6.500 6z"/>',
  star: '<path d="m12 4 2.400 5 5.600.8-4 3.900 1 5.500L12 16.500 7 19.200l1-5.500-4-3.900L9.600 9z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.500"/><circle cx="12" cy="12" r=".8"/>',
  map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  vol: '<path d="M4 10v4h3.500l5 4V6l-5 4z"/><path d="M16 9a4 4 0 0 1 0 6M18.500 6.500a8 8 0 0 1 0 11"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.500" cy="6" r="1"/><circle cx="4.500" cy="12" r="1"/><circle cx="4.500" cy="18" r="1"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.500"/><rect x="13" y="4" width="7" height="7" rx="1.500"/><rect x="4" y="13" width="7" height="7" rx="1.500"/><rect x="13" y="13" width="7" height="7" rx="1.500"/>',
  chart: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
  note: '<path d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.500 13h7M8.500 17h5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.700.600 1 1.300 1 2.100h5c0-.8.300-1.500 1-2.100A6 6 0 0 0 12 3z"/>',
  globe: '<circle cx="12" cy="12" r="8.500"/><path d="M3.500 12h17M12 3.500c2.500 2.500 3.500 5.500 3.500 8.500s-1 6-3.500 8.500c-2.500-2.500-3.500-5.500-3.500-8.500s1-6 3.500-8.500z"/>',
  flag: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',
  edit: '<path d="M4 20h4L19 9a2.800 2.800 0 0 0-4-4L4 16z"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4"/>',
  shuffle: '<path d="M4 7h3c5 0 5 10 10 10h3M4 17h3c1.500 0 2.500-.8 3.300-2M13.700 9C14.500 7.800 15.500 7 17 7h3M17 4l3 3-3 3M17 14l3 3-3 3"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
  bell: '<path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15zM10 21h4"/>',
  wrong: '<circle cx="12" cy="12" r="8.500"/><path d="m9 9 6 6M15 9l-6 6"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8"/>',
  palette: '<path d="M12 4a8 8 0 0 0-8 8c0 2.8 1.8 4.6 4.2 4.6H12a1.8 1.8 0 0 0 1.8-1.8A1.4 1.4 0 0 1 15.2 13.4H18a4 4 0 0 0 0-8.4"/><circle cx="8" cy="10" r=".8"/><circle cx="11" cy="7.4" r=".8"/><circle cx="15" cy="8" r=".8"/>',
  case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18"/>',
  mountain: '<path d="M5 19C5 10 12 4.5 20 5.2 19 13 13.2 19 5 19z"/><path d="M9 16c2-1.8 4.4-3.4 7.2-4.2"/>',
  bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 10h16M7.5 17.5v2M16.5 17.5v2"/><circle cx="8" cy="13.2" r=".9"/><circle cx="16" cy="13.2" r=".9"/>',
  pin: '<path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2"/>',
  coin: '<ellipse cx="12" cy="6.5" rx="7" ry="2.6"/><path d="M5 6.5v5.2c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6V6.5"/><path d="M5 11.7v5c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6v-5"/>',
  ball: '<path d="M6 9v6M4 10.2v3.6M8 7.5v9M18 9v6M20 10.2v3.6M16 7.5v9M8 12h8"/>'
};
export const ic = (n, c = "") => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;
export const icf = (n, c = "") => ic(n, "fill " + c);
export const ico = (n, tone) => `<span class="ico t-${tone}">${ic(n)}</span>`;
export const ext = (href, label, extra = "") => `<a href="${esc(href)}" target="_blank" rel="noopener" ${extra}>${label}</a>`;

/* ---------- state ---------- */
export const S = {
  topicCat: "All", topicQ: "", mapGroup: "A", mapWord: 1, mapPage: 0, labels: true,
  cue: 0, spTab: "record", spTopic: "Travel", spPart: "p1",
  t1: "line", t2: "opinion", rtype: "mc", ideaTopic: "Technology", draft: "", draftType: "Task 2", draftTitle: "",
  bookCat: "All", bookQ: "", bookView: "grid", bookSort: "default",
  mistakeSkill: "All", wordGroup: "All"
};
export const learned = () => new Set(store.get("mmi-learned", []));
export const checks = () => store.get("mmi-checks", {});

export function tickList(skill, date = today()) { const c = checks(); return (c[date] && c[date][skill]) || []; }
export function isTicked(id, skill) { return tickList(skill).includes(id); }
export function toggleTick(id, skill, on) {
  const c = checks(); const d = today();
  c[d] = c[d] || {}; const l = new Set(c[d][skill] || []);
  on ? l.add(id) : l.delete(id);
  c[d][skill] = [...l]; store.set("mmi-checks", c);
}
export function weekPct(skill) {
  const c = checks(); let n = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const l = (c[dkey(d)] && c[dkey(d)][skill]) || [];
    n += Math.min(l.length, 5);
  }
  return Math.min(100, Math.round((n / 35) * 100));
}
export function overall() { return Math.round(SK.reduce((a, s) => a + weekPct(s), 0) / 4); }
export function todayDone(ids) { return ids.filter((x) => isTicked(x[0], x[1])).length; }
export function streak() {
  const c = checks(); let n = 0; const d = new Date();
  const has = (dt) => { const o = c[dkey(dt)]; return o && Object.values(o).some((a) => a.length); };
  if (!has(d)) d.setDate(d.getDate() - 1);
  while (has(d)) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------- illustrations ---------- */
function sky(id, c1, c2, hill1, hill2) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <rect width="600" height="300" fill="url(#${id})"/>
  <g fill="#fff" opacity=".85"><ellipse cx="120" cy="60" rx="46" ry="14"/><ellipse cx="150" cy="50" rx="30" ry="14"/><ellipse cx="470" cy="38" rx="42" ry="12"/><ellipse cx="500" cy="30" rx="26" ry="12"/></g>
  <path d="M0 250C90 215 170 225 260 245S450 265 600 225V300H0z" fill="${hill1}"/>
  <path d="M0 275C140 250 260 270 380 265S540 255 600 268V300H0z" fill="${hill2}"/>`;
}
export function scene(kind) {
  const cfg = {
    home: ["#dbe8ff", "#efe4ff", "#bfe6c8", "#a4d8b4"], listening: ["#d6eeff", "#eaf7ff", "#b9e4d0", "#9fd6bf"],
    speaking: ["#ffe6d8", "#fff4ea", "#ffd9b8", "#f7c79b"], reading: ["#dbf4e1", "#f2fff5", "#b7e3bd", "#9bd6a5"],
    writing: ["#e9defe", "#fbf4ff", "#cfc3f5", "#bcaeef"], books: ["#e6e1ff", "#f6f2ff", "#cdc6f6", "#b8b0ee"],
    resources: ["#d9edff", "#edf6ff", "#bfdcf5", "#a8cdee"]
  }[kind] || ["#dbe8ff", "#efe4ff", "#bfe6c8", "#a4d8b4"];
  let o = "";
  if (kind === "listening") {
    o = `<path d="M335 175v-30a95 95 0 0 1 190 0v30" fill="none" stroke="#1b8fe8" stroke-width="20" stroke-linecap="round"/>
    <rect x="318" y="165" width="42" height="74" rx="18" fill="#ec315a"/><rect x="500" y="165" width="42" height="74" rx="18" fill="#ec315a"/>
    <g fill="none" stroke="#1b8fe8" stroke-width="5" stroke-linecap="round" opacity=".55"><path d="M290 160q-18 22 0 44"/><path d="M270 150q-30 32 0 64"/><path d="M570 160q18 22 0 44"/><path d="M590 150q30 32 0 64"/></g>
    <g fill="#7240e8"><circle cx="400" cy="70" r="9"/><rect x="407" y="34" width="4" height="38"/><circle cx="480" cy="52" r="7" fill="#12a36d"/><rect x="485" y="22" width="4" height="32" fill="#12a36d"/></g>`;
  } else if (kind === "speaking") {
    o = `<rect x="405" y="60" width="64" height="112" rx="32" fill="#f0592b"/><path d="M382 140a55 55 0 0 0 110 0M437 195v34M410 232h54" fill="none" stroke="#d8480f" stroke-width="10" stroke-linecap="round"/>
    <path d="M270 70h110a20 20 0 0 1 20 20v28a20 20 0 0 1-20 20h-62l-26 22 4-22h-26a20 20 0 0 1-20-20V90a20 20 0 0 1 20-20z" fill="#ec315a"/>
    <g fill="#fff"><circle cx="300" cy="104" r="6"/><circle cx="326" cy="104" r="6"/><circle cx="352" cy="104" r="6"/></g>
    <path d="M520 100h60a16 16 0 0 1 16 16v20a16 16 0 0 1-16 16h-30l-18 16 3-16h-15a16 16 0 0 1-16-16v-20a16 16 0 0 1 16-16z" fill="#f59523"/>`;
  } else if (kind === "reading") {
    o = `<path d="M440 110c-30-22-80-26-120-14v126c40-12 90-8 120 14 30-22 80-26 120-14V96c-40-12-90-8-120 14z" fill="#fff" stroke="#13a56f" stroke-width="8" stroke-linejoin="round"/>
    <path d="M440 110v126" stroke="#13a56f" stroke-width="6"/><g stroke="#9ed9bd" stroke-width="5" stroke-linecap="round"><path d="M340 130c24-6 54-4 78 6M340 154c24-6 54-4 78 6M340 178c24-6 54-4 78 6M462 136c24-10 54-12 78-6M462 160c24-10 54-12 78-6"/></g>
    <rect x="330" y="236" width="220" height="16" rx="4" fill="#f06a24"/><rect x="346" y="252" width="190" height="14" rx="4" fill="#7240e8"/>
    <g fill="#52c08f"><path d="M560 160c10-30 34-40 50-38-4 24-20 42-50 38z"/><path d="M290 150c-4-24-22-34-40-32 2 20 14 34 40 32z"/></g>`;
  } else if (kind === "writing") {
    o = `<rect x="340" y="70" width="170" height="190" rx="14" fill="#fff" stroke="#7240e8" stroke-width="8" transform="rotate(-5 425 165)"/>
    <g stroke="#cdbdf6" stroke-width="5" stroke-linecap="round" transform="rotate(-5 425 165)"><path d="M366 112h118M366 140h118M366 168h118M366 196h80"/></g>
    <g transform="rotate(32 520 140)"><rect x="490" y="60" width="26" height="150" rx="6" fill="#f06a24"/><path d="M490 210h26l-13 28z" fill="#ffd9b8"/><rect x="490" y="60" width="26" height="22" rx="6" fill="#ec315a"/></g>
    <path d="M270 220h50v28a14 14 0 0 1-14 14h-22a14 14 0 0 1-14-14z" fill="#fff" stroke="#7240e8" stroke-width="6"/>`;
  } else if (kind === "books") {
    o = `<rect x="320" y="228" width="260" height="14" rx="4" fill="#8a6b4a"/><rect x="320" y="150" width="260" height="12" rx="4" fill="#8a6b4a"/>
    <g><rect x="332" y="166" width="30" height="62" rx="4" fill="#ec315a"/><rect x="366" y="176" width="26" height="52" rx="4" fill="#1b8fe8"/><rect x="396" y="160" width="32" height="68" rx="4" fill="#f59523"/><rect x="432" y="172" width="28" height="56" rx="4" fill="#12a36d"/><rect x="464" y="164" width="30" height="64" rx="4" fill="#7240e8"/><path d="m500 232 24-62 28 10-24 62z" fill="#17407e"/></g>
    <g><rect x="334" y="90" width="28" height="60" rx="4" fill="#12a36d"/><rect x="366" y="98" width="34" height="52" rx="4" fill="#7240e8"/><rect x="404" y="82" width="26" height="68" rx="4" fill="#1b8fe8"/><rect x="434" y="94" width="32" height="56" rx="4" fill="#ec315a"/></g>`;
  } else if (kind === "resources") {
    o = `<rect x="330" y="60" width="200" height="130" rx="14" fill="#fff" stroke="#1b8fe8" stroke-width="7"/><path d="M330 92h200" stroke="#1b8fe8" stroke-width="6"/><g><circle cx="350" cy="76" r="5" fill="#ec315a"/><circle cx="368" cy="76" r="5" fill="#f59523"/><circle cx="386" cy="76" r="5" fill="#12a36d"/></g>
    <g fill="#cfe3fb"><rect x="350" y="108" width="80" height="12" rx="6"/><rect x="350" y="130" width="150" height="12" rx="6"/><rect x="350" y="152" width="110" height="12" rx="6"/></g>
    <rect x="460" y="150" width="110" height="90" rx="12" fill="#7240e8"/><path d="M490 196l12 12 22-26" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M290 190a22 22 0 0 1 30-6l12 10M352 218a22 22 0 0 1-30 6l-12-10M300 212l40-34" fill="none" stroke="#f06a24" stroke-width="9" stroke-linecap="round"/>`;
  } else {
    o = `<rect x="320" y="200" width="250" height="16" rx="5" fill="#4a3af0"/><rect x="336" y="216" width="214" height="16" rx="5" fill="#ec315a"/><rect x="352" y="232" width="190" height="14" rx="5" fill="#f59523"/>
    <path d="M400 200V98a10 10 0 0 1 10-10h110a10 10 0 0 1 10 10v102z" fill="#fff" stroke="#4a3af0" stroke-width="8"/><rect x="418" y="106" width="94" height="62" rx="6" fill="#dfe8ff"/>
    <path d="M426 150l22-24 18 16 24-30" fill="none" stroke="#4a3af0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M300 200c-4-34 10-62 40-76 8 30-4 62-40 76z" fill="#52c08f"/><path d="M300 200c8-30 30-52 56-60" fill="none" stroke="#2f9a6c" stroke-width="4"/>
    <rect x="560" y="120" width="10" height="80" fill="#8a6b4a"/><path d="M542 120h46l-8-26h-30z" fill="#f59523"/>`;
  }
  return `<svg viewBox="0 0 600 300" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">${sky("s" + kind, cfg[0], cfg[1], cfg[2], cfg[3])}${o}</svg>`;
}
export function banner(text, id, dark) {
  return `<div class="banner ${dark ? "dark" : ""}"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark ? "#33307d" : "#cfe0ff"}"/><stop offset=".6" stop-color="${dark ? "#8a5bd0" : "#ffd9e7"}"/><stop offset="1" stop-color="${dark ? "#f08a9e" : "#ffe9c9"}"/></linearGradient></defs><rect width="400" height="200" fill="url(#b${id})"/><circle cx="110" cy="132" r="36" fill="#ffe08a" opacity=".95"/><path d="M0 150c70-30 120-18 190 0s150 12 210-14v64H0z" fill="${dark ? "#4d3b9c" : "#8cc9a6"}"/><path d="M0 178c90-22 170 4 250-6s110-8 150 2v26H0z" fill="${dark ? "#352a78" : "#5eb08a"}"/></svg><p>${text}</p></div>`;
}
export function deco(kind) {
  const m = {
    l: '<path d="M30 110v-22a36 36 0 0 1 72 0v22" fill="none" stroke="#1b9be8" stroke-width="9" stroke-linecap="round"/><rect x="22" y="104" width="18" height="34" rx="8" fill="#1b9be8"/><rect x="92" y="104" width="18" height="34" rx="8" fill="#1b9be8"/>',
    s: '<rect x="52" y="30" width="30" height="58" rx="15" fill="#f0592b"/><path d="M40 78a27 27 0 0 0 54 0M67 106v16" fill="none" stroke="#d8480f" stroke-width="6" stroke-linecap="round"/><path d="M96 40h28a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-14l-10 8 2-8h-6z" fill="#f7b14d"/>',
    r: '<path d="M70 50c-14-10-34-12-50-6v70c16-6 36-4 50 6 14-10 34-12 50-6V44c-16-6-36-4-50 6z" fill="#fff" stroke="#13a56f" stroke-width="6" stroke-linejoin="round"/><path d="M70 50v70" stroke="#13a56f" stroke-width="4"/>',
    w: '<rect x="30" y="34" width="68" height="88" rx="8" fill="#fff" stroke="#7240e8" stroke-width="6"/><path d="M44 62h40M44 82h40M44 102h26" stroke="#cdbdf6" stroke-width="5" stroke-linecap="round"/><path d="m100 120 28-60 12 6-22 58z" fill="#f06a24"/>'
  }[kind];
  return `<svg class="deco" viewBox="0 0 150 150" aria-hidden="true">${m}</svg>`;
}

/* ---------- shared components ---------- */
export function menu(title, icon, items, on) {
  return `<nav class="menu"><h2>${ic(icon)}${esc(title)}</h2>${items.map((it, i) => {
    const [i2, label, href, kind] = it;
    if (kind === "ext") return `<a href="${esc(href)}" target="_blank" rel="noopener">${ic(i2)}<span>${esc(label)}</span></a>`;
    if (kind === "act") return `<button type="button" class="m ${i === on ? "on" : ""}" data-act="${esc(href)}" ${it[4] ? `data-v="${esc(it[4])}"` : ""}>${ic(i2)}<span>${esc(label)}</span></button>`;
    return `<a href="${esc(href)}" class="${i === on ? "on" : ""}">${ic(i2)}<span>${esc(label)}</span></a>`;
  }).join("")}</nav>`;
}
export function bar(label, pct, cls, icon) {
  return `<div class="bar-row">${icon ? ico(icon.n, icon.t) : `<span></span>`}<div><div style="margin-bottom:4px">${esc(label)}</div><div class="track"><i class="${cls}" style="width:${pct}%"></i></div></div><b>${pct}%</b></div>`;
}
export function progressCard() {
  const rows = [
    ["Listening", weekPct("listening"), "f-blue", { n: "head", t: "blue" }], ["Speaking", weekPct("speaking"), "f-red", { n: "mic", t: "red" }],
    ["Reading", weekPct("reading"), "f-green", { n: "book", t: "green" }], ["Writing", weekPct("writing"), "f-violet", { n: "pen", t: "violet" }]
  ];
  const o = overall();
  return `${rows.map((r) => bar(...r)).join("")}<div class="overall"><div class="bar-row"><div>Overall<div class="track" style="margin-top:4px"><i class="f-brand" style="width:${o}%"></i></div></div><b>${o}%</b></div></div>
  <p class="note">Calculated from the tasks you tick over the last 7 days (35 per skill).</p>`;
}
export function checklist(key, title) {
  const items = D.checklists[key]; const done = todayDone(items);
  return `<div class="card"><h3>${ic("check")}${esc(title)}<span class="done-count">${done}/${items.length} done</span></h3><div class="checks">${items.map(([id, sk, label]) =>
    `<label class="check"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span>${esc(label)}</span></label>`).join("")}</div></div>`;
}
export function hero(o) {
  const art = o.photo ? "" : `<div class="hero-art">${scene(o.scene)}</div>`;
  return `<section class="hero ${o.cls || ""}">${art}<div class="hero-copy">
    <div class="crumb">${o.crumb}</div><h1>${o.icon ? `<span class="c-${o.tone}">${ic(o.icon)}</span>` : ""}<span class="${o.plain ? "" : "grad"}">${esc(o.title)}</span></h1>
    ${o.tag ? `<p class="tag">${esc(o.tag)}</p>` : ""}<p class="sub">${esc(o.sub)}</p>${o.actions ? `<div class="hero-actions">${o.actions}</div>` : ""}${o.after || ""}</div>${o.right || ""}</section>`;
}
export const PAGE_FILE = {
  home: "/", learn: "/learn", "listening-map": "/listening-map", listening: "/listening",
  map: "/map", words: "/words", speaking: "/speaking", reading: "/reading", writing: "/writing",
  essays: "/essays", books: "/books", resources: "/resources", mistakes: "/mistakes", notes: "/notes"
};
export const url = (name) => PAGE_FILE[name] || PAGE_FILE.home;
export const crumb = (name) => `<a href="${url("home")}">Home</a> › ${esc(name)}`;
export const shell = (cls, side, main, rail) => `<div class="page ${cls}">${side ? `<aside class="side">${side}</aside>` : ""}<div class="main">${main}</div>${rail ? `<aside class="rail">${rail}</aside>` : ""}</div>`;
export const lizBtn = (href, label) => ext(href, `${ic("ext")}${esc(label)}`, 'class="btn"');

export const mmss = (s) => `${Math.floor(s / 60)}:${pad(s % 60)}`;
