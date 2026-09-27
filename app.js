/*
  Did I Move?
  Copyright (C) 2026 Maxim Tam

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

// ---------------------------------------------------------------------------
// The program
//
// Eight movement "families". Each family is a ladder of levels, easiest first.
// You start on the bottom rung. Tell the app an exercise felt easy twice in a
// row and it moves you up one rung; say it was too hard and it moves you down.
// Sets and reps live on the level so the ladder can get harder in either way.
// ---------------------------------------------------------------------------

const FAMILIES = {
  push: {
    name: "Push",
    works: "chest, shoulders, arms",
    levels: [
      {
        name: "Wall push-up",
        sets: 2,
        reps: 8,
        how: "Stand an arm's length from a wall, hands flat on it at shoulder height. Bend your elbows to bring your chest toward the wall, then push back to straight arms.",
        cues: ["Body in one straight line, heels down", "Elbows point back at about 45°, not straight out", "Slow down, fast up"],
        avoid: "Letting your hips sag forward or your head poke toward the wall.",
      },
      {
        name: "Incline push-up",
        sets: 2,
        reps: 8,
        how: "Hands on a sturdy counter, table, or the back of a couch. Walk your feet back until your body is a straight line, then lower your chest to the edge and press away.",
        cues: ["Squeeze your glutes so your hips don't sag", "Hands just wider than shoulders", "Chest touches the edge every rep"],
        avoid: "Choosing something that can slide. Push it against a wall first.",
      },
      {
        name: "Knee push-up",
        sets: 3,
        reps: 6,
        how: "Kneel, hands on the floor under your shoulders, body straight from knees to head. Lower your chest to just above the floor and press back up.",
        cues: ["Hips stay in line, don't sit back", "Look at the floor a foot ahead of you", "Full lockout at the top"],
        avoid: "Half reps. Shorter range with full control beats a wobbly fast one.",
      },
      {
        name: "Push-up",
        sets: 3,
        reps: 5,
        how: "Hands under shoulders, feet together, body a straight plank. Lower until your chest is a fist's height off the floor, then press back to straight arms.",
        cues: ["Brace like someone is about to poke your stomach", "Elbows tucked at 45°", "Breathe in going down, out pushing up"],
        avoid: "Flaring elbows out to the sides. If you can't hold the line, drop back to knees for the last reps.",
      },
      {
        name: "Push-up",
        sets: 3,
        reps: 10,
        how: "Same movement, more reps. Own every rep before adding the next.",
        cues: ["Same straight line on rep 10 as on rep 1", "Pause a beat at the bottom", "Push the floor away"],
        avoid: "Speeding up to get them done. If form goes, the set is over.",
      },
    ],
  },
  squat: {
    name: "Squat",
    works: "thighs, glutes",
    levels: [
      {
        name: "Sit-to-stand",
        sets: 2,
        reps: 8,
        how: "Sit on the front edge of a chair, feet flat under your knees. Stand up without using your hands, then sit back down slowly under control.",
        cues: ["Push through your whole foot", "Reach arms forward for balance", "Touch down lightly, don't plop"],
        avoid: "Rocking forward to get momentum.",
      },
      {
        name: "Bodyweight squat",
        sets: 2,
        reps: 10,
        how: "Feet shoulder width, toes slightly out. Sit your hips back and down as if onto a chair, as low as feels comfortable, then stand tall.",
        cues: ["Knees track over your toes", "Chest up, eyes forward", "Heels stay glued to the floor"],
        avoid: "Knees caving inward. Push them out over your little toes.",
      },
      {
        name: "Bodyweight squat",
        sets: 3,
        reps: 12,
        image: "06b-bodyweight-squat-deep",
        how: "Same squat, deeper if you can: aim for thighs parallel to the floor.",
        cues: ["Weight in your mid-foot", "Pause a second at the bottom", "Stand all the way up and squeeze glutes"],
        avoid: "Bouncing out of the bottom.",
      },
      {
        name: "Reverse lunge",
        sets: 3,
        reps: 8,
        perSide: true,
        how: "Step one foot back and lower until both knees are near 90°. Push through the front foot to return to standing. Alternate legs.",
        cues: ["Torso upright", "Back knee hovers just above the floor", "Front heel stays down"],
        avoid: "A tiny step back. Take a long enough stride that the front knee stays over the ankle.",
      },
      {
        name: "Split squat",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "Stand in a long stride and stay there. Lower straight down until the back knee nearly touches, then drive up. Do all reps on one side, then switch.",
        cues: ["Most of the weight on the front leg", "Down slow, up strong", "Hips square to the front"],
        avoid: "Leaning forward over the front knee.",
      },
    ],
  },
  bridge: {
    name: "Hips",
    works: "glutes, hamstrings, lower back",
    levels: [
      {
        name: "Glute bridge",
        sets: 2,
        reps: 10,
        how: "Lie on your back, knees bent, feet flat near your hips. Squeeze your glutes to lift your hips until your body is a straight line from knees to shoulders. Lower slowly.",
        cues: ["Push through your heels", "Ribs down, don't arch your back", "Squeeze hard at the top for a second"],
        avoid: "Lifting with your lower back. If it aches, tuck your tailbone and lift less.",
      },
      {
        name: "Glute bridge",
        sets: 3,
        reps: 15,
        how: "Same bridge, more reps, with a full two-second hold at the top.",
        cues: ["Knees stay hip width", "Exhale on the squeeze", "Control the way down"],
        avoid: "Rushing. This one is about the squeeze, not the count.",
      },
      {
        name: "Single-leg glute bridge",
        sets: 3,
        reps: 8,
        perSide: true,
        how: "Same set-up, but hold one knee to your chest. Bridge up on the other leg, keeping hips level. Do all reps, then switch.",
        cues: ["Hips level, don't let one side drop", "Working heel pushes into the floor", "Slow and even"],
        avoid: "Cramping in the hamstring? Move the foot a little closer to your hips.",
      },
    ],
  },
  plank: {
    name: "Plank",
    works: "core, shoulders",
    levels: [
      {
        name: "Knee plank",
        sets: 2,
        seconds: 20,
        how: "Forearms on the floor, elbows under shoulders, knees down. Lift your hips until your body is a straight line from knees to head. Hold.",
        cues: ["Pull your belly button toward your spine", "Neck long, look at your hands", "Breathe normally"],
        avoid: "Holding your breath.",
      },
      {
        name: "Plank",
        sets: 2,
        seconds: 30,
        how: "Forearms down, elbows under shoulders, feet together. Lift onto your toes so your body is a straight line. Hold.",
        cues: ["Squeeze glutes and quads", "Push the floor away with your forearms", "Tuck your tailbone slightly"],
        avoid: "Hips too high or sagging. Ask someone to check, or film yourself once.",
      },
      {
        name: "Plank",
        sets: 3,
        seconds: 40,
        how: "Same plank, longer. Stay tight the whole time; the last ten seconds count the most.",
        cues: ["Steady breathing", "Everything squeezed", "Drop down early rather than let your hips sag"],
        avoid: "Chasing time with bad position.",
      },
      {
        name: "Plank shoulder taps",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "High plank on your hands. Lift one hand and tap the opposite shoulder, put it back, then the other. Hips stay dead still.",
        cues: ["Feet wider for more balance", "Hips don't rock", "Slow taps"],
        avoid: "Twisting the hips. If they rock, widen your feet or go slower.",
      },
    ],
  },
  back: {
    name: "Back",
    works: "upper back, shoulders, spine",
    levels: [
      {
        name: "Superman hold",
        sets: 2,
        seconds: 15,
        how: "Lie face down, arms stretched overhead. Lift your arms, chest, and legs a little off the floor and hold.",
        cues: ["Look at the floor, not forward", "Squeeze glutes", "Reach long through fingers and toes"],
        avoid: "Cranking your neck up.",
      },
      {
        name: "Superman",
        sets: 2,
        reps: 10,
        how: "Same position. Lift arms, chest, and legs for a two-second squeeze, then lower with control.",
        cues: ["Lift with your back, not by swinging", "Exhale on the way up", "Rest fully between reps if you need"],
        avoid: "Jerking up. Smooth on, smooth off.",
      },
      {
        name: "Reverse snow angel",
        sets: 3,
        reps: 10,
        how: "Lie face down, arms by your sides, palms down. Lift your arms and chest slightly, then sweep your arms in a wide arc overhead and back down, like making a snow angel.",
        cues: ["Thumbs up the whole way", "Keep the arms hovering, never touching the floor", "Squeeze the shoulder blades together"],
        avoid: "Shrugging. Keep your shoulders away from your ears.",
      },
      {
        name: "Prone Y-T-W",
        sets: 3,
        reps: 8,
        how: "Face down, chest slightly lifted. Raise your arms into a Y, lower, then a T, lower, then a W (elbows bent and pulled back). That's one rep.",
        cues: ["Thumbs pointing to the ceiling", "Pinch the shoulder blades on the W", "Small lifts, big squeeze"],
        avoid: "Arching the low back. The lift comes from the upper back only.",
      },
    ],
  },
  hinge: {
    name: "Hinge",
    works: "hamstrings, glutes, balance",
    levels: [
      {
        name: "Good morning",
        sets: 2,
        reps: 10,
        how: "Stand tall, hands on hips or behind your head. Push your hips back and fold forward with a flat back until you feel your hamstrings stretch, then stand back up.",
        cues: ["Knees soft, not locked", "Back stays flat like a table", "Hips go back, not down"],
        avoid: "Rounding your back. Go less deep and keep it flat.",
      },
      {
        name: "Single-leg deadlift (touch down)",
        sets: 2,
        reps: 8,
        perSide: true,
        how: "Stand on one leg. Hinge forward and reach toward the floor while the free leg drifts back, lightly touching the toe down for balance. Return to standing.",
        cues: ["Hips square", "Flat back", "Stand near a wall to steady yourself"],
        avoid: "Twisting toward the standing leg.",
      },
      {
        name: "Step-up",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "Use a stair or sturdy step. Put one foot on it and drive through that foot to stand up on top, then lower slowly. Do all reps, then switch.",
        cues: ["Working leg does the work, don't push off the floor foot", "Knee tracks over toes", "Control the descent"],
        avoid: "A step that is too high. Knee at or below hip height.",
      },
      {
        name: "Single-leg deadlift",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "Same as before, but the free leg stays in the air. Reach the fingertips toward the floor and the back heel toward the wall behind you.",
        cues: ["Body is one line from head to heel", "Slow, three seconds each way", "Grip the floor with your toes"],
        avoid: "Wobbling for a minute. If you lose balance, tap the foot down and continue.",
      },
    ],
  },
  core: {
    name: "Core",
    works: "deep abs, hips",
    levels: [
      {
        name: "Dead bug",
        sets: 2,
        reps: 8,
        perSide: true,
        how: "Lie on your back, arms straight up, knees bent at 90° over your hips. Slowly lower your right arm overhead and your left leg toward the floor, then return. Switch sides.",
        cues: ["Low back pressed into the floor the whole time", "Exhale as you extend", "Move slowly"],
        avoid: "Arching your back. If it lifts, don't go as far.",
      },
      {
        name: "Dead bug",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "Same dead bug, more reps and a two-second pause at the bottom of each one.",
        cues: ["Pause, then return", "Ribs down", "Steady breathing"],
        avoid: "Letting the still leg drift.",
      },
      {
        name: "Bird dog",
        sets: 3,
        reps: 10,
        perSide: true,
        how: "On hands and knees. Reach your right arm forward and left leg back until both are level with your torso. Hold a second, return, switch.",
        cues: ["Imagine a glass of water on your low back", "Reach long, don't lift high", "Hips stay level"],
        avoid: "Rotating the hips to lift the leg.",
      },
      {
        name: "Hollow hold",
        sets: 3,
        seconds: 20,
        how: "Lie on your back, press your low back into the floor, and lift shoulders and straight legs slightly off the ground. Arms by your ears or by your sides to make it easier.",
        cues: ["Low back never leaves the floor", "Chin slightly tucked", "Bend knees if the back lifts"],
        avoid: "Neck strain. Look at your knees, not the ceiling.",
      },
    ],
  },
  side: {
    name: "Side plank",
    works: "obliques, hips",
    levels: [
      {
        name: "Knee side plank",
        sets: 2,
        seconds: 15,
        perSide: true,
        how: "Lie on your side, forearm on the floor, elbow under your shoulder, knees bent. Lift your hips so your body is a straight line from knees to head.",
        cues: ["Elbow directly under shoulder", "Push the floor away", "Top hand on hip or reaching up"],
        avoid: "Sinking into the shoulder.",
      },
      {
        name: "Side plank",
        sets: 2,
        seconds: 20,
        perSide: true,
        how: "Same, but legs straight and stacked. Lift the hips high and hold.",
        cues: ["Squeeze the top glute", "Hips forward, don't let them drift back", "Breathe"],
        avoid: "Hips dropping. If they do, put the lower knee down to finish.",
      },
      {
        name: "Side plank",
        sets: 3,
        seconds: 30,
        perSide: true,
        image: "26b-side-plank-leg-raised",
        how: "Same side plank, longer. Optionally lift the top leg for the last ten seconds.",
        cues: ["Long line from heel to head", "Steady breathing", "Both sides equal"],
        avoid: "Cheating on the weaker side. It gets the same time.",
      },
    ],
  },
};

const DAYS = {
  A: { name: "Push & legs", families: ["push", "squat", "bridge", "plank"] },
  B: { name: "Back & core", families: ["back", "hinge", "core", "side"] },
  R: { name: "Recovery", families: [] },
};

// Two strength days alternate; every seventh session is a recovery day.
// The rotation follows sessions completed, not the calendar, so a missed day
// never skips a workout.
const ROTATION = ["A", "B", "A", "B", "A", "B", "R"];

const WARMUP = [
  { name: "March in place", seconds: 45, how: "Lift your knees to hip height and swing your arms. Get a little warm." },
  { name: "Arm circles", seconds: 30, how: "Big slow circles forward for half the time, then backward." },
  { name: "Hip circles", seconds: 30, how: "Hands on hips, draw big circles with your hips. Switch direction halfway." },
  { name: "Bodyweight good mornings", seconds: 30, how: "Hands behind head, push hips back and fold forward with a flat back, stand tall. Easy pace." },
];

const COOLDOWN = [
  { name: "Chest stretch", seconds: 30, how: "Forearm on a door frame, elbow at shoulder height, gently turn your body away until you feel your chest open." },
  { name: "Quad stretch", seconds: 30, perSide: true, how: "Stand on one leg, pull the other heel toward your glute. Hold something for balance. Knees together." },
  { name: "Hamstring stretch", seconds: 30, perSide: true, how: "Heel on a low step, leg straight, hinge forward with a flat back until you feel the back of the thigh." },
];

const RECOVERY = [
  { name: "Cat-cow", seconds: 45, how: "On hands and knees. Arch your back up and tuck your chin, then let your belly drop and lift your gaze. Slow, with your breath." },
  { name: "Child's pose", seconds: 45, how: "Knees wide, sit back onto your heels and reach your arms forward along the floor. Let your back relax." },
  { name: "Hip flexor stretch", seconds: 30, perSide: true, how: "Half kneeling. Tuck your tailbone and shift your hips forward until you feel the front of the back hip." },
  { name: "Figure-4 stretch", seconds: 30, perSide: true, how: "Lie on your back, cross one ankle over the other knee, and pull the bottom leg toward you." },
  { name: "Doorway chest stretch", seconds: 30, how: "Both forearms on a door frame, step through gently. Breathe into the stretch." },
  { name: "Calf stretch", seconds: 30, perSide: true, how: "Hands on a wall, one foot back with the heel down and the knee straight. Lean in." },
  { name: "Easy walk or march", seconds: 120, how: "Walk around the room, up and down the stairs, or march in place. Nothing hard. Just move." },
];

const REST_DEFAULT = 45;
const SIDE_SWITCH_SECONDS = 5;
const FEEDBACK = { easy: "too easy", right: "just right", hard: "too hard" };

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const STORAGE_KEY = "did_i_move";

function defaultState() {
  const progress = {};
  for (const key of Object.keys(FAMILIES)) progress[key] = { level: 0, easy: 0 };
  return {
    version: 1,
    progress,
    sessions: [],
    settings: { rest: REST_DEFAULT, reminder: "", sound: true },
    reminded: "",
    active: null,
  };
}

let state = loadState();

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const merged = { ...base, ...saved };
      merged.settings = { ...base.settings, ...(saved.settings || {}) };
      merged.progress = { ...base.progress, ...(saved.progress || {}) };
      for (const key of Object.keys(FAMILIES)) merged.progress[key] = sanitizeProgress(key, merged.progress[key]);
      if (!Array.isArray(merged.sessions)) merged.sessions = [];
      return merged;
    }
  } catch (e) {
    console.warn("Failed to load state:", e);
  }
  return base;
}

// A level must be an integer index into the family's ladder. Anything else
// (a fractional or out-of-range value from a bad import) falls back to a
// safe value instead of crashing every render.
function sanitizeProgress(familyKey, p) {
  const max = FAMILIES[familyKey].levels.length - 1;
  const level = p && Number.isInteger(p.level) ? Math.min(Math.max(p.level, 0), max) : 0;
  const easy = p && Number.isInteger(p.easy) && p.easy >= 0 ? p.easy : 0;
  return { level, easy };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save state:", e);
  }
}

// Another tab wrote newer state. Adopt it so this tab's next save cannot
// overwrite it with a stale snapshot. The storage event only fires in the
// tabs that did not perform the write.
window.addEventListener("storage", (e) => {
  if (e.key !== null && e.key !== STORAGE_KEY) return;
  state = loadState();
  if (!state.active) stopTimer();
  render();
});

// ---------------------------------------------------------------------------
// Dates and streaks. Days are local calendar days, keyed "YYYY-MM-DD".
// ---------------------------------------------------------------------------

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function shiftDay(ts, days) {
  const d = new Date(ts);
  d.setDate(d.getDate() + days);
  return d.getTime();
}

function startOfDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function doneDays() {
  return new Set(state.sessions.map((s) => dayKey(s.finishedAt)));
}

function doneToday() {
  return doneDays().has(dayKey(Date.now()));
}

// Consecutive days ending today, or ending yesterday if today isn't done yet
// (the streak is alive but waiting on you).
function currentStreak() {
  const days = doneDays();
  let cursor = startOfDay(Date.now());
  if (!days.has(dayKey(cursor))) cursor = shiftDay(cursor, -1);
  let n = 0;
  while (days.has(dayKey(cursor))) {
    n++;
    cursor = shiftDay(cursor, -1);
  }
  return n;
}

function longestStreak() {
  const keys = [...doneDays()].sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const k of keys) {
    const ts = new Date(k + "T00:00:00").getTime();
    run = prev !== null && dayKey(shiftDay(prev, 1)) === k ? run + 1 : 1;
    prev = ts;
    if (run > best) best = run;
  }
  return best;
}

function formatDate(ts) {
  const d = new Date(ts);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}`;
}

function formatClock(sec) {
  sec = Math.max(0, Math.ceil(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}`;
}

function formatDuration(ms) {
  const min = Math.round(ms / 60000);
  return min < 1 ? "under a minute" : `${min} min`;
}

// ---------------------------------------------------------------------------
// Building today's session
// ---------------------------------------------------------------------------

function todayKey() {
  return ROTATION[state.sessions.filter((s) => !s.manual).length % ROTATION.length];
}

function currentLevel(familyKey) {
  const fam = FAMILIES[familyKey];
  const p = state.progress[familyKey] || { level: 0, easy: 0 };
  const idx = Math.min(Math.max(p.level, 0), fam.levels.length - 1);
  return { idx, level: fam.levels[idx] };
}

function targetLabel(step) {
  const side = step.perSide ? " each side" : "";
  const work = step.seconds ? `${step.seconds}s` : `${step.reps} reps`;
  return step.sets > 1 ? `${step.sets} × ${work}${side}` : `${work}${side}`;
}

// ---------------------------------------------------------------------------
// Illustrations. One card per distinct movement; levels that differ only in
// reps or hold time share artwork. Files live in images/ as WebP. The
// standalone build inlines them as data URIs via window.DIM_IMAGES.
// ---------------------------------------------------------------------------

const IMAGES = {
  "Wall push-up": "01-wall-push-up",
  "Incline push-up": "02-incline-push-up",
  "Knee push-up": "03-knee-push-up",
  "Push-up": "04-push-up",
  "Sit-to-stand": "05-sit-to-stand",
  "Bodyweight squat": "06-bodyweight-squat",
  "Reverse lunge": "07-reverse-lunge",
  "Split squat": "08-split-squat",
  "Glute bridge": "09-glute-bridge",
  "Single-leg glute bridge": "10-single-leg-glute-bridge",
  "Knee plank": "11-knee-plank",
  Plank: "12-plank",
  "Plank shoulder taps": "13-plank-shoulder-taps",
  "Superman hold": "14-superman-hold",
  Superman: "15-superman",
  "Reverse snow angel": "16-reverse-snow-angel",
  "Prone Y-T-W": "17-prone-y-t-w",
  "Good morning": "18-good-morning",
  "Single-leg deadlift (touch down)": "19-single-leg-deadlift-touch-down",
  "Step-up": "20-step-up",
  "Single-leg deadlift": "21-single-leg-deadlift",
  "Dead bug": "22-dead-bug",
  "Bird dog": "23-bird-dog",
  "Hollow hold": "24-hollow-hold",
  "Knee side plank": "25-knee-side-plank",
  "Side plank": "26-side-plank",
  "March in place": "27-march-in-place",
  "Arm circles": "28-arm-circles",
  "Hip circles": "29-hip-circles",
  "Bodyweight good mornings": "30-bodyweight-good-mornings",
  "Chest stretch": "31-chest-stretch",
  "Quad stretch": "32-quad-stretch",
  "Hamstring stretch": "33-hamstring-stretch",
  "Cat-cow": "34-cat-cow",
  "Child's pose": "35-childs-pose",
  "Hip flexor stretch": "36-hip-flexor-stretch",
  "Figure-4 stretch": "37-figure-4-stretch",
  "Doorway chest stretch": "38-doorway-chest-stretch",
  "Calf stretch": "39-calf-stretch",
  "Easy walk or march": "40-easy-walk-or-march",
};

function imageSrc(item) {
  const key = item.image || IMAGES[item.name];
  if (!key) return "";
  const inlined = window.DIM_IMAGES && window.DIM_IMAGES[key];
  return inlined || `images/${key}.webp`;
}

function imageTag(item, cls) {
  const src = imageSrc(item);
  if (!src) return "";
  return `<img class="${cls}" src="${src}" alt="${esc(item.name)}" width="1200" height="800" loading="lazy" decoding="async" />`;
}

function toStep(kind, item, extra) {
  return {
    kind,
    name: item.name,
    image: item.image || "",
    sets: item.sets || 1,
    reps: item.reps || 0,
    seconds: item.seconds || 0,
    perSide: !!item.perSide,
    how: item.how || "",
    cues: item.cues || [],
    avoid: item.avoid || "",
    ...extra,
  };
}

function buildSteps(dayKeyLetter, short) {
  const steps = [];
  if (dayKeyLetter === "R") {
    for (const item of RECOVERY) steps.push(toStep("recovery", item));
    return steps;
  }
  const warm = short ? WARMUP.slice(0, 1) : WARMUP;
  for (const item of warm) steps.push(toStep("warmup", item));
  for (const famKey of DAYS[dayKeyLetter].families) {
    const { idx, level } = currentLevel(famKey);
    steps.push(
      toStep("main", { ...level, sets: short ? 1 : level.sets }, { family: famKey, levelIdx: idx }),
    );
  }
  if (!short) for (const item of COOLDOWN) steps.push(toStep("cooldown", item));
  return steps;
}

function estimateMinutes(steps, rest) {
  let sec = 0;
  for (const s of steps) {
    const sides = s.perSide ? 2 : 1;
    const per = s.seconds ? s.seconds * sides : s.reps * 3 * sides;
    sec += s.sets * per + (s.sets - 1) * (s.kind === "main" ? rest : 0) + 15;
  }
  return Math.max(1, Math.round(sec / 60));
}

// ---------------------------------------------------------------------------
// Session engine
//
// The active session lives in state so a closed tab or a reload picks up where
// you left off. Only the running clock is in memory.
// ---------------------------------------------------------------------------

function startSession(short) {
  const day = todayKey();
  state.active = {
    day,
    short: !!short,
    startedAt: Date.now(),
    steps: buildSteps(day, short),
    stepIdx: 0,
    setIdx: 0,
    phase: "work", // work | rest | feedback | done
    side: 0, // 0 = first side, 1 = second side (for perSide timed steps)
    results: [], // one per step: { sets: [reps|seconds...], skipped, feedback }
  };
  for (const _ of state.active.steps) state.active.results.push({ sets: [], skipped: false, feedback: "" });
  saveState();
  showView("session");
}

function abandonSession() {
  if (!confirm("Stop this session? Nothing from it will be saved.")) return;
  stopTimer();
  state.active = null;
  saveState();
  showView("home");
}

function currentStep() {
  const a = state.active;
  return a ? a.steps[a.stepIdx] : null;
}

function completeSet(value) {
  const a = state.active;
  const step = currentStep();
  a.results[a.stepIdx].sets.push(value);
  a.side = 0;
  if (a.setIdx + 1 < step.sets) {
    a.setIdx++;
    if (step.kind === "main" && state.settings.rest > 0) {
      a.phase = "rest";
      a.restEndsAt = Date.now() + state.settings.rest * 1000;
      saveState();
      startTimer(state.settings.rest, endRest);
      render();
      return;
    }
  } else {
    if (step.kind === "main") {
      a.phase = "feedback";
      saveState();
      render();
      return;
    }
    advanceStep();
    return;
  }
  saveState();
  render();
}

function endRest() {
  const a = state.active;
  if (!a) return;
  a.phase = "work";
  delete a.restEndsAt;
  saveState();
  render();
}

function skipRest() {
  stopTimer();
  endRest();
}

// After a reload mid-rest there is no in-memory timer; rebuild it from the
// persisted end time, or end the rest straight away if it already elapsed.
function resumeRestIfNeeded() {
  const a = state.active;
  if (!a || a.phase !== "rest" || timer) return;
  const remaining = typeof a.restEndsAt === "number" ? (a.restEndsAt - Date.now()) / 1000 : 0;
  if (remaining <= 0) {
    endRest();
    return;
  }
  startTimer(remaining, endRest);
}

function skipStep() {
  const a = state.active;
  stopTimer();
  a.results[a.stepIdx].skipped = true;
  advanceStep();
}

function giveFeedback(value) {
  const a = state.active;
  a.results[a.stepIdx].feedback = value;
  advanceStep();
}

function advanceStep() {
  const a = state.active;
  stopTimer();
  a.side = 0;
  a.setIdx = 0;
  if (a.stepIdx + 1 < a.steps.length) {
    a.stepIdx++;
    a.phase = "work";
  } else {
    a.phase = "done";
  }
  saveState();
  render();
}

// Apply feedback to the progression ladders and file the session in the log.
function finishSession() {
  const a = state.active;
  if (!a) return;
  const exercises = [];
  a.steps.forEach((step, i) => {
    const r = a.results[i];
    if (step.kind !== "main") return;
    exercises.push({
      family: step.family,
      name: step.name,
      levelIdx: step.levelIdx,
      sets: r.sets,
      skipped: r.skipped,
      feedback: r.feedback,
    });
    if (r.skipped || a.short) return; // a minimum day never changes your level
    const p = state.progress[step.family];
    const max = FAMILIES[step.family].levels.length - 1;
    if (r.feedback === "easy") {
      p.easy++;
      if (p.easy >= 2 && p.level < max) {
        p.level++;
        p.easy = 0;
        exercises[exercises.length - 1].levelUp = true;
      }
    } else if (r.feedback === "hard") {
      p.easy = 0;
      if (p.level > 0) {
        p.level--;
        exercises[exercises.length - 1].levelDown = true;
      }
    } else {
      p.easy = 0;
    }
  });
  state.sessions.push({
    day: a.day,
    short: a.short,
    startedAt: a.startedAt,
    finishedAt: Date.now(),
    exercises,
  });
  state.sessions.sort((x, y) => y.finishedAt - x.finishedAt);
  lastFinished = state.sessions[0];
  state.active = null;
  saveState();
  showView("home");
}

let lastFinished = null;

function markDone(daysAgo) {
  const at = shiftDay(Date.now(), -daysAgo);
  const key = dayKey(at);
  if (doneDays().has(key)) return;
  const label = daysAgo === 0 ? "today" : "yesterday";
  if (!confirm(`Mark ${label} as done without the guide? It counts for your streak but doesn't change your levels.`)) return;
  state.sessions.push({ day: "M", manual: true, short: false, startedAt: at, finishedAt: at, exercises: [] });
  state.sessions.sort((x, y) => y.finishedAt - x.finishedAt);
  saveState();
  render();
}

function deleteSession(finishedAt) {
  if (!confirm("Delete this session from the log? Your levels stay as they are.")) return;
  state.sessions = state.sessions.filter((s) => s.finishedAt !== finishedAt);
  saveState();
  render();
}

function setLevel(familyKey, idx) {
  state.progress[familyKey] = { level: idx, easy: 0 };
  saveState();
  render();
}

// ---------------------------------------------------------------------------
// Countdown timer (one at a time) and a tiny beep
// ---------------------------------------------------------------------------

let timer = null; // { endsAt, remaining, running, onDone }

function startTimer(seconds, onDone) {
  timer = { remaining: seconds, endsAt: Date.now() + seconds * 1000, running: true, onDone };
  updateTimerDisplay();
}

function pauseTimer() {
  if (!timer || !timer.running) return;
  timer.remaining = (timer.endsAt - Date.now()) / 1000;
  timer.running = false;
  render();
}

function resumeTimer() {
  if (!timer || timer.running) return;
  timer.endsAt = Date.now() + timer.remaining * 1000;
  timer.running = true;
  render();
}

function stopTimer() {
  timer = null;
}

function updateTimerDisplay() {
  if (!timer) return;
  const remaining = timer.running ? (timer.endsAt - Date.now()) / 1000 : timer.remaining;
  const el = document.querySelector(".countdown");
  if (el) el.textContent = formatClock(remaining);
  const ring = document.querySelector(".ring-fill");
  if (ring) {
    const total = Number(ring.dataset.total) || 1;
    ring.style.strokeDashoffset = String(283 * (1 - Math.max(0, remaining) / total));
  }
  if (timer.running && remaining <= 0) {
    const done = timer.onDone;
    timer = null;
    beep();
    done();
  }
}

setInterval(updateTimerDisplay, 200);

let audioCtx = null;

function beep() {
  if (!state.settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);
  } catch (e) {
    /* no sound is fine */
  }
}

// Browsers only allow audio after a user gesture; warm the context up on the
// first click so the first countdown can beep.
document.addEventListener(
  "pointerdown",
  () => {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) {
      /* ignore */
    }
  },
  { once: true },
);

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

let view = "home";

function esc(s) {
  const div = document.createElement("div");
  div.textContent = s == null ? "" : String(s);
  return div.innerHTML;
}

function showView(name) {
  view = name;
  window.scrollTo(0, 0);
  render();
}

function render() {
  if (state.active && view === "home") view = "session";
  for (const name of ["home", "session", "guide", "log"]) {
    document.getElementById(`view-${name}`).hidden = name !== view;
  }
  document.body.classList.toggle("in-session", view === "session" && !!state.active);
  if (view === "home") renderHome();
  else if (view === "session") renderSession();
  else if (view === "guide") renderGuide();
  else if (view === "log") renderLog();
  updateTitle();
  syncNav();
  syncWakeLock();
}

function renderHome() {
  const el = document.getElementById("view-home");
  const done = doneToday();
  const streak = currentStreak();
  const day = todayKey();
  const steps = buildSteps(day, false);
  const minutes = estimateMinutes(steps, state.settings.rest);
  const mains = steps.filter((s) => s.kind === "main");

  let streakLine;
  if (streak === 0) streakLine = "No streak yet. Today is day one.";
  else if (done) streakLine = `${streak} day streak. See you tomorrow.`;
  else streakLine = `${streak} day streak on the line. Keep it alive today.`;

  const celebrate =
    lastFinished && dayKey(lastFinished.finishedAt) === dayKey(Date.now())
      ? renderCelebration(lastFinished)
      : "";

  const planItems =
    day === "R"
      ? RECOVERY.map((r) => `<li><span class="plan-name">${esc(r.name)}</span><span class="plan-target">${esc(targetLabel(toStep("recovery", r)))}</span></li>`).join("")
      : mains
          .map(
            (s) =>
              `<li><span class="plan-name">${esc(s.name)}</span><span class="plan-level">level ${s.levelIdx + 1} of ${FAMILIES[s.family].levels.length}</span><span class="plan-target">${esc(targetLabel(s))}</span></li>`,
          )
          .join("");

  el.innerHTML = `
    ${celebrate}
    <div class="today-card ${done ? "is-done" : ""}">
      <div class="today-status">${done ? "Done for today" : "Not done yet today"}</div>
      <div class="today-streak">${esc(streakLine)}</div>
      <h2 class="today-plan-title">${done ? "Next up" : "Today"}: ${esc(DAYS[day].name)} <span class="today-minutes">~${minutes} min</span></h2>
      <ul class="plan-list">${planItems}</ul>
      <div class="today-actions">
        <button class="primary" id="btn-start">${done ? "Do another round" : "Start"}</button>
        ${day !== "R" ? `<button id="btn-start-short" title="One set of each exercise, no cool-down. About 5 minutes.">5-minute minimum</button>` : ""}
      </div>
      ${
        done
          ? ""
          : `<div class="today-manual">Already moved today? <a href="#" data-mark="0">Mark today done</a>${doneDays().has(dayKey(shiftDay(Date.now(), -1))) ? "" : ` · <a href="#" data-mark="1">Mark yesterday done</a>`}</div>`
      }
    </div>

    <h2>Last 12 weeks</h2>
    ${renderHeatmap()}
    <div class="stats-row">
      <span>${state.sessions.length} session${state.sessions.length === 1 ? "" : "s"}</span>
      <span>longest streak ${longestStreak()}</span>
    </div>

    <h2>Settings</h2>
    <div class="settings">
      <label>
        Daily reminder
        <input type="time" id="inp-reminder" value="${esc(state.settings.reminder)}" />
      </label>
      <label>
        Rest between sets
        <span class="rest-input"><input type="number" id="inp-rest" min="0" max="180" step="5" value="${state.settings.rest}" /> sec</span>
      </label>
      <label class="check">
        <input type="checkbox" id="inp-sound" ${state.settings.sound ? "checked" : ""} /> Beep when a timer ends
      </label>
    </div>
    <p class="hint">The reminder only fires while this page is open in a tab. Pin it, or set a real alarm too. Nothing is sent anywhere.</p>

    <h2>How this works</h2>
    <div class="explainer">
      <p><strong>Ten to fifteen minutes, every day.</strong> Two strength days alternate (push & legs, then back & core) and every seventh session is a gentle recovery day. Missed a day? Nothing is skipped. You just pick up where the rotation left off.</p>
      <p><strong>You start at the bottom rung of every ladder.</strong> After each exercise, say whether it was too easy, just right, or too hard. Two "too easy" in a row moves you up a level. One "too hard" moves you down. That's the whole progression system.</p>
      <p><strong>Short on time?</strong> Do the 5-minute minimum: one set of each exercise. It keeps the streak and the habit. The habit is the point.</p>
      <p><strong>Something hurts?</strong> Sharp pain means stop that exercise, not push through it. Skip it and see the <a href="#" id="link-guide">guide</a> for the easier version. If you're new to exercise or have a health condition, check with a doctor before starting.</p>
    </div>
  `;

  el.querySelector("#btn-start").onclick = () => startSession(false);
  const shortBtn = el.querySelector("#btn-start-short");
  if (shortBtn) shortBtn.onclick = () => startSession(true);
  el.querySelectorAll("[data-mark]").forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      markDone(Number(a.dataset.mark));
    };
  });
  const guideLink = el.querySelector("#link-guide");
  if (guideLink)
    guideLink.onclick = (e) => {
      e.preventDefault();
      showView("guide");
    };
  el.querySelector("#inp-reminder").onchange = (e) => {
    state.settings.reminder = e.target.value;
    state.reminded = "";
    saveState();
    if (state.settings.reminder) maybeRequestNotificationPermission();
    updateTitle();
  };
  el.querySelector("#inp-rest").onchange = (e) => {
    const n = parseInt(e.target.value, 10);
    state.settings.rest = Number.isFinite(n) && n >= 0 ? Math.min(n, 180) : REST_DEFAULT;
    e.target.value = state.settings.rest;
    saveState();
    render();
  };
  el.querySelector("#inp-sound").onchange = (e) => {
    state.settings.sound = e.target.checked;
    saveState();
  };
}

function renderCelebration(session) {
  const ups = session.exercises.filter((x) => x.levelUp);
  const downs = session.exercises.filter((x) => x.levelDown);
  let extra = "";
  if (ups.length)
    extra += `<p>Level up: ${ups.map((x) => `<strong>${esc(FAMILIES[x.family].name)}</strong> → ${esc(currentLevel(x.family).level.name)}`).join(", ")}.</p>`;
  if (downs.length)
    extra += `<p>Eased off: ${downs.map((x) => `<strong>${esc(FAMILIES[x.family].name)}</strong> → ${esc(currentLevel(x.family).level.name)}`).join(", ")}. No shame in it. Own the rung, then climb.</p>`;
  return `
    <div class="celebrate">
      <div class="celebrate-title">Nice. That's ${formatDuration(session.finishedAt - session.startedAt)} you didn't skip.</div>
      ${extra}
      <button id="btn-dismiss-celebrate" title="Dismiss">&times;</button>
    </div>`;
}

const WEEKS = 12;

function renderHeatmap() {
  const days = doneDays();
  const byDay = {};
  // Sessions are newest-first; keep the first seen unless it was only the
  // minimum and a full round exists for the same day.
  for (const s of state.sessions) {
    const key = dayKey(s.finishedAt);
    const cur = byDay[key];
    if (!cur || (cur.short && !s.short)) byDay[key] = s;
  }
  const today = startOfDay(Date.now());
  const todayKeyStr = dayKey(today);
  // Columns are weeks starting Monday; the last column contains today.
  const dow = (new Date(today).getDay() + 6) % 7; // Mon = 0
  const gridStart = shiftDay(today, -dow - (WEEKS - 1) * 7);
  const cells = [];
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const ts = shiftDay(gridStart, w * 7 + d);
      const key = dayKey(ts);
      const future = ts > today;
      const s = byDay[key];
      const cls = ["cell"];
      if (future) cls.push("future");
      else if (s) cls.push("done", s.short ? "short" : "", s.day === "R" ? "rec" : "");
      if (key === todayKeyStr) cls.push("today");
      const title = future ? "" : `${formatDate(ts)}${s ? (s.manual ? " · marked done" : ` · ${DAYS[s.day]?.name || ""}${s.short ? " (minimum)" : ""}`) : " · rest"}`;
      cells.push(`<div class="${cls.filter(Boolean).join(" ")}" title="${esc(title)}" style="grid-column:${w + 1};grid-row:${d + 1}"></div>`);
    }
  }
  void days;
  return `<div class="heatmap-wrap"><div class="heatmap-days"><span>M</span><span></span><span>W</span><span></span><span>F</span><span></span><span>S</span></div><div class="heatmap">${cells.join("")}</div></div>`;
}

function stepKindLabel(step) {
  return { warmup: "Warm-up", main: "Exercise", cooldown: "Cool-down", recovery: "Recovery" }[step.kind];
}

function renderSession() {
  const el = document.getElementById("view-session");
  const a = state.active;
  if (!a) {
    el.innerHTML = "";
    showView("home");
    return;
  }
  if (a.phase === "done") {
    el.innerHTML = renderSessionDone(a);
    el.querySelector("#btn-finish").onclick = finishSession;
    el.querySelector("#btn-abandon").onclick = abandonSession;
    return;
  }

  const step = currentStep();
  const total = a.steps.length;
  const pct = Math.round((a.stepIdx / total) * 100);
  const timed = step.seconds > 0;
  const setLabel = step.sets > 1 ? `Set ${a.setIdx + 1} of ${step.sets}` : "";
  const sideLabel = step.perSide && timed ? (a.side === 0 ? "Left side" : "Right side") : "";
  const mainSteps = a.steps.filter((s) => s.kind === "main").length;
  const mainNo = step.kind === "main" ? a.steps.slice(0, a.stepIdx + 1).filter((s) => s.kind === "main").length : 0;

  if (a.phase === "rest") {
    resumeRestIfNeeded();
    if (a.phase !== "rest") return; // endRest() re-rendered
  }

  let control = "";
  if (a.phase === "rest") {
    control = `
      <div class="rest-box">
        <div class="rest-label">Rest</div>
        ${renderCountdown(state.settings.rest)}
        <div class="rest-next">Next: set ${a.setIdx + 1} of ${step.sets}</div>
        <button id="btn-skip-rest">skip rest</button>
      </div>`;
  } else if (a.phase === "feedback") {
    control = `
      <div class="feedback-box">
        <div class="feedback-q">How did <strong>${esc(step.name)}</strong> feel?</div>
        <div class="feedback-buttons">
          <button data-fb="easy">too easy</button>
          <button data-fb="right" class="primary">just right</button>
          <button data-fb="hard">too hard</button>
        </div>
        <p class="hint">Two "too easy" in a row moves you up a level. "Too hard" moves you down.</p>
      </div>`;
  } else if (timed && timer && timer.switching) {
    control = `
      <div class="timed-box">
        <div class="side-label">Switch sides…</div>
        ${renderCountdown(SIDE_SWITCH_SECONDS)}
        <div class="timed-buttons">
          <button id="btn-switch-skip">ready</button>
        </div>
      </div>`;
  } else if (timed) {
    const running = timer && timer.running;
    const started = !!timer;
    control = `
      <div class="timed-box">
        ${sideLabel ? `<div class="side-label">${sideLabel}</div>` : ""}
        ${renderCountdown(step.seconds, started ? undefined : step.seconds)}
        <div class="timed-buttons">
          ${
            !started
              ? `<button class="primary big" id="btn-timer-start">start</button>`
              : running
                ? `<button class="big" id="btn-timer-pause">pause</button>`
                : `<button class="primary big" id="btn-timer-resume">resume</button>`
          }
          ${started ? `<button id="btn-timer-done">done early</button>` : ""}
        </div>
      </div>`;
  } else {
    const sideNote = step.perSide ? `<div class="side-label">${step.reps} each side</div>` : "";
    control = `
      <div class="reps-box">
        ${sideNote}
        <div class="reps-stepper">
          <button id="btn-reps-minus" aria-label="fewer reps">−</button>
          <span class="reps-count" id="reps-count">${step.reps}</span>
          <button id="btn-reps-plus" aria-label="more reps">+</button>
        </div>
        <div class="reps-hint">reps done${step.perSide ? " per side" : ""}. Adjust if you did more or fewer.</div>
        <button class="primary big" id="btn-set-done">${step.sets > 1 ? "set done" : "done"}</button>
      </div>`;
  }

  const prevSets = a.results[a.stepIdx].sets;
  el.innerHTML = `
    <div class="session-top">
      <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="session-meta">
        <span>${esc(DAYS[a.day].name)}${a.short ? " · minimum" : ""}</span>
        <span>${a.stepIdx + 1} / ${total}</span>
      </div>
    </div>
    <div class="step-card kind-${step.kind}">
      <div class="step-kind">${stepKindLabel(step)}${mainNo ? ` ${mainNo} of ${mainSteps}` : ""}</div>
      <h2 class="step-name">${esc(step.name)}</h2>
      <div class="step-target">${esc(targetLabel(step))}${setLabel ? ` · ${setLabel}` : ""}</div>
      ${imageTag(step, "step-image")}
      ${prevSets.length ? `<div class="step-prev">done so far: ${prevSets.map((v) => (timed ? formatClock(v) + "s" : v)).join(", ")}</div>` : ""}
      ${control}
      <details class="step-how" ${a.setIdx === 0 && a.phase === "work" ? "open" : ""}>
        <summary>How to do it</summary>
        <p>${esc(step.how)}</p>
        ${step.cues.length ? `<ul class="cues">${step.cues.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
        ${step.avoid ? `<p class="avoid"><strong>Watch out:</strong> ${esc(step.avoid)}</p>` : ""}
      </details>
      <div class="step-footer">
        <a href="#" id="link-skip">skip this ${step.kind === "main" ? "exercise" : "one"}</a>
        <a href="#" id="link-abandon">stop session</a>
      </div>
    </div>`;

  const on = (id, fn) => {
    const b = el.querySelector(id);
    if (b) b.onclick = (e) => {
      e.preventDefault();
      fn();
    };
  };
  on("#btn-skip-rest", skipRest);
  on("#link-skip", skipStep);
  on("#link-abandon", abandonSession);
  el.querySelectorAll("[data-fb]").forEach((b) => (b.onclick = () => giveFeedback(b.dataset.fb)));

  if (timed && a.phase === "work") {
    // value: seconds actually held; defaults to the full target when the
    // timer runs out on its own.
    const finishTimed = (value) => {
      // For per-side holds the second side starts after a short switch pause.
      if (step.perSide && a.side === 0) {
        a.side = 1;
        saveState();
        startTimer(SIDE_SWITCH_SECONDS, startSecondSide);
        timer.switching = true;
        render();
        return;
      }
      completeSet(typeof value === "number" ? value : step.seconds);
    };
    const startSecondSide = () => {
      startTimer(step.seconds, finishTimed);
      render();
    };
    on("#btn-switch-skip", startSecondSide);
    on("#btn-timer-start", () => {
      startTimer(step.seconds, finishTimed);
      render();
    });
    on("#btn-timer-pause", pauseTimer);
    on("#btn-timer-resume", resumeTimer);
    on("#btn-timer-done", () => {
      const remaining = timer ? (timer.running ? (timer.endsAt - Date.now()) / 1000 : timer.remaining) : step.seconds;
      stopTimer();
      finishTimed(Math.max(1, Math.round(step.seconds - remaining)));
    });
  }
  if (!timed && a.phase === "work") {
    let count = step.reps;
    const countEl = el.querySelector("#reps-count");
    on("#btn-reps-minus", () => {
      count = Math.max(0, count - 1);
      countEl.textContent = count;
    });
    on("#btn-reps-plus", () => {
      count++;
      countEl.textContent = count;
    });
    on("#btn-set-done", () => completeSet(count));
  }
  updateTimerDisplay();
}

function renderCountdown(total, initial) {
  const shown = initial !== undefined ? initial : timer ? (timer.running ? (timer.endsAt - Date.now()) / 1000 : timer.remaining) : total;
  const offset = 283 * (1 - Math.max(0, shown) / total);
  return `
    <div class="ring">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle class="ring-track" cx="50" cy="50" r="45"></circle>
        <circle class="ring-fill" cx="50" cy="50" r="45" data-total="${total}" style="stroke-dashoffset:${offset}"></circle>
      </svg>
      <div class="countdown">${formatClock(shown)}</div>
    </div>`;
}

function renderSessionDone(a) {
  const rows = a.steps
    .map((step, i) => {
      const r = a.results[i];
      if (step.kind !== "main") return "";
      const sets = r.skipped ? "skipped" : r.sets.map((v) => (step.seconds ? formatClock(v) + "s" : v)).join(" · ");
      return `<li><span class="plan-name">${esc(step.name)}</span><span class="plan-target">${esc(sets)}</span>${r.feedback ? `<span class="plan-level">${FEEDBACK[r.feedback]}</span>` : ""}</li>`;
    })
    .join("");
  return `
    <div class="step-card done-card">
      <div class="step-kind">All done</div>
      <h2 class="step-name">${esc(DAYS[a.day].name)}${a.short ? " · minimum" : ""}</h2>
      <div class="step-target">${formatDuration(Date.now() - a.startedAt)}</div>
      ${rows ? `<ul class="plan-list">${rows}</ul>` : `<p>Good. Moving gently counts.</p>`}
      <div class="today-actions">
        <button class="primary big" id="btn-finish">finish & save</button>
      </div>
      <div class="step-footer"><a href="#" id="btn-abandon">discard</a></div>
    </div>`;
}

function renderGuide() {
  const el = document.getElementById("view-guide");
  const fams = Object.entries(FAMILIES)
    .map(([key, fam]) => {
      const cur = currentLevel(key).idx;
      const dayLetter = Object.keys(DAYS).find((d) => DAYS[d].families.includes(key));
      const levels = fam.levels
        .map(
          (lv, i) => `
          <details class="level ${i === cur ? "current" : ""}" ${i === cur ? "open" : ""}>
            <summary>
              <span class="level-no">${i + 1}</span>
              <span class="level-name">${esc(lv.name)}</span>
              <span class="level-target">${esc(targetLabel(toStep("main", lv)))}</span>
              ${i === cur ? `<span class="level-badge">current</span>` : ""}
            </summary>
            ${imageTag(lv, "level-image")}
            <p>${esc(lv.how)}</p>
            <ul class="cues">${lv.cues.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
            <p class="avoid"><strong>Watch out:</strong> ${esc(lv.avoid)}</p>
            ${i !== cur ? `<button data-set-level="${key}:${i}">make this my level</button>` : ""}
          </details>`,
        )
        .join("");
      return `
        <div class="family">
          <h3>${esc(fam.name)} <span class="family-meta">${esc(fam.works)} · Day ${dayLetter}</span></h3>
          ${levels}
        </div>`;
    })
    .join("");

  const simple = (title, items, note) => `
    <div class="family">
      <h3>${title} <span class="family-meta">${note}</span></h3>
      ${items
        .map(
          (it) => `
        <details class="level">
          <summary><span class="level-name">${esc(it.name)}</span><span class="level-target">${esc(targetLabel(toStep("x", it)))}</span></summary>
          ${imageTag(it, "level-image")}
          <p>${esc(it.how)}</p>
        </details>`,
        )
        .join("")}
    </div>`;

  el.innerHTML = `
    <div class="view-head">
      <h2>Guide</h2>
      <button id="btn-guide-back">back</button>
    </div>
    <p class="hint">Every exercise, every level. The open one is where you are now. If you already know you can do more, jump ahead. If a level bothers a joint, drop back.</p>
    ${fams}
    ${simple("Warm-up", WARMUP, "start of every strength day")}
    ${simple("Cool-down", COOLDOWN, "end of every full strength day")}
    ${simple("Recovery day", RECOVERY, "every seventh session")}
  `;
  el.querySelector("#btn-guide-back").onclick = () => showView(state.active ? "session" : "home");
  el.querySelectorAll("[data-set-level]").forEach((b) => {
    b.onclick = () => {
      const [key, idx] = b.dataset.setLevel.split(":");
      setLevel(key, Number(idx));
    };
  });
}

function renderLog() {
  const el = document.getElementById("view-log");
  const items = state.sessions
    .map((s) => {
      const title = s.manual ? "Marked done" : `${DAYS[s.day]?.name || s.day}${s.short ? " · minimum" : ""}`;
      const ex = s.exercises
        .map((x) => {
          const lv = FAMILIES[x.family]?.levels[x.levelIdx];
          const timed = lv && lv.seconds;
          const sets = x.skipped ? "skipped" : x.sets.map((v) => (timed ? formatClock(v) + "s" : v)).join(" · ");
          const arrow = x.levelUp ? " ↑" : x.levelDown ? " ↓" : "";
          return `<li><span class="plan-name">${esc(x.name)}</span><span class="plan-target">${esc(sets)}</span><span class="plan-level">${x.feedback ? FEEDBACK[x.feedback] : ""}${arrow}</span></li>`;
        })
        .join("");
      return `
        <li class="log-entry">
          <div class="log-head">
            <span class="log-date">${formatDate(s.finishedAt)}</span>
            <span class="log-title">${esc(title)}</span>
            <span class="log-dur">${s.manual ? "" : formatDuration(s.finishedAt - s.startedAt)}</span>
            <button class="log-delete" data-del="${s.finishedAt}" title="Delete this session">&times;</button>
          </div>
          ${ex ? `<ul class="plan-list small">${ex}</ul>` : ""}
        </li>`;
    })
    .join("");
  el.innerHTML = `
    <div class="view-head">
      <h2>Log</h2>
      <button id="btn-log-back">back</button>
    </div>
    ${items ? `<ul class="log-list">${items}</ul>` : `<p class="hint">Nothing yet. Your first session will show up here.</p>`}
  `;
  el.querySelector("#btn-log-back").onclick = () => showView(state.active ? "session" : "home");
  el.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => deleteSession(Number(b.dataset.del))));
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btn-dismiss-celebrate") {
    lastFinished = null;
    render();
  }
});

// ---------------------------------------------------------------------------
// Header navigation
// ---------------------------------------------------------------------------

document.getElementById("link-home").addEventListener("click", (e) => {
  e.preventDefault();
  showView(state.active ? "session" : "home");
});
document.getElementById("btn-view-home").addEventListener("click", () => showView(state.active ? "session" : "home"));
document.getElementById("btn-view-guide").addEventListener("click", () => showView(view === "guide" ? (state.active ? "session" : "home") : "guide"));
document.getElementById("btn-view-log").addEventListener("click", () => showView(view === "log" ? (state.active ? "session" : "home") : "log"));

// The utility buttons collapse behind a "more" toggle on narrow screens.
const btnMore = document.getElementById("btn-more");
const headerEl = document.querySelector(".header");
function setToolsOpen(open) {
  headerEl.classList.toggle("tools-open", open);
  btnMore.setAttribute("aria-expanded", String(open));
}
btnMore.addEventListener("click", () => setToolsOpen(!headerEl.classList.contains("tools-open")));
document.getElementById("header-tools").addEventListener("click", (e) => {
  if (e.target.closest("button")) setToolsOpen(false);
});
document.addEventListener("click", (e) => {
  if (headerEl.classList.contains("tools-open") && !e.target.closest(".btn-more, .header-tools")) setToolsOpen(false);
});

function syncNav() {
  const current = view === "session" ? "home" : view;
  for (const name of ["home", "guide", "log"]) {
    const b = document.getElementById(`btn-view-${name}`);
    b.classList.toggle("active", name === current);
    if (name === current) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  }
}

// ---------------------------------------------------------------------------
// Reminder and title
//
// Once a minute: if there's a reminder time, it has passed, today isn't done,
// and we haven't already nagged today, fire a notification. The tab title
// carries a marker too, so a glance at the tab bar answers the question.
// ---------------------------------------------------------------------------

const BASE_TITLE = "Did I Move?";

function maybeRequestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") Notification.requestPermission().catch(() => {});
}

function reminderDue() {
  const t = state.settings.reminder;
  if (!t || doneToday()) return false;
  const [h, m] = t.split(":").map(Number);
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes() >= h * 60 + m;
}

function updateTitle() {
  document.title = reminderDue() ? `(!) ${BASE_TITLE}` : BASE_TITLE;
}

function checkReminder() {
  updateTitle();
  if (!reminderDue()) return;
  const today = dayKey(Date.now());
  if (state.reminded === today) return;
  state.reminded = today;
  saveState();
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(BASE_TITLE, { body: "Not yet. Ten minutes is all it takes." });
    } catch (e) {
      /* ignore */
    }
  }
}

setInterval(checkReminder, 30000);
checkReminder();

// ---------------------------------------------------------------------------
// Export / import
// The whole state travels as one line of text: UTF-8 JSON, deflated when the
// browser offers it, then base64'd so it survives any text box it is pasted
// through. The prefix says which of the two it is.
// ---------------------------------------------------------------------------

const EXPORT_PREFIX = "DIM1:";
const EXPORT_PREFIX_PACKED = "DIM1Z:";

function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x2000)
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x2000));
  return btoa(bin);
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function pipeBytes(bytes, transform) {
  const stream = new Blob([bytes]).stream().pipeThrough(transform);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function serializeState() {
  const { active, ...rest } = state; // a half-done session stays on this machine
  const json = new TextEncoder().encode(JSON.stringify(rest));
  if (typeof CompressionStream === "function") {
    try {
      const packed = await pipeBytes(json, new CompressionStream("deflate"));
      return EXPORT_PREFIX_PACKED + bytesToBase64(packed);
    } catch (e) {
      console.warn("Could not compress export:", e);
    }
  }
  return EXPORT_PREFIX + bytesToBase64(json);
}

async function deserializeString(text) {
  const s = text.replace(/\s+/g, "");
  if (s.startsWith("{")) return JSON.parse(text);
  let json;
  if (s.startsWith(EXPORT_PREFIX_PACKED)) {
    const packed = base64ToBytes(s.slice(EXPORT_PREFIX_PACKED.length));
    json = await pipeBytes(packed, new DecompressionStream("deflate"));
  } else if (s.startsWith(EXPORT_PREFIX)) {
    json = base64ToBytes(s.slice(EXPORT_PREFIX.length));
  } else {
    throw new Error("Unrecognized export string");
  }
  return JSON.parse(new TextDecoder().decode(json));
}

async function importString(text) {
  let data;
  try {
    data = await deserializeString(text);
  } catch (err) {
    alert("That doesn't look like a Did I Move? export string. Copy the whole thing, starting at DIM1.");
    return false;
  }
  if (!data || !Array.isArray(data.sessions) || !data.progress || typeof data.progress !== "object") {
    alert("That string is missing the expected sessions/progress structure.");
    return false;
  }
  const validSession = (s) =>
    !!s &&
    typeof s.finishedAt === "number" &&
    Array.isArray(s.exercises) &&
    s.exercises.every((x) => !!x && typeof x === "object" && Array.isArray(x.sets));
  const incoming = data.sessions.filter(validSession);
  const malformed = data.sessions.length - incoming.length;
  const msg = `Merge ${incoming.length} session(s) into your log? Sessions you already have are skipped, and for each exercise you keep whichever level is higher.`;
  if (!confirm(msg)) return false;

  const existing = new Set(state.sessions.map((s) => s.finishedAt));
  let added = 0;
  let skipped = 0;
  for (const s of incoming) {
    if (existing.has(s.finishedAt)) {
      skipped++;
      continue;
    }
    existing.add(s.finishedAt);
    state.sessions.push(s);
    added++;
  }
  state.sessions.sort((x, y) => y.finishedAt - x.finishedAt);

  for (const key of Object.keys(FAMILIES)) {
    const theirs = data.progress[key];
    if (!theirs || !Number.isInteger(theirs.level) || theirs.level < 0) continue;
    const max = FAMILIES[key].levels.length - 1;
    if (theirs.level > state.progress[key].level)
      state.progress[key] = { level: Math.min(theirs.level, max), easy: 0 };
  }

  saveState();
  render();
  const notes = [];
  if (skipped) notes.push(`${skipped} already present`);
  if (malformed) notes.push(`${malformed} malformed, ignored`);
  alert(`Imported ${added} session(s)` + (notes.length ? ` (${notes.join(", ")})` : "") + ".");
  return true;
}

const dataDialog = document.getElementById("data-dialog");
const dataTitle = document.getElementById("data-dialog-title");
const dataHint = document.getElementById("data-dialog-hint");
const dataText = document.getElementById("data-text");
const btnDataPrimary = document.getElementById("btn-data-primary");

function copyExportString() {
  dataText.focus();
  dataText.select();
  const done = (copied) => {
    btnDataPrimary.textContent = copied ? "copied" : "press Ctrl/Cmd+C";
    if (copied)
      setTimeout(() => {
        if (btnDataPrimary.textContent === "copied") btnDataPrimary.textContent = "copy";
      }, 1500);
  };
  const legacyCopy = () => {
    try {
      return document.execCommand("copy");
    } catch (e) {
      return false;
    }
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(dataText.value).then(
      () => done(true),
      () => done(legacyCopy()),
    );
    return;
  }
  done(legacyCopy());
}

document.getElementById("btn-export").addEventListener("click", async () => {
  dataTitle.textContent = "Export";
  dataHint.textContent = "Copy this string, then paste it into the import box on your other browser or machine.";
  dataText.readOnly = true;
  dataText.value = "generating…";
  btnDataPrimary.textContent = "copy";
  btnDataPrimary.onclick = copyExportString;
  dataDialog.showModal();
  dataText.value = await serializeState();
  dataText.focus();
  dataText.select();
});

document.getElementById("btn-import").addEventListener("click", () => {
  dataTitle.textContent = "Import";
  dataHint.textContent = "Paste an exported string. Sessions are merged into your log and your levels are raised where the import is further along.";
  dataText.readOnly = false;
  dataText.value = "";
  btnDataPrimary.textContent = "import";
  btnDataPrimary.onclick = async () => {
    const text = dataText.value.trim();
    if (!text) {
      dataText.focus();
      return;
    }
    if (await importString(text)) dataDialog.close();
  };
  dataDialog.showModal();
  dataText.focus();
});

document.getElementById("btn-data-close").addEventListener("click", () => dataDialog.close());

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

const DARK_KEY = "did_i_move_dark";

function applyDarkMode(dark) {
  document.body.classList.toggle("dark", dark);
  document.getElementById("btn-dark-mode").textContent = dark ? "light" : "dark";
}

function initDarkMode() {
  let stored = null;
  try {
    stored = localStorage.getItem(DARK_KEY);
  } catch (e) {
    // Storage may be blocked; fall through to the system preference.
  }
  if (stored !== null) applyDarkMode(stored === "1");
  else applyDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

document.getElementById("btn-dark-mode").addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  try {
    localStorage.setItem(DARK_KEY, isDark ? "1" : "0");
  } catch (e) {
    // Preference just won't persist.
  }
  applyDarkMode(isDark);
});

initDarkMode();

// ---------------------------------------------------------------------------
// Fullscreen
// ---------------------------------------------------------------------------

const btnFullscreen = document.getElementById("btn-fullscreen");

function updateFullscreenBtn() {
  const isFs = !!document.fullscreenElement;
  btnFullscreen.textContent = isFs ? "exit" : "fullscreen";
  document.body.classList.toggle("fullscreen", isFs);
}

const fullscreenSupported = typeof document.documentElement.requestFullscreen === "function";
if (!fullscreenSupported) btnFullscreen.hidden = true;

btnFullscreen.addEventListener("click", () => {
  try {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  } catch (e) {
    // Some browsers (iPhone Safari) throw synchronously; nothing to do.
  }
});

document.addEventListener("fullscreenchange", updateFullscreenBtn);

// Keep the screen awake during a session when the browser allows it.
let wakeLock = null;
let wakeLockPending = false;
async function syncWakeLock() {
  if (!("wakeLock" in navigator)) return;
  if (wakeLockPending) return; // a request is in flight; it re-syncs when done
  const want = !!state.active && document.visibilityState === "visible";
  try {
    if (want && !wakeLock) {
      wakeLockPending = true;
      const lock = await navigator.wakeLock.request("screen");
      wakeLockPending = false;
      lock.addEventListener("release", () => {
        if (wakeLock === lock) wakeLock = null;
      });
      wakeLock = lock;
      // State may have changed while we waited (e.g. session finished).
      const stillWant = !!state.active && document.visibilityState === "visible";
      if (!stillWant) {
        await lock.release();
        wakeLock = null;
      }
    } else if (!want && wakeLock) {
      const lock = wakeLock;
      wakeLock = null;
      await lock.release();
    }
  } catch (e) {
    wakeLockPending = false;
    wakeLock = null;
  }
}
document.addEventListener("visibilitychange", syncWakeLock);
render();
