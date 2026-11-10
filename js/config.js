/* =====================================================================
   TEMPO 10U — SITE SETTINGS  (the only file you normally need to edit)
   ===================================================================== */
window.TEMPO_CONFIG = {
  teamName: "Tempo",
  season: "2026–27",
  league: "SBMSA Junior Girls National League (ages 9–10)",

  // DEMO MODE ONLY: the code players type to create an account.
  // Once Firebase is connected, the real team code lives ONLY in
  // firestore.rules (so nobody can read it in your public site files).
  teamCode: "",   // not used now that Firebase is connected

  // Usernames that get the Coach dashboard. Create these accounts FIRST,
  // before you share the site with the team. Must match firestore.rules.
  coachUsernames: ["coach"],

  // Week 1 of the quiz calendar (a Monday). Quizzes change every Monday.
  quizStartDate: "2026-11-16",
  questionsPerQuiz: 8,

  // Used behind the scenes to turn a username into a Firebase login.
  // It is not a real email address and nothing is ever sent to it.
  usernameDomain: "tempo10u.team",

  // Paste your Firebase web config here (see README, step 2).
  // While this is null the site runs in DEMO MODE: accounts and scores
  // are saved only in the browser on that one device.
  firebase: {
    apiKey: "AIzaSyDVrETZ1XV-2O1yC_Q9uKwPe0GKwsjmt2M",
    authDomain: "tempo-10u.firebaseapp.com",
    projectId: "tempo-10u",
    storageBucket: "tempo-10u.firebasestorage.app",
    messagingSenderId: "257011443373",
    appId: "1:257011443373:web:f9846c59273524c8d60824"
  }
  /* Example:
  firebase: {
    apiKey: "AIza...",
    authDomain: "tempo-10u.firebaseapp.com",
    projectId: "tempo-10u",
    storageBucket: "tempo-10u.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123"
  }
  */
};
