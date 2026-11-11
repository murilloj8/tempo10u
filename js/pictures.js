/* Pictures for the Rules and Fundamentals study cards.
   Everything is drawn with simple SVG shapes: a mini court, player dots,
   clocks, a hoop, and cartoon players in Tempo colors. */
(function () {
  const B = "#6B1E3A", BL = "#9CC3E6", BD = "#3E7DB5", FLOOR = "#D9A86C", W = "#FFFFFF",
    OPP = "#8A8F98", RED = "#B3261E", GOOD = "#2E7D4F", INK = "#22161C", SKIN = "#E9B98F", ORANGE = "#E8833A", GOLD = "#E0A526";

  const defs = `<defs>
    <marker id="pa-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${INK}"/></marker>
    <marker id="pa-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${B}"/></marker>
    <marker id="pa-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${BD}"/></marker>
    <marker id="pa-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${RED}"/></marker>
    <marker id="pa-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${W}"/></marker>
  </defs>`;
  const svg = (c, vb = "0 0 240 240") => `<svg viewBox="${vb}" role="img" xmlns="http://www.w3.org/2000/svg">${defs}${c}</svg>`;

  /* ---------- small helpers ---------- */
  const t = (x, y, s, size = 12, fill = INK, weight = 800, anchor = "middle") =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${s}</text>`;
  const big = (x, y, s, size = 30, fill = B) =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-style="italic" font-size="${size}" fill="${fill}">${s}</text>`;
  const arrow = (d, color = "b", w = 3, dash = "") => {
    const c = { ink: INK, b: B, blue: BD, red: RED, w: W }[color];
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#pa-${color})"/>`;
  };
  const dot = (x, y, team = "T", label = "") =>
    `<circle cx="${x}" cy="${y}" r="9" fill="${team === "T" ? B : OPP}" stroke="${W}" stroke-width="2"/>` +
    (label ? `<text x="${x}" y="${y + 4}" text-anchor="middle" font-family="system-ui,Arial" font-size="10" font-weight="800" fill="${W}">${label}</text>` : "");
  const ball = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ORANGE}" stroke="${INK}" stroke-width="1.2"/><path d="M${x - r} ${y}h${2 * r}M${x} ${y - r}v${2 * r}" stroke="${INK}" stroke-width=".9"/>`;
  const xMark = (x, y, s = 12) => `<g stroke="${RED}" stroke-width="5" stroke-linecap="round"><line x1="${x - s}" y1="${y - s}" x2="${x + s}" y2="${y + s}"/><line x1="${x + s}" y1="${y - s}" x2="${x - s}" y2="${y + s}"/></g>`;
  const check = (x, y, s = 12) => `<path d="M${x - s} ${y} L${x - s / 3} ${y + s * .7} L${x + s} ${y - s * .7}" fill="none" stroke="${GOOD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pill = (x, y, s, fill = B, color = W, size = 11) => {
    const w = s.length * size * .62 + 14;
    return `<rect x="${x - w / 2}" y="${y - size}" width="${w}" height="${size * 1.7}" rx="${size * .85}" fill="${fill}"/>` + t(x, y + size * .35, s, size, color);
  };
  const clock = (cx, cy, r, label, sub) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${W}" stroke="${B}" stroke-width="4"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * .62}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${cx + r * .45}" y2="${cy}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="${cx}" cy="${cy}" r="3" fill="${B}"/>` +
    (label ? t(cx, cy + r + 16, label, 13, B) : "") + (sub ? t(cx, cy + r + 30, sub, 10, "#6E5F66", 600) : "");

  /* Top-down half court, basket at the top. */
  function halfCourt(opts = {}) {
    const paint = opts.paintHi ? BL : B;
    return `<rect x="10" y="12" width="220" height="214" rx="6" fill="${FLOOR}"/>
      <rect x="93" y="12" width="54" height="84" fill="${paint}" opacity=".9" stroke="${W}" stroke-width="2"/>
      <path d="M94 96 A26 26 0 0 0 146 96" fill="none" stroke="${W}" stroke-width="2"/>
      <path d="M94 96 A26 26 0 0 1 146 96" fill="none" stroke="${W}" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M33 12 L33 35 A87 87 0 0 0 207 35 L207 12" fill="none" stroke="${opts.arcHi ? BL : W}" stroke-width="${opts.arcHi ? 5 : 2}"/>
      <rect x="88" y="40" width="5" height="5" fill="${W}"/><rect x="147" y="40" width="5" height="5" fill="${W}"/>
      <line x1="107" y1="20" x2="133" y2="20" stroke="${W}" stroke-width="3"/>
      <circle cx="120" cy="27" r="4.5" fill="none" stroke="${ORANGE}" stroke-width="2.2"/>
      <line x1="10" y1="226" x2="230" y2="226" stroke="${W}" stroke-width="3"/>
      <path d="M94 226 A26 26 0 0 1 146 226" fill="none" stroke="${W}" stroke-width="2"/>
      <rect x="10" y="12" width="220" height="214" rx="6" fill="none" stroke="${W}" stroke-width="3"/>`;
  }
  /* Side-to-side full court for backcourt / press pictures. */
  function fullCourt() {
    return `<rect x="8" y="58" width="224" height="124" rx="6" fill="${FLOOR}"/>
      <rect x="8" y="96" width="40" height="48" fill="${B}" opacity=".9" stroke="${W}" stroke-width="2"/>
      <rect x="192" y="96" width="40" height="48" fill="${B}" opacity=".9" stroke="${W}" stroke-width="2"/>
      <line x1="120" y1="58" x2="120" y2="182" stroke="${W}" stroke-width="3"/>
      <circle cx="120" cy="120" r="16" fill="none" stroke="${W}" stroke-width="2"/>
      <path d="M8 66 L18 66 A56 56 0 0 1 18 174 L8 174 M232 66 L222 66 A56 56 0 0 0 222 174 L232 174" fill="none" stroke="${W}" stroke-width="2"/>
      <circle cx="17" cy="120" r="3.5" fill="none" stroke="${ORANGE}" stroke-width="2"/><circle cx="223" cy="120" r="3.5" fill="none" stroke="${ORANGE}" stroke-width="2"/>
      <rect x="8" y="58" width="224" height="124" rx="6" fill="none" stroke="${W}" stroke-width="3"/>`;
  }
  function hoopSide(label = "10 ft") {
    return `<line x1="10" y1="214" x2="230" y2="214" stroke="${INK}" stroke-width="3"/>
      <rect x="196" y="40" width="8" height="174" fill="#555"/>
      <path d="M200 52 L176 52" stroke="#555" stroke-width="6"/>
      <rect x="170" y="22" width="7" height="58" fill="${W}" stroke="${INK}" stroke-width="2"/>
      <line x1="170" y1="70" x2="142" y2="70" stroke="${ORANGE}" stroke-width="4"/>
      <path d="M144 70 L150 92 L162 92 L168 70" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 2"/>
      <line x1="120" y1="72" x2="120" y2="212" stroke="${B}" stroke-width="2.5"/>
      <path d="M114 80 L120 70 L126 80 M114 204 L120 214 L126 204" fill="none" stroke="${B}" stroke-width="2.5"/>
      ${pill(120, 146, label, B, W, 14)}`;
  }
  function jersey(x, y, s, num, color = B) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M-30 -40 L-12 -48 Q0 -38 12 -48 L30 -40 L44 -22 L30 -12 L28 40 L-28 40 L-30 -12 L-44 -22 Z" fill="${color}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-12 -48 Q0 -34 12 -48" fill="none" stroke="${BL}" stroke-width="4"/>
      <text x="0" y="16" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="30" fill="${W}">${num}</text></g>`;
  }
  // A referee signal from signals.js, placed inside our picture
  function refFig(id, x = 40, y = 6, w = 160, h = 200) {
    const S = window.TEMPO_SIGNALS; if (!S) return "";
    const sig = S.SIGNALS.find((s) => s.id === id); if (!sig) return "";
    return S.figure(sig).replace('<svg viewBox="0 0 160 200"', `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 160 200"`);
  }

  /* ---------- cartoon player (front view) ---------- */
  function player(p, o = {}) {
    const team = o.team || "T", jc = team === "T" ? B : OPP, s = o.s || 1, tx = o.tx || 0, ty = o.ty || 0;
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const limb = (a, b, c, w) => `<polyline points="${a} ${b} ${c}" fill="none" stroke="${INK}" stroke-width="${w + 4}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<polyline points="${a} ${b} ${c}" fill="none" stroke="${SKIN}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    let g = "";
    // legs + shoes
    [["hL", "kL", "fL"], ["hR", "kR", "fR"]].forEach(([h, k, f]) => {
      g += limb(p[h], p[k], p[f], 8);
      g += `<ellipse cx="${p[f][0]}" cy="${p[f][1] + 3}" rx="9" ry="4.5" fill="${INK}"/>`;
    });
    // shorts
    const mL = mid(p.hL, p.kL), mR = mid(p.hR, p.kR);
    g += `<polygon points="${p.hL} ${p.hR} ${[mR[0] + 4, mR[1]]} ${[mL[0] - 4, mL[1]]}" fill="${jc}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    // jersey
    g += `<polygon points="${[p.sL[0] - 3, p.sL[1]]} ${[p.sR[0] + 3, p.sR[1]]} ${[p.hR[0] + 2, p.hR[1]]} ${[p.hL[0] - 2, p.hL[1]]}" fill="${jc}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    const c = mid(mid(p.sL, p.sR), mid(p.hL, p.hR));
    if (o.num !== undefined) g += `<text x="${c[0]}" y="${c[1] + 6}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" fill="${W}">${o.num}</text>`;
    // ball behind hands
    if (p.ball) g += ball(p.ball[0], p.ball[1], 9);
    // arms
    g += limb(p.sL, p.eL, p.wL, 6) + limb(p.sR, p.eR, p.wR, 6);
    g += `<circle cx="${p.wL[0]}" cy="${p.wL[1]}" r="5" fill="${SKIN}" stroke="${INK}" stroke-width="1.6"/><circle cx="${p.wR[0]}" cy="${p.wR[1]}" r="5" fill="${SKIN}" stroke="${INK}" stroke-width="1.6"/>`;
    if (p.ballFront) g += ball(p.ballFront[0], p.ballFront[1], 9);
    // head + hair (ponytail)
    const [hx, hy] = p.head;
    g += `<line x1="${hx}" y1="${hy + 10}" x2="${(p.sL[0] + p.sR[0]) / 2}" y2="${p.sL[1]}" stroke="${INK}" stroke-width="7"/>`;
    g += `<ellipse cx="${hx + 14}" cy="${hy - 2}" rx="6" ry="9" fill="#3B2418" transform="rotate(25 ${hx + 14} ${hy - 2})"/>`;
    g += `<circle cx="${hx}" cy="${hy}" r="13" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>`;
    g += `<path d="M${hx - 13} ${hy - 1} A13 13 0 0 1 ${hx + 13} ${hy - 1} Q${hx} ${hy - 8} ${hx - 13} ${hy - 1}" fill="#3B2418"/>`;
    g += `<rect x="${hx - 13}" y="${hy - 6}" width="26" height="3" fill="${team === "T" ? BL : W}"/>`;
    g += `<circle cx="${hx - 4.5}" cy="${hy + 2}" r="1.6" fill="${INK}"/><circle cx="${hx + 4.5}" cy="${hy + 2}" r="1.6" fill="${INK}"/>`;
    g += `<path d="M${hx - 4} ${hy + 7} Q${hx} ${hy + 10} ${hx + 4} ${hy + 7}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
    return `<g transform="translate(${tx},${ty}) scale(${s})">${g}</g>`;
  }
  const base = { head: [100, 44], sL: [82, 66], sR: [118, 66], hL: [88, 116], hR: [112, 116] };
  const POSE = {
    ready: { ...base, eL: [66, 92], wL: [72, 72], eR: [134, 92], wR: [128, 72], kL: [74, 154], fL: [68, 198], kR: [126, 154], fR: [132, 198] },
    triple: { ...base, eR: [134, 98], wR: [128, 112], eL: [96, 100], wL: [114, 112], ball: [126, 106], kL: [76, 154], fL: [70, 198], kR: [124, 154], fR: [130, 198] },
    defense: { head: [100, 58], sL: [82, 80], sR: [118, 80], hL: [86, 126], hR: [114, 126], eL: [60, 96], wL: [40, 104], eR: [134, 60], wR: [142, 36], kL: [66, 162], fL: [50, 200], kR: [134, 162], fR: [150, 200] },
    chin: { ...base, eL: [66, 80], wL: [90, 72], eR: [134, 80], wR: [110, 72], ballFront: [100, 70], kL: [80, 156], fL: [78, 198], kR: [120, 156], fR: [122, 198] },
    pivot: { ...base, eL: [66, 80], wL: [90, 72], eR: [134, 80], wR: [110, 72], ballFront: [100, 70], kL: [78, 156], fL: [74, 198], kR: [130, 152], fR: [150, 192] },
    jab: { ...base, eR: [134, 98], wR: [128, 112], eL: [96, 100], wL: [114, 112], ball: [126, 106], kL: [76, 154], fL: [70, 198], kR: [132, 158], fR: [150, 206] },
    dribble: { head: [100, 52], sL: [82, 74], sR: [118, 74], hL: [86, 122], hR: [114, 122], eL: [64, 100], wL: [64, 124], eR: [136, 104], wR: [140, 132], kL: [72, 160], fL: [62, 200], kR: [128, 160], fR: [138, 200] },
    chest: { ...base, eL: [68, 84], wL: [90, 74], eR: [132, 84], wR: [110, 74], ballFront: [100, 74], kL: [76, 154], fL: [70, 198], kR: [124, 154], fR: [130, 198] },
    target: { ...base, eL: [64, 84], wL: [70, 62], eR: [136, 84], wR: [130, 62], kL: [76, 154], fL: [70, 198], kR: [124, 154], fR: [130, 198] },
    shoot: { head: [100, 54], sL: [82, 76], sR: [118, 76], hL: [88, 126], hR: [112, 126], eR: [124, 58], wR: [122, 32], eL: [90, 50], wL: [108, 28], ball: [118, 20], kL: [86, 164], fL: [82, 200], kR: [114, 164], fR: [118, 200] },
    layup: { head: [96, 40], sL: [78, 62], sR: [114, 62], hL: [86, 110], hR: [106, 110], eR: [124, 42], wR: [132, 18], eL: [66, 76], wL: [56, 92], ball: [138, 10], kL: [90, 150], fL: [88, 186], kR: [124, 118], fR: [118, 152] },
    boxout: { head: [100, 62], sL: [82, 84], sR: [118, 84], hL: [86, 130], hR: [114, 130], eL: [58, 82], wL: [54, 60], eR: [142, 82], wR: [146, 60], kL: [68, 166], fL: [54, 202], kR: [132, 166], fR: [146, 202] },
    shakeL: { ...base, eL: [70, 96], wL: [72, 118], eR: [140, 92], wR: [160, 98], kL: [86, 156], fL: [84, 198], kR: [114, 156], fR: [116, 198] },
    shakeR: { ...base, eR: [130, 96], wR: [128, 118], eL: [60, 92], wL: [40, 98], kL: [86, 156], fL: [84, 198], kR: [114, 156], fR: [116, 198] }
  };
  const floor = (y = 212) => `<ellipse cx="120" cy="${y}" rx="96" ry="9" fill="#000" opacity=".08"/>`;

  /* ---------- FUNDAMENTALS pictures ---------- */
  const FUND = {
    ready: () => svg(floor() + player(POSE.ready, { tx: 20, ty: 6, num: 23 }) +
      arrow("M40 150 L40 120", "blue", 2.5) + t(40, 166, "knees bent", 10, BD) +
      pill(200, 40, "Feet wide", BD) + pill(178, 230, "Weight on toes", BD)),
    triple: () => svg(floor() + player(POSE.triple, { tx: 10, ty: 6, num: 23 }) +
      arrow("M150 100 L150 40", "b") + pill(170, 30, "SHOOT", B) +
      arrow("M118 112 L60 112", "b") + pill(40, 100, "PASS", B) +
      arrow("M152 128 L206 170", "b") + pill(210, 190, "DRIVE", B)),
    defense: () => svg(floor(216) + player(POSE.defense, { tx: 20, ty: 6, num: 23 }) +
      arrow("M80 222 L30 222", "blue", 3) + arrow("M160 222 L210 222", "blue", 3) + t(120, 232, "slide — don't cross feet", 10, BD) +
      pill(186, 30, "Ball!", B)),
    jumpstop: () => svg(floor() + player(POSE.chin, { tx: 20, ty: 4, num: 23 }) +
      arrow("M22 40 Q40 10 70 30", "blue", 2.5, "5 4") + t(28, 60, "hop", 11, BD) +
      `<path d="M78 214 l-8 6 M92 214 l0 8 M106 214 l8 6 M138 214 l-8 6 M152 214 l0 8 M166 214 l8 6" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>` +
      pill(120, 234, "Land on BOTH feet", B)),
    pivot: () => svg(floor() + player(POSE.pivot, { tx: 20, ty: 4, num: 23 }) +
      `<ellipse cx="94" cy="206" rx="22" ry="8" fill="none" stroke="${GOLD}" stroke-width="3"/>` + pill(70, 232, "pivot foot", GOLD, INK) +
      arrow("M196 214 Q214 170 186 150", "blue", 3, "5 4") + t(212, 140, "step", 11, BD) +
      pill(186, 34, "Chin it!", B)),
    jab: () => svg(floor() + player(POSE.jab, { tx: 0, ty: 4, num: 23 }) +
      player(POSE.ready, { tx: 150, ty: 40, s: .45, team: "O" }) +
      arrow("M160 214 L196 214", "b", 3) + pill(178, 232, "JAB", B) +
      `<ellipse cx="72" cy="206" rx="18" ry="7" fill="none" stroke="${GOLD}" stroke-width="3"/>` + pill(54, 232, "pivot", GOLD, INK) +
      pill(200, 24, "read her", BD)),
    crossover: () => svg(floor() + player(POSE.dribble, { tx: 20, ty: 4, num: 23 }) +
      `<path d="M160 142 L120 204 L84 142" fill="none" stroke="${BD}" stroke-width="3" stroke-dasharray="5 4" marker-end="url(#pa-blue)"/>` +
      ball(120, 200, 9) + pill(120, 232, "low & quick", BD) + pill(200, 30, "eyes up", B)),
    chestpass: () => svg(floor(196) + player(POSE.chest, { tx: -4, ty: 74, s: .58, num: 23 }) + player(POSE.target, { tx: 126, ty: 74, s: .58, num: 11 }) +
      arrow("M64 116 L178 116", "b", 3.5) + pill(120, 62, "straight to her chest", B) + pill(120, 228, "step · push · thumbs down", BD)),
    bouncepass: () => svg(floor(196) + player(POSE.chest, { tx: -4, ty: 74, s: .58, num: 23 }) + player(POSE.target, { tx: 126, ty: 74, s: .58, num: 11 }) +
      `<path d="M64 118 L146 186 L182 140" fill="none" stroke="${B}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#pa-b)"/>` +
      `<circle cx="146" cy="186" r="5" fill="${GOLD}"/>` + pill(146, 210, "2/3 of the way", GOLD, INK) + pill(120, 60, "arrives at her waist", BD)),
    shooting: () => svg(floor() + player(POSE.shoot, { tx: 10, ty: 10, num: 23 }) +
      `<path d="M136 22 Q180 -12 214 34" fill="none" stroke="${B}" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#pa-b)"/>` +
      `<line x1="226" y1="18" x2="226" y2="50" stroke="${INK}" stroke-width="3"/><line x1="226" y1="44" x2="208" y2="44" stroke="${ORANGE}" stroke-width="3"/>` +
      pill(56, 214, "B", BD) + pill(76, 64, "E", BD) + pill(160, 78, "E", BD) + pill(160, 30, "F", BD) +
      t(120, 236, "Balance · Eyes · Elbow · Follow-through", 10, BD)),
    layup: () => svg(floor(214) + `<line x1="214" y1="0" x2="214" y2="60" stroke="${INK}" stroke-width="4"/><rect x="204" y="14" width="10" height="16" fill="none" stroke="${RED}" stroke-width="2"/><line x1="212" y1="48" x2="190" y2="48" stroke="${ORANGE}" stroke-width="4"/>` +
      player(POSE.layup, { tx: 30, ty: 18, num: 23 }) + arrow("M178 26 L204 20", "b", 2.5) +
      pill(60, 232, "right", BD) + pill(120, 232, "left", BD) + pill(184, 232, "UP!", B)),
    boxout: () => svg(player(POSE.ready, { tx: 108, ty: 4, s: .6, team: "O" }) + floor(216) + player(POSE.boxout, { tx: 20, ty: 10, num: 23 }) +
      pill(56, 24, "SHOT!", B) + pill(40, 150, "seat back", BD) + pill(206, 150, "arms out", BD))
  };

  /* ---------- RULES pictures ---------- */
  const RULE = {
    teams: () => svg(halfCourt() + [[120, 150], [52, 120], [188, 120], [70, 50], [170, 50]].map(([x, y], i) => dot(x, y, "T", i + 1)).join("") +
      [[120, 132], [64, 106], [176, 106], [84, 58], [156, 58]].map(([x, y]) => dot(x, y, "O")).join("") + ball(132, 160) + pill(120, 210, "5 vs 5", B, W, 14)),
    scoring: () => svg(halfCourt() + ball(120, 98) + pill(120, 118, "1", GOOD) + ball(150, 64) + pill(166, 78, "2", BD) +
      ball(120, 150) + pill(120, 170, "3", B) + t(120, 210, "FT = 1 · inside = 2 · behind arc = 3", 10, W)),
    start: () => svg(`<rect x="10" y="10" width="220" height="220" rx="8" fill="${FLOOR}"/><line x1="10" y1="120" x2="230" y2="120" stroke="${W}" stroke-width="3"/>
      <circle cx="120" cy="120" r="44" fill="none" stroke="${W}" stroke-width="3"/>` + dot(104, 120, "T", "23") + dot(136, 120, "O") +
      ball(120, 84, 7) + arrow("M120 114 L120 96", "w", 2.5) + pill(120, 30, "Jump ball!", B) +
      `<rect x="70" y="190" width="100" height="26" rx="8" fill="${INK}"/>` + t(120, 208, "arrow ◀ ▶", 12, GOLD)),
    dribble: () => svg(halfCourt() + dot(40, 190, "T", "23") +
      `<path d="M52 184 L70 166 L88 180 L106 160 L124 176 L142 154 L160 170 L178 148" fill="none" stroke="${B}" stroke-width="3" stroke-dasharray="4 3" marker-end="url(#pa-b)"/>` +
      [70, 106, 142].map((x, i) => ball(x, [166, 160, 154][i], 4)).join("") + pill(120, 216, "dribble to move", B)),
    double: () => svg(refFig("dribble", 40, 6) + pill(120, 228, "illegal dribble", RED)),
    oob: () => svg(`<rect x="10" y="10" width="220" height="220" rx="8" fill="${FLOOR}"/><rect x="10" y="150" width="220" height="80" fill="#c4c9cf"/>
      <line x1="10" y1="150" x2="230" y2="150" stroke="${W}" stroke-width="6"/>` + t(120, 196, "OUT OF BOUNDS", 13, "#555") +
      `<ellipse cx="118" cy="157" rx="13" ry="5" fill="${INK}"/>` + xMark(170, 160, 9) + dot(118, 128, "T", "23") + ball(132, 120) + pill(120, 40, "the line is OUT", RED)),
    three: () => svg(halfCourt({ paintHi: true }) + dot(120, 62, "T", "23") + pill(120, 36, "1 · 2 · 3", RED) + arrow("M132 70 L180 118", "b", 3) + pill(186, 136, "get out!", B)),
    backcourt: () => svg(fullCourt() + dot(150, 120, "T", "23") + ball(160, 112) + arrow("M144 132 L96 150", "red", 3) + xMark(104, 150, 9) +
      pill(178, 40, "frontcourt", BD) + pill(62, 40, "backcourt", OPP) + t(120, 206, "can't go back over half court", 11, RED)),
    five: () => svg(halfCourt() + `<rect x="10" y="0" width="220" height="12" fill="#c4c9cf"/>` + dot(60, 6, "T", "23") + arrow("M70 14 L104 52", "b", 3) + dot(110, 62, "T") +
      clock(178, 154, 28, "5 seconds")),
    ft: () => svg(halfCourt() + dot(120, 104, "T", "23") + ball(120, 90) + [[86, 52], [154, 52], [86, 72], [154, 72]].map(([x, y], i) => dot(x, y, i < 2 ? "O" : "T")).join("") +
      pill(120, 140, "fouled while shooting", B) + t(120, 172, "2-pt try = 2 FT · 3-pt try = 3 FT", 10, W) + pill(120, 204, "made + fouled = AND-ONE", GOOD)),
    foulout: () => svg(refFig("foulstop", 10, 10, 140, 175) + [0, 1, 2, 3, 4].map((i) => `<circle cx="${172 + (i % 2) * 34}" cy="${40 + Math.floor(i / 2) * 40}" r="14" fill="${RED}"/>` + t(172 + (i % 2) * 34, 45 + Math.floor(i / 2) * 40, i + 1, 13, W)).join("") +
      pill(120, 220, "5 fouls = out of the game", RED)),
    sport: () => svg(floor() + player(POSE.shakeL, { tx: 0, ty: 30, s: .72, num: 23 }) + player(POSE.shakeR, { tx: 96, ty: 30, s: .72, team: "O", num: 4 }) + pill(120, 20, "good game!", GOOD)),

    goal: () => svg(hoopSide("10 ft") + ball(60, 202, 12) + pill(60, 176, '28.5" ball', BD)),
    ftline: () => svg(halfCourt() + `<line x1="93" y1="96" x2="147" y2="96" stroke="${W}" stroke-width="2" stroke-dasharray="4 3"/>` + t(182, 112, "15 ft line", 10, W) +
      `<line x1="98" y1="84" x2="142" y2="84" stroke="${GOLD}" stroke-width="4"/>` + dot(120, 74, "T", "23") + pill(178, 78, "13 ft", GOLD, INK)),
    length: () => svg([0, 1, 2, 3].map((i) => clock(36 + i * 56, 88, 22, "Q" + (i + 1), "12 min")).join("") + pill(120, 180, "running clock", B) + t(120, 210, "4 quarters × 12 minutes", 12, BD)),
    breaks: () => svg(clock(70, 96, 34, "2 min", "between quarters") + clock(170, 96, 34, "5 min", "halftime")),
    timeouts: () => svg([0, 1, 2, 3].map((i) => `<circle cx="${42 + i * 52}" cy="92" r="22" fill="${B}"/>` + big(42 + i * 52, 103, "T", 26, W)).join("") +
      `<line x1="120" y1="58" x2="120" y2="128" stroke="${INK}" stroke-width="2" stroke-dasharray="4 3"/>` + t(68, 146, "1st half: 2", 12, B) + t(172, 146, "2nd half: 2", 12, B) + pill(120, 196, "1 minute each", BD)),
    ot: () => svg(clock(120, 92, 44, "2:00 overtime") + pill(120, 188, "Season: 1 OT, then tie", BD) + pill(120, 216, "Playoffs: until someone wins", B)),
    playing: () => svg(["Q1", "Q2", "Q3", "Q4"].map((q, r) => t(28, 46 + r * 46, q, 14, B) +
      Array.from({ length: 5 }, (_, i) => dot(64 + i * 34, 41 + r * 46, r === 1 ? "O" : "T", "")).join("")).join("") +
      t(120, 228, "starters · second five · split · free subs", 10, BD)),
    m2m: () => svg(halfCourt() + [[120, 156], [52, 112], [188, 112], [72, 46], [168, 46]].map(([x, y], i) =>
      `<line x1="${x}" y1="${y}" x2="${x + (120 - x) * .18}" y2="${y - 18}" stroke="${W}" stroke-width="2" stroke-dasharray="3 3"/>` + dot(x, y, "O") + dot(x + (120 - x) * .18, y - 18, "T")).join("") +
      pill(120, 208, "each player guards one player", B)),
    double2: () => svg(halfCourt() + dot(70, 130, "O") + ball(80, 124) + dot(58, 112, "T") + dot(86, 110, "T") + check(70, 160, 9) +
      dot(176, 80, "O") + dot(166, 64, "T") + dot(190, 66, "T") + xMark(178, 100, 8) + pill(70, 190, "on the ball ✓", GOOD) + pill(172, 160, "off the ball ✗", RED)),
    inbound: () => svg(halfCourt() + `<rect x="10" y="0" width="220" height="12" fill="#c4c9cf"/>` + dot(78, 6, "O") + ball(90, 6) +
      [[70, 60], [160, 52], [120, 120], [180, 140]].map(([x, y]) => dot(x, y, "O") + dot(x + (120 - x) * .15, y + 16, "T")).join("") + pill(120, 206, "set up man-to-man first", B)),
    press: () => svg(fullCourt() + dot(60, 120, "O") + ball(70, 114) + dot(132, 120, "T") + arrow("M132 108 L132 72", "blue", 2, "4 3") +
      `<rect x="8" y="58" width="112" height="124" fill="${RED}" opacity=".12"/>` + xMark(40, 80, 9) + pill(64, 40, "no press here", RED) + pill(176, 40, "pick up at half", BD) +
      t(120, 212, "except last 60 sec (if not up 10+)", 11, B)),
    iso: () => svg(halfCourt() + dot(120, 150, "O") + ball(130, 142) + dot(120, 132, "T") + [[30, 30], [42, 60], [200, 30], [190, 60]].map(([x, y]) => dot(x, y, "O")).join("") +
      arrow("M70 110 L44 72", "ink", 2, "3 3") + arrow("M170 110 L194 72", "ink", 2, "3 3") + xMark(120, 200, 11) + pill(120, 224, "no clear-outs", RED)),
    warning: () => svg(`<rect x="34" y="40" width="64" height="88" rx="8" fill="${GOLD}" transform="rotate(-8 66 84)"/>` + t(66, 156, "1st time", 13, INK) + t(66, 172, "warning", 12, "#8A5A00", 600) +
      arrow("M110 84 L138 84", "ink", 3) + `<circle cx="180" cy="84" r="38" fill="${RED}"/>` + big(180, 98, "T", 40, W) + t(180, 156, "after that", 13, INK) + t(180, 172, "technical foul", 12, RED, 600)),
    bonus: () => svg(`<rect x="40" y="30" width="160" height="74" rx="10" fill="${INK}"/>` + t(120, 52, "TEAM FOULS", 11, W) + big(120, 94, "5", 40, GOLD) +
      ball(96, 150, 12) + ball(144, 150, 12) + pill(120, 196, "2 free throws", GOOD) + t(120, 222, "each quarter, from the 5th team foul", 10, BD)),
    tech: () => svg(refFig("tech", 10, 10, 140, 175) + pill(192, 50, "2 FT", RED) + pill(192, 90, "+ ball", RED) + pill(120, 220, "technical foul", RED)),
    mercy: () => svg(`<rect x="24" y="40" width="192" height="90" rx="12" fill="${INK}"/>` + t(76, 62, "HOME", 11, W) + t(164, 62, "AWAY", 11, W) +
      big(76, 108, "40", 34, GOLD) + big(164, 108, "20", 34, GOLD) + pill(120, 160, "+20 = clock keeps running", B) + t(120, 196, "2nd half of the 4th quarter", 11, BD)),
    uniform: () => svg(jersey(120, 100, 1.5, 23) + arrow("M196 150 L172 168", "blue", 3) + pill(200, 136, "tuck in", BD) + pill(120, 220, "same-color undershirts", B))
  };

  window.TEMPO_PICS = {
    rule: (id) => (RULE[id] ? RULE[id]() : ""),
    fund: (id) => (FUND[id] ? FUND[id]() : ""),
    player, POSE
  };
})();
