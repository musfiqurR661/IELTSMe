import { D, W, S, esc, ic, hero, crumb, lizBtn, shell, isTicked, todayDone, weekPct, learned, menu } from "../core.js?v=3";
import { TOPICS, wordHit } from "../topic-words.js?v=1";

const TOPIC_TONE = ["blue", "orange", "green", "violet", "pink", "gold", "teal", "red"];
const inCat = (t) => S.topicCat === "All" || t.cat === S.topicCat;

export const listenMenu = (on) => menu("Listening", "head", [
  ["grid", "Overview", "#listening"], ["list", "Topic vocabulary", "#listening"], ["map", "Map vocabulary", "#map"], ["heart", "My words", "#words"],
  ["target", "Practice tests", D.jump, "ext"], ["bulb", "IELTSLiz tips", D.liz.listening, "ext"], ["wrong", "My mistakes", "#mistakes"]
], on);
function matchesTopic(t, q) {
  return !q || t.name.toLowerCase().includes(q) || t.words.some((w) => wordHit(w, q));
}
function wordCard(w) {
  return `<article class="vword"><b>${esc(w[0])}</b><span class="vsyn">${esc(w[1])}</span><p class="bn">${esc(w[2])}</p><ul><li>${esc(w[3])}</li><li>${esc(w[4])}</li></ul></article>`;
}
export function topicGridHtml() {
  const q = S.topicQ.trim().toLowerCase();
  const list = TOPICS.filter((t) => inCat(t) && matchesTopic(t, q));
  if (!list.length) return `<div class="empty"><b>No topics found</b>Try a word, a synonym, the Bangla meaning, or another category.</div>`;
  return list.map((t, i) => {
    const tone = TOPIC_TONE[i % TOPIC_TONE.length];
    const on = S.listenTopic === t.name ? " on" : "";
    return `<button type="button" class="topic g-${tone}${on}" data-act="opentopic" data-v="${esc(t.name)}"><span class="ico t-${tone}">${ic(t.icon)}</span><span class="body"><b>${esc(t.name)}</b><small>${t.words.length} words</small></span><span class="arrow">${ic("arrow")}</span></button>`;
  }).join("");
}
export function topicWordsHtml() {
  const q = S.topicQ.trim().toLowerCase();
  const open = TOPICS.find((t) => t.name === S.listenTopic && inCat(t));
  let groups = [];
  if (!q && open) groups = [{ topic: open, words: open.words }];
  else if (q) {
    groups = TOPICS.filter((t) => inCat(t) && matchesTopic(t, q)).map((t) => ({
      topic: t,
      words: t.name.toLowerCase().includes(q) ? t.words : t.words.filter((w) => wordHit(w, q))
    }));
    if (open) groups.sort((a, b) => (b.topic === open) - (a.topic === open));
  }
  if (!groups.length) {
    return `<p class="note topic-hint">${q ? "No words match that search." : "Choose a topic, or search for a word, a synonym, or the Bangla meaning."}</p>`;
  }
  const cap = q ? 48 : 1000;
  let shown = 0;
  let hidden = 0;
  const blocks = [];
  groups.forEach((g) => {
    if (shown >= cap) { hidden += g.words.length; return; }
    const take = g.words.slice(0, cap - shown);
    hidden += g.words.length - take.length;
    shown += take.length;
    blocks.push({ topic: g.topic, words: take });
  });
  const more = hidden ? `<p class="note vmore">${hidden} more match${hidden === 1 ? "" : "es"}. Type a longer word to narrow the list.</p>` : "";
  return blocks.map(({ topic, words }) => `<article class="vgroup"><h3>${ic(topic.icon)}${esc(topic.name)}<small>${words.length} word${words.length === 1 ? "" : "s"}</small></h3><div class="vword-list">${words.map(wordCard).join("")}</div></article>`).join("") + more;
}
export function pageListening() {
  const total = TOPICS.reduce((a, t) => a + t.words.length, 0);
  const L = learned().size;
  const cats = ["All", ...new Set(TOPICS.map((t) => t.cat))];
  const week = weekPct("listening");
  const learnedPct = Math.round((L / W.length) * 100);
  const planItems = D.checklists.listening;
  const planDone = todayDone(planItems);
  const planMeta = [
    ["book", "blue", "Vocabulary"], ["map", "violet", "Maps"], ["target", "orange", "Practice"],
    ["wrong", "red", "Review"], ["head", "teal", "Listening"]
  ];
  const planRows = planItems.map(([id, sk, label], i) => {
    const [icon, tone, name] = planMeta[i] || ["check", "blue", "Listening"];
    return `<label class="plan-row"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span class="ico t-${tone}">${ic(icon)}</span><span class="plan-copy"><b>${esc(label)}</b><small>${name}</small></span></label>`;
  }).join("");
  const stats = [
    ["Topics", TOPICS.length, "grid", "blue", "topics"],
    ["Topic words", total, "book", "green", "topics"],
    ["Map words", W.length, "map", "violet", "#map"],
    ["Learned", L, "heart", "red", "#words"]
  ].map(([name, n, icon, tone, href]) => {
    const jump = href === "topics";
    return `<a class="pg pg-${tone}" href="${jump ? "#listening" : esc(href)}" ${jump ? 'data-act="jumptopics"' : ""}><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></a>`;
  }).join("");
  const main = `
    ${hero({ cls: "listen wide", photo: true, crumb: crumb("Listening"), title: "Listening", icon: "head", tone: "blue", tag: "Topic vocabulary and map words", sub: "Choose a topic to open its word list, or practise the map vocabulary with pictures and Bangla.", actions: `<a class="btn solid" href="#map">${ic("map")}Practice maps</a>${lizBtn(D.liz.listening, "IELTSLiz listening")}` })}
    <section class="card home-progress listen-stats">
      <div class="section-head"><h2>${ic("chart")}Your listening</h2><span class="more">this week</span></div>
      <div class="pg-row">${stats}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${week}"><b>${week}%</b></div><div><b>This week</b><p class="note">From the listening tasks you tick over the last 7 days. Map words learned: ${L} of ${W.length} (${learnedPct}%).</p></div></div>
    </section>
    <section class="card topics" id="topics">
      <div class="section-head"><h2>${ic("list")}Topic vocabulary</h2><span class="more">${S.listenTopic ? esc(S.listenTopic) : "On this page"}</span></div>
      <div class="filters"><label class="search">${ic("search")}<input id="topic-q" type="search" placeholder="Search topics, words or Bangla" value="${esc(S.topicQ)}" autocomplete="off"></label>
        <div class="pills">${cats.map((c) => `<button type="button" class="pill ${S.topicCat === c ? "on" : ""}" data-act="topiccat" data-v="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>
      <div id="topic-words">${topicWordsHtml()}</div>
      <div id="topic-grid" class="topic-grid">${topicGridHtml()}</div>
    </section>
    <div class="trio">
      <div class="card plan">
        <div class="plan-head"><h3>${ic("check")}Today's listening</h3><div class="plan-meter" style="--p:${Math.round((planDone / planItems.length) * 100)}"><b>${planDone}/${planItems.length}</b><span>done</span></div></div>
        <div class="plan-list">${planRows}</div>
      </div>
      <div class="card practice"><h3>${ic("target")}Quick practice</h3><div class="quick-grid">
        <a class="quick q-blue" href="#map">${ic("map")}Map practice</a>
        <a class="quick q-violet" href="#words">${ic("heart")}My words</a>
        <a class="quick q-gold" href="${esc(D.jump)}" target="_blank" rel="noopener">${ic("target")}Practice tests</a>
        <a class="quick q-red" href="#mistakes">${ic("wrong")}My mistakes</a>
      </div><div class="quote-chip">${ic("bulb")}<span>Listen once more. The answer is in the detail.</span></div></div>
      <div class="card listen-spot"><h3>${ic("map")}Map vocabulary</h3><p>${W.length} words with pictures, Bangla and examples.</p><a class="btn solid" href="#map">Open maps</a></div>
    </div>
    <div class="two">
      <div class="card library"><h3>${ic("list")}Keep going</h3><div class="link-list">
        <a class="g-violet" href="#map"><span class="l"><span class="ico t-violet">${ic("map")}</span>Map vocabulary</span>${ic("arrow", "ext")}</a>
        <a class="g-red" href="#words"><span class="l"><span class="ico t-red">${ic("heart")}</span>My words</span>${ic("arrow", "ext")}</a>
        <a class="g-orange" href="#mistakes"><span class="l"><span class="ico t-orange">${ic("wrong")}</span>My mistakes</span>${ic("arrow", "ext")}</a>
        <a class="g-green" href="#listening" data-act="jumptopics"><span class="l"><span class="ico t-green">${ic("book")}</span>1200 Vocabulary Word List</span>${ic("arrow", "ext")}</a>
      </div></div>
      <div class="card online"><h3>${ic("globe")}Practise online</h3><div class="site-list">
        <a class="site-box s-jump" href="${esc(D.jump)}" target="_blank" rel="noopener"><img src="img/logos/jumpinto.png" alt=""><span><b>Jumpinto</b><small>Practice tests</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-liz" href="${esc(D.liz.listening)}" target="_blank" rel="noopener"><img src="img/logos/ieltsliz.png" alt=""><span><b>IELTSLiz</b><small>Listening lessons</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-yt" href="https://www.youtube.com/playlist?list=PLs-QYOYqew76Z4YWPpTibjJ5AfWrslIeJ" target="_blank" rel="noopener"><img src="img/logos/youtube.svg" alt=""><span><b>Islamic Podcast</b><small>YouTube playlist</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-yt" href="https://www.youtube.com/playlist?list=PLsRNoUx8w3rPxNGCQYBPobGxNj1BfDT7P" target="_blank" rel="noopener"><img src="img/logos/youtube.svg" alt=""><span><b>TEDx Talks</b><small>YouTube playlist</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-yt" href="https://www.youtube.com/@bbclearningenglish/playlists" target="_blank" rel="noopener"><img src="img/logos/youtube.svg" alt=""><span><b>BBC Learning English</b><small>YouTube playlists</small></span>${ic("ext", "ext")}</a>
      </div></div>
    </div>`;
  return shell("l-main", "", main);
}
