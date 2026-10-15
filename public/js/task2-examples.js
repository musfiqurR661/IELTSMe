/* Two Task 2 prompts with Band 8-style answers and a colour key. */
import { esc, store } from "./core.js?v=5";

const KEY = "mmi-t2-ex";
const KIND = {
  para: "Paraphrase",
  thesis: "Thesis",
  out: "Outline",
  p: "Point",
  e: "Explain",
  x: "Example",
  l: "Link",
  end: "Thesis again"
};

const plain = (parts) => parts.map((p) => p.t).join("");
const count = (ex) => ex.paras.flatMap((p) => p.sentences).map((s) => plain(s.parts)).join(" ").trim().split(/\s+/).filter(Boolean).length;

function marks(parts) {
  return parts.map((p) => {
    const text = esc(p.t);
    return p.m ? `<mark class="${p.m}">${text}</mark>` : text;
  }).join("");
}

const EXAMPLES = [
  {
    id: "degree",
    name: "Degree or skills",
    type: "Discuss both views + opinion",
    day: "Day 8–9",
    topic: "Work and education",
    micro: "A degree versus skills and experience",
    task: "Discuss both sides, then give your opinion",
    prompt: [
      "Some people think having a university degree is the best way to secure a good job. However, others believe skills and experience are more important.",
      "Discuss both sides and give your opinion."
    ],
    stance: "দুই পাশ আগে। মত: degree কিছু পেশায় দরকার, কিন্তু ভালো চাকরি পাওয়া ও ধরে রাখতে skills এবং experience বেশি জোরালো।",
    paras: [
      {
        name: "Introduction",
        idea: "Prompt নিজের ভাষায়, তারপর মত, তারপর দুই body-র খসড়া।",
        sentences: [
          { kind: "para", parts: [
            { t: "It is often argued that a " }, { t: "university qualification", m: "syn" },
            { t: " is the " }, { t: "surest route", m: "lex" }, { t: " to " }, { t: "well-paid work", m: "syn" },
            { t: ", " }, { t: "while", m: "cc" }, { t: " others " }, { t: "contend", m: "lex" },
            { t: " that " }, { t: "practical skills and professional experience", m: "syn" }, { t: " " }, { t: "matter more", m: "syn" }, { t: "." }
          ] },
          { kind: "thesis", parts: [
            { t: "Although", m: "gr" }, { t: " a degree remains useful in certain fields, I believe " },
            { t: "ability and experience", m: "syn" }, { t: " are more important when " }, { t: "securing a good job", m: "syn" }, { t: "." }
          ] },
          { kind: "out", parts: [
            { t: "The case for " }, { t: "formal study", m: "syn" }, { t: " " }, { t: "will be set out", m: "gr" },
            { t: " first, before the stronger argument for " }, { t: "proven competence", m: "lex" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "এক আইডিয়া: degree একটি trusted signal, তাই কিছু চাকরির দরজা খোলে। নিজের মত এখানে জোর দিয়ে বলা হয়নি।",
        sentences: [
          { kind: "p", parts: [
            { t: "One reason a degree is " }, { t: "highly valued", m: "lex" }, { t: " is that it provides a " },
            { t: "trusted signal", m: "lex" }, { t: " of " }, { t: "specialist knowledge", m: "lex" }, { t: "." }
          ] },
          { kind: "e", parts: [
            { t: "Employers in fields such as medicine and law cannot judge a stranger's expertise quickly, " },
            { t: "so", m: "cc" }, { t: " they depend on a qualification " }, { t: "a university has already examined", m: "gr" }, { t: "." }
          ] },
          { kind: "e", parts: [
            { t: "Candidates " }, { t: "who lack that credential", m: "gr" }, { t: " are " }, { t: "therefore", m: "cc" },
            { t: " often " }, { t: "screened out", m: "lex" }, { t: "." }
          ] },
          { kind: "x", parts: [
            { t: "A newly qualified nurse, " }, { t: "for example", m: "cc" },
            { t: ", may apply for " }, { t: "clinical posts", m: "lex" }, { t: " " }, { t: "that stay closed", m: "gr" },
            { t: " to an experienced care assistant " }, { t: "who has never completed", m: "gr" },
            { t: " the " }, { t: "required programme", m: "lex" }, { t: "." }
          ] },
          { kind: "l", parts: [
            { t: "A degree can be the " }, { t: "entry ticket", m: "lex" }, { t: " to some good jobs, " },
            { t: "even though", m: "gr" }, { t: " it does not " }, { t: "by itself", m: "lex" }, { t: " guarantee strong performance." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "এক আইডিয়া: skills আর experience দেখায় মানুষ আসলে কী করতে পারে। এটাই লেখকের মত।",
        sentences: [
          { kind: "p", parts: [
            { t: "Skills and experience, " }, { t: "however", m: "cc" }, { t: ", do more to " }, { t: "win and keep", m: "lex" },
            { t: " " }, { t: "good employment", m: "syn" }, { t: " because they reveal what a person can already deliver." }
          ] },
          { kind: "e", parts: [
            { t: "A " }, { t: "certificate", m: "syn" }, { t: " shows that someone has studied a subject, " }, { t: "yet", m: "cc" },
            { t: " it " }, { t: "says little about", m: "lex" }, { t: " " }, { t: "meeting deadlines", m: "lex" },
            { t: ", solving " }, { t: "unfamiliar problems", m: "lex" }, { t: " or dealing with clients." }
          ] },
          { kind: "x", parts: [
            { t: "A software developer " }, { t: "who has released", m: "gr" }, { t: " " }, { t: "real products", m: "lex" },
            { t: ", " }, { t: "for instance", m: "cc" }, { t: ", " }, { t: "is often chosen", m: "gr" },
            { t: " over a recent graduate with excellent grades but no " }, { t: "finished work", m: "lex" }, { t: "." }
          ] },
          { kind: "l", parts: [
            { t: "Once", m: "cc" }, { t: " any basic " }, { t: "entry requirement", m: "lex" }, { t: " " },
            { t: "has been met", m: "gr" }, { t: ", " }, { t: "practical competence", m: "lex" },
            { t: " tends to " }, { t: "outweigh", m: "lex" }, { t: " a " }, { t: "paper qualification", m: "syn" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Conclusion",
        idea: "Thesis নতুন শব্দে। নতুন আইডিয়া নেই।",
        sentences: [
          { kind: "end", parts: [
            { t: "In conclusion", m: "cc" }, { t: ", a university degree still matters where a profession demands " },
            { t: "verified knowledge", m: "lex" }, { t: ", " }, { t: "but", m: "cc" },
            { t: " it is rarely the " }, { t: "best path", m: "syn" }, { t: " " }, { t: "on its own", m: "lex" }, { t: "." }
          ] },
          { kind: "end", parts: [
            { t: "For most good jobs, " }, { t: "demonstrated skill and relevant experience", m: "syn" },
            { t: " lead employers to hire someone and " }, { t: "retain", m: "lex" }, { t: " them." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["university degree", "university qualification, formal study, credential, certificate, paper qualification", "academic credential, higher-education certificate, bachelor's degree"],
      ["the best way", "the surest route, the best path", "the most reliable path, the safest route"],
      ["secure a good job", "well-paid work, securing a good job, good employment, hire and retain", "obtain decent employment, land a worthwhile post, keep a strong position"],
      ["skills and experience", "practical skills and professional experience, ability and experience, proven competence, practical competence, demonstrated skill", "hands-on ability, a track record, workplace competence"],
      ["more important", "matter more, do more to, outweigh", "carry more weight, count for more, be more decisive"],
      ["others believe", "others contend", "others maintain, others argue, others claim"]
    ],
    lexis: [
      ["surest route", "সবচেয়ে নির্ভরযোগ্য পথ", "most reliable path, safest way"],
      ["trusted signal", "বিশ্বাসযোগ্য ইঙ্গিত", "recognised sign, credible indicator"],
      ["screened out", "শুরুতেই বাদ পড়া", "filtered out, rejected at the first stage"],
      ["entry ticket", "ঢোকার চাবি", "gateway, a way in"],
      ["says little about", "খুব একটা জানায় না", "reveals almost nothing about, does not show"],
      ["practical competence", "কাজের দক্ষতা", "proven ability, real capability"],
      ["outweigh", "চেয়ে ভারী হওয়া", "carry more weight than, count for more than"],
      ["paper qualification", "কাগজের সনদ", "a certificate on paper, a formal credential"],
      ["verified knowledge", "যাচাই করা জ্ঞান", "tested expertise, accredited knowledge"],
      ["on its own", "একা একা", "by itself, in isolation"]
    ],
    grammar: [
      ["Concession", "Although a degree remains useful..., I believe...", "While a degree is still useful, I think..."],
      ["Passive", "will be set out / has been met / is often chosen", "This essay first sets out... / employers have met... / employers often choose"],
      ["Relative clause", "who lack that credential / that stay closed / who has released", "lacking that credential / closed to assistants / after releasing products"],
      ["Contrast clause", "even though it does not guarantee...", "despite not guaranteeing..."]
    ],
    cohesion: [
      ["while", "এক বাক্যে দুই view"],
      ["so / therefore", "কারণের পর ফল, দুই জায়গায় দুই শব্দ"],
      ["however / yet", "দ্বিতীয় দিকে মোড়, একই শব্দ বারবার নয়"],
      ["for example / for instance", "example-এর চিহ্ন, দুই body-তে দুই রকম"],
      ["Once / In conclusion", "শর্ত, তারপর শেষ"]
    ],
    daily: [
      ["It is often argued that …, while others contend that …", "Some people maintain that …, whereas others argue that …", "There is a view that …, but others claim that …"],
      ["Although X remains useful, I believe Y is more important.", "While X still has value, I am convinced that Y matters more.", "X is not useless, yet Y carries more weight."],
      ["One reason X is highly valued is that …", "A major reason X is prized is that …", "X is widely respected because …"],
      ["can be the entry ticket to …", "can be the gateway to …", "can open the door to …"],
      ["says little about whether …", "reveals almost nothing about whether …", "does not show whether …"],
      ["tends to outweigh …", "usually carries more weight than …", "is generally more decisive than …"],
      ["is rarely the best path on its own", "seldom works as the only route", "is rarely sufficient by itself"]
    ]
  },
  {
    id: "salary",
    name: "Salary or satisfaction",
    type: "Agree / disagree",
    day: "Day 6–7",
    topic: "Work",
    micro: "A high salary versus job satisfaction",
    task: "Agree or disagree — here the stance is a clear disagree",
    prompt: [
      "Big salary is much more important than job satisfaction.",
      "Do you agree or disagree?"
    ],
    stance: "Disagree। বেতন থাকা দরকার, কিন্তু satisfaction-ই কাজ ভালো রাখে। দুই body দুই কারণ, দুটোই এই মতের।",
    paras: [
      {
        name: "Introduction",
        idea: "Prompt paraphrase, সঙ্গে সঙ্গে disagree, তারপর দুই body কোন দিক নেবে।",
        sentences: [
          { kind: "para", parts: [
            { t: "Some people claim that a " }, { t: "large salary", m: "syn" }, { t: " is " },
            { t: "far more important", m: "syn" }, { t: " than " }, { t: "being satisfied at work", m: "syn" }, { t: "." }
          ] },
          { kind: "thesis", parts: [{ t: "I disagree." }] },
          { kind: "thesis", parts: [
            { t: "A " }, { t: "liveable income", m: "lex" }, { t: " is necessary, " }, { t: "but", m: "cc" },
            { t: " " }, { t: "job satisfaction", m: "syn" }, { t: " has the " }, { t: "greater effect", m: "lex" },
            { t: " on whether someone can perform well for many years." }
          ] },
          { kind: "out", parts: [
            { t: "Both the quality of daily work and the cost of an " }, { t: "unwelcome role", m: "lex" },
            { t: " support this view." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "এক আইডিয়া: টাকা দৈনিক কাজকে যত্নশীল রাখে না।",
        sentences: [
          { kind: "p", parts: [
            { t: "The " }, { t: "chief limitation", m: "lex" }, { t: " of " }, { t: "ranking pay above satisfaction", m: "lex" },
            { t: " is that money does little to keep daily work careful." }
          ] },
          { kind: "e", parts: [
            { t: "An employee " }, { t: "who finds the tasks meaningless", m: "gr" },
            { t: " often " }, { t: "grows careless", m: "lex" }, { t: " and contributes less, " },
            { t: "however comfortable the wage may be", m: "gr" }, { t: "." }
          ] },
          { kind: "e", parts: [
            { t: "The " }, { t: "wage", m: "syn" }, { t: " may cover living costs, " }, { t: "but", m: "cc" },
            { t: " it gives no reason to " }, { t: "take care over the details", m: "lex" }, { t: "." }
          ] },
          { kind: "x", parts: [
            { t: "A nurse, " }, { t: "for example", m: "cc" }, { t: ", may " }, { t: "turn down", m: "lex" },
            { t: " a " }, { t: "better-paid", m: "lex" }, { t: " office job because treating patients feels more worthwhile than the " },
            { t: "extra income", m: "syn" }, { t: "." }
          ] },
          { kind: "l", parts: [
            { t: "Satisfaction", m: "syn" }, { t: " is what maintains effort after a " }, { t: "pay rise", m: "lex" },
            { t: " has become ordinary." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "এক আইডিয়া: অপছন্দের কাজের ক্ষতি বড় বেতন সারিয়ে দেয় না।",
        sentences: [
          { kind: "p", parts: [
            { t: "A " }, { t: "high income", m: "syn" }, { t: " also " }, { t: "fails to repair", m: "lex" },
            { t: " the damage caused by work a person dreads." }
          ] },
          { kind: "e", parts: [
            { t: "Long hours spent on " }, { t: "unwelcome tasks", m: "lex" },
            { t: " can " }, { t: "disturb", m: "lex" }, { t: " sleep, health and family life, and those losses " },
            { t: "are not undone", m: "gr" }, { t: " by a larger monthly payment." }
          ] },
          { kind: "x", parts: [
            { t: "If", m: "gr" }, { t: " a manager stays in a " }, { t: "well-paid", m: "syn" },
            { t: " post that causes " }, { t: "constant anxiety", m: "lex" },
            { t: ", the salary may " }, { t: "look impressive", m: "lex" },
            { t: " " }, { t: "while", m: "cc" }, { t: " that person becomes less effective and more likely to resign." }
          ] },
          { kind: "l", parts: [
            { t: "Over time, that strain makes the high salary feel like payment for enduring the job rather than a reason to stay." }
          ] },
          { kind: "l", parts: [
            { t: "Adequate pay", m: "syn" }, { t: " matters, " }, { t: "yet", m: "cc" },
            { t: " it cannot replace the " }, { t: "steadiness", m: "lex" }, { t: " that comes from " },
            { t: "valuing the work", m: "syn" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Conclusion",
        idea: "Disagree আবার, prompt-এর শব্দ না তুলে।",
        sentences: [
          { kind: "end", parts: [
            { t: "To conclude", m: "cc" }, { t: ", I do not accept that " }, { t: "high earnings", m: "syn" },
            { t: " " }, { t: "matter far more", m: "syn" }, { t: " than " }, { t: "feeling fulfilled at work", m: "syn" }, { t: "." }
          ] },
          { kind: "end", parts: [
            { t: "Pay should be enough to live on, " }, { t: "whereas", m: "cc" },
            { t: " " }, { t: "fulfilment", m: "syn" }, { t: " is what keeps people " },
            { t: "competent, healthy and committed", m: "lex" }, { t: "." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["big salary", "large salary, wage, extra income, high income, well-paid, high earnings, adequate pay", "a generous wage, high remuneration, a substantial income"],
      ["much more important", "far more important, greater effect, matter far more", "considerably more valuable, of much greater importance"],
      ["job satisfaction", "being satisfied at work, satisfaction, feeling fulfilled at work, fulfilment, valuing the work", "contentment at work, pride in the role, finding the work worthwhile"]
    ],
    lexis: [
      ["liveable income", "চলার মতো আয়", "a sufficient wage, enough to live on"],
      ["greater effect", "বেশি প্রভাব", "a stronger influence, a larger impact"],
      ["chief limitation", "মূল সীমাবদ্ধতা", "main drawback, central weakness"],
      ["ranking pay above", "বেতনকে উপরে রাখা", "putting salary first, valuing pay over"],
      ["grows careless", "অমনোযোগী হয়ে পড়ে", "becomes careless, starts to cut corners"],
      ["take care over the details", "খুঁটিনাটি যত্ন নেওয়া", "pay attention to the details, be thorough"],
      ["turn down", "প্রত্যাখ্যান করা", "decline, refuse"],
      ["pay rise", "বেতন বৃদ্ধি", "a salary increase, a raise"],
      ["fails to repair", "সারাতে পারে না", "cannot undo, does little to mend"],
      ["constant anxiety", "লাগাতার দুশ্চিন্তা", "ongoing stress, persistent worry"],
      ["look impressive", "চমকপ্রদ দেখানো", "seem attractive, appear successful"],
      ["steadiness", "স্থিরতা", "stability, consistency"]
    ],
    grammar: [
      ["Short stance", "I disagree.", "I do not share that view. / I take the opposite position."],
      ["Concession", "A liveable income is necessary, but...", "Although a liveable income is necessary, ..."],
      ["Relative clause", "who finds the tasks meaningless", "an employee finding the tasks meaningless"],
      ["Fronted concession", "however comfortable the wage may be", "no matter how comfortable the wage is"],
      ["Passive", "those losses are not undone", "a larger payment does not undo those losses"],
      ["Conditional", "If a manager stays..., the salary may look impressive while...", "Should a manager stay..., the salary can look impressive even as..."]
    ],
    cohesion: [
      ["but / yet / whereas", "ছাড় দিয়ে মত, তিন জায়গায় তিন শব্দ"],
      ["for example", "উদাহরণ, দ্বিতীয় body-তে if-example, তাই আবার for example নয়"],
      ["while", "একসঙ্গে দুই ফল: বেতন দেখাতে ভালো, মানুষ ক্লান্ত"],
      ["also", "দ্বিতীয় body যেন প্রথম আইডিয়ার ভাই, নতুন প্রশ্ন নয়"],
      ["To conclude", "শেষ, In conclusion-এর বদলে অন্য শব্দ"]
    ],
    daily: [
      ["Some people claim that X is far more important than Y. I disagree.", "It is sometimes said that X matters much more than Y. I do not share that view.", "Many people rank X above Y. I take the opposite position."],
      ["A is necessary, but B has the greater effect.", "A is essential, yet B influences the outcome more.", "A cannot be ignored, but B does more to decide the result."],
      ["The chief limitation of X is that …", "The main drawback of X is that …", "What X fails to do is …"],
      ["may turn down …", "may decline …", "may refuse …"],
      ["fails to repair the damage", "cannot undo the harm", "does little to mend the damage"],
      ["If someone stays in …, A may look impressive while …", "Should a person remain in …, A can seem attractive even as …", "A person who remains in … may appear successful while …"],
      ["cannot replace the steadiness that comes from …", "cannot substitute for the stability of …", "is no substitute for …"]
    ]
  }
];

export function t2ExampleId() {
  const id = store.get(KEY, "degree");
  return EXAMPLES.some((ex) => ex.id === id) ? id : "degree";
}
export function setT2Example(id) { if (EXAMPLES.some((ex) => ex.id === id)) store.set(KEY, id); }

function rows(headers, data) {
  return `<div class="t2-table cols${headers.length}" role="table"><div class="t2-tr head" role="row">${headers.map((h) => `<span role="columnheader">${esc(h)}</span>`).join("")}</div>${data.map((r) => `<div class="t2-tr" role="row">${r.map((c) => `<span role="cell">${esc(c)}</span>`).join("")}</div>`).join("")}</div>`;
}

function essayHtml(ex) {
  const n = count(ex);
  const clean = ex.paras.map((p) => `<p>${esc(p.sentences.map((s) => plain(s.parts)).join(" "))}</p>`).join("");
  const marked = ex.paras.map((p) => `<div class="ex-block"><header><b>${esc(p.name)}</b><span class="bn">${esc(p.idea)}</span></header>${p.sentences.map((s) => `<p class="sent k-${s.kind}"><i>${KIND[s.kind]}</i><span>${marks(s.parts)}</span></p>`).join("")}</div>`).join("");
  const daily = ex.daily.map((line) => `<li><b>${esc(line[0])}</b><span>${line.slice(1).map((alt) => `<em>${esc(alt)}</em>`).join("")}</span></li>`).join("");
  return `<article class="ex-one">
    <div class="ex-paper">
      <b>WRITING TASK 2</b>
      <p>You should spend about 40 minutes on this task.</p>
      <p>Write about the following topic:</p>
      <div class="ex-q">${ex.prompt.map((line) => `<p>${esc(line)}</p>`).join("")}</div>
      <p>Give reasons for your answer and include any relevant examples from your knowledge or experience.</p>
      <p>Write at least 250 words.</p>
    </div>
    <div class="ex-read">
      <header><span>${esc(ex.type)}</span><b>${esc(ex.topic)}</b><em>${n} words</em></header>
      <p class="bn">${esc(ex.stance)}</p>
      <div class="ex-clean">${clean}</div>
    </div>
    <h3>কোন বাক্য কী করছে</h3>
    <p class="bn lead">হলুদ collocation। নীল ঘর synonym। নীল দাগ cohesion। বেগুনি দাগ grammar। বাক্যের পেছনের রং মানে সেই বাক্যের কাজ।</p>
    <div class="ex-key">
      <span class="k-para">Paraphrase</span><span class="k-thesis">Thesis</span><span class="k-out">Outline</span><span class="k-p">Point</span><span class="k-e">Explain</span><span class="k-x">Example</span><span class="k-l">Link</span><span class="k-end">Thesis again</span>
      <span class="sw syn">synonym</span><span class="sw lex">lexical</span><span class="sw cc">cohesion</span><span class="sw gr">grammar</span>
    </div>
    ${marked}
    <h3>Prompt analysis</h3>
    <div class="ex-read3">
      <div><b>Main topic</b><span>${esc(ex.topic)}</span></div>
      <div><b>Micro-topic</b><span>${esc(ex.micro)}</span></div>
      <div><b>Instruction</b><span>${esc(ex.task)}</span></div>
    </div>
    <h3>Synonym — prompt-এর শব্দ এখানে কী হয়েছে</h3>
    ${rows(["Prompt", "এই উত্তরে", "আরও বলা যায়"], ex.synonyms)}
    <h3>Lexical resource</h3>
    ${rows(["Phrase", "মানে", "Alternative"], ex.lexis)}
    <h3>Grammar</h3>
    ${rows(["Structure", "এই উত্তরে", "অন্য গঠন"], ex.grammar)}
    <h3>Cohesion</h3>
    ${rows(["যোগ", "কাজ"], ex.cohesion)}
    <h3>অন্য essay-তেও বসবে</h3>
    <p class="bn lead">এই বাক্যের ছাঁচ অন্য টপিকে X আর Y বদলে ব্যবহার করা যায়। হুবহু মুখস্থ করে একই essay বারবার লিখবেন না।</p>
    <ul class="ex-daily">${daily}</ul>
  </article>`;
}

export function task2ExamplesHtml() {
  const id = t2ExampleId();
  const ex = EXAMPLES.find((item) => item.id === id) || EXAMPLES[0];
  const pills = EXAMPLES.map((item) => `<button type="button" class="pill ${item.id === ex.id ? "on" : ""}" data-act="t2ex" data-v="${item.id}">${esc(item.name)}</button>`).join("");
  return `<section class="card t2-examples" id="wr-examples">
    <div class="section-head"><h2>Task 2 examples</h2><span class="more">Band 8+ sample</span></div>
    <p class="bn lead">চার paragraph। এক body-তে এক আইডিয়া, PEEL দিয়ে। Prompt-এর synonym, collocation, আর স্বাভাবিক link।</p>
    <div class="pills ex-pills">${pills}</div>
    ${essayHtml(ex)}
  </section>`;
}
