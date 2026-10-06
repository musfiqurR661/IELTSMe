import { learned, store, D, hero, crumb, ic, ico, esc, shell, SK, SKN, S } from "../core.js?v=3";
import { allBooks } from "./books.js?v=2";

export function pageResources() {
  const L = learned().size; const opens = Object.values(store.get("mmi-opens", {})).reduce((a, b) => a + b, 0);
  const books = allBooks().length; const linksN = 2 + Object.keys(D.liz).length + Object.keys(D.pdf).length;
  const stats = [
    ["Books", books, "books", "violet", "#books"],
    ["Links", linksN, "link", "blue", "#resources"],
    ["Learned", L, "heart", "red", "#words"],
    ["Opened", opens, "check", "green", "#books"]
  ].map(([name, n, icon, tone, href]) => `<a class="pg pg-${tone}" href="${esc(href)}"><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></a>`).join("");
  const links = [["g1", "target", "Jumpinto", "Practice tests for all four skills.", D.jump], ["g2", "globe", "IELTSLiz", "Free lessons and tips.", D.liz.home], ["g3", "cloud", "My Drive", "All your IELTS files.", D.drive], ["g4", "book", "Liz Reading", "Question types explained.", D.liz.reading], ["g5", "pen", "Liz Task 1", "Graphs, maps and processes.", D.liz.w1]];
  const tools = [["wrong", "red", "Mistake bank", "Write mistakes and fixes.", "#mistakes"], ["note", "blue", "Notes", "A page for quick notes.", "#notes"], ["edit", "violet", "My essays", "Saved writing drafts.", "#essays"], ["heart", "pink", "My words", "Words you marked.", "#words"]];
  const plan = [["Mon", "map", "blue", "Map words + 1 map"], ["Tue", "mic", "green", "Speaking Part 1"], ["Wed", "book", "violet", "Reading passage"], ["Thu", "chart", "orange", "Task 1 practice"], ["Fri", "mic", "red", "Cue card record"], ["Sat", "pen", "pink", "Task 2 essay"], ["Sun", "wrong", "teal", "Review mistakes"]];
  const main = `
    ${hero({ cls: "res wide", photo: true, crumb: crumb("Resources"), title: "Resources", icon: "link", tone: "blue", tag: "Everything in one place", sub: "Practice sites, your Drive files and your own study tools.", actions: `<a class="btn solid" href="${esc(D.jump)}" target="_blank" rel="noopener">${ic("target")}Start practising</a>` })}
    <section class="card home-progress">
      <div class="section-head"><h2>${ic("link")}Your resources</h2></div>
      <div class="pg-row">${stats}</div>
    </section>
    <section class="card"><div class="section-head"><h2>${ic("globe")}Practice platforms</h2></div><div class="res-grid">${links.map(([g, i, t, d, h]) => `<a class="res-card" href="${esc(h)}" target="_blank" rel="noopener"><div class="pic ${g}">${ic(i)}</div><div class="body"><b>${t}</b><p>${d}</p><span class="visit">Visit site ↗</span></div></a>`).join("")}</div></section>
    <section class="card"><div class="section-head"><h2>${ic("books")}My materials</h2><a class="more" href="#books">Open books →</a></div><div class="mat-grid">${D.books.slice(0, 5).map((b) => `<div class="mat"><div class="cover ${b.dark ? "dark" : ""}" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})">${esc(b.cover[3])}</div><b>${esc(b.t)}</b><div class="row"><span class="chip">${esc(b.cat)}</span><a class="open" href="${esc(b.href)}" target="_blank" rel="noopener" data-open="${b.id}">Open ↗</a></div></div>`).join("")}</div></section>
    <section class="card"><div class="section-head"><h2>${ic("pen")}Study tools</h2></div><div class="tool-row">${tools.map(([i, t, n, d, h]) => `<a class="tool g-${t}" href="${h}">${ico(i, t)}<span><b>${n}</b><small>${d}</small></span></a>`).join("")}<button type="button" class="tool g-orange" data-act="timer">${ico("clock", "orange")}<span><b>Speaking timer</b><small>1 min prep, 2 min talk.</small></span></button></div></section>
    <section class="card week"><div class="section-head"><h2>${ic("cal")}A simple week</h2><p>A suggestion. Change it to suit you.</p></div><div class="plan-days">${plan.map(([d, icon, tone, t]) => `<div class="plan-day g-${tone}"><span class="ico t-${tone}">${ic(icon)}</span><b>${d}</b>${t}</div>`).join("")}</div></section>`;
  return shell("l-main", "", main);
}

/* ---------- MISTAKES / NOTES ---------- */
export function pageMistakes() {
  const all = store.get("mmi-mistakes", []);
  const list = all.map((m, i) => ({ ...m, i })).filter((m) => S.mistakeSkill === "All" || m.skill === S.mistakeSkill);
  const main = `${hero({ cls: "res wide", photo: true, crumb: `${crumb("Resources")} › Mistake bank`, title: "My Mistakes", icon: "wrong", tone: "red", sub: "Write the mistake and the fix. Reading them again is the quickest review." })}
    <section class="card"><form class="form-grid" data-form="mistake"><label class="field">Skill<select name="skill">${SK.map((s) => `<option value="${s}">${SKN[s]}</option>`).join("")}</select></label><label class="field">What I got wrong<input name="wrong" required maxlength="140"></label><label class="field">The right answer<input name="right" required maxlength="140"></label><button class="btn solid" type="submit">${ic("plus")}Add</button></form></section>
    <div class="pills"><button type="button" class="pill ${S.mistakeSkill === "All" ? "on" : ""}" data-act="mskill" data-v="All">All</button>${SK.map((s) => `<button type="button" class="pill ${S.mistakeSkill === s ? "on" : ""}" data-act="mskill" data-v="${s}">${SKN[s]}</button>`).join("")}</div>
    <div>${list.length ? list.map((m) => `<div class="item"><span class="ico t-red">${ic("wrong")}</span><div><span class="wrong">${esc(m.wrong)}</span><br><span class="right">${esc(m.right)}</span><small style="display:block;color:var(--muted)">${SKN[m.skill]} · ${esc(m.date)}</small></div><button class="del" type="button" data-act="delmistake" data-v="${m.i}" aria-label="Delete">${ic("trash")}</button></div>`).join("") : `<div class="empty"><b>No mistakes saved</b>Add one above after your next practice.</div>`}</div>`;
  return shell("l-main", "", main);
}
export function pageNotes() {
  const main = `${hero({ cls: "res wide", photo: true, crumb: `${crumb("Resources")} › Notes`, title: "My Notes", icon: "note", tone: "blue", sub: "Anything you want to remember. It saves as you type." })}<textarea id="notes" class="notes-area" placeholder="Start typing...">${esc(store.get("mmi-notes", ""))}</textarea>`;
  return shell("l-main", "", main);
}
