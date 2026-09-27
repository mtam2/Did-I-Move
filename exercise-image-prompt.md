# Exercise image-generation prompt

Based on the exercise catalog in `app.js` and the cream-and-green palette in `style.css`. Covers 40 distinct exercise names, including warm-ups, cool-downs, recovery, and optional pose variations.

Paste the prompt below into ChatGPT's image generator. Generate one exercise at a time for better anatomical accuracy; reuse the first approved image as a visual reference. Check the generated anatomy and exercise form before using the images in the app, especially opposite-limb movements and floor poses.

## Guidelines for reliable generation

Learned from generating the full set (42 cards) in one ChatGPT session in September 2026. Follow these and most cards come out right first time.

1. **Paste the whole prompt once, then request one card per message.** The first card (01) sets the character and style. Approve it before continuing; every later card is generated "in the style of" the earlier ones.
2. **Never send a bare number.** Sending just `11` worked for the first ten cards, then the model started repeating the previous pose (it drew a glute bridge for "13", then bird dogs for "14" and "15"). Always send the card's full block from the catalog below, prefixed with its number and name, and suffixed with: *"One card, no text, no labels, no numbers. Same character and style as the approved cards."*
3. **For single-pose holds, say "exactly ONE image" and "no extra panels".** Without this the model sometimes produces a multi-image gallery, a captioned poster with checkmarks, or a four-exercise grid. If the reply contains more than one image, or the model apologises that the images do not match, discard the whole reply and resend the same text.
4. **Name what the exercise is NOT when a neighbour is similar.** Examples that needed it: "this is a FOREARM plank, not a straight-arm plank", "plank on the hands, NOT a glute bridge", "both feet stay in place, not a stepping lunge". Put the negative in capitals; it is the only thing that reliably stops the drift.
5. **State the format on stretches and holds.** Single-pose cards sometimes come back portrait (1024x1536). Add "LANDSCAPE 3:2 format (wider than tall)" to the request if you need consistency, or accept the portrait and re-request.
6. **Expect one hang per session.** One request sat for over eight minutes with no output. Press stop and resend the same text; it completed in under two minutes.
7. **Check every card at thumbnail size before moving on.** Wrong cards look plausible at a glance. The things that went wrong were never anatomy; they were the wrong exercise, extra text, a poster instead of a card, or the wrong orientation.
8. **Minor inconsistencies to accept or fix in a second pass:** mat colour changes between grey and green across the session, arrow colour is sometimes blue instead of the green accent, and the "easy walk" card is close to "march in place". None of these are worth a re-roll on their own.
9. **Downloads.** Each card is a `blob:` image in the page. Use the card's share button and its Download option, or the browser's "save image". Chrome may pause after the first few automatic downloads until you allow multiple downloads for the site.
10. **After export:** convert to WebP at 1200px wide (`cwebp -q 82 -resize 1200 0`), drop it in `images/`, and add the name to the `IMAGES` map in `app.js`. Keep the PNG originals outside the repository; they are about 1.3 MB each.

---

Create a consistent library of instructional exercise illustrations for
“Did I Move?”, a friendly beginner bodyweight-fitness app.

## Character

Use the same adult woman, approximately 30 years old, throughout:
- Realistic, approachable body proportions and moderate muscle definition.
- Medium-brown skin, dark hair tied in a bun.
- Forest-green short-sleeved athletic shirt, charcoal leggings, simple
  neutral-colored trainers.
- Calm, focused expression.
- Practical fitness instruction, not glamour photography.

## Art direction

- Clean, professional, vector-style illustrations with restrained shading.
- Warm cream background (#fffdf6), charcoal outlines (#222222), and green
  accents (#2e7d4f).
- Simple, readable silhouettes suitable for a small mobile exercise card.
- No decorative scenery, text, labels, numbers, logos, or watermarks.
- Show only necessary equipment: mat, wall, sturdy chair, fixed counter,
  low step, or doorway.
- Equipment must look stable, with believable contact and support.
- Anatomically plausible joints, hands, feet, and weight distribution.
- No exaggerated flexibility, extreme spinal curves, or distorted limbs.

## Composition

- Create ONE exercise card per request, not a poster of the entire library.
- Landscape 3:2 composition, highest available resolution.
- Keep the entire body and necessary equipment visible, with generous margins.
- Dynamic exercises: two clearly separated panels, setup on the left and
  working position on the right, unless otherwise specified.
- Static holds and stretches: one large, clear pose.
- Use subtle arrows only where helpful to explain movement.
- Each panel contains exactly one depiction of the woman. Do not use
  overlapping ghost limbs or multiple-exposure effects.
- Keep character design, clothing, proportions, line weight, and rendering
  style consistent across all cards.
- Within a card, keep the camera angle and scale consistent.
- Prefer a side view for spinal alignment and a three-quarter view when
  limb placement needs clarification. Specific instructions below override.
- For unilateral exercises, illustrate one side consistently. Do not squeeze
  both sides into a card unless explicitly requested.
- Accuracy of the exercise takes priority over aesthetic posing.

## Progression rules

Exercises that differ only in repetitions or hold duration reuse artwork.
Keep genuinely different positions distinct, especially:
- Forearm plank versus high-plank shoulder taps.
- Reverse lunge versus stationary split squat.
- Toe-supported deadlift versus unsupported single-leg deadlift.
- One-arm chest stretch versus two-arm doorway chest stretch.

Create the deeper squat and raised-leg side-plank variants when requested.

## Exercise catalog

### Push

#### 01. Wall push-up

Side view. Hands flat on a wall at shoulder height, feet back, heels down.
Left: arms straight. Right: elbows bent, chest approaching the wall.
Maintain a straight line through head, trunk, and legs; elbows angle back
roughly 45 degrees rather than flaring sideways.

#### 02. Incline push-up

Side view, hands on a sturdy fixed counter.
Left: straight-arm incline plank. Right: chest lowered toward the edge.
Keep head, hips, and heels aligned. No unstable furniture.

#### 03. Knee push-up

Side view, hands on the floor, knees supported on a mat.
Left: arms straight. Right: chest just above the floor.
Maintain a straight line from head through hips to knees, without sitting
the hips backward.

#### 04. Push-up

Slight three-quarter side view, hands beneath or just outside shoulders,
feet together.
Left: high plank. Right: chest close to the floor, elbows angled backward
about 45 degrees. No sagging hips or craned neck.

### Squat

#### 05. Sit-to-stand

Side view with a sturdy chair.
Left: seated near the front edge, feet flat beneath knees, arms forward.
Right: standing tall in front of the chair.
Show an unassisted stand, with no hands pushing on the chair or thighs.

#### 06. Bodyweight squat

Three-quarter view, feet shoulder-width, toes slightly outward.
Left: standing. Right: hips back and down, heels grounded, knees tracking
in the direction of the toes, arms forward.
Default: a comfortable beginner depth.
Also support a separate deeper variant with thighs approximately parallel
to the floor, without rounding the back or lifting the heels.

#### 07. Reverse lunge

Three-quarter side view.
Left: standing with feet together.
Right: one foot stepped backward into a lunge, both knees near 90 degrees,
rear knee hovering above the floor, front heel grounded, torso upright.
A subtle backward arrow indicates the stepping direction.

#### 08. Split squat

Three-quarter side view.
Left: upright in a stationary staggered stance.
Right: lowered vertically in the SAME stance, rear knee near the floor,
front heel grounded, hips facing forward.
Both feet stay in place; do not depict a stepping lunge.

### Hips

#### 09. Glute bridge

Side view, lying on the back, knees bent, feet flat and hip-width apart.
Left: hips resting on the mat.
Right: hips lifted into a straight shoulder–hip–knee line.
Arms rest beside the body; ribs remain down, with no exaggerated back arch.

#### 10. Single-leg glute bridge

Side view.
Left: lying on the back with one foot planted and the other knee held
toward the chest.
Right: hips lifted using the planted leg, pelvis level.
Keep the nonworking knee tucked toward the chest, not extended vertically.

### Plank

#### 11. Knee plank

Single side-view hold.
Forearms and knees on the mat, elbows directly beneath shoulders.
Head, hips, and knees form a straight line. Hips are neither folded nor sagging.

#### 12. Plank

Single side-view hold.
Forearms on the mat, elbows beneath shoulders, legs straight, toes supporting
the body. Head, hips, and heels form one straight line.
This is a FOREARM plank, not a straight-arm plank.

#### 13. Plank shoulder taps

Three-quarter front view, feet wider than hip-width.
Left: high plank on both hands.
Right: one hand touching the opposite shoulder, supporting hand directly
beneath its shoulder. Pelvis stays square and level, with minimal rotation.

### Back

#### 14. Superman hold

Single side-view hold.
Lying face down, arms reaching overhead, arms, chest, and straight legs
lifted only slightly off the mat.
Neck stays long, gaze toward the floor; no dramatic backbend.

#### 15. Superman

Two side-view panels.
Left: lying face down, arms overhead, body resting on the mat.
Right: arms, chest, and legs lifted slightly together.
Show a small controlled movement, not a high arch.

#### 16. Reverse snow angel

Elevated three-quarter view so the arm path is visible.
Left: lying face down, chest slightly raised, arms hovering beside hips.
Right: arms swept outward and overhead while still hovering.
Use curved arrows to indicate the wide sweep. Keep shoulders away from ears,
neck neutral, and lower body supported.

#### 17. Prone Y-T-W

Three separate panels from the same elevated, near-overhead camera angle.
Woman lies face down with chest only slightly lifted.
Panel one: arms diagonally overhead, forming a Y.
Panel two: arms straight out to the sides, forming a T.
Panel three: elbows bent and drawn back, forming a W.
Thumbs point upward away from the floor; shoulders remain relaxed.
Do not replace the W with hands behind the head. No printed letters needed.

### Hinge

#### 18. Good morning

Side view, hands behind the head without pulling the neck.
Left: standing tall with softly bent knees.
Right: hips pushed backward, torso hinged forward with a neutral spine.
Show a hip hinge, not a squat or rounded forward fold.

#### 19. Single-leg deadlift (touch down)

Three-quarter side view.
Left: standing with weight primarily on one leg.
Right: hinging forward over that leg, fingertips reaching toward the floor,
other leg extending backward with its TOE LIGHTLY TOUCHING THE FLOOR.
Working knee slightly bent, hips square, back neutral.
The rear foot must visibly provide light balance support.

#### 20. Step-up

Three-quarter side view with a low, sturdy step.
Left: whole working foot on the step, other foot on the floor.
Right: body raised onto the step over the same working leg.
Working knee tracks over toes. Avoid jumping or showing a very high platform.

#### 21. Single-leg deadlift

Side view.
Left: standing on one leg.
Right: hinging forward with the free leg extended backward IN THE AIR,
fingertips reaching down, standing knee softly bent.
Head, torso, and lifted heel approximately align; pelvis stays square.
Clearly distinguish this from the toe-supported version.

### Core

#### 22. Dead bug

Elevated three-quarter side view.
Left: lying on the back, arms vertical, hips and knees bent to 90 degrees.
Right: right arm reaching overhead and LEFT leg extending toward the floor;
left arm stays vertical and right knee stays above the hip.
Lower back remains against the mat.
Precisely preserve the opposite-arm/opposite-leg pairing.

#### 23. Bird dog

Three-quarter side view.
Left: on hands and knees, wrists beneath shoulders, knees beneath hips.
Right: RIGHT arm reaching forward and LEFT leg reaching backward,
both approximately level with the torso.
The other hand and knee stay grounded. Hips remain level, back neutral.

#### 24. Hollow hold

Single side-view hold.
Lying on the back with shoulder blades and straight legs slightly raised.
Lower back remains pressed into the mat, ribs down, chin gently tucked.
Arms extend alongside the body for the beginner version.
Do not depict a seated V-up or a large lumbar arch.

### Side plank

#### 25. Knee side plank

Single clear front-oblique view of the side-on body.
Supporting forearm on the mat, elbow beneath shoulder, knees bent.
Hips lifted so shoulder, hip, and supporting knee align.
Top hand on hip; chest faces forward, without twisting toward the floor.

#### 26. Side plank

Single front-oblique view.
Supporting forearm on the mat, elbow beneath shoulder, legs straight,
feet stacked. Shoulder, hip, and ankle form a straight line.
Top hand on hip.
Also support a separate advanced variant with the top leg lifted modestly
while the pelvis stays stacked and the supporting hip remains raised.

### Warm-up

#### 27. March in place

Three-quarter front view, two alternating positions.
Lift one knee toward hip height while the opposite arm swings forward;
then reverse sides. Torso upright, supporting foot grounded.
Show controlled marching, not running or jumping.

#### 28. Arm circles

Three-quarter front view.
Arms extended out to the sides with gentle circular movement arrows.
Shoulders stay down, elbows nearly straight.
Avoid overlapping extra arms or exaggerated shoulder rotation.

#### 29. Hip circles

Three-quarter front view, hands on hips, feet comfortably apart,
knees soft. Show a small comfortable pelvic shift with a circular arrow
around the hips. Upper body stays relatively quiet.

#### 30. Bodyweight good mornings

Use the same character, camera, and movement as exercise 18.
Hands behind the head, knees soft.
Standing setup and a comfortable, shallower warm-up hip hinge.
No rounded back or deep squat.

### Cool-down

#### 31. Chest stretch

Three-quarter view beside a door frame.
ONE forearm rests vertically against the frame, elbow at shoulder height.
Torso gently turns away from that arm.
Shoulder stays relaxed; clearly show the forearm contacting the frame.

#### 32. Quad stretch

Side view.
Standing on one leg, holding the other ankle to bring that heel toward
the glute. Free hand rests on a stable support for balance.
Knees close together, torso upright, pelvis neutral.
Do not arch the back or pull the knee sideways.

#### 33. Hamstring stretch

Side view with one heel on a low step.
Raised leg straight but not hyperextended, toes pointing upward.
Hinge gently forward from the hips with a long neutral back.
Do not show a rounded toe-touch or a high-leg stretch.

### Recovery

#### 34. Cat-cow

Two side-view panels on hands and knees.
Left: cat—back rounded upward, chin gently tucked.
Right: cow—gentle spinal extension, abdomen lowered slightly, gaze forward
and slightly upward without throwing the head back.
Hands remain beneath shoulders and knees beneath hips.

#### 35. Child's pose

Single three-quarter side view.
Knees comfortably wide, hips resting back toward heels, torso lowered,
arms reaching forward along the mat, forehead resting gently.
Keep the position relaxed rather than forced.

#### 36. Hip flexor stretch

Single side view in a half-kneeling stance.
Front foot flat, front knee near 90 degrees, rear knee supported on a mat.
Torso upright, pelvis gently tucked, hips shifted slightly forward.
Do not substitute a deep lunge with an arched lower back.

#### 37. Figure-4 stretch

Elevated three-quarter view.
Lying on the back, RIGHT ankle crossed over the LEFT thigh just above
the knee. Hands hold behind the left thigh and draw it toward the torso.
Right knee opens outward. Head and shoulders stay relaxed on the mat.
Make the crossing and hand placement unambiguous.

#### 38. Doorway chest stretch

Three-quarter front view of a simple doorway.
BOTH forearms rest against opposite sides of the frame,
elbows around shoulder height. One foot steps gently through.
Chest opens without exaggerated lumbar arching.
Distinct from exercise 31, which uses one arm and a torso turn.

#### 39. Calf stretch

Single side view facing a wall, both hands supported on it.
Front knee bent; rear leg straight, rear heel firmly on the floor,
both feet directed toward the wall.
Body leans gently forward. The rear heel must not lift.

#### 40. Easy walk or march

Two three-quarter-view poses of relaxed walking in place.
Small steps, low knee lift, natural opposite-arm swing, shoulders relaxed.
Clearly gentler than exercise 27; no high knees, running, or stairs required.

## Workflow

Start by generating exercise 01, Wall push-up, only.
Wait for my feedback before generating the next exercise.
When I give an exercise number or name, generate only that card.
Use the first approved card as the visual reference for all subsequent cards.
Do not claim to have generated any files or exercises that are not actually
included in your response.
