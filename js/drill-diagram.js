/* Tempo drill diagrams: a half court where Coach places players, defenders,
   a ball and cones, and draws cuts, passes, dribbles and screens.
   items = [{t:"o",n,x,y} | {t:"d",n,x,y} | {t:"ball",x,y} | {t:"cone",x,y} |
            {t:"line",k:"cut"|"pass"|"dribble"|"screen",x1,y1,x2,y2}]
   Same 650 x 611 half court as the Plays page (basket at the top).
   TEMPO_DIAGRAM.svg(items)            -> SVG markup (for the screen)
   TEMPO_DIAGRAM.draw(ctx, items, x, y, w) -> paints it on a canvas (for images / PDF)
   TEMPO_DIAGRAM.edit(items)           -> opens the editor, resolves to new items or null */
(function () {
  const W = 650, H = 611, B = "#6B1E3A", BLUE = "#2F6EA5", INK = "#22161C", ORANGE = "#E8833A";
  const COURT_PATHS = [
    "M 1.5 1.5 H 648.5 V 609.5 H 1.5 Z",            // boundary
    "M 247 0 V 247 H 403 V 0",                        // lane
    "M 247 247 A 78 78 0 0 0 403 247",                // free-throw circle (top half)
    "M 68 0 L 68 68 A 257 257 0 0 0 582 68 L 582 0",  // 3-point line
    "M 247 611 A 78 78 0 0 1 403 611",                // center circle
    "M 273 68 A 52 52 0 0 0 377 68"                   // restricted arc
  ];
  const DASHED = "M 247 247 A 78 78 0 0 1 403 247";

  /* ---------- geometry helpers ---------- */
  function lineGeom(it) {
    const dx = it.x2 - it.x1, dy = it.y2 - it.y1, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
    const tipBack = it.k === "screen" ? 0 : 16;              // shorten the shaft so the arrowhead sits on the end
    const ex = it.x2 - ux * tipBack, ey = it.y2 - uy * tipBack;
    let d;
    if (it.k === "dribble") {                                 // zig-zag shaft
      const n = Math.max(2, Math.floor((len - tipBack - 20) / 18)), px = -uy, py = ux;
      d = `M ${it.x1} ${it.y1}`;
      for (let i = 1; i <= n; i++) {
        const t = (i / (n + 1)) * (len - tipBack), s = i % 2 ? 9 : -9;
        d += ` L ${it.x1 + ux * t + px * s} ${it.y1 + uy * t + py * s}`;
      }
      d += ` L ${ex} ${ey}`;
    } else d = `M ${it.x1} ${it.y1} L ${ex} ${ey}`;
    const head = it.k === "screen"
      ? { bar: [it.x2 - uy * 16, it.y2 + ux * 16, it.x2 + uy * 16, it.y2 - ux * 16] }
      : { tri: [it.x2, it.y2, ex - uy * 10, ey + ux * 10, ex + uy * 10, ey - ux * 10] };
    return { d, head };
  }
  const lineColor = (k) => (k === "pass" ? INK : B);

  /* ---------- SVG ---------- */
  function courtSVG() {
    return `<rect x="0" y="0" width="${W}" height="${H}" fill="#EFE3D3"/>
      <rect x="247" y="0" width="156" height="247" fill="#9CC3E6" fill-opacity=".45"/>
      <g fill="none" stroke="${B}" stroke-width="3">${COURT_PATHS.map((p) => `<path d="${p}"/>`).join("")}
        <path d="${DASHED}" stroke-dasharray="10 8"/><circle cx="325" cy="68" r="10" stroke="#C4501B"/></g>
      <line x1="286" y1="52" x2="364" y2="52" stroke="${INK}" stroke-width="5"/>`;
  }
  function itemSVG(it, i) {
    const tag = i == null ? "" : ` data-i="${i}"`;
    if (it.t === "line") {
      const g = lineGeom(it), c = lineColor(it.k);
      return `<g${tag} class="dg-item"><path d="${g.d}" fill="none" stroke="transparent" stroke-width="22"/>
        <path d="${g.d}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round" ${it.k === "pass" ? 'stroke-dasharray="12 9"' : ""}/>
        ${g.head.tri ? `<polygon points="${g.head.tri.join(" ")}" fill="${c}"/>` : `<line x1="${g.head.bar[0]}" y1="${g.head.bar[1]}" x2="${g.head.bar[2]}" y2="${g.head.bar[3]}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`}</g>`;
    }
    if (it.t === "o") return `<g${tag} class="dg-item" transform="translate(${it.x},${it.y})"><circle r="22" fill="${B}" stroke="#fff" stroke-width="3"/>
        <text y="9" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#fff">${it.n}</text></g>`;
    if (it.t === "d") return `<g${tag} class="dg-item" transform="translate(${it.x},${it.y})"><circle r="22" fill="#fff" fill-opacity=".85" stroke="${BLUE}" stroke-width="3"/>
        <text y="8" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="${BLUE}">X${it.n}</text></g>`;
    if (it.t === "ball") return `<g${tag} class="dg-item" transform="translate(${it.x},${it.y})"><circle r="12" fill="${ORANGE}" stroke="${INK}" stroke-width="2"/>
        <path d="M -12 0 H 12 M 0 -12 V 12" stroke="${INK}" stroke-width="1.5"/></g>`;
    if (it.t === "cone") return `<g${tag} class="dg-item" transform="translate(${it.x},${it.y})"><polygon points="0,-18 14,14 -14,14" fill="#F28C28" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <rect x="-8" y="-2" width="16" height="5" fill="#fff"/><rect x="-17" y="13" width="34" height="5" rx="2" fill="${INK}"/></g>`;
    return "";
  }
  // Lines first so players and the ball sit on top of them.
  const ordered = (items) => items.map((it, i) => [it, i]).sort((a, b) => (a[0].t === "line" ? 0 : 1) - (b[0].t === "line" ? 0 : 1));
  function svg(items, attrs = "") {
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" ${attrs}>${courtSVG()}${ordered(items || []).map(([it]) => itemSVG(it)).join("")}</svg>`;
  }

  /* ---------- canvas (for the PDF) ---------- */
  function draw(cx, items, x0, y0, w) {
    const s = w / W;
    cx.save(); cx.translate(x0, y0); cx.scale(s, s);
    cx.fillStyle = "#EFE3D3"; cx.fillRect(0, 0, W, H);
    cx.fillStyle = "rgba(156,195,230,.45)"; cx.fillRect(247, 0, 156, 247);
    cx.strokeStyle = B; cx.lineWidth = 3; cx.lineJoin = "round";
    COURT_PATHS.forEach((p) => cx.stroke(new Path2D(p)));
    cx.setLineDash([10, 8]); cx.stroke(new Path2D(DASHED)); cx.setLineDash([]);
    cx.strokeStyle = "#C4501B"; cx.beginPath(); cx.arc(325, 68, 10, 0, Math.PI * 2); cx.stroke();
    cx.strokeStyle = INK; cx.lineWidth = 5; cx.beginPath(); cx.moveTo(286, 52); cx.lineTo(364, 52); cx.stroke();
    ordered(items || []).forEach(([it]) => {
      if (it.t === "line") {
        const g = lineGeom(it), c = lineColor(it.k);
        cx.strokeStyle = c; cx.fillStyle = c; cx.lineWidth = 4;
        if (it.k === "pass") cx.setLineDash([12, 9]);
        cx.stroke(new Path2D(g.d)); cx.setLineDash([]);
        if (g.head.tri) { const t = g.head.tri; cx.beginPath(); cx.moveTo(t[0], t[1]); cx.lineTo(t[2], t[3]); cx.lineTo(t[4], t[5]); cx.closePath(); cx.fill(); }
        else { const b = g.head.bar; cx.lineWidth = 6; cx.lineCap = "round"; cx.beginPath(); cx.moveTo(b[0], b[1]); cx.lineTo(b[2], b[3]); cx.stroke(); cx.lineCap = "butt"; }
        return;
      }
      cx.save(); cx.translate(it.x, it.y);
      if (it.t === "o" || it.t === "d") {
        cx.beginPath(); cx.arc(0, 0, 22, 0, Math.PI * 2);
        cx.fillStyle = it.t === "o" ? B : "rgba(255,255,255,.85)"; cx.fill();
        cx.lineWidth = 3; cx.strokeStyle = it.t === "o" ? "#fff" : BLUE; cx.stroke();
        cx.fillStyle = it.t === "o" ? "#fff" : BLUE; cx.textAlign = "center"; cx.textBaseline = "middle";
        cx.font = `900 ${it.t === "o" ? 24 : 20}px Arial, sans-serif`; cx.fillText(it.t === "o" ? String(it.n) : "X" + it.n, 0, 1);
      } else if (it.t === "ball") {
        cx.beginPath(); cx.arc(0, 0, 12, 0, Math.PI * 2); cx.fillStyle = ORANGE; cx.fill(); cx.lineWidth = 2; cx.strokeStyle = INK; cx.stroke();
        cx.lineWidth = 1.5; cx.beginPath(); cx.moveTo(-12, 0); cx.lineTo(12, 0); cx.moveTo(0, -12); cx.lineTo(0, 12); cx.stroke();
      } else if (it.t === "cone") {
        cx.beginPath(); cx.moveTo(0, -18); cx.lineTo(14, 14); cx.lineTo(-14, 14); cx.closePath(); cx.fillStyle = "#F28C28"; cx.fill();
        cx.lineWidth = 2; cx.strokeStyle = INK; cx.stroke(); cx.fillStyle = "#fff"; cx.fillRect(-8, -2, 16, 5); cx.fillStyle = INK; cx.fillRect(-17, 13, 34, 5);
      }
      cx.restore();
    });
    cx.restore();
  }

  /* ---------- editor ---------- */
  const TOOLS = [
    ["move", "✋", "Move"], ["o", "①", "Player"], ["d", "X", "Defender"], ["ball", "🏀", "Ball"], ["cone", "▲", "Cone"],
    ["cut", "→", "Cut"], ["pass", "⇢", "Pass"], ["dribble", "〰", "Dribble"], ["screen", "⊣", "Screen"], ["erase", "⌫", "Erase"]
  ];
  const CSS = `
    .dg-modal { position: fixed; inset: 0; z-index: 2000; background: rgba(34,22,28,.55); display: flex; align-items: center; justify-content: center; padding: 12px; }
    .dg-box { background: #fff; border-radius: 18px; width: min(980px, 100%); max-height: 100%; overflow: auto; padding: 14px 16px 16px; box-shadow: 0 20px 60px rgba(0,0,0,.35); }
    .dg-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
    .dg-head h3 { margin: 0; color: ${B}; }
    .dg-body { display: grid; grid-template-columns: 170px 1fr; gap: 14px; align-items: start; }
    @media (max-width: 700px) { .dg-body { grid-template-columns: 1fr; } .dg-tools { display: flex !important; flex-wrap: wrap; } .dg-tools button { flex: 1 0 30%; } }
    .dg-tools { display: grid; gap: 6px; }
    .dg-tools button { display: flex; gap: 8px; align-items: center; justify-content: flex-start; background: #fff; color: ${INK}; border: 2px solid #E6DCE0; border-radius: 10px; padding: 7px 10px; font-weight: 800; font-size: 14px; min-width: 0; }
    .dg-tools button .ic { width: 22px; text-align: center; font-size: 17px; }
    .dg-tools button.on { border-color: ${B}; background: #F3E6EB; color: ${B}; }
    .dg-tools .sep { height: 4px; }
    .dg-svg { width: 100%; height: auto; max-height: 72vh; touch-action: none; user-select: none; border-radius: 10px; display: block; cursor: crosshair; }
    .dg-svg.move .dg-item { cursor: grab; } .dg-svg.erase .dg-item { cursor: not-allowed; }
    .dg-svg.erase .dg-item:hover { opacity: .45; }
    .dg-hint { font-size: 13px; color: #6E5F66; margin: 6px 0 0; }
    .dg-foot { display: flex; gap: 10px; justify-content: flex-end; margin-top: 12px; flex-wrap: wrap; }`;
  const HINT = {
    move: "Drag anything to move it.", o: "Tap the court to place the next player (1, 2, 3…).", d: "Tap to place the next defender (X1, X2…).",
    ball: "Tap to place the ball. (There's only one — tapping again moves it.)", cone: "Tap to place cones.",
    cut: "Drag from the start to the end of the cut.", pass: "Drag from the passer to the receiver.", dribble: "Drag along the dribble path.",
    screen: "Drag from the screener to where the screen is set.", erase: "Tap anything to delete it."
  };

  function edit(start, title) {
    return new Promise((resolve) => {
      if (!document.getElementById("dg-css")) { const st = document.createElement("style"); st.id = "dg-css"; st.textContent = CSS; document.head.appendChild(st); }
      let items = JSON.parse(JSON.stringify(start || [])), tool = "o", history = [];
      const modal = document.createElement("div"); modal.className = "dg-modal";
      modal.innerHTML = `<div class="dg-box" role="dialog" aria-label="Court diagram">
        <div class="dg-head"><h3>Court diagram${title ? " — " + title.replace(/[<>&]/g, "") : ""}</h3><button class="ghost dg-x" aria-label="Close">✕</button></div>
        <div class="dg-body">
          <div class="dg-tools">${TOOLS.map(([k, ic, lb]) => `<button data-tool="${k}"><span class="ic">${ic}</span>${lb}</button>`).join("")}
            <div class="sep"></div><button data-cmd="undo"><span class="ic">↶</span>Undo</button><button data-cmd="clear"><span class="ic">🗑</span>Clear all</button></div>
          <div><svg class="dg-svg" viewBox="0 0 ${W} ${H}"></svg><p class="dg-hint"></p></div>
        </div>
        <div class="dg-foot"><button class="ghost dg-cancel">Cancel</button><button class="dg-done">Save diagram</button></div></div>`;
      document.body.appendChild(modal);
      const svgEl = modal.querySelector(".dg-svg");
      const close = (val) => { modal.remove(); document.removeEventListener("keydown", onKey); resolve(val); };
      const onKey = (e) => { if (e.key === "Escape") close(null); if ((e.metaKey || e.ctrlKey) && e.key === "z") { e.preventDefault(); undo(); } };
      document.addEventListener("keydown", onKey);
      const snap = () => { history.push(JSON.stringify(items)); if (history.length > 80) history.shift(); };
      const undo = () => { if (history.length) { items = JSON.parse(history.pop()); render(); } };
      function render(preview) {
        svgEl.innerHTML = courtSVG() + ordered(items).map(([it, i]) => itemSVG(it, i)).join("") + (preview ? itemSVG(preview) : "");
        svgEl.setAttribute("class", "dg-svg " + tool);
      }
      function setTool(k) {
        tool = k; modal.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("on", b.dataset.tool === k));
        modal.querySelector(".dg-hint").textContent = HINT[k]; render();
      }
      const nextN = (t) => { const used = items.filter((x) => x.t === t).map((x) => x.n); let n = 1; while (used.includes(n)) n++; return n; };
      const pt = (e) => { const p = svgEl.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svgEl.getScreenCTM().inverse());
        return { x: Math.round(Math.max(0, Math.min(W, q.x))), y: Math.round(Math.max(0, Math.min(H, q.y))) }; };
      let act = null;
      svgEl.addEventListener("pointerdown", (e) => {
        e.preventDefault(); const p = pt(e), hit = e.target.closest("[data-i]"), i = hit ? +hit.dataset.i : -1;
        if (tool === "erase") { if (i >= 0) { snap(); items.splice(i, 1); render(); } return; }
        if (tool === "move") { if (i >= 0) { snap(); act = { move: i, last: p }; svgEl.setPointerCapture(e.pointerId); } return; }
        if (["cut", "pass", "dribble", "screen"].includes(tool)) { act = { line: { t: "line", k: tool, x1: p.x, y1: p.y, x2: p.x, y2: p.y } }; svgEl.setPointerCapture(e.pointerId); return; }
        snap();
        if (tool === "ball") { items = items.filter((x) => x.t !== "ball"); items.push({ t: "ball", x: p.x, y: p.y }); }
        else if (tool === "cone") items.push({ t: "cone", x: p.x, y: p.y });
        else items.push({ t: tool, n: nextN(tool), x: p.x, y: p.y });
        render();
      });
      svgEl.addEventListener("pointermove", (e) => {
        if (!act) return; const p = pt(e);
        if (act.line) { act.line.x2 = p.x; act.line.y2 = p.y; render(act.line); }
        if (act.move != null) {
          const it = items[act.move], dx = p.x - act.last.x, dy = p.y - act.last.y; act.last = p;
          if (it.t === "line") { it.x1 += dx; it.y1 += dy; it.x2 += dx; it.y2 += dy; } else { it.x = p.x; it.y = p.y; }
          render();
        }
      });
      const end = () => {
        if (act && act.line && Math.hypot(act.line.x2 - act.line.x1, act.line.y2 - act.line.y1) > 25) { snap(); items.push(act.line); }
        act = null; render();
      };
      svgEl.addEventListener("pointerup", end); svgEl.addEventListener("pointercancel", end);
      modal.querySelector(".dg-tools").addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        if (b.dataset.tool) setTool(b.dataset.tool);
        if (b.dataset.cmd === "undo") undo();
        if (b.dataset.cmd === "clear" && items.length) { snap(); items = []; render(); }
      });
      modal.querySelector(".dg-x").onclick = () => close(null);
      modal.querySelector(".dg-cancel").onclick = () => close(null);
      modal.querySelector(".dg-done").onclick = () => close(items);
      modal.addEventListener("pointerdown", (e) => { if (e.target === modal) close(null); });
      setTool("o");
    });
  }

  window.TEMPO_DIAGRAM = { svg, draw, edit, W, H };
})();
