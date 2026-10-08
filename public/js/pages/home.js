import { D, esc, ic, deco, hero, shell, isTicked, todayDone, weekPct, overall, url } from "../core.js?v=5";
import { learnSummary, mapLessonHomeLine } from "./learn.js?v=8";

export function pageHome() {
  const pop = [
    ["Hobbies", "palette", "pink"], ["Subjects", "book", "blue"], ["Works and Jobs", "case", "orange"], ["Health", "heart", "red"],
    ["Nature", "mountain", "green"], ["The Environment", "globe", "teal"], ["Transportations", "bus", "violet"], ["Places", "pin", "gold"],
    ["Money Matters", "coin", "pink"], ["Sports", "ball", "blue"]
  ];
  const topics = pop.map(([n, icon, tone]) => `<a class="pop g-${tone}" href="${url("listening")}"><span class="ico t-${tone}">${ic(icon)}</span>${esc(n)}</a>`).join("");
  const skills = [
    ["sk-l", "head", "Listening", "Vocabulary, maps and practice.", "listening", "l"], ["sk-s", "mic", "Speaking", "Cue cards and recording.", "speaking", "s"],
    ["sk-r", "book", "Reading", "Question types and passages.", "reading", "r"], ["sk-w", "pen", "Writing", "Task 1, Task 2 and essays.", "writing", "w"]
  ].map(([c, i, t, p, h, d]) => `<a class="skill ${c}" href="${url(h)}"><span class="badge">${ic(i)}</span><h3>${t}</h3><p>${p}</p>${deco(d)}<span class="go">${ic("arrow")}</span></a>`).join("");
  const planMeta = { listening: ["head", "blue", "Listening"], speaking: ["mic", "red", "Speaking"], reading: ["book", "green", "Reading"], writing: ["pen", "violet", "Writing"] };
  const planItems = D.checklists.home;
  const planDone = todayDone(planItems);
  const planRows = planItems.map(([id, sk, label]) => {
    const [icon, tone, name] = planMeta[sk];
    return `<label class="plan-row"><input type="checkbox" data-check="${id}" data-skill="${sk}" ${isTicked(id, sk) ? "checked" : ""}><span class="ico t-${tone}">${ic(icon)}</span><span class="plan-copy"><b>${esc(label)}</b><small>${name}</small></span></label>`;
  }).join("");
  const motives = [
    ["01.jpg", "One calm page is enough to begin."],
    ["02.jpg", "Listen once more. The answer is in the detail."],
    ["03.jpg", "Say it simply. Then say it again."],
    ["04.jpg", "Read for the idea, then read for the words."],
    ["05.jpg", "A clear introduction carries the essay."],
    ["06.jpg", "Your score grows from ordinary days."],
    ["07.jpg", "Five new words today beat fifty tomorrow."],
    ["08.jpg", "Twenty focused minutes are a full practice."],
    ["09.jpg", "Find the landmark. Then follow the road."],
    ["10.jpg", "Small steps. Big results."],
    ["11.jpg", "Review the mistake. That is the lesson."],
    ["12.jpg", "Band by band. You are already on the way."]
  ];
  const motive = motives[Math.floor(Date.now() / (30 * 60 * 1000)) % motives.length];
  const libs = [["mic", "violet"], ["note", "orange"], ["book", "green"], ["bulb", "gold"]];
  const progress = [
    ["Listening", "listening", "head", "blue", url("listening")],
    ["Speaking", "speaking", "mic", "red", url("speaking")],
    ["Reading", "reading", "book", "green", url("reading")],
    ["Writing", "writing", "pen", "violet", url("writing")]
  ].map(([name, sk, icon, tone, href]) => {
    const p = weekPct(sk);
    return `<a class="pg pg-${tone}" href="${href}"><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><span class="plan-meter pg-meter" style="--p:${p}"><b>${p}%</b></span><span class="pg-track"><i style="width:${p}%"></i></span></a>`;
  }).join("");
  const week = overall();
  const main = `
    ${hero({
      cls: "home", photo: true, crumb: "Welcome back", title: "IELTSMee", plain: false,
      tag: "Learn. Practice. Improve.", sub: "Your own space for listening, speaking, reading and writing. Pick a skill and keep a small daily habit.",
      actions: `<a class="btn solid" href="${url("listening")}">Start today ${ic("arrow")}</a><a class="btn" href="${url("books")}">${ic("books")}Open my books</a>`
    })}
    <section class="card home-progress">
      <div class="section-head"><h2>${ic("chart")}Your progress</h2><span class="more">last 7 days</span></div>
      <div class="pg-row">${progress}</div>
      <div class="pg-overall"><div class="plan-meter" style="--p:${week}"><b>${week}%</b></div><div><b>Overall</b><p class="note">From the tasks you tick over the last 7 days. 35 tasks count for each skill.</p></div></div>
    </section>
    <div class="skill-row">${skills}</div>
    <section class="card learn-home">
      <div class="section-head"><h2>${ic("cap")}My Learning</h2><a class="more" href="${url("learn")}">All four modules →</a></div>
      <div class="learn-home-grid">
        ${[["reading", "book", "green", "Reading"], ["writing", "pen", "violet", "Writing"], ["speaking", "mic", "red", "Speaking"], ["listening", "head", "blue", "Listening"]].map(([id, icon, tone, name]) => `<a class="lh g-${tone}" href="${url("learn")}?mod=${id}" data-act="learnmod" data-v="${id}"><span class="ico t-${tone}">${ic(icon)}</span><span class="body"><b>${name}</b><small>${id === "listening" ? "Today's lesson" : "Module"}</small></span></a>`).join("")}
        <a class="lh-today" href="${url("listening-map")}"><span class="ico t-blue">${ic("map")}</span><span><b>Listening maps</b><small>${esc(mapLessonHomeLine())}</small></span><span class="go">${ic("arrow")}</span></a>
      </div>
    </section>
    <section class="card learn-summary">
      <div class="section-head"><h2>${ic("note")}Learning summary</h2><a class="more" href="${url("learn")}">Open My Learning →</a></div>
      ${learnSummary(5)}
    </section>
    <section class="card topics"><div class="section-head"><h2>${ic("star")}Popular topics</h2><a class="more" href="${url("listening")}">View all topics →</a></div><div class="pop-row">${topics}</div></section>
    <div class="trio">
      <div class="card plan">
        <div class="plan-head"><h3>${ic("check")}Today's plan</h3><div class="plan-meter" style="--p:${Math.round((planDone / planItems.length) * 100)}"><b>${planDone}/${planItems.length}</b><span>done</span></div></div>
        <div class="plan-list">${planRows}</div>
      </div>
      <div class="card practice"><h3>${ic("target")}Quick practice</h3><div class="quick-grid">
        <a class="quick q-blue" href="${url("map")}">${ic("map")}Map practice</a><a class="quick q-red" href="${url("speaking")}">${ic("mic")}Cue card</a>
        <a class="quick q-gold" href="${url("reading")}">${ic("book")}Read a passage</a><a class="quick q-violet" href="${url("writing")}">${ic("pen")}Write an intro</a></div>
        <div class="quote-chip">${ic("bulb")}<span>Ten calm minutes every day beat one long night.</span></div></div>
      <div class="banner motive"><img src="img/motive/${motive[0]}" alt=""><p>${esc(motive[1])}</p></div>
    </div>
    <div class="two">
      <div class="card library"><h3>${ic("books")}My library<a class="more" href="${url("books")}">Open books →</a></h3><div class="link-list">${D.books.slice(0, 4).map((b, i) => `<a class="g-${libs[i][1]}" href="${esc(b.href)}" target="_blank" rel="noopener"><span class="l"><span class="ico t-${libs[i][1]}">${ic(libs[i][0])}</span>${esc(b.t)}</span>${ic("ext", "ext")}</a>`).join("")}</div></div>
      <div class="card online"><h3>${ic("globe")}Practise online<a class="more" href="${url("resources")}">All resources →</a></h3><div class="site-list">
        <a class="site-box s-jump" href="${esc(D.jump)}" target="_blank" rel="noopener"><img src="img/logos/jumpinto.png" alt=""><span><b>Jumpinto</b><small>Practice tests</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-liz" href="${esc(D.liz.home)}" target="_blank" rel="noopener"><img src="img/logos/ieltsliz.png" alt=""><span><b>IELTSLiz</b><small>Free lessons</small></span>${ic("ext", "ext")}</a>
        <a class="site-box s-drive" href="${esc(D.drive)}" target="_blank" rel="noopener"><img src="img/logos/drive.png" alt=""><span><b>My Drive</b><small>Your folder</small></span>${ic("ext", "ext")}</a>
      </div></div>
    </div>`;
  return shell("l-main", "", main);
}
