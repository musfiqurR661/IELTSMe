const express = require("express");
const path = require("path");

const app = express();
const root = path.join(__dirname, "public");

const PAGES = {
  "/": "home",
  "/learn": "learn",
  "/listening-map": "listening-map",
  "/listening": "listening",
  "/map": "map",
  "/words": "words",
  "/speaking": "speaking",
  "/reading": "reading",
  "/writing": "writing",
  "/essays": "essays",
  "/books": "books",
  "/resources": "resources",
  "/mistakes": "mistakes",
  "/notes": "notes"
};

const LEGACY = {
  "/index.html": "/",
  "/learn.html": "/learn",
  "/listening-map.html": "/listening-map",
  "/listening.html": "/listening",
  "/map.html": "/map",
  "/words.html": "/words",
  "/speaking.html": "/speaking",
  "/reading.html": "/reading",
  "/writing.html": "/writing",
  "/essays.html": "/essays",
  "/books.html": "/books",
  "/resources.html": "/resources",
  "/mistakes.html": "/mistakes",
  "/notes.html": "/notes"
};

function layout(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>IELTSMee — Learn · Practice · Improve</title>
  <meta name="description" content="IELTSMee is your IELTS space: vocabulary, map words, speaking, reading, writing, books and resources.">
  <link rel="canonical" href="https://ieltsmee.vercel.app/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="IELTSMee">
  <meta property="og:url" content="https://ieltsmee.vercel.app/">
  <meta property="og:title" content="IELTSMee — Learn · Practice · Improve">
  <meta property="og:description" content="IELTSMee is your IELTS space: vocabulary, map words, speaking, reading, writing, books and resources.">
  <meta property="og:image" content="https://ieltsmee.vercel.app/img/og-home-2.jpg">
  <meta property="og:image:secure_url" content="https://ieltsmee.vercel.app/img/og-home-2.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="IELTSMee home: a study desk by a window looking over London">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="IELTSMee — Learn · Practice · Improve">
  <meta name="twitter:description" content="IELTSMee is your IELTS space: vocabulary, map words, speaking, reading, writing, books and resources.">
  <meta name="twitter:image" content="https://ieltsmee.vercel.app/img/og-home-2.jpg">
  <link rel="icon" href="/img/favicon.svg?v=1" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@500;650&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/site.css?v=54">
</head>
<body data-page="${page}">
  <header class="topbar">
    <button class="nav-toggle" type="button" data-act="nav" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span>
    </button>
    <a class="brand" href="/" aria-label="IELTSMee home">
      <svg class="brand-mark" viewBox="0 0 44 36" aria-hidden="true">
        <path d="M22 8c-3-2.3-8-3-13-2v22c5-1 10 0 13 2.2 3-2.2 8-3.200 13-2.200V6c-5-1-10-.3-13 2z" fill="none" stroke="#1d6df0" stroke-width="2.600" stroke-linejoin="round"/>
        <path d="M22 8v22.200" stroke="#1d6df0" stroke-width="2.600"/>
        <path d="M12 13h6M12 18h6M26 13h6M26 18h6" stroke="#ec315a" stroke-width="2.200" stroke-linecap="round"/>
      </svg>
      <span><b>IELTS<i>Mee</i></b><small>Learn · Practice · Improve</small></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Main">
      <p class="nav-title">Menu</p>
      <a href="/" data-tab="home"><svg class="ic c-ink" viewBox="0 0 24 24"><path d="M4 10.500 12 4l8 6.500V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/></svg>Home</a>
      <a href="/learn" data-tab="learn"><svg class="ic c-violet" viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6"/></svg>Learning</a>
      <a href="/listening" data-tab="listening"><svg class="ic c-blue" viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.500"/><rect x="17" y="14" width="4" height="6" rx="1.500"/></svg>Listening</a>
      <a href="/speaking" data-tab="speaking"><svg class="ic c-red" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></svg>Speaking</a>
      <a href="/reading" data-tab="reading"><svg class="ic c-green" viewBox="0 0 24 24"><path d="M12 6c-2-1.500-5-2-8-1.500V18c3-.5 6 0 8 1.500 2-1.500 5-2 8-1.500V4.500C17 4 14 4.500 12 6z"/><path d="M12 6v13.500"/></svg>Reading</a>
      <a href="/writing" data-tab="writing"><svg class="ic c-orange" viewBox="0 0 24 24"><path d="M4 20l1-4L16.500 4.500a2 2 0 0 1 3 3L8 19z"/><path d="m14.500 6.500 3 3"/></svg>Writing</a>
      <a href="/books" data-tab="books"><svg class="ic c-violet" viewBox="0 0 24 24"><rect x="4" y="4" width="4.500" height="16" rx="1"/><rect x="10" y="4" width="4.500" height="16" rx="1"/><path d="m16.500 6.500 4 1-3.500 12.500-4-1z"/></svg>Books</a>
      <a href="/resources" data-tab="resources"><svg class="ic c-blue" viewBox="0 0 24 24"><path d="M10 14a4.500 4.500 0 0 0 6.400 0l3-3a4.500 4.500 0 0 0-6.400-6.400l-1 1"/><path d="M14 10a4.500 4.500 0 0 0-6.400 0l-3 3a4.500 4.500 0 0 0 6.400 6.400l1-1"/></svg>Resources</a>
      <a href="https://drive.google.com/drive/folders/1sfIYQtkSE0GRn5llJaGnDmsXEPk4-7z9?usp=sharing" target="_blank" rel="noopener"><svg class="ic c-blue" viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 8.800 4.600 4.600 0 0 0 7 18z"/></svg>My Drive</a>
    </nav>
    <div class="actions">
      <button class="icon-btn" type="button" data-act="search" aria-label="Search"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.500"/><path d="m20 20-4-4"/></svg></button>
      <a class="words-btn" href="/words"><svg class="ic fill" viewBox="0 0 24 24"><path d="M12 20s-7.500-4.600-7.500-10A4.300 4.300 0 0 1 12 7.600 4.300 4.300 0 0 1 19.500 10c0 5.400-7.500 10-7.500 10z"/></svg>My Words <em id="words-count"></em></a>
    </div>
  </header>
  <button class="nav-scrim" type="button" data-act="nav-close" aria-label="Close menu" tabindex="-1"></button>

  <main id="app"></main>

  <footer class="foot">
    <span><b>IELTSMee</b> &nbsp;|&nbsp; Learn · Practice · Improve</span>
    <span>Made by <a href="https://musfiq.tech" target="_blank" rel="noopener"><b>MUSFIQ</b></a></span>
  </footer>

  <div class="suggest" id="suggest">
    <p class="suggest-tip" id="suggest-tip" role="tooltip">Have suggestions or need to report an issue? Email me at musfiqurm661@gmail.com</p>
    <form class="suggest-card" id="suggest-form" data-form="suggest" hidden>
      <div class="suggest-head">
        <b>Suggestion or report</b>
        <button type="button" data-act="suggest-close" aria-label="Close">×</button>
      </div>
      <p>Have suggestions or need to report an issue? Email me at musfiqurm661@gmail.com</p>
      <label class="field">Your name<input name="name" required maxlength="80" autocomplete="name" placeholder="Your name"></label>
      <label class="field">Your Email<input name="email" type="email" required maxlength="120" autocomplete="email" placeholder="you@gmail.com"></label>
      <label class="field">Suggestion/Report<textarea name="message" required maxlength="1200" rows="4"></textarea></label>
      <input class="suggest-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn solid block" type="submit">Send</button>
    </form>
    <button class="suggest-btn" type="button" data-act="suggest" aria-expanded="false" aria-controls="suggest-form" aria-describedby="suggest-tip" aria-label="Suggestions or report an issue">
      <img src="/img/musfiq.png" alt="" width="28" height="28">
    </button>
  </div>

  <div id="modal" class="modal" hidden></div>

  <script src="/js/vocab.js?v=3"></script>
  <script src="/js/stickers.js?v=3"></script>
  <script src="/js/data.js?v=1"></script>
  <script type="module" src="/js/app.js?v=35"></script>
</body>
</html>`;
}

app.use("/css", express.static(path.join(root, "css")));
app.use("/js", express.static(path.join(root, "js")));
app.use("/img", express.static(path.join(root, "img")));
app.use("/audio", express.static(path.join(root, "audio")));

app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const q = req.url.slice(req.path.length);
    return res.redirect(301, req.path.slice(0, -1) + q);
  }
  const dest = LEGACY[req.path];
  if (!dest) return next();
  const q = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  res.redirect(301, dest + q);
});

app.get(Object.keys(PAGES), (req, res) => {
  res.type("html").send(layout(PAGES[req.path]));
});

app.use((req, res) => {
  if (req.method === "GET" && req.accepts("html")) return res.redirect("/");
  res.status(404).type("txt").send("Not found");
});

module.exports = app;

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("IELTSMee http://localhost:" + port);
  });
}
