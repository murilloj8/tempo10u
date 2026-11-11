# Tempo 10U Team Website — Setup Guide

A free team website for the Tempo 10U girls (SBMSA Junior League, 2026–27).

**What's inside:** Home · The Court (step-through presentation) · Refs (referee signals) · Rules (basic + SBMSA league rules) · Fundamentals · Team Culture (TEMPO creed + affirmations) · Stories · Weekly Quizzes · Coach Dashboard.

**How it works**
- The website lives on **GitHub Pages** (free).
- Player logins and quiz scores live in **Firebase** (free "Spark" plan from Google).
- Players sign up with a **username + password + secret team code**. No email addresses are collected — only a first name/nickname, a username and (optional) jersey number.

Until you finish Step 3, the site runs in **demo mode**: it works, but accounts and scores are saved only in that one browser. Good for trying it out.

Total setup time: about 30–40 minutes. You need a computer (not a phone) for setup.

---

## Step 1 — Put the site on GitHub Pages (≈10 min)

1. Go to **github.com** and create a free account (or sign in).
2. Click **+** (top right) → **New repository**.
   - Name: `tempo10u` (this becomes part of your link)
   - Visibility: **Public** (required for free GitHub Pages)
   - Click **Create repository**.
3. On the new repository page click **uploading an existing file**.
4. Drag in **everything in this folder EXCEPT `firestore.rules`** (it contains your secret team code — keep it on your computer):
   `index.html`, `court.html`, `rules.html`, `fundamentals.html`, `culture.html`, `stories.html`, `quizzes.html`, `coach.html`, `README.md`, and the `css` and `js` folders.
   Then click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)** → **Save**.
6. Wait 1–2 minutes. Your site will be at:
   **`https://YOUR-GITHUB-USERNAME.github.io/tempo10u/`**

## Step 2 — Create the Firebase project (≈10 min)

1. Go to **console.firebase.google.com** and sign in with a Google account.
2. **Create a project** → name it `tempo-10u` → you can turn **off** Google Analytics → **Create**.
3. **Turn on logins:** left menu **Build → Authentication → Get started** → **Sign-in method** tab → **Email/Password** → **Enable** (first switch only) → **Save**.
   *(Players never type an email. The site quietly turns `maya23` into `maya23@tempo10u.team` behind the scenes. No email is ever sent.)*
4. Still in Authentication → **Settings** tab → **Authorized domains** → **Add domain** → type `YOUR-GITHUB-USERNAME.github.io` → **Add**.
5. **Turn on the database:** **Build → Firestore Database → Create database** → pick a location (e.g. `us-central`) → **Start in production mode** → **Create**.
6. **Lock down the database:** open the `firestore.rules` file from this folder in Notepad/TextEdit.
   - Change `'TEMPO2027'` to your own secret team code (UPPERCASE letters/numbers).
   - If you want a coach username other than `coach`, change `coach@tempo10u.team` (keep the `@tempo10u.team` part). Add an assistant coach like this: `['coach@tempo10u.team', 'coachsam@tempo10u.team']`.
   - In Firestore click the **Rules** tab, delete everything there, paste the whole file, and click **Publish**.

## Step 3 — Connect the site to Firebase (≈5 min)

1. In Firebase click the ⚙️ gear → **Project settings** → scroll to **Your apps** → click the **`</>`** (Web) icon → nickname `tempo-site` → **Register app** (skip Firebase Hosting).
2. You'll see a block of code with `const firebaseConfig = { apiKey: ..., ... }`. Copy the part between the `{ }`.
3. In GitHub, open `js/config.js` → click the ✏️ pencil → replace `firebase: null` with your config, like:

   ```js
   firebase: {
     apiKey: "AIza....",
     authDomain: "tempo-10u.firebaseapp.com",
     projectId: "tempo-10u",
     storageBucket: "tempo-10u.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   }
   ```
   *(These keys are meant to be public — your security comes from the rules in Step 2.)*
4. If you changed the coach username in Step 2, change `coachUsernames: ["coach"]` to match.
5. **Commit changes**. Wait 1–2 minutes for the site to update.

## Step 4 — Create YOUR coach account first

1. Open your site → **New player**.
2. Name: `Coach ...`, username: **`coach`** (or whatever you set), a password, and your team code → **Join the team**.
3. You'll now see a **Coach** tab in the menu.

Do this **before** sharing the link, so nobody else can take the `coach` username.

## Step 5 — Share with the team

Send parents the link and the team code. Suggested message:

> Tempo players: our team website is **https://YOUR-GITHUB-USERNAME.github.io/tempo10u/** — tap **New player**, use your first name or a nickname (no last names), pick a username and password, and enter team code **XXXX**. Parents, please help your player save her password. There's a new quiz every Monday!

Players can install it like an app: on iPhone open the link in Safari → Share → **Add to Home Screen**.

---

## Coach how-tos

**See scores:** Coach tab → pick the week. Green = 80%+, yellow = 50–79%, red = below 50%. **Copy as spreadsheet** pastes into Excel/Google Sheets.

**A player forgot her password:** Coach tab → **Remove** her. Then in Firebase → Authentication → Users → find `username@tempo10u.team` → ⋮ → **Delete account**. She can sign up again with the same username. (Old scores are removed.)

**Change the team code:** Coach tab → Team code → Change code. Existing players aren't affected.

**Quiz weeks:** Week 1 starts on `quizStartDate` in `js/config.js` (set to Mon Nov 16, 2026, the first practice week). Quizzes change every Monday. Each subject has 10 sets of 6 questions in `js/quiz-data.js`: Week 1 = Set 1 (easiest) … Week 10 = Set 10 (hardest), then a Challenge mix.

**Add or edit quiz questions:** `js/quiz-data.js`. Each question looks like:
```js
{ q: "Question?", o: ["Choice A", "Choice B", "Choice C", "Choice D"], a: 1, why: "Explanation shown after answering." },
```
`a` is the number of the correct choice, counting from 0 (so `a: 1` = Choice B).

**Edit page content:** skills in `fundamentals.html`, court slides in `court.html` (the `SLIDES` list), stories in `js/stories-data.js`, plays in `plays/` (listed on `plays.html`), the full affirmation on `affirmation.html`, signals in `js/signals.js` (shown on `refs.html`), rules in the `RULES` list in `rules.html`.

**League rules:** the Refs & Rules page summarizes the **SBMSA 2024–25 rule book** for the **Junior Girls National League** (section 5.03 plus the general rules: man-to-man only, no backcourt defense except the last 60 seconds, 12-minute running quarters, no isolation plays). Two things to confirm with the league: (1) the free-throw distance — the book says "13 feet for Junior League girls and 14 feet for National League"; the site teaches 13 feet; (2) any changes in the 2026–27 rule book.

## Privacy & cost

- The site collects only a nickname, a username, an optional jersey number and quiz scores. No email addresses, last names, photos or birthdays.
- Because players are under 13, let parents know what the site is and get their OK before kids sign up. (This isn't legal advice — check your league's policy if it has one.)
- GitHub Pages and the Firebase Spark plan are free. A team of 10–15 players uses a tiny fraction of the free limits, and the Spark plan has no credit card on file, so you can't be surprised by a bill.
