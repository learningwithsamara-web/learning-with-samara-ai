/**

- components/math.js
- =====================================================
- Math subject definition & question generator.
- 
- Worlds: Addition · Subtraction · Multiplication
- ```
      Division · Fractions
  ```
- 
- Each world has 3 stages with increasing difficulty.
- Difficulty scales the number ranges automatically.
- =====================================================
  */

const MathSubject = {
id: ‘math’,
name: ‘Math’,
icon: ‘🔢’,
color: ‘#FFD93D’,

/**

- World definitions.
- Each world has a name, 3 stages, and a generator function.
- stageCount is used by the unlock system.
  */
  worlds: [
  {
  id: 1,
  name: ‘Addition’,
  icon: ‘➕’,
  stageCount: 3,
  stages: [
  { id: 1, name: ‘Easy Addition’,   difficulty: 1, questions: 5 },
  { id: 2, name: ‘Medium Addition’, difficulty: 2, questions: 5 },
  { id: 3, name: ‘Hard Addition’,   difficulty: 3, questions: 5 }
  ]
  },
  {
  id: 2,
  name: ‘Subtraction’,
  icon: ‘➖’,
  stageCount: 3,
  stages: [
  { id: 1, name: ‘Easy Subtraction’,   difficulty: 1, questions: 5 },
  { id: 2, name: ‘Medium Subtraction’, difficulty: 2, questions: 5 },
  { id: 3, name: ‘Hard Subtraction’,   difficulty: 3, questions: 5 }
  ]
  },
  {
  id: 3,
  name: ‘Multiplication’,
  icon: ‘✖️’,
  stageCount: 3,
  stages: [
  { id: 1, name: ‘Times 2 & 3’,  difficulty: 1, questions: 5 },
  { id: 2, name: ‘Times 4–6’,    difficulty: 2, questions: 5 },
  { id: 3, name: ‘Times 7–10’,   difficulty: 3, questions: 5 }
  ]
  },
  {
  id: 4,
  name: ‘Division’,
  icon: ‘÷’,
  stageCount: 3,
  stages: [
  { id: 1, name: ‘Simple Division’,   difficulty: 1, questions: 5 },
  { id: 2, name: ‘Medium Division’,   difficulty: 2, questions: 5 },
  { id: 3, name: ‘Tricky Division’,   difficulty: 3, questions: 5 }
  ]
  },
  {
  id: 5,
  name: ‘Fractions’,
  icon: ‘½’,
  stageCount: 3,
  stages: [
  { id: 1, name: ‘Intro to Fractions’, difficulty: 1, questions: 5 },
  { id: 2, name: ‘Compare Fractions’,  difficulty: 2, questions: 5 },
  { id: 3, name: ‘Add Fractions’,      difficulty: 3, questions: 5 }
  ]
  }
  ],

/**

- Generates an array of question objects for a given world + stage.
- 
- Each question object:
- { text: string, answers: string[], correct: number (index), hint: string }
- 
- @param {number} worldId    - 1-based world number
- @param {number} stageId    - 1-based stage number
- @param {number} count      - number of questions
  */
  generateQuestions(worldId, stageId, count = 5) {
  const questions = [];
  for (let i = 0; i < count; i++) {
  questions.push(this._makeQuestion(worldId, stageId));
  }
  return questions;
  },

// ── Private question factory ──────────────────────

_makeQuestion(worldId, stageId) {
switch (worldId) {
case 1: return this._addition(stageId);
case 2: return this._subtraction(stageId);
case 3: return this._multiplication(stageId);
case 4: return this._division(stageId);
case 5: return this._fractions(stageId);
default: return this._addition(stageId);
}
},

// ── Addition ─────────────────────────────────────
_addition(stage) {
const max = stage === 1 ? 10 : stage === 2 ? 25 : 50;
const a = rand(1, max), b = rand(1, max);
const correct = a + b;
return {
text: `${a} + ${b} = ?`,
answers: shuffleWithCorrect(correct, generateWrongNumbers(correct, 3, max * 2)),
correctValue: correct,
hint: `Try counting up from ${a} by adding ${b}.`
};
},

// ── Subtraction ───────────────────────────────────
_subtraction(stage) {
const max = stage === 1 ? 10 : stage === 2 ? 25 : 50;
const b = rand(1, max), a = rand(b, max);
const correct = a - b;
return {
text: `${a} − ${b} = ?`,
answers: shuffleWithCorrect(correct, generateWrongNumbers(correct, 3, max)),
correctValue: correct,
hint: `Start at ${a} and count back ${b}.`
};
},

// ── Multiplication ────────────────────────────────
_multiplication(stage) {
const tableMax = stage === 1 ? 3 : stage === 2 ? 6 : 10;
const tableMin = stage === 1 ? 2 : stage === 2 ? 4 : 7;
const a = rand(tableMin, tableMax), b = rand(2, 10);
const correct = a * b;
return {
text: `${a} × ${b} = ?`,
answers: shuffleWithCorrect(correct, generateWrongNumbers(correct, 3, tableMax * 10)),
correctValue: correct,
hint: `Think of ${a} groups of ${b}.`
};
},

// ── Division ──────────────────────────────────────
_division(stage) {
const maxDiv = stage === 1 ? 5 : stage === 2 ? 10 : 12;
const b = rand(2, maxDiv), c = rand(2, maxDiv);
const a = b * c; // ensure no remainder
const correct = c;
return {
text: `${a} ÷ ${b} = ?`,
answers: shuffleWithCorrect(correct, generateWrongNumbers(correct, 3, maxDiv)),
correctValue: correct,
hint: `How many groups of ${b} fit into ${a}?`
};
},

// ── Fractions ─────────────────────────────────────
_fractions(stage) {
const FRACS = [
{ display: ‘½’,  value: 0.5,   num: 1, den: 2 },
{ display: ‘¼’,  value: 0.25,  num: 1, den: 4 },
{ display: ‘¾’,  value: 0.75,  num: 3, den: 4 },
{ display: ‘⅓’,  value: 0.333, num: 1, den: 3 },
{ display: ‘⅔’,  value: 0.667, num: 2, den: 3 },
{ display: ‘⅕’,  value: 0.2,   num: 1, den: 5 },
{ display: ‘⅖’,  value: 0.4,   num: 2, den: 5 },
{ display: ‘⅗’,  value: 0.6,   num: 3, den: 5 },
];

```
if (stage === 1) {
  // Identify the fraction displayed
  const frac = FRACS[rand(0, 3)];
  const distractors = FRACS.filter(f => f.display !== frac.display).slice(0, 3).map(f => f.display);
  return {
    text: `Which fraction is ${frac.num}/${frac.den}?`,
    answers: shuffleWithCorrect(frac.display, distractors),
    correctValue: frac.display,
    hint: `The bottom number (denominator) tells you how many equal parts. The top (numerator) tells you how many you have.`
  };
}

if (stage === 2) {
  // Which is bigger?
  const [f1, f2] = pick2(FRACS);
  const bigger = f1.value > f2.value ? f1.display : f2.display;
  return {
    text: `Which is bigger: ${f1.display} or ${f2.display}?`,
    answers: [f1.display, f2.display, 'They are equal', 'Can\'t tell'],
    correctValue: bigger,
    hint: `Convert both to the same denominator to compare.`
  };
}

// Stage 3: simple fraction addition (same denominator)
const den = [2, 4, 5][rand(0, 2)];
const n1 = rand(1, den - 1), n2 = rand(1, den - n1);
const sum = n1 + n2;
const correctDisplay = sum >= den ? `${Math.floor(sum/den)} ${sum%den}/${den}` : `${sum}/${den}`;
const wrong = [`${n1 + n2 + 1}/${den}`, `${n1 * n2}/${den}`, `${n1}/${n2 + den}`];
return {
  text: `${n1}/${den} + ${n2}/${den} = ?`,
  answers: shuffleWithCorrect(correctDisplay, wrong),
  correctValue: correctDisplay,
  hint: `When denominators are the same, just add the top numbers!`
};
```

}
};

// ── Utility functions ─────────────────────────────────

/** Random integer min–max inclusive */
function rand(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate wrong answer numbers near the correct value */
function generateWrongNumbers(correct, count, maxVal) {
const wrongs = new Set();
const attempts = 50;
let i = 0;
while (wrongs.size < count && i++ < attempts) {
const offset = rand(-5, 5);
const candidate = correct + offset;
if (candidate !== correct && candidate >= 0 && candidate <= maxVal + 10) {
wrongs.add(String(candidate));
}
}
// Fallback if not enough generated
while (wrongs.size < count) {
wrongs.add(String(correct + wrongs.size + 1));
}
return Array.from(wrongs);
}

/**

- Build a 4-item answer array with the correct answer shuffled in.
- Returns array of { label, isCorrect }.
  */
  function shuffleWithCorrect(correct, wrongs) {
  const all = [
  { label: String(correct), isCorrect: true },
  …wrongs.slice(0, 3).map(w => ({ label: String(w), isCorrect: false }))
  ];
  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i–) {
  const j = Math.floor(Math.random() * (i + 1));
  [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
  }

/** Pick 2 distinct items from an array */
function pick2(arr) {
const a = rand(0, arr.length - 1);
let b = rand(0, arr.length - 2);
if (b >= a) b++;
return [arr[a], arr[b]];
}

// Expose globally
window.MathSubject = MathSubject;
