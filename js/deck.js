/* One-card-at-a-time study deck (used by the Refs and Rules pages).
   Filters turn green once every card in that group has been viewed today. */
(function () {
  const css = `
  .deck-filters { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 16px; }
  .deck-filters button { background: #fff; color: var(--bordeaux); border: 2px solid var(--bordeaux); padding: 7px 14px; position: relative; }
  .deck-filters button.on { background: var(--bordeaux); color: #fff; }
  .deck-filters button.done { background: #E6F4EA; color: var(--good); border-color: var(--good); }
  .deck-filters button.done.on { background: var(--good); color: #fff; }
  .deck-filters button.done::after { content: " ✓"; }
  .deck-filters .cnt { font-size: 12px; opacity: .75; margin-left: 4px; }
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
  .deck-count { font-weight: 800; color: var(--muted); font-size: 14px; min-width: 64px; text-align: center; }
  .deck-toast { margin: 0 24px 14px; }
  @media (max-width: 720px) {
    .deck-card { grid-template-columns: 1fr; }
    .deck-visual { border-right: 0; border-bottom: 1px solid var(--line); min-height: 200px; }
    .deck-visual svg { max-width: 180px; }
    .deck-dots { display: none; }
  }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function mount({ root, items, groups, storageKey, visual, body, onRender }) {
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
        <div class="deck-card"><div class="deck-visual"></div><div class="deck-body" aria-live="polite"></div></div>
        <div class="deck-toast"></div>
        <div class="deck-controls no-print">
          <button class="ghost deck-prev">← Back</button>
          <div class="deck-dots"></div>
          <span class="deck-count"></span>
          <button class="deck-next">Next →</button>
        </div>
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
        return `<button data-g="${g}" class="${g === group ? "on" : ""} ${groupDone(g) ? "done" : ""}">${g}<span class="cnt">${c}/${n.length}</span></button>`;
      }).join("");
      $(".deck-visual").innerHTML = visual(it);
      $(".deck-body").innerHTML = body(it);
      $(".deck-count").textContent = `${idx + 1} / ${L.length}`;
      $(".deck-prev").disabled = idx === 0;
      $(".deck-next").textContent = idx === L.length - 1 ? "Start over ↺" : "Next →";
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
