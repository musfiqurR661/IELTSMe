import { D, S, store, ic, esc, ext, hero, crumb, lizBtn, shell, mmss, api, isTicked, todayDone, weekPct } from "../core.js?v=3";

export const rec = { on: false, secs: 0, answers: [], mr: null, stream: null, timer: null, msg: "" };
function wave() {
  const bars = Array.from({ length: 48 }, (_, i) => { const h = 8 + Math.abs(Math.sin(i * 1.3) * 22) + (i % 5) * 3; return `M${6 + i * 8} ${35 - h / 2}v${h}`; }).join("");
  return `<div class="wave ${rec.on ? "live" : ""}"><svg viewBox="0 0 400 70" aria-hidden="true"><path d="${bars}" stroke="${rec.on ? "#ec315a" : "#9db4f2"}" stroke-width="4" stroke-linecap="round" fill="none"/></svg></div>`;
}
export function pageSpeaking() {
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
  const planItems = D.checklists.speaking;
  const planDone = todayDone(planItems);
  const planMeta = [["mic", "red", "Part 1"], ["note", "violet", "Cue card"], ["book", "blue", "Idioms"], ["wrong", "orange", "Review"], ["list", "teal", "Topics"]];
  const planRows = planItems.map(([id, sk, label], i) => {
    const [icon, tone, name] = planMeta[i];
    return `<label class="plan-row"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span class="ico t-${tone}">${ic(icon)}</span><span class="plan-copy"><b>${esc(label)}</b><small>${name}</small></span></label>`;
  }).join("");
  const week = weekPct("speaking");
  const topicIcon = { Travel: "map", Education: "cap", Home: "home", Work: "case", Environment: "globe", Lifestyle: "heart", Technology: "grid", People: "head" };
  const topicTone = ["blue", "orange", "green", "violet", "pink", "gold", "teal", "red"];
  const stats = [
    ["Parts", "3", "mic", "red", "sp-topics"],
    ["Cue cards", D.cueCards.length, "note", "violet", "sp-cue"],
    ["Self score", sAvg, "star", "green", "sp-cue"],
    ["Recordings", rec.answers.length, "vol", "blue", "sp-cue"]
  ].map(([name, n, icon, tone, id]) => `<a class="pg pg-${tone}" href="#speaking" data-act="scroll" data-v="${id}"><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></a>`).join("");
  const main = `
    ${hero({ cls: "speak wide", photo: true, crumb: crumb("Speaking"), title: "Speaking", icon: "mic", tone: "red", tag: "Practice. Record. Improve.", sub: "Pick a cue card, speak for two minutes and listen back. Rate yourself honestly after each take.", actions: `<button type="button" class="btn pink" data-act="timer">${ic("clock")}Start speaking timer</button>${lizBtn(D.liz.speaking, "IELTSLiz speaking")}` })}
    <section class="card home-progress listen-stats">
      <div class="section-head"><h2>${ic("chart")}Your speaking</h2><span class="more">this week</span></div>
      <div class="pg-row">${stats}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${week}"><b>${week}%</b></div><div><b>This week</b><p class="note">From the speaking tasks you tick over the last 7 days. Self-check average: ${sAvg} / 5.</p></div></div>
    </section>
    <div class="parts">${parts}</div>
    <div class="three" id="sp-cue">
      <section class="card cue-card"><div class="cue-top"><span class="ico t-red">${ic("note")}</span><h3>Cue card</h3><span class="cue-nav"><button type="button" data-act="cue" data-v="-1" aria-label="Previous">${ic("cl")}</button>${S.cue + 1} / ${D.cueCards.length}<button type="button" data-act="cue" data-v="1" aria-label="Next">${ic("cr")}</button></span></div>
        <span class="cue-tag">Part 2</span><h2 class="cue-q">${esc(cue.title)}</h2><div class="cue-say"><b>You should say:</b><ul>${cue.say.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
        <div class="cue-ideas"><b>${ic("bulb")}Ideas to build your answer</b><ul>${cue.ideas.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
        <div class="cue-actions"><button type="button" class="btn" data-act="cue-random">${ic("shuffle")}Random card</button><button type="button" class="btn" data-act="timer">${ic("clock")}1 min prep</button></div></section>
      <section class="card rec-card"><div class="tabs"><button type="button" class="${S.spTab === "record" ? "on" : ""}" data-act="sptab" data-v="record">${ic("mic")}Record</button><button type="button" class="${S.spTab === "answers" ? "on" : ""}" data-act="sptab" data-v="answers">${ic("vol")}My answers (${rec.answers.length})</button></div>
        ${S.spTab === "record" ? `${wave()}<div class="timer-txt"><span id="rec-time">${mmss(rec.secs)}</span> / 2:00</div><div class="rec-row"><button type="button" class="rec-btn ${rec.on ? "on" : ""}" data-act="rec" aria-label="${rec.on ? "Stop" : "Record"}">${ic(rec.on ? "stop" : "mic")}</button></div>${rec.msg ? `<p class="note" style="text-align:center">${esc(rec.msg)}</p>` : `<p class="note" style="text-align:center">${rec.on ? "Recording. Tap to stop." : "Tap the microphone and speak."}</p>`}` : `<div class="answers">${answersHtml}</div>`}</section>
      <section class="card self-card"><h3>${ic("star")}Self-check<span class="done-count" style="color:var(--pink)">${sAvg} / 5</span></h3>${selfRows}<p class="note">These are your own ratings. They are saved on this device.</p>
        <div class="quote-chip">${ic("bulb")}<span>${esc(D.tips.speaking[S.cue % D.tips.speaking.length])}</span></div></section>
    </div>
    <section class="card" id="sp-topics"><div class="section-head"><h2>${ic("list")}Part 1 and Part 3 topics</h2><div class="pills"><button type="button" class="pill ${S.spPart === "p1" ? "on" : ""}" data-act="sppart" data-v="p1">Part 1</button><button type="button" class="pill ${S.spPart === "p3" ? "on" : ""}" data-act="sppart" data-v="p3">Part 3</button></div></div>
      <div class="topic-mini">${Object.keys(D.spTopics).map((k, i) => `<button type="button" class="tm g-${topicTone[i]} ${S.spTopic === k ? "on" : ""}" data-act="sptopic" data-v="${k}"><span class="ico t-${topicTone[i]}">${ic(topicIcon[k] || "mic")}</span><span class="body"><b>${esc(k)}</b><small>${D.spTopics[k].p1.length + D.spTopics[k].p3.length} questions</small></span></button>`).join("")}</div>
      <div class="q-box"><div><b>${S.spPart === "p1" ? "Part 1 questions" : "Part 3 questions"}: ${esc(S.spTopic)}</b><ol>${topic[S.spPart].map((q) => `<li>${esc(q)}</li>`).join("")}</ol></div>
      <div><b>${ic("bulb")}How to answer</b><ul class="tip-list">${D.tips.speaking.map((t, i) => `<li><span class="ico t-${topicTone[i]}">${ic(["mic", "book", "heart", "clock", "vol"][i] || "bulb")}</span><span>${esc(t)}</span></li>`).join("")}</ul></div></div></section>
    <div class="two">
      <div class="card plan">
        <div class="plan-head"><h3>${ic("check")}Today's speaking</h3><div class="plan-meter" style="--p:${Math.round((planDone / planItems.length) * 100)}"><b>${planDone}/${planItems.length}</b><span>done</span></div></div>
        <div class="plan-list">${planRows}</div>
      </div>
      <div class="card library"><h3>${ic("books")}Speaking material</h3><div class="link-list">
        ${ext(D.pdf.recent, `<span class="l"><span class="ico t-red">${ic("note")}</span>Recent speaking</span>${ic("ext", "ext")}`, 'class="g-red"')}
        ${ext(D.pdf.makkar, `<span class="l"><span class="ico t-orange">${ic("note")}</span>Makkar speaking</span>${ic("ext", "ext")}`, 'class="g-orange"')}
        ${ext(D.pdf.idioms, `<span class="l"><span class="ico t-violet">${ic("book")}</span>Idioms</span>${ic("ext", "ext")}`, 'class="g-violet"')}
      </div><div class="quote-chip">${ic("mic")}<span>Speak a little every day and your answers will start to sound like you.</span></div></div>
    </div>`;
  return shell("l-main", "", main);
}
export async function recStart() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) { rec.msg = "Recording is not supported in this browser."; api.render(); return; }
  try {
    rec.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = []; rec.mr = new MediaRecorder(rec.stream);
    rec.mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    rec.mr.onstop = () => {
      const blob = new Blob(chunks, { type: rec.mr.mimeType || "audio/webm" });
      rec.answers.unshift({ url: URL.createObjectURL(blob), q: D.cueCards[S.cue].title, secs: rec.secs });
      rec.stream.getTracks().forEach((t) => t.stop()); rec.on = false; clearInterval(rec.timer); rec.msg = ""; S.spTab = "answers"; api.render();
    };
    rec.secs = 0; rec.on = true; rec.msg = ""; rec.mr.start();
    rec.timer = setInterval(() => { rec.secs++; const el = document.getElementById("rec-time"); if (el) el.textContent = mmss(rec.secs); if (rec.secs >= 120) recStop(); }, 1000);
    api.render();
  } catch (e) { rec.msg = "The microphone is blocked. Allow it in the browser address bar and try again."; rec.on = false; api.render(); }
}
export function recStop() { if (rec.mr && rec.on && rec.mr.state !== "inactive") rec.mr.stop(); }
export function recAbort() { if (rec.on) { rec.mr.onstop = () => { rec.stream.getTracks().forEach((t) => t.stop()); }; try { rec.mr.stop(); } catch (e) { /* ignore */ } rec.on = false; clearInterval(rec.timer); } }
