/**

- docs/app.js
- =====================================================
- Learning With Samara AI — Main Application
- 
- Handles:
- - Screen navigation
- - Authentication
- - Subject / World / Stage selection
- - Quiz engine (question rendering, scoring, feedback)
- - Supabase score & progress saving
- - Dashboard rendering
- - World unlock logic
- - AI Tutor hook (ready for future integration)
- =====================================================
  */

/* =====================================================================
APP STATE
===================================================================== */
const State = {
user:         null,           // Supabase user object
score:        0,              // running session score
progress:     [],             // loaded from Supabase

// current navigation context
subject:      null,           // e.g. ‘math’
subjectDef:   null,           // the subject module object
worldIndex:   null,           // 0-based index into subjectDef.worlds
stageIndex:   null,           // 0-based index into world.stages

// quiz state
questions:    [],
qIndex:       0,
correct:      0,
answered:     false,
};

/* =====================================================================
SUBJECT REGISTRY
Maps subject id → module loaded from components/
===================================================================== */
const SUBJECTS = {
math:    () => window.MathSubject,
reading: () => window.ReadingSubject,
science: () => window.ScienceSubject,
social:  () => window.SocialSubject,
};

/* =====================================================================
APP CONTROLLER
===================================================================== */
const App = {

/* ── INIT ── */
async init() {
// Listen for auth state changes (handles page reload)
window.DB.auth.onAuthStateChange(async (event, session) => {
State.user = session?.user || null;
App._updateAuthUI();
if (State.user) {
State.progress = await window.SupabaseHelpers.loadProgress();
}
});

```
// Check current session
const user = await window.SupabaseHelpers.getCurrentUser();
State.user = user;
App._updateAuthUI();
if (user) {
  State.progress = await window.SupabaseHelpers.loadProgress();
}
```

},

/* ── SCREEN NAVIGATION ── */
showScreen(screenId, param) {
document.querySelectorAll(’.screen’).forEach(s => s.classList.remove(‘active’));
document.getElementById(screenId).classList.add(‘active’);
window.scrollTo(0, 0);

```
if (screenId === 'screen-auth' && param) App.switchTab(param);
if (screenId === 'screen-dashboard') App.renderDashboard();
```

},

/* ── AUTH UI ── */
_updateAuthUI() {
const loggedIn = !!State.user;
document.getElementById(‘btn-login’).classList.toggle(‘hidden’, loggedIn);
document.getElementById(‘btn-signup’).classList.toggle(‘hidden’, loggedIn);
document.getElementById(‘btn-dashboard’).classList.toggle(‘hidden’, !loggedIn);
document.getElementById(‘btn-logout’).classList.toggle(‘hidden’, !loggedIn);
},

switchTab(tab) {
const isLogin = tab === ‘login’;
document.getElementById(‘tab-login’).classList.toggle(‘active’, isLogin);
document.getElementById(‘tab-signup’).classList.toggle(‘active’, !isLogin);
document.getElementById(‘auth-title’).textContent = isLogin ? ‘Welcome Back!’ : ‘Join the Adventure!’;
document.getElementById(‘auth-name’).classList.toggle(‘hidden’, isLogin);
document.getElementById(‘auth-submit-btn’).textContent = isLogin ? “Let’s Go! 🚀” : “Sign Me Up! 🌟”;
document.getElementById(‘auth-msg’).textContent = ‘’;
this._currentAuthTab = tab;
},

_currentAuthTab: ‘login’,

async handleAuth() {
const email    = document.getElementById(‘auth-email’).value.trim();
const password = document.getElementById(‘auth-password’).value;
const name     = document.getElementById(‘auth-name’).value.trim();
const msgEl    = document.getElementById(‘auth-msg’);
msgEl.className = ‘auth-msg’;

```
if (!email || !password) {
  msgEl.textContent = 'Please fill in email and password.';
  msgEl.classList.add('error');
  return;
}

if (this._currentAuthTab === 'signup') {
  if (!name) {
    msgEl.textContent = 'Please enter your name!';
    msgEl.classList.add('error');
    return;
  }
  const { error } = await window.SupabaseHelpers.authSignUp(email, password, name);
  if (error) {
    msgEl.textContent = error.message;
    msgEl.classList.add('error');
  } else {
    msgEl.textContent = '🎉 Account created! Please check your email to confirm, then log in.';
    msgEl.classList.add('success');
  }
} else {
  const { data, error } = await window.SupabaseHelpers.authLogin(email, password);
  if (error) {
    msgEl.textContent = error.message;
    msgEl.classList.add('error');
  } else {
    State.user = data.user;
    State.progress = await window.SupabaseHelpers.loadProgress();
    App._updateAuthUI();
    App.showToast('Welcome back! 🌟');
    App.showScreen('screen-home');
  }
}
```

},

async logout() {
await window.SupabaseHelpers.authLogout();
State.user    = null;
State.score   = 0;
State.progress = [];
App._updateAuthUI();
App.showToast(‘Logged out. See you soon! 👋’);
App.showScreen(‘screen-home’);
},

/* ── SUBJECT SELECTION ── */
openSubject(subjectId) {
const def = SUBJECTS[subjectId]?.();
if (!def) return;

```
State.subject    = subjectId;
State.subjectDef = def;

document.getElementById('worlds-title').textContent = `${def.icon} ${def.name} Worlds`;
App._updateScoreDisplays();
App.renderWorlds();
App.showScreen('screen-worlds');
```

},

/* ── WORLDS SCREEN ── */
renderWorlds() {
const container = document.getElementById(‘worlds-list’);
container.innerHTML = ‘’;

```
State.subjectDef.worlds.forEach((world, idx) => {
  const unlocked = App._isWorldUnlocked(idx);

  // Calculate completion % for this world's progress bar
  const stagesDone = world.stages.filter(s =>
    State.progress.find(p =>
      p.subject === State.subject && p.world === world.id && p.stage === s.id && p.completed
    )
  ).length;
  const pct = Math.round((stagesDone / world.stages.length) * 100);

  const card = document.createElement('div');
  card.className = `world-card ${unlocked ? '' : 'locked'}`;
  card.innerHTML = `
    <div class="world-num c${idx % 5}">${world.icon || world.id}</div>
    <div class="world-info">
      <div class="world-name">World ${world.id}: ${world.name}</div>
      <div class="world-meta">${world.stages.length} stages · ${stagesDone}/${world.stages.length} done</div>
    </div>
    <div class="world-lock-icon">${unlocked ? (stagesDone === world.stages.length ? '✅' : '▶️') : '🔒'}</div>
    <div class="world-progress-bar" style="width:${pct}%"></div>
  `;
  if (unlocked) {
    card.onclick = () => App.openWorld(idx);
  } else {
    card.onclick = () => App.showToast('Complete the previous world first! 🔒');
  }
  container.appendChild(card);
});
```

},

/* ── STAGES SCREEN ── */
openWorld(worldIdx) {
State.worldIndex = worldIdx;
const world = State.subjectDef.worlds[worldIdx];

```
document.getElementById('stages-title').textContent =
  `World ${world.id}: ${world.name}`;
App._updateScoreDisplays();
App.renderStages(world);
App.showScreen('screen-stages');
```

},

renderStages(world) {
const container = document.getElementById(‘stages-list’);
container.innerHTML = ‘’;

```
world.stages.forEach((stage, idx) => {
  // Stage 1 is always open; subsequent stages unlock after completing the prior one
  const stageRecord = State.progress.find(p =>
    p.subject === State.subject && p.world === world.id && p.stage === stage.id
  );
  const prevRecord = idx > 0 ? State.progress.find(p =>
    p.subject === State.subject && p.world === world.id && p.stage === world.stages[idx - 1].id
  ) : { completed: true };

  const unlocked = idx === 0 || (prevRecord && prevRecord.completed);
  const done     = !!(stageRecord && stageRecord.completed);
  const stars    = done ? (stageRecord.stars || 1) : 0;

  const card = document.createElement('div');
  card.className = `stage-card ${unlocked ? '' : 'locked'}`;
  card.innerHTML = `
    <div class="stage-icon">${done ? '🌟' : unlocked ? '▶️' : '🔒'}</div>
    <div>
      <div class="stage-name">Stage ${stage.id}: ${stage.name}</div>
      <div class="stage-meta">${stage.questions} questions · ${stage.difficulty === 1 ? 'Easy' : stage.difficulty === 2 ? 'Medium' : 'Hard'}</div>
    </div>
    <div class="stage-stars">${done ? '⭐'.repeat(stars) : ''}</div>
  `;
  if (unlocked) {
    card.onclick = () => App.startStage(idx);
  } else {
    card.onclick = () => App.showToast('Complete the previous stage first! 🔒');
  }
  container.appendChild(card);
});
```

},

/* ── QUIZ ENGINE ── */
startStage(stageIdx) {
State.stageIndex = stageIdx;
const world = State.subjectDef.worlds[State.worldIndex];
const stage = world.stages[stageIdx];

```
// Generate questions via the subject module
State.questions = State.subjectDef.generateQuestions(world.id, stage.id, stage.questions);
State.qIndex    = 0;
State.correct   = 0;
State.answered  = false;

// Update quiz header
document.getElementById('quiz-subject-badge').textContent =
  `${State.subjectDef.name} · World ${world.id} · Stage ${stage.id}`;
document.getElementById('quiz-q-total').textContent = State.questions.length;
App._updateScoreDisplays();

App.showScreen('screen-quiz');
App.renderQuestion();
```

},

renderQuestion() {
const q      = State.questions[State.qIndex];
const total  = State.questions.length;
const qNum   = State.qIndex + 1;

```
State.answered = false;

// Progress bar
document.getElementById('quiz-q-num').textContent = `Q${qNum}`;
document.getElementById('quiz-progress-bar').style.width =
  `${((State.qIndex) / total) * 100}%`;

// Question text
document.getElementById('quiz-question').textContent = q.text;

// Answer buttons
const answersEl = document.getElementById('quiz-answers');
answersEl.innerHTML = '';
q.answers.forEach((ans) => {
  const btn = document.createElement('button');
  btn.className  = 'answer-btn';
  btn.textContent = ans.label;
  btn.onclick    = () => App.selectAnswer(ans, q, btn);
  answersEl.appendChild(btn);
});

// Clear feedback and tutor
const fb = document.getElementById('quiz-feedback');
fb.className = 'quiz-feedback hidden';
fb.textContent = '';
document.getElementById('ai-tutor-hint').classList.add('hidden');
```

},

selectAnswer(ans, q, btnEl) {
if (State.answered) return;
State.answered = true;

```
const allBtns = document.querySelectorAll('.answer-btn');
allBtns.forEach(b => b.disabled = true);

const isCorrect = ans.isCorrect;

if (isCorrect) {
  btnEl.classList.add('correct');
  State.correct++;
  State.score += 10; // +10 points per correct answer
  App._showFeedback(true, '✅ Correct! Great job!');
} else {
  btnEl.classList.add('wrong');
  // Highlight the correct answer
  allBtns.forEach(b => {
    if (b.textContent === String(q.answers.find(a => a.isCorrect)?.label)) {
      b.classList.add('correct');
    }
  });
  App._showFeedback(false, `❌ Not quite! The answer was: ${q.answers.find(a => a.isCorrect)?.label}`);
  // Show AI tutor hint after wrong answer
  App._showTutorHint(q.hint);
}

App._updateScoreDisplays();

// Auto-advance after 1.8 seconds
setTimeout(() => App.nextQuestion(), 1800);
```

},

_showFeedback(correct, msg) {
const fb = document.getElementById(‘quiz-feedback’);
fb.textContent  = msg;
fb.className    = `quiz-feedback ${correct ? 'correct-fb' : 'wrong-fb'}`;
},

/**

- AI TUTOR HOOK
- Currently shows a static hint from the question bank.
- Replace the content of this function to call the Anthropic API
- for a personalised, dynamic explanation when the AI feature is enabled.
- 
- Future integration point:
- const explanation = await callAITutor(q.text, q.hint);
- document.getElementById(‘tutor-bubble’).textContent = explanation;
  */
  _showTutorHint(hint) {
  if (!hint) return;
  document.getElementById(‘tutor-bubble’).textContent = `💡 Hint: ${hint}`;
  document.getElementById(‘ai-tutor-hint’).classList.remove(‘hidden’);
  },

nextQuestion() {
State.qIndex++;
if (State.qIndex >= State.questions.length) {
App.finishStage();
} else {
App.renderQuestion();
}
},

async finishStage() {
const total    = State.questions.length;
const correct  = State.correct;
const accuracy = correct / total;
const pct      = Math.round(accuracy * 100);
const points   = correct * 10;

```
const world = State.subjectDef.worlds[State.worldIndex];
const stage = world.stages[State.stageIndex];

// ── Save to Supabase ──
if (State.user) {
  await window.SupabaseHelpers.saveScore({
    subject:  State.subject,
    world:    world.id,
    stage:    stage.id,
    score:    points,
    total:    total * 10,
    accuracy: accuracy
  });
  await window.SupabaseHelpers.saveProgress(
    State.subject, world.id, stage.id, accuracy
  );
  // Reload progress
  State.progress = await window.SupabaseHelpers.loadProgress();
}

// ── Build result screen ──
const passed = accuracy >= 0.8;

document.getElementById('result-star').textContent =
  pct >= 90 ? '🌟' : pct >= 70 ? '⭐' : '💪';

document.getElementById('result-title').textContent =
  passed ? 'Stage Complete! 🎉' : 'Keep Practicing! 💪';

document.getElementById('result-score').textContent = `${pct}%`;
document.getElementById('result-points').textContent = `+${points} pts earned!`;

let msg = '';
if (pct === 100) msg = 'Perfect score! You are a superstar! 🌟';
else if (pct >= 90) msg = 'Amazing work! Almost perfect!';
else if (pct >= 80) msg = 'Great job! You passed! Next stage unlocked 🔓';
else if (pct >= 60) msg = 'Good effort! Try again to unlock the next stage.';
else msg = 'Keep practicing — you will get it! Every mistake is learning 💪';
document.getElementById('result-msg').textContent = msg;

// Next button logic
const nextBtn = document.getElementById('result-next-btn');
const isLastStage  = State.stageIndex >= world.stages.length - 1;
const isLastWorld  = State.worldIndex >= State.subjectDef.worlds.length - 1;

if (isLastStage && isLastWorld) {
  nextBtn.textContent = '🏆 Subject Complete!';
  nextBtn._action = 'subject-done';
} else if (isLastStage) {
  nextBtn.textContent = 'Next World 🗺️';
  nextBtn._action = 'next-world';
} else {
  nextBtn.textContent = 'Next Stage 🚀';
  nextBtn._action = 'next-stage';
}
nextBtn.disabled = !passed && !isLastStage; // allow going back even if failed

App._updateScoreDisplays();
App.showScreen('screen-result');
```

},

resultNext() {
const btn    = document.getElementById(‘result-next-btn’);
const action = btn._action;

```
if (action === 'next-stage') {
  App.startStage(State.stageIndex + 1);
} else if (action === 'next-world') {
  App.openWorld(State.worldIndex + 1);
} else {
  App.showToast('🏆 You completed the whole subject! Amazing!');
  App.showScreen('screen-home');
}
```

},

confirmQuit() {
const overlay = document.getElementById(‘modal-overlay’);
overlay.classList.remove(‘hidden’);
document.getElementById(‘modal-confirm’).onclick = () => {
overlay.classList.add(‘hidden’);
App.showScreen(‘screen-worlds’);
};
document.getElementById(‘modal-cancel’).onclick = () => {
overlay.classList.add(‘hidden’);
};
},

/* ── DASHBOARD ── */
async renderDashboard() {
if (!State.user) {
App.showToast(‘Please log in to see your dashboard! 🔐’);
App.showScreen(‘screen-auth’);
return;
}

```
// Name
const name = State.user.user_metadata?.full_name || State.user.email.split('@')[0];
document.getElementById('dash-name').textContent = name;

// Reload fresh data
State.progress = await window.SupabaseHelpers.loadProgress();
const recent   = await window.SupabaseHelpers.loadRecentScores(8);

// Total score
const totalPts = State.progress.reduce((sum, p) => {
  const stage = App._getStageFromProgress(p);
  return sum + (stage ? stage.questions * 10 * (p.stars / 3) : 0);
}, 0);
document.getElementById('dash-total-score').textContent =
  Math.round(State.score || recent.reduce((s, r) => s + r.score, 0));

// Worlds & stages done
const stagesDone = State.progress.filter(p => p.completed).length;
const worldsDone = Object.values(
  State.progress.filter(p => p.completed).reduce((acc, p) => {
    acc[`${p.subject}-${p.world}`] = true;
    return acc;
  }, {})
).length;
document.getElementById('dash-worlds-done').textContent = worldsDone;
document.getElementById('dash-stages-done').textContent = stagesDone;

// Subject progress
const subjList = document.getElementById('dash-progress-list');
subjList.innerHTML = '';
const subjectDefs = [
  window.MathSubject, window.ReadingSubject,
  window.ScienceSubject, window.SocialSubject
];
subjectDefs.forEach(def => {
  const totalStages = def.worlds.reduce((s, w) => s + w.stages.length, 0);
  const done = State.progress.filter(p => p.subject === def.id && p.completed).length;
  const pct  = Math.round((done / totalStages) * 100);
  subjList.innerHTML += `
    <div class="dash-subject-row">
      <div class="dash-subject-icon">${def.icon}</div>
      <div class="dash-subject-info">
        <div class="dash-subject-name">${def.name}</div>
        <div class="dash-subject-progress">${done} / ${totalStages} stages done</div>
      </div>
      <div class="mini-bar-wrap">
        <div class="mini-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
});

// Recent activity
const actEl = document.getElementById('dash-activity');
if (recent.length === 0) {
  actEl.innerHTML = '<p class="empty-msg">No activity yet. Start learning! 🚀</p>';
} else {
  actEl.innerHTML = recent.map(r => `
    <div class="activity-row">
      <span>${App._subjectIcon(r.subject)} ${r.subject} · W${r.world} S${r.stage}</span>
      <span>${Math.round((r.accuracy || 0) * 100)}% accuracy</span>
      <span class="activity-pts">+${r.score} pts</span>
    </div>`).join('');
}
```

},

_getStageFromProgress(p) {
const def = SUBJECTS[p.subject]?.();
if (!def) return null;
const world = def.worlds.find(w => w.id === p.world);
return world?.stages.find(s => s.id === p.stage);
},

_subjectIcon(subjectId) {
return { math:‘🔢’, reading:‘📚’, science:‘🔬’, social:‘🌎’ }[subjectId] || ‘📘’;
},

/* ── WORLD UNLOCK LOGIC ── */
_isWorldUnlocked(worldIdx) {
if (worldIdx === 0) return true;

```
const prevWorld = State.subjectDef.worlds[worldIdx - 1];
// All stages in previous world must be completed with ≥80% accuracy
return prevWorld.stages.every(stage => {
  const record = State.progress.find(p =>
    p.subject === State.subject &&
    p.world   === prevWorld.id &&
    p.stage   === stage.id
  );
  return record && record.completed && (record.accuracy === undefined || record.accuracy >= 0.8);
});
```

},

/* ── SCORE DISPLAY ── */
_updateScoreDisplays() {
[‘worlds-score’, ‘stages-score’, ‘quiz-score’].forEach(id => {
const el = document.getElementById(id);
if (el) el.textContent = State.score;
});
},

/* ── TOAST ── */
showToast(msg, duration = 2800) {
const toast = document.getElementById(‘toast’);
toast.textContent = msg;
toast.classList.remove(‘hidden’);
toast.classList.add(‘show’);
clearTimeout(App._toastTimer);
App._toastTimer = setTimeout(() => {
toast.classList.remove(‘show’);
setTimeout(() => toast.classList.add(‘hidden’), 300);
}, duration);
},
};

/* =====================================================================
BOOT
===================================================================== */
document.addEventListener(‘DOMContentLoaded’, () => {
App.init();
// Expose globally for onclick handlers in HTML
window.App = App;
});
