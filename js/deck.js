/* One-card-at-a-time study deck (used by the Refs and Rules pages).
   Filters turn green once every card in that group has been viewed today. */
(function () {
  const css = `
  /* Filter ribbon: icon + one word + a progress bar */
  .deck-filters { display: flex; gap: 6px; margin: 6px 0 16px; padding: 5px; width: max-content; max-width: 100%; overflow-x: auto; background: #EFEAEC; border-radius: 18px; scrollbar-width: none; }
  .deck-filters::-webkit-scrollbar { display: none; }
  .deck-filters button { flex: none; display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 76px; padding: 8px 12px 7px; border-radius: 14px; border: 0;
    background: #fff; color: var(--bordeaux); font-size: 13px; font-weight: 800; line-height: 1.1; box-shadow: none; }
  .deck-filters button .ico { width: 24px; height: 24px; }
  .deck-filters button.on { background: var(--bordeaux); color: #fff; }
  .deck-filters button.done { background: #E6F4EA; color: var(--good); }
  .deck-filters button.done.on { background: var(--good); color: #fff; }
  .deck-filters .bar { display: block; width: 100%; height: 4px; border-radius: 4px; background: var(--bordeaux-soft); overflow: hidden; }
  .deck-filters .bar b { display: block; height: 100%; background: var(--good); border-radius: 4px; transition: width .25s; }
  .deck-filters button.on .bar { background: rgba(255,255,255,.35); }
  .deck-filters button.done.on .bar b { background: #fff; }
  .deck-group-name { font-size: 13px; color: var(--muted); margin: -10px 0 12px; font-weight: 700; }
  .deck-stage { background: #fff; border: 1px solid var(--line); border-radius: 22px; box-shadow: var(--shadow); overflow: hidden; }
  .deck-card { display: grid; grid-template-columns: minmax(200px, 300px) 1fr; min-height: 340px; }
  .deck-visual { background: linear-gradient(180deg, var(--blue-soft), #fff); display: grid; place-items: center; padding: 18px; border-right: 1px solid var(--line); }
  .deck-visual svg { width: 100%; max-width: 280px; height: auto; }
  .deck-big { font-family: var(--display); font-style: italic; color: var(--bordeaux); font-size: clamp(40px, 7vw, 64px); text-align: center; line-height: 1.05; }
  .deck-body { padding: 22px 24px; }
  .deck-body h2 { color: var(--bordeaux); margin: 6px 0 8px; }
  .deck-body p { font-size: 17px; }
  .deck-controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 24px 18px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .deck-dots { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; flex: 1; }
  .deck-dots button { width: 13px; height: 13px; padding: 0; border-radius: 50%; background: var(--line); }
  .deck-dots button.seen { background: var(--blue); }
  .deck-dots button.on { background: var(--bordeaux); transform: scale(1.3); }
  /* Arrows sit in the picture's top corners; dots along its bottom edge */
  .deck-vwrap { position: relative; display: grid; border-right: 1px solid var(--line); }
  .deck-vwrap .deck-visual { border-right: 0; padding: 58px 18px 40px; }
  .deck-arrow { position: absolute; top: 12px; z-index: 2; box-shadow: 0 2px 8px rgba(34,22,28,.15); }
  .deck-arrow.deck-prev { left: 12px; background: #fff; }
  .deck-arrow.deck-next { right: 12px; }
  .deck-arrow:disabled { opacity: .35; cursor: default; }
  .deck-vwrap .deck-dots { position: absolute; left: 10px; right: 10px; bottom: 12px; flex: none; }
  .deck-dots button { box-shadow: 0 0 0 2px #fff; }
  .deck-toast { margin: 0 24px 14px; }
  @media (max-width: 720px) {
    .deck-card { grid-template-columns: 1fr; }
    .deck-vwrap { border-right: 0; border-bottom: 1px solid var(--line); }
    .deck-vwrap .deck-visual { min-height: 220px; padding: 54px 60px 34px; }
    .deck-visual svg { max-width: 180px; }
    .deck-dots { gap: 5px; } .deck-dots button { width: 10px; height: 10px; }
  }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function mount(opts) {
    const { root, items, groups, storageKey, visual, body, onRender } = opts;
    const T = window.TEMPO;
    const KEY = `tempo_seen_${storageKey}_${T.user ? T.user.uid : "x"}_${T.dayKey()}`;
    let seen = {};
    try { seen = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(seen)); } catch (e) {} };
    let group = groups[0], idx = 0;
    const list = () => items.filter((it) => it.group === group);
    const groupDone = (g) => items.filter((it) => it.group === g).every((it) => seen[it.id]);

    root.innerHTML = `
      <div class="deck-filters no-print"></div>
      <div class="deck-stage">
        <div class="deck-card">
          <div class="deck-vwrap">
            <div class="deck-visual"></div>
            <button class="ghost round sm deck-arrow deck-prev no-print" title="Back" aria-label="Back">${TEMPO.icon("left", 24)}</button>
            <button class="round sm deck-arrow deck-next no-print" title="Next" aria-label="Next">${TEMPO.icon("right", 24)}</button>
            <div class="deck-dots no-print"></div>
          </div>
          <div class="deck-body" aria-live="polite"></div>
        </div>
        <div class="deck-toast"></div>
      </div>`;
    const $ = (s) => root.querySelector(s);

    function render() {
      const L = list(), it = L[idx];
      const wasDone = groupDone(group);
      seen[it.id] = true; save();
      const nowDone = groupDone(group);
      $(".deck-filters").innerHTML = groups.map((g) => {
        const n = items.filter((x) => x.group === g);
        const c = n.filter((x) => seen[x.id]).length;
        const gi = (opts.groupInfo || {})[g] || {}, label = gi.short || g;
        return `<button data-g="${g}" class="${g === group ? "on" : ""} ${groupDone(g) ? "done" : ""}" title="${g} — ${c} of ${n.length} seen" aria-label="${g}, ${c} of ${n.length} seen" aria-pressed="${g === group}">
          ${gi.icon ? TEMPO.icon(gi.icon, 24) : ""}<span>${label}</span><span class="bar"><b style="width:${n.length ? Math.round((100 * c) / n.length) : 0}%"></b></span></button>`;
      }).join("");
      $(".deck-visual").innerHTML = visual(it);
      $(".deck-body").innerHTML = body(it);
      $(".deck-vwrap").setAttribute("aria-label", `Card ${idx + 1} of ${L.length}`);
      $(".deck-prev").disabled = idx === 0;
      const last = idx === L.length - 1, nx = $(".deck-next"); nx.innerHTML = TEMPO.icon(last ? "restart" : "right", last ? 20 : 24); nx.title = last ? "Start over" : "Next"; nx.setAttribute("aria-label", nx.title);
      $(".deck-dots").innerHTML = L.map((x, i) => `<button aria-label="Card ${i + 1}" data-i="${i}" class="${i === idx ? "on" : seen[x.id] ? "seen" : ""}"></button>`).join("");
      $(".deck-toast").innerHTML = (!wasDone && nowDone)
        ? `<div class="msg ok">You've seen every card in <b>${group}</b> today — nice work! ✓</div>` : "";
      if (onRender) onRender(it, root);
    }
    root.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || !root.contains(b) || b.closest(".deck-body")) return;
      if (b.dataset.g) { group = b.dataset.g; idx = 0; render(); }
      else if (b.dataset.i !== undefined) { idx = +b.dataset.i; render(); }
      else if (b.classList.contains("deck-prev")) { idx = Math.max(0, idx - 1); render(); }
      else if (b.classList.contains("deck-next")) { idx = idx >= list().length - 1 ? 0 : idx + 1; render(); }
    });
    document.addEventListener("keydown", (e) => {
      if (/input|textarea|select/i.test((e.target.tagName || ""))) return;
      if (e.key === "ArrowRight") root.querySelector(".deck-next").click();
      if (e.key === "ArrowLeft" && idx > 0) root.querySelector(".deck-prev").click();
    });
    let sx = null;
    root.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", (e) => {
      if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 60) (dx < 0 ? root.querySelector(".deck-next") : root.querySelector(".deck-prev")).click();
    });
    render();
  }
  window.TEMPO_DECK = { mount };
})();
