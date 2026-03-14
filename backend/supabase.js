const SUPABASE_URL  = ‘https://bfivpvlzehtmksnmgnzb.supabase.co’;
const SUPABASE_ANON = ‘bfivpvlzehtmksnmgnzb’;

const { createClient } = supabase;
window.DB = createClient(SUPABASE_URL, SUPABASE_ANON);

async function authSignUp(email, password, name) {
const { data, error } = await window.DB.auth.signUp({
email,
password,
options: { data: { full_name: name } }
});
return { data, error };
}

async function authLogin(email, password) {
const { data, error } = await window.DB.auth.signInWithPassword({ email, password });
return { data, error };
}

async function authLogout() {
const { error } = await window.DB.auth.signOut();
return { error };
}

async function getCurrentUser() {
const { data: { user } } = await window.DB.auth.getUser();
return user;
}

async function saveScore(result) {
const user = await getCurrentUser();
if (!user) return { error: ‘Not logged in’ };
const { data, error } = await window.DB
.from(‘scores’)
.insert({
user_id:    user.id,
student:    user.user_metadata?.full_name || user.email,
subject:    result.subject,
world:      result.world,
stage:      result.stage,
score:      result.score,
total:      result.total,
accuracy:   result.accuracy,
created_at: new Date().toISOString()
});
return { data, error };
}

async function saveProgress(subject, world, stage, accuracy) {
const user = await getCurrentUser();
if (!user) return { error: ‘Not logged in’ };
const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
const { data, error } = await window.DB
.from(‘progress’)
.upsert({
user_id:    user.id,
subject,
world,
stage,
completed:  true,
stars,
accuracy,
created_at: new Date().toISOString()
}, { onConflict: ‘user_id,subject,world,stage’ });
return { data, error };
}

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

window.SupabaseHelpers = {
authSignUp,
authLogin,
authLogout,
getCurrentUser,
saveScore,
saveProgress,
loadProgress,
loadRecentScores
};
