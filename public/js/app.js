/* Router, search, quiz, timer, and page actions. */
import {
  D, W, app, modal, api, esc, ic, store, S, learned, wordById, GCOL, today, toggleTick, mmss, PAGE_FILE, url
} from "./core.js?v=5";
import { pageHome } from "./pages/home.js?v=16";
import { pageListening, topicGridHtml, topicWordsHtml } from "./pages/listening.js?v=15";
import { pageLearn, pageListeningMap, noteBoard, learnState, mapTries, mapAttempt, submitMapLesson, resetMapLesson, saveLearnLog } from "./pages/learn.js?v=8";
import { TOPICS, wordHit } from "./topic-words.js?v=1";
import { pageMap, pageWords, say } from "./pages/map.js?v=5";
import { pageSpeaking, rec, recStart, recStop, recAbort } from "./pages/speaking.js?v=8";
import { pageReading } from "./pages/reading.js?v=8";
import { pageWriting, pageEssays, wc } from "./pages/writing.js?v=9";
import { pageBooks, booksGrid, mybooks, allBooks } from "./pages/books.js?v=4";
import { pageResources, pageMistakes, pageNotes } from "./pages/resources.js?v=4";

let timerId = null;
function openModal(html) { modal.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}</div>`; modal.hidden = false; document.body.style.overflow = "hidden"; }
function closeModal() { modal.hidden = true; modal.innerHTML = ""; document.body.style.overflow = ""; clearInterval(timerId); timerId = null; }
function openSearch() {
  openModal(`<h3>${ic("search")}Search<button type="button" data-act="close" aria-label="Close">${ic("x")}</button></h3><label class="modal-search">${ic("search")}<input id="gs" placeholder="Search words, topics, books, pages" autocomplete="off"></label><div class="results" id="gs-res"></div>`);
  const input = document.getElementById("gs"); input.focus(); searchRender("");
}
function searchRender(q) {
  q = q.trim().toLowerCase(); const out = [];
  const pages = [["Home", url("home")], ["My Learning", url("learn")], ["Listening Map", url("listening-map")], ["Listening", url("listening")], ["Map vocabulary", url("map")], ["My words", url("words")], ["Speaking", url("speaking")], ["Reading", url("reading")], ["Writing", url("writing")], ["Books", url("books")], ["Resources", url("resources")], ["My mistakes", url("mistakes")], ["Notes", url("notes")], ["My essays", url("essays")]];
  if (!q) { pages.forEach(([n, h]) => out.push({ k: "Page", t: n, h })); }
  else {
    pages.filter(([n]) => n.toLowerCase().includes(q)).forEach(([n, h]) => out.push({ k: "Page", t: n, h }));
    W.filter((w) => w.t.toLowerCase().includes(q) || w.bn.includes(q)).slice(0, 8).forEach((w) => out.push({ k: "Map word", t: w.t, s: w.bn, word: w.id }));
    const topicHits = [];
    TOPICS.forEach((t) => {
      if (t.name.toLowerCase().includes(q)) topicHits.push({ rank: 0, k: "Topic", t: t.name, s: `${t.words.length} words`, topic: t.name });
      else {
        const word = t.words.find((w) => wordHit(w, q));
        if (word) topicHits.push({ rank: 1, k: "Word", t: word[0], s: `${word[2]} · ${t.name}`, topic: t.name });
      }
    });
    topicHits.sort((a, b) => a.rank - b.rank).slice(0, 6).forEach((h) => out.push(h));
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

function closeSuggest() {
  const box = document.getElementById("suggest");
  const form = document.getElementById("suggest-form");
  const btn = document.querySelector(".suggest-btn");
  if (!box || !form || form.hidden) return;
  form.hidden = true;
  box.classList.remove("is-open");
  if (btn) btn.setAttribute("aria-expanded", "false");
  if (document.activeElement && box.contains(document.activeElement)) document.activeElement.blur();
}
function openSuggest() {
  const box = document.getElementById("suggest");
  const form = document.getElementById("suggest-form");
  const btn = document.querySelector(".suggest-btn");
  if (!box || !form) return;
  form.hidden = false;
  box.classList.add("is-open");
  if (btn) btn.setAttribute("aria-expanded", "true");
  form.querySelector("input[name='name']")?.focus();
}
async function sendSuggest(form) {
  const data = Object.fromEntries(new FormData(form));
  const send = form.querySelector("[type='submit']");
  if (data._honey) { form.reset(); closeSuggest(); toast("Sent. Thank you."); return; }
  if (send) send.disabled = true;
  try {
    const res = await fetch("https://formsubmit.co/ajax/musfiqurm661@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _replyto: data.email,
        _subject: "IELTSMee suggestion or report",
        _template: "table",
        _captcha: "false"
      })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success === false || body.success === "false") throw new Error("send");
    form.reset();
    closeSuggest();
    toast("Sent. Thank you.");
  } catch {
    toast("Could not send. Email musfiqurm661@gmail.com instead.");
  } finally {
    if (send) send.disabled = false;
  }
}

/* ---------- router ---------- */
const PAGES = { home: pageHome, learn: pageLearn, "listening-map": pageListeningMap, listening: pageListening, map: pageMap, words: pageWords, speaking: pageSpeaking, reading: pageReading, writing: pageWriting, essays: pageEssays, books: pageBooks, resources: pageResources, mistakes: pageMistakes, notes: pageNotes };
const TAB = { learn: "learn", "listening-map": "learn", map: "listening", words: "listening", essays: "writing", mistakes: "resources", notes: "resources" };
const TITLE = { home: "IELTSMee", learn: "My Learning · IELTSMee", "listening-map": "Listening Map · IELTSMee" };
const routeName = () => { const r = document.body.dataset.page || "home"; return PAGES[r] ? r : "home"; };
let lastRoute = "";
function saveView() {
  try {
    sessionStorage.setItem("mmi-view", JSON.stringify({
      S: { ...S },
      learn: { mod: learnState.mod, group: learnState.group, day: learnState.day },
      mapTries: Object.fromEntries(Object.entries(mapTries).map(([id, t]) => [id, { picks: t.picks, result: t.result }]))
    }));
  } catch (e) { /* private mode */ }
}
function restoreView() {
  try {
    const v = JSON.parse(sessionStorage.getItem("mmi-view") || "null");
    if (!v) return;
    if (v.S) Object.assign(S, v.S);
    if (v.learn) Object.assign(learnState, v.learn);
    const savedTries = v.mapTries || (v.mapTry ? { farm: v.mapTry } : null);
    if (savedTries) {
      Object.entries(savedTries).forEach(([id, data]) => {
        const t = mapAttempt(id);
        t.picks = (data && data.picks) || {};
        t.result = (data && data.result) || null;
      });
    }
  } catch (e) { /* ignore a bad snapshot */ }
}
function visit(href) { saveView(); location.href = href; }
function render() {
  const r = routeName(); const y = window.scrollY;
  if (lastRoute === "speaking" && r !== "speaking") recAbort();
  app.innerHTML = PAGES[r]();
  document.querySelectorAll(".nav a[data-tab]").forEach((a) => a.classList.toggle("on", a.dataset.tab === (TAB[r] || r)));
  const L = learned().size; const wc2 = document.getElementById("words-count"); if (wc2) wc2.textContent = L ? L : "";
  document.title = TITLE[r] || `${r.charAt(0).toUpperCase() + r.slice(1)} · IELTSMee`;
  if (r !== lastRoute) {
    const words = r === "listening" && S.listenTopic ? document.getElementById("topic-words") : null;
    const id = location.hash.replace(/^#/, "").split("?")[0];
    const t = words || (id && document.getElementById(id));
    if (t) t.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  } else window.scrollTo(0, y);
  lastRoute = r;
  saveView();
  armMotive(r);
}
let motiveTimer = 0;
function armMotive(r) {
  clearTimeout(motiveTimer);
  if (r !== "home") return;
  const slot = 30 * 60 * 1000;
  motiveTimer = setTimeout(() => { if (routeName() === "home") render(); }, slot - (Date.now() % slot) + 200);
}

function setNav(open) {
  const wide = window.matchMedia("(min-width: 1041px)").matches;
  const on = !!open && !wide;
  document.body.classList.toggle("nav-open", on);
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".nav-toggle");
  if (nav) nav.inert = wide ? false : !on;
  if (btn) {
    btn.setAttribute("aria-expanded", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Close menu" : "Open menu");
  }
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".suggest")) closeSuggest();
  if (e.target.closest(".nav a")) setNav(false);
  const skill = e.target.closest("a.skill");
  const arrow = e.target.closest(".go");
  if (skill && arrow && !skill.classList.contains("is-go")) {
    e.preventDefault();
    skill.classList.add("is-go");
    const href = skill.getAttribute("href");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => { visit(href); }, reduce ? 0 : 460);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) { const o = store.get("mmi-opens", {}); o[open.dataset.open] = (o[open.dataset.open] || 0) + 1; store.set("mmi-opens", o); setTimeout(() => { if (routeName() === "books") render(); }, 50); return; }
  if (e.target === modal) { closeModal(); return; }
  const el = e.target.closest("[data-act]"); if (!el) return;
  const a = el.dataset.act, v = el.dataset.v;
  switch (a) {
    case "search": setNav(false); openSearch(); return;
    case "nav": setNav(!document.body.classList.contains("nav-open")); return;
    case "nav-close": setNav(false); return;
    case "suggest": { const form = document.getElementById("suggest-form"); form && form.hidden ? openSuggest() : closeSuggest(); return; }
    case "suggest-close": closeSuggest(); return;
    case "close": closeModal(); return;
    case "say": say(v); return;
    case "scroll": { e.preventDefault(); const t = document.getElementById(v); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    case "learn": { const L = learned(); const id = +v; L.has(id) ? L.delete(id) : L.add(id); store.set("mmi-learned", [...L]); render(); return; }
    case "place": case "pick": { const w = wordById(+v); S.mapWord = w.id; S.mapGroup = w.g; S.mapPage = Math.floor(W.filter((x) => x.g === w.g).findIndex((x) => x.id === w.id) / 8); render(); return; }
    case "mapgroup": S.mapGroup = v; S.mapPage = 0; S.mapWord = W.find((w) => w.g === v).id; render(); return;
    case "mappage": S.mapPage = +v; render(); return;
    case "labels": S.labels = v === "1"; render(); return;
    case "wordnav": { const list = W.filter((w) => w.g === S.mapGroup); const i = list.findIndex((w) => w.id === S.mapWord); const n = list[(i + +v + list.length) % list.length]; S.mapWord = n.id; S.mapPage = Math.floor(list.indexOf(n) / 8); render(); return; }
    case "wordgroup": S.wordGroup = v; render(); return;
    case "topiccat": {
      S.topicCat = v;
      if (S.listenTopic) {
        const topic = TOPICS.find((x) => x.name === S.listenTopic);
        if (!topic || (v !== "All" && topic.cat !== v)) S.listenTopic = "";
      }
      render();
      return;
    }
    case "opentopic": {
      S.listenTopic = S.listenTopic === v ? "" : v;
      render();
      if (S.listenTopic) document.getElementById("topic-words")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    case "jumptopics": {
      e.preventDefault();
      document.getElementById("topics")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
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
    case "loadessay": { const x = store.get("mmi-essays", [])[+v]; S.draft = x.text; S.draftTitle = x.title; S.draftType = x.type; visit(url("writing")); return; }
    case "delessay": { const l = store.get("mmi-essays", []); l.splice(+v, 1); store.set("mmi-essays", l); render(); return; }
    case "delpassage": { const l = store.get("mmi-passages", []); l.splice(+v, 1); store.set("mmi-passages", l); render(); return; }
    case "delmistake": { const l = store.get("mmi-mistakes", []); l.splice(+v, 1); store.set("mmi-mistakes", l); render(); return; }
    case "mskill": S.mistakeSkill = v; render(); return;
    case "bookcat": S.bookCat = v; render(); return;
    case "bookview": S.bookView = v; render(); return;
    case "bookmark": { const m = store.get("mmi-bookmarks", []); const i = m.indexOf(v); i < 0 ? m.push(v) : m.splice(i, 1); store.set("mmi-bookmarks", m); render(); return; }
    case "addbook": openAddBook(); return;
    case "delmybook": { const l = mybooks(); l.splice(+v, 1); store.set("mmi-mybooks", l); render(); return; }
    case "learnmod": learnState.mod = v; saveView(); if (routeName() === "learn") render(); return;
    case "notegroup": {
      learnState.group = v;
      document.querySelectorAll("[data-act='notegroup']").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
      const board = document.getElementById("note-board");
      if (board) board.innerHTML = noteBoard();
      return;
    }
    case "mappick": {
      const attempt = mapAttempt(el.dataset.lesson || "farm");
      attempt.picks[el.dataset.q] = v;
      el.parentElement.querySelectorAll(".letter").forEach((b) => {
        const on = b === el;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      return;
    }
    case "mapsubmit": {
      if (!submitMapLesson(el.dataset.lesson || "farm")) { toast("Choose a letter for every place."); return; }
      render();
      document.getElementById("map-practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    case "mapretry": resetMapLesson(el.dataset.lesson || "farm"); render(); document.getElementById("map-practice")?.scrollIntoView({ behavior: "smooth", block: "start" }); return;
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
      if (r.topic) {
        S.listenTopic = r.topic;
        S.topicQ = "";
        S.topicCat = "All";
        const jump = () => document.getElementById("topic-words")?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (routeName() === "listening") { render(); setTimeout(jump, 60); }
        else visit(url("listening") + "#topics");
        return;
      }
      if (r.ext) window.open(r.ext, "_blank", "noopener");
      else if (r.word) { const w = wordById(r.word); S.mapWord = w.id; S.mapGroup = w.g; S.mapPage = Math.floor(W.filter((x) => x.g === w.g).findIndex((x) => x.id === w.id) / 8); routeName() === "map" ? render() : visit(url("map")); }
      else if (r.cue !== undefined) { S.cue = r.cue; routeName() === "speaking" ? render() : visit(url("speaking")); }
      else visit(r.h);
      return;
    }
    default:
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
  else if (e.key === "Escape" && document.body.classList.contains("nav-open")) setNav(false);
  else if (e.key === "Escape") closeSuggest();
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
  else if (t.id === "topic-q") {
    S.topicQ = t.value;
    const grid = document.getElementById("topic-grid");
    const words = document.getElementById("topic-words");
    if (grid) grid.innerHTML = topicGridHtml();
    if (words) words.innerHTML = topicWordsHtml();
  }
  else if (t.id === "book-q") { S.bookQ = t.value; document.getElementById("book-grid").innerHTML = booksGrid(); }
  else if (t.id === "draft") { S.draft = t.value; const n = wc(S.draft), tg = S.draftType === "Task 1" ? 150 : 250; document.getElementById("draft-wc").textContent = `${n} words`; const el = document.getElementById("draft-target"); el.textContent = n >= tg ? "Target reached" : `${tg - n} to reach ${tg}`; el.className = n >= tg ? "c-green" : ""; }
  else if (t.id === "draft-title") S.draftTitle = t.value;
  else if (t.id === "learn-date") { learnState.day = /^\d{4}-\d{2}-\d{2}$/.test(t.value) ? t.value : today(); render(); }
  else if (t.id === "notes") store.set("mmi-notes", t.value);
  else if (t.dataset.self) { const s = store.get("mmi-self", { fluency: 3, vocab: 3, grammar: 3, pron: 3 }); s[t.dataset.self] = +t.value; store.set("mmi-self", s); document.getElementById("self-" + t.dataset.self).textContent = `${t.value}/5`; }
  else if (t.dataset.bookprog) { const p = store.get("mmi-bookprog", {}); p[t.dataset.bookprog] = +t.value; store.set("mmi-bookprog", p); document.getElementById("bp-" + t.dataset.bookprog).textContent = `${t.value}%`; }
});
document.addEventListener("submit", (e) => {
  const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault();
  const d = Object.fromEntries(new FormData(f)); const kind = f.dataset.form;
  if (kind === "passage") { const l = store.get("mmi-passages", []); l.unshift({ title: d.title.trim(), level: d.level, date: today() }); store.set("mmi-passages", l); }
  if (kind === "mistake") { const l = store.get("mmi-mistakes", []); l.unshift({ skill: d.skill, wrong: d.wrong.trim(), right: d.right.trim(), date: today() }); store.set("mmi-mistakes", l); }
  if (kind === "learnlog") { const err = saveLearnLog(d.module, d.date, d.note); if (err) { toast(err); return; } toast("Learning note saved."); }
  if (kind === "suggest") { sendSuggest(f); return; }
  if (kind === "addbook") {
    if (!/^https?:\/\//i.test(d.href)) { toast("Use a link that starts with https://"); return; }
    const l = mybooks(); l.push({ t: d.t.trim(), href: d.href.trim() }); store.set("mmi-mybooks", l); closeModal();
  }
  render();
});
api.render = render;
window.addEventListener("hashchange", () => {
  setNav(false);
  if (!modal.hidden) closeModal();
  const id = location.hash.replace(/^#/, "").split("?")[0];
  const t = id && document.getElementById(id);
  if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
});
window.addEventListener("pagehide", saveView);
window.addEventListener("resize", () => { if (window.matchMedia("(min-width: 1041px)").matches) setNav(false); });
const here = document.body.dataset.page || "home";
const legacy = (location.hash || "").replace(/^#/, "").split("?")[0];
if (legacy && PAGE_FILE[legacy] && legacy !== here) location.replace(url(legacy));
else {
  restoreView();
  const mod = new URLSearchParams(location.search).get("mod");
  if (["reading", "writing", "speaking", "listening"].includes(mod)) learnState.mod = mod;
  setNav(false);
  render();
}
