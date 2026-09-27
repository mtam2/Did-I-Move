# Did I Move?

A beginner's calisthenics guide that walks you through a short bodyweight session every day and keeps score of whether you showed up. It answers one question: did I move today?

## Philosophy

**Add less. Ship less. Worry less.**

This app is a single HTML file -- no frameworks, no bundlers, no CDN links, no server, no build step you didn't ask for. Open it in a browser and it works, even offline. Same lineage as [But Did I?](https://github.com/maximtam/But-Did-I).

All data lives in your browser's localStorage. Nothing leaves your machine. There's no account to create, no sync to configure, no privacy policy to read.

The program is deliberately small too. Eight movements, a handful of levels each, ten to fifteen minutes a day. Beginners don't quit because a program is too easy. They quit because it is too much. The habit is the point; the strength follows.

## The program

**Every day.** Two strength days alternate (Day A: push & legs, Day B: back & core) and every seventh session is a gentle recovery day of stretching and easy movement. The rotation follows sessions completed, not the calendar, so a missed day never skips a workout.

**Eight movement ladders.** Push, squat, hips, plank, back, hinge, core, and side plank. Each is a ladder of levels from very easy (wall push-ups, sit-to-stands, knee planks) to genuinely hard. You start on the bottom rung of every ladder.

**Progression by feel.** After each exercise the app asks whether it was too easy, just right, or too hard. Two "too easy" in a row moves you up a level. One "too hard" moves you down. Nothing else to configure.

**Warm-up and cool-down included.** Strength days open with two minutes of easy movement and close with three stretches.

**A 5-minute minimum.** Short on time? One set of each exercise, no cool-down. It keeps the streak and it doesn't touch your levels.

## Usage

Open `index.html` in any modern browser, or use the standalone `dist/did-i-move.html`.

**Start a session** -- the home screen shows today's plan. Click "Start". The guide walks you through one step at a time: timed holds get a countdown ring (with a beep at the end), rep exercises get a counter you can adjust, and there's a rest countdown between sets. Every step has a "How to do it" section with form cues and the mistake to watch for.

**Skip or stop** -- something hurts? "skip this exercise" moves on without counting it. "stop session" throws the session away.

**Finish** -- the summary screen lists what you did. "finish & save" logs it, updates your levels, and marks today done.

**Resume** -- an unfinished session survives a reload or a closed tab. Come back and pick up where you were.

**Streak and heatmap** -- the home screen shows your current streak and the last twelve weeks. Green is a full session, light green is a minimum day, purple is a recovery day.

**Mark a day done** -- did a workout without the guide, or forgot to open the app yesterday? "Mark today done" / "Mark yesterday done" keeps the streak honest. It doesn't change your levels.

**Reminder** -- set a time in settings. While the page is open in a tab, the tab title shows "(!)" once the time passes and you haven't moved, and a system notification fires once a day if you grant permission. It cannot wake a closed browser; set a real alarm too.

**Guide** -- every exercise, every level, with instructions. If you already know you can do more, click "make this my level" to jump ahead. If a level bothers a joint, drop back the same way.

**Log** -- past sessions with sets, feedback, and level changes.

**Export / import** -- click "export" in the header and the app shows your progress and log as a single line of text tagged `DIM1Z:` (or `DIM1:` when the browser can't compress). Copy it, then on the other machine click "import", paste it in, and click "import". Sessions are merged and de-duplicated by timestamp; for each ladder you keep whichever level is higher.

## Deploying to GitHub Pages

The app is static, so GitHub Pages can serve the repository as-is:

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, and save.

A minute later the app is live at `https://<user>.github.io/<repo>/`. Every push to `main` updates it. The GitHub Actions workflow in `.github/workflows/build.yml` also builds and checks the standalone file on every push.

## Standalone file

The development version is split into separate files (`index.html`, `style.css`, `app.js`). To produce a single self-contained HTML file:

```sh
./build.sh
```

This outputs `dist/did-i-move.html` -- one file you can drop anywhere and open offline.

## FAQ

**Is this medical advice?**
No. It's a sensible beginner routine. Sharp pain means stop. If you're new to exercise, pregnant, or have a health condition, check with a doctor first.

**Where is my data stored?**
In your browser's localStorage under the key `did_i_move`. It stays on your machine.

**How do I back up my data?**
Click "export" and save the string somewhere you trust. Paste it into "import" to merge it back in.

**How do I reset everything?**
Clear your cookies and site data for this website, or open the dev console and run `localStorage.removeItem("did_i_move")`, then refresh.

**Can I add my own exercises?**
Edit the `FAMILIES` table at the top of `app.js`. Each level is a name, sets, reps or seconds, a how-to, a few cues, and a mistake to avoid.

**What browsers are supported?**
Any modern browser (Chrome, Firefox, Safari, Edge). No IE support.

**Why GPLv3?**
So the app stays free and open. If someone builds on it, their version must be open too.

## Contributing

**Zero dependencies.** Every feature must use only HTML5, CSS, and native JavaScript. No third-party libraries, frameworks, or external resources -- not even a CDN link.

**Build tooling stays simple.** The build script uses bash and awk. CI uses only standard GitHub Actions runners. No webpack, vite, rollup, or npm.

**Keep it offline-first.** The app must always work as a single file opened in a browser with no network connection. Run `./build.sh` and verify `dist/did-i-move.html` works standalone before submitting.

**Match the existing style.** Small app, flat file structure, no deep abstractions. Read the code before proposing changes.

## License

GNU General Public License v3.0 -- see [LICENSE](LICENSE).
