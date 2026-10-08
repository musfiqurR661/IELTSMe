import { store, D, S, ic, ico, esc, ext, hero, crumb, shell } from "../core.js?v=5";

export const mybooks = () => store.get("mmi-mybooks", []);
export const allBooks = () => [...D.books, ...mybooks().map((b, i) => ({ id: "my" + i, t: b.t, cat: "Other", href: b.href, meta: "My link", cover: ["#2f3a8f", "#7a85ee", "My book", b.t.slice(0, 22), "Added by me"], mine: i }))];
function bookCard(b) {
  const marks = store.get("mmi-bookmarks", []); const prog = store.get("mmi-bookprog", {}); const opens = store.get("mmi-opens", {});
  const p = prog[b.id] || 0;
  return `<article class="book"><a class="cover ${b.dark ? "dark" : ""}" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})" href="${esc(b.href)}" target="_blank" rel="noopener" data-open="${b.id}"><small>${esc(b.cover[2])}</small><b>${esc(b.cover[3])}</b><em>${esc(b.cover[4])}</em></a>
    <button type="button" class="mark-btn ${marks.includes(b.id) ? "on" : ""}" data-act="bookmark" data-v="${b.id}" aria-label="Bookmark">${ic("mark")}</button><span class="cat-chip">${esc(b.cat)}</span>
    <h4>${esc(b.t)}</h4><div class="meta"><span>${esc(b.meta)}</span><span>${opens[b.id] ? `Opened ${opens[b.id]}×` : "Not opened"}</span></div>
    <label class="range"><input type="range" min="0" max="100" step="5" value="${p}" data-bookprog="${b.id}" aria-label="My progress"><b id="bp-${b.id}">${p}%</b></label>
    ${b.mine !== undefined ? `<button type="button" class="ghost-btn" data-act="delmybook" data-v="${b.mine}">${ic("trash")}Remove</button>` : ""}</article>`;
}
export function booksGrid() {
  const q = S.bookQ.trim().toLowerCase(); const opens = store.get("mmi-opens", {});
  let list = allBooks().filter((b) => (S.bookCat === "All" || b.cat === S.bookCat) && (!q || b.t.toLowerCase().includes(q)));
  if (S.bookSort === "az") list = list.slice().sort((a, b) => a.t.localeCompare(b.t));
  if (S.bookSort === "opened") list = list.slice().sort((a, b) => (opens[b.id] || 0) - (opens[a.id] || 0));
  return `${list.map(bookCard).join("")}<button type="button" class="book add-book" data-act="addbook"><span class="plus">${ic("plus")}</span><b>Add my own link</b>A book or folder from your Drive</button>`;
}
export function pageBooks() {
  const cats = ["All", "Speaking", "Vocabulary", "Idioms", "Writing", "Other"];
  const marks = store.get("mmi-bookmarks", []); const all = allBooks(); const opens = store.get("mmi-opens", {});
  const opened = Object.values(opens).reduce((a, b) => a + b, 0);
  const recent = all.filter((b) => opens[b.id]).sort((a, b) => opens[b.id] - opens[a.id]).slice(0, 4);
  const stats = [
    ["Books", all.length, "books", "violet"],
    ["Bookmarks", marks.length, "mark", "red"],
    ["Opened", opened, "check", "green"],
    ["Categories", cats.length - 1, "grid", "blue"]
  ].map(([name, n, icon, tone]) => `<div class="pg pg-${tone}"><span class="ico t-${tone}">${ic(icon)}</span><span class="pg-name">${name}</span><b class="pg-num">${n}</b></div>`).join("");
  const main = `
    ${hero({ cls: "books wide", photo: true, crumb: crumb("Books"), title: "Books", icon: "books", tone: "violet", tag: "Your own library", sub: "Every book opens from your Google Drive in a new tab. Nothing is copied to this site.", actions: `<a class="btn solid" href="${esc(D.drive)}" target="_blank" rel="noopener">${ic("cloud")}Open My Drive</a>` })}
    <section class="card home-progress">
      <div class="section-head"><h2>${ic("books")}Your books</h2><span class="more">${all.length} on this page</span></div>
      <div class="pg-row">${stats}</div>
    </section>
    <section class="card">
      <div class="section-head"><h2>${ic("search")}Find a book</h2></div>
      <div class="book-tools"><div class="pills">${cats.map((c) => `<button type="button" class="pill ${S.bookCat === c ? "on" : ""}" data-act="bookcat" data-v="${c}">${c}</button>`).join("")}</div>
        <label class="search">${ic("search")}<input id="book-q" type="search" placeholder="Search books" value="${esc(S.bookQ)}" autocomplete="off"></label>
        <select data-act-change="booksort" aria-label="Sort"><option value="default" ${S.bookSort === "default" ? "selected" : ""}>Default order</option><option value="az" ${S.bookSort === "az" ? "selected" : ""}>A to Z</option><option value="opened" ${S.bookSort === "opened" ? "selected" : ""}>Most opened</option></select>
        <div class="view-toggle"><button type="button" class="${S.bookView === "grid" ? "on" : ""}" data-act="bookview" data-v="grid" aria-label="Grid">${ic("grid")}</button><button type="button" class="${S.bookView === "list" ? "on" : ""}" data-act="bookview" data-v="list" aria-label="List">${ic("list")}</button></div></div>
      <div id="book-grid" class="book-grid ${S.bookView}">${booksGrid()}</div>
    </section>
    <div class="two"><section class="card book-recent"><h3>${ic("clock")}Recently opened</h3>${recent.length ? recent.map((b) => `<div class="recent-row"><span class="sw" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})"></span><span><b>${esc(b.t)}</b><small>Opened ${opens[b.id]}×</small></span></div>`).join("") : `<div class="empty" style="padding:14px">Open a book and it appears here.</div>`}</section>
      <section class="card book-marks"><h3>${ic("mark")}Bookmarked</h3>${marks.length ? marks.map((id) => all.find((b) => b.id === id)).filter(Boolean).map((b) => `<div class="recent-row"><span class="sw" style="background:linear-gradient(150deg,${b.cover[0]},${b.cover[1]})"></span><span><b>${esc(b.t)}</b><small>${esc(b.cat)}</small></span></div>`).join("") : `<div class="empty" style="padding:14px">Tap the bookmark on a book.</div>`}</section></div>
    <section class="card"><h3>${ic("globe")}More reading material</h3><div class="ext-strip">
      ${ext(D.liz.listening, `${ico("head", "blue")}Liz Listening`, 'class="g-blue"')}${ext(D.liz.speaking, `${ico("mic", "red")}Liz Speaking`, 'class="g-red"')}${ext(D.liz.reading, `${ico("book", "green")}Liz Reading`, 'class="g-green"')}${ext(D.liz.w1, `${ico("chart", "violet")}Liz Task 1`, 'class="g-violet"')}${ext(D.liz.w2, `${ico("pen", "orange")}Liz Task 2`, 'class="g-orange"')}${ext(D.jump, `${ico("target", "teal")}Jumpinto`, 'class="g-teal"')}</div></section>`;
  return shell("l-main", "", main);
}
