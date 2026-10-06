/* Content for Me & IELTS. Links are Musfiq's own Drive files and the IELTSLiz / Jumpinto pages. */
window.MMI_DATA = (() => {
  const pdf = {
    vocab: "https://drive.google.com/file/d/1EsZnTSqz3qitDNMUso_JkwRHtzheoWg9/view?usp=sharing",
    makkar: "https://drive.google.com/file/d/1-k2lfXSR-m0KMLzwXDGfpy19iFHX5Goo/view?usp=sharing",
    recent: "https://drive.google.com/file/d/1A4T9CniAWTSsfCPNONGLca_tBYtG1j7z/view?usp=sharing",
    idioms: "https://drive.google.com/file/d/1Q70UScsgI45r3a2djLqvNC_yXaEphq1N/view?usp=sharing"
  };
  const liz = {
    home: "https://ieltsliz.com/",
    listening: "https://ieltsliz.com/ielts-listening/",
    reading: "https://ieltsliz.com/ielts-reading-lessons-information-and-tips/",
    w1: "https://ieltsliz.com/ielts-writing-task-1-lessons-and-tips/",
    w2: "https://ieltsliz.com/ielts-writing-task-2/",
    speaking: "https://ieltsliz.com/ielts-speaking-free-lessons-essential-tips/"
  };
  const drive = "https://drive.google.com/drive/folders/1sfIYQtkSE0GRn5llJaGnDmsXEPk4-7z9?usp=sharing";
  const jump = "https://www.jumpinto.com/ielts/practice";

  const topics = [
    ["📅", "Days of the Week", 7, "Basic"], ["🗓️", "Months of the Year", 12, "Basic"], ["📷", "Hobbies", 28, "Basic"],
    ["📚", "Subjects", 32, "Academic"], ["📣", "Marketing", 26, "Academic"], ["🏫", "Studying at College/University", 45, "Academic"],
    ["💼", "Works and Jobs", 38, "People"], ["❤️", "Health", 42, "People"], ["🏔️", "Nature", 48, "Places"],
    ["🌍", "The Environment", 36, "Places"], ["🌎", "Continents", 24, "Places"], ["🗺️", "Countries", 46, "Places"],
    ["🗣️", "Languages", 28, "People"], ["🏛️", "Architecture and Buildings", 40, "Places"], ["🏠", "Homes", 32, "Daily Life"],
    ["🌆", "In the City", 38, "Places"], ["🚌", "Transportations", 52, "Daily Life"], ["💻", "Workplaces", 30, "Daily Life"],
    ["📍", "Places", 42, "Places"], ["💰", "Money Matters", 30, "Daily Life"], ["⭐", "Rating and Qualities", 28, "People"],
    ["✈️", "Touring", 26, "Places"], ["⚽", "Sports", 35, "Daily Life"], ["🌦️", "Weather", 24, "Daily Life"]
  ];

  const cueCards = [
    { title: "Describe a book you enjoyed reading and that made you happy.", say: ["what the book was", "when you read it", "what it was about", "why you enjoyed it"], ideas: ["Open with the title and the author in one short sentence.", "Place it in time: where you were and what was going on.", "Give two details about the story, then one feeling it left you with."] },
    { title: "Describe a place you visited that you would like to go back to.", say: ["where it was", "when you went there", "what you did there", "why you would like to return"], ideas: ["Name the place, then one thing you can still picture.", "Tell one small moment as a short story.", "Finish with what you would do differently next time."] },
    { title: "Describe a person who has helped you in your studies.", say: ["who the person is", "how you know them", "how they helped you", "how you felt about it"], ideas: ["Start with how you met.", "Pick one example of the help and describe it.", "Close with what you learned from them."] },
    { title: "Describe a useful app or website you use often.", say: ["what it is", "when you started using it", "what you use it for", "why it is useful to you"], ideas: ["Say what it does in one line.", "Give a real example of the last time you used it.", "Add one small weakness to sound natural."] },
    { title: "Describe a time when you were very busy.", say: ["when it was", "what you were doing", "why you were so busy", "how you felt afterwards"], ideas: ["Set the scene with the dates or the season.", "List two or three tasks with a time marker for each.", "End with the relief or the lesson."] },
    { title: "Describe a meal that you enjoyed with your family.", say: ["what the meal was", "who cooked it", "who you ate it with", "why it was memorable"], ideas: ["Describe the food with colour, smell and taste.", "Mention who was at the table.", "Link the memory to a feeling."] },
    { title: "Describe something you want to learn in the future.", say: ["what it is", "why you want to learn it", "how you would learn it", "how it would help you"], ideas: ["Say what and why in two sentences.", "Explain your plan in steps.", "Describe the benefit in your daily life."] },
    { title: "Describe an event that made you feel proud.", say: ["what the event was", "when and where it happened", "who was there", "why you felt proud"], ideas: ["Open with the result, then go back to how it started.", "Include one thing you did well.", "Say how others reacted."] }
  ];

  const spTopics = {
    Travel: { e: "✈️", p1: ["Do you like travelling?", "What was the last place you visited?", "Do you prefer to travel alone or with others?"], p3: ["How has tourism changed in your country?", "Can travel change the way people think?"] },
    Education: { e: "🎓", p1: ["What do you study?", "Why did you choose that subject?", "Do you prefer studying alone or in a group?"], p3: ["What makes a good teacher?", "Should universities teach practical skills more?"] },
    Home: { e: "🏠", p1: ["Do you live in a house or a flat?", "What is your favourite room?", "Would you like to move to a new home?"], p3: ["Why do people in cities live in flats?", "How might homes change in the future?"] },
    Work: { e: "💼", p1: ["What do you do for work?", "What do you like about your job?", "Would you like to change your job?"], p3: ["What makes a job satisfying?", "Will robots take over many jobs?"] },
    Environment: { e: "🌳", p1: ["Is your area green?", "Do you recycle at home?", "What can people do to protect nature?"], p3: ["Who should take responsibility for pollution?", "Can individuals really help the environment?"] },
    Lifestyle: { e: "❤️", p1: ["What do you do to relax?", "Do you have a daily routine?", "Do you eat healthy food?"], p3: ["How has lifestyle changed over the last 20 years?", "Why do some people find it hard to stay healthy?"] },
    Technology: { e: "💻", p1: ["How often do you use your phone?", "What technology do you use for study?", "Is there an app you cannot live without?"], p3: ["Has technology made people lonelier?", "What technology will be common in ten years?"] },
    People: { e: "👥", p1: ["Do you spend more time with friends or family?", "What kind of people do you like?", "Who do you admire?"], p3: ["Why do some people find it hard to make friends?", "How do relationships change as people grow older?"] }
  };

  const task1 = [
    { id: "line", e: "📈", name: "Line Graph", cat: "Graphs", tip: "Describe the trend of each line, then compare the highest and lowest points.", steps: ["Paraphrase the title and the time frame.", "Overview: one sentence on the main trends.", "Body 1: the line that changes most.", "Body 2: the other lines, with one comparison."] },
    { id: "bar", e: "📊", name: "Bar Chart", cat: "Graphs", tip: "Pick the highest, the lowest, and one comparison. Do not list every number.", steps: ["Paraphrase what the bars measure.", "Overview: the biggest and smallest groups.", "Body 1: the highest values with numbers.", "Body 2: the lowest values and one contrast."] },
    { id: "pie", e: "🥧", name: "Pie Chart", cat: "Charts", tip: "Rank the slices. Use fractions and percentages for the largest and smallest.", steps: ["Paraphrase the topic and the date.", "Overview: the largest and smallest share.", "Body 1: the top two slices.", "Body 2: the smaller slices grouped together."] },
    { id: "table", e: "🗂️", name: "Table", cat: "Charts", tip: "Group rows by pattern. Compare across rows, not cell by cell.", steps: ["Paraphrase the table title.", "Overview: the clearest pattern.", "Body 1: the highest and the lowest.", "Body 2: the middle group and exceptions."] },
    { id: "map", e: "🗺️", name: "Map", cat: "Maps", tip: "Paraphrase the two years, give one overview of the biggest change, then location details.", steps: ["Paraphrase the two years.", "Overview: what stayed and what changed most.", "Body 1: changes in the north and centre.", "Body 2: changes in the south, with position words."] },
    { id: "process", e: "⚙️", name: "Process", cat: "Processes", tip: "Sequence the stages. Use passive voice when the doer is unknown.", steps: ["Paraphrase what the process shows.", "Overview: number of stages and the start and end.", "Body 1: stages one to three with sequencers.", "Body 2: the remaining stages."] }
  ];
  const task2 = [
    { id: "opinion", e: "💬", name: "Opinion Essay", cat: "Opinion", tip: "Say how far you agree, then two reasons with an example each.", steps: ["Introduction: paraphrase and state your view.", "Body 1: reason one with an example.", "Body 2: reason two with an example.", "Conclusion: restate your view."] },
    { id: "discussion", e: "👥", name: "Discussion Essay", cat: "Discussion", tip: "Explain both sides, then say which one you find stronger.", steps: ["Introduction: both views and your view.", "Body 1: the first view with support.", "Body 2: the second view with support.", "Conclusion: your final position."] },
    { id: "adv", e: "⚖️", name: "Advantages & Disadvantages", cat: "Adv & Disadv", tip: "Give two advantages and two disadvantages, then say which side is heavier.", steps: ["Introduction: the trend and the plan.", "Body 1: two advantages.", "Body 2: two disadvantages.", "Conclusion: which side outweighs."] },
    { id: "problem", e: "💡", name: "Problem & Solution", cat: "Problem/Solution", tip: "Two problems, two solutions, and a short position in the end.", steps: ["Introduction: the problem in your words.", "Body 1: causes or problems.", "Body 2: solutions that match each problem.", "Conclusion: the main solution."] },
    { id: "twopart", e: "❓", name: "Two-Part Question", cat: "Problem/Solution", tip: "Answer each question in its own paragraph.", steps: ["Introduction: introduce the topic.", "Body 1: answer question one.", "Body 2: answer question two.", "Conclusion: link both answers."] },
    { id: "agree", e: "🤝", name: "Agree / Disagree", cat: "Opinion", tip: "Choose one side clearly and keep it from the first paragraph to the last.", steps: ["Introduction: state agree or disagree.", "Body 1: strongest reason.", "Body 2: second reason and a counter-point.", "Conclusion: restate your side."] }
  ];

  const ideas = {
    Technology: ["Technology saves time on tasks such as banking and shopping.", "Heavy screen use can reduce face-to-face contact.", "Online learning reaches students in remote areas."],
    Education: ["Practical lessons prepare students for work.", "Free access to books lets more families study.", "Group projects build teamwork and communication."],
    Environment: ["Public transport lowers emissions in cities.", "Recycling schemes reduce waste in landfill.", "Laws can make companies reduce packaging."],
    Health: ["Regular exercise lowers the risk of heart disease.", "Cheap fast food contributes to obesity.", "Free check-ups help doctors find illness early."],
    Work: ["Flexible hours help people balance family and work.", "Remote work removes commuting costs.", "Training keeps employees useful as jobs change."],
    Transport: ["Cycling lanes make short trips safer and cleaner.", "Cheap tickets move people from cars to buses.", "Better roads cut travel time for deliveries."]
  };

  const readingTypes = [
    { id: "mc", e: "🔴", name: "Multiple Choice", tip: "Eliminate choices that add an idea the passage never made." },
    { id: "tfng", e: "🔵", name: "True / False / Not Given", tip: "False contradicts the text. Not Given is simply missing." },
    { id: "mh", e: "🟢", name: "Matching Headings", tip: "Skim the first and last line of each paragraph before you read the headings." },
    { id: "sc", e: "🟣", name: "Sentence Completion", tip: "Predict the grammar of the gap, then search for the matching phrase." },
    { id: "sum", e: "🟠", name: "Summary Completion", tip: "Read the summary first. It follows the order of the passage." },
    { id: "mi", e: "🩷", name: "Matching Information", tip: "Scan for names, dates and unusual words. One paragraph can match more than one item." }
  ];
  const passageTypes = [
    ["🌿", "Nature & Environment", "#e1f6e4"], ["🏙️", "Society & Culture", "#e3ecff"], ["🧠", "Technology", "#e7e0ff"],
    ["🏛️", "History & Archaeology", "#ffeede"], ["🩺", "Health & Medicine", "#dff4f6"], ["📚", "Education", "#fdebd8"]
  ];
  const readingStrategies = [
    "Spend about 20 minutes on each passage. Move on if a question stops you for more than a minute.",
    "Read the title and the first lines of each paragraph first. Build a map of the passage.",
    "Underline names, numbers and dates in the question before you search.",
    "Answers follow the order of the passage for most question types. Matching headings is the exception.",
    "Write the answer exactly as it appears in the text. Check the word limit."
  ];
  const tips = {
    speaking: ["Answer naturally, don't memorize.", "Use a range of vocabulary.", "Give real examples from your life.", "Keep speaking for the full time.", "Practice regularly and record yourself."],
    map: ["Look at the compass first.", "Identify key landmarks.", "Use position words (in front of, behind, next to).", "Check road shapes and directions.", "Practice describing the map aloud."]
  };

  const checklists = {
    home: [["h-words", "listening", "Learn 5 new vocabulary words"], ["h-map", "listening", "Practice 1 map (listening)"], ["h-speak", "speaking", "Answer 3 speaking questions"], ["h-read", "reading", "Read 1 short passage"], ["h-write", "writing", "Write 1 Task 2 introduction"]],
    listening: [["l1", "listening", "Learn 10 new words"], ["l2", "listening", "Practice 1 map"], ["l3", "listening", "Do 1 practice test"], ["l4", "listening", "Review mistakes"], ["l5", "listening", "Listen to a real conversation"]],
    speaking: [["s1", "speaking", "Answer 3 Part 1 questions"], ["s2", "speaking", "Record 1 cue card answer"], ["s3", "speaking", "Learn 3 idioms"], ["s4", "speaking", "Review mistakes"], ["s5", "speaking", "Read 1 recent speaking topic"]],
    reading: [["r1", "reading", "Learn 10 new vocabulary words"], ["r2", "reading", "Read 1 short passage"], ["r3", "reading", "Practice 1 question type"], ["r4", "reading", "Review mistakes"], ["r5", "reading", "Summarize a paragraph"]],
    writing: [["w1", "writing", "Read 1 model answer"], ["w2", "writing", "Practice 1 Task 1 question"], ["w3", "writing", "Write 1 Task 2 introduction"], ["w4", "writing", "Learn 5 useful words"], ["w5", "writing", "Review and correct mistakes"]]
  };

  const books = [
    { id: "makkar", t: "Makkar Speaking (Sep–Dec 2026)", cat: "Speaking", href: pdf.makkar, meta: "PDF · Google Drive", cover: ["#8c122d", "#ed4966", "Kiran Makkar", "IELTS SPEAKING", "Sep–Dec 2026"] },
    { id: "recent", t: "Recent Speaking Cue Cards", cat: "Speaking", href: pdf.recent, meta: "PDF · Google Drive", cover: ["#17346b", "#3e78e8", "Recent", "IELTS Speaking", "Cue Cards"] },
    { id: "vocab", t: "1200 Vocabulary Word List", cat: "Vocabulary", href: pdf.vocab, meta: "PDF · Google Drive", cover: ["#075a45", "#31ae82", "1200", "IELTS", "Vocabulary"] },
    { id: "idioms", t: "Idioms & Phrases for IELTS", cat: "Idioms", href: pdf.idioms, meta: "PDF · Google Drive", cover: ["#eea65c", "#fff0d9", "IDIOMS", "and Phrases", "for IELTS"], dark: true },
    { id: "reading", t: "IELTS Reading (Notes & Practice)", cat: "Other", href: liz.reading, meta: "Lessons · IELTSLiz", cover: ["#0b6b4c", "#52c08f", "IELTS", "READING", "Strategies & Practice"] },
    { id: "writing", t: "IELTS Writing (Tasks 1 & 2)", cat: "Writing", href: liz.w2, meta: "Lessons · IELTSLiz", cover: ["#9a1d3f", "#f06a7d", "IELTS", "WRITING", "Task 1 & Task 2"] },
    { id: "drive", t: "My Drive Materials", cat: "Other", href: drive, meta: "Folder · Google Drive", cover: ["#4a3af0", "#a79bff", "My IELTS", "Materials", "Google Drive"] }
  ];

  return { pdf, liz, drive, jump, topics, cueCards, spTopics, task1, task2, ideas, readingTypes, passageTypes, readingStrategies, tips, checklists, books };
})();
