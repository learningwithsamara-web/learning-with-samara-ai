/**

- backend/supabase.js
- =====================================================
- Supabase client setup and all database operations
- for Learning With Samara AI.
- 
- SETUP INSTRUCTIONS:
- 1. Go to https://supabase.com → your project → Settings → API
- 1. Copy your Project URL and anon/public key
- 1. Replace the placeholder values below
- 
- REQUIRED SUPABASE TABLE: “scores”
- Columns:
- id          uuid (auto)
- user_id     uuid (references auth.users)
- student     text
- subject     text
- world       int
- stage       int
- score       int
- total       int
- accuracy    float
- created_at  timestamptz (default: now())
- 
- REQUIRED SUPABASE TABLE: “progress”
- Columns:
- id          uuid (auto)
- user_id     uuid (references auth.users)
- subject     text
- world       int
- stage       int
- completed   bool
- stars       int
- created_at  timestamptz (default: now())
- =====================================================
  */

// ── CONFIGURATION ────────────────────────────────────
// Replace these with your actual Supabase project values
const SUPABASE_URL  = ‘https://bfivpvlzehtmksnmgnzb.supabase.co’;
const SUPABASE_ANON = ‘bfivpvlzehtmksnmgnzb’;
// ────────────────────────────────────────────────────

const { createClient } = supabase;

/**

- Initialise the Supabase client.
- Exported as `window.DB` so every other module can use it.
  */
  window.DB = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── AUTH HELPERS ─────────────────────────────────────

/**

- Sign up a new student with email + password.
- @param {string} email
- @param {string} password
- @param {string} name - display name stored in user metadata
  */
  async function authSignUp(email, password, name) {
  const { data, error } = await window.DB.auth.signUp({
  email,
  password,
  options: { data: { full_name: name } }
  });
  return { data, error };
  }

/**

- Log in an existing student.
- @param {string} email
- @param {string} password
  */
  async function authLogin(email, password) {
  const { data, error } = await window.DB.auth.signInWithPassword({ email, password });
  return { data, error };
  }

/**

- Sign out the current student.
  */
  async function authLogout() {
  const { error } = await window.DB.auth.signOut();
  return { error };
  }

/**

- Returns the currently logged-in user object, or null.
  */
  async function getCurrentUser() {
  const { data: { user } } = await window.DB.auth.getUser();
  return user;
  }

// ── SCORE / PROGRESS HELPERS ──────────────────────────

/**

- Save a completed stage result to Supabase.
- 
- @param {object} result - { subject, world, stage, score, total, accuracy }
  */
  async function saveScore(result) {
  const user = await getCurrentUser();
  if (!user) return { error: ‘Not logged in’ };

const { data, error } = await window.DB
.from(‘scores’)
.insert({
user_id:  user.id,
student:  user.user_metadata?.full_name || user.email,
subject:  result.subject,
world:    result.world,
stage:    result.stage,
score:    result.score,
total:    result.total,
accuracy: result.accuracy,
created_at: new Date().toISOString()
});

return { data, error };
}

/**

- Mark a stage as completed in the progress table.
- Also records the star rating (1–3 based on accuracy).
- 
- @param {string} subject
- @param {number} world
- @param {number} stage
- @param {number} accuracy - 0 to 1
  */
  async function saveProgress(subject, world, stage, accuracy) {
  const user = await getCurrentUser();
  if (!user) return { error: ‘Not logged in’ };

// Star rating: 3★ ≥90%  · 2★ ≥70%  · 1★ otherwise
const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;

// Upsert so replaying a stage updates rather than duplicates
const { data, error } = await window.DB
.from(‘progress’)
.upsert({
user_id:   user.id,
subject,
world,
stage,
completed: true,
stars,
created_at: new Date().toISOString()
}, { onConflict: ‘user_id,subject,world,stage’ });

return { data, error };
}

/**

- Load all progress rows for the current user.
- Returns an array of progress objects.
  */
  async function loadProgress() {
  const user = await getCurrentUser();
  if (!user) return [];

const { data, error } = await window.DB
.from(‘progress’)
.select(’*’)
.eq(‘user_id’, user.id);

if (error) { console.error(‘loadProgress error:’, error); return []; }
return data || [];
}

/**

- Load recent score history for the dashboard.
- @param {number} limit - how many rows to fetch
  */
  async function loadRecentScores(limit = 10) {
  const user = await getCurrentUser();
  if (!user) return [];

const { data, error } = await window.DB
.from(‘scores’)
.select(’*’)
.eq(‘user_id’, user.id)
.order(‘created_at’, { ascending: false })
.limit(limit);

if (error) { console.error(‘loadRecentScores error:’, error); return []; }
return data || [];
}

/**

- Check whether a world is unlocked for the current user.
- A world unlocks when ALL stages in the PREVIOUS world were completed
- with ≥80% accuracy.
- 
- @param {string} subject
- @param {number} worldIndex  - 0-based
- @param {object} worldDef    - world definition from the subject module
- @param {Array}  progressArr - full progress array from loadProgress()
  */
  function isWorldUnlocked(subject, worldIndex, worldDef, progressArr) {
  if (worldIndex === 0) return true; // first world always open

// Find stages from the previous world
// Each world has a fixed number of stages (see subject modules)
const prevWorldStages = worldDef.stageCount || 3; // default 3 stages

for (let s = 1; s <= prevWorldStages; s++) {
const record = progressArr.find(p =>
p.subject === subject &&
p.world   === worldIndex &&   // worldIndex here = prev world (1-based prev)
p.stage   === s
);
if (!record || record.accuracy < 0.8) return false;
}
return true;
}

// Expose helpers globally
window.SupabaseHelpers = {
authSignUp,
authLogin,
authLogout,
getCurrentUser,
saveScore,
saveProgress,
loadProgress,
loadRecentScores,
isWorldUnlocked
};
