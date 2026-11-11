/* Tempo play viewer: animated half-court plays with steps and decision points.
   A play is a list of phases. Each phase moves players (absolute court
   coordinates, times relative to the phase), moves the ball and draws trails.
   A phase can lead to a decision ({question, yes, no}) that waits for the player. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const B = "#6B1E3A", INK = "#1F1A1C";

  const COURT = `
    <defs>
      <marker id="pv-head" orient="auto" markerWidth="10" markerHeight="10" refX="5" refY="5" markerUnits="userSpaceOnUse" overflow="visible"><path d="M0 0 L10 5 L0 10 Z" fill="${B}"/></marker>
      <marker id="pv-pass" orient="auto" markerWidth="10" markerHeight="10" refX="5" refY="5" markerUnits="userSpaceOnUse" overflow="visible"><path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/></marker>
      <marker id="pv-bar" orient="auto" markerWidth="4" markerHeight="24" refX="2" refY="12" markerUnits="userSpaceOnUse" overflow="visible"><rect x="0" y="0" width="4" height="24" fill="${B}"/></marker>
    </defs>
    <rect x="0" y="0" width="650" height="611" fill="#EFE3D3"/>
    <rect x="247" y="0" width="156" height="247" fill="#9CC3E6" fill-opacity=".45"/>
    <g fill="none" stroke="${B}" stroke-width="3">
      <rect x="1.5" y="1.5" width="647" height="608"/>
      <rect x="247" y="0" width="156" height="247"/>
      <path d="M 247 247 A 78 78 0 0 0 403 247"/>
      <path d="M 247 247 A 78 78 0 0 1 403 247" stroke-dasharray="10 8"/>
      <path d="M 68 0 L 68 68 A 257 257 0 0 0 582 68 L 582 0"/>
      <path d="M 247 611 A 78 78 0 0 1 403 611"/>
      <path d="M 273 68 A 52 52 0 0 0 377 68" stroke-width="2"/>
      <line x1="325" y1="52" x2="325" y2="58"/>
      <circle class="pv-rim" cx="325" cy="68" r="10" stroke="#C4501B"/>
    </g>
    <line x1="286" y1="52" x2="364" y2="52" stroke="${INK}" stroke-width="5"/>
    <rect x="237" y="85" width="10" height="12" fill="${B}"/><rect x="403" y="85" width="10" height="12" fill="${B}"/>
    <g class="pv-oob"></g>
    <g class="pv-trails"></g><g class="pv-def"></g><g class="pv-off"></g><g class="pv-ball"></g>
    <text class="pv-score" x="325" y="40" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-size="34" fill="${B}" opacity="0">+2!</text>`;

  const css = `
  .pv { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(260px, 1fr); gap: 22px; align-items: start; }
  .pv-stage { position: relative; }
  .pv-stage svg { width: 100%; height: auto; display: block; border-radius: 10px; box-shadow: var(--shadow); }
  .pv-caption { min-height: 60px; margin-top: 12px; padding: 12px 16px; background: var(--bordeaux); color: #fff; border-radius: 12px; font-size: 17px; font-weight: 600; line-height: 1.4; }
  .pv-caption b { color: var(--blue); }
  .pv-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 12px; }
  .pv-controls button { min-height: 44px; }
  .pv-speed { display: flex; gap: 4px; align-items: center; font-weight: 700; font-size: 14px; margin-left: auto; }
  .pv-speed button { padding: 8px 12px; background: #fff; color: var(--bordeaux); border: 2px solid var(--bordeaux); }
  .pv-speed button.on { background: var(--bordeaux); color: #fff; }
  .pv-decision { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(31,26,28,.35); border-radius: 10px; }
  .pv-decision .box { background: #fff; border-radius: 18px; padding: 22px 24px; max-width: 360px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,.3); border-top: 6px solid var(--blue); }
  .pv-decision h3 { color: var(--bordeaux); font-size: 22px; margin: 4px 0 8px; }
  .pv-decision p { font-size: 15px; color: var(--muted); margin: 0 0 14px; }
  .pv-decision .row { display: flex; gap: 10px; justify-content: center; }
  .pv-decision .yes { background: var(--good); }
  .pv-decision .no { background: var(--bad); }
  .pv-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
  .pv-steps li { padding: 8px 10px; border-radius: 10px; font-size: 15px; line-height: 1.35; border: 2px solid transparent; }
  .pv-steps li.on { background: var(--bordeaux-soft); border-color: var(--bordeaux); }
  .pv-steps li.dec { background: #FFF6E5; font-weight: 700; }
  .pv-steps li.branch { font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--blue-dark); padding: 8px 10px 0; }
  .pv-steps li b { color: var(--bordeaux); }
  .pv-legend { display: grid; grid-template-columns: 44px 1fr; gap: 8px 10px; align-items: center; font-size: 14px; }
  @media (max-width: 860px) { .pv { grid-template-columns: 1fr; } .pv-speed { margin-left: 0; } }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const ease = (p) => (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  function at(keys, t) {
    if (t <= keys[0][0]) return [keys[0][1], keys[0][2]];
    for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) {
      const a = keys[i - 1], b = keys[i], p = ease((t - a[0]) / (b[0] - a[0] || 1));
      return [a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p];
    }
    const l = keys[keys.length - 1]; return [l[1], l[2]];
  }
  function partial(pts, p) {
    const segs = []; let total = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); total += d; }
    let want = total * p; const out = [pts[0]];
    for (let j = 1; j < pts.length; j++) {
      if (want >= segs[j - 1]) { out.push(pts[j]); want -= segs[j - 1]; }
      else { const a = pts[j - 1], b = pts[j], f = want / segs[j - 1]; out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]); break; }
    }
    return out.map((q) => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  }

  function mount(root, play) {
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    root.innerHTML = `
      <div class="pv">
        <div>
          <div class="pv-stage">
            <svg viewBox="0 0 650 611" role="img" aria-label="${esc(play.title)} animation">${COURT}</svg>
            <div class="pv-decision hidden"><div class="box">
              <div class="kicker">Decision</div><h3 class="pv-q"></h3><p class="pv-hint"></p>
              <div class="row"><button class="yes">Yes</button><button class="no">No</button></div>
            </div></div>
          </div>
          <div class="pv-caption" aria-live="polite"></div>
          <div class="pv-controls">
            <button class="pv-play">Play</button>
            <button class="secondary pv-next">Next step ▶</button>
            <button class="ghost pv-restart">Restart</button>
            <div class="pv-speed"><span>Speed</span><button data-s="0.5">½×</button><button data-s="1" class="on">1×</button></div>
          </div>
        </div>
        <aside class="grid" style="gap:14px">
          <div class="card blue"><h3>The action</h3><ol class="pv-steps"></ol></div>
          <div class="card"><h3>Key</h3><div class="pv-legend">
            <svg width="40" height="24"><circle cx="12" cy="12" r="11" fill="${B}" stroke="#fff" stroke-width="2"/></svg><span>Tempo player</span>
            <svg width="40" height="24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#fff" stroke="${INK}" stroke-width="2"/></svg><span>Defender (man-to-man)</span>
            <svg width="40" height="24"><line x1="2" y1="12" x2="30" y2="12" stroke="${B}" stroke-width="3"/><path d="M28 6 L38 12 L28 18 Z" fill="${B}"/></svg><span>Cut / move</span>
            <svg width="40" height="24"><line x1="2" y1="12" x2="30" y2="12" stroke="${INK}" stroke-width="3" stroke-dasharray="6 5"/><path d="M28 6 L38 12 L28 18 Z" fill="${INK}"/></svg><span>Pass</span>
            <svg width="40" height="24"><line x1="2" y1="12" x2="32" y2="12" stroke="${B}" stroke-width="3"/><rect x="32" y="1" width="4" height="22" fill="${B}"/></svg><span>Screen</span>
          </div></div>
          ${play.tips ? `<div class="card accent"><h3>Coaching points</h3><p style="margin:0;font-size:15px">${play.tips}</p></div>` : ""}
        </aside>
      </div>`;
    const $ = (s) => root.querySelector(s);
    const svg = $("svg"), gOff = $(".pv-off"), gDef = $(".pv-def"), gTr = $(".pv-trails"), gBall = $(".pv-ball");
    if (play.oob) {
      svg.setAttribute("viewBox", "0 -56 650 667");
      $(".pv-oob").innerHTML = `<rect x="0" y="-56" width="650" height="56" fill="#c9cdd2"/><line x1="0" y1="0" x2="650" y2="0" stroke="${B}" stroke-width="4"/>` +
        `<text x="630" y="-20" text-anchor="end" font-size="16" font-weight="800" fill="#666" font-family="system-ui">OUT OF BOUNDS · BASELINE</text>`;
    }

    // pieces
    const nodes = {};
    Object.keys(play.start.def || {}).forEach((id) => {
      const g = el("g", {}, gDef);
      el("rect", { x: -20, y: -20, width: 40, height: 40, rx: 6, fill: "#fff", stroke: INK, "stroke-width": 2 }, g);
      el("text", { x: 0, y: 6, "text-anchor": "middle", "font-family": "system-ui, sans-serif", "font-weight": 800, "font-size": 15, fill: INK }, g).textContent = id;
      nodes[id] = g;
    });
    Object.keys(play.start.off).forEach((id) => {
      const g = el("g", {}, gOff);
      el("circle", { r: 22, fill: B, stroke: "#fff", "stroke-width": 3 }, g);
      el("text", { x: 0, y: 9, "text-anchor": "middle", "font-family": "Arial Black, Impact, sans-serif", "font-size": 22, fill: "#fff" }, g).textContent = id;
      nodes[id] = g;
    });
    const ball = el("g", {}, gBall);
    el("circle", { r: 10, fill: "#D9822B", stroke: INK, "stroke-width": 1.5 }, ball);
    el("path", { d: "M -10 0 L 10 0 M 0 -10 L 0 10 M -7 -7 Q -2 0 -7 7 M 7 -7 Q 2 0 7 7", fill: "none", stroke: INK, "stroke-width": 1.2 }, ball);

    // steps list
    const stepsEl = $(".pv-steps");
    stepsEl.innerHTML = play.list.map((it) => it.branch ? `<li class="branch">${esc(it.branch)}</li>` :
      `<li data-id="${it.id}" class="${play.phases[it.id] && play.phases[it.id].decision ? "dec" : ""}">${it.html}</li>`).join("");

    // state
    let pos, holder, phaseId, t, playing = false, speed = 1, last = null, stepMode = false, trails = [], ballAt = null;
    const start = () => {
      pos = {}; Object.entries({ ...play.start.off, ...(play.start.def || {}) }).forEach(([k, v]) => pos[k] = v.slice());
      holder = play.start.ball; ballAt = null; trails.forEach((x) => x.el.remove()); trails = [];
      $(".pv-score").setAttribute("opacity", 0); svg.querySelector(".pv-rim").setAttribute("stroke-width", 3);
      enter(play.first);
    };
    function enter(id) {
      phaseId = id; t = 0;
      const ph = play.phases[id];
      if (ph.clearTrails) { trails.forEach((x) => x.el.remove()); trails = []; }
      trails.forEach((x) => { x.old = true; x.el.setAttribute("opacity", .25); });
      (ph.trails || []).forEach((tr) => {
        const a = { fill: "none", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round", points: "" };
        if (tr.kind === "pass") { a.stroke = INK; a["stroke-dasharray"] = "8 7"; a["marker-end"] = "url(#pv-pass)"; }
        else if (tr.kind === "screen") { a.stroke = B; a["marker-end"] = "url(#pv-bar)"; }
        else { a.stroke = B; a["marker-end"] = "url(#pv-head)"; }
        trails.push({ ...tr, el: el("polyline", a, gTr) });
      });
      // remember where moves begin
      ph._from = {}; Object.keys(ph.moves || {}).forEach((k) => ph._from[k] = pos[k].slice());
      ph._holder = holder;
      stepsEl.querySelectorAll("li[data-id]").forEach((li) => li.classList.toggle("on", li.dataset.id === id));
      $(".pv-caption").innerHTML = ph.caption;
      $(".pv-decision").classList.add("hidden");
      if (ph.decision) {
        $(".pv-q").textContent = ph.decision.question; $(".pv-hint").textContent = ph.decision.hint || "";
        $(".pv-decision").classList.remove("hidden"); pause();
      }
      render();
    }
    function keysFor(ph, k) { const m = ph.moves[k]; return m[0][0] === 0 ? m : [[0, ...ph._from[k]], ...m]; }
    function cur(ph, k, tt) { return ph.moves && ph.moves[k] ? at(keysFor(ph, k), tt) : pos[k]; }
    const hxy = (ph, id, tt) => { const p = cur(ph, id, tt); return [p[0] + 15, p[1] - 15]; };
    function render() {
      const ph = play.phases[phaseId];
      Object.keys(nodes).forEach((k) => { const p = cur(ph, k, t); nodes[k].setAttribute("transform", `translate(${p[0]},${p[1]})`); });
      // ball
      let bxy = ballAt || hxy(ph, ph._holder, t);
      (ph.ball || []).forEach((s) => {
        if (t < s.t0) return;
        if (s.hold) bxy = hxy(ph, s.hold, t);
        else if (s.atXY) bxy = s.atXY;
        else {
          const p = ease(Math.min(1, (t - s.t0) / (s.t1 - s.t0)));
          const a = hxy(ph, s.from, s.t0), b = s.toXY || hxy(ph, s.to, s.t1);
          bxy = [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p - Math.sin(Math.PI * p) * (s.toXY ? 40 : 12)];
          if (p >= 1) bxy = s.toXY ? s.toXY : hxy(ph, s.to, t);
        }
      });
      ball.setAttribute("transform", `translate(${bxy[0]},${bxy[1]})`);
      trails.forEach((tr) => {
        if (tr.old) return;
        const p = Math.max(0, Math.min(1, (t - tr.t0) / (tr.t1 - tr.t0)));
        tr.el.setAttribute("points", p <= 0 ? "" : partial(tr.pts, ease(p)));
      });
      if (ph.score) { const o = Math.max(0, Math.min(1, (t - ph.score) / .3)); $(".pv-score").setAttribute("opacity", o); svg.querySelector(".pv-rim").setAttribute("stroke-width", o > 0 ? 6 : 3); }
    }
    function finishPhase() {
      const ph = play.phases[phaseId];
      Object.keys(ph.moves || {}).forEach((k) => pos[k] = at(keysFor(ph, k), ph.dur));
      (ph.ball || []).forEach((s) => { if (s.hold) holder = s.hold; if (s.to) holder = s.to; if (s.toXY || s.atXY) ballAt = s.toXY || s.atXY; });
      if (!(ph.ball || []).some((s) => s.toXY || s.atXY)) ballAt = null;
      trails.forEach((tr) => { if (!tr.old) tr.el.setAttribute("points", partial(tr.pts, 1)); });
    }
    function advance() {
      const ph = play.phases[phaseId];
      if (ph.decision) return false;
      finishPhase();
      if (!ph.next) { pause(); $(".pv-play").textContent = "Replay"; return false; }
      if (ph.next === "@restart") { start(); return true; }
      enter(ph.next); return true;
    }
    function frame(now) {
      if (!playing) return;
      if (last !== null) t += (now - last) / 1000 * speed;
      last = now;
      const ph = play.phases[phaseId];
      if (t >= ph.dur) {
        t = ph.dur; render();
        const stop = stepMode;
        if (!advance() || stop) { pause(); return; }
      }
      render(); requestAnimationFrame(frame);
    }
    function playIt() { if ($(".pv-play").textContent === "Replay") start(); playing = true; last = null; $(".pv-play").textContent = "Pause"; requestAnimationFrame(frame); }
    function pause() { playing = false; if ($(".pv-play").textContent !== "Replay") $(".pv-play").textContent = "Play"; }
    function answer(yes) {
      const d = play.phases[phaseId].decision;
      $(".pv-decision").classList.add("hidden");
      enter(yes ? d.yes : d.no);
      if (!stepMode) playIt(); else { playIt(); }
    }
    $(".pv-play").onclick = () => { stepMode = false; if (playing) pause(); else if (!play.phases[phaseId].decision) playIt(); };
    $(".pv-next").onclick = () => {
      if (play.phases[phaseId].decision) return;
      stepMode = true;
      if ($(".pv-play").textContent === "Replay") { start(); playIt(); return; }
      if (t >= play.phases[phaseId].dur || t > 0) { t = play.phases[phaseId].dur; render(); if (!advance()) return; }
      playIt();
    };
    $(".pv-restart").onclick = () => { stepMode = false; $(".pv-play").textContent = "Play"; start(); playIt(); };
    $(".yes").onclick = () => answer(true);
    $(".no").onclick = () => answer(false);
    root.querySelectorAll(".pv-speed button").forEach((b) => b.onclick = () => {
      speed = +b.dataset.s; root.querySelectorAll(".pv-speed button").forEach((o) => o.classList.toggle("on", o === b));
    });
    start();
    setTimeout(playIt, 600);
  }
  window.TEMPO_PLAY = { mount };
})();
