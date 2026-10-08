import { D, S, store, hero, crumb, ic, esc, lizBtn, ico, shell, weekPct, isTicked, todayDone, url } from "../core.js?v=5";
import { learnFinish } from "./learn.js?v=8";

export const wc = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
function taskCard(cls, title, sub, icon, tone, list, cur, act, target, link, yt, ytLabel) {
  const t = list.find((x) => x.id === cur) || list[0];
  return `<section class="task-card ${cls}"><div class="task-head">${ico(icon, tone)}<div><h2>${title}</h2><p>${sub}</p></div></div>
    <div class="pills">${list.map((x) => `<button type="button" class="pill ${x.id === t.id ? "on" : ""}" data-act="${act}" data-v="${x.id}">${esc(x.name)}</button>`).join("")}</div>
    <div class="detail" style="background:#fff"><b>${esc(t.name)}</b><p style="margin:4px 0 8px">${esc(t.tip)}</p><ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol><p class="note">Aim for at least ${target} words.</p></div>
    <div class="hero-actions">${lizBtn(link, "IELTSLiz lessons")}${yt ? `<a class="btn yt" href="${esc(yt)}" target="_blank" rel="noopener"><img src="img/logos/youtube.svg" alt="">${esc(ytLabel)}</a>` : ""}</div></section>`;
}
export function pageWriting() {
  const ideas = D.ideas[S.ideaTopic];
  const target = S.draftType === "Task 1" ? 150 : 250;
  const n = wc(S.draft);
  const essays = store.get("mmi-essays", []);
  const planItems = D.checklists.writing;
  const planDone = todayDone(planItems);
  const planMeta = [["book", "violet", "Model"], ["chart", "blue", "Task 1"], ["pen", "orange", "Task 2"], ["list", "green", "Words"], ["wrong", "red", "Review"]];
  const planRows = planItems.map(([id, sk, label], i) => {
    const [icon, tone, name] = planMeta[i];
    return `<label class="plan-row"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span class="ico t-${tone}">${ic(icon)}</span><span class="plan-copy"><b>${esc(label)}</b><small>${name}</small></span></label>`;
  }).join("");
  const week = weekPct("writing");
  const ideaTone = ["blue", "violet", "green"];
  const stats = [
    ["Task types", D.task1.length + D.task2.length, "pen", "violet", "wr-tasks"],
    ["Ideas", Object.keys(D.ideas).length, "bulb", "green", "wr-ideas"],
    ["Essays", essays.length, "note", "blue", "essays"],
    ["Draft", n, "edit", "red", "wr-editor"]
  ].map(([name, num, icon, tone, id]) => `<a class="pg pg-${tone}" href="${id === "essays" ? url("essays") : "#" + id}" ${id === "essays" ? "" : `data-act="scroll" data-v="${id}"`}><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${num}</b></a>`).join("");
  const main = `
    ${hero({ cls: "write wide", photo: true, crumb: crumb("Writing"), title: "Writing", icon: "pen", tone: "violet", tag: "Plan. Write. Review.", sub: "Pick the task type, follow the four steps, then draft your own answer and count the words.", actions: `<button type="button" class="btn solid" data-act="scroll" data-v="wr-editor">${ic("edit")}Open the editor</button><a class="btn" href="${url("essays")}">${ic("note")}My essays</a>` })}
    <section class="card home-progress listen-stats">
      <div class="section-head"><h2>${ic("chart")}Your writing</h2><span class="more">${essays.length} saved</span></div>
      <div class="pg-row">${stats}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${week}"><b>${week}%</b></div><div><b>This week</b><p class="note">From the writing tasks you tick over the last 7 days. This draft is ${n} words. The target is ${target}.</p></div></div>
    </section>
    ${learnFinish("writing")}
    <div class="two" id="wr-tasks">
      ${taskCard("t1", "Task 1", "Describe a graph, chart, map or process.", "chart", "blue", D.task1, S.t1, "t1", 150, D.liz.w1, "https://www.youtube.com/playlist?list=PLZcJqvwRH7Ev5CMdTnq0kgftlI2dEpfZ8", "WT-1 playlist")}
      ${taskCard("t2", "Task 2", "Write an essay on a given topic.", "pen", "orange", D.task2, S.t2, "t2", 250, D.liz.w2, "https://www.youtube.com/playlist?list=PLZcJqvwRH7EvOWYOSzxqxaQ-BdOV3LGgI", "WT-2 playlist")}
    </div>
    <section class="card" id="wr-ideas"><div class="section-head"><h2>${ic("bulb")}Idea bank</h2><div class="pills">${Object.keys(D.ideas).map((k) => `<button type="button" class="pill ${S.ideaTopic === k ? "on" : ""}" data-act="idea" data-v="${k}">${k}</button>`).join("")}</div></div>
      <div class="idea-grid">${ideas.map((t, i) => `<div class="idea g-${ideaTone[i]}"><b>${ic("bulb")}Idea ${i + 1}</b>${esc(t)}</div>`).join("")}</div></section>
    <div class="two">
      <section class="card" id="wr-editor"><h3>${ic("edit")}My draft</h3>
        <div class="form-grid" style="grid-template-columns:140px 1fr"><label class="field">Task<select id="draft-type"><option ${S.draftType === "Task 1" ? "selected" : ""}>Task 1</option><option ${S.draftType === "Task 2" ? "selected" : ""}>Task 2</option></select></label><label class="field">Title or question<input id="draft-title" maxlength="140" placeholder="For example: Some people prefer to work from home" value="${esc(S.draftTitle)}"></label></div>
        <textarea id="draft" class="essay-area" style="margin-top:10px" placeholder="Write your answer here.">${esc(S.draft)}</textarea>
        <div class="essay-bar"><span id="draft-wc">${n} words</span><span id="draft-target" class="${n >= target ? "c-green" : ""}">${n >= target ? "Target reached" : `${target - n} to reach ${target}`}</span><span class="sp"></span><button type="button" class="btn sm" data-act="draft-clear">${ic("refresh")}Clear</button><button type="button" class="btn solid sm" data-act="draft-save">${ic("check")}Save essay</button></div></section>
      <div class="card plan" id="wr-plan">
        <div class="plan-head"><h3>${ic("check")}Today's writing</h3><div class="plan-meter" style="--p:${Math.round((planDone / planItems.length) * 100)}"><b>${planDone}/${planItems.length}</b><span>done</span></div></div>
        <div class="plan-list">${planRows}</div>
      </div>
    </div>`;
  return shell("l-main", "", main);
}
export function pageEssays() {
  const list = store.get("mmi-essays", []);
  const main = `${hero({ cls: "write wide", photo: true, crumb: `${crumb("Writing")} › My essays`, title: "My Essays", icon: "note", tone: "violet", sub: "Every essay you save from the editor is kept on this device.", actions: `<a class="btn solid" href="${url("writing")}">${ic("edit")}Write a new one</a>` })}
    ${list.length ? list.map((e, i) => `<article class="item" style="grid-template-columns:1fr auto"><div><b>${esc(e.title || "Untitled")}</b><small style="display:block;color:var(--muted)">${esc(e.type)} · ${e.words} words · ${esc(e.date)}</small><p style="margin-top:6px;white-space:pre-wrap">${esc(e.text.slice(0, 360))}${e.text.length > 360 ? "…" : ""}</p></div><div style="display:flex;gap:6px"><button class="btn sm" type="button" data-act="loadessay" data-v="${i}">${ic("edit")}Edit</button><button class="del" type="button" data-act="delessay" data-v="${i}" aria-label="Delete">${ic("trash")}</button></div></article>`).join("") : `<div class="empty"><b>No essays yet</b>Write a draft on the Writing page and press Save essay.</div>`}`;
  return shell("l-main", "", main);
}
