/* Me & IELTS: single-page site. Hash routes, localStorage only. */
(() => {
  "use strict";
  const D = window.MMI_DATA, W = window.MMI_WORDS, G = window.MMI_GROUPS;
  const app = document.getElementById("app");
  const modal = document.getElementById("modal");

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };
  const pad = (n) => String(n).padStart(2, "0");
  const dkey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => dkey(new Date());
  const wordById = (id) => W.find((w) => w.id === id);
  const SK = ["listening", "speaking", "reading", "writing"];
  const SKN = { listening: "Listening", speaking: "Speaking", reading: "Reading", writing: "Writing" };
  const GCOL = { A: "#4a3af0", B: "#ec315a", C: "#f06a24", D: "#12a36d", E: "#7240e8", F: "#1b8fe8" };

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
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8"/>'
  };
  const ic = (n, c = "") => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;
  const icf = (n, c = "") => ic(n, "fill " + c);
  const ico = (n, tone) => `<span class="ico t-${tone}">${ic(n)}</span>`;
  const ext = (href, label, extra = "") => `<a href="${esc(href)}" target="_blank" rel="noopener" ${extra}>${label}</a>`;

  /* ---------- state ---------- */
  const S = {
    topicCat: "All", topicQ: "", mapGroup: "A", mapWord: 1, mapPage: 0, labels: true,
    cue: 0, spTab: "record", spTopic: "Travel", spPart: "p1",
    t1: "line", t2: "opinion", rtype: "mc", ideaTopic: "Technology", draft: "", draftType: "Task 2", draftTitle: "",
    bookCat: "All", bookQ: "", bookView: "grid", bookSort: "default",
    mistakeSkill: "All", wordGroup: "All"
  };
  const learned = () => new Set(store.get("mmi-learned", []));
  const checks = () => store.get("mmi-checks", {});

  function tickList(skill, date = today()) { const c = checks(); return (c[date] && c[date][skill]) || []; }
  function isTicked(id, skill) { return tickList(skill).includes(id); }
  function toggleTick(id, skill, on) {
    const c = checks(); const d = today();
    c[d] = c[d] || {}; const l = new Set(c[d][skill] || []);
    on ? l.add(id) : l.delete(id);
    c[d][skill] = [...l]; store.set("mmi-checks", c);
  }
  function weekPct(skill) {
    const c = checks(); let n = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const l = (c[dkey(d)] && c[dkey(d)][skill]) || [];
      n += Math.min(l.length, 5);
    }
    return Math.min(100, Math.round((n / 35) * 100));
  }
  function overall() { return Math.round(SK.reduce((a, s) => a + weekPct(s), 0) / 4); }
  function todayDone(ids) { return ids.filter((x) => isTicked(x[0], x[1])).length; }
  function streak() {
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
  function scene(kind) {
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
  function banner(text, id, dark) {
    return `<div class="banner ${dark ? "dark" : ""}"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark ? "#33307d" : "#cfe0ff"}"/><stop offset=".6" stop-color="${dark ? "#8a5bd0" : "#ffd9e7"}"/><stop offset="1" stop-color="${dark ? "#f08a9e" : "#ffe9c9"}"/></linearGradient></defs><rect width="400" height="200" fill="url(#b${id})"/><circle cx="110" cy="132" r="36" fill="#ffe08a" opacity=".95"/><path d="M0 150c70-30 120-18 190 0s150 12 210-14v64H0z" fill="${dark ? "#4d3b9c" : "#8cc9a6"}"/><path d="M0 178c90-22 170 4 250-6s110-8 150 2v26H0z" fill="${dark ? "#352a78" : "#5eb08a"}"/></svg><p>${text}</p></div>`;
  }
  function deco(kind) {
    const m = {
      l: '<path d="M30 110v-22a36 36 0 0 1 72 0v22" fill="none" stroke="#1b9be8" stroke-width="9" stroke-linecap="round"/><rect x="22" y="104" width="18" height="34" rx="8" fill="#1b9be8"/><rect x="92" y="104" width="18" height="34" rx="8" fill="#1b9be8"/>',
      s: '<rect x="52" y="30" width="30" height="58" rx="15" fill="#f0592b"/><path d="M40 78a27 27 0 0 0 54 0M67 106v16" fill="none" stroke="#d8480f" stroke-width="6" stroke-linecap="round"/><path d="M96 40h28a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-14l-10 8 2-8h-6z" fill="#f7b14d"/>',
      r: '<path d="M70 50c-14-10-34-12-50-6v70c16-6 36-4 50 6 14-10 34-12 50-6V44c-16-6-36-4-50 6z" fill="#fff" stroke="#13a56f" stroke-width="6" stroke-linejoin="round"/><path d="M70 50v70" stroke="#13a56f" stroke-width="4"/>',
      w: '<rect x="30" y="34" width="68" height="88" rx="8" fill="#fff" stroke="#7240e8" stroke-width="6"/><path d="M44 62h40M44 82h40M44 102h26" stroke="#cdbdf6" stroke-width="5" stroke-linecap="round"/><path d="m100 120 28-60 12 6-22 58z" fill="#f06a24"/>'
    }[kind];
    return `<svg class="deco" viewBox="0 0 150 150" aria-hidden="true">${m}</svg>`;
  }

  /* ---------- shared components ---------- */
  function menu(title, icon, items, on) {
    return `<nav class="menu"><h2>${ic(icon)}${esc(title)}</h2>${items.map((it, i) => {
      const [i2, label, href, kind] = it;
      if (kind === "ext") return `<a href="${esc(href)}" target="_blank" rel="noopener">${ic(i2)}<span>${esc(label)}</span></a>`;
      if (kind === "act") return `<button type="button" class="m ${i === on ? "on" : ""}" data-act="${esc(href)}" ${it[4] ? `data-v="${esc(it[4])}"` : ""}>${ic(i2)}<span>${esc(label)}</span></button>`;
      return `<a href="${esc(href)}" class="${i === on ? "on" : ""}">${ic(i2)}<span>${esc(label)}</span></a>`;
    }).join("")}</nav>`;
  }
  function bar(label, pct, cls, icon) {
    return `<div class="bar-row">${icon ? ico(icon.n, icon.t) : `<span></span>`}<div><div style="margin-bottom:4px">${esc(label)}</div><div class="track"><i class="${cls}" style="width:${pct}%"></i></div></div><b>${pct}%</b></div>`;
  }
  function progressCard() {
    const rows = [
      ["Listening", weekPct("listening"), "f-blue", { n: "head", t: "blue" }], ["Speaking", weekPct("speaking"), "f-red", { n: "mic", t: "red" }],
      ["Reading", weekPct("reading"), "f-green", { n: "book", t: "green" }], ["Writing", weekPct("writing"), "f-violet", { n: "pen", t: "violet" }]
    ];
    const o = overall();
    return `${rows.map((r) => bar(...r)).join("")}<div class="overall"><div class="bar-row"><div>Overall<div class="track" style="margin-top:4px"><i class="f-brand" style="width:${o}%"></i></div></div><b>${o}%</b></div></div>
    <p class="note">Calculated from the tasks you tick over the last 7 days (35 per skill).</p>`;
  }
  function checklist(key, title) {
    const items = D.checklists[key]; const done = todayDone(items);
    return `<div class="card"><h3>${ic("check")}${esc(title)}<span class="done-count">${done}/${items.length} done</span></h3><div class="checks">${items.map(([id, sk, label]) =>
      `<label class="check"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span>${esc(label)}</span></label>`).join("")}</div></div>`;
  }
  function hero(o) {
    return `<section class="hero ${o.cls || ""}"><div class="hero-art">${scene(o.scene)}</div><div class="hero-copy">
      <div class="crumb">${o.crumb}</div><h1>${o.icon ? `<span class="c-${o.tone}">${ic(o.icon)}</span>` : ""}<span class="${o.plain ? "" : "grad"}">${esc(o.title)}</span></h1>
      ${o.tag ? `<p class="tag">${esc(o.tag)}</p>` : ""}<p class="sub">${esc(o.sub)}</p>${o.actions ? `<div class="hero-actions">${o.actions}</div>` : ""}${o.after || ""}</div>${o.right || ""}</section>`;
  }
  const crumb = (name) => `<a href="#home">Home</a> › ${esc(name)}`;
  const shell = (cls, side, main, rail) => `<div class="page ${cls}">${side ? `<aside class="side">${side}</aside>` : ""}<div class="main">${main}</div>${rail ? `<aside class="rail">${rail}</aside>` : ""}</div>`;
  const lizBtn = (href, label) => ext(href, `${ic("ext")}${esc(label)}`, 'class="btn"');

  /* ---------- HOME ---------- */
  function pageHome() {
    const L = learned().size;
    const pop = ["Hobbies", "Subjects", "Works and Jobs", "Health", "Nature", "The Environment", "Transportations", "Places", "Money Matters", "Sports"];
    const tones = ["pink", "blue", "orange", "red", "green", "teal", "violet", "gold", "green", "blue"];
    const topics = pop.map((n, i) => { const t = D.topics.find((x) => x[1] === n); return `<a class="pop" href="#listening"><span class="ico t-${tones[i]}" style="font-size:1.05rem">${t[0]}</span>${esc(t[1])}</a>`; }).join("");
    const skills = [
      ["sk-l", "head", "Listening", "Vocabulary, maps and practice.", "listening", "l"], ["sk-s", "mic", "Speaking", "Cue cards and recording.", "speaking", "s"],
      ["sk-r", "book", "Reading", "Question types and passages.", "reading", "r"], ["sk-w", "pen", "Writing", "Task 1, Task 2 and essays.", "writing", "w"]
    ].map(([c, i, t, p, h, d]) => `<a class="skill ${c}" href="#${h}"><span class="badge">${ic(i)}</span><h3>${t}</h3><p>${p}</p>${deco(d)}<span class="go">${ic("arrow")}</span></a>`).join("");
    const plan = D.checklists.home;
    const done = todayDone(plan);
    const main = `
      ${hero({
        cls: "home", scene: "home", crumb: "Welcome back, Musfiq", title: "Me & IELTS", plain: false,
        tag: "Learn. Practice. Improve.", sub: "Your own space for listening, speaking, reading and writing. Pick a skill and keep a small daily habit.",
        actions: `<a class="btn solid" href="#listening">Start today ${ic("arrow")}</a><a class="btn" href="#books">${ic("books")}Open my books</a>`,
        after: `<div class="mini-stats"><div>${ico("flame", "orange")}<span><b>${streak()} day${streak() === 1 ? "" : "s"}</b><span>Study streak</span></span></div><div>${ico("heart", "red")}<span><b>${L} / ${W.length}</b><span>Map words learned</span></span></div><div>${ico("check", "green")}<span><b>${done} / ${plan.length}</b><span>Tasks done today</span></span></div></div>`,
        right: `<div class="hero-progress"><h3>${ic("chart")}Your progress<span>last 7 days</span></h3>${progressCard()}</div>`
      })}
      <div class="skill-row">${skills}</div>
      <section class="card"><div class="section-head"><h2>${ic("star")}Popular topics</h2><a class="more" href="#listening">View all topics →</a></div><div class="pop-row">${topics}</div></section>
      <div class="trio">
        ${checklist("home", "Today's plan")}
        <div class="card"><h3>${ic("target")}Quick practice</h3><div class="quick-grid">
          <a class="quick q-blue" href="#map">${ic("map")}Map practice</a><a class="quick q-red" href="#speaking">${ic("mic")}Cue card</a>
          <a class="quick q-gold" href="#reading">${ic("book")}Read a passage</a><a class="quick q-violet" href="#writing">${ic("pen")}Write an intro</a></div>
          <div class="quote-chip">${ic("bulb")}<span>Ten calm minutes every day beat one long night.</span></div></div>
        ${banner("Small steps.<br>Big results.", "h1")}
      </div>
      <div class="two">
        <div class="card"><h3>${ic("books")}My library<a class="more" href="#books">Open books →</a></h3><div class="link-list">${D.books.slice(0, 4).map((b) => `<a href="${esc(b.href)}" target="_blank" rel="noopener"><span class="l">${ico("note", "violet")}${esc(b.t)}</span>${ic("ext", "ext")}</a>`).join("")}</div></div>
        <div class="card"><h3>${ic("globe")}Practise online<a class="more" href="#resources">All resources →</a></h3><div class="link-list">
          ${ext(D.jump, `<span class="l">${ico("target", "green")}Jumpinto practice</span>${ic("ext", "ext")}`)}
          ${ext(D.liz.home, `<span class="l">${ico("globe", "blue")}IELTSLiz</span>${ic("ext", "ext")}`)}
          ${ext(D.drive, `<span class="l">${ico("cloud", "violet")}My Drive folder</span>${ic("ext", "ext")}`)}</div></div>
      </div>`;
    return shell("l-main", "", main);
  }

  /* ---------- LISTENING ---------- */
  const listenMenu = (on) => menu("Listening", "head", [
    ["grid", "Overview", "#listening"], ["list", "Topic vocabulary", "#listening"], ["map", "Map vocabulary", "#map"], ["heart", "My words", "#words"],
    ["target", "Practice tests", D.jump, "ext"], ["bulb", "IELTSLiz tips", D.liz.listening, "ext"], ["wrong", "My mistakes", "#mistakes"]
  ], on);
  function topicGridHtml() {
    const q = S.topicQ.trim().toLowerCase();
    const list = D.topics.filter((t) => (S.topicCat === "All" || t[3] === S.topicCat) && (!q || t[1].toLowerCase().includes(q)));
    if (!list.length) return `<div class="empty"><b>No topics found</b>Try another word or category.</div>`;
    return list.map((t) => `<a class="topic" href="${esc(D.pdf.vocab)}" target="_blank" rel="noopener"><div class="pic">${t[0]}</div><div class="body"><b>${esc(t[1])}</b><small>${t[2]} words</small><span class="arrow">${ic("arrow")}</span></div></a>`).join("");
  }
  function pageListening() {
    const total = D.topics.reduce((a, t) => a + t[2], 0);
    const L = learned().size;
    const cats = ["All", ...new Set(D.topics.map((t) => t[3]))];
    const main = `
      ${hero({ scene: "listening", crumb: crumb("Listening"), title: "Listening", icon: "head", tone: "blue", tag: "Topic vocabulary and map words", sub: "Choose a topic to open its word list, or practise the map vocabulary with pictures and Bangla.", actions: `<a class="btn solid" href="#map">${ic("map")}Practice maps</a>${lizBtn(D.liz.listening, "IELTSLiz listening")}` })}
      <div class="stat-row">
        <div class="stat">${ico("grid", "blue")}<div><b>${D.topics.length}</b><span>Topics</span></div></div>
        <div class="stat">${ico("book", "green")}<div><b>${total}</b><span>Topic words</span></div></div>
        <div class="stat">${ico("map", "violet")}<div><b>${W.length}</b><span>Map words</span></div></div>
        <div class="stat">${ico("heart", "red")}<div><b>${L}</b><span>Map words learned</span></div></div>
      </div>
      <section class="card"><div class="filters"><label class="search">${ic("search")}<input id="topic-q" type="search" placeholder="Search topics" value="${esc(S.topicQ)}" autocomplete="off"></label>
        <div class="pills">${cats.map((c) => `<button type="button" class="pill ${S.topicCat === c ? "on" : ""}" data-act="topiccat" data-v="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>
        <p class="note">Each topic opens the 1200-word vocabulary PDF in your Google Drive.</p></section>
      <div id="topic-grid" class="topic-grid">${topicGridHtml()}</div>`;
    const rail = `${checklist("listening", "Today's listening")}
      <div class="card"><h3>${ic("chart")}This week</h3>${bar("Listening", weekPct("listening"), "f-blue", { n: "head", t: "blue" })}${bar("Map words", Math.round((L / W.length) * 100), "f-green", { n: "map", t: "green" })}<p class="note">Map words: ${L} of ${W.length} learned.</p></div>
      <div class="promo-card blue"><h3>Map vocabulary</h3><p>${W.length} words with pictures, Bangla and examples.</p><a class="btn solid sm" href="#map">Open maps</a>${deco("l")}</div>`;
    return shell("l-all", listenMenu(0), main, rail);
  }

  /* ---------- MAP ---------- */
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
  const say = (t) => { try { if (!window.speechSynthesis) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t.replace(/\([^)]*\)/g, "").replace(/\//g, ", ")); u.lang = "en-GB"; u.rate = .9; speechSynthesis.speak(u); } catch (e) { /* ignore */ } };
  function pageMap() {
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
    const cats = G.map((c) => `<button type="button" class="cat ${c.id === g.id ? "on" : ""}" data-act="mapgroup" data-v="${c.id}"><span class="ico" style="background:${GCOL[c.id]}22;color:${GCOL[c.id]}">${ic(["target", "arrow", "map", "globe", "refresh", "link"][G.indexOf(c)])}</span><span>${esc(c.title)}<small>${c.n} words</small></span></button>`).join("");
    const main = `
      <section class="map-hero"><div><div class="crumb">${crumb("Listening")} › Map vocabulary</div><h1><span class="c-blue">${ic("map")}</span><span class="grad">Map Vocabulary</span></h1><p class="sub">Tap a place on the town map to see its word, or pick a category and browse the list.</p></div>
        <svg viewBox="0 0 360 150" aria-hidden="true"><rect width="360" height="150" rx="16" fill="#cfe9b4"/><rect y="62" width="360" height="22" fill="#7d8698"/><rect x="170" width="22" height="150" fill="#7d8698"/><circle cx="181" cy="73" r="26" fill="#7d8698"/><circle cx="181" cy="73" r="12" fill="#b9e0a0"/><rect x="30" y="16" width="70" height="36" rx="6" fill="#f2c36b"/><rect x="226" y="14" width="76" height="40" rx="6" fill="#fff"/><rect x="40" y="98" width="80" height="34" rx="6" fill="#ffe2b3"/><path d="M0 128C80 108 140 140 220 124S320 110 360 120" stroke="#8ec8ee" stroke-width="22" fill="none"/></svg></section>
      <div class="cat-bar">${cats}</div>
      <div class="map-grid">
        <section class="card map-card"><div class="head"><div><h3>${ic("map")}Town map</h3><p>Tap a building, road or sign.</p></div>
          <div class="toggle"><button type="button" class="${S.labels ? "on" : ""}" data-act="labels" data-v="1">Labels</button><button type="button" class="${S.labels ? "" : "on"}" data-act="labels" data-v="0">No labels</button></div></div>
          <div class="town-wrap ${S.labels ? "" : "nolabels"}">${townSvg(PLACES.some((p) => p.id === w.id) || [107, 108, 109, 110].includes(w.id) ? w.id : 0)}</div></section>
        <section class="card vocab-card"><div class="head">${ico("star", "gold")}<span>Word card</span><span class="nav2"><button type="button" data-act="wordnav" data-v="-1" aria-label="Previous">${ic("cl")}</button>${idx + 1} / ${list.length}<button type="button" data-act="wordnav" data-v="1" aria-label="Next">${ic("cr")}</button></span></div>
          <div class="vc-main"><div class="vc-pic">${window.MMIStickers.render(w.pic, GCOL[w.g])}</div><div>
            <div class="vc-term"><h2>${esc(w.t)}</h2><button class="say" type="button" data-act="say" data-v="${esc(w.t)}" aria-label="Pronounce">${ic("vol")}</button><button class="heart ${L.has(w.id) ? "on" : ""}" type="button" data-act="learn" data-v="${w.id}" aria-label="Mark learned">${ic("heart")}</button></div>
            <div class="bn">${esc(w.bn)}</div><div class="tags"><span class="tag-chip">${esc(g.title)}</span><span class="tag-chip gold">${L.has(w.id) ? "Learned" : "To learn"}</span></div></div></div>
          <div class="examples">${w.s.map((s) => `<div>${highlight(s, w.t)}</div>`).join("")}</div>
          <div class="related"><h4>Related words</h4><div class="related-grid">${rel.map((r) => `<button type="button" class="rel" data-act="pick" data-v="${r.id}">${window.MMIStickers.render(r.pic, GCOL[r.g])}<span>${esc(r.t)}</span></button>`).join("")}</div></div></section>
      </div>
      <div class="triple">
        <section class="card"><h3>${ic("list")}${esc(g.title)}<span class="done-count">${gl}/${list.length} learned</span></h3><div class="word-list">${slice.map((x) => `<button type="button" class="wrow ${x.id === w.id ? "on" : ""}" data-act="pick" data-v="${x.id}"><span class="pic">${window.MMIStickers.render(x.pic, GCOL[x.g])}</span><span><b>${esc(x.t)}</b><small>${esc(x.bn)}</small></span><span class="n">${L.has(x.id) ? "✓" : x.id}</span></button>`).join("")}</div>
          <div class="pager"><button type="button" data-act="mappage" data-v="${S.mapPage - 1}" ${S.mapPage === 0 ? "disabled" : ""}>‹</button>${Array.from({ length: pages }, (_, i) => `<button type="button" class="${i === S.mapPage ? "on" : ""}" data-act="mappage" data-v="${i}">${i + 1}</button>`).join("")}<button type="button" data-act="mappage" data-v="${S.mapPage + 1}" ${S.mapPage >= pages - 1 ? "disabled" : ""}>›</button></div></section>
        <section class="card"><h3>${ic("target")}Practice</h3>
          <button type="button" class="practice-link" data-act="quiz" data-v="${g.id}">${ico("grid", "violet")}Quiz this category<span class="go">${ic("arrow")}</span></button>
          <button type="button" class="practice-link" data-act="quiz" data-v="all">${ico("shuffle", "blue")}Quiz all ${W.length} words<span class="go">${ic("arrow")}</span></button>
          <button type="button" class="practice-link" data-act="timer">${ico("clock", "orange")}Describe a map aloud<span class="go">${ic("arrow")}</span></button>
          ${ext(D.jump, `${ico("target", "green")}More listening practice<span class="go">${ic("ext")}</span>`, 'class="practice-link"')}</section>
        <section class="card"><h3>${ic("bulb")}Map tips</h3><ul class="tick-list">${D.tips.map.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${bar("Category progress", Math.round((gl / list.length) * 100), "f-green")}</section>
      </div>`;
    return shell("l-side", listenMenu(2), main);
  }

  /* ---------- WORDS ---------- */
  function pageWords() {
    const L = learned();
    const all = W.filter((w) => L.has(w.id) && (S.wordGroup === "All" || w.g === S.wordGroup));
    const main = `
      ${hero({ scene: "listening", crumb: `${crumb("Listening")} › My words`, title: "My Words", icon: "heart", tone: "red", sub: `You marked ${L.size} of ${W.length} map words as learned. Mark more with the heart on any word card.`, actions: `<button type="button" class="btn solid" data-act="quiz" data-v="mine">${ic("target")}Quiz my words</button><a class="btn" href="#map">${ic("map")}Browse map words</a>` })}
      <section class="card"><div class="pills"><button type="button" class="pill ${S.wordGroup === "All" ? "on" : ""}" data-act="wordgroup" data-v="All">All</button>${G.map((g) => `<button type="button" class="pill ${S.wordGroup === g.id ? "on" : ""}" data-act="wordgroup" data-v="${g.id}">${esc(g.title)}</button>`).join("")}</div></section>
      ${all.length ? `<div class="two">${all.map((w) => `<div class="item" style="grid-template-columns:70px 1fr auto"><div class="vc-pic" style="width:70px;height:56px">${window.MMIStickers.render(w.pic, GCOL[w.g])}</div><div><b>${esc(w.t)}</b><div class="bn">${esc(w.bn)}</div><small>${esc(w.s[0])}</small></div><div><button class="say" type="button" data-act="say" data-v="${esc(w.t)}" aria-label="Pronounce">${ic("vol")}</button> <button class="del" type="button" data-act="learn" data-v="${w.id}" aria-label="Remove">${ic("x")}</button></div></div>`).join("")}</div>`
        : `<div class="empty"><b>No words yet</b>Open the map vocabulary and tap the heart on a word to save it here.</div>`}`;
    return shell("l-side", listenMenu(3), main);
  }

  /* ---------- SPEAKING ---------- */
  const rec = { on: false, secs: 0, answers: [], mr: null, stream: null, timer: null, msg: "" };
  const speakMenu = () => menu("Speaking", "mic", [
    ["grid", "Overview", "#speaking"], ["mic", "Cue cards (Part 2)", "scroll", "act", "sp-cue"], ["list", "Part 1 and Part 3", "scroll", "act", "sp-topics"],
    ["note", "Recent speaking", D.pdf.recent, "ext"], ["note", "Makkar speaking", D.pdf.makkar, "ext"], ["note", "Idioms", D.pdf.idioms, "ext"], ["bulb", "IELTSLiz speaking", D.liz.speaking, "ext"]
  ].map((i) => (i[2] === "scroll" ? [i[0], i[1], "scroll", "act", i[4]] : i)), 0);
  function wave() {
    const bars = Array.from({ length: 48 }, (_, i) => { const h = 8 + Math.abs(Math.sin(i * 1.3) * 22) + (i % 5) * 3; return `M${6 + i * 8} ${35 - h / 2}v${h}`; }).join("");
    return `<div class="wave ${rec.on ? "live" : ""}"><svg viewBox="0 0 400 70" aria-hidden="true"><path d="${bars}" stroke="${rec.on ? "#ec315a" : "#9db4f2"}" stroke-width="4" stroke-linecap="round" fill="none"/></svg></div>`;
  }
  const mmss = (s) => `${Math.floor(s / 60)}:${pad(s % 60)}`;
  function pageSpeaking() {
    const cue = D.cueCards[S.cue];
    const self = store.get("mmi-self", { fluency: 3, vocab: 3, grammar: 3, pron: 3 });
    const sAvg = ((self.fluency + self.vocab + self.grammar + self.pron) / 4).toFixed(1);
    const topic = D.spTopics[S.spTopic];
    const parts = [
      ["p-pink", "1", "Part 1", "Introduction and interview", "sp-topics"], ["p-orange", "2", "Part 2", "Cue card, speak for 2 minutes", "sp-cue"],
      ["p-blue", "3", "Part 3", "Discussion", "sp-topics"], ["p-green", "★", "Recent", "Recent speaking topics (PDF)", ""]
    ].map(([c, n, t, d, tg]) => (tg ? `<button type="button" class="part ${c}" data-act="scroll" data-v="${tg}"><span class="badge">${n}</span><span><b>${t}</b><span>${d}</span></span><span class="go">${ic("arrow")}</span></button>` : `<a class="part ${c}" href="${esc(D.pdf.recent)}" target="_blank" rel="noopener"><span class="badge">${n}</span><span><b>${t}</b><span>${d}</span></span><span class="go">${ic("ext")}</span></a>`)).join("");
    const answersHtml = rec.answers.length ? rec.answers.map((a) => `<div class="answer"><b>${esc(a.q)}</b><br>${mmss(a.secs)} recorded<audio controls src="${a.url}"></audio></div>`).join("") : `<div class="empty" style="padding:16px">Your recordings stay in this tab until you close it.</div>`;
    const selfRows = [["fluency", "Fluency"], ["vocab", "Vocabulary"], ["grammar", "Grammar"], ["pron", "Pronunciation"]].map(([k, l]) => `<div class="self-row"><span>${l}</span><input type="range" min="1" max="5" step="1" value="${self[k]}" data-self="${k}"><b id="self-${k}">${self[k]}/5</b></div>`).join("");
    const main = `
      ${hero({ scene: "speaking", crumb: crumb("Speaking"), title: "Speaking", icon: "mic", tone: "red", tag: "Practice. Record. Improve.", sub: "Pick a cue card, speak for two minutes and listen back. Rate yourself honestly after each take.", actions: `<button type="button" class="btn pink" data-act="timer">${ic("clock")}Start speaking timer</button>${lizBtn(D.liz.speaking, "IELTSLiz speaking")}` })}
      <div class="parts">${parts}</div>
      <div class="three" id="sp-cue">
        <section class="card"><div class="cue-top"><span class="ico t-red">${ic("note")}</span><h3>Cue card</h3><span class="cue-nav"><button type="button" data-act="cue" data-v="-1" aria-label="Previous">${ic("cl")}</button>${S.cue + 1} / ${D.cueCards.length}<button type="button" data-act="cue" data-v="1" aria-label="Next">${ic("cr")}</button></span></div>
          <span class="cue-tag">Part 2</span><h2 class="cue-q">${esc(cue.title)}</h2><div class="cue-say"><b>You should say:</b><ul>${cue.say.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
          <div class="cue-ideas"><b>Ideas to build your answer</b><ul>${cue.ideas.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
          <div class="cue-actions"><button type="button" class="btn" data-act="cue-random">${ic("shuffle")}Random card</button><button type="button" class="btn" data-act="timer">${ic("clock")}1 min prep</button></div></section>
        <section class="card"><div class="tabs"><button type="button" class="${S.spTab === "record" ? "on" : ""}" data-act="sptab" data-v="record">Record</button><button type="button" class="${S.spTab === "answers" ? "on" : ""}" data-act="sptab" data-v="answers">My answers (${rec.answers.length})</button></div>
          ${S.spTab === "record" ? `${wave()}<div class="timer-txt"><span id="rec-time">${mmss(rec.secs)}</span> / 2:00</div><div class="rec-row"><button type="button" class="rec-btn ${rec.on ? "on" : ""}" data-act="rec" aria-label="${rec.on ? "Stop" : "Record"}">${ic(rec.on ? "stop" : "mic")}</button></div>${rec.msg ? `<p class="note" style="text-align:center">${esc(rec.msg)}</p>` : `<p class="note" style="text-align:center">${rec.on ? "Recording. Tap to stop." : "Tap the microphone and speak."}</p>`}` : `<div class="answers">${answersHtml}</div>`}</section>
        <section class="card"><h3>${ic("star")}Self-check<span class="done-count" style="color:var(--pink)">${sAvg} / 5</span></h3>${selfRows}<p class="note">These are your own ratings. They are saved on this device.</p>
          <div class="quote-chip" style="background:#fff0f3">${ic("bulb")}<span>${esc(D.tips.speaking[S.cue % D.tips.speaking.length])}</span></div></section>
      </div>
      <section class="card" id="sp-topics"><div class="section-head"><h2>${ic("list")}Part 1 and Part 3 topics</h2><div class="pills"><button type="button" class="pill ${S.spPart === "p1" ? "on" : ""}" data-act="sppart" data-v="p1">Part 1</button><button type="button" class="pill ${S.spPart === "p3" ? "on" : ""}" data-act="sppart" data-v="p3">Part 3</button></div></div>
        <div class="topic-mini">${Object.keys(D.spTopics).map((k) => `<button type="button" class="tm ${S.spTopic === k ? "on" : ""}" data-act="sptopic" data-v="${k}"><span>${D.spTopics[k].e}</span>${k}<small>${D.spTopics[k].p1.length + D.spTopics[k].p3.length} questions</small></button>`).join("")}</div>
        <div class="q-box" style="margin-top:14px"><div><b>${S.spPart === "p1" ? "Part 1 questions" : "Part 3 questions"}: ${esc(S.spTopic)}</b><ol>${topic[S.spPart].map((q) => `<li>${esc(q)}</li>`).join("")}</ol></div>
        <div><b>How to answer</b><ul class="tick-list" style="margin-top:8px">${D.tips.speaking.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div></section>`;
    const rail = `${checklist("speaking", "Today's speaking")}
      <div class="card"><h3>${ic("books")}Speaking material</h3><div class="link-list">
        ${ext(D.pdf.recent, `<span class="l">${ico("note", "red")}Recent speaking</span>${ic("ext", "ext")}`)}${ext(D.pdf.makkar, `<span class="l">${ico("note", "orange")}Makkar speaking</span>${ic("ext", "ext")}`)}${ext(D.pdf.idioms, `<span class="l">${ico("note", "violet")}Idioms</span>${ic("ext", "ext")}`)}</div></div>
      <div class="quote-box"><p>Speak a little every day and your answers will start to sound like <em>you</em>.</p></div>`;
    return shell("l-all", speakMenu(), main, rail);
  }
  async function recStart() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) { rec.msg = "Recording is not supported in this browser."; render(); return; }
    try {
      rec.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = []; rec.mr = new MediaRecorder(rec.stream);
      rec.mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      rec.mr.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mr.mimeType || "audio/webm" });
        rec.answers.unshift({ url: URL.createObjectURL(blob), q: D.cueCards[S.cue].title, secs: rec.secs });
        rec.stream.getTracks().forEach((t) => t.stop()); rec.on = false; clearInterval(rec.timer); rec.msg = ""; S.spTab = "answers"; render();
      };
      rec.secs = 0; rec.on = true; rec.msg = ""; rec.mr.start();
      rec.timer = setInterval(() => { rec.secs++; const el = document.getElementById("rec-time"); if (el) el.textContent = mmss(rec.secs); if (rec.secs >= 120) recStop(); }, 1000);
      render();
    } catch (e) { rec.msg = "The microphone is blocked. Allow it in the browser address bar and try again."; rec.on = false; render(); }
  }
  function recStop() { if (rec.mr && rec.on && rec.mr.state !== "inactive") rec.mr.stop(); }
  function recAbort() { if (rec.on) { rec.mr.onstop = () => { rec.stream.getTracks().forEach((t) => t.stop()); }; try { rec.mr.stop(); } catch (e) { /* ignore */ } rec.on = false; clearInterval(rec.timer); } }

  /* ---------- READING ---------- */
  function pageReading() {
    const rt = D.readingTypes.find((t) => t.id === S.rtype) || D.readingTypes[0];
    const log = store.get("mmi-passages", []);
    const tone = ["red", "blue", "green", "violet", "orange", "pink"];
    const main = `
      ${hero({ scene: "reading", crumb: crumb("Reading"), title: "Reading", icon: "book", tone: "green", tag: "Read smarter. Score higher.", sub: "Learn how each question type works, then practise on real passages and log what you read.", actions: `<a class="btn solid" href="${esc(D.jump)}" target="_blank" rel="noopener">${ic("target")}Practice passages</a>${lizBtn(D.liz.reading, "IELTSLiz reading")}` })}
      <section class="card" id="rd-types"><div class="section-head"><h2>${ic("list")}Question types</h2><p>Tap a type for its main tip.</p></div>
        <div class="type-grid">${D.readingTypes.map((t, i) => `<button type="button" class="type t-card-${"abcdef"[i]} ${t.id === rt.id ? "on" : ""}" data-act="rtype" data-v="${t.id}"><span class="ico t-${tone[i]}">${t.e}</span><span><b>${esc(t.name)}</b><small>${esc(t.tip)}</small></span></button>`).join("")}</div>
        <div class="detail"><b>${esc(rt.name)}</b><p style="margin-top:4px">${esc(rt.tip)}</p></div></section>
      <section class="card" id="rd-pass"><div class="section-head"><h2>${ic("book")}Passages by theme</h2><a class="more" href="${esc(D.jump)}" target="_blank" rel="noopener">Open practice →</a></div>
        <div class="passages">${D.passageTypes.map(([e, n, bg]) => `<a class="passage" href="${esc(D.jump)}" target="_blank" rel="noopener"><div class="pic" style="background:${bg}">${e}</div><div class="body"><b>${esc(n)}</b><small>Practice ↗</small></div></a>`).join("")}</div></section>
      <div class="two">
        <section class="card"><h3>${ic("bulb")}Reading strategies</h3><ul class="tick-list">${D.readingStrategies.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>
        <section class="card"><h3>${ic("note")}Passages I have read</h3>
          ${log.length ? log.map((p, i) => `<div class="log-row"><span><b>${esc(p.title)}</b><small>${esc(p.date)}</small></span><span class="lvl ${p.level}">${p.level}</span><button class="del" type="button" data-act="delpassage" data-v="${i}" aria-label="Delete">${ic("trash")}</button></div>`).join("") : `<div class="empty" style="padding:14px">Nothing logged yet.</div>`}
          <form class="mini-form" data-form="passage"><input name="title" placeholder="Passage title" required maxlength="80"><select name="level"><option>Easy</option><option selected>Medium</option><option>Hard</option></select><button class="btn solid sm" type="submit">Add</button></form></section>
      </div>`;
    const side = menu("Reading", "book", [
      ["grid", "Overview", "#reading"], ["list", "Question types", "scroll", "act", "rd-types"], ["book", "Passages", "scroll", "act", "rd-pass"],
      ["note", "1200 vocabulary", D.pdf.vocab, "ext"], ["target", "Practice online", D.jump, "ext"], ["bulb", "IELTSLiz reading", D.liz.reading, "ext"]
    ].map((i) => (i[2] === "scroll" ? [i[0], i[1], "scroll", "act", i[4]] : i)), 0);
    const rail = `${checklist("reading", "Today's reading")}<div class="card"><h3>${ic("chart")}This week</h3>${bar("Reading", weekPct("reading"), "f-green", { n: "book", t: "green" })}<p class="note">${log.length} passage${log.length === 1 ? "" : "s"} logged.</p></div>${banner("Read a little.<br>Every day.", "r1")}`;
    return shell("l-all", side, main, rail);
  }

  /* ---------- WRITING ---------- */
  const wc = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  function taskCard(cls, title, sub, icon, tone, list, cur, act, target, link) {
    const t = list.find((x) => x.id === cur) || list[0];
    return `<section class="task-card ${cls}"><div class="task-head">${ico(icon, tone)}<div><h2>${title}</h2><p>${sub}</p></div></div>
      <div class="pills">${list.map((x) => `<button type="button" class="pill ${x.id === t.id ? "on" : ""}" data-act="${act}" data-v="${x.id}">${x.e} ${esc(x.name)}</button>`).join("")}</div>
      <div class="detail" style="background:#fff"><b>${esc(t.name)}</b><p style="margin:4px 0 8px">${esc(t.tip)}</p><ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol><p class="note">Aim for at least ${target} words.</p></div>
      <div class="hero-actions">${lizBtn(link, "IELTSLiz lessons")}</div></section>`;
  }
  function pageWriting() {
    const ideas = D.ideas[S.ideaTopic];
    const target = S.draftType === "Task 1" ? 150 : 250;
    const n = wc(S.draft);
    const main = `
      ${hero({ scene: "writing", crumb: crumb("Writing"), title: "Writing", icon: "pen", tone: "violet", tag: "Plan. Write. Review.", sub: "Pick the task type, follow the four steps, then draft your own answer and count the words.", actions: `<button type="button" class="btn solid" data-act="scroll" data-v="wr-editor">${ic("edit")}Open the editor</button><a class="btn" href="#essays">${ic("note")}My essays</a>` })}
      <div class="two" id="wr-tasks">
        ${taskCard("t1", "Task 1", "Describe a graph, chart, map or process.", "chart", "blue", D.task1, S.t1, "t1", 150, D.liz.w1)}
        ${taskCard("t2", "Task 2", "Write an essay on a given topic.", "pen", "orange", D.task2, S.t2, "t2", 250, D.liz.w2)}
      </div>
      <section class="card"><div class="section-head"><h2>${ic("bulb")}Idea bank</h2><div class="pills">${Object.keys(D.ideas).map((k) => `<button type="button" class="pill ${S.ideaTopic === k ? "on" : ""}" data-act="idea" data-v="${k}">${k}</button>`).join("")}</div></div>
        <div class="idea-grid">${ideas.map((t, i) => `<div class="idea"><b>Idea ${i + 1}</b>${esc(t)}</div>`).join("")}</div></section>
      <section class="card" id="wr-editor"><h3>${ic("edit")}My draft</h3>
        <div class="form-grid" style="grid-template-columns:140px 1fr"><label class="field">Task<select id="draft-type"><option ${S.draftType === "Task 1" ? "selected" : ""}>Task 1</option><option ${S.draftType === "Task 2" ? "selected" : ""}>Task 2</option></select></label><label class="field">Title or question<input id="draft-title" maxlength="140" placeholder="For example: Some people prefer to work from home" value="${esc(S.draftTitle)}"></label></div>
        <textarea id="draft" class="essay-area" style="margin-top:10px" placeholder="Write your answer here.">${esc(S.draft)}</textarea>
        <div class="essay-bar"><span id="draft-wc">${n} words</span><span id="draft-target" class="${n >= target ? "c-green" : ""}">${n >= target ? "Target reached" : `${target - n} to reach ${target}`}</span><span class="sp"></span><button type="button" class="btn sm" data-act="draft-clear">${ic("refresh")}Clear</button><button type="button" class="btn solid sm" data-act="draft-save">${ic("check")}Save essay</button></div></section>`;
    const side = menu("Writing", "pen", [
      ["grid", "Overview", "#writing"], ["chart", "Task 1", "scroll", "act", "wr-tasks"], ["pen", "Task 2", "scroll", "act", "wr-tasks"], ["bulb", "Idea bank", "scroll", "act", "wr-editor"],
      ["note", "My essays", "#essays"], ["bulb", "IELTSLiz Task 1", D.liz.w1, "ext"], ["bulb", "IELTSLiz Task 2", D.liz.w2, "ext"]
    ].map((i) => (i[2] === "scroll" ? [i[0], i[1], "scroll", "act", i[4]] : i)), 0);
    const rail = `${checklist("writing", "Today's writing")}<div class="card"><h3>${ic("chart")}This week</h3>${bar("Writing", weekPct("writing"), "f-violet", { n: "pen", t: "violet" })}<p class="note">${store.get("mmi-essays", []).length} essay${store.get("mmi-essays", []).length === 1 ? "" : "s"} saved.</p></div>${banner("Write.<br>Review.<br>Repeat.", "w1", true)}`;
    return shell("l-all", side, main, rail);
  }
  function pageEssays() {
    const list = store.get("mmi-essays", []);
    const main = `${hero({ scene: "writing", crumb: `${crumb("Writing")} › My essays`, title: "My Essays", icon: "note", tone: "violet", sub: "Every essay you save from the editor is kept on this device.", actions: `<a class="btn solid" href="#writing">${ic("edit")}Write a new one</a>` })}
      ${list.length ? list.map((e, i) => `<article class="item" style="grid-template-columns:1fr auto"><div><b>${esc(e.title || "Untitled")}</b><small style="display:block;color:var(--muted)">${esc(e.type)} · ${e.words} words · ${esc(e.date)}</small><p style="margin-top:6px;white-space:pre-wrap">${esc(e.text.slice(0, 360))}${e.text.length > 360 ? "…" : ""}</p></div><div style="display:flex;gap:6px"><button class="btn sm" type="button" data-act="loadessay" data-v="${i}">${ic("edit")}Edit</button><button class="del" type="button" data-act="delessay" data-v="${i}" aria-label="Delete">${ic("trash")}</button></div></article>`).join("") : `<div class="empty"><b>No essays yet</b>Write a draft on the Writing page and press Save essay.</div>`}`;
    return shell("l-main", "", main);
  }

  /* ---------- BOOKS ---------- */
  const mybooks = () => store.get("mmi-mybooks", []);
  const allBooks = () => [...D.books, ...mybooks().map((b, i) => ({ id: "my" + i, t: b.t, cat: "Other", href: b.href, meta: "My link", cover: ["#2f3a8f", "#7a85ee", "My book", b.t.slice(0, 22), "Added by me"], mine: i }))];
  function bookCard(b) {
    const marks = store.get("mmi-bookmarks", []); const prog = store.get("mmi-bookprog", {}); const opens = store.get("mmi-opens", {});
    const p = prog[b.id] || 0;
    return `<article class="book"><a class="cover ${b.dark ? "dark" : ""}" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})" href="${esc(b.href)}" target="_blank" rel="noopener" data-open="${b.id}"><small>${esc(b.cover[2])}</small><b>${esc(b.cover[3])}</b><em>${esc(b.cover[4])}</em></a>
      <button type="button" class="mark-btn ${marks.includes(b.id) ? "on" : ""}" data-act="bookmark" data-v="${b.id}" aria-label="Bookmark">${ic("mark")}</button><span class="cat-chip">${esc(b.cat)}</span>
      <h4>${esc(b.t)}</h4><div class="meta"><span>${esc(b.meta)}</span><span>${opens[b.id] ? `Opened ${opens[b.id]}×` : "Not opened"}</span></div>
      <label class="range"><input type="range" min="0" max="100" step="5" value="${p}" data-bookprog="${b.id}" aria-label="My progress"><b id="bp-${b.id}">${p}%</b></label>
      ${b.mine !== undefined ? `<button type="button" class="ghost-btn" data-act="delmybook" data-v="${b.mine}">${ic("trash")}Remove</button>` : ""}</article>`;
  }
  function booksGrid() {
    const q = S.bookQ.trim().toLowerCase(); const opens = store.get("mmi-opens", {});
    let list = allBooks().filter((b) => (S.bookCat === "All" || b.cat === S.bookCat) && (!q || b.t.toLowerCase().includes(q)));
    if (S.bookSort === "az") list = list.slice().sort((a, b) => a.t.localeCompare(b.t));
    if (S.bookSort === "opened") list = list.slice().sort((a, b) => (opens[b.id] || 0) - (opens[a.id] || 0));
    return `${list.map(bookCard).join("")}<button type="button" class="book add-book" data-act="addbook"><span class="plus">${ic("plus")}</span><b>Add my own link</b>A book or folder from your Drive</button>`;
  }
  function pageBooks() {
    const cats = ["All", "Speaking", "Vocabulary", "Idioms", "Writing", "Other"];
    const side = menu("Books", "books", cats.map((c) => ["books", c, "bookcat", "act", c]), cats.indexOf(S.bookCat));
    const marks = store.get("mmi-bookmarks", []); const all = allBooks(); const opens = store.get("mmi-opens", {});
    const recent = all.filter((b) => opens[b.id]).sort((a, b) => opens[b.id] - opens[a.id]).slice(0, 4);
    const main = `
      ${hero({ scene: "books", crumb: crumb("Books"), title: "Books", icon: "books", tone: "violet", tag: "Your own library", sub: "Every book opens from your Google Drive in a new tab. Nothing is copied to this site.", actions: `<a class="btn solid" href="${esc(D.drive)}" target="_blank" rel="noopener">${ic("cloud")}Open My Drive</a>` })}
      <div class="book-tools"><div class="pills">${cats.map((c) => `<button type="button" class="pill ${S.bookCat === c ? "on" : ""}" data-act="bookcat" data-v="${c}">${c}</button>`).join("")}</div>
        <label class="search">${ic("search")}<input id="book-q" type="search" placeholder="Search books" value="${esc(S.bookQ)}" autocomplete="off"></label>
        <select data-act-change="booksort" aria-label="Sort"><option value="default" ${S.bookSort === "default" ? "selected" : ""}>Default order</option><option value="az" ${S.bookSort === "az" ? "selected" : ""}>A to Z</option><option value="opened" ${S.bookSort === "opened" ? "selected" : ""}>Most opened</option></select>
        <div class="view-toggle"><button type="button" class="${S.bookView === "grid" ? "on" : ""}" data-act="bookview" data-v="grid" aria-label="Grid">${ic("grid")}</button><button type="button" class="${S.bookView === "list" ? "on" : ""}" data-act="bookview" data-v="list" aria-label="List">${ic("list")}</button></div></div>
      <div id="book-grid" class="book-grid ${S.bookView}">${booksGrid()}</div>
      <div class="two"><section class="card"><h3>${ic("clock")}Recently opened</h3>${recent.length ? recent.map((b) => `<div class="recent-row"><span class="sw" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})"></span><span><b>${esc(b.t)}</b><small>Opened ${opens[b.id]}×</small></span></div>`).join("") : `<div class="empty" style="padding:14px">Open a book and it appears here.</div>`}</section>
        <section class="card"><h3>${ic("mark")}Bookmarked</h3>${marks.length ? marks.map((id) => all.find((b) => b.id === id)).filter(Boolean).map((b) => `<div class="recent-row"><span class="sw" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})"></span><span><b>${esc(b.t)}</b><small>${esc(b.cat)}</small></span></div>`).join("") : `<div class="empty" style="padding:14px">Tap the bookmark on a book.</div>`}</section></div>
      <section class="card"><h3>${ic("globe")}More reading material</h3><div class="ext-strip">
        ${ext(D.liz.listening, `${ico("head", "blue")}Liz Listening`)}${ext(D.liz.speaking, `${ico("mic", "red")}Liz Speaking`)}${ext(D.liz.reading, `${ico("book", "green")}Liz Reading`)}${ext(D.liz.w1, `${ico("chart", "violet")}Liz Task 1`)}${ext(D.liz.w2, `${ico("pen", "orange")}Liz Task 2`)}${ext(D.jump, `${ico("target", "teal")}Jumpinto`)}</div></section>`;
    return shell("l-side", side, main);
  }

  /* ---------- RESOURCES ---------- */
  function pageResources() {
    const L = learned().size; const opens = Object.values(store.get("mmi-opens", {})).reduce((a, b) => a + b, 0);
    const links = [["g1", "target", "Jumpinto", "Practice tests for all four skills.", D.jump], ["g2", "globe", "IELTSLiz", "Free lessons and tips.", D.liz.home], ["g3", "cloud", "My Drive", "All your IELTS files.", D.drive], ["g4", "book", "Liz Reading", "Question types explained.", D.liz.reading], ["g5", "pen", "Liz Task 1", "Graphs, maps and processes.", D.liz.w1]];
    const tools = [["wrong", "red", "Mistake bank", "Write mistakes and fixes.", "#mistakes"], ["note", "blue", "Notes", "A page for quick notes.", "#notes"], ["edit", "violet", "My essays", "Saved writing drafts.", "#essays"], ["heart", "pink", "My words", "Words you marked.", "#words"]];
    const plan = [["Mon", "Map words + 1 map"], ["Tue", "Speaking Part 1"], ["Wed", "Reading passage"], ["Thu", "Task 1 practice"], ["Fri", "Cue card record"], ["Sat", "Task 2 essay"], ["Sun", "Review mistakes"]];
    const main = `
      ${hero({ scene: "resources", crumb: crumb("Resources"), title: "Resources", icon: "link", tone: "blue", tag: "Everything in one place", sub: "Practice sites, your Drive files and your own study tools.", actions: `<a class="btn solid" href="${esc(D.jump)}" target="_blank" rel="noopener">${ic("target")}Start practising</a>` })}
      <div class="stat-row"><div class="stat">${ico("books", "violet")}<div><b>${allBooks().length}</b><span>Books and folders</span></div></div><div class="stat">${ico("link", "blue")}<div><b>${2 + Object.keys(D.liz).length + Object.keys(D.pdf).length}</b><span>Practice links</span></div></div><div class="stat">${ico("heart", "red")}<div><b>${L}</b><span>Words learned</span></div></div><div class="stat">${ico("check", "green")}<div><b>${opens}</b><span>Books opened</span></div></div></div>
      <section class="card"><div class="section-head"><h2>${ic("globe")}Practice platforms</h2></div><div class="res-grid">${links.map(([g, i, t, d, h]) => `<a class="res-card" href="${esc(h)}" target="_blank" rel="noopener"><div class="pic ${g}">${ic(i)}</div><div class="body"><b>${t}</b><p>${d}</p><span class="visit">Visit site ↗</span></div></a>`).join("")}</div></section>
      <section class="card"><div class="section-head"><h2>${ic("books")}My materials</h2><a class="more" href="#books">Open books →</a></div><div class="mat-grid">${D.books.slice(0, 5).map((b) => `<div class="mat"><div class="cover ${b.dark ? "dark" : ""}" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})">${esc(b.cover[3])}</div><b>${esc(b.t)}</b><div class="row"><span class="chip">${esc(b.cat)}</span><a class="open" href="${esc(b.href)}" target="_blank" rel="noopener" data-open="${b.id}">Open ↗</a></div></div>`).join("")}</div></section>
      <section class="card"><div class="section-head"><h2>${ic("pen")}Study tools</h2></div><div class="tool-row">${tools.map(([i, t, n, d, h]) => `<a class="tool" href="${h}">${ico(i, t)}<span><b>${n}</b><small>${d}</small></span></a>`).join("")}<button type="button" class="tool" data-act="timer">${ico("clock", "orange")}<span><b>Speaking timer</b><small>1 min prep, 2 min talk.</small></span></button></div></section>
      <section class="card"><div class="section-head"><h2>${ic("cal")}A simple week</h2><p>A suggestion. Change it to suit you.</p></div><div class="plan-days">${plan.map(([d, t]) => `<div class="plan-day"><b>${d}</b>${t}</div>`).join("")}</div></section>`;
    return shell("l-main", "", main);
  }

  /* ---------- MISTAKES / NOTES ---------- */
  function pageMistakes() {
    const all = store.get("mmi-mistakes", []);
    const list = all.map((m, i) => ({ ...m, i })).filter((m) => S.mistakeSkill === "All" || m.skill === S.mistakeSkill);
    const main = `${hero({ scene: "listening", crumb: `${crumb("Resources")} › Mistake bank`, title: "My Mistakes", icon: "wrong", tone: "red", sub: "Write the mistake and the fix. Reading them again is the quickest review." })}
      <section class="card"><form class="form-grid" data-form="mistake"><label class="field">Skill<select name="skill">${SK.map((s) => `<option value="${s}">${SKN[s]}</option>`).join("")}</select></label><label class="field">What I got wrong<input name="wrong" required maxlength="140"></label><label class="field">The right answer<input name="right" required maxlength="140"></label><button class="btn solid" type="submit">${ic("plus")}Add</button></form></section>
      <div class="pills"><button type="button" class="pill ${S.mistakeSkill === "All" ? "on" : ""}" data-act="mskill" data-v="All">All</button>${SK.map((s) => `<button type="button" class="pill ${S.mistakeSkill === s ? "on" : ""}" data-act="mskill" data-v="${s}">${SKN[s]}</button>`).join("")}</div>
      <div>${list.length ? list.map((m) => `<div class="item"><span class="ico t-red">${ic("wrong")}</span><div><span class="wrong">${esc(m.wrong)}</span><br><span class="right">${esc(m.right)}</span><small style="display:block;color:var(--muted)">${SKN[m.skill]} · ${esc(m.date)}</small></div><button class="del" type="button" data-act="delmistake" data-v="${m.i}" aria-label="Delete">${ic("trash")}</button></div>`).join("") : `<div class="empty"><b>No mistakes saved</b>Add one above after your next practice.</div>`}</div>`;
    return shell("l-main", "", main);
  }
  function pageNotes() {
    const main = `${hero({ scene: "resources", crumb: `${crumb("Resources")} › Notes`, title: "My Notes", icon: "note", tone: "blue", sub: "Anything you want to remember. It saves as you type." })}<textarea id="notes" class="notes-area" placeholder="Start typing...">${esc(store.get("mmi-notes", ""))}</textarea>`;
    return shell("l-main", "", main);
  }

  /* ---------- modal: search / quiz / timer / add book ---------- */
  let timerId = null;
  function openModal(html) { modal.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}</div>`; modal.hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { modal.hidden = true; modal.innerHTML = ""; document.body.style.overflow = ""; clearInterval(timerId); timerId = null; }
  function openSearch() {
    openModal(`<h3>${ic("search")}Search<button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><label class="modal-search">${ic("search")}<input id="gs" placeholder="Search words, topics, books, pages" autocomplete="off"></label><div class="results" id="gs-res"></div>`);
    const input = document.getElementById("gs"); input.focus(); searchRender("");
  }
  function searchRender(q) {
    q = q.trim().toLowerCase(); const out = [];
    const pages = [["Home", "#home"], ["Listening", "#listening"], ["Map vocabulary", "#map"], ["My words", "#words"], ["Speaking", "#speaking"], ["Reading", "#reading"], ["Writing", "#writing"], ["Books", "#books"], ["Resources", "#resources"], ["My mistakes", "#mistakes"], ["Notes", "#notes"], ["My essays", "#essays"]];
    if (!q) { pages.forEach(([n, h]) => out.push({ k: "Page", t: n, h })); }
    else {
      pages.filter(([n]) => n.toLowerCase().includes(q)).forEach(([n, h]) => out.push({ k: "Page", t: n, h }));
      W.filter((w) => w.t.toLowerCase().includes(q) || w.bn.includes(q)).slice(0, 8).forEach((w) => out.push({ k: "Map word", t: w.t, s: w.bn, word: w.id }));
      D.topics.filter((t) => t[1].toLowerCase().includes(q)).slice(0, 4).forEach((t) => out.push({ k: "Topic", t: t[1], s: `${t[2]} words`, ext: D.pdf.vocab }));
      allBooks().filter((b) => b.t.toLowerCase().includes(q)).forEach((b) => out.push({ k: "Book", t: b.t, s: b.cat, ext: b.href }));
      D.cueCards.forEach((c, i) => { if (c.title.toLowerCase().includes(q)) out.push({ k: "Cue card", t: c.title, cue: i }); });
    }
    document.getElementById("gs-res").innerHTML = out.length ? out.map((r, i) => `<button type="button" class="result" data-act="goto" data-i="${i}"><span class="tag-chip">${r.k}</span><span><b>${esc(r.t)}</b>${r.s ? `<small>${esc(r.s)}</small>` : ""}</span></button>`).join("") : `<div class="empty"><b>Nothing found</b>Try a shorter word.</div>`;
    searchRender.last = out;
  }
  const quiz = { qs: [], i: 0, score: 0, answered: false };
  function startQuiz(scope) {
    let pool = W;
    if (scope === "mine") { const L = learned(); pool = W.filter((w) => L.has(w.id)); if (pool.length < 4) { toast("Mark at least 4 words as learned first."); return; } }
    else if (scope !== "all") pool = W.filter((w) => w.g === scope);
    const pick = pool.slice().sort(() => Math.random() - .5).slice(0, 8);
    quiz.qs = pick.map((w) => { const others = W.filter((x) => x.id !== w.id).sort(() => Math.random() - .5).slice(0, 3); return { w, opts: [w, ...others].sort(() => Math.random() - .5) }; });
    quiz.i = 0; quiz.score = 0; quiz.answered = false; quizRender();
  }
  function quizRender() {
    if (quiz.i >= quiz.qs.length) { openModal(`<h3>${ic("trophy")}Quiz finished<button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><div class="big-time">${quiz.score} / ${quiz.qs.length}</div><p style="text-align:center" class="note">Keep going. Repeat the words you missed.</p><div class="hero-actions" style="justify-content:center"><button class="btn solid" type="button" data-act="quiz" data-v="all">Again</button><button class="btn" type="button" data-act="close">Close</button></div>`); return; }
    const q = quiz.qs[quiz.i];
    openModal(`<h3>${ic("target")}Quiz<span class="progress-dots">${quiz.i + 1} of ${quiz.qs.length}</span><button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><div class="vc-pic" style="width:130px;height:104px;margin:0 auto">${window.MMIStickers.render(q.w.pic, GCOL[q.w.g])}</div><p class="quiz-q" style="text-align:center">${esc(q.w.bn)}</p><div class="opts">${q.opts.map((o) => `<button type="button" class="opt" data-act="qopt" data-v="${o.id}">${esc(o.t)}</button>`).join("")}</div><div class="hero-actions" id="qnext"></div>`);
    quiz.answered = false;
  }
  function openTimer() {
    clearInterval(timerId);
    const st = { phase: "ready", left: 60 };
    const draw = () => openModal(`<h3>${ic("clock")}Speaking timer<button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><p class="note" style="text-align:center">${st.phase === "ready" ? "One minute to prepare, then two minutes to speak." : st.phase === "prep" ? "Preparation. Make short notes." : st.phase === "talk" ? "Speak now." : "Time is up. Well done."}</p><div class="big-time" id="tm">${mmss(st.left)}</div><div class="hero-actions" style="justify-content:center"><button class="btn solid" type="button" data-act="timer-go">${st.phase === "ready" || st.phase === "done" ? "Start" : "Restart"}</button><button class="btn" type="button" data-act="close">Close</button></div>`);
    draw(); openTimer.st = st; openTimer.draw = draw;
  }
  function timerGo() {
    const st = openTimer.st; clearInterval(timerId); st.phase = "prep"; st.left = 60; openTimer.draw();
    timerId = setInterval(() => {
      st.left--; const el = document.getElementById("tm"); if (el) el.textContent = mmss(Math.max(st.left, 0));
      if (st.left <= 0) { if (st.phase === "prep") { st.phase = "talk"; st.left = 120; openTimer.draw(); } else { clearInterval(timerId); st.phase = "done"; st.left = 0; openTimer.draw(); } }
    }, 1000);
  }
  function openAddBook() {
    openModal(`<h3>${ic("plus")}Add my own link<button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><form data-form="addbook" class="field" style="gap:12px"><label class="field">Title<input name="t" required maxlength="60"></label><label class="field">Link (Google Drive or any page)<input name="href" type="url" required placeholder="https://"></label><button class="btn solid" type="submit">Add to my books</button></form>`);
  }
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }

  /* ---------- router ---------- */
  const PAGES = { home: pageHome, listening: pageListening, map: pageMap, words: pageWords, speaking: pageSpeaking, reading: pageReading, writing: pageWriting, essays: pageEssays, books: pageBooks, resources: pageResources, mistakes: pageMistakes, notes: pageNotes };
  const TAB = { map: "listening", words: "listening", essays: "writing", mistakes: "resources", notes: "resources" };
  const routeName = () => { const r = (location.hash || "#home").slice(1).split("?")[0]; return PAGES[r] ? r : "home"; };
  let lastRoute = "";
  function render() {
    const r = routeName(); const y = window.scrollY;
    if (lastRoute === "speaking" && r !== "speaking") recAbort();
    app.innerHTML = PAGES[r]();
    document.querySelectorAll(".nav a[data-tab]").forEach((a) => a.classList.toggle("on", a.dataset.tab === (TAB[r] || r)));
    const L = learned().size; const wc2 = document.getElementById("words-count"); if (wc2) wc2.textContent = L ? L : "";
    document.title = `${r === "home" ? "Me & IELTS" : r.charAt(0).toUpperCase() + r.slice(1) + " · Me & IELTS"}`;
    if (r !== lastRoute) window.scrollTo(0, 0); else window.scrollTo(0, y);
    lastRoute = r;
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) { const o = store.get("mmi-opens", {}); o[open.dataset.open] = (o[open.dataset.open] || 0) + 1; store.set("mmi-opens", o); setTimeout(() => { if (routeName() === "books") render(); }, 50); return; }
    if (e.target === modal) { closeModal(); return; }
    const el = e.target.closest("[data-act]"); if (!el) return;
    const a = el.dataset.act, v = el.dataset.v;
    switch (a) {
      case "search": openSearch(); return;
      case "close": closeModal(); return;
      case "say": say(v); return;
      case "scroll": { const t = document.getElementById(v); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      case "learn": { const L = learned(); const id = +v; L.has(id) ? L.delete(id) : L.add(id); store.set("mmi-learned", [...L]); render(); return; }
      case "place": case "pick": { const w = wordById(+v); S.mapWord = w.id; S.mapGroup = w.g; S.mapPage = Math.floor(W.filter((x) => x.g === w.g).findIndex((x) => x.id === w.id) / 8); render(); return; }
      case "mapgroup": S.mapGroup = v; S.mapPage = 0; S.mapWord = W.find((w) => w.g === v).id; render(); return;
      case "mappage": S.mapPage = +v; render(); return;
      case "labels": S.labels = v === "1"; render(); return;
      case "wordnav": { const list = W.filter((w) => w.g === S.mapGroup); const i = list.findIndex((w) => w.id === S.mapWord); const n = list[(i + +v + list.length) % list.length]; S.mapWord = n.id; S.mapPage = Math.floor(list.indexOf(n) / 8); render(); return; }
      case "wordgroup": S.wordGroup = v; render(); return;
      case "topiccat": S.topicCat = v; render(); return;
      case "cue": S.cue = (S.cue + +v + D.cueCards.length) % D.cueCards.length; render(); return;
      case "cue-random": S.cue = Math.floor(Math.random() * D.cueCards.length); render(); return;
      case "sptab": S.spTab = v; render(); return;
      case "sptopic": S.spTopic = v; render(); return;
      case "sppart": S.spPart = v; render(); return;
      case "rec": rec.on ? recStop() : recStart(); return;
      case "rtype": S.rtype = v; render(); return;
      case "t1": S.t1 = v; render(); return;
      case "t2": S.t2 = v; render(); return;
      case "idea": S.ideaTopic = v; render(); return;
      case "draft-clear": S.draft = ""; S.draftTitle = ""; render(); return;
      case "draft-save": {
        if (!S.draft.trim()) { toast("Write something first."); return; }
        const l = store.get("mmi-essays", []); l.unshift({ title: S.draftTitle, type: S.draftType, text: S.draft, words: wc(S.draft), date: today() }); store.set("mmi-essays", l); toast("Essay saved."); render(); return;
      }
      case "loadessay": { const x = store.get("mmi-essays", [])[+v]; S.draft = x.text; S.draftTitle = x.title; S.draftType = x.type; location.hash = "#writing"; return; }
      case "delessay": { const l = store.get("mmi-essays", []); l.splice(+v, 1); store.set("mmi-essays", l); render(); return; }
      case "delpassage": { const l = store.get("mmi-passages", []); l.splice(+v, 1); store.set("mmi-passages", l); render(); return; }
      case "delmistake": { const l = store.get("mmi-mistakes", []); l.splice(+v, 1); store.set("mmi-mistakes", l); render(); return; }
      case "mskill": S.mistakeSkill = v; render(); return;
      case "bookcat": S.bookCat = v; render(); return;
      case "bookview": S.bookView = v; render(); return;
      case "bookmark": { const m = store.get("mmi-bookmarks", []); const i = m.indexOf(v); i < 0 ? m.push(v) : m.splice(i, 1); store.set("mmi-bookmarks", m); render(); return; }
      case "addbook": openAddBook(); return;
      case "delmybook": { const l = mybooks(); l.splice(+v, 1); store.set("mmi-mybooks", l); render(); return; }
      case "quiz": startQuiz(v); return;
      case "qopt": {
        if (quiz.answered) return; quiz.answered = true; const q = quiz.qs[quiz.i]; const ok = +v === q.w.id; if (ok) quiz.score++;
        document.querySelectorAll(".opt").forEach((b) => { if (+b.dataset.v === q.w.id) b.classList.add("ok"); else if (b === el) b.classList.add("bad"); });
        document.getElementById("qnext").innerHTML = `<button class="btn solid" type="button" data-act="qnext">${quiz.i + 1 < quiz.qs.length ? "Next" : "See result"}</button>`; return;
      }
      case "qnext": quiz.i++; quizRender(); return;
      case "timer": openTimer(); return;
      case "timer-go": timerGo(); return;
      case "goto": {
        const r = searchRender.last[+el.dataset.i]; closeModal();
        if (r.ext) window.open(r.ext, "_blank", "noopener");
        else if (r.word) { const w = wordById(r.word); S.mapWord = w.id; S.mapGroup = w.g; S.mapPage = Math.floor(W.filter((x) => x.g === w.g).findIndex((x) => x.id === w.id) / 8); location.hash === "#map" ? render() : (location.hash = "#map"); }
        else if (r.cue !== undefined) { S.cue = r.cue; location.hash === "#speaking" ? render() : (location.hash = "#speaking"); }
        else location.hash = r.h;
        return;
      }
      default:
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".place")) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && modal.hidden) { e.preventDefault(); openSearch(); }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.check) { toggleTick(t.dataset.check, t.dataset.skill, t.checked); render(); return; }
    if (t.dataset.actChange === "booksort") { S.bookSort = t.value; render(); return; }
    if (t.id === "draft-type") { S.draftType = t.value; render(); return; }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "gs") searchRender(t.value);
    else if (t.id === "topic-q") { S.topicQ = t.value; document.getElementById("topic-grid").innerHTML = topicGridHtml(); }
    else if (t.id === "book-q") { S.bookQ = t.value; document.getElementById("book-grid").innerHTML = booksGrid(); }
    else if (t.id === "draft") { S.draft = t.value; const n = wc(S.draft), tg = S.draftType === "Task 1" ? 150 : 250; document.getElementById("draft-wc").textContent = `${n} words`; const el = document.getElementById("draft-target"); el.textContent = n >= tg ? "Target reached" : `${tg - n} to reach ${tg}`; el.className = n >= tg ? "c-green" : ""; }
    else if (t.id === "draft-title") S.draftTitle = t.value;
    else if (t.id === "notes") store.set("mmi-notes", t.value);
    else if (t.dataset.self) { const s = store.get("mmi-self", { fluency: 3, vocab: 3, grammar: 3, pron: 3 }); s[t.dataset.self] = +t.value; store.set("mmi-self", s); document.getElementById("self-" + t.dataset.self).textContent = `${t.value}/5`; }
    else if (t.dataset.bookprog) { const p = store.get("mmi-bookprog", {}); p[t.dataset.bookprog] = +t.value; store.set("mmi-bookprog", p); document.getElementById("bp-" + t.dataset.bookprog).textContent = `${t.value}%`; }
  });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault();
    const d = Object.fromEntries(new FormData(f)); const kind = f.dataset.form;
    if (kind === "passage") { const l = store.get("mmi-passages", []); l.unshift({ title: d.title.trim(), level: d.level, date: today() }); store.set("mmi-passages", l); }
    if (kind === "mistake") { const l = store.get("mmi-mistakes", []); l.unshift({ skill: d.skill, wrong: d.wrong.trim(), right: d.right.trim(), date: today() }); store.set("mmi-mistakes", l); }
    if (kind === "addbook") {
      if (!/^https?:\/\//i.test(d.href)) { toast("Use a link that starts with https://"); return; }
      const l = mybooks(); l.push({ t: d.t.trim(), href: d.href.trim() }); store.set("mmi-mybooks", l); closeModal();
    }
    render();
  });
  window.addEventListener("hashchange", () => { if (!modal.hidden) closeModal(); render(); });
  render();
})();
