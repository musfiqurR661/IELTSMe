/* Task 2 Band 7 note: 20-day roadmap plus PEEL, on the Writing page. */
import { esc, store } from "./core.js?v=5";

const KEY = "mmi-t2-note";
const TABS = [
  ["map", "Overview"],
  ["criteria", "Criteria"],
  ["shape", "Essay shape"],
  ["peel", "PEEL"],
  ["types", "Essay types"],
  ["days", "20 days"],
  ["check", "Checklist"]
];
const PHASES = ["All", "Fundamentals", "Essay types", "Language", "Mock"];

const DAYS = [
  { day: 1, phase: "Fundamentals", short: "Criteria", title: "Marking criteria and prompt analysis", line: "TR, CC, LR, GRA এবং prompt-এর তিন ধাপ।", tasks: ["চারটা criteria-র কাজ এক লাইনে বলতে পারা।", "একটা prompt থেকে Main topic, Micro-topic, Instruction keywords আলাদা করা।"] },
  { day: 2, phase: "Fundamentals", short: "Ideas", title: "Brainstorming and idea generation", line: "অনেক আইডিয়া নয় — যেটা explain করা যায়, সেটা।", tasks: ["Mind map থেকে ব্যবহারযোগ্য আইডিয়া রাখা।", "উদাহরণ relevant রাখা। নিজের গল্প বাদ।"] },
  { day: 3, phase: "Fundamentals", short: "Shape", title: "Universal essay structure", line: "চার paragraph। লক্ষ্য ২৬০–২৮০ words।", tasks: ["Intro, Body 1, Body 2, Conclusion — এই চার ভাগ।", "লেখার আগে কোন ভাগে কত word যাবে, সেটা ঠিক করা।"] },
  { day: 4, phase: "Fundamentals", short: "Intro", title: "Band 7 introductions", line: "Paraphrase, thesis, outline sentence।", tasks: ["Prompt নিজের ভাষায়: শব্দ বদল, রূপ বদল, গঠন বদল।", "Thesis-এ অবস্থান স্পষ্ট, তারপর outline sentence-এ দুই body-র দিক।"] },
  { day: 5, phase: "Fundamentals", short: "PEEL", title: "Body paragraph mechanics", line: "এক আইডিয়া। Point, Explain, Example, Link।", tasks: ["একটা body paragraph PEEL দিয়ে লেখা।", "প্রতিটা বাক্য যেন আগের বাক্যকে এগিয়ে নেয়।"] },
  { day: 6, phase: "Essay types", short: "Agree", title: "Agree / disagree", line: "Strong stance অথবা balanced stance। Template নয়।", tasks: ["এক পাশে জোর, অথবা দুই পাশ দেখিয়েও নিজের অবস্থান স্পষ্ট।", "মুখস্থ template বাক্য বাদ।"] },
  { day: 7, phase: "Essay types", short: "Essay 1", title: "Full essay — agree / disagree", line: "শুরু থেকে একটা পুরো essay।", tasks: ["Agree/disagree prompt নিয়ে plan করে সম্পূর্ণ essay।", "দুই body-তেই PEEL মানা হয়েছে কি না, নিজে পড়ে দেখা।"] },
  { day: 8, phase: "Essay types", short: "Discuss", title: "Discuss both views and give your opinion", line: "আগে দুই পাশ, তারপর নিজের অবস্থান।", tasks: ["দুই view নিরপেক্ষভাবে উপস্থাপন।", "Personal stance যেন হারিয়ে না যায়।"] },
  { day: 9, phase: "Essay types", short: "Essay 2", title: "Full essay — discussion", line: "৪৫ মিনিটে একটা discussion essay।", tasks: ["Discussion essay আগাগোড়া ৪৫ মিনিটে লেখা।", "দুই view আছে, এবং opinion আলাদা করে বোঝা যায়।"] },
  { day: 10, phase: "Essay types", short: "Adv / Dis", title: "Advantages and disadvantages", line: "Outweigh, অথবা সরাসরি দুই দিক।", tasks: ["Outweigh হলে কোন দিক ভারী, সেটা thesis-এ।", "শুধু advantages and disadvantages চাইলে দুই দিকই develop।"] },
  { day: 11, phase: "Essay types", short: "Problem", title: "Problem, solution, cause, effect", line: "সমস্যা থেকে বাস্তবসম্মত পদক্ষেপ।", tasks: ["Problem বা cause আগে, তারপর solution বা effect।", "পদক্ষেপ এমন, যা বাস্তবে করা যায়।"] },
  { day: 12, phase: "Essay types", short: "Essay 3", title: "Full essay — cause and solution", line: "Coherence সামনে রেখে পুরো essay।", tasks: ["Cause and solution essay সম্পূর্ণ লেখা।", "Paragraph থেকে paragraph-এ যুক্তি যেন লাফ না দেয়।"] },
  { day: 13, phase: "Essay types", short: "Two Qs", title: "Direct and double questions", line: "দুই প্রশ্নের উত্তর, একটা thesis।", tasks: ["দুটো প্রশ্নেরই সরাসরি উত্তর।", "Intro-তে একটা unified thesis।"] },
  { day: 14, phase: "Language", short: "Cohesion", title: "Coherence and cohesion", line: "স্বাভাবিক যোগ, স্পষ্ট pronoun।", tasks: ["একই connector বারবার না বসিয়ে অর্থ দিয়ে যুক্ত করা।", "this, they, such — কাকে বোঝাচ্ছে, সেটা আগের বাক্যে স্পষ্ট।"] },
  { day: 15, phase: "Language", short: "Words", title: "Lexical resource and collocations", line: "Education, environment, tech, crime, society।", tasks: ["এই পাঁচ topic-এ academic collocation জোগাড়।", "কঠিন শব্দ নয় — যে জোড়া স্বাভাবিক, সেটা।"] },
  { day: 16, phase: "Language", short: "Grammar", title: "Grammatical range and accuracy", line: "Relative clause, conditional, inversion, passive।", tasks: ["এই structure প্রয়োজনমতো বসানো।", "Comma আর full stop ঠিক রেখে জটিল বাক্য লেখা।"] },
  { day: 17, phase: "Language", short: "Ending", title: "Conclusions and self-editing", line: "Thesis নতুন শব্দে, তারপর ৩ মিনিট প্রুফ।", tasks: ["Conclusion-এ thesis অন্য শব্দে। নতুন আইডিয়া না খোলা।", "চেকলিস্ট দিয়ে পুরো essay একবার পড়া।"] },
  { day: 18, phase: "Mock", short: "Timed", title: "Timed essay — technology and society", line: "৪০ মিনিট: ৫ plan, ৩০ write, ৫ check।", tasks: ["Technology and modern society নিয়ে পুরো essay।", "সময় ভাগ মানা।"] },
  { day: 19, phase: "Mock", short: "Exam", title: "Timed essay — education and balance", line: "Education and work-life balance। পরীক্ষার মতো।", tasks: ["আরেকটা ৪০ মিনিটের essay।", "নোট আর template সরিয়ে রেখে লেখা।"] },
  { day: 20, phase: "Mock", short: "Audit", title: "Final mock and audit", line: "একটা পুরো essay, তারপর নিজের অডিট।", tasks: ["Full mock essay শেষ করা।", "TR, CC, LR, GRA আলাদা করে নিজেকে দেখা।"] }
];

export function t2State() {
  const v = store.get(KEY, {}) || {};
  const day = +v.day;
  return {
    tab: TABS.some(([id]) => id === v.tab) ? v.tab : "map",
    day: day >= 1 && day <= 20 ? day : 1,
    phase: PHASES.includes(v.phase) ? v.phase : "All",
    done: v.done && typeof v.done === "object" && !Array.isArray(v.done) ? v.done : {}
  };
}
function save(patch) { store.set(KEY, { ...t2State(), ...patch }); }
export function setT2Tab(tab) { save({ tab }); }
export function setT2Day(day) { save({ day: +day }); }
export function setT2Phase(phase) { save({ phase }); }
export function toggleT2Day(day, on) {
  const s = t2State();
  const done = { ...s.done };
  if (on) done[String(day)] = true;
  else delete done[String(day)];
  store.set(KEY, { ...s, done, day: +day });
}

function steps(items) {
  return `<ol class="t2-steps">${items.map((item, i) => `<li class="t2-step"><span class="rail"><b>${esc(item.k)}</b>${i < items.length - 1 ? "<i></i>" : ""}</span><span class="copy"><strong>${esc(item.t)}</strong><span class="bn">${esc(item.d)}</span></span></li>`).join("")}</ol>`;
}
function table(headers, rows, cols) {
  return `<div class="t2-table cols${cols}" role="table"><div class="t2-tr head" role="row">${headers.map((h) => `<span role="columnheader">${esc(h)}</span>`).join("")}</div>${rows.map((r) => `<div class="t2-tr" role="row">${r.map((c) => `<span role="cell">${esc(c)}</span>`).join("")}</div>`).join("")}</div>`;
}
function bar(parts, label) {
  const segs = parts.map((p) => `<i class="${p.cls}" style="flex:${p.flex}"></i>`).join("");
  const key = parts.map((p) => `<span><i class="${p.cls}"></i>${esc(p.name)}</span>`).join("");
  return `<div class="t2-bar" role="img" aria-label="${esc(label)}">${segs}</div><div class="t2-bar-key">${key}</div>`;
}

function mapPanel() {
  return `<div class="t2-panel">
    <h3>২০ দিন কীভাবে পড়বেন</h3>
    <p class="bn lead">প্রতিদিন ১ থেকে দেড় ঘণ্টা। এলোমেলো নতুন essay না লিখে সেই দিনের কাজ শেষ করুন।</p>
    ${steps([
      { k: "1", t: "আজকের দিন", d: "20 days ট্যাবে দিন বাছুন। শুধু সেই দিনের দুইটা কাজ।" },
      { k: "2", t: "মডেল কপি নয়", d: "PEEL-এর বাক্য দেখে নিজের টপিকে একই চার ধাপ লিখুন।" },
      { k: "3", t: "শেষ চার দিন সময় বাঁধুন", d: "Day 18–19 তে ৫ + ৩০ + ৫। Day 20 তে পুরো essay, তারপর অডিট।" }
    ])}
    <h3>চারটা phase</h3>
    <ol class="t2-phases">
      <li><b>1</b><strong>Day 1–5</strong><span>Fundamentals</span><em class="bn">Criteria, আইডিয়া, গঠন, intro, body</em></li>
      <li><b>2</b><strong>Day 6–13</strong><span>Essay types</span><em class="bn">পাঁচ ধরনের essay, মাঝে তিনটে পুরো লেখা</em></li>
      <li><b>3</b><strong>Day 14–17</strong><span>Language</span><em class="bn">Cohesion, collocation, grammar, conclusion</em></li>
      <li><b>4</b><strong>Day 18–20</strong><span>Timed mock</span><em class="bn">দুইটা ৪০ মিনিট, তারপর final audit</em></li>
    </ol>
    <h3>Essay এক নজরে</h3>
    <div class="t2-essay" role="img" aria-label="Four paragraph essay, about 270 words">
      <div class="blk intro"><div><b>Introduction</b><small>about 45</small></div><p class="bn">Prompt নিজের ভাষায়। Thesis। Outline sentence।</p></div>
      <div class="blk body"><div><b>Body 1</b><small>about 95</small></div><p class="bn">একটাই আইডিয়া। PEEL।</p></div>
      <div class="blk body"><div><b>Body 2</b><small>about 95</small></div><p class="bn">আলাদা দ্বিতীয় আইডিয়া। একই PEEL।</p></div>
      <div class="blk end"><div><b>Conclusion</b><small>about 35</small></div><p class="bn">Thesis নতুন শব্দে। নতুন আইডিয়া নয়।</p></div>
    </div>
    <p class="note">Write 260–280 words. The minimum is 250.</p>
  </div>`;
}

function criteriaPanel() {
  return `<div class="t2-panel">
    <h3>Band 7-এর চার মাপ</h3>
    <p class="bn lead">ভালো vocabulary বা জটিল বাক্য থাকলেও score আটকে যায়, যদি আইডিয়া develop না হয়। চারটা criteria একসাথে গোনা হয়।</p>
    <div class="t2-criteria">
      <article><b>TR</b><strong>Task Response</strong><p class="bn">প্রশ্নের instruction পুরোটা। আইডিয়ার নাম নয়, ব্যাখ্যা।</p></article>
      <article><b>CC</b><strong>Coherence and Cohesion</strong><p class="bn">যুক্তির ধারা, স্পষ্ট pronoun, বারবার একই connector নয়।</p></article>
      <article><b>LR</b><strong>Lexical Resource</strong><p class="bn">Topic-এর collocation। Education, environment, tech, crime, society।</p></article>
      <article><b>GRA</b><strong>Grammatical Range and Accuracy</strong><p class="bn">Relative clause, conditional, inversion, passive, punctuation।</p></article>
    </div>
    <h3>Prompt পড়ার ৩ ধাপ</h3>
    ${steps([
      { k: "1", t: "Main topic", d: "বড় বিষয়। যেমন শহর, শিক্ষা, স্বাস্থ্য।" },
      { k: "2", t: "Micro-topic", d: "নির্দিষ্ট কোণ। যেমন traffic congestion।" },
      { k: "3", t: "Instruction keywords", d: "কী করতে বলা হয়েছে: agree, discuss, outweigh, causes and solutions, দুইটা প্রশ্ন।" }
    ])}
    <div class="t2-sample">
      <b>একটা prompt</b>
      <p>In many cities, traffic congestion is getting worse. What are the causes of this problem, and what measures could be taken to solve it?</p>
    </div>
    ${table(["ধাপ", "এই prompt-এ"], [
      ["Main topic", "Cities"],
      ["Micro-topic", "Traffic congestion is getting worse"],
      ["Instruction", "Causes এবং measures — দুটোই উত্তর"]
    ], 2)}
  </div>`;
}

function shapePanel() {
  return `<div class="t2-panel">
    <h3>চার paragraph-এর কাজ</h3>
    ${table(["ভাগ", "কাজ"], [
      ["Introduction", "Paraphrase + স্পষ্ট thesis + outline sentence"],
      ["Body 1", "প্রথম আইডিয়া, PEEL দিয়ে শেষ"],
      ["Body 2", "দ্বিতীয় আইডিয়া, একই কাঠামো"],
      ["Conclusion", "Thesis অন্য শব্দে। নতুন পয়েন্ট নয়।"]
    ], 2)}
    <h3>Intro — Day 4</h3>
    <p class="bn lead">Prompt হুবহু তুলবেন না। তিনভাবে ভাষা বদলান, তারপর অবস্থান আর দুই body-র খসড়া এক বাক্যে দিন।</p>
    ${table(["কৌশল", "কী বদলায়", "নমুনা"], [
      ["শব্দ বদল", "একই অর্থ, অন্য শব্দ", "harmful → damaging"],
      ["রূপ বদল", "noun, verb, adjective ঘোরা", "important → of importance"],
      ["গঠন বদল", "clause-এর জায়গা, active / passive", "People eat fast food → Fast food is eaten"]
    ], 3)}
    <div class="t2-call"><b>Outline sentence</b><p class="bn">Thesis-এর পরের বাক্যে Body 1 আর Body 2 কোন দুই দিক নেবে, সেটা বলে দিন।</p></div>
    <h3>আইডিয়া বাছাই — Day 2</h3>
    <p class="bn">Mind map করুন। যে আইডিয়াটা explain আর relevant example দেয়, শুধু সেটা রাখুন। নিজের ব্যক্তিগত গল্প example হয় না।</p>
  </div>`;
}

function peelPanel() {
  const thin = ["a serious problem", "wastes time", "causes stress", "increases pollution"];
  return `<div class="t2-panel">
    <h3>PEEL — এক আইডিয়া প্রতিষ্ঠা</h3>
    <p class="bn lead">এক paragraph-এ একটা আইডিয়া, এই চার ধাপে। তিনটে আলাদা আইডিয়া একসাথে ঢোকাবেন না।</p>
    ${steps([
      { k: "P", t: "Point", d: "প্রথম বাক্যে মূল কথা, নির্দিষ্ট করে। শুধু “খারাপ” বললে রায় হয়, সমস্যা হয় না।" },
      { k: "E", t: "Explain", d: "Why অথবা How। এক বা দুই বাক্যে কারণ আর সম্ভাব্য ফল। মূল বাক্য আবার লিখবেন না।" },
      { k: "Ex", t: "Example", d: "মূল আইডিয়ার সঙ্গে বাঁধা উদাহরণ। বাক্য বাড়াতে অন্য গল্প নয়। বানানো সংখ্যা নয়।" },
      { k: "L", t: "Link", d: "শেষ বাক্যে মূল কথার সঙ্গে যুক্ত হয়ে paragraph বন্ধ হয়।" }
    ])}
    <div class="t2-split">
      <div>
        <h3>Point যা দাঁড়ায় না</h3>
        <div class="t2-quote weak"><p>Fast food is bad.</p></div>
        <p class="bn">শুধু রায়। কোন সমস্যা, সেটা নেই।</p>
      </div>
      <div>
        <h3>Point যা দাঁড়ায়</h3>
        <div class="t2-quote strong"><p>One major drawback of consuming fast food regularly is its negative impact on people's physical health.</p></div>
        <p class="bn">Fast food এবং নির্দিষ্ট সমস্যা — physical health — দুটোই আছে।</p>
      </div>
    </div>
    <div class="t2-model">
      <b>Fast food — একটা সম্পূর্ণ PEEL</b>
      <ol>
        <li><span>P</span><p>One major drawback of consuming fast food regularly is its negative impact on people's physical health.</p></li>
        <li><span>E</span><p>This is primarily because fast food often contains excessive amounts of salt, sugar and unhealthy fats. Regular consumption of such food can contribute to obesity and increase the risk of developing cardiovascular diseases.</p></li>
        <li><span>Ex</span><p>For example, people who frequently replace balanced home-cooked meals with fast food may find it more difficult to maintain a healthy weight over time.</p></li>
        <li><span>L</span><p>Therefore, reducing the regular consumption of fast food can be an important step towards maintaining better long-term health.</p></li>
      </ol>
    </div>
    <h3>এক আইডিয়া, পুরো paragraph</h3>
    <p class="bn lead">Topic: traffic congestion। বাঁ দিকে চারটে সমস্যার নাম। ডান দিকে একটা আইডিয়া — loss of productivity।</p>
    <div class="t2-split ideas">
      <div class="t2-pile">
        <b>নাম দেওয়া হয়েছে</b>
        ${thin.map((t) => `<span>${esc(t)}</span>`).join("")}
        <p class="bn">সময়, stress, pollution — কোনোটার কারণ বা উদাহরণ নেই।</p>
      </div>
      <div class="t2-deep">
        <b>Loss of productivity</b>
        ${steps([
          { k: "P", t: "Loss of productivity", d: "Congestion-এর একটা বড় ফল।" },
          { k: "E", t: "ঘণ্টার পর ঘণ্টা যাতায়াত", d: "কাজ বা নিজের কাজে সেই সময় যায় না। Stress বাড়ে।" },
          { k: "Ex", t: "ক্লান্ত হয়ে অফিসে পৌঁছানো", d: "মনোযোগ থাকে না।" },
          { k: "L", t: "সময় ভালো কাজে লাগে", d: "Congestion কমলে productivity ফেরে।" }
        ])}
      </div>
    </div>
    <div class="t2-model">
      <b>Traffic — loss of productivity</b>
      <p class="essay">One major consequence of traffic congestion is the loss of productivity. This is because commuters often spend several hours travelling to and from work instead of using that time for professional or personal activities. As a result, they may experience greater stress and have less time to complete important tasks. For example, employees who regularly face long traffic delays may arrive at work feeling exhausted and struggle to concentrate on their responsibilities. Therefore, reducing traffic congestion could help people use their time more efficiently.</p>
    </div>
    <div class="t2-call warn"><b>PEEL মানেই Band 7 নয়</b><p class="bn">Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy — চারটাই লাগে। সংখ্যা বসালে সেটা নির্ভরযোগ্য হতে হয়। Essay-কে academic দেখাতে বানানো statistics বসাবেন না।</p></div>
    <h3>প্রতি paragraph-এর পর তিন প্রশ্ন</h3>
    ${steps([
      { k: "1", t: "মূল বক্তব্য কি পরিষ্কার?", d: "প্রথম বাক্যে নির্দিষ্ট আইডিয়া আছে।" },
      { k: "2", t: "কেন বা কীভাবে — ব্যাখ্যা আছে?", d: "কারণ আর ফল আছে। একই কথা ঘুরিয়ে লেখা নেই।" },
      { k: "3", t: "উদাহরণ কি বক্তব্যকে পরিষ্কার করেছে?", d: "উদাহরণ এই আইডিয়ার। অন্য গল্প নয়।" }
    ])}
  </div>`;
}

function typesPanel() {
  return `<div class="t2-panel">
    <h3>Essay type অনুযায়ী কী বদলায়</h3>
    <p class="bn lead">কাঠামো চার paragraph-ই থাকে। বদলায় instruction — কোন প্রশ্নের উত্তর body-তে দিতে হবে।</p>
    ${table(["Type", "Day", "যা করতে হয়"], [
      ["Agree / disagree", "6–7", "Strong অথবা balanced stance। Template নয়। Day 7-এ পুরো essay।"],
      ["Discuss both + opinion", "8–9", "দুই পাশ আগে নিরপেক্ষ। তারপর নিজের অবস্থান। Day 9-এ ৪৫ মিনিট।"],
      ["Advantages / disadvantages", "10", "Outweigh হলে কোন দিক ভারী। সরাসরি প্রশ্নে দুই দিকই develop।"],
      ["Problem / solution", "11–12", "সমস্যা থেকে বাস্তব পদক্ষেপ। Day 12-তে coherence সামনে।"],
      ["Double question", "13", "দুই প্রশ্নেরই উত্তর। একটা unified thesis।"]
    ], 3)}
    <h3>৪০ মিনিটের ভাগ</h3>
    <p class="bn lead">Day 18 — technology and modern society। Day 19 — education and work-life balance, পরীক্ষার মতো।</p>
    ${bar([
      { cls: "plan", flex: 5, name: "Plan · 5 min" },
      { cls: "write", flex: 30, name: "Write · 30 min" },
      { cls: "check", flex: 5, name: "Check · 5 min" }
    ], "40 minutes: 5 planning, 30 writing, 5 checking")}
    <p class="note">Day 7: finish one full agree/disagree essay. Day 9: one discussion essay in 45 minutes.</p>
  </div>`;
}

function daysPanel(s) {
  const current = DAYS.find((d) => d.day === s.day) || DAYS[0];
  const visible = DAYS.filter((d) => s.phase === "All" || d.phase === s.phase);
  const finished = DAYS.filter((d) => s.done[String(d.day)]).length;
  const on = s.done[String(current.day)] ? "checked" : "";
  return `<div class="t2-panel">
    <div class="t2-dayhead"><h3>আজকের দিন</h3><span class="more">${finished}/20 done</span></div>
    <div class="pills t2-filters">${PHASES.map((name) => `<button type="button" class="pill ${s.phase === name ? "on" : ""}" data-act="t2phase" data-v="${esc(name)}">${esc(name)}</button>`).join("")}</div>
    <div class="t2-days">${visible.map((d) => `<button type="button" class="t2-day p-${d.phase.split(" ")[0].toLowerCase()} ${d.day === current.day ? "on" : ""} ${s.done[String(d.day)] ? "done" : ""}" data-act="t2day" data-v="${d.day}"><b>${d.day}</b><small>${esc(d.short)}</small></button>`).join("")}</div>
    <article class="t2-today">
      <header><b>Day ${current.day}</b><span>${esc(current.phase)}</span><label class="t2-tick"><input type="checkbox" data-t2done="${current.day}" ${on}><span>আজকের কাজ শেষ</span></label></header>
      <h3>${esc(current.title)}</h3>
      <p class="bn">${esc(current.line)}</p>
      <ul>${current.tasks.map((t) => `<li class="bn">${esc(t)}</li>`).join("")}</ul>
    </article>
    <p class="note">টিক এই ডিভাইসে থেকে যায়। দিন শেষ মানে সেই দিনের দুইটা কাজ হয়েছে।</p>
  </div>`;
}

function checkPanel() {
  return `<div class="t2-panel">
    <h3>৩ মিনিটের প্রুফ</h3>
    <p class="bn lead">শেষ তিন মিনিটে এই ছয়টা দেখুন।</p>
    ${table(["দেখবেন", "মাপ"], [
      ["Instruction-এর প্রতিটা অংশের উত্তর আছে, thesis আর body এক কথা বলে", "TR"],
      ["প্রতি body-তে এক আইডিয়া: point, why/how, relevant example, link", "TR"],
      ["Pronoun-এর referent স্পষ্ট। একই connector বারবার নেই", "CC"],
      ["Topic-এর collocation ঠিক। একই শব্দ ঘুরছে না", "LR"],
      ["Complex sentence-এ punctuation ঠিক", "GRA"],
      ["Conclusion thesis-কে নতুন শব্দে বলে। নতুন আইডিয়া আনে না", "TR"]
    ], 2)}
    <h3>Day 20 — master review</h3>
    ${steps([
      { k: "1", t: "Prompt", d: "Main topic, micro-topic, instruction — উত্তর কি ওই instruction-এর?" },
      { k: "2", t: "Shape", d: "চার paragraph। ২৬০–২৮০-এর কাছাকাছি। Intro-তে paraphrase, thesis, outline।" },
      { k: "3", t: "Bodies", d: "প্রতিটাতে এক developed আইডিয়া। তিন প্রশ্নের উত্তর হ্যাঁ।" },
      { k: "4", t: "Type", d: "Agree, discussion, outweigh, solution, বা দুই প্রশ্ন — যেটা চাওয়া হয়েছে।" },
      { k: "5", t: "Language", d: "Link স্বাভাবিক, collocation ঠিক, punctuation ঠিক।" },
      { k: "6", t: "Time", d: "Mock হলে ৫ plan, ৩০ write, ৫ check।" }
    ])}
    <div class="t2-call"><b>যা বাদ থাকে</b><p class="bn">মুখস্থ template। Personal anecdote। এক paragraph-এ অনেক আইডিয়ার তালিকা। বানানো statistics। শুধু কঠিন শব্দ বসিয়ে development বাদ দেওয়া।</p></div>
  </div>`;
}

const PANELS = { map: mapPanel, criteria: criteriaPanel, shape: shapePanel, peel: peelPanel, types: typesPanel, days: daysPanel, check: checkPanel };

export function task2NoteHtml() {
  const s = t2State();
  const panel = PANELS[s.tab] || mapPanel;
  return `<section class="card t2-note" id="wr-t2">
    <div class="section-head"><h2>Task 2 · ২০ দিনে Band 7</h2><span class="more">১–১.৫ ঘণ্টা / দিন</span></div>
    <div class="t2-stats">
      <div><b>20</b><span>দিন, ক্রমে</span></div>
      <div><b>60–90</b><span>মিনিট</span></div>
      <div><b>260–280</b><span>words</span></div>
      <div><b>4</b><span>criteria</span></div>
    </div>
    <div class="t2-rule"><b>এক লাইনের নিয়ম</b><p class="bn">একটি ভালো body paragraph কয়েকটা বাক্যের যোগফল নয়। একটি আইডিয়াকে যুক্তি দিয়ে প্রতিষ্ঠা করা।</p><p>Don't just mention your ideas. Develop them, explain them and support them.</p></div>
    <div class="pills t2-tabs" role="tablist">${TABS.map(([id, label]) => `<button type="button" class="pill ${s.tab === id ? "on" : ""}" role="tab" aria-selected="${s.tab === id ? "true" : "false"}" data-act="t2tab" data-v="${id}">${label}</button>`).join("")}</div>
    ${panel(s)}
  </section>`;
}
