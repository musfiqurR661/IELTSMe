/* Four Task 1 prompts: two line graphs, two diagrams, each with a Band 8-style report. */
import { esc, store } from "./core.js?v=5";

const KEY = "mmi-t1-ex";
const KIND = {
  para: "Paraphrase",
  ov: "Overview",
  fig: "Figure",
  cmp: "Compare",
  stage: "Stage"
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
    id: "brighton",
    name: "Brighton attractions",
    group: "line",
    type: "Line graph",
    topic: "Tourism",
    unit: "Percentage of tourists",
    time: "1980–2010, every five years",
    task: "Summarise the main features and compare them",
    figure: "/img/t1/brighton.png",
    alt: "Line graph of the percentage of tourists who visited four Brighton attractions between 1980 and 2010",
    kinds: ["para", "ov", "fig", "cmp"],
    prompt: ["The line graph below shows the percentage of tourists to England who visited four different attractions in Brighton."],
    stance: "বাড়া Pavilion আর Pier এক body-তে। কমতে থাকা Art Gallery আর প্রায় স্থির Festival অন্য body-তে। Overview-তে সংখ্যা নেই।",
    caution: "সংখ্যা চার্ট থেকে আনুমানিক: around, nearly, roughly। প্রশ্নের বাক্যে বছর নেই, বছর আছে অক্ষে, তাই 1980 আর 2010 বসানো বানানো ডেটা নয়। অক্ষ percentage, তাই number of visitors বলা হয়নি।",
    paras: [
      {
        name: "Introduction",
        idea: "প্রশ্নের শব্দ না তুলে কী, কোথায়, কখন। সংখ্যা নেই।",
        sentences: [
          { kind: "para", parts: [
            { t: "The line graph " }, { t: "compares", m: "syn" }, { t: " the " }, { t: "proportion", m: "syn" },
            { t: " of " }, { t: "visitors", m: "syn" }, { t: " to England who " }, { t: "went to", m: "syn" },
            { t: " " }, { t: "four Brighton attractions", m: "syn" }, { t: " between 1980 and 2010." }
          ] }
        ]
      },
      {
        name: "Overview",
        idea: "দুই বাক্য। কে বাড়ল, কে কমল, কে স্থির। Highest-lowest-এর ছবি, কিন্তু কোনো শতাংশ নয়।",
        sentences: [
          { kind: "ov", parts: [
            { t: "Overall", m: "cc" }, { t: ", the Pavilion and the Pier " }, { t: "drew a larger share", m: "lex" },
            { t: " of tourists by the end of the period, " }, { t: "whereas", m: "cc" },
            { t: " the Art Gallery became " }, { t: "far less popular", m: "lex" }, { t: " after an " }, { t: "early peak", m: "lex" }, { t: "." }
          ] },
          { kind: "ov", parts: [
            { t: "The Festival, " }, { t: "by contrast", m: "cc" }, { t: ", stayed " }, { t: "relatively stable", m: "lex" },
            { t: " and remained one of the more visited places." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "যে দুটো বাড়ে। শুরু 1980। Pavilion পরে কিছুটা কমে, তবু শুরুর চেয়ে উপরে, তাই এখানে। Pier-এর ছোট ওঠানামা বাদ।",
        sentences: [
          { kind: "cmp", parts: [
            { t: "In 1980", m: "cc" }, { t: ", " }, { t: "around a quarter", m: "lex" },
            { t: " of these tourists visited the Pavilion, " }, { t: "compared with", m: "cc" },
            { t: " only about 10% for the Pier." }
          ] },
          { kind: "fig", parts: [
            { t: "The Pavilion's " }, { t: "share", m: "syn" }, { t: " then " }, { t: "rose sharply", m: "lex" },
            { t: " and " }, { t: "peaked at", m: "lex" }, { t: " " }, { t: "nearly half", m: "lex" },
            { t: " in 1995, " }, { t: "before dropping", m: "gr" }, { t: " to roughly 30% in 2010." }
          ] },
          { kind: "fig", parts: [
            { t: "Across the same thirty years", m: "cc" }, { t: ", the Pier " }, { t: "rose more gradually", m: "lex" },
            { t: " and finished at just over 20%." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "আর কোনো উপসংহার নেই। Festival প্রায় একই, Art Gallery উল্টো দিকে নেমে শেষে সবচেয়ে নিচে।",
        sentences: [
          { kind: "fig", parts: [
            { t: "The Festival was the " }, { t: "most popular", m: "lex" },
            { t: " attraction at the start, at about 30%, and it " }, { t: "hardly changed", m: "lex" },
            { t: ", " }, { t: "finishing", m: "gr" }, { t: " just under 30%." }
          ] },
          { kind: "cmp", parts: [
            { t: "The Art Gallery moved in the " }, { t: "opposite direction", m: "lex" }, { t: "." }
          ] },
          { kind: "fig", parts: [
            { t: "From just over 20% in 1980 it reached about 38% in 1985, " }, { t: "then", m: "cc" },
            { t: " " }, { t: "fell steadily", m: "lex" }, { t: " to under 10% in 2010, " }, { t: "which left it", m: "gr" },
            { t: " as the " }, { t: "least visited", m: "lex" }, { t: " attraction." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["shows", "compares", "illustrates, depicts, presents"],
      ["percentage", "proportion, share", "the share of, the figure for"],
      ["tourists", "visitors, these tourists", "holidaymakers, people who visited"],
      ["visited", "went to", "attended, went to see"],
      ["four different attractions in Brighton", "four Brighton attractions", "four sites in Brighton, four places visitors went to"]
    ],
    lexis: [
      ["drew a larger share", "আরও বড় অংশ টানল", "accounted for more, took a bigger share"],
      ["far less popular", "অনেক কম জনপ্রিয়", "much less visited, considerably less popular"],
      ["early peak", "শুরুর দিকের চূড়া", "an initial high, a peak near the start"],
      ["relatively stable", "তুলনামূলক স্থির", "fairly steady, largely unchanged"],
      ["around a quarter", "প্রায় এক-চতুর্থাংশ", "about 25%, roughly one in four"],
      ["rose sharply", "দ্রুত বাড়ল", "climbed steeply, increased rapidly"],
      ["peaked at", "চূড়ায় পৌঁছাল", "reached a high of, hit a peak of"],
      ["nearly half", "প্রায় অর্ধেক", "almost 50%, close to half"],
      ["rose more gradually", "আরও আস্তে বাড়ল", "climbed more slowly, increased more steadily"],
      ["most popular", "সবচেয়ে জনপ্রিয়", "the favourite, the most visited"],
      ["hardly changed", "প্রায় বদলায়নি", "stayed almost the same, changed very little"],
      ["opposite direction", "উল্টো দিক", "the reverse pattern, the other way"],
      ["fell steadily", "টানা কমল", "declined continuously, kept falling"],
      ["least visited", "সবচেয়ে কম দেখা", "the least popular, the lowest"]
    ],
    grammar: [
      ["before + -ing", "before dropping to roughly 30%", "and then it dropped to roughly 30%"],
      ["-ing result", "finishing just under 30%", "and it finished just under 30%"],
      ["which + verb", "which left it as the least visited", "and that left it as the least visited"],
      ["Fraction for a percentage", "around a quarter, nearly half", "about 25%, almost 50%"]
    ],
    cohesion: [
      ["Overall / whereas / by contrast", "overview-এ তিন রকম বিপরীত, একই but নয়"],
      ["In 1980", "body প্রথম বছর থেকে"],
      ["compared with", "এক বছরে দুই আকর্ষণ"],
      ["then / before", "এক লাইনের সময়ের ধারা"],
      ["Across the same thirty years", "Pier যেন নতুন গ্রাফ না হয়"],
      ["then / which", "Art Gallery-র পতন আর শেষের অবস্থান"]
    ],
    daily: [
      ["The line graph compares the proportion of X between A and B.", "The line chart illustrates the percentage of X from A to B.", "The graph shows how the share of X changed between A and B."],
      ["Overall, X and Y drew a larger share by the end, whereas Z became far less popular.", "Overall, X and Y rose, while Z declined after an early peak.", "Overall, X finished highest, whereas Z fell to the lowest point."],
      ["X, by contrast, stayed relatively stable.", "X, on the other hand, hardly changed.", "X, meanwhile, remained fairly steady."],
      ["In [first year], around …, compared with only … for Y.", "At the start of the period, X stood at …, while Y was only ….", "X began at …, as against … for Y."],
      ["The figure for X then rose sharply, peaking at …, before dropping to ….", "X then climbed steeply to a peak of … and afterwards fell to ….", "X increased rapidly, reached a high of …, and then declined to …."],
      ["Y rose more gradually and finished at ….", "Y climbed more steadily, ending at ….", "Y saw a slower increase and closed at …."],
      ["X moved in the opposite direction.", "X followed the reverse pattern.", "X did the opposite."]
    ]
  },
  {
    id: "co2",
    name: "CO₂ emissions",
    group: "line",
    type: "Line graph",
    topic: "Environment",
    unit: "Metric tonnes per person",
    time: "1967–2007, every ten years",
    task: "Summarise the main features and compare them",
    figure: "/img/t1/co2.png",
    alt: "Line graph of average carbon dioxide emissions per person in four countries from 1967 to 2007",
    kinds: ["para", "ov", "fig", "cmp"],
    prompt: ["The graph below shows average carbon dioxide (CO₂) emissions per person in four different countries between 1967 and 2007."],
    stance: "বাড়া Italy আর Portugal এক body-তে, 1967 থেকে। Sweden চূড়ার পর কমে, UK আস্তে কমে, তাই অন্য body। Overview-তে টন নেই।",
    caution: "টন চার্ট থেকে আনুমানিক। অক্ষ metric tonnes per person, তাই একক body-তে আছে। চার দেশের নাম লেজেন্ড থেকে।",
    paras: [
      {
        name: "Introduction",
        idea: "প্রশ্নের CO₂ per person নিজের গঠনে। চার দেশের নাম চার্ট থেকে, সংখ্যা নয়।",
        sentences: [
          { kind: "para", parts: [
            { t: "The line graph " }, { t: "compares", m: "syn" }, { t: " the " },
            { t: "amount of carbon dioxide emitted per person", m: "syn" },
            { t: " in " }, { t: "the United Kingdom, Sweden, Italy and Portugal", m: "syn" },
            { t: " between 1967 and 2007." }
          ] }
        ]
      },
      {
        name: "Overview",
        idea: "কে বাড়ল, কে চূড়া থেকে নামল, কে আস্তে কমল। টন এখানে নেই।",
        sentences: [
          { kind: "ov", parts: [
            { t: "Overall", m: "cc" }, { t: ", " }, { t: "emissions", m: "syn" },
            { t: " " }, { t: "rose", m: "lex" }, { t: " in Italy and Portugal, " }, { t: "whereas", m: "cc" },
            { t: " Sweden " }, { t: "fell sharply", m: "lex" }, { t: " after an " }, { t: "early peak", m: "lex" }, { t: "." }
          ] },
          { kind: "ov", parts: [
            { t: "The United Kingdom, " }, { t: "by contrast", m: "cc" }, { t: ", " },
            { t: "remained the highest", m: "lex" }, { t: " throughout and recorded a " },
            { t: "gradual decrease", m: "lex" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "যে দুটো বাড়ে। শুরু 1967। Italy পরে স্থির। Portugal আগে আস্তে, 1987-এর পর জোরে।",
        sentences: [
          { kind: "cmp", parts: [
            { t: "In 1967", m: "cc" }, { t: ", Italy emitted " }, { t: "about 4.5", m: "lex" },
            { t: " metric tonnes per person, " }, { t: "compared with", m: "cc" },
            { t: " only " }, { t: "about 1 tonne", m: "lex" }, { t: " in Portugal." }
          ] },
          { kind: "fig", parts: [
            { t: "Italy's " }, { t: "output", m: "syn" }, { t: " then " }, { t: "climbed", m: "lex" },
            { t: " to roughly 7.5 tonnes by 1997 and " }, { t: "levelled off", m: "lex" }, { t: " until 2007." }
          ] },
          { kind: "fig", parts: [
            { t: "Portugal " }, { t: "rose more slowly", m: "lex" }, { t: " until 1987 and " }, { t: "then", m: "cc" },
            { t: " more steeply, " }, { t: "finishing", m: "gr" }, { t: " at around 5.5 tonnes." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "Sweden চূড়া থেকে নেমে Portugal-এর সমান। UK শুরুতেই সবার উপরে, শেষেও সবার উপরে, কিন্তু কমে।",
        sentences: [
          { kind: "fig", parts: [
            { t: "Sweden stood at about 8.5 tonnes in 1967, " }, { t: "reached a peak of", m: "lex" },
            { t: " just over 10 tonnes in 1977, and " }, { t: "afterwards", m: "cc" },
            { t: " " }, { t: "dropped", m: "lex" }, { t: " to around 5.5 tonnes, " },
            { t: "level with", m: "lex" }, { t: " Portugal." }
          ] },
          { kind: "cmp", parts: [
            { t: "The United Kingdom " }, { t: "started highest", m: "lex" },
            { t: ", at almost 11 tonnes, and " }, { t: "declined gradually", m: "lex" },
            { t: " to just under 9 tonnes in 2007, " }, { t: "when it was still", m: "gr" },
            { t: " the " }, { t: "largest emitter", m: "lex" }, { t: " of the four." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["shows", "compares", "illustrates, depicts"],
      ["average carbon dioxide emissions per person", "the amount of carbon dioxide emitted per person, emissions, output", "per-person CO₂ output, the average each person emitted"],
      ["four different countries", "the United Kingdom, Sweden, Italy and Portugal", "these four countries, the four nations"],
      ["between 1967 and 2007", "between 1967 and 2007, until 2007, in 2007", "from 1967 to 2007, over the forty-year period"]
    ],
    lexis: [
      ["rose", "বাড়ল", "increased, climbed, went up"],
      ["fell sharply", "জোরে নামল", "dropped steeply, declined sharply"],
      ["early peak", "শুরুর দিকের চূড়া", "an initial high, a peak near the start"],
      ["remained the highest", "সবার উপরেই রইল", "stayed above the others, was the highest throughout"],
      ["gradual decrease", "আস্তে আস্তে কমা", "a slow decline, a steady fall"],
      ["about 4.5", "প্রায় ৪.৫", "just over 4, a little above 4"],
      ["about 1 tonne", "প্রায় ১ টন", "roughly one tonne, only around 1"],
      ["climbed", "উপরে উঠল", "rose, increased"],
      ["levelled off", "সমতল হয়ে গেল", "stabilised, stayed flat"],
      ["rose more slowly", "আরও আস্তে বাড়ল", "increased more gradually, climbed more gently"],
      ["reached a peak of", "চূড়ায় পৌঁছাল", "peaked at, hit a high of"],
      ["dropped", "নেমে গেল", "fell, declined"],
      ["level with", "সমানে", "the same as, matching"],
      ["started highest", "শুরুতেই সবচেয়ে উপরে", "began as the highest, was the leader at the start"],
      ["declined gradually", "আস্তে কমল", "fell slowly, decreased steadily"],
      ["largest emitter", "সবচেয়ে বেশি নিঃসরণকারী", "the highest of the four, the greatest producer"]
    ],
    grammar: [
      ["-ing result", "finishing at around 5.5 tonnes", "and it finished at around 5.5 tonnes"],
      ["when + clause", "when it was still the largest emitter", "and at that point it was still the largest emitter"],
      ["and + sequence", "and afterwards dropped / and then more steeply", "before dropping / after which it rose more steeply"]
    ],
    cohesion: [
      ["Overall / whereas / by contrast", "overview-এ তিন রকম বিপরীত"],
      ["In 1967", "বাড়ার body প্রথম বছর থেকে"],
      ["compared with", "একই বছরে Italy আর Portugal"],
      ["then", "Portugal-এর দ্বিতীয় অংশ, 1987-এর পর"],
      ["afterwards", "Sweden-র চূড়ার পরের পতন"],
      ["level with Portugal", "দ্বিতীয় body প্রথম body-র শেষ সংখ্যার সঙ্গে মিলছে"]
    ],
    daily: [
      ["The line graph compares the amount of X per person in A, B, C and D between … and ….", "The graph illustrates per-person X in four countries from … to ….", "The line chart shows how much X each person produced in A, B, C and D over the period."],
      ["Overall, X rose in A and B, whereas C fell sharply after an early peak.", "Overall, A and B increased, while C declined after an initial high.", "Overall, A and B went up, but C dropped steeply once it had peaked."],
      ["D, by contrast, remained the highest and recorded a gradual decrease.", "D, on the other hand, stayed above the others while falling slowly.", "D, meanwhile, was the highest throughout, despite a steady decline."],
      ["In [first year], A stood at …, compared with only … in B.", "At the start, A was …, while B was only ….", "A began at …, as against … for B."],
      ["A's figure then climbed to … and levelled off.", "A then rose to … and stabilised.", "A increased to … and then stayed flat."],
      ["C reached a peak of … and afterwards dropped to …, level with B.", "C peaked at … before falling to …, the same as B.", "After a high of …, C declined to …, matching B."]
    ]
  },
  {
    id: "sugar",
    name: "Sugar from cane",
    group: "diagram",
    type: "Process diagram",
    topic: "Manufacturing",
    unit: "Seven stages",
    time: "No years — the order of the stages",
    task: "Describe every stage, in order, and the equipment",
    figure: "/img/t1/sugar.png",
    alt: "Diagram of the seven stages in manufacturing sugar from sugar cane",
    kinds: ["para", "ov", "stage"],
    prompt: ["The diagram below shows how sugar is manufactured from sugar cane."],
    stance: "Pattern 3 দিয়ে intro। Overview-তে সাত ধাপ, শুরু আর শেষ, যন্ত্রের কথা, ধাপের তালিকা নয়। Body 1-এ চাষ থেকে পরিশোধন। Body 2-তে সিরাপ থেকে শুকনো চিনি। উপসংহার নেই।",
    caution: "ডায়াগ্রামে যা আছে শুধু তাই: ১২–১৮ মাস, মেশিন বা হাত, crush, limestone filter, evaporator-এ heat, centrifuge, drying and cooling। নতুন ধাপ যোগ করা হয়নি।",
    paras: [
      {
        name: "Introduction",
        idea: "shows how … is manufactured না। Pattern 3: the stages involved in + verb-ing।",
        sentences: [
          { kind: "para", parts: [
            { t: "The diagram " }, { t: "illustrates", m: "syn" }, { t: " " },
            { t: "the stages involved in producing", m: "syn" }, { t: " sugar from sugar cane." }
          ] }
        ]
      },
      {
        name: "Overview",
        idea: "কয় ধাপ, কোথা থেকে কোথায়, কী জাতীয় যন্ত্র। একেক ধাপের নাম এখানে সাজানো হয়নি।",
        sentences: [
          { kind: "ov", parts: [
            { t: "Overall", m: "cc" }, { t: ", the " }, { t: "manufacture", m: "syn" },
            { t: " of sugar " }, { t: "consists of seven main stages", m: "lex" },
            { t: ", " }, { t: "beginning with", m: "cc" }, { t: " the cultivation of sugar cane and " },
            { t: "ending when", m: "cc" }, { t: " the crystals are dried and cooled." }
          ] },
          { kind: "ov", parts: [
            { t: "Both", m: "gr" }, { t: " farm machinery, used for the harvest, and " }, { t: "industrial equipment", m: "lex" },
            { t: ", used in the later stages, are needed before the cane becomes the " }, { t: "finished product", m: "lex" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "ধাপ ১–৪। Passive, কারণ কে করছে নাম নেই। সময়ের শব্দ বারবার then নয়।",
        sentences: [
          { kind: "stage", parts: [
            { t: "Sugar cane " }, { t: "is first grown", m: "gr" }, { t: " for between 12 and 18 months, until the plants are ready to be cut." }
          ] },
          { kind: "stage", parts: [
            { t: "It " }, { t: "is then harvested", m: "gr" }, { t: " in the fields, " }, { t: "either by a machine or by hand", m: "gr" }, { t: "." }
          ] },
          { kind: "stage", parts: [
            { t: "The cut canes " }, { t: "are next crushed", m: "gr" }, { t: " so that the juice can be pressed out and " }, { t: "collected", m: "gr" }, { t: "." }
          ] },
          { kind: "stage", parts: [
            { t: "After this", m: "cc" }, { t: ", that juice " }, { t: "is passed through", m: "gr" },
            { t: " a " }, { t: "limestone filter", m: "lex" }, { t: " " }, { t: "so that", m: "gr" }, { t: " it can be purified." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "ধাপ ৫–৭। Centrifuge নিজে কাজটা করে, তাই এই এক বাক্য active। শেষে Finally। নতুন মন্তব্য নেই।",
        sentences: [
          { kind: "stage", parts: [
            { t: "The " }, { t: "purified juice", m: "lex" }, { t: " " }, { t: "is subsequently heated", m: "gr" },
            { t: " in an evaporator, " }, { t: "where the heat turns it", m: "gr" }, { t: " into a thicker syrup." }
          ] },
          { kind: "stage", parts: [
            { t: "A centrifuge " }, { t: "then", m: "cc" }, { t: " separates the " }, { t: "sugar crystals", m: "lex" },
            { t: " from the rest of the syrup." }
          ] },
          { kind: "stage", parts: [
            { t: "Finally", m: "cc" }, { t: ", the crystals " }, { t: "are dried and cooled", m: "gr" },
            { t: " in a container, which leaves sugar as the finished product." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["shows", "illustrates", "depicts, presents"],
      ["how sugar is manufactured", "the stages involved in producing, the manufacture of sugar", "the process of producing sugar, how sugar is produced"],
      ["sugar cane", "the cane, the cut canes", "the crop, the harvested canes"]
    ],
    lexis: [
      ["consists of seven main stages", "সাতটা প্রধান ধাপ", "is made up of seven stages, has seven steps"],
      ["industrial equipment", "কারখানার যন্ত্র", "factory machinery, processing equipment"],
      ["finished product", "চূড়ান্ত পণ্য", "the end product, the final sugar"],
      ["limestone filter", "চুনপাথরের ছাঁকনি", "a filter using limestone"],
      ["purified juice", "পরিশোধিত রস", "the cleaned juice, the filtered juice"],
      ["sugar crystals", "চিনির কেলাস", "the grains of sugar, the solid sugar"]
    ],
    grammar: [
      ["Passive, doer unknown", "is first grown / is then harvested / are next crushed / is collected / is passed through / is subsequently heated / are dried and cooled", "Farmers grow the cane first. Use this only if the diagram names the person."],
      ["Active, machine named", "A centrifuge then separates the crystals", "The crystals are then separated in a centrifuge."],
      ["either … or", "either by a machine or by hand", "by machine as well as by hand"],
      ["so that + purpose", "so that it can be purified", "in order to purify it"],
      ["where + clause", "where the heat turns it into a thicker syrup", "and there the heat turns it into a thicker syrup"],
      ["Both … and", "Both farm machinery and industrial equipment", "Farm machinery as well as industrial equipment"]
    ],
    cohesion: [
      ["Overall / beginning with / ending when", "পুরো প্রক্রিয়ার ফ্রেম, ধাপের তালিকা নয়"],
      ["first / then / next / After this", "Body 1-এ চারটা আলাদা ক্রম"],
      ["that juice / the cut canes", "আগের বাক্যের জিনিস, নতুন নাম নয়"],
      ["subsequently / then / Finally", "Body 2-তে then আবার প্রথমে নয়"],
      ["the finished product", "overview-এর শেষ কথা body-র শেষে ফেরে"]
    ],
    daily: [
      ["The diagram illustrates the stages involved in producing X.", "The diagram illustrates the process of making X.", "The diagram illustrates how X is produced."],
      ["Overall, the manufacture of X consists of N main stages, beginning with … and ending when ….", "Overall, there are N stages, from … to ….", "Overall, X is produced in N stages, starting with … and finishing with …."],
      ["Both A and B are used before X becomes the finished product.", "The process uses both A and B.", "A and B are both required along the way."],
      ["X is first …, and is then ….", "First, X is … . It is then ….", "The process begins when X is …, after which it is …."],
      ["After this, Y is passed through … so that it can be ….", "Y is next passed through … in order to ….", "Following this, Y goes through …, which …."],
      ["Y is subsequently heated, where it ….", "Y is then heated until it ….", "Heat is applied to Y, and it …."],
      ["Finally, … are dried and cooled.", "The last stage is the drying and cooling of ….", "The process finishes when … are dried and cooled."]
    ]
  },
  {
    id: "noodles",
    name: "Instant noodles",
    group: "diagram",
    type: "Process diagram",
    topic: "Manufacturing",
    unit: "Eight stages",
    time: "No years — the order along the line",
    task: "Describe every stage, in order, and the machines",
    figure: "/img/t1/noodles.png",
    alt: "Diagram of the eight stages in manufacturing instant noodles",
    kinds: ["para", "ov", "stage"],
    prompt: ["The diagram shows how instant noodles are manufactured."],
    stance: "Pattern 1 দিয়ে intro। Overview-তে আট ধাপ, সাইলো থেকে সিল করা কাপ, যন্ত্রের লাইন। Body 1-এ ময়দা থেকে স্ট্রিপ। Body 2-তে ডিস্ক, ভাজা, কাপ, লেবেল। উপসংহার নেই।",
    caution: "ডায়াগ্রামে যা আছে শুধু তাই: ট্রাকে ফ্লাওয়ার, দুই সাইলো, mixer-এ water ও oil, rollers, sheets, strips, discs, oil-এ cooking ও drying, vegetables ও spices, cups, labelling ও sealing।",
    paras: [
      {
        name: "Introduction",
        idea: "shows how … are manufactured না। Pattern 1: the process of + verb-ing।",
        sentences: [
          { kind: "para", parts: [
            { t: "The diagram " }, { t: "illustrates", m: "syn" }, { t: " " },
            { t: "the process of manufacturing", m: "syn" }, { t: " instant noodles." }
          ] }
        ]
      },
      {
        name: "Overview",
        idea: "আট ধাপ, শুরু আর শেষ, একটা মেশিনের লাইন। একেক ধাপের নাম এখানে সাজানো হয়নি।",
        sentences: [
          { kind: "ov", parts: [
            { t: "Overall", m: "cc" }, { t: ", instant noodles are " }, { t: "manufactured", m: "syn" },
            { t: " in " }, { t: "eight main stages", m: "lex" }, { t: ", " },
            { t: "beginning with", m: "cc" }, { t: " flour kept in storage silos and " },
            { t: "ending when", m: "cc" }, { t: " the filled cups are labelled and sealed." }
          ] },
          { kind: "ov", parts: [
            { t: "The ingredients " }, { t: "move along", m: "lex" }, { t: " a " },
            { t: "line of machines", m: "lex" }, { t: ", from the mixer through to the sealed cups." }
          ] }
        ]
      },
      {
        name: "Body 1",
        idea: "ধাপ ১–৪। Passive। ক্রম first, then, next।",
        sentences: [
          { kind: "stage", parts: [
            { t: "Flour " }, { t: "is first delivered", m: "gr" }, { t: " by truck and " },
            { t: "stored", m: "gr" }, { t: " in " }, { t: "two silos", m: "lex" }, { t: " at the start of the line." }
          ] },
          { kind: "stage", parts: [
            { t: "It " }, { t: "is then fed", m: "gr" }, { t: " into a mixer, " },
            { t: "where water and oil are added", m: "gr" }, { t: " to form a dough." }
          ] },
          { kind: "stage", parts: [
            { t: "Rollers " }, { t: "next", m: "cc" }, { t: " press that dough into thin " },
            { t: "dough sheets", m: "lex" }, { t: ", and those sheets " }, { t: "are cut", m: "gr" },
            { t: " into narrower " }, { t: "strips", m: "lex" }, { t: "." }
          ] }
        ]
      },
      {
        name: "Body 2",
        idea: "ধাপ ৫–৮। Rollers নাম আছে বলে আগের বাক্যে active। এখানে ডিস্ক থেকে সিল। Finally দিয়ে শেষ।",
        sentences: [
          { kind: "stage", parts: [
            { t: "Those strips " }, { t: "are formed", m: "gr" }, { t: " into round " },
            { t: "discs of noodles", m: "lex" }, { t: " while they are still on the line." }
          ] },
          { kind: "stage", parts: [
            { t: "The discs " }, { t: "are subsequently cooked", m: "gr" }, { t: " in oil and then dried, " },
            { t: "before", m: "cc" }, { t: " " }, { t: "vegetables and spices", m: "lex" },
            { t: " are added and the noodles are placed into individual " }, { t: "cups", m: "lex" }, { t: "." }
          ] },
          { kind: "stage", parts: [
            { t: "Finally", m: "cc" }, { t: ", labels " }, { t: "are fixed", m: "gr" },
            { t: " to the cups, the cups " }, { t: "are sealed", m: "gr" },
            { t: ", and the finished cups continue along a conveyor." }
          ] }
        ]
      }
    ],
    synonyms: [
      ["shows", "illustrates", "depicts, presents"],
      ["how instant noodles are manufactured", "the process of manufacturing, manufactured", "the stages involved in producing instant noodles, how instant noodles are made"],
      ["manufactured", "production, are formed, are cooked", "are made, are produced"]
    ],
    lexis: [
      ["consists of eight stages", "আটটা ধাপ", "is made up of eight steps, has eight stages"],
      ["move along", "লাইন ধরে এগোয়", "pass along, travel along"],
      ["line of machines", "যন্ত্রের সারি", "a production line, a row of machines"],
      ["two silos", "দুই সাইলো", "a pair of storage silos, two storage tanks"],
      ["dough sheets", "ময়দার পাত", "flat sheets of dough, rolled sheets"],
      ["strips", "ফালি", "narrow pieces, ribbons of dough"],
      ["discs of noodles", "নুডলসের চাকতি", "round pieces of noodle, noodle discs"],
      ["vegetables and spices", "সবজি আর মশলা", "the added flavourings, the cup ingredients"],
      ["cups", "কাপ", "the pots, the containers"]
    ],
    grammar: [
      ["Passive, doer unknown", "is first delivered / stored / is then fed / are added / are cut / are formed / are subsequently cooked / are fixed / are sealed", "A worker delivers the flour. Use active only when the diagram names the doer."],
      ["Active, machine named", "Rollers next press the mixture", "The mixture is next pressed by rollers."],
      ["where + passive", "where water and oil are added", "and there water and oil are added"],
      ["which + passive", "and those sheets are cut into narrower strips", "which are cut into narrower strips"],
      ["before + noun phrase", "before vegetables and spices are added", "and after that vegetables and spices are added"]
    ],
    cohesion: [
      ["Overall / beginning with / ending when", "আট ধাপের ফ্রেম, তালিকা নয়"],
      ["first / then / next", "Body 1-এ তিনটা আলাদা ক্রম"],
      ["It / the mixture / Those strips", "আগের বাক্যের জিনিস"],
      ["subsequently / before / Finally", "Body 2-তে then বারবার নয়"],
      ["the filled cups", "overview-এর শেষ কথা body-র শেষ ধাপে ফেরে"]
    ],
    daily: [
      ["The diagram illustrates the process of manufacturing X.", "The diagram illustrates how X is manufactured.", "The diagram illustrates the stages involved in making X."],
      ["Overall, production consists of N stages, beginning with … and ending when ….", "Overall, there are N stages, from … to ….", "Overall, X is made in N stages, starting with … and finishing with …."],
      ["The ingredients move along a line of machines.", "The mixture passes along a production line.", "A row of machines carries the product forward."],
      ["X is first delivered and stored.", "First, X is brought in and kept in ….", "The process begins when X is stored."],
      ["It is then fed into …, where … are added.", "X then goes into …, and … are added there.", "Next, X enters …, at which point … are added."],
      ["A next presses B into …, which are cut into ….", "B is next pressed into … and then cut into ….", "After pressing, B is cut into …."],
      ["Finally, … are labelled and sealed.", "The last stage is the labelling and sealing of ….", "The process finishes when … are labelled and sealed."]
    ]
  }
];

export function t1ExampleId() {
  const id = store.get(KEY, "brighton");
  return EXAMPLES.some((ex) => ex.id === id) ? id : "brighton";
}
export function setT1Example(id) { if (EXAMPLES.some((ex) => ex.id === id)) store.set(KEY, id); }

function rows(headers, data) {
  return `<div class="t2-table cols${headers.length}" role="table"><div class="t2-tr head" role="row">${headers.map((h) => `<span role="columnheader">${esc(h)}</span>`).join("")}</div>${data.map((r) => `<div class="t2-tr" role="row">${r.map((c) => `<span role="cell">${esc(c)}</span>`).join("")}</div>`).join("")}</div>`;
}

function reportHtml(ex) {
  const n = count(ex);
  const clean = ex.paras.map((p) => `<p>${esc(p.sentences.map((s) => plain(s.parts)).join(" "))}</p>`).join("");
  const marked = ex.paras.map((p) => `<div class="ex-block"><header><b>${esc(p.name)}</b><span class="bn">${esc(p.idea)}</span></header>${p.sentences.map((s) => `<p class="sent k-${s.kind}"><i>${KIND[s.kind]}</i><span>${marks(s.parts)}</span></p>`).join("")}</div>`).join("");
  const daily = ex.daily.map((line) => `<li><b>${esc(line[0])}</b><span>${line.slice(1).map((alt) => `<em>${esc(alt)}</em>`).join("")}</span></li>`).join("");
  const key = ex.kinds.map((k) => `<span class="k-${k}">${KIND[k]}</span>`).join("");
  return `<article class="ex-one">
    <div class="ex-paper">
      <b>WRITING TASK 1</b>
      <p>You should spend about 20 minutes on this task.</p>
      <div class="ex-q">${ex.prompt.map((line) => `<p>${esc(line)}</p>`).join("")}${ex.figure ? `<img class="ex-fig" src="${esc(ex.figure)}" alt="${esc(ex.alt)}">` : ""}</div>
      <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
      <p>Write at least 150 words.</p>
    </div>
    <div class="ex-read">
      <header><span>${esc(ex.type)}</span><b>${esc(ex.topic)}</b><em>${n} words</em></header>
      <p class="bn">${esc(ex.stance)}</p>
      <div class="ex-clean">${clean}</div>
      <p class="note">${esc(ex.caution)}</p>
    </div>
    <h3>কোন বাক্য কী করছে</h3>
    <p class="bn lead">হলুদ collocation। নীল ঘর synonym। নীল দাগ cohesion। বেগুনি দাগ grammar। বাক্যের পেছনের রং মানে সেই বাক্যের কাজ।</p>
    <div class="ex-key">
      ${key}
      <span class="sw syn">synonym</span><span class="sw lex">lexical</span><span class="sw cc">cohesion</span><span class="sw gr">grammar</span>
    </div>
    ${marked}
    <h3>প্রশ্ন পড়া</h3>
    <div class="ex-read3">
      <div><b>Topic</b><span>${esc(ex.topic)}</span></div>
      <div><b>Unit</b><span>${esc(ex.unit)}</span></div>
      <div><b>Time or order</b><span>${esc(ex.time)}</span></div>
    </div>
    <p class="bn note">Instruction: ${esc(ex.task)}</p>
    <h3>Synonym — প্রশ্নের শব্দ এখানে কী হয়েছে</h3>
    ${rows(["Prompt", "এই উত্তরে", "আরও বলা যায়"], ex.synonyms)}
    <h3>Lexical resource</h3>
    ${rows(["Phrase", "মানে", "Alternative"], ex.lexis)}
    <h3>Grammar</h3>
    ${rows(["Structure", "এই উত্তরে", "অন্য গঠন"], ex.grammar)}
    <h3>Cohesion</h3>
    ${rows(["যোগ", "কাজ"], ex.cohesion)}
    <h3>অন্য লেখায়ও বসবে</h3>
    <p class="bn lead">X, Y আর বছর বদলে এই ছাঁচ অন্য চার্ট বা process-এ বসবে। একটা উত্তর মুখস্থ করে বারবার লিখবেন না।</p>
    <ul class="ex-daily">${daily}</ul>
  </article>`;
}

const GROUPS = [["line", "Line graph"], ["diagram", "Diagram"]];

export function task1ExamplesHtml() {
  const id = t1ExampleId();
  const ex = EXAMPLES.find((item) => item.id === id) || EXAMPLES[0];
  const groups = GROUPS.map(([group, label]) => {
    const pills = EXAMPLES.filter((item) => item.group === group).map((item) => `<button type="button" class="pill ${item.id === ex.id ? "on" : ""}" data-act="t1ex" data-v="${item.id}">${esc(item.name)}</button>`).join("");
    return `<div class="ex-group"><b>${esc(label)}</b><div class="pills">${pills}</div></div>`;
  }).join("");
  return `<section class="card t2-examples t1-examples" id="wr-t1-examples">
    <div class="section-head"><h2>Task 1 examples</h2><span class="more">Band 8+ sample</span></div>
    <p class="bn lead">চারটা example, দুই দলে। Line graph-এ Brighton আর CO₂। Diagram-এ sugar আর instant noodles। প্রতিটাতে প্রশ্নের ছবি, উত্তর, আর রঙিন বিবরণ। Overview-তে নির্দিষ্ট সংখ্যা নয়। কমপক্ষে ১৫০ words।</p>
    <div class="ex-groups">${groups}</div>
    ${reportHtml(ex)}
  </section>`;
}
