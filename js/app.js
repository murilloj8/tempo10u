/* =====================================================================
   TEMPO 10U — accounts, data and page shell
   Two modes:
     • Firebase mode (config.firebase set): real accounts on any device,
       scores saved online, coach dashboard sees everyone.
     • Demo mode (config.firebase null): everything stays in this browser.
   ===================================================================== */
(function () {
  const CFG = window.TEMPO_CONFIG;
  const FB_VERSION = "10.12.2";
  const NAV = [
    { href: "index.html", label: "Home", key: "home", icon: "home", iconOnly: true },
    { href: "court.html", label: "Court", key: "court", icon: "court" },
    { href: "refs.html", label: "Refs", key: "refs", icon: "refs" },
    { href: "rules.html", label: "Rules", key: "rules", icon: "rules" },
    { href: "fundamentals.html", label: "Fundamentals", key: "fundamentals", icon: "fundamentals" },
    { href: "culture.html", label: "Culture", key: "culture", icon: "culture" },
    { href: "stories.html", label: "Stories", key: "stories", icon: "stories" },
    { href: "quizzes.html", label: "Quizzes", key: "quizzes", icon: "quiz" },
    { href: "coach.html", label: "Coach", key: "coach", icon: "coach", coachOnly: true }
  ];

  /* Simple flat line icons used across the site (inherit the text color). */
  const ICONS = {
    home: 'M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M9.5 21v-5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V21',
    logout: 'M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2M9 12h12m-3-3 3 3-3 3',
    court: 'M3 6h18v12H3zM12 6v12M3 9.5h3.5v5H3M21 9.5h-3.5v5H21M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4',
    refs: 'M8.5 4 4 6.5l1.5 4.5 2-1V20h9V10l2 1L20 6.5 15.5 4c-.6 1.6-2 2.5-3.5 2.5S9.1 5.6 8.5 4zM10.5 6.3V20M13.5 6.3V20',
    rules: 'M12 6.5C9.5 5 6.5 4.5 3.5 5v13c3-.5 6 0 8.5 1.5 2.5-1.5 5.5-2 8.5-1.5V5c-3-.5-6 0-8.5 1.5zM12 6.5v13',
    fundamentals: 'M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16M4 12h16M12 4v16M6.3 6.3c2.5 2 2.5 9.4 0 11.4M17.7 6.3c-2.5 2-2.5 9.4 0 11.4',
    culture: 'M12 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M7.5 19v-1.5a4.5 4.5 0 0 1 9 0V19M5.5 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4M2 19v-1a3.5 3.5 0 0 1 4.5-3.3M18.5 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4M22 19v-1a3.5 3.5 0 0 0-4.5-3.3',
    stories: 'M12 4.5l2.3 4.7 5.2.8-3.8 3.6.9 5.2L12 16.4l-4.6 2.4.9-5.2-3.8-3.6 5.2-.8z',
    quiz: 'M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16v4M13.5 6.5l4 4M15 19l2 2 4-4',
    coach: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 3h6v4H9zM9 12h6M9 16h4',
    study: 'M12 6.5C9.5 5 6.5 4.5 3.5 5v13c3-.5 6 0 8.5 1.5 2.5-1.5 5.5-2 8.5-1.5V5c-3-.5-6 0-8.5 1.5zM12 6.5v13',
    heart: 'M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6',
    left: 'M15 6l-6 6 6 6', right: 'M9 6l6 6-6 6',
    play: '!M7 4.5v15l12.5-7.5z', pause: '!M6 5h4v14H6zM14 5h4v14h-4z', next: '!M4.5 5v14l10.5-7zM17 5h2.5v14H17z',
    restart: 'M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4',
    check: 'M5 12l5 5L20 7', x: 'M18 6 6 18M6 6l12 12', plus: 'M12 5v14M5 12h14',
    printer: 'M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4M7 14h10v7H7z',
    image: 'M15 8h.01M12.5 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6.5M3 16l5-5c.9-.9 2.1-.9 3 0l4 4M19 15v7m-3-3 3 3 3-3',
    file: 'M14 3v4a1 1 0 0 0 1 1h4M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 13h6M9 17h6M9 9h1',
    pencil: 'M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16v4M13.5 6.5l4 4',
    trash: 'M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
    download: 'M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12'
  };
  // "!" at the start of a path means a filled shape (play / pause / next).
  function icon(name, size) {
    const d = ICONS[name] || "", filled = d[0] === "!";
    return `<svg class="ico" viewBox="0 0 24 24" width="${size || 20}" height="${size || 20}" aria-hidden="true" focusable="false" ${filled ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}><path d="${filled ? d.slice(1) : d}"/></svg>`;
  }
  const BALL_SVG = '<svg class="ball" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#E8833A" stroke="#fff" stroke-width="2"/><path d="M2 20h36M20 2v36M7 7c7 6 7 20 0 26M33 7c-7 6-7 20 0 26" fill="none" stroke="#4A1228" stroke-width="2"/></svg>';

  /* ---------- small helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cleanUsername = (u) => String(u || "").trim().toLowerCase();
  const validUsername = (u) => /^[a-z0-9][a-z0-9._-]{2,19}$/.test(u);
  const isCoachName = (u) => CFG.coachUsernames.map(cleanUsername).includes(cleanUsername(u));

  function dayKey(d = new Date()) {
    const z = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  }
  // Monday..Friday of the week containing d
  function schoolWeek(d = new Date()) {
    const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
    return Array.from({ length: 5 }, (_, i) => new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i));
  }
  function weekNumber(d = new Date()) {
    const start = new Date(CFG.quizStartDate + "T00:00:00");
    const diff = Math.floor((d - start) / (7 * 24 * 3600 * 1000));
    return Math.max(1, diff + 1);
  }
  function weekDates(week) {
    const start = new Date(CFG.quizStartDate + "T00:00:00");
    const s = new Date(start.getTime() + (week - 1) * 7 * 86400000);
    const e = new Date(s.getTime() + 6 * 86400000);
    const f = (x) => x.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return f(s) + " – " + f(e);
  }
  // Seeded random so every player gets the same quiz in the same week
  function seededRandom(seedStr) {
    let h = 1779033703 ^ seedStr.length;
    for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909);
      const t = (h ^= h >>> 16) >>> 0; return t / 4294967296;
    };
  }
  function shuffle(arr, rand = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- safe storage ---------- */
  const memStore = {};
  const store = {
    get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return memStore[k] ?? null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { memStore[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete memStore[k]; } }
  };

  async function hashPw(salt, pw) {
    const text = salt + ":" + pw;
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      let h = 0; for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0; return "x" + h;
    }
  }

  /* =====================================================================
     DEMO BACKEND (this browser only)
     ===================================================================== */
  const DB_KEY = "tempo_demo_db_v1", SESSION_KEY = "tempo_demo_session_v1";
  const demo = {
    mode: "demo",
    _db() { return store.get(DB_KEY) || { users: {}, results: {} }; },
    _save(db) { store.set(DB_KEY, db); },
    async init() {
      const name = store.get(SESSION_KEY);
      const u = name && this._db().users[name];
      return u ? publicUser(u) : null;
    },
    async signUp({ username, password, displayName, jersey }) {
      const db = this._db();
      if (db.users[username]) throw new Error("That username is already taken. Try adding your jersey number.");
      const salt = Math.random().toString(36).slice(2);
      db.users[username] = { uid: "demo_" + username, username, displayName, jersey, salt, hash: await hashPw(salt, password), createdAt: Date.now() };
      this._save(db); store.set(SESSION_KEY, username);
      return publicUser(db.users[username]);
    },
    async signIn(username, password) {
      const u = this._db().users[username];
      if (!u || (await hashPw(u.salt, password)) !== u.hash) throw new Error("Wrong username or password.");
      store.set(SESSION_KEY, username); return publicUser(u);
    },
    async signOut() { store.del(SESSION_KEY); },
    async getResult(id) { return this._db().results[id] || null; },
    async setResult(id, data) { const db = this._db(); db.results[id] = data; this._save(db); },
    async myResults(uid) { return Object.values(this._db().results).filter((r) => r.uid === uid); },
    async allUsers() { return Object.values(this._db().users).map(publicUser); },
    async allResults() { return Object.values(this._db().results); },
    async getTeamCode() { return (this._db().settings || {}).teamCode || CFG.teamCode || null; },
    async setTeamCode(code) { const db = this._db(); db.settings = { teamCode: code }; this._save(db); },
    async checkTeamCode(code) { return code === String((this._db().settings || {}).teamCode || CFG.teamCode).toUpperCase(); },
    async getStoryPlan() { return this._db().storyPlan || null; },
    async getPractice(id) { return (this._db().practice || {})[id] || null; },
    async setPractice(id, data) { const db = this._db(); db.practice = db.practice || {}; db.practice[id] = data; this._save(db); },
    async deletePractice(id) { const db = this._db(); if (db.practice) delete db.practice[id]; this._save(db); },
    async listPractices() { return Object.entries(this._db().practice || {}).map(([id, d]) => ({ id, ...d })); },
    async setStoryPlan(plan) { const db = this._db(); db.storyPlan = plan; this._save(db); },
    async getActivity(id) { return (this._db().activity || {})[id] || null; },
    async setActivity(id, data) { const db = this._db(); db.activity = db.activity || {}; db.activity[id] = data; this._save(db); },
    async myActivity(uid) { return Object.values(this._db().activity || {}).filter((a) => a.uid === uid); },
    async allActivity() { return Object.values(this._db().activity || {}); },
    async removePlayer(uid) {
      const db = this._db();
      for (const k of Object.keys(db.users)) if (db.users[k].uid === uid) delete db.users[k];
      for (const k of Object.keys(db.results)) if (db.results[k].uid === uid) delete db.results[k];
      for (const k of Object.keys(db.activity || {})) if (db.activity[k].uid === uid) delete db.activity[k];
      this._save(db);
    }
  };
  function publicUser(u) {
    return { uid: u.uid, username: u.username, displayName: u.displayName || u.username, jersey: u.jersey || "", isCoach: isCoachName(u.username) };
  }

  /* =====================================================================
     FIREBASE BACKEND (real accounts)
     ===================================================================== */
  const fire = {
    mode: "firebase",
    async init() {
      const base = `https://www.gstatic.com/firebasejs/${FB_VERSION}/`;
      const [appM, authM, fsM] = await Promise.all([
        import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js")
      ]);
      this.A = authM; this.F = fsM;
      const app = appM.initializeApp(CFG.firebase);
      this.auth = authM.getAuth(app);
      this.db = fsM.getFirestore(app);
      const fbUser = await new Promise((res) => { const off = authM.onAuthStateChanged(this.auth, (u) => { off(); res(u); }); });
      if (!fbUser) return null;
      return this._profile(fbUser);
    },
    async _profile(fbUser) {
      const snap = await this.F.getDoc(this.F.doc(this.db, "users", fbUser.uid));
      if (!snap.exists()) { await this.A.signOut(this.auth); return null; }
      return publicUser({ uid: fbUser.uid, ...snap.data() });
    },
    _email(username) { return username + "@" + CFG.usernameDomain; },
    _err(e) {
      const c = (e && e.code) || "";
      if (c.includes("email-already-in-use")) return new Error("That username is already taken. Try adding your jersey number.");
      if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-login")) return new Error("Wrong username or password.");
      if (c.includes("weak-password")) return new Error("Password must be at least 6 characters.");
      if (c.includes("too-many-requests")) return new Error("Too many tries. Wait a few minutes and try again.");
      if (c.includes("network")) return new Error("No internet connection. Check your Wi-Fi and try again.");
      if (c.includes("permission-denied")) return new Error("The team code is not right. Ask Coach for the code.");
      return new Error((e && e.message) || "Something went wrong. Try again.");
    },
    async signUp({ username, password, displayName, jersey, teamCode }) {
      let cred;
      try { cred = await this.A.createUserWithEmailAndPassword(this.auth, this._email(username), password); }
      catch (e) { throw this._err(e); }
      try {
        await this.F.setDoc(this.F.doc(this.db, "users", cred.user.uid), {
          username, displayName, jersey, teamCode, createdAt: this.F.serverTimestamp()
        });
      } catch (e) {
        try { await this.A.deleteUser(cred.user); } catch (_) {}
        throw this._err(e);
      }
      return publicUser({ uid: cred.user.uid, username, displayName, jersey });
    },
    async signIn(username, password) {
      try {
        const cred = await this.A.signInWithEmailAndPassword(this.auth, this._email(username), password);
        const u = await this._profile(cred.user);
        if (!u) throw new Error("This account isn't on the team list. Ask Coach.");
        return u;
      } catch (e) { throw e.code ? this._err(e) : e; }
    },
    async signOut() { await this.A.signOut(this.auth); },
    async getResult(id) { const s = await this.F.getDoc(this.F.doc(this.db, "results", id)); return s.exists() ? s.data() : null; },
    async setResult(id, data) { await this.F.setDoc(this.F.doc(this.db, "results", id), data); },
    async myResults(uid) {
      const q = this.F.query(this.F.collection(this.db, "results"), this.F.where("uid", "==", uid));
      return (await this.F.getDocs(q)).docs.map((d) => d.data());
    },
    async allUsers() {
      return (await this.F.getDocs(this.F.collection(this.db, "users"))).docs.map((d) => publicUser({ uid: d.id, ...d.data() }));
    },
    async allResults() { return (await this.F.getDocs(this.F.collection(this.db, "results"))).docs.map((d) => d.data()); },
    async getTeamCode() { const s = await this.F.getDoc(this.F.doc(this.db, "settings", "team")); return s.exists() ? s.data().teamCode : null; },
    async setTeamCode(code) { await this.F.setDoc(this.F.doc(this.db, "settings", "team"), { teamCode: code, updatedAt: Date.now() }); },
    async getPractice(id) { const s = await this.F.getDoc(this.F.doc(this.db, "practice", id)); return s.exists() ? s.data() : null; },
    async setPractice(id, data) { await this.F.setDoc(this.F.doc(this.db, "practice", id), data); },
    async deletePractice(id) { await this.F.deleteDoc(this.F.doc(this.db, "practice", id)); },
    async listPractices() { return (await this.F.getDocs(this.F.collection(this.db, "practice"))).docs.map((d) => ({ id: d.id, ...d.data() })); },
    async getStoryPlan() { const s = await this.F.getDoc(this.F.doc(this.db, "settings", "stories")); return s.exists() ? s.data() : null; },
    async setStoryPlan(plan) { await this.F.setDoc(this.F.doc(this.db, "settings", "stories"), plan); },
    async getActivity(id) { const s = await this.F.getDoc(this.F.doc(this.db, "activity", id)); return s.exists() ? s.data() : null; },
    async setActivity(id, data) { await this.F.setDoc(this.F.doc(this.db, "activity", id), data); },
    async myActivity(uid) {
      const q = this.F.query(this.F.collection(this.db, "activity"), this.F.where("uid", "==", uid));
      return (await this.F.getDocs(q)).docs.map((d) => d.data());
    },
    async allActivity() { return (await this.F.getDocs(this.F.collection(this.db, "activity"))).docs.map((d) => d.data()); },
    async removePlayer(uid) {
      const as = await this.F.getDocs(this.F.query(this.F.collection(this.db, "activity"), this.F.where("uid", "==", uid)));
      for (const d of as.docs) await this.F.deleteDoc(d.ref);
      const rs = await this.F.getDocs(this.F.query(this.F.collection(this.db, "results"), this.F.where("uid", "==", uid)));
      for (const d of rs.docs) await this.F.deleteDoc(d.ref);
      await this.F.deleteDoc(this.F.doc(this.db, "users", uid));
    }
  };

  const backend = CFG.firebase && CFG.firebase.apiKey ? fire : demo;

  /* =====================================================================
     PUBLIC API
     ===================================================================== */
  const TEMPO = {
    cfg: CFG, mode: backend.mode, user: null,
    $, esc, weekNumber, weekDates, seededRandom, shuffle, isCoachName,

    async signUp({ username, password, password2, displayName, jersey, teamCode }) {
      username = cleanUsername(username);
      if (!validUsername(username)) throw new Error("Username: 3–20 letters or numbers (no spaces). Example: maya23");
      if (!displayName || !displayName.trim()) throw new Error("Type your first name or nickname.");
      if (String(password).length < 6) throw new Error("Password must be at least 6 characters.");
      if (password !== password2) throw new Error("The two passwords don't match.");
      const code = String(teamCode || "").trim().toUpperCase();
      if (!code) throw new Error("Type the team code from Coach.");
      // Demo mode checks the code here; Firebase mode checks it on the server (firestore.rules).
      if (backend.mode === "demo" && !(await backend.checkTeamCode(code))) throw new Error("The team code is not right. Ask Coach for the code.");
      this.user = await backend.signUp({ username, password, displayName: displayName.trim().slice(0, 24), jersey: String(jersey || "").trim().slice(0, 3), teamCode: code });
      return this.user;
    },
    async signIn(username, password) {
      username = cleanUsername(username);
      if (!username || !password) throw new Error("Type your username and password.");
      this.user = await backend.signIn(username, password);
      return this.user;
    },
    async signOut() { await backend.signOut(); this.user = null; location.href = "index.html"; },

    resultId(topic, week) { return `${this.user.uid}_${topic}_w${week}`; },
    async saveResult(topic, week, score, total) {
      const id = this.resultId(topic, week);
      const prev = await backend.getResult(id);
      const now = Date.now();
      const data = {
        uid: this.user.uid, username: this.user.username, displayName: this.user.displayName,
        topic, week, total, last: score,
        best: prev ? Math.max(prev.best, score) : score,
        attempts: prev ? (prev.attempts || 0) + 1 : 1,
        firstAt: prev ? prev.firstAt : now, updatedAt: now
      };
      await backend.setResult(id, data);
      return data;
    },
    myResults() { return backend.myResults(this.user.uid); },

    /* Daily check-ins: kind = "study" | "quiz" | "affirm" */
    dayKey, schoolWeek,
    async logActivity(kind) {
      if (!this.user || !["study", "quiz", "affirm"].includes(kind)) return;
      const day = dayKey(), id = `${this.user.uid}_${day}`, memo = `tempo_act_${id}_${kind}`;
      if (store.get(memo)) return;
      try {
        const prev = (await backend.getActivity(id)) || {};
        const data = { uid: this.user.uid, username: this.user.username, displayName: this.user.displayName, date: day,
          study: !!prev.study, quiz: !!prev.quiz, affirm: !!prev.affirm, updatedAt: Date.now() };
        data[kind] = true;
        await backend.setActivity(id, data);
        store.set(memo, true);
      } catch (e) { console.error("activity", e); }
    },
    myActivity() { return backend.myActivity(this.user.uid); },
    allActivity() { return backend.allActivity(); },
    getTeamCode() { return backend.getTeamCode(); },
    async setTeamCode(code) {
      code = String(code || "").trim().toUpperCase();
      if (!/^[A-Z0-9]{4,20}$/.test(code)) throw new Error("Use 4–20 letters or numbers, no spaces.");
      await backend.setTeamCode(code);
      return code;
    },
    /* Stories: Coach picks the story for each week (settings/stories).
       plan = { weeks: { "1": storyId, ... }, custom: [ {id, name, who, value, story, lesson, think} ] }
       A custom story with the same id as a built-in one replaces it. */
    icon,
    slug(n) { return String(n).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); },
    async storyPlan() {
      if (this._plan) return this._plan;
      let p = null;
      try { p = await backend.getStoryPlan(); } catch (e) { console.warn("story plan", e); }
      this._plan = { weeks: {}, custom: [], ...(p || {}) };
      return this._plan;
    },
    async saveStoryPlan(plan) {
      const clean = { weeks: {}, custom: [], updatedAt: Date.now() };
      Object.entries(plan.weeks || {}).forEach(([w, id]) => { if (id) clean.weeks[String(w)] = String(id); });
      clean.custom = (plan.custom || []).map((s) => ({ id: String(s.id), name: String(s.name || ""), who: String(s.who || ""), value: String(s.value || ""),
        story: String(s.story || ""), lesson: String(s.lesson || ""), think: String(s.think || "") }));
      await backend.setStoryPlan(clean);
      this._plan = clean; return clean;
    },
    allStories(plan) {
      const base = (window.TEMPO_STORIES || []).map((s) => ({ ...s, id: this.slug(s.name), builtIn: true }));
      (plan && plan.custom || []).forEach((c) => {
        const i = base.findIndex((b) => b.id === c.id);
        if (i >= 0) base[i] = { ...c, builtIn: true, edited: true }; else base.push({ ...c, builtIn: false });
      });
      return base;
    },
    storyForWeek(wk, plan) {
      const all = this.allStories(plan);
      const id = plan && plan.weeks && plan.weeks[String(wk)];
      const base = all.filter((s) => s.builtIn);
      return all.find((s) => s.id === id) || base[(Math.max(1, wk) - 1) % base.length];
    },
    /* Practice planning (coach only): practice/_bank = drill bank, practice/YYYY-MM-DD = a plan. */
    getPractice(id) { return backend.getPractice(id); },
    setPractice(id, data) { return backend.setPractice(id, { ...data, updatedAt: Date.now() }); },
    deletePractice(id) { return backend.deletePractice(id); },
    listPractices() { return backend.listPractices(); },
    allUsers() { return backend.allUsers(); },
    allResults() { return backend.allResults(); },
    removePlayer(uid) { return backend.removePlayer(uid); },

    /* Build the page shell. opts.public = page works without login (index only). */
    async boot(pageKey, opts = {}) {
      renderTopbar(pageKey);
      const main = $("main");
      if (main) main.classList.add("hidden");
      try { this.user = await backend.init(); }
      catch (e) { console.error(e); showFatal("Could not connect to the team server. Check your internet and refresh."); return null; }
      if (!this.user && !opts.public) { location.href = "index.html"; return null; }
      if (opts.coachOnly && !this.user.isCoach) { location.href = "index.html"; return null; }
      renderTopbar(pageKey);
      if (main) main.classList.remove("hidden");
      if (opts.study && this.user) this.logActivity("study");
      return this.user;
    }
  };

  function renderTopbar(pageKey) {
    let bar = $(".topbar");
    if (!bar) { bar = document.createElement("header"); bar.className = "topbar"; document.body.prepend(bar); }
    const u = TEMPO.user;
    const links = u ? NAV.filter((n) => !n.coachOnly || u.isCoach).map((n) =>
      `<a href="${n.href}" class="${n.key === pageKey ? "active" : ""} ${n.iconOnly ? "icon-only" : ""}" title="${n.label}"${n.iconOnly ? ` aria-label="${n.label}"` : ""}>${icon(n.icon, 22)}<span class="nl">${n.label}</span></a>`).join("") : "";
    bar.innerHTML = `<div class="topbar-inner">
        <a class="brand" href="index.html">${BALL_SVG}<span>${esc(CFG.teamName.toUpperCase())}<small>10U GIRLS · ${esc(CFG.season)}</small></span></a>
        ${u ? '<button class="menu-btn" aria-label="Menu">Menu ☰</button>' : ""}
        <nav class="nav">${links}
          ${u ? `<span class="userchip">Hi, ${esc(u.displayName)}${u.jersey ? " #" + esc(u.jersey) : ""} <button class="secondary icon-btn" id="logoutBtn" title="Log out" aria-label="Log out">${icon("logout", 20)}<span class="nl">Log out</span></button></span>` : ""}
        </nav>
      </div>`;
    const mb = $(".menu-btn", bar);
    if (mb) mb.onclick = (e) => { e.stopPropagation(); $(".nav", bar).classList.toggle("open"); };
    if (!window.__tempoMenuClose) {   // tap anywhere outside the open menu to close it
      window.__tempoMenuClose = true;
      document.addEventListener("click", (e) => {
        const nav = document.querySelector(".topbar .nav.open");
        if (nav && !nav.contains(e.target)) nav.classList.remove("open");
      });
    }
    const lo = $("#logoutBtn", bar); if (lo) lo.onclick = () => TEMPO.signOut();
    // Static icon placeholders: <i data-ico="name" data-size="20"></i>
    document.querySelectorAll("[data-ico]").forEach((el) => { el.innerHTML = icon(el.dataset.ico, +el.dataset.size || 20); el.setAttribute("aria-hidden", "true"); });
    // Page instructions sit behind a "?" help button next to the title (hidden until tapped).
    document.querySelectorAll(".page-head").forEach((head) => {
      const h1 = $("h1", head);
      const help = [...head.children].filter((el) => (el.matches("ul.bul") || (el.matches("p") && !el.id)) && !el.dataset.noHelp);
      if (!h1 || !help.length || head.querySelector(".help-btn")) return;
      const box = document.createElement("div");
      box.className = "help-box"; box.id = "help-" + (pageKey || "page"); box.hidden = true;
      help.forEach((el) => box.appendChild(el));
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "help-btn no-print"; btn.textContent = "?";
      btn.title = "How to use this page"; btn.setAttribute("aria-label", "How to use this page");
      btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", box.id);
      btn.onclick = () => { box.hidden = !box.hidden; btn.setAttribute("aria-expanded", String(!box.hidden)); btn.classList.toggle("on", !box.hidden); };
      const row = document.createElement("div"); row.className = "title-row";
      h1.replaceWith(row); row.append(h1, btn);
      row.after(box);
      if (getComputedStyle(head).textAlign === "center") { row.style.justifyContent = "center"; box.style.margin = "4px auto 14px"; }
    });
    // "Home" button at the bottom of every page except Home
    const main = $("main");
    if (u && pageKey !== "home" && main && !$(".return-home")) {
      const r = document.createElement("div");
      r.className = "return-home no-print";
      r.innerHTML = `<a class="btn round" href="index.html" title="Home" aria-label="Home">${icon("home", 28)}</a>`;
      main.appendChild(r);
    }
  }
  function showFatal(msg) {
    const m = $("main"); if (!m) return;
    m.classList.remove("hidden");
    m.innerHTML = `<div class="msg error">${esc(msg)}</div>`;
  }

  window.TEMPO = TEMPO;
})();
