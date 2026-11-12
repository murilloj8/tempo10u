/* Tempo playbook data for the play viewer (js/play-engine.js).
   Court: 650 x 611, basket at the top, baseline at y = 0.
   moves: { player: [[time, x, y], ...] } — times are seconds inside that step. */
window.TEMPO_PLAYS = {
  /* ===================== PLAY 1: SCREEN & CUT (with read) ===================== */
  "screen-cut": {
    title: "Motion",
    sub: "Screen, cut, read: is the cutter open? If not, keep the motion going on the other side.",
    tips: ["#5: set a strong, still screen. No moving!", "#3: wait for the screen, then cut close past it.", "Ball handler: never force a pass. Be patient!", "Everyone: after a screen, fill the open spot."],
    start: {
      off: { 1: [416, 403], 2: [78, 212], 3: [572, 212], 4: [234, 403], 5: [436, 104] },
      def: { X1: [397, 351], X2: [167, 202], X3: [522, 227], X4: [247, 352], X5: [410, 150] },
      ball: "1"
    },
    first: "setup",
    phases: {
      setup: { dur: 0.8, caption: "<b>Set up.</b> Two-guard front. #1 has the ball on the right.", next: "pass" },
      pass: {
        dur: 1.0, clearTrails: true, caption: "<b>1.</b> #1 passes across to #4. <b>Same time:</b> #5 steps up and sets a screen on #3's defender.",
        moves: { 5: [[0.9, 484, 196]], X1: [[0.9, 362, 318]], X2: [[0.9, 128, 252]], X4: [[0.9, 250, 356]], X5: [[0.9, 448, 168]] },
        ball: [{ t0: 0, t1: 0.8, from: "1", to: "4" }],
        trails: [{ t0: 0, t1: 0.8, kind: "pass", pts: [[416, 403], [234, 403]] }, { t0: 0, t1: 0.9, kind: "screen", pts: [[436, 104], [476, 182]] }],
        next: "cut"
      },
      cut: {
        dur: 1.9, caption: "<b>2.</b> #3 cuts hard off #5's shoulder toward the rim. #5 fades out to the right wing.",
        moves: {
          3: [[0.45, 540, 162], [1.2, 430, 112], [1.7, 350, 100]],
          X3: [[0.5, 514, 228], [0.9, 505, 240], [1.8, 405, 150]],
          5: [[0.9, 484, 196], [1.9, 572, 212]],
          X5: [[1.0, 452, 170], [1.9, 536, 188]]
        },
        trails: [{ t0: 0, t1: 1.7, kind: "cut", pts: [[572, 212], [540, 162], [430, 112], [362, 102]] }, { t0: 0.9, t1: 1.9, kind: "cut", pts: [[484, 196], [548, 206]] }],
        next: "read"
      },
      read: {
        dur: 0, caption: "<b>Decision:</b> #4, look at #3 on the cut. Is she open?",
        decision: { question: "Is #3 open on the cut?", hint: "Open = her defender (X3) is behind her. Covered = X3 is between her and the ball.", yes: "hit", no: "c0_pre" }
      },
      /* ---- YES: hit the cutter ---- */
      hit: {
        dur: 1.0, caption: "<b>Yes!</b> #4 hits #3 on the cut — X3 is behind her.",
        moves: { X3: [[1.0, 404, 138]] },
        ball: [{ t0: 0, t1: 0.75, from: "4", to: "3" }],
        trails: [{ t0: 0, t1: 0.75, kind: "pass", pts: [[234, 403], [342, 116]] }],
        next: "score"
      },
      score: {
        dur: 1.2, caption: "<b>Score!</b> #3 finishes the layup. Sprint back on defense!", score: 0.85,
        moves: { 3: [[0.4, 336, 84]] },
        ball: [{ t0: 0, t1: 0.4, hold: "3" }, { t0: 0.4, t1: 0.85, from: "3", toXY: [325, 68] }]
      },
    },
    list: [
      { id: "setup", html: "<b>Set up.</b> Two-guard front. #1 has the ball." },
      { id: "pass", html: "<b>1.</b> #1 passes to #4. #5 screens for #3." },
      { id: "cut", html: "<b>2.</b> #3 cuts to the rim. #5 fades to the wing." },
      { id: "read", html: "<b>Decision:</b> Is #3 open?" },
      { branch: "If YES" },
      { id: "hit", html: "<b>3.</b> #4 passes to #3." },
      { id: "score", html: "<b>4.</b> #3 scores the layup." },
      { branch: "If NO — keep the motion going" },
      { id: "c0_a1", html: "<b>3.</b> Ball guard holds. Other guard screens for the wing on her side. Cutter goes to the ball-side block." },
      { id: "c0_a2", html: "<b>4.</b> Wing cuts up to the guard spot; the screener fills the wing." },
      { id: "c0_b", html: "<b>5.</b> Reverse the ball to the new guard." },
      { id: "c0_c1", html: "<b>6.</b> Block player screens for the weak-side wing." },
      { id: "c0_c2", html: "<b>7.</b> Wing cuts across to the basket; the screener fills the wing." },
      { id: "c0_d", html: "<b>Decision:</b> Is the cutter open? Yes → pass and score. No → repeat on the other side." }
    ]
  },

  /* ===================== BANANA SPLIT (baseline out of bounds) ===================== */
  "banana-split": {
    title: "Banana Split",
    sub: "Box set under our basket. #2 and #3 split to the corners, #4 screens for #5, and #5 curls to the rim.",
    tips: ["#1: slap the ball to start. Look at #5, then #4, then the corner.", "You have 5 seconds to pass it in!", "#4: screen X5 and hold it. Then dive to the rim.", "#5: wait for the screen. Curl tight around #4.", "#2 and #3: sprint to the corners."],
    oob: true,
    start: {
      off: { 1: [214, -26], 2: [440, 95], 3: [210, 95], 4: [228, 262], 5: [422, 262] },
      def: { X1: [236, 24], X2: [398, 128], X3: [252, 128], X4: [262, 226], X5: [390, 226] },
      ball: "1"
    },
    first: "setup",
    phases: {
      setup: { dur: 0.9, caption: "<b>Set up — Box.</b> #1 inbounds on the baseline. #3 and #2 on the blocks, #4 and #5 at the elbows.", next: "split" },
      split: {
        dur: 1.2, clearTrails: true, caption: "<b>1. Banana split!</b> #3 and #2 sprint out to the corners.",
        moves: { 3: [[1.1, 34, 100]], 2: [[1.1, 616, 100]], X3: [[1.2, 78, 124]], X2: [[1.2, 572, 124]] },
        trails: [{ t0: 0, t1: 1.1, kind: "cut", pts: [[210, 95], [52, 98]] }, { t0: 0, t1: 1.1, kind: "cut", pts: [[440, 95], [598, 98]] }],
        next: "screen"
      },
      screen: {
        dur: 1.0, caption: "<b>2.</b> #4 runs across and sets a screen on #5's defender at the right elbow.",
        moves: { 4: [[1.0, 384, 270]], X4: [[1.0, 330, 236]] },
        trails: [{ t0: 0, t1: 1.0, kind: "screen", pts: [[228, 262], [370, 266]] }],
        next: "curl"
      },
      curl: {
        dur: 1.5, caption: "<b>3.</b> #5 curls tight around #4's screen and into the lane toward the rim.",
        moves: { 5: [[0.4, 402, 312], [0.8, 330, 312], [1.2, 300, 220], [1.5, 296, 132]], X5: [[0.5, 404, 252], [1.5, 380, 236]] },
        trails: [{ t0: 0, t1: 1.5, kind: "cut", pts: [[422, 262], [402, 312], [330, 312], [300, 220], [296, 148]] }],
        next: "read5"
      },
      read5: {
        dur: 0, caption: "<b>Decision:</b> #1, look at #5 on the curl.",
        decision: { question: "Is #5 open on the curl?", hint: "Open = X5 got stuck on #4's screen and is behind her.", yes: "pass5", no: "dive" }
      },
      pass5: {
        dur: 0.9, caption: "<b>Yes!</b> #1 passes to #5 in the lane.",
        ball: [{ t0: 0, t1: 0.7, from: "1", to: "5" }],
        trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [302, 120]] }],
        next: "score5"
      },
      score5: {
        dur: 1.2, caption: "<b>Score!</b> #5 finishes at the rim.", score: 0.85,
        moves: { 5: [[0.4, 312, 92]] },
        ball: [{ t0: 0, t1: 0.4, hold: "5" }, { t0: 0.4, t1: 0.85, from: "5", toXY: [325, 68] }]
      },
      dive: {
        dur: 1.1, caption: "<b>4. Covered.</b> X5 fought through. Now #4 — the screener — dives straight up the lane line to the rim.",
        moves: { 4: [[1.1, 400, 112]], X4: [[1.1, 352, 190]], X5: [[0.6, 330, 170], [1.1, 300, 160]] },
        trails: [{ t0: 0, t1: 1.1, kind: "cut", pts: [[384, 270], [400, 128]] }],
        next: "read4"
      },
      read4: {
        dur: 0, caption: "<b>Decision:</b> #1, look at #4 on the dive.",
        decision: { question: "Is #4 open on the dive?", hint: "X4 helped on #5 — is #4 sealed behind her, near the rim?", yes: "pass4", no: "safety" }
      },
      pass4: {
        dur: 0.9, caption: "<b>Yes!</b> #1 hits #4 on the dive.",
        ball: [{ t0: 0, t1: 0.7, from: "1", to: "4" }],
        trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [404, 100]] }],
        next: "score4"
      },
      score4: {
        dur: 1.2, caption: "<b>Score!</b> #4 lays it in.", score: 0.85,
        moves: { 4: [[0.4, 350, 84]] },
        ball: [{ t0: 0, t1: 0.4, hold: "4" }, { t0: 0.4, t1: 0.85, from: "4", toXY: [325, 68] }]
      },
      safety: {
        dur: 1.2, caption: "<b>5. Safety.</b> Both covered — no problem. #1 passes to #2 in the corner (before 5 seconds!), steps in, and we run our offense.",
        moves: { 1: [[1.2, 300, 40]], X2: [[1.0, 590, 150]] },
        ball: [{ t0: 0, t1: 0.7, from: "1", to: "2" }],
        trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [604, 84]] }]
      }
    },
    list: [
      { id: "setup", html: "<b>Set up.</b> Box: #3 &amp; #2 on the blocks, #4 &amp; #5 at the elbows." },
      { id: "split", html: "<b>1.</b> #3 and #2 split to the corners." },
      { id: "screen", html: "<b>2.</b> #4 screens for #5." },
      { id: "curl", html: "<b>3.</b> #5 curls to the rim." },
      { id: "read5", html: "<b>Decision:</b> Is #5 open?" },
      { branch: "If YES" },
      { id: "pass5", html: "Pass to #5." },
      { id: "score5", html: "#5 scores." },
      { branch: "If NO" },
      { id: "dive", html: "<b>4.</b> #4 dives to the rim." },
      { id: "read4", html: "<b>Decision:</b> Is #4 open?" },
      { id: "pass4", html: "Yes → pass to #4, #4 scores." },
      { id: "safety", html: "No → safe pass to #2 in the corner." }
    ]
  }
};

/* ---- Motion: build the "No" branch. It repeats forever, switching sides each time.
   Roles: bh = guard with the ball, og = other guard, cw = wing on the side the cutter came from,
   ow = wing on the ball side, cut = covered cutter in the lane. Coordinates are written for the
   ball on the LEFT and mirrored when the ball is on the right. ---- */
(function () {
  const P = window.TEMPO_PLAYS["screen-cut"];
  const BASKET = [325, 68];
  let roles = { bh: "4", og: "1", cw: "5", ow: "2", cut: "3" }, left = true;
  const CYCLES = 10; // after 10 cycles everyone is back where they started, so it loops forever
  const mx = (x) => (left ? x : 650 - x);
  const keys = (ks) => ks.map(([t, x, y]) => [t, mx(x), y]);
  const pts = (ps) => ps.map(([x, y]) => [mx(x), y]);
  const D = (id) => "X" + id;
  function defend(moves, dur) {   // each defender shadows her player, a step toward the basket
    const out = {};
    Object.entries(moves).forEach(([id, ks]) => {
      out[D(id)] = ks.map(([t, x, y]) => [Math.min(dur, t + 0.15), x + (BASKET[0] - x) * 0.16, y + (BASKET[1] - y) * 0.16]);
    });
    return { ...moves, ...out };
  }
  for (let c = 0; c < CYCLES; c++) {
    const r = roles, n = (k) => "#" + r[k], id = (k) => `c${c}_${k}`;
    const L = left ? "left" : "right", R = left ? "right" : "left";
    const nextStart = c === CYCLES - 1 ? "c0_pre" : `c${c + 1}_pre`;
    const ph = {};
    let m;
    ph.pre = { dur: 0.01, hold: true, listId: "c0_a1", clearTrails: true, focus: [r.og, r.cw],
      caption: `<b>Covered — keep the motion going.</b> Watch the ${R} side: ${n("og")} (${R} guard) is about to screen for ${n("cw")} (${R} wing). Tap <b>Next step</b>.`,
      next: id("a1") };
    m = { [r.cut]: keys([[0.8, 232, 104]]), [r.og]: keys([[1.0, 522, 250]]) };
    ph.a1 = { dur: 1.1, listId: "c0_a1", clearTrails: true,
      caption: `<b>No pass.</b> ${n("bh")} (${L} guard) holds the ball. ${n("og")} (${R} guard) screens for ${n("cw")} (${R} wing). ${n("cut")} goes to the ${L} block — the ball side.`,
      moves: defend(m, 1.1),
      trails: [{ t0: 0, t1: 0.8, kind: "cut", pts: pts([[350, 100], [256, 104]]) }, { t0: 0, t1: 1.0, kind: "screen", pts: pts([[416, 403], [509, 268]]) }],
      next: id("a2") };
    m = { [r.cw]: keys([[0.5, 598, 300], [1.3, 416, 403]]), [r.og]: keys([[0.6, 522, 250], [1.3, 572, 212]]) };
    ph.a2 = { dur: 1.3, listId: "c0_a2",
      caption: `${n("cw")} cuts off the screen up to the ${R} guard spot. ${n("og")} fills the ${R} wing.`,
      moves: defend(m, 1.3),
      trails: [{ t0: 0, t1: 1.3, kind: "cut", pts: pts([[572, 212], [598, 300], [430, 396]]) }, { t0: 0.6, t1: 1.3, kind: "cut", pts: pts([[522, 250], [560, 222]]) }],
      next: id("b") };
    ph.b = { dur: 0.8, listId: "c0_b",
      caption: `<b>Reverse it!</b> ${n("bh")} passes to ${n("cw")}, the new ${R} guard. Now the ${L} side is the weak side.`,
      ball: [{ t0: 0, t1: 0.6, from: r.bh, to: r.cw }],
      trails: [{ t0: 0, t1: 0.6, kind: "pass", pts: pts([[249, 388], [431, 388]]) }],
      next: id("c1") };
    m = { [r.cut]: keys([[1.0, 150, 196]]) };
    ph.c1 = { dur: 1.0, listId: "c0_c1",
      caption: `${n("cut")} steps up from the ${L} block and screens for ${n("ow")} (${L} wing).`,
      moves: defend(m, 1.0),
      trails: [{ t0: 0, t1: 1.0, kind: "screen", pts: pts([[232, 104], [158, 184]]) }],
      next: id("c2") };
    m = { [r.ow]: keys([[0.45, 120, 160], [1.2, 222, 112], [1.7, 300, 100]]), [r.cut]: keys([[0.9, 150, 196], [1.9, 82, 216]]) };
    ph.c2 = { dur: 1.9, listId: "c0_c2",
      caption: `${n("ow")} cuts across to the basket looking for the ball. ${n("cut")} fills the ${L} wing.`,
      moves: { ...defend(m, 1.9), [D(r.ow)]: keys([[0.6, 128, 230], [1.1, 170, 190], [1.9, 322, 146]]) },
      trails: [{ t0: 0, t1: 1.7, kind: "cut", pts: pts([[78, 212], [120, 160], [222, 112], [288, 102]]) }, { t0: 0.9, t1: 1.9, kind: "cut", pts: pts([[150, 196], [96, 212]]) }],
      next: id("d") };
    ph.d = { dur: 0, listId: "c0_d", caption: `<b>Decision:</b> ${n("cw")}, look at ${n("ow")} on the cut. Is she open?`,
      decision: { question: `Is ${n("ow")} open on the cut?`, hint: "Open = her defender is behind her. Covered = her defender is between her and the ball.", yes: id("yes"), no: nextStart } };
    ph.yes = { dur: 1.0, listId: "hit", caption: `<b>Yes!</b> ${n("cw")} hits ${n("ow")} on the cut.`,
      ball: [{ t0: 0, t1: 0.75, from: r.cw, to: r.ow }],
      trails: [{ t0: 0, t1: 0.75, kind: "pass", pts: pts([[431, 388], [312, 88]]) }], next: id("score") };
    ph.score = { dur: 1.2, listId: "score", caption: `<b>Score!</b> ${n("ow")} finishes the layup. Sprint back on defense!`, score: 0.85,
      moves: { [r.ow]: keys([[0.4, 314, 84]]) },
      ball: [{ t0: 0, t1: 0.4, hold: r.ow }, { t0: 0.4, t1: 0.85, from: r.ow, toXY: [325, 68] }] };
    Object.entries(ph).forEach(([k, v]) => { P.phases[id(k)] = v; });
    roles = { bh: r.cw, og: r.bh, cw: r.cut, ow: r.og, cut: r.ow };
    left = !left;
  }
})();
