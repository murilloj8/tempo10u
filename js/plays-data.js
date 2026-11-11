/* Tempo playbook data for the play viewer (js/play-engine.js).
   Court: 650 x 611, basket at the top, baseline at y = 0.
   moves: { player: [[time, x, y], ...] } — times are seconds inside that step. */
window.TEMPO_PLAYS = {
  /* ===================== PLAY 1: SCREEN & CUT (with read) ===================== */
  "screen-cut": {
    title: "Motion",
    sub: "Two-guard front vs. man-to-man. #3 cuts off #5's screen — read it: is she open?",
    tips: "#5: set the screen with a wide, still base — no moving screens. #3: wait for the screen, then cut shoulder-to-shoulder past it. #4: <b>read the defense</b> — if X3 is behind #3, pass. If X3 is between #3 and the ball, don't force it: hold the ball, reverse it to the top, and run the weak-side screen. Still covered? Run Motion again — patience creates the open look.",
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
        decision: { question: "Is #3 open on the cut?", hint: "Open = her defender (X3) is behind her. Covered = X3 is between her and the ball.", yes: "hit", no: "denied" }
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
      /* ---- NO: screen the screener and reset ---- */
      denied: {
        dur: 0.9, caption: "<b>No pass.</b> X3 is denying. #4 holds the ball (be patient!) and #3 clears to the left block.",
        moves: { 3: [[0.8, 232, 104]], X3: [[0.4, 380, 132], [0.9, 262, 140]] },
        trails: [{ t0: 0, t1: 0.8, kind: "cut", pts: [[350, 100], [256, 104]] }],
        next: "screener"
      },
      screener: {
        dur: 1.0, caption: "<b>Option:</b> #1 leaves the top and sets a screen for #5 on the right side.",
        moves: { 1: [[1.0, 522, 250]], X1: [[1.0, 440, 300]], X5: [[1.0, 505, 185]] },
        trails: [{ t0: 0, t1: 1.0, kind: "screen", pts: [[416, 403], [509, 268]] }],
        next: "toTop"
      },
      toTop: {
        dur: 1.1, caption: "#5 cuts off #1's screen up to the top — #1's old spot.",
        moves: { 5: [[0.5, 598, 300], [1.1, 440, 400]], X5: [[0.5, 552, 220], [0.8, 590, 290], [1.1, 470, 360]] },
        trails: [{ t0: 0, t1: 1.1, kind: "cut", pts: [[572, 212], [598, 300], [458, 392]] }],
        next: "fade"
      },
      fade: {
        dur: 0.8, caption: "#1 fades out to the right wing — #5's old spot.",
        moves: { 1: [[0.7, 572, 212]], X1: [[0.8, 535, 240]] },
        trails: [{ t0: 0, t1: 0.7, kind: "cut", pts: [[522, 250], [556, 224]] }],
        next: "swing"
      },
      swing: {
        dur: 0.8, caption: "<b>Reverse it!</b> #4 swings the ball to #5, who just came up to the top. The ball is on the right now — the left is the <b>weak side</b>.",
        ball: [{ t0: 0, t1: 0.6, from: "4", to: "5" }],
        trails: [{ t0: 0, t1: 0.6, kind: "pass", pts: [[249, 388], [432, 390]] }],
        next: "weakScreen"
      },
      weakScreen: {
        dur: 1.0, caption: "<b>Weak-side screen:</b> #3 steps up from the left block and sets a screen on #2's defender.",
        moves: { 3: [[1.0, 150, 196]], X3: [[1.0, 196, 168]], X2: [[0.6, 128, 252], [1.0, 124, 236]] },
        trails: [{ t0: 0, t1: 1.0, kind: "screen", pts: [[232, 104], [158, 184]] }],
        next: "crossCut"
      },
      crossCut: {
        dur: 1.9, caption: "#2 cuts off #3's screen, across the lane toward the rim. #3 fades out to the left wing — #2's old spot.",
        moves: {
          2: [[0.45, 120, 160], [1.2, 222, 112], [1.7, 300, 100]],
          X2: [[0.6, 138, 222], [1.0, 150, 214], [1.8, 240, 150]],
          3: [[0.9, 150, 196], [1.9, 82, 216]],
          X3: [[1.0, 196, 170], [1.9, 118, 196]]
        },
        trails: [{ t0: 0, t1: 1.7, kind: "cut", pts: [[78, 212], [120, 160], [222, 112], [288, 102]] }, { t0: 0.9, t1: 1.9, kind: "cut", pts: [[150, 196], [96, 212]] }],
        next: "read2"
      },
      read2: {
        dur: 0, caption: "<b>Decision:</b> #5, look at #2 on the cut. Is she open?",
        decision: { question: "Is #2 open on the cut?", hint: "Open = X2 got stuck on #3's screen and is behind her.", yes: "hit2", no: "reset" }
      },
      hit2: {
        dur: 1.0, caption: "<b>Yes!</b> #5 hits #2 on the cut.",
        ball: [{ t0: 0, t1: 0.75, from: "5", to: "2" }],
        trails: [{ t0: 0, t1: 0.75, kind: "pass", pts: [[455, 385], [312, 88]] }],
        next: "score2"
      },
      score2: {
        dur: 1.2, caption: "<b>Score!</b> #2 finishes the layup. Sprint back on defense!", score: 0.85,
        moves: { 2: [[0.4, 314, 84]] },
        ball: [{ t0: 0, t1: 0.4, hold: "2" }, { t0: 0.4, t1: 0.85, from: "2", toXY: [325, 68] }]
      },
      reset: {
        dur: 2.0, caption: "<b>Still covered? Run Motion again!</b> #5 gives the ball to #1 and everyone goes back to their starting spot.",
        moves: {
          1: [[0.9, 416, 403]], 5: [[0.8, 452, 330], [2.0, 436, 104]], 2: [[1.6, 78, 212]], 3: [[2.0, 572, 212]],
          X1: [[1.0, 397, 351]], X2: [[1.6, 167, 202]], X3: [[2.0, 522, 227]], X4: [[1.2, 247, 352]], X5: [[2.0, 410, 150]]
        },
        ball: [{ t0: 0, t1: 0.9, hold: "5" }, { t0: 0.9, t1: 1.3, from: "5", to: "1" }],
        next: "pass"
      }
    },
    list: [
      { id: "setup", html: "<b>Set up.</b> Two-guard front. #1 has the ball." },
      { id: "pass", html: "<b>1.</b> #1 passes to #4. #5 screens for #3." },
      { id: "cut", html: "<b>2.</b> #3 cuts to the rim. #5 fades to the wing." },
      { id: "read", html: "<b>Decision:</b> Is #3 open?" },
      { branch: "If YES" },
      { id: "hit", html: "<b>3.</b> #4 passes to #3." },
      { id: "score", html: "<b>4.</b> #3 scores the layup." },
      { branch: "If NO — screen the screener" },
      { id: "denied", html: "<b>3.</b> #4 holds it. #3 clears to the left block." },
      { id: "screener", html: "<b>4.</b> #1 screens for #5." },
      { id: "toTop", html: "<b>5.</b> #5 cuts to the top." },
      { id: "fade", html: "<b>6.</b> #1 fades to the wing." },
      { id: "swing", html: "<b>7.</b> #4 reverses the ball to #5 at the top." },
      { id: "weakScreen", html: "<b>8.</b> #3 (weak-side block) screens for #2." },
      { id: "crossCut", html: "<b>9.</b> #2 cuts across to the rim. #3 fades to the wing." },
      { id: "read2", html: "<b>Decision:</b> Is #2 open?" },
      { id: "hit2", html: "Yes → #5 passes to #2, #2 scores." },
      { id: "reset", html: "No → reset and run Motion again." }
    ]
  },

  /* ===================== BANANA SPLIT (baseline out of bounds) ===================== */
  "banana-split": {
    title: "Banana Split",
    sub: "Box set under our basket. #2 and #3 split to the corners, #4 screens for #5, and #5 curls to the rim.",
    tips: "#1 (inbounder): slap the ball to start, then read: #5 on the curl → #4 on the dive → the corner. You have 5 seconds! #4: set the screen on X5 and hold it, then dive to the rim. #5: wait for the screen and curl tight off #4's shoulder. #2 and #3: sprint to the corners to pull your defenders away from the basket.",
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
