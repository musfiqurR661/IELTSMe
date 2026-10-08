import { D, W, G, S, esc, ic, hero, crumb, shell, learned, wordById, GCOL, ext, url } from "../core.js?v=5";
import { listenMenu } from "./listening.js";

const PLACES = [
  { id: 1, n: "Library", x: 60, y: 40, w: 118, h: 72, c: "#f2c36b", r: "#b86e3a" },
  { id: 2, n: "School", x: 200, y: 36, w: 128, h: 84, c: "#f6ece0", r: "#ec315a" },
  { id: 16, n: "Hospital", x: 450, y: 38, w: 118, h: 82, c: "#fff", r: "#ec315a" },
  { id: 7, n: "Bank", x: 596, y: 52, w: 100, h: 66, c: "#d9e6f5", r: "#3a6cf0" },
  { id: 24, n: "Supermarket", x: 40, y: 262, w: 140, h: 78, c: "#ffe2b3", r: "#12a36d" },
  { id: 33, n: "Cafe", x: 204, y: 262, w: 100, h: 70, c: "#f8d6dc", r: "#7240e8" },
  { id: 10, n: "Hotel", x: 452, y: 248, w: 112, h: 68, c: "#dfe9ff", r: "#f59523" },
  { id: 14, n: "Station", x: 598, y: 246, w: 120, h: 70, c: "#e8dfd2", r: "#17407e" }
];
function townSvg(sel) {
  const on = (id) => (sel === id ? "on" : "");
  const pill = (txt, x, y) => { const w = txt.length * 7.2 + 18; return `<g class="lbl"><rect class="pill-bg" x="${x - w / 2}" y="${y - 12}" width="${w}" height="22" rx="11" fill="#fff" stroke="#c9d2fb"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="12" font-weight="700" fill="#2a3360" font-family="Plus Jakarta Sans,sans-serif">${txt}</text></g>`; };
  const b = PLACES.map((p) => `<g class="place ${on(p.id)}" data-act="place" data-v="${p.id}" tabindex="0"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="8" fill="${p.c}" stroke="#a7b0c2"/><path d="M${p.x - 4} ${p.y + 16}h${p.w + 8}l-8 -16h-${p.w - 8}z" fill="${p.r}" transform="translate(0 -8)"/><g fill="#9bb7d4"><rect x="${p.x + 14}" y="${p.y + 28}" width="16" height="16" rx="3"/><rect x="${p.x + p.w - 30}" y="${p.y + 28}" width="16" height="16" rx="3"/></g>${pill(p.n, p.x + p.w / 2, p.y + p.h + 15)}</g>`).join("");
  return `<svg viewBox="0 0 760 420" role="img" aria-label="Illustrated town map with a roundabout, river and bridge">
    <rect width="760" height="420" fill="#d3ebba"/>
    <ellipse cx="380" cy="130" rx="46" ry="26" fill="#b9e0a0"/><g fill="#69b86f"><circle cx="352" cy="124" r="11"/><circle cx="380" cy="116" r="13"/><circle cx="408" cy="126" r="10"/></g>
    <path d="M-10 372C170 330 300 392 420 352S660 318 770 346" fill="none" stroke="#8ec8ee" stroke-width="52" stroke-linecap="round"/>
    <rect x="0" y="176" width="760" height="38" fill="#7d8698"/><path d="M0 195H760" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>
    <rect x="361" y="0" width="38" height="420" fill="#7d8698"/><path d="M380 0V420" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>
    <g class="place ${on(107)}" data-act="place" data-v="107" tabindex="0"><circle cx="380" cy="195" r="52" fill="#7d8698"/><circle cx="380" cy="195" r="26" fill="#b9e0a0" stroke="#fff" stroke-width="3" stroke-dasharray="6 6"/>${pill("Roundabout", 380, 201)}</g>
    <g class="place ${on(110)}" data-act="place" data-v="110" tabindex="0"><rect x="352" y="318" width="56" height="64" rx="6" fill="#cdbfa6" stroke="#8a7a60" stroke-width="3"/><g stroke="#8a7a60" stroke-width="3"><path d="M352 336h56M352 354h56"/></g>${pill("Bridge", 380, 400)}</g>
    <g class="place ${on(109)}" data-act="place" data-v="109" tabindex="0"><g fill="#fff"><rect x="500" y="178" width="8" height="34"/><rect x="514" y="178" width="8" height="34"/><rect x="528" y="178" width="8" height="34"/></g>${pill("Crossing", 518, 232)}</g>
    <g class="place ${on(108)}" data-act="place" data-v="108" tabindex="0"><rect x="304" y="140" width="6" height="30" fill="#444"/><rect x="298" y="124" width="18" height="30" rx="5" fill="#222"/><circle cx="307" cy="132" r="4" fill="#ec315a"/><circle cx="307" cy="146" r="4" fill="#12a36d"/></g>
    ${b}
    <g transform="translate(704 372)"><circle r="30" fill="#fff" stroke="#c9d2fb" stroke-width="2"/><path d="M0 -24l7 24h-14z" fill="#ec315a"/><path d="M0 24l7 -24h-14z" fill="#9aa4c8"/><g font-size="10" font-weight="800" fill="#2a3360" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif"><text y="-32" font-size="11">N</text><text y="40">S</text><text x="-38" y="4">W</text><text x="38" y="4">E</text></g></g>
  </svg>`;
}
function highlight(sentence, term) {
  const variants = term.replace(/\([^)]*\)/g, "").split("/").map((v) => v.trim()).filter(Boolean).sort((a, b) => b.length - a.length);
  for (const v of variants) {
    const m = new RegExp(`\\b${v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").exec(sentence);
    if (m) return `${esc(sentence.slice(0, m.index))}<mark>${esc(m[0])}</mark>${esc(sentence.slice(m.index + m[0].length))}`;
  }
  return esc(sentence);
}
export const say = (t) => { try { if (!window.speechSynthesis) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t.replace(/\([^)]*\)/g, "").replace(/\//g, ", ")); u.lang = "en-GB"; u.rate = .9; speechSynthesis.speak(u); } catch (e) { /* ignore */ } };
export function pageMap() {
  const g = G.find((x) => x.id === S.mapGroup) || G[0];
  const list = W.filter((w) => w.g === g.id);
  let w = wordById(S.mapWord); if (!w || w.g !== g.id) { w = list[0]; S.mapWord = w.id; }
  const L = learned();
  const per = 8, pages = Math.ceil(list.length / per);
  S.mapPage = Math.min(S.mapPage, pages - 1);
  const slice = list.slice(S.mapPage * per, S.mapPage * per + per);
  const idx = list.findIndex((x) => x.id === w.id);
  const rel = [1, 2, 3].map((k) => list[(idx + k) % list.length]).filter((x) => x.id !== w.id);
  const gl = list.filter((x) => L.has(x.id)).length;
  const herePct = Math.round((gl / list.length) * 100);
  const allPct = Math.round((L.size / W.length) * 100);
  const catIcon = ["pin", "arrow", "map", "globe", "refresh", "link"];
  const catTone = ["blue", "orange", "green", "violet", "pink", "gold"];
  const cats = G.map((c, i) => {
    const tone = catTone[i % catTone.length];
    return `<button type="button" class="cat g-${tone} ${c.id === g.id ? "on" : ""}" data-act="mapgroup" data-v="${c.id}"><span class="ico t-${tone}">${ic(catIcon[i])}</span><span class="body"><b>${esc(c.title)}</b><small>${c.n} words</small></span></button>`;
  }).join("");
  const stats = [
    ["Categories", G.length, "grid", "blue", "map-cats"],
    ["This set", list.length, "book", "green", "map-list"],
    ["Learned here", gl, "heart", "red", "map-list"],
    ["All learned", L.size, "star", "violet", "words"]
  ].map(([name, n, icon, tone, id]) => `<a class="pg pg-${tone}" href="${id === "words" ? url("words") : "#" + id}" ${id === "words" ? "" : `data-act="scroll" data-v="${id}"`}><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></a>`).join("");
  const tipIcon = ["globe", "pin", "map", "arrow", "vol"];
  const tipTone = ["blue", "violet", "green", "orange", "teal"];
  const tips = D.tips.map.map((t, i) => `<li><span class="ico t-${tipTone[i] || "blue"}">${ic(tipIcon[i] || "bulb")}</span><span>${esc(t)}</span></li>`).join("");
  const main = `
    ${hero({ cls: "map wide", photo: true, crumb: `<a href="${url("home")}">Home</a> › <a href="${url("listening")}">Listening</a> › Map vocabulary`, title: "Map vocabulary", icon: "map", tone: "blue", tag: `${W.length} words with pictures and Bangla`, sub: "Tap a place on the town map, or choose a category and study the word card.", actions: `<button type="button" class="btn solid" data-act="quiz" data-v="${g.id}">${ic("target")}Quiz this set</button><a class="btn" href="${url("words")}">${ic("heart")}My words</a>` })}
    <section class="card home-progress listen-stats">
      <div class="section-head"><h2>${ic("chart")}This set</h2><span class="more">${esc(g.title)}</span></div>
      <div class="pg-row">${stats}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${herePct}"><b>${herePct}%</b></div><div><b>Learned in this set</b><p class="note">${gl} of ${list.length} words in ${esc(g.title)}. All map words learned: ${L.size} of ${W.length} (${allPct}%).</p></div></div>
    </section>
    <section class="card map-cats" id="map-cats">
      <div class="section-head"><h2>${ic("grid")}Categories</h2><span class="more">${esc(g.bn)}</span></div>
      <p class="note">${esc(g.en)}</p>
      <div class="cat-bar">${cats}</div>
    </section>
    <div class="map-grid">
      <section class="card map-card"><div class="head"><div><h3>${ic("map")}Town map</h3><p>Tap a building, road or sign.</p></div>
        <div class="toggle"><button type="button" class="${S.labels ? "on" : ""}" data-act="labels" data-v="1">${ic("list")}Labels</button><button type="button" class="${S.labels ? "" : "on"}" data-act="labels" data-v="0">${ic("x")}No labels</button></div></div>
        <div class="town-wrap ${S.labels ? "" : "nolabels"}">${townSvg(PLACES.some((p) => p.id === w.id) || [107, 108, 109, 110].includes(w.id) ? w.id : 0)}</div></section>
      <section class="card vocab-card"><div class="head"><span class="ico t-gold">${ic("star")}</span><span>Word card</span><span class="nav2"><button type="button" data-act="wordnav" data-v="-1" aria-label="Previous">${ic("cl")}</button>${idx + 1} / ${list.length}<button type="button" data-act="wordnav" data-v="1" aria-label="Next">${ic("cr")}</button></span></div>
        <div class="vc-main"><div class="vc-pic">${window.MMIStickers.render(w.pic, GCOL[w.g])}</div><div>
          <div class="vc-term"><h2>${esc(w.t)}</h2><button class="say" type="button" data-act="say" data-v="${esc(w.t)}" aria-label="Pronounce">${ic("vol")}</button><button class="heart ${L.has(w.id) ? "on" : ""}" type="button" data-act="learn" data-v="${w.id}" aria-label="Mark learned">${ic("heart")}</button></div>
          <div class="bn">${esc(w.bn)}</div><div class="tags"><span class="tag-chip">${esc(g.title)}</span><span class="tag-chip gold">${L.has(w.id) ? "Learned" : "To learn"}</span></div></div></div>
        <div class="examples">${w.s.map((s) => `<div>${highlight(s, w.t)}</div>`).join("")}</div>
        <div class="related"><h4>${ic("link")}Related words</h4><div class="related-grid">${rel.map((r) => `<button type="button" class="rel" data-act="pick" data-v="${r.id}">${window.MMIStickers.render(r.pic, GCOL[r.g])}<span>${esc(r.t)}</span></button>`).join("")}</div></div></section>
    </div>
    <div class="triple">
      <section class="card map-list" id="map-list"><div class="section-head"><h2>${ic("list")}${esc(g.title)}</h2><span class="more">${gl}/${list.length} learned</span></div><div class="word-list">${slice.map((x) => `<button type="button" class="wrow ${x.id === w.id ? "on" : ""}" data-act="pick" data-v="${x.id}"><span class="pic">${window.MMIStickers.render(x.pic, GCOL[x.g])}</span><span><b>${esc(x.t)}</b><small>${esc(x.bn)}</small></span><span class="n">${L.has(x.id) ? ic("heart") : x.id}</span></button>`).join("")}</div>
        <div class="pager"><button type="button" data-act="mappage" data-v="${S.mapPage - 1}" ${S.mapPage === 0 ? "disabled" : ""} aria-label="Previous page">${ic("cl")}</button>${Array.from({ length: pages }, (_, i) => `<button type="button" class="${i === S.mapPage ? "on" : ""}" data-act="mappage" data-v="${i}">${i + 1}</button>`).join("")}<button type="button" data-act="mappage" data-v="${S.mapPage + 1}" ${S.mapPage >= pages - 1 ? "disabled" : ""} aria-label="Next page">${ic("cr")}</button></div></section>
      <section class="card map-practice"><h3>${ic("target")}Practice</h3>
        <button type="button" class="practice-link g-violet" data-act="quiz" data-v="${g.id}"><span class="ico t-violet">${ic("grid")}</span>Quiz this category<span class="go">${ic("arrow")}</span></button>
        <button type="button" class="practice-link g-blue" data-act="quiz" data-v="all"><span class="ico t-blue">${ic("shuffle")}</span>Quiz all ${W.length} words<span class="go">${ic("arrow")}</span></button>
        <button type="button" class="practice-link g-gold" data-act="timer"><span class="ico t-gold">${ic("clock")}</span>Describe a map aloud<span class="go">${ic("arrow")}</span></button>
        ${ext(D.jump, `<span class="ico t-green">${ic("target")}</span>More listening practice<span class="go">${ic("ext")}</span>`, 'class="practice-link g-green"')}</section>
      <section class="card map-tips"><h3>${ic("bulb")}Map tips</h3><ul class="tip-list">${tips}</ul></section>
    </div>`;
  return shell("l-main", "", main);
}

/* ---------- WORDS ---------- */
export function pageWords() {
  const L = learned();
  const all = W.filter((w) => L.has(w.id) && (S.wordGroup === "All" || w.g === S.wordGroup));
  const main = `
    ${hero({ scene: "listening", crumb: `${crumb("Listening")} › My words`, title: "My Words", icon: "heart", tone: "red", sub: `You marked ${L.size} of ${W.length} map words as learned. Mark more with the heart on any word card.`, actions: `<button type="button" class="btn solid" data-act="quiz" data-v="mine">${ic("target")}Quiz my words</button><a class="btn" href="${url("map")}">${ic("map")}Browse map words</a>` })}
    <section class="card"><div class="pills"><button type="button" class="pill ${S.wordGroup === "All" ? "on" : ""}" data-act="wordgroup" data-v="All">All</button>${G.map((g) => `<button type="button" class="pill ${S.wordGroup === g.id ? "on" : ""}" data-act="wordgroup" data-v="${g.id}">${esc(g.title)}</button>`).join("")}</div></section>
    ${all.length ? `<div class="two">${all.map((w) => `<div class="item" style="grid-template-columns:70px 1fr auto"><div class="vc-pic" style="width:70px;height:56px">${window.MMIStickers.render(w.pic, GCOL[w.g])}</div><div><b>${esc(w.t)}</b><div class="bn">${esc(w.bn)}</div><small>${esc(w.s[0])}</small></div><div><button class="say" type="button" data-act="say" data-v="${esc(w.t)}" aria-label="Pronounce">${ic("vol")}</button> <button class="del" type="button" data-act="learn" data-v="${w.id}" aria-label="Remove">${ic("x")}</button></div></div>`).join("")}</div>`
      : `<div class="empty"><b>No words yet</b>Open the map vocabulary and tap the heart on a word to save it here.</div>`}`;
  return shell("l-side", listenMenu(3), main);
}
