/* Colorful mini-map stickers for the 179 map phrases. */
(function () {
  const FONT = "Outfit,Segoe UI,sans-serif";

  function tx(x, y, t, fill, size) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${size || 11}" font-weight="700" fill="${fill}">${t}</text>`;
  }
  function chip(x, y, w, h, fill, label, lf) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}"/>${label ? tx(x + w / 2, y + h / 2 + 4, label, lf || "#fff", 12) : ""}`;
  }
  function arrow(d, a) {
    const map = {
      up: "M60 68 V22 M60 22 l-7 8 M60 22 l7 8",
      down: "M60 18 V64 M60 64 l-7 -8 M60 64 l7 -8",
      right: "M22 44 H96 M96 44 l-8 -7 M96 44 l-8 7",
      left: "M98 44 H24 M24 44 l8 -7 M24 44 l8 7"
    };
    return `<path d="${map[d]}" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function roadH(y, a, w) {
    return `<rect x="8" y="${y}" width="${w || 104}" height="14" rx="3" fill="${a}" opacity=".85"/><path d="M16 ${y + 7} H104" stroke="#fff" stroke-width="1.6" stroke-dasharray="5 4" opacity=".9"/>`;
  }
  function person(x, y, a) {
    return `<circle cx="${x}" cy="${y}" r="5" fill="${a}"/><path d="M${x} ${y + 6} v10 M${x - 6} ${y + 12} h12" stroke="${a}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  function pos(name, a) {
    const soft = a + "33";
    const ink = "#1c1917";
    switch (name) {
      case "front":
        return chip(34, 10, 34, 22, soft, "B", a) + chip(40, 46, 42, 26, a, "A");
      case "behind":
        return chip(40, 46, 42, 26, soft, "B", a) + chip(46, 12, 34, 22, a, "A");
      case "back":
        return chip(22, 16, 76, 52, soft, "", a) + chip(40, 40, 40, 22, a, "A") + tx(60, 30, "back", a, 10);
      case "left":
        return chip(14, 28, 36, 28, a, "A") + chip(70, 28, 36, 28, soft, "B", a) + tx(60, 18, "L", a, 10);
      case "right":
        return chip(14, 28, 36, 28, soft, "B", a) + chip(70, 28, 36, 28, a, "A");
      case "your-right":
        return person(36, 30, ink) + chip(72, 30, 32, 26, a, "A") + arrow("right", a);
      case "beside":
        return chip(16, 28, 40, 30, a, "A") + chip(64, 28, 40, 30, "#0ea5e9", "B");
      case "next":
        return chip(18, 26, 40, 32, a, "A") + chip(60, 26, 42, 32, "#f59e0b", "B");
      case "by":
        return `<path d="M8 58 Q30 48 60 58 T112 54" fill="none" stroke="#38bdf8" stroke-width="5"/>` + chip(70, 22, 34, 24, a, "A");
      case "near":
        return chip(18, 30, 32, 26, soft, "B", a) + chip(72, 28, 32, 28, a, "A") + `<path d="M50 43 H70" stroke="${a}" stroke-dasharray="2 3"/>`;
      case "nearby":
        return chip(46, 28, 30, 26, a, "A") + `<circle cx="28" cy="24" r="4" fill="${soft}" stroke="${a}"/><circle cx="96" cy="58" r="4" fill="${soft}" stroke="${a}"/>`;
      case "close":
        return chip(22, 28, 34, 28, a, "A") + chip(64, 28, 34, 28, "#fb7185", "B");
      case "proximity":
        return chip(16, 30, 28, 24, a, "A") + chip(46, 30, 28, 24, "#f59e0b", "B") + chip(76, 30, 28, 24, "#38bdf8", "C");
      case "far":
        return chip(10, 30, 28, 24, a, "A") + chip(86, 30, 26, 24, soft, "B", a) + `<path d="M40 42 H82" stroke="${a}" stroke-dasharray="2 4"/>`;
      case "away":
        return chip(8, 32, 24, 20, a, "A") + chip(92, 18, 20, 16, soft, "B", a) + tx(60, 50, "away", a, 10);
      case "opposite":
        return roadH(36, "#64748b") + chip(18, 8, 32, 22, a, "A") + chip(70, 56, 32, 22, "#f59e0b", "B");
      case "direct":
        return roadH(36, "#64748b") + chip(44, 8, 32, 22, a, "A") + chip(44, 56, 32, 22, "#f59e0b", "B") + `<path d="M60 30 V36 M60 50 V56" stroke="${a}" stroke-width="2"/>`;
      case "across":
        return `<path d="M10 44 H110" stroke="#38bdf8" stroke-width="8"/>` + chip(16, 14, 30, 20, a, "A") + chip(74, 54, 30, 20, "#f59e0b", "B");
      case "across-road":
        return roadH(36, "#475569") + chip(16, 10, 36, 20, a, "A") + chip(68, 56, 36, 20, "#f59e0b", "B");
      case "opp-side":
        return roadH(36, "#475569") + chip(22, 10, 28, 18, a, "A") + tx(78, 24, "side 2", a, 9) + chip(22, 56, 28, 18, soft, "B", a);
      case "same":
        return roadH(50, "#475569") + chip(16, 16, 30, 22, a, "A") + chip(70, 16, 30, 22, "#f59e0b", "B");
      case "other":
        return `<path d="M8 42 Q60 30 112 42" fill="none" stroke="#38bdf8" stroke-width="6"/>` + chip(14, 14, 30, 20, a, "A") + chip(76, 52, 30, 20, "#22c55e", "B");
      case "either":
        return roadH(36, "#475569", 104) + chip(18, 10, 26, 18, a, "A") + chip(76, 10, 26, 18, "#f59e0b", "B") + `<circle cx="60" cy="66" r="6" fill="${a}"/>`;
      case "between":
        return chip(8, 28, 28, 28, "#f59e0b", "B") + chip(46, 28, 28, 28, a, "A") + chip(84, 28, 28, 28, "#38bdf8", "C");
      case "middle":
        return `<circle cx="60" cy="44" r="30" fill="${soft}" stroke="${a}" stroke-width="2"/>` + chip(46, 32, 28, 24, a, "A");
      case "above":
        return chip(40, 48, 40, 22, soft, "B", a) + chip(46, 12, 28, 22, a, "A");
      case "below":
        return chip(40, 12, 40, 22, soft, "B", a) + chip(46, 50, 28, 22, a, "A");
      case "top":
        return chip(28, 18, 64, 50, soft, "", a) + chip(42, 24, 36, 18, a, "A") + tx(60, 58, "top", a, 10);
      case "bottom":
        return chip(28, 12, 64, 58, soft, "", a) + chip(40, 46, 40, 16, a, "A");
      case "inside":
        return `<rect x="24" y="14" width="72" height="56" rx="8" fill="none" stroke="${a}" stroke-width="2.4"/>` + chip(42, 32, 36, 24, a, "A");
      case "outside":
        return `<rect x="40" y="22" width="40" height="36" rx="6" fill="${soft}" stroke="${a}"/>` + tx(60, 44, "in", a, 11) + chip(8, 30, 24, 20, a, "A");
      case "corner":
        return `<path d="M20 20 H70 V68" fill="none" stroke="${a}" stroke-width="8" stroke-linejoin="round"/>` + tx(78, 36, "A", a, 13);
      case "on-corner":
        return `<path d="M18 18 H78 V70" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linejoin="round"/>` + chip(62, 22, 28, 22, a, "A");
      case "facing":
        return chip(14, 28, 30, 26, a, "A") + chip(76, 28, 30, 26, "#f59e0b", "B") + `<path d="M46 41 H74 M46 41 l6 -5 M46 41 l6 5 M74 41 l-6 -5 M74 41 l-6 5" fill="none" stroke="${ink}" stroke-width="2"/>`;
      case "surround":
        return chip(46, 32, 28, 22, a, "A") + [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = 28;
          const x = 60 + Math.cos((deg * Math.PI) / 180) * r;
          const y = 43 + Math.sin((deg * Math.PI) / 180) * r * 0.72;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#22c55e"/>`;
        }).join("");
      case "around":
        return chip(46, 30, 28, 24, a, "A") + `<circle cx="60" cy="42" r="32" fill="none" stroke="${a}" stroke-width="2" stroke-dasharray="4 3"/>`;
      case "alongside":
        return `<path d="M12 58 Q40 50 70 58 T112 52" fill="none" stroke="#38bdf8" stroke-width="5"/>` + `<path d="M18 36 H96 M96 36 l-8 -6 M96 36 l-8 6" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round"/>`;
      case "adjoin":
        return chip(22, 26, 36, 32, "#f59e0b", "B") + chip(58, 26, 36, 32, a, "A");
      case "adjacent":
        return chip(18, 28, 38, 30, "#38bdf8", "B") + chip(58, 28, 42, 30, a, "A");
      case "border":
        return `<path d="M10 56 H110" stroke="#38bdf8" stroke-width="6"/>` + chip(36, 18, 48, 28, a, "A");
      case "line":
        return chip(10, 32, 26, 22, "#f59e0b", "B") + chip(42, 32, 26, 22, "#f59e0b", "B") + chip(78, 32, 30, 22, a, "A");
      case "row":
        return [0, 1, 2, 3, 4].map((i) => `<path d="M${12 + i * 20} 50 h14 v16 h-14 z M${12 + i * 20} 50 l7 -10 l7 10" fill="${i === 2 ? a : soft}" stroke="${a}"/>`).join("") + tx(60, 78, "row", a, 9);
      case "cluster":
        return `<circle cx="60" cy="44" r="26" fill="none" stroke="${a}" stroke-dasharray="3 3"/>` + chip(48, 32, 24, 20, a, "A") + `<circle cx="40" cy="30" r="5" fill="#f59e0b"/><circle cx="78" cy="28" r="5" fill="#38bdf8"/><circle cx="36" cy="52" r="5" fill="#22c55e"/>`;
      case "end":
        return roadH(36, "#64748b") + chip(84, 16, 26, 20, a, "A");
      case "far-end":
        return `<path d="M16 44 H92" stroke="${a}" stroke-width="3" stroke-dasharray="5 4"/>` + arrow("right", a) + chip(90, 28, 22, 28, a, "A");
      case "far-side":
        return `<path d="M10 36 Q60 28 110 36" fill="none" stroke="#94a3b8" stroke-width="3"/>` + person(24, 52, ink) + chip(86, 14, 24, 20, a, "A") + `<path d="M30 50 L90 30" stroke="${a}" stroke-dasharray="3 3"/>`;
      case "located":
        return `<path d="M60 18 c10 0 16 8 16 16 c0 12 -16 28 -16 28 s-16 -16 -16 -28 c0 -8 6 -16 16 -16z" fill="${a}"/>` + tx(60, 36, "A", "#fff", 11);
      case "situated":
        return `<circle cx="60" cy="40" r="22" fill="${soft}" stroke="${a}" stroke-width="2"/>` + chip(46, 28, 28, 22, a, "A");
      case "marked":
        return `<rect x="18" y="14" width="84" height="56" rx="6" fill="#fff" stroke="${a}"/>` + `<polygon points="60,24 64,34 74,34 66,40 69,50 60,44 51,50 54,40 46,34 56,34" fill="#f59e0b"/>`;
      case "indicated":
        return `<circle cx="60" cy="42" r="10" fill="#ef4444"/>` + tx(60, 70, "dot", a, 10) + `<path d="M60 18 V28" stroke="${a}" stroke-width="2"/>`;
      case "access":
        return chip(14, 26, 32, 32, soft, "B", a) + chip(74, 26, 32, 28, a, "A") + arrow("right", a);
      case "setback":
        return roadH(58, "#64748b") + chip(42, 16, 36, 26, a, "A") + `<path d="M60 42 V58" stroke="${a}" stroke-dasharray="2 2"/>`;
      case "off":
        return roadH(28, "#64748b") + `<path d="M70 42 V68" stroke="${a}" stroke-width="4"/>` + chip(78, 52, 28, 20, a, "A");
      case "slight":
        return chip(30, 30, 28, 24, soft, "B", a) + chip(66, 22, 28, 24, a, "A") + tx(60, 68, "slight", a, 9);
      default:
        return chip(36, 26, 48, 32, a, "A");
    }
  }

  function move(name, a) {
    const ink = "#334155";
    switch (name) {
      case "straight":
        return arrow("up", a) + tx(86, 30, "go", a, 10);
      case "straight-on":
        return arrow("up", a) + `<circle cx="60" cy="18" r="5" fill="#ef4444"/>`;
      case "continue":
        return arrow("up", a) + `<path d="M48 70 H72" stroke="${ink}" stroke-dasharray="2 2"/>`;
      case "ahead":
        return person(60, 58, ink) + arrow("up", a);
      case "keep":
        return arrow("up", a) + tx(86, 48, "→", a, 16);
      case "ahead-of":
        return chip(78, 16, 28, 22, a, "B") + arrow("up", "#0ea5e9");
      case "left":
        return `<path d="M78 66 V36 H28" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/><path d="M28 36 l8 7 M28 36 l8 -7" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/>`;
      case "right":
        return `<path d="M42 66 V36 H92" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/><path d="M92 36 l-8 7 M92 36 l-8 -7" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/>`;
      case "back":
        return `<path d="M40 20 V48 Q40 66 60 66 Q80 66 80 48 V28" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/><path d="M80 28 l-7 8 M80 28 l7 6" fill="none" stroke="${a}" stroke-width="4"/>`;
      case "first-left":
        return `<path d="M70 70 V18 M70 48 H36" fill="none" stroke="${a}" stroke-width="3.4" stroke-linecap="round"/>` + tx(28, 40, "1st", a, 9) + tx(84, 28, "2nd", ink, 9);
      case "second-right":
        return `<path d="M36 70 V18 M36 30 H78 M36 52 H62" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><path d="M36 30 H78" stroke="${a}" stroke-width="3.4"/>` + tx(86, 26, "2nd", a, 9) + tx(70, 48, "1st", ink, 9);
      case "fork":
        return `<path d="M60 68 V40 L28 16 M60 40 L92 16" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/>`;
      case "rh-fork":
        return `<path d="M60 68 V40 L28 16" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/><path d="M60 40 L92 16" fill="none" stroke="${a}" stroke-width="4.4" stroke-linecap="round"/>`;
      case "follow":
        return `<path d="M20 60 C40 60 40 30 70 28 C90 26 96 20 100 16" fill="none" stroke="${a}" stroke-width="3.5" stroke-linecap="round"/>` + `<circle cx="100" cy="16" r="4" fill="#ef4444"/>`;
      case "past":
        return chip(70, 28, 32, 26, "#f59e0b", "B") + arrow("right", a);
      case "just-past":
        return chip(48, 26, 28, 24, "#f59e0b", "B") + chip(84, 40, 26, 22, a, "A") + arrow("right", a);
      case "through":
        return `<rect x="36" y="18" width="48" height="48" rx="8" fill="none" stroke="${a}" stroke-width="3"/>` + arrow("right", a);
      case "along":
        return `<path d="M12 58 Q40 46 112 50" fill="none" stroke="#38bdf8" stroke-width="5"/>` + `<path d="M20 40 H96" stroke="${a}" stroke-width="3"/>` + person(30, 28, ink);
      case "cross":
        return `<path d="M10 44 H110 M60 16 V72" stroke="${a}" stroke-width="4" stroke-linecap="round"/>`;
      case "over":
        return `<path d="M16 50 H104" stroke="#38bdf8" stroke-width="6"/>` + `<path d="M30 50 Q60 18 90 50" fill="none" stroke="${a}" stroke-width="4"/>`;
      case "across":
        return `<rect x="18" y="22" width="84" height="42" rx="8" fill="${a}22" stroke="${a}"/>` + arrow("right", a);
      case "towards":
        return chip(78, 28, 30, 26, a, "A") + person(28, 48, ink) + `<path d="M36 46 H74" stroke="${a}" stroke-width="2.5" marker-end=""/>` + arrow("right", a);
      case "direction":
        return `<polygon points="60,14 70,44 60,38 50,44" fill="${a}"/><polygon points="108,44 78,34 84,44 78,54" fill="${a}"/>` + tx(60, 70, "dir", a, 10);
      case "way":
        return person(24, 36, ink) + `<path d="M32 48 H100" stroke="${a}" stroke-width="3" stroke-dasharray="4 3"/>` + chip(88, 22, 22, 18, "#f59e0b", "S");
      case "halfway":
        return `<path d="M16 44 H104" stroke="#94a3b8" stroke-width="3"/>` + `<circle cx="60" cy="44" r="8" fill="${a}"/>` + tx(60, 70, "½", a, 12);
      case "begin":
        return `<rect x="16" y="24" width="10" height="36" rx="2" fill="${a}"/>` + arrow("right", a) + tx(28, 18, "start", a, 9);
      case "before":
        return chip(78, 26, 30, 28, "#f59e0b", "B") + person(36, 40, a) + tx(36, 72, "before", a, 9);
      case "little":
        return chip(40, 28, 26, 24, "#f59e0b", "B") + chip(82, 28, 26, 24, a, "A") + tx(66, 68, "a little", a, 9);
      case "beyond":
        return chip(28, 28, 26, 24, "#94a3b8", "B") + chip(80, 26, 28, 26, a, "A") + arrow("right", a);
      case "further":
        return arrow("right", a) + tx(60, 68, "more", a, 10);
      case "bit":
        return arrow("right", a) + tx(60, 24, "a bit", a, 10);
      case "corner":
        return `<path d="M30 66 V34 H90" fill="none" stroke="${a}" stroke-width="4" stroke-linejoin="round"/>` + chip(78, 16, 26, 16, "#f59e0b", "");
      case "just-corner":
        return `<path d="M28 66 V36 H70" fill="none" stroke="${a}" stroke-width="4" stroke-linejoin="round"/>` + chip(74, 22, 28, 22, a, "A");
      case "up":
        return arrow("up", a) + tx(84, 28, "up", a, 11);
      case "down":
        return arrow("down", a) + tx(84, 62, "down", a, 11);
      case "along-road":
        return roadH(36, "#64748b") + `<circle cx="28" cy="28" r="4" fill="#22c55e"/><circle cx="52" cy="24" r="4" fill="#22c55e"/><circle cx="76" cy="28" r="4" fill="#22c55e"/>`;
      case "leads":
        return `<path d="M24 60 H70" stroke="${a}" stroke-width="4"/>` + `<path d="M60 16 c8 0 14 8 14 14 c0 10 -14 24 -14 24 s-14 -14 -14 -24 c0 -6 6 -14 14 -14z" fill="${a}"/>`;
      case "leads-off":
        return roadH(24, "#64748b") + `<path d="M60 38 V68" stroke="${a}" stroke-width="4"/>` + tx(86, 22, "main", "#fff", 8);
      case "runs":
        return `<path d="M12 30 Q40 22 70 30 T112 28" fill="none" stroke="#38bdf8" stroke-width="4"/>` + `<path d="M16 50 H104" stroke="${a}" stroke-width="3"/>` + arrow("right", a);
      case "branch":
        return roadH(28, "#64748b") + `<path d="M48 42 V68" stroke="${a}" stroke-width="4"/>` + tx(90, 24, "main", "#fff", 8);
      case "intersect":
        return `<path d="M16 44 H104 M60 14 V74" stroke="${a}" stroke-width="5" stroke-linecap="round"/>` + `<circle cx="60" cy="44" r="5" fill="#fff"/>`;
      case "parallel":
        return `<path d="M20 30 H100 M20 54 H100" stroke="${a}" stroke-width="4"/>`;
      case "perp":
        return `<path d="M20 58 H100 M60 16 V58" stroke="${a}" stroke-width="4" stroke-linecap="round"/>`;
      case "diagonal":
        return `<rect x="22" y="16" width="76" height="54" rx="4" fill="none" stroke="#94a3b8"/>` + `<path d="M30 62 L90 22" stroke="${a}" stroke-width="4"/>`;
      default:
        return arrow("up", a);
    }
  }

  function road(name, a) {
    switch (name) {
      case "road":
        return roadH(36, a) + `<circle cx="30" cy="62" r="5" fill="#1c1917"/>`;
      case "main":
        return `<rect x="8" y="30" width="104" height="22" rx="3" fill="${a}"/>` + `<path d="M16 41 H104" stroke="#fff" stroke-width="2" stroke-dasharray="7 5"/>`;
      case "side":
        return roadH(22, "#64748b") + `<rect x="52" y="36" width="14" height="40" rx="2" fill="${a}"/>`;
      case "lane":
        return `<rect x="46" y="10" width="18" height="64" rx="3" fill="${a}"/>` + `<circle cx="28" cy="24" r="4" fill="#22c55e"/><circle cx="86" cy="24" r="4" fill="#22c55e"/><circle cx="28" cy="48" r="4" fill="#22c55e"/><circle cx="86" cy="48" r="4" fill="#22c55e"/>`;
      case "path":
        return `<path d="M18 64 C30 40 48 50 60 36 C78 16 90 28 104 14" fill="none" stroke="${a}" stroke-width="3.5" stroke-dasharray="2 5" stroke-linecap="round"/>` + `<circle cx="104" cy="14" r="4" fill="#ef4444"/>`;
      case "foot":
        return roadH(34, "#94a3b8") + `<circle cx="24" cy="24" r="3" fill="${a}"/><circle cx="40" cy="22" r="3" fill="${a}"/><circle cx="56" cy="24" r="3" fill="${a}"/><circle cx="72" cy="22" r="3" fill="${a}"/><circle cx="88" cy="24" r="3" fill="${a}"/>`;
      case "cross":
        return `<path d="M16 42 H104 M60 12 V74" stroke="${a}" stroke-width="8" stroke-linecap="square"/>` + tx(60, 46, "+", "#fff", 14);
      case "junction":
        return `<path d="M60 14 V70 M60 40 H100" stroke="${a}" stroke-width="8" stroke-linecap="square"/>`;
      case "round":
        return `<circle cx="60" cy="44" r="16" fill="none" stroke="${a}" stroke-width="6"/>` + `<path d="M60 8 V22 M60 66 V78 M18 44 H38 M82 44 H104" stroke="${a}" stroke-width="5"/>` + `<circle cx="60" cy="44" r="4" fill="#f59e0b"/>`;
      case "light":
        return `<rect x="50" y="12" width="20" height="46" rx="8" fill="#1c1917"/>` + `<circle cx="60" cy="24" r="4" fill="#ef4444"/><circle cx="60" cy="35" r="4" fill="#f59e0b"/><circle cx="60" cy="46" r="4" fill="#22c55e"/>` + `<rect x="57" y="58" width="6" height="16" fill="#64748b"/>`;
      case "zebra":
        return [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${22 + i * 13}" y="22" width="8" height="42" rx="1" fill="${i % 2 ? a : "#fff"}" stroke="${a}"/>`).join("");
      case "bridge":
        return `<path d="M10 52 H110" stroke="#38bdf8" stroke-width="8"/>` + `<path d="M24 52 Q60 16 96 52" fill="#fff" stroke="${a}" stroke-width="3"/>` + `<path d="M40 52 V34 M60 52 V24 M80 52 V34" stroke="${a}" stroke-width="2"/>`;
      case "under":
        return `<rect x="16" y="16" width="88" height="18" rx="3" fill="#64748b"/>` + tx(60, 29, "road", "#fff", 9) + `<path d="M28 48 H92" stroke="${a}" stroke-width="4"/>` + arrow("right", a);
      case "over":
        return `<path d="M16 58 H104" stroke="#94a3b8" stroke-width="6"/>` + `<path d="M20 40 H100" stroke="${a}" stroke-width="6"/>` + `<path d="M34 40 V58 M86 40 V58" stroke="${a}" stroke-width="4"/>`;
      case "tunnel":
        return `<path d="M30 64 V36 Q30 16 60 16 Q90 16 90 36 V64" fill="${a}" opacity=".25" stroke="${a}" stroke-width="3"/>` + `<path d="M48 64 V40 Q48 32 60 32 Q72 32 72 40 V64" fill="#0f172a"/>`;
      case "corridor":
        return `<path d="M28 16 V68 M92 16 V68" stroke="${a}" stroke-width="4"/>` + arrow("up", a) + `<rect x="16" y="24" width="10" height="14" rx="2" fill="#f59e0b"/><rect x="94" y="40" width="10" height="14" rx="2" fill="#38bdf8"/>`;
      case "entrance":
        return `<rect x="34" y="16" width="52" height="54" rx="4" fill="none" stroke="${a}" stroke-width="3"/>` + `<path d="M52 70 V40 H74" fill="none" stroke="${a}" stroke-width="3"/>` + tx(60, 32, "IN", a, 12);
      case "exit":
        return `<rect x="34" y="16" width="52" height="54" rx="4" fill="${a}"/>` + tx(60, 48, "OUT", "#fff", 13);
      case "closed":
        return roadH(36, "#94a3b8") + `<path d="M48 28 L72 52 M72 28 L48 52" stroke="#ef4444" stroke-width="4"/>`;
      case "dead":
        return `<path d="M20 44 H78" stroke="${a}" stroke-width="6" stroke-linecap="round"/>` + `<path d="M78 28 V60" stroke="#ef4444" stroke-width="4"/>`;
      case "dual":
        return `<rect x="8" y="24" width="104" height="16" rx="2" fill="${a}"/><rect x="8" y="46" width="104" height="16" rx="2" fill="${a}"/>` + `<path d="M8 43 H112" stroke="#f59e0b" stroke-width="3"/>`;
      case "walk":
        return `<rect x="16" y="28" width="88" height="28" rx="14" fill="${a}33" stroke="${a}" stroke-width="2"/>` + person(40, 30, a) + person(78, 30, "#f59e0b");
      case "zig":
        return `<path d="M16 64 L40 40 L58 56 L80 28 L104 44" fill="none" stroke="${a}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
      case "bend":
        return `<path d="M20 64 H60 Q92 64 92 32 V14" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`;
      case "sharp":
        return `<path d="M24 66 V30 H96" fill="none" stroke="${a}" stroke-width="6" stroke-linejoin="miter"/>`;
      case "gentle":
        return `<path d="M12 60 Q60 48 108 28" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`;
      case "slight":
        return `<path d="M16 50 H70 L104 32" fill="none" stroke="${a}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
      case "fork":
        return `<path d="M60 70 V42 L24 16 M60 42 L96 16" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`;
      default:
        return roadH(36, a);
    }
  }

  function compass(name, a) {
    const dirs = {
      N: [60, 16], S: [60, 74], E: [100, 44], W: [20, 44],
      NE: [88, 22], NW: [32, 22], SE: [88, 66], SW: [32, 66]
    };
    const hot = {
      N: ["N"], S: ["S"], E: ["E"], W: ["W"], NE: ["NE"], NW: ["NW"], SE: ["SE"], SW: ["SW"],
      EW: ["E", "W"], NS: ["N", "S"], "N-W": ["N", "W"], "NE-SE": ["NE", "SE"], "NW-SW": ["NW", "SW"],
      "to-NE": ["NE"], "to-SW": ["SW"], "ns-side": ["N", "S"], "ew-side": ["E", "W"],
      "ew-dir": ["E", "W"], "n-to-s": ["N", "S"], head: ["E", "N"], "west-of": ["W"], "se-of": ["SE"], "travel-nw": ["NW"]
    }[name] || ["N"];
    let rose = `<circle cx="60" cy="44" r="28" fill="#fff" stroke="${a}" stroke-width="2"/>`;
    rose += `<path d="M60 20 V68 M36 44 H84 M44 28 L76 60 M76 28 L44 60" stroke="${a}55" stroke-width="1.4"/>`;
    Object.entries(dirs).forEach(([k, [x, y]]) => {
      const on = hot.includes(k);
      rose += `<circle cx="${x}" cy="${y}" r="${on ? 7 : 3.2}" fill="${on ? a : "#cbd5e1"}"/>`;
      if (on && k.length <= 2) rose += tx(x, y + 3, k.length === 1 ? k : "", "#fff", 8);
    });
    if (name === "n-to-s") rose += arrow("down", a);
    if (name === "travel-nw" || name === "head") {
      rose += `<path d="M78 58 L40 28" stroke="${a}" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    return rose;
  }

  function change(name, a) {
    const then = `<rect x="8" y="22" width="40" height="42" rx="6" fill="#fff" stroke="#94a3b8"/>` + tx(28, 16, "then", "#64748b", 8);
    const now = `<rect x="72" y="22" width="40" height="42" rx="6" fill="#fff" stroke="${a}" stroke-width="2"/>` + tx(92, 16, "now", a, 8);
    const mid = `<path d="M50 43 H68 M68 43 l-5 -4 M68 43 l-5 4" fill="none" stroke="${a}" stroke-width="2"/>`;
    const house = (x, fill) => `<path d="M${x} 46 h16 v12 h-16 z M${x} 46 l8 -8 l8 8" fill="${fill}"/>`;
    let inner = "";
    switch (name) {
      case "road":
        inner = `<path d="M16 44 H40" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="2 2"/><path d="M80 44 H104" stroke="${a}" stroke-width="4"/>`;
        break;
      case "build":
        inner = house(20, "#cbd5e1") + house(84, a);
        break;
      case "move":
        inner = house(18, a) + house(86, a);
        break;
      case "clear":
        inner = house(18, "#94a3b8") + `<path d="M84 34 l16 20 M100 34 l-16 20" stroke="#ef4444" stroke-width="3"/>`;
        break;
      case "reno":
        inner = house(18, "#94a3b8") + house(84, "#f59e0b");
        break;
      case "grow":
        inner = `<rect x="22" y="40" width="14" height="14" fill="#94a3b8"/><rect x="82" y="30" width="24" height="26" fill="${a}"/>`;
        break;
      case "shrink":
        inner = `<rect x="16" y="32" width="26" height="24" fill="#94a3b8"/><rect x="86" y="40" width="14" height="14" fill="${a}"/>`;
        break;
      case "convert":
        inner = `<circle cx="22" cy="42" r="6" fill="#94a3b8"/><circle cx="34" cy="50" r="6" fill="#94a3b8"/>` + `<rect x="84" y="34" width="22" height="18" rx="3" fill="${a}"/>`;
        break;
      case "link":
        inner = house(16, a) + house(88, "#f59e0b") + `<path d="M36 48 H84" stroke="${a}" stroke-width="2"/>`;
        break;
      case "split":
        inner = `<rect x="16" y="34" width="24" height="20" fill="#94a3b8"/>` + `<rect x="80" y="34" width="10" height="20" fill="${a}"/><rect x="94" y="34" width="10" height="20" fill="#f59e0b"/>`;
        break;
      case "park":
        inner = `<rect x="16" y="34" width="24" height="18" fill="#cbd5e1"/>` + `<circle cx="86" cy="40" r="5" fill="#22c55e"/><circle cx="98" cy="48" r="5" fill="#22c55e"/><circle cx="90" cy="52" r="4" fill="#16a34a"/>`;
        break;
      case "wide":
        inner = `<path d="M14 44 H42" stroke="#94a3b8" stroke-width="2"/><path d="M78 44 H108" stroke="${a}" stroke-width="7"/>`;
        break;
      case "bridge":
        inner = `<path d="M14 48 H42" stroke="#38bdf8" stroke-width="3"/>` + `<path d="M80 48 Q92 34 104 48" fill="none" stroke="${a}" stroke-width="3"/>`;
        break;
      case "facilities":
        inner = `<rect x="18" y="36" width="20" height="16" fill="#cbd5e1"/>` + tx(92, 40, "WC", a, 10) + `<circle cx="92" cy="52" r="4" fill="#38bdf8"/>`;
        break;
      case "plant":
        inner = `<rect x="16" y="40" width="24" height="12" fill="#e2e8f0"/>` + `<circle cx="84" cy="40" r="6" fill="#22c55e"/><circle cx="98" cy="46" r="6" fill="#16a34a"/><circle cx="90" cy="54" r="5" fill="#4ade80"/>`;
        break;
      case "same":
        inner = house(20, a) + house(84, a) + tx(60, 62, "=", a, 14);
        break;
      case "was":
        inner = house(20, a) + house(84, a);
        break;
      case "north":
        inner = house(20, "#94a3b8") + house(84, a) + tx(96, 32, "N", a, 10);
        break;
      case "occupy":
        inner = `<rect x="14" y="32" width="28" height="24" fill="#d9f99d" stroke="${a}"/>` + tx(28, 48, "farm", a, 8) + `<rect x="80" y="32" width="24" height="24" rx="3" fill="${a}"/>`;
        break;
      case "replace":
        inner = tx(28, 48, "shop", "#64748b", 8) + tx(92, 48, "cafe", a, 9);
        break;
      case "redev":
        inner = house(18, "#94a3b8") + `<rect x="82" y="32" width="8" height="24" fill="${a}"/><rect x="92" y="26" width="8" height="30" fill="#0ea5e9"/><rect x="102" y="36" width="8" height="20" fill="#f59e0b"/>`;
        break;
      case "industry":
        inner = `<rect x="16" y="38" width="24" height="14" fill="#bbf7d0"/>` + `<path d="M80 52 V36 h8 v6 h8 v-10 h8 v20 z" fill="${a}"/>`;
        break;
      case "houses":
        inner = `<rect x="16" y="38" width="24" height="14" fill="#bbf7d0"/>` + house(80, a) + house(96, "#f59e0b");
        break;
      default:
        inner = house(84, a);
    }
    return then + now + mid + inner;
  }

  function link(name, a) {
    switch (name) {
      case "period":
        return `<path d="M16 44 H104" stroke="${a}" stroke-width="3"/>` + `<circle cx="16" cy="44" r="5" fill="#94a3b8"/><circle cx="104" cy="44" r="5" fill="${a}"/>` + tx(60, 28, "start → end", a, 10);
      case "end":
        return `<rect x="70" y="20" width="36" height="44" rx="6" fill="${a}"/>` + tx(88, 46, "end", "#fff", 11) + `<path d="M16 44 H64" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 3"/>`;
      case "vs":
        return chip(10, 26, 40, 32, "#94a3b8", "1990", "#fff") + chip(70, 26, 40, 32, a, "now");
      case "next":
        return chip(12, 28, 28, 26, "#f59e0b", "1") + chip(78, 28, 28, 26, a, "2") + `<path d="M44 41 H74" stroke="${a}" stroke-width="2.4"/>`;
      case "after":
        return `<path d="M18 50 H100" stroke="${a}" stroke-width="3"/>` + `<circle cx="36" cy="50" r="6" fill="#94a3b8"/><circle cx="86" cy="50" r="6" fill="${a}"/>` + tx(60, 28, "then  after", a, 10);
      case "meanwhile":
        return chip(14, 14, 92, 24, a, "A") + chip(14, 48, 92, 24, "#f59e0b", "B");
      case "contrast":
        return `<rect x="10" y="16" width="46" height="52" rx="6" fill="${a}"/>` + `<rect x="64" y="16" width="46" height="52" rx="6" fill="#e2e8f0"/>` + tx(33, 46, "busy", "#fff", 10) + tx(87, 46, "quiet", "#334155", 10);
      default:
        return chip(30, 26, 60, 32, a, "F");
    }
  }

  function render(pic, accent) {
    const [family, name] = String(pic || "pos:front").split(":");
    let body = "";
    if (family === "pos") body = pos(name, accent);
    else if (family === "move") body = move(name, accent);
    else if (family === "road") body = road(name, accent);
    else if (family === "compass") body = compass(name, accent);
    else if (family === "change") body = change(name, accent);
    else if (family === "link") body = link(name, accent);
    else body = chip(36, 26, 48, 32, accent, "A");
    return `<svg class="sticker" viewBox="0 0 120 84" role="img" aria-hidden="true">${body}</svg>`;
  }

  window.MMIStickers = { render };
})();
