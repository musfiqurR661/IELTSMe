import { D, S, store, hero, crumb, ic, esc, lizBtn, shell, weekPct, isTicked, todayDone } from "../core.js?v=5";
import { learnFinish } from "./learn.js?v=6";

export function pageReading() {
  const rt = D.readingTypes.find((t) => t.id === S.rtype) || D.readingTypes[0];
  const log = store.get("mmi-passages", []);
  const tone = ["red", "blue", "green", "violet", "orange", "pink"];
  const typeIcon = ["target", "check", "list", "edit", "note", "link"];
  const passIcon = ["mountain", "head", "grid", "books", "heart", "cap"];
  const passTone = ["green", "blue", "violet", "orange", "teal", "gold"];
  const planItems = D.checklists.reading;
  const planDone = todayDone(planItems);
  const planMeta = [["book", "green", "Words"], ["note", "blue", "Passage"], ["target", "orange", "Questions"], ["wrong", "red", "Review"], ["edit", "violet", "Summary"]];
  const planRows = planItems.map(([id, sk, label], i) => {
    const [icon, pTone, name] = planMeta[i];
    return `<label class="plan-row"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span class="ico t-${pTone}">${ic(icon)}</span><span class="plan-copy"><b>${esc(label)}</b><small>${name}</small></span></label>`;
  }).join("");
  const week = weekPct("reading");
  const stratIcon = ["clock", "list", "edit", "arrow", "check"];
  const stats = [
    ["Question types", D.readingTypes.length, "list", "green", "rd-types"],
    ["Themes", D.passageTypes.length, "book", "blue", "rd-pass"],
    ["Logged", log.length, "note", "violet", "rd-log"],
    ["This week", `${week}%`, "chart", "red", "rd-plan"]
  ].map(([name, n, icon, pTone, id]) => `<a class="pg pg-${pTone}" href="#${id}" data-act="scroll" data-v="${id}"><span class="ico t-${pTone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></a>`).join("");
  const main = `
    ${hero({ cls: "read wide", photo: true, crumb: crumb("Reading"), title: "Reading", icon: "book", tone: "green", tag: "Read smarter. Score higher.", sub: "Learn how each question type works, then practise on real passages and log what you read.", actions: `<a class="btn solid" href="${esc(D.jump)}" target="_blank" rel="noopener">${ic("target")}Practice passages</a>${lizBtn(D.liz.reading, "IELTSLiz reading")}` })}
    <section class="card home-progress listen-stats">
      <div class="section-head"><h2>${ic("chart")}Your reading</h2><span class="more">${log.length} logged</span></div>
      <div class="pg-row">${stats}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${week}"><b>${week}%</b></div><div><b>This week</b><p class="note">From the reading tasks you tick over the last 7 days. ${log.length} passage${log.length === 1 ? "" : "s"} in your log.</p></div></div>
    </section>
    ${learnFinish("reading")}
    <section class="card" id="rd-types"><div class="section-head"><h2>${ic("list")}Question types</h2><p>Tap a type for its main tip.</p></div>
      <div class="type-grid">${D.readingTypes.map((t, i) => `<button type="button" class="type t-card-${"abcdef"[i]} ${t.id === rt.id ? "on" : ""}" data-act="rtype" data-v="${t.id}"><span class="ico t-${tone[i]}">${ic(typeIcon[i])}</span><span><b>${esc(t.name)}</b><small>${esc(t.tip)}</small></span></button>`).join("")}</div>
      <div class="detail"><span class="ico t-${tone[D.readingTypes.indexOf(rt)] || "green"}">${ic(typeIcon[D.readingTypes.indexOf(rt)] || "book")}</span><div><b>${esc(rt.name)}</b><p>${esc(rt.tip)}</p></div></div></section>
    <section class="card" id="rd-pass"><div class="section-head"><h2>${ic("book")}Passages by theme</h2><a class="more" href="${esc(D.jump)}" target="_blank" rel="noopener">Open practice →</a></div>
      <div class="passages">${D.passageTypes.map(([, n], i) => `<a class="passage g-${passTone[i]}" href="${esc(D.jump)}" target="_blank" rel="noopener"><div class="pic"><span class="ico t-${passTone[i]}">${ic(passIcon[i])}</span></div><div class="body"><b>${esc(n)}</b><small>Practice ${ic("ext")}</small></div></a>`).join("")}</div></section>
    <div class="two">
      <section class="card"><h3>${ic("bulb")}Reading strategies</h3><ul class="tip-list">${D.readingStrategies.map((s, i) => `<li><span class="ico t-${passTone[i]}">${ic(stratIcon[i])}</span><span>${esc(s)}</span></li>`).join("")}</ul></section>
      <section class="card" id="rd-log"><h3>${ic("note")}Passages I have read</h3>
        ${log.length ? log.map((p, i) => `<div class="log-row"><span><b>${esc(p.title)}</b><small>${esc(p.date)}</small></span><span class="lvl ${p.level}">${p.level}</span><button class="del" type="button" data-act="delpassage" data-v="${i}" aria-label="Delete">${ic("trash")}</button></div>`).join("") : `<div class="empty" style="padding:14px"><b>Nothing logged yet</b>Add a passage after you read it.</div>`}
        <form class="mini-form" data-form="passage"><input name="title" placeholder="Passage title" required maxlength="80"><select name="level"><option>Easy</option><option selected>Medium</option><option>Hard</option></select><button class="btn solid sm" type="submit">${ic("plus")}Add</button></form></section>
    </div>
    <div class="card plan" id="rd-plan">
      <div class="plan-head"><h3>${ic("check")}Today's reading</h3><div class="plan-meter" style="--p:${Math.round((planDone / planItems.length) * 100)}"><b>${planDone}/${planItems.length}</b><span>done</span></div></div>
      <div class="plan-list">${planRows}</div>
    </div>`;
  return shell("l-main", "", main);
}
