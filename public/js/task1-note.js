/* Task 1 note from the notebook and WR1.pdf, on the Writing page. */
import { esc, store } from "./core.js?v=5";

const KEY = "mmi-t1-note";
const TABS = [
  ["map", "Overview"],
  ["types", "Seven types"],
  ["criteria", "Criteria"],
  ["shape", "Four parts"],
  ["words", "Language"],
  ["check", "Checklist"]
];

export function t1State() {
  const v = store.get(KEY, {}) || {};
  return { tab: TABS.some(([id]) => id === v.tab) ? v.tab : "map" };
}
export function setT1Tab(tab) { store.set(KEY, { tab }); }

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
function flow(items) {
  return `<ol class="t1-flow">${items.map((name, i) => `<li><b>${i + 1}</b><span>${esc(name)}</span></li>`).join("")}</ol>`;
}

function mapPanel() {
  return `<div class="t2-panel">
    <h3>২০ মিনিটে কী করবেন</h3>
    <p class="bn lead">Academic Task 1 একটা রিপোর্ট। মতামত নেই, উপসংহার নেই। চার্টে যা আছে তাই, নিজের সংখ্যা নয়।</p>
    ${bar([
      { cls: "read", flex: 2, name: "Question · 2 min" },
      { cls: "plan", flex: 5, name: "Plan · 5 min" },
      { cls: "write", flex: 12, name: "Write · 12 min" },
      { cls: "check", flex: 1, name: "Proof · 1 min" }
    ], "20 minutes: 2 understanding, 5 planning, 12 writing, 1 proofreading")}
    <h3>লেখাটা চার অংশ</h3>
    <div class="t2-essay" role="img" aria-label="Task 1 report in four parts">
      <div class="blk intro"><div><b>Introduction</b><small>paraphrase</small></div><p class="bn">কী মাপা হয়েছে, কোথায়, কোন সময়। প্রশ্নের বাক্য হুবহু নয়।</p></div>
      <div class="blk body"><div><b>Overview</b><small>no figures</small></div><p class="bn">মূল প্রবণতা, highest, lowest, তুলনা। নির্দিষ্ট সংখ্যা নয়। দুই বা তিন বাক্য।</p></div>
      <div class="blk body"><div><b>Body 1</b><small>first group</small></div><p class="bn">এক দলের ডেটা। গ্রাফ হলে প্রথম বছর থেকে। তুলনা।</p></div>
      <div class="blk end"><div><b>Body 2</b><small>no ending</small></div><p class="bn">বাকি মূল ডেটা। একই কাজ। শেষে নতুন মন্তব্য বা conclusion নয়।</p></div>
    </div>
    <h3>প্রশ্ন থেকে লেখার আগে</h3>
    ${steps([
      { k: "1", t: "Select the main feature", d: "সব সংখ্যা নয়। যা চোখে পড়ে: সবচেয়ে বড় বদল, highest, lowest, ব্যতিক্রম।" },
      { k: "2", t: "Write about that feature", d: "Overview-তে সংখ্যা ছাড়া। Body-তে supporting data আর important figures।" },
      { k: "3", t: "Compare the main feature", d: "একা একা বর্ণনা নয়। এক লাইন অন্য লাইনের পাশে, এক বছর অন্য বছরের পাশে।" }
    ])}
    <div class="t2-call"><b>Body ভাগ করার নিয়ম</b><p class="bn">যেটা বাড়ে, এক paragraph। যেটা কমে, অন্য paragraph। দুটোই বাড়লেও দল বেঁধে লিখুন, প্রতি লাইনে এক অনুচ্ছেদ নয়।</p></div>
  </div>`;
}

function typesPanel() {
  const types = [
    ["1", "Bar chart", "ক্যাটাগরির তুলনা। সবচেয়ে লম্বা, সবচেয়ে খাটো, একটা পার্থক্য।"],
    ["2", "Line graph", "সময়ের সঙ্গে ওঠা-নামা। শুরু, চূড়া, শেষ।"],
    ["3", "Table", "ঘরে ঘরে নয়। একই প্যাটার্নের সারি একসাথে।"],
    ["4", "Pie chart", "অংশ। বড় টুকরো আগে, ছোটগুলো দল বেঁধে।"],
    ["5", "Process", "ধাপের ক্রম। Passive। শুরু থেকে শেষ।"],
    ["6", "Map", "কী বদলাল, কী রইল। জায়গার ভাষা: north, opposite, replaced।"],
    ["7", "Multiple graph", "দুই চার্ট। Overview দুটোকে একসঙ্গে ধরে। Body চার্টপ্রতি অথবা একই প্রবণতায়।"]
  ];
  return `<div class="t2-panel">
    <h3>সাত রকম প্রশ্ন</h3>
    <div class="t1-types">${types.map(([n, name, line]) => `<article><b>${n}</b><strong>${esc(name)}</strong><p class="bn">${esc(line)}</p></article>`).join("")}</div>
    <h3>আপনাকে যা করতে বলা হয়</h3>
    <div class="t1-jobs">
      <article><b>1</b><strong>Summarise data</strong><p class="bn">Bar, line, pie, table, multiple graph। মূল সংখ্যা আর তুলনা।</p></article>
      <article><b>2</b><strong>Stages of a process</strong><p class="bn">কয় ধাপ, কোন ক্রমে, কী দিয়ে। Sugar আর noodles এই দল।</p></article>
      <article><b>3</b><strong>How something works</strong><p class="bn">একই diagram। যন্ত্রের নাম থাকলে সেটা subject হতে পারে।</p></article>
      <article><b>4</b><strong>An object or a place</strong><p class="bn">Academic Task 1-এ এটা গল্প নয়। Map: museum floor আর City Hospital। অথবা কোনো যন্ত্রের ছবি।</p></article>
    </div>
  </div>`;
}

function criteriaPanel() {
  return `<div class="t2-panel">
    <h3>চার মাপ</h3>
    <p class="bn lead">চারটা একসঙ্গে গোনা হয়। সুন্দর শব্দ থাকলেও overview না থাকলে, বা বানানো সংখ্যা থাকলে, Task Achievement আটকে যায়।</p>
    <div class="t2-criteria">
      <article><b>TA</b><strong>Task Achievement</strong><p class="bn">পরিষ্কার, প্রাসঙ্গিক, পুরো উত্তর। Overview আছে। মূল feature বাদ পড়েনি। চার্টে নেই এমন ডেটা নেই।</p></article>
      <article><b>CC</b><strong>Coherence and Cohesion</strong><p class="bn">সাজানো যুক্তি। গ্রাফ হলে প্রথম বছর আগে। তুলনা স্পষ্ট। একই linker বারবার নয়।</p></article>
      <article><b>LR</b><strong>Lexical Resource</strong><p class="bn">Trend-এর শব্দ, প্রশ্নের synonym, collocation। Increase আর decrease ঘুরিয়ে ঘুরিয়ে নয়।</p></article>
      <article><b>GRA</b><strong>Grammatical Range and Accuracy</strong><p class="bn">তুলনা, -ing clause, relative clause। Process-এ passive। ভুল সময় বা ভুল singular-plural নয়।</p></article>
    </div>
    <h3>Body-তে যা লিখবেন</h3>
    ${table(["রাখবেন", "ছাড়বেন"], [
      ["Supporting data — যে সংখ্যা প্রবণতাকে প্রমাণ করে", "প্রতি বছরের প্রতিটা বিন্দু"],
      ["Key features আর major trends", "ছোট ওঠানামা, যদি মোট ছবি না বদলায়"],
      ["Important statistics, অক্ষের একক ঠিক রেখে", "Percentage-কে number of people বানিয়ে ফেলা"],
      ["প্রথম বছর থেকে শুরু", "মাঝের কোনো চূড়া থেকে শুরু, যদি শুরুটা গুরুত্বপূর্ণ হয়"]
    ], 2)}
  </div>`;
}

function shapePanel() {
  return `<div class="t2-panel">
    <h3>চার অংশের কাজ</h3>
    ${table(["অংশ", "কাজ"], [
      ["Introduction", "Paraphrase। অর্থ একই। Synonym, রূপ বদল, গঠন বদল। বানানো ডেটা নয়।"],
      ["Overview", "Main trends। Highest, lowest, comparison। নির্দিষ্ট সংখ্যা নয়। দুই বা তিন বাক্য।"],
      ["Body 1", "এক দলের details আর comparison। গ্রাফ হলে প্রথম বছর।"],
      ["Body 2", "বাকি মূল ডেটা। Body 1-এরই কাজ। Conclusion নেই।"]
    ], 2)}
    <h3>Brighton — বাড়া এক পাশে, কমা অন্য পাশে</h3>
    <div class="t1-pair">
      <div class="t1-up"><b>Body 1 · বাড়ে</b><strong>Pavilion, Pier</strong><p class="bn">Pavilion পরে কিছুটা নামে, তবু 1980-এর চেয়ে উপরে। Pier-এর ছোট ওঠানামা বাদ, মোট বাড়া রাখা।</p></div>
      <div class="t1-down"><b>Body 2 · কমে বা স্থির</b><strong>Art Gallery, Festival</strong><p class="bn">Art Gallery চূড়ার পর টানা নামে। Festival প্রায় একই থাকে।</p></div>
    </div>
    <h3>CO₂ — বাড়া এক পাশে, কমা অন্য পাশে</h3>
    <p class="bn lead">Italy আর Portugal বাড়ে, তাই এক body। Sweden চূড়ার পর কমে, United Kingdom আস্তে কমে, তাই অন্য body। Overview-তে সংখ্যা থাকে না।</p>
    <div class="t2-model">
      <b>Overview — সংখ্যা ছাড়া</b>
      <p class="essay">Overall, carbon dioxide emissions increased in Italy and Portugal, whereas Sweden experienced a significant decline after an initial peak. By contrast, the United Kingdom recorded a gradual decrease throughout the period.</p>
    </div>
    <div class="t2-call"><b>প্রথম বছর</b><p class="bn">Body শুরু করুন প্রথম বছর দিয়ে। CO₂ হলে 1967। Brighton হলে 1980।</p></div>
    <h3>Process-এর সাজ</h3>
    <p class="bn">একই চার অংশ। Overview-তে ধাপের সংখ্যা, শুরু আর শেষ। Body-তে ক্রম। Sugar সাত ধাপ, noodles আট।</p>
    ${flow(["Growing", "Harvesting", "Crushing", "Purifying", "Evaporator", "Centrifuge", "Drying"])}
    <p class="note">Noodles: silos, mixer, dough sheets, dough strips, discs, cooking and drying, vegetables and spices, labelling and sealing। Body ১–৪, তারপর ৫–৮।</p>
    <h3>Map-এর সাজ</h3>
    <p class="bn lead">সংযুক্ত বদল এক body-তে। যা একই রইল শেষে বা overview-তে। Past tense। দিক: north, opposite, to the west of।</p>
    <div class="t1-pair">
      <div class="t1-up"><b>Museum · Body 1</b><strong>Rooms that changed</strong><p class="bn">Archaeology → children's zone + poster area। Gift shop → café। Lift। Natural ও local history unchanged।</p></div>
      <div class="t1-down"><b>Museum · Body 2</b><strong>Hall and entrance</strong><p class="bn">Reception সরানো। Statue কেন্দ্রে। Stairs একই।</p></div>
    </div>
    <div class="t1-pair">
      <div class="t1-up"><b>Hospital · Body 1</b><strong>Roads and buses</strong><p class="bn">Bus stops → bus station পশ্চিমে। দুই roundabout।</p></div>
      <div class="t1-down"><b>Hospital · Body 2</b><strong>Parking split</strong><p class="bn">Shared → staff only। নতুন public car park পূর্বে।</p></div>
    </div>
  </div>`;
}

function wordsPanel() {
  return `<div class="t2-panel">
    <h3>Introduction — অর্থ একই থাকবে</h3>
    ${table(["কৌশল", "কী বদলায়", "Brighton"], [
      ["Synonym", "একই অর্থ, অন্য শব্দ", "shows → compares, tourists → visitors"],
      ["রূপ বদল", "noun, verb, adjective", "percentage → proportion"],
      ["গঠন বদল", "বাক্যের সাজ, অর্থ নয়", "the percentage of tourists who visited → the proportion of visitors who went to"]
    ], 3)}
    <div class="t2-call warn"><b>No fabricated data</b><p class="bn">চার্টে নেই এমন বছর, দেশ, বা শতাংশ বসাবেন না। প্রশ্নে বছর না থাকলেও অক্ষে থাকলে সেই বছর ব্যবহার করা যায়।</p></div>
    <h3>Process — তিনটা paraphrase</h3>
    <p class="bn lead">একটা pattern বেছে নিন। একই diagram-এ তিনটা একসঙ্গে বসাবেন না।</p>
    ${table(["Pattern", "ছাঁচ", "উদাহরণ"], [
      ["1", "the process of + verb-ing", "The diagram illustrates the process of manufacturing paper."],
      ["2", "how + subject + is/are + past participle", "The diagram illustrates how paper is manufactured."],
      ["3", "the stages involved in + verb-ing", "The diagram illustrates the stages involved in producing chocolate."]
    ], 3)}
    ${table(["প্রশ্ন", "একটা ঠিক উত্তর"], [
      ["How books are printed", "The diagram illustrates the process of printing books."],
      ["The process of making a cup of coffee", "The diagram illustrates how a cup of coffee is made."],
      ["How a diagram is written", "The diagram illustrates the process of creating a diagram."]
    ], 2)}
    <div class="t2-model">
      <b>Sugar — pattern 3</b>
      <p class="essay">The diagram illustrates the stages involved in producing sugar from sugar cane.</p>
    </div>
    <div class="t2-model">
      <b>Noodles — pattern 1</b>
      <p class="essay">The diagram illustrates the process of manufacturing instant noodles. Overall, there are eight stages, from storing flour in silos to labelling and sealing the cups, and several machines are used.</p>
    </div>
    <h3>Overview-এর পাঁচ নিয়ম</h3>
    ${steps([
      { k: "1", t: "Main trends", d: "পুরো সময়ের ছবি। একেক বছরের গল্প নয়।" },
      { k: "2", t: "Highest / lowest", d: "কে উপরে শেষ করল, কে নিচে। নাম বলুন, শতাংশ নয়।" },
      { k: "3", t: "Comparison", d: "whereas, by contrast, while — একবার করে, একই শব্দ ঘুরিয়ে নয়।" },
      { k: "4", t: "No specific figures", d: "30%, 10 tonnes, 1985 overview-এ নয়। সেগুলো body-র।" },
      { k: "5", t: "Two or three sentences", d: "লম্বা overview body-র কাজ কেড়ে নেয়।" }
    ])}
    <h3>Trend-এর ভাষা — ক্লাসের লাইন</h3>
    <p class="bn lead">Overview শুরু হয় Overall দিয়ে। Significantly জোর দেয়। While আর than তুলনা করে। Body-তে শুধু যে বিন্দু ওঠানামা দেখায়।</p>
    <div class="t2-quote strong"><p>Overall, a significantly greater percentage of the TV audience watched in the evening, while radio had the most listeners in the morning. Over the course of the day, more people watched TV than listened to the radio.</p></div>
    <p class="bn">Overall দিয়ে শুরু। Significantly জোর। While আর than তুলনা।</p>
    <div class="t2-model">
      <b>Body — শুধু দরকারি বিন্দু</b>
      <p class="essay">Less than 10% of people watched TV between 1 am and 2 am, but by 4 pm this figure had increased rapidly, reaching a peak of almost half the audience at 8 pm. After this, the graph shows a sharp decline, falling to a very small percentage by 3 am.</p>
    </div>
    ${table(["নিয়ম", "এই বাক্যে"], [
      ["Supporting data", "1–2 am, 4 pm, 8 pm, 3 am — যে বিন্দু ওঠা আর নামা দেখায়"],
      ["Relevant figures", "less than 10%, almost half, a very small percentage"],
      ["Comparison if needed", "সকালের radio overview-তেই আছে, তাই body আবার পুরো radio নয়"],
      ["Important data only", "প্রতি ঘণ্টা নয়"]
    ], 2)}
    <div class="t2-call"><b>Body 2</b><p class="bn">একই চার কাজ। Conclusion লিখবেন না।</p></div>
  </div>`;
}

function checkPanel() {
  return `<div class="t2-panel">
    <h3>শেষ ১ মিনিট</h3>
    ${table(["দেখবেন", "মাপ"], [
      ["Overview আছে, এবং তাতে নির্দিষ্ট সংখ্যা নেই", "TA"],
      ["অক্ষের একক ঠিক: percentage থাকলে number বলা হয়নি", "TA"],
      ["প্রথম বছর বা প্রথম ধাপ body-র শুরুতে", "CC"],
      ["বাড়া আর কমা আলাদা paragraph, ছোট ওঠানামা বাদ", "TA"],
      ["Trend-এর শব্দ একই নয়। Pronoun কাকে বোঝায় স্পষ্ট", "LR, CC"],
      ["Process হলে প্রতিটা ধাপ আছে, passive ঠিক, ক্রম ভাঙেনি", "TA, GRA"],
      ["Map হলে বদল আর unchanged দুটোই আছে, দিকের ভাষা ঠিক", "TA, LR"],
      ["নাম আর বছরের বানান চার্টের মতো", "GRA"]
    ], 2)}
    <div class="t2-call"><b>যা বাদ থাকে</b><p class="bn">মতামত। Because people like the seaside-এর মতো কারণ, যদি চার্ট না বলে। বানানো টন বা শতাংশ। মুখস্থ একটা উত্তর অন্য চার্টে বসিয়ে দেওয়া।</p></div>
  </div>`;
}

const PANELS = { map: mapPanel, types: typesPanel, criteria: criteriaPanel, shape: shapePanel, words: wordsPanel, check: checkPanel };

export function task1NoteHtml() {
  const s = t1State();
  const panel = PANELS[s.tab] || mapPanel;
  return `<section class="card t2-note t1-note" id="wr-t1">
    <div class="section-head"><h2>Task 1 · ২০ মিনিটের রিপোর্ট</h2><span class="more">কমপক্ষে ১৫০ words</span></div>
    <div class="t2-stats">
      <div><b>20</b><span>মিনিট</span></div>
      <div><b>150+</b><span>words</span></div>
      <div><b>4</b><span>অংশ, conclusion নয়</span></div>
      <div><b>4</b><span>criteria</span></div>
    </div>
    <div class="t2-rule"><b>এক লাইনের নিয়ম</b><p class="bn">মূল feature বেছে নিন, সেটা লিখুন, অন্যটার সঙ্গে তুলনা করুন। সব বিন্দু তালিকা নয়।</p><p>Select the main feature. Write about it. Compare it.</p></div>
    <div class="pills t2-tabs" role="tablist">${TABS.map(([id, label]) => `<button type="button" class="pill ${s.tab === id ? "on" : ""}" role="tab" aria-selected="${s.tab === id ? "true" : "false"}" data-act="t1tab" data-v="${id}">${label}</button>`).join("")}</div>
    ${panel()}
  </section>`;
}
