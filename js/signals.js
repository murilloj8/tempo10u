/* Referee signal figures — drawn as simple striped-shirt stick figures.
   Positions are in a 160 x 200 box. "L"/"R" = left/right as YOU look at the ref. */
(function () {
  const SKIN = "#E9B98F", INK = "#22161C", BLUE = "#3E7DB5";
  const SH = { L: [66, 56], R: [94, 56] };

  function hand(e, h, type) {
    const [ex, ey] = e, [hx, hy] = h;
    let dx = hx - ex, dy = hy - ey; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
    const px = -dy, py = dx; // perpendicular
    let s = "";
    const fingers = { open: 4, point: 1, two: 2, three: 3 }[type] || 0;
    if (fingers) {
      const spread = fingers === 1 ? [0] : Array.from({ length: fingers }, (_, i) => (i - (fingers - 1) / 2) * 3.4);
      spread.forEach((o) => {
        const sx = hx + px * o, sy = hy + py * o;
        s += `<line x1="${sx}" y1="${sy}" x2="${sx + dx * 11}" y2="${sy + dy * 11}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
      });
    }
    if (type === "thumb") {
      s += `<line x1="${hx}" y1="${hy}" x2="${hx}" y2="${hy - 12}" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
    }
    s += `<circle cx="${hx}" cy="${hy}" r="${type === "fist" || type === "thumb" ? 6.5 : 5.5}" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>`;
    return s;
  }
  function arm(side, a) {
    const [sx, sy] = SH[side];
    return `<polyline points="${sx},${sy} ${a.e[0]},${a.e[1]} ${a.h[0]},${a.h[1]}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<polyline points="${sx},${sy} ${a.e[0]},${a.e[1]} ${a.h[0]},${a.h[1]}" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity=".25"/>` +
      hand(a.e, a.h, a.hand || "none");
  }
  const DOWN = { L: { e: [60, 86], h: [58, 112], hand: "none" }, R: { e: [100, 86], h: [102, 112], hand: "none" } };

  function arrow(d, head) {
    return `<path d="${d}" fill="none" stroke="${BLUE}" stroke-width="3" stroke-dasharray="5 4" stroke-linecap="round"/>` +
      (head ? `<path d="${head}" fill="${BLUE}"/>` : "");
  }

  function figure(sig) {
    const L = sig.L || DOWN.L, R = sig.R || DOWN.R;
    const stripes = Array.from({ length: 7 }, (_, i) => `<rect x="${66 + i * 4}" y="50" width="2" height="66" fill="${INK}"/>`).join("");
    const head = `<circle cx="80" cy="30" r="15" fill="${SKIN}" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="75" cy="28" r="1.6" fill="${INK}"/><circle cx="85" cy="28" r="1.6" fill="${INK}"/>
      <path d="M75 35 Q80 38 85 35" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="80" y1="44" x2="80" y2="50" stroke="${INK}" stroke-width="5"/>`;
    const body = `<rect x="64" y="50" width="32" height="68" rx="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${stripes}
      <line x1="72" y1="118" x2="66" y2="184" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <line x1="88" y1="118" x2="94" y2="184" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="62" cy="188" rx="9" ry="4" fill="${INK}"/><ellipse cx="98" cy="188" rx="9" ry="4" fill="${INK}"/>`;
    // whistle
    const whistle = `<circle cx="80" cy="60" r="2.5" fill="${BLUE}"/>`;
    const behindHead = sig.behindHead ? arm(sig.behindHead, sig[sig.behindHead]) : "";
    const front = (sig.behindHead === "L" ? "" : arm("L", L)) + (sig.behindHead === "R" ? "" : arm("R", R));
    return `<svg viewBox="0 0 160 200" role="img" aria-label="${sig.name} signal">${behindHead}${body}${whistle}${head}${front}${sig.extra || ""}</svg>`;
  }

  const SIGNALS = [
    // ---------- Clock ----------
    { id: "stop", group: "Clock", name: "Stop the clock", kind: "clock",
      R: { e: [100, 34], h: [102, 10], hand: "open" },
      means: ["Whistle! Something happened.", "The clock stops."],
      after: "Freeze, listen and look at the ref to see what was called." },
    { id: "foulstop", group: "Clock", name: "Stop clock for a foul", kind: "clock",
      R: { e: [100, 34], h: [102, 10], hand: "fist" },
      means: ["Closed fist in the air = FOUL.", "Next, the ref shows who fouled and what kind."],
      after: "If it's on you, raise your hand, then hustle back — next play!" },
    { id: "start", group: "Clock", name: "Start the clock", kind: "clock",
      R: { e: [104, 40], h: [110, 16], hand: "open" },
      extra: `<path d="M124 22 L124 70" fill="none" stroke="#3E7DB5" stroke-width="3" stroke-dasharray="5 4"/><path d="M118 64 L124 76 L130 64 Z" fill="#3E7DB5"/>`,
      means: ["The ref chops her arm down.", "The clock starts again."],
      after: "Play is live — get going!" },
    // ---------- Violations ----------
    { id: "travel", group: "Violations", name: "Traveling", kind: "violation",
      L: { e: [56, 82], h: [74, 74], hand: "fist" }, R: { e: [104, 82], h: [86, 84], hand: "fist" },
      extra: `<path d="M64 62 A20 18 0 1 1 62 92" fill="none" stroke="#3E7DB5" stroke-width="3" stroke-dasharray="5 4"/><path d="M56 88 L62 98 L68 88 Z" fill="#3E7DB5"/>`,
      means: ["Rolling fists = traveling.", "You moved your pivot foot or took too many steps."],
      after: "The other team gets the ball out of bounds.",
      avoid: "Land on two feet when you catch (a jump stop) so you can pivot on either foot. Start your dribble BEFORE you lift your pivot foot." },
    { id: "dribble", group: "Violations", name: "Double dribble (illegal dribble)", kind: "violation",
      L: { e: [54, 84], h: [62, 100], hand: "open" }, R: { e: [106, 84], h: [98, 92], hand: "open" },
      extra: `<path d="M48 92 L48 118 M42 112 L48 120 L54 112" fill="none" stroke="#3E7DB5" stroke-width="3"/><path d="M112 104 L112 78 M106 84 L112 76 L118 84" fill="none" stroke="#3E7DB5" stroke-width="3"/>`,
      means: ["Patting motion = double dribble.", "You dribbled with two hands, or stopped and started again."],
      after: "The other team gets the ball out of bounds.",
      avoid: "Once you pick up your dribble, you're done dribbling — pivot, then pass or shoot." },
    { id: "carry", group: "Violations", name: "Carrying (palming)", kind: "violation",
      R: { e: [108, 76], h: [96, 72], hand: "open" },
      extra: `<path d="M86 60 A12 12 0 0 1 104 60" fill="none" stroke="#3E7DB5" stroke-width="3"/><path d="M100 54 L106 62 L96 63 Z" fill="#3E7DB5"/>`,
      means: ["Half turn of the hand = carrying.", "Your hand went under the ball while dribbling."],
      after: "The other team gets the ball out of bounds.",
      avoid: "Keep your hand on TOP of the ball and push it down with your fingertips." },
    { id: "three", group: "Violations", name: "3 seconds in the lane", kind: "violation",
      R: { e: [114, 58], h: [134, 58], hand: "three" },
      means: ["Arm out, 3 fingers = 3 seconds.", "An offensive player stayed in the paint too long."],
      after: "The other team gets the ball out of bounds.",
      avoid: "Count in your head: 1, 2, 3 — OUT! Keep moving (MOTION — never stand still)." },
    { id: "direction", group: "Violations", name: "Out of bounds / direction", kind: "violation",
      R: { e: [116, 56], h: [140, 54], hand: "point" },
      means: ["The ref points the way the team with the ball will go.", "The team that did NOT touch it last gets the ball."],
      after: "Look where the ref points. If it's our ball, find the inbounder. If not, sprint back on defense!",
      avoid: "Keep your feet off the lines — the line is out of bounds." },
    { id: "held", group: "Violations", name: "Held ball (jump ball)", kind: "violation",
      L: { e: [60, 34], h: [64, 12], hand: "thumb" }, R: { e: [100, 34], h: [96, 12], hand: "thumb" },
      means: ["Both thumbs up = held ball.", "Both teams had their hands on the ball.", "The possession arrow decides who gets it."],
      after: "Check the possession arrow at the scorer's table.",
      avoid: "Grab loose balls with two hands, rip them to your chin, and pivot away." },
    // ---------- Fouls ----------
    { id: "block", group: "Fouls", name: "Blocking", kind: "foul",
      L: { e: [50, 92], h: [68, 112], hand: "fist" }, R: { e: [110, 92], h: [92, 112], hand: "fist" },
      means: ["Hands on hips = blocking foul.", "The defender was still moving or slid in too late."],
      avoid: "Beat your player to the spot. Feet set, chest square, hands up — before she gets there." },
    { id: "pc", group: "Fouls", name: "Player-control foul (charging)", kind: "foul", behindHead: "R",
      R: { e: [108, 38], h: [90, 22], hand: "fist" }, L: { e: [48, 66], h: [32, 60], hand: "point" },
      means: ["Hand behind the head = charging.", "The player with the ball ran into a defender who was already set."],
      after: "No points count. The defense gets the ball.",
      avoid: "Keep your eyes up when you drive. If a defender is set, stop (jump stop!) or go around her." },
    { id: "push", group: "Fouls", name: "Pushing", kind: "foul",
      L: { e: [56, 74], h: [70, 62], hand: "open" }, R: { e: [104, 74], h: [90, 62], hand: "open" },
      extra: `<path d="M56 50 Q50 58 56 66 M48 46 Q40 58 48 70 M104 50 Q110 58 104 66 M112 46 Q120 58 112 70" fill="none" stroke="#3E7DB5" stroke-width="2.5"/>`,
      means: ["Both hands push forward = pushing.", "A player shoved another player."],
      avoid: "Box out with your body and seat, not your hands. Keep your hands up and arms bent." },
    { id: "hold", group: "Fouls", name: "Holding", kind: "foul",
      L: { e: [60, 92], h: [78, 100], hand: "fist" }, R: { e: [100, 90], h: [84, 98], hand: "open" },
      means: ["One hand grabs the other wrist = holding.", "A player grabbed another player or her jersey."],
      avoid: "Move your feet on defense instead of grabbing. Hands off, feet fast!" },
    { id: "hands", group: "Fouls", name: "Illegal use of hands (reaching)", kind: "foul",
      L: { e: [60, 84], h: [80, 76], hand: "open" }, R: { e: [108, 56], h: [88, 64], hand: "open" },
      extra: `<path d="M98 44 L88 58" fill="none" stroke="#3E7DB5" stroke-width="3"/><path d="M84 52 L86 62 L94 56 Z" fill="#3E7DB5"/>`,
      means: ["Chop on the wrist = reaching (illegal use of hands).", "A player hit someone's arm or hand."],
      avoid: "Defend with your feet. Hands go UP on shots, not down on the arm." },
    { id: "intent", group: "Fouls", name: "Intentional foul", kind: "foul",
      L: { e: [64, 30], h: [94, 8], hand: "fist" }, R: { e: [96, 30], h: [66, 8], hand: "fist" },
      means: ["Arms crossed in an X over the head = intentional foul.", "The foul was on purpose or too hard."],
      after: "Free throws AND the ball for the other team.",
      avoid: "Always play the ball, never the player." },
    { id: "tech", group: "Fouls", name: "Technical foul", kind: "foul",
      L: { e: [56, 30], h: [66, 10], hand: "open" }, R: { e: [100, 44], h: [80, 14], hand: "open" },
      extra: `<line x1="58" y1="10" x2="102" y2="10" stroke="#B3261E" stroke-width="5" stroke-linecap="round" opacity=".55"/><line x1="80" y1="10" x2="80" y2="40" stroke="#B3261E" stroke-width="5" stroke-linecap="round" opacity=".55"/>`,
      means: ["Hands make a T = technical foul.", "Usually for bad sportsmanship, like arguing or taunting."],
      after: "SBMSA: 2 free throws plus the ball for the other team.",
      avoid: "Respect the ref, respect the game. Control what you can — your attitude!" },
    // ---------- Scoring & other ----------
    { id: "3a", group: "Scoring & more", name: "3-point try", kind: "score",
      R: { e: [100, 34], h: [102, 10], hand: "three" },
      means: ["One arm up, 3 fingers = 3-point try.", "The shooter is behind the 3-point line."],
      after: "If it goes in, it's worth 3." },
    { id: "3m", group: "Scoring & more", name: "3 pointer is good!", kind: "score",
      L: { e: [60, 34], h: [58, 10], hand: "three" }, R: { e: [100, 34], h: [102, 10], hand: "three" },
      means: ["Both arms up, 3 fingers = the 3 went in!", "Three points!"] },
    { id: "sub", group: "Scoring & more", name: "Come in (substitution)", kind: "score",
      R: { e: [112, 52], h: [118, 30], hand: "open" },
      extra: `<path d="M130 26 Q138 40 128 52" fill="none" stroke="#3E7DB5" stroke-width="3"/><path d="M124 46 L128 56 L134 48 Z" fill="#3E7DB5"/>`,
      means: ["The ref waves a player onto the court.", "Wait at the scorer's table until you're waved in!"] }
  ];

  window.TEMPO_SIGNALS = { SIGNALS, figure };
})();
