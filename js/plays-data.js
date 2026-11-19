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

/* ===================== SCRAMBLE (baseline out of bounds) =====================
   #1 inbounds on the left baseline. #2–#5 stand in a circle around the free-throw line:
   #2 front-left, #3 back-left, #4 front-right, #5 back-right. */
window.TEMPO_PLAYS["scramble"] = {
  title: "Scramble",
  sub: "Circle set at the free-throw line. #2 circles around the group to screen X4, #4 cuts to the basket, then #4 screens for #5. Three looks at the rim.",
  tips: ["#1: slap the ball to start. Look at #4, then #5, then #4 again.", "You have 5 seconds to pass it in!", "#2: run your circle wide and fast — leave your defender behind — then screen the outside of X4.", "Screeners (#2, #4): wide stance, hold still.", "#5: wait for the screen, then cut shoulder-to-shoulder past it.", "#2 is the safety pass on the ball side."],
  oob: true,
  start: {
    off: { 1: [214, -26], 2: [272, 178], 3: [272, 262], 4: [378, 178], 5: [378, 262] },
    def: { X1: [236, 24], X2: [278, 150], X3: [282, 232], X4: [372, 150], X5: [368, 232] },
    ball: "1"
  },
  first: "setup",
  phases: {
    setup: { dur: 0.9, caption: "<b>Set up — Circle.</b> #1 inbounds. #2, #3, #4 and #5 make a circle around the free-throw line.", next: "circle2" },
    circle2: {
      dur: 2.8, clearTrails: true,
      caption: "<b>1.</b> #2 runs a big circle around her teammates — down the left side, behind #3 and #5, up the right side — and sets a screen on the OUTSIDE of #4's defender (X4). X2 gets left behind!",
      moves: {
        2: [[0.35, 226, 196], [0.75, 200, 246], [1.1, 204, 302], [1.45, 246, 338], [1.8, 330, 348], [2.1, 428, 326], [2.35, 478, 272], [2.55, 470, 214], [2.8, 414, 146]],
        X2: [[0.6, 262, 196], [1.4, 268, 210], [2.8, 316, 200]]
      },
      trails: [{ t0: 0, t1: 2.8, kind: "screen", pts: [[272, 178], [226, 196], [200, 246], [204, 302], [246, 338], [330, 348], [428, 326], [478, 272], [470, 214], [418, 150]] }],
      next: "cut4"
    },
    cut4: {
      dur: 1.2, caption: "<b>2.</b> #4 cuts to the basket off #2's screen, looking for a shot. X4 is stuck behind #2!",
      moves: { 4: [[0.5, 352, 140], [1.2, 308, 102]], X4: [[1.2, 364, 152]] },
      trails: [{ t0: 0, t1: 1.2, kind: "cut", pts: [[378, 178], [352, 140], [314, 108]] }],
      next: "read4a"
    },
    read4a: {
      dur: 0, caption: "<b>Decision:</b> #1, look at #4 coming to the basket.",
      decision: { question: "Is #4 open for a shot?", hint: "Open = X4 got stuck on #2's screen and is still behind her.", yes: "pass4a", no: "pop" }
    },
    pass4a: { dur: 0.9, caption: "<b>Yes!</b> #1 passes to #4.", ball: [{ t0: 0, t1: 0.7, from: "1", to: "4" }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [284, 98]] }], next: "score4a" },
    score4a: { dur: 1.2, caption: "<b>Score!</b> #4 catches and shoots.", score: 0.85, moves: { 4: [[0.4, 306, 84]] },
      ball: [{ t0: 0, t1: 0.4, hold: "4" }, { t0: 0.4, t1: 0.85, from: "4", toXY: [325, 68] }] },
    pop: {
      dur: 1.6, caption: "<b>3. Covered.</b> #2 pops out to the 3-point line on the ball side. #3 pops out to the 3-point line on the weak side.",
      moves: { 2: [[0.7, 300, 176], [1.5, 96, 214]], X2: [[0.7, 262, 160], [1.6, 132, 206]], 3: [[0.6, 330, 236], [1.6, 600, 150]], X3: [[0.7, 336, 214], [1.6, 560, 168]],
        4: [[1.4, 300, 128]], X4: [[1.4, 300, 168]] },
      trails: [{ t0: 0, t1: 1.5, kind: "cut", pts: [[414, 146], [300, 176], [110, 214]] }, { t0: 0, t1: 1.6, kind: "cut", pts: [[272, 262], [330, 236], [588, 152]] }],
      next: "screen45"
    },
    screen45: {
      dur: 1.1, caption: "<b>4.</b> #4 comes back up and sets a screen on #5's defender.",
      moves: { 4: [[1.1, 380, 222]], X4: [[1.1, 362, 176]] },
      trails: [{ t0: 0, t1: 1.1, kind: "screen", pts: [[300, 128], [376, 214]] }],
      next: "cut5"
    },
    cut5: {
      dur: 1.6, caption: "<b>5.</b> #5 cuts around #4's screen toward the basket, looking for the pass.",
      moves: { 5: [[0.4, 428, 240], [0.9, 414, 160], [1.5, 354, 104]], X5: [[0.6, 382, 228], [1.6, 340, 168]] },
      trails: [{ t0: 0, t1: 1.5, kind: "cut", pts: [[378, 262], [428, 240], [414, 160], [360, 110]] }],
      next: "read5"
    },
    read5: {
      dur: 0, caption: "<b>Decision:</b> #1, look at #5 cutting to the basket.",
      decision: { question: "Is #5 open on the cut?", hint: "Open = X5 got stuck on #4's screen and is behind her.", yes: "pass5", no: "dive4" }
    },
    pass5: { dur: 0.9, caption: "<b>Yes!</b> #1 passes to #5.", ball: [{ t0: 0, t1: 0.7, from: "1", to: "5" }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [350, 96]] }], next: "score5" },
    score5: { dur: 1.2, caption: "<b>Score!</b> #5 finishes at the rim.", score: 0.85, moves: { 5: [[0.4, 340, 86]] },
      ball: [{ t0: 0, t1: 0.4, hold: "5" }, { t0: 0.4, t1: 0.85, from: "5", toXY: [325, 68] }] },
    dive4: {
      dur: 1.2, caption: "<b>6. Last look.</b> X4 helped on #5. #4 — the screener — cuts straight to the basket.",
      moves: { 4: [[1.2, 388, 104]], X4: [[1.2, 372, 186]], X5: [[0.6, 330, 150], [1.2, 300, 150]] },
      trails: [{ t0: 0, t1: 1.2, kind: "cut", pts: [[380, 222], [388, 118]] }],
      next: "read4"
    },
    read4: {
      dur: 0, caption: "<b>Decision:</b> #1, look at #4 on the cut.",
      decision: { question: "Is #4 open on the cut?", hint: "Is #4 sealed behind X4, close to the rim?", yes: "pass4", no: "safety" }
    },
    pass4: { dur: 0.9, caption: "<b>Yes!</b> #1 hits #4.", ball: [{ t0: 0, t1: 0.7, from: "1", to: "4" }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [384, 92]] }], next: "score4" },
    score4: { dur: 1.2, caption: "<b>Score!</b> #4 lays it in.", score: 0.85, moves: { 4: [[0.4, 350, 82]] },
      ball: [{ t0: 0, t1: 0.4, hold: "4" }, { t0: 0.4, t1: 0.85, from: "4", toXY: [325, 68] }] },
    safety: {
      dur: 1.3, caption: "<b>7. Safety.</b> All covered — no problem. #1 passes to #2 on the ball-side 3-point line (before 5 seconds!), steps in, and we run our offense.",
      moves: { 1: [[1.3, 230, 60]], X2: [[1.0, 120, 236]] },
      ball: [{ t0: 0, t1: 0.7, from: "1", to: "2" }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [[226, -36], [104, 204]] }]
    }
  },
  list: [
    { id: "setup", html: "<b>Set up.</b> Circle around the free-throw line." },
    { id: "circle2", html: "<b>1.</b> #2 runs a circle around her teammates and screens the outside of #4's defender." },
    { id: "cut4", html: "<b>2.</b> #4 cuts to the basket for a shot." },
    { id: "read4a", html: "<b>Decision:</b> Is #4 open? Yes → pass, #4 scores." },
    { branch: "If NO" },
    { id: "pop", html: "<b>3.</b> #2 pops to the ball side, #3 to the weak side (3-point line)." },
    { id: "screen45", html: "<b>4.</b> #4 screens for #5." },
    { id: "cut5", html: "<b>5.</b> #5 cuts to the basket." },
    { id: "read5", html: "<b>Decision:</b> Is #5 open? Yes → pass, #5 scores." },
    { branch: "If NO" },
    { id: "dive4", html: "<b>6.</b> #4 cuts to the basket." },
    { id: "read4", html: "<b>Decision:</b> Is #4 open? Yes → pass, #4 scores." },
    { id: "safety", html: "No → safe pass to #2." }
  ]
};
// "Yes" branches of the decisions highlight their decision row in the steps list.
["pass4a", "score4a"].forEach((k) => (window.TEMPO_PLAYS.scramble.phases[k].listId = "read4a"));
["pass5", "score5"].forEach((k) => (window.TEMPO_PLAYS.scramble.phases[k].listId = "read5"));
["pass4", "score4"].forEach((k) => (window.TEMPO_PLAYS.scramble.phases[k].listId = "read4"));

/* ===================== 4-OUT MOTION =====================
   Four players spread on the perimeter (two guards, two wings), #5 on a block.
   Every cycle: swing the ball to the other guard; the passer screens away for her wing;
   the wing cuts to the basket (read), then fills the guard spot while the screener
   pops to the wing. #5 rotates to the ball-side block. The next cycle runs the other way. */
(function () {
  const SPOT = { tl: [232, 400], tr: [418, 400], lw: [86, 214], rw: [564, 214], lb: [238, 112], rb: [412, 112] };
  const BASKET = [325, 68];
  const play = {
    title: "4-Out Motion",
    sub: "Four out, one in. Pass, screen away, cut, fill. #5 follows the ball block to block.",
    tips: ["Spacing: stay 12–15 feet apart on the 3-point line.", "Pass, then screen AWAY from the ball.", "Cutter: wait for the screen, go around the OUTSIDE of the screener, then cut hard to the basket and fill the open spot.", "#5: always move to the block on the ball side.", "Never force it — swing the ball and run it again."],
    start: {
      off: { 1: SPOT.tl, 2: SPOT.tr, 3: SPOT.lw, 4: SPOT.rw, 5: SPOT.lb },
      def: {}, ball: "1"
    },
    first: "setup",
    phases: { setup: { dur: 0.9, caption: "<b>Set up — 4 out.</b> #1 and #2 at the top, #3 and #4 on the wings, #5 on the left block.", next: "c0_a" } },
    list: [
      { id: "setup", html: "<b>Set up.</b> Four out, #5 on the block." },
      { id: "c0_a", html: "<b>1.</b> Swing: pass to the other guard. #5 moves to the ball-side block." },
      { id: "c0_b", html: "<b>2.</b> The passer screens away for her wing." },
      { id: "c0_c", html: "<b>3.</b> The wing runs around the outside of the screen, then cuts to the basket." },
      { id: "c0_d", html: "<b>Decision:</b> Is the cutter open? Yes → pass and score." },
      { branch: "If NO" },
      { id: "c0_e", html: "<b>4.</b> Cutter fills the guard spot, screener pops to the wing — then run it the other way." }
    ]
  };
  const toward = ([x, y], k) => [x + (BASKET[0] - x) * k, y + (BASKET[1] - y) * k];
  const postD = ([x, y]) => [x + (BASKET[0] - x) * 0.45, y + 34];   // #5's defender: inside and a step up, so both stay visible
  Object.entries(play.start.off).forEach(([id, p]) => { play.start.def["X" + id] = id === "5" ? postD(p) : toward(p, 0.18); });

  let roles = { bh: "1", rec: "2", cw: "3", far: "4", c: "5" }, left = true;
  const start = JSON.stringify(roles);
  let c = 0;
  do {
    const r = roles, n = (k) => "#" + r[k], id = (k) => `c${c}_${k}`;
    const mx = (x) => (left ? x : 650 - x), P = ([x, y]) => [mx(x), y];
    const K = (ks) => ks.map(([t, x, y]) => [t, mx(x), y]);
    const D = (moves, dur) => {   // defenders shadow a step toward the basket
      const out = {};
      Object.entries(moves).forEach(([pid, ks]) => { out["X" + pid] = ks.map(([t, x, y]) => [Math.min(dur, t + 0.15), ...(pid === r.c ? postD([x, y]) : toward([x, y], 0.18))]); });
      return { ...moves, ...out };
    };
    const S = (name) => (left ? name : { left: "right", right: "left" }[name]);
    const next = (k) => id(k);
    const ph = {};
    ph.a = { dur: 1.2, clearTrails: true, listId: "c0_a",
      caption: `<b>Swing.</b> ${n("bh")} passes to ${n("rec")}. ${n("c")} slides to the ${S("right")} block — the ball side.`,
      moves: D({ [r.c]: K([[1.2, 412, 112]]) }, 1.2),
      ball: [{ t0: 0, t1: 0.7, from: r.bh, to: r.rec }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [P([246, 388]), P([404, 388])] }, { t0: 0, t1: 1.2, kind: "cut", pts: [P([238, 112]), P([400, 112])] }],
      next: next("b") };
    ph.b = { dur: 1.0, listId: "c0_b",
      caption: `<b>Screen away.</b> ${n("bh")} — who just passed — screens for ${n("cw")} on the ${S("left")} wing.`,
      moves: D({ [r.bh]: K([[1.0, 150, 290]]) }, 1.0),
      trails: [{ t0: 0, t1: 1.0, kind: "screen", pts: [P([232, 400]), P([158, 300])] }],
      next: next("c") };
    ph.c = { dur: 2.0, listId: "c0_c",
      caption: `<b>Cut!</b> ${n("cw")} runs around the outside of ${n("bh")}'s screen, then cuts to the basket looking for the ball.`,
      moves: { ...D({ [r.cw]: K([[0.35, 104, 282], [0.75, 150, 338], [1.1, 204, 306], [1.5, 248, 206], [2.0, 296, 104]]) }, 2.0),
               ["X" + r.cw]: K([[0.4, 110, 250], [1.0, 128, 268], [2.0, 214, 214]]) },
      trails: [{ t0: 0, t1: 2.0, kind: "cut", pts: [P([86, 214]), P([104, 282]), P([150, 338]), P([204, 306]), P([248, 206]), P([290, 110])] }],
      next: next("d") };
    ph.d = { dur: 0, listId: "c0_d", caption: `<b>Decision:</b> ${n("rec")}, look at ${n("cw")} on the cut. Is she open?`,
      decision: { question: `Is ${n("cw")} open on the cut?`, hint: "Open = her defender is behind her. Covered = her defender is between her and the ball.", yes: next("yes"), no: next("e") } };
    ph.yes = { dur: 0.9, listId: "c0_d", caption: `<b>Yes!</b> ${n("rec")} passes to ${n("cw")}.`,
      ball: [{ t0: 0, t1: 0.7, from: r.rec, to: r.cw }],
      trails: [{ t0: 0, t1: 0.7, kind: "pass", pts: [P([404, 388]), P([300, 98])] }], next: next("score") };
    ph.score = { dur: 1.2, listId: "c0_d", caption: `<b>Score!</b> ${n("cw")} lays it in. Sprint back on defense!`, score: 0.85,
      moves: { [r.cw]: K([[0.4, 312, 86]]) },
      ball: [{ t0: 0, t1: 0.4, hold: r.cw }, { t0: 0.4, t1: 0.85, from: r.cw, toXY: [325, 68] }] };
    ph.e = { dur: 1.6, listId: "c0_e",
      caption: `<b>Covered — fill the spots.</b> ${n("cw")} comes out to the ${S("left")} guard spot. ${n("bh")} pops out to the ${S("left")} wing. Now run it the other way!`,
      moves: D({ [r.cw]: K([[0.7, 268, 230], [1.6, 232, 400]]), [r.bh]: K([[1.4, 86, 214]]) }, 1.6),
      trails: [{ t0: 0, t1: 1.6, kind: "cut", pts: [P([296, 104]), P([268, 230]), P([236, 386])] }, { t0: 0, t1: 1.4, kind: "cut", pts: [P([150, 290]), P([98, 222])] }],
      next: null };
    const keysOf = Object.keys(ph);
    keysOf.forEach((k) => { play.phases[id(k)] = ph[k]; });
    // New roles, seen from the other side of the floor next time.
    roles = { bh: r.rec, rec: r.cw, cw: r.far, far: r.bh, c: r.c };
    left = !left; c++;
  } while ((JSON.stringify(roles) !== start || !left) && c < 40);
  const CYC = c;
  for (let i = 0; i < CYC; i++) play.phases[`c${i}_e`].next = `c${(i + 1) % CYC}_a`;
  window.TEMPO_PLAYS["four-out"] = play;
})();
