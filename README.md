# Camino — Learn Spanish

A small, installable web app for total beginners who want to speak and read Spanish a little every day. Lessons run in the browser. Progress, XP, the streak, and review words stay in `localStorage` on that device. There is no account and no server.

The course is a path of short lessons (about ten exercises): multiple choice, word banks, typing, matching, listening (Spanish text-to-speech), and speaking (speech recognition, with a skip when the browser cannot do it).

Live site, after GitHub Pages is enabled: <https://theaby.github.io/learn-spanish/>

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. The app is served under `/learn-spanish/` so asset paths match GitHub Pages, for example `http://localhost:5173/learn-spanish/`.

```bash
npm test
npm run build
npm run preview
```

## Add a unit

Course content lives in [`src/data/course.ts`](src/data/course.ts).

1. Add vocabulary the exercises should schedule for review to the `vocab` array (`id`, Spanish `es`, English `en`).
2. Append a unit to `course`. Give it a stable `id`, a title, a one-line description, and an accent color.
3. Add lessons of about ten exercises. Keep lesson ids stable: they are the keys stored when someone finishes a lesson.
4. Mix the exercise helpers: `choice`, `bank`, `typeIn`, `match`, `listen`, and `say`.

A choice exercise looks like this:

```ts
choice(
  'greetings-hello-1',
  'en-es',
  'Hello',
  'Hola',
  ['Hola', 'Adiós', 'Gracias', 'Por favor'],
  ['hola'],
)
```

`npm test` checks that every lesson is a reasonable length, every answer is actually one of the options, word-bank tiles include the answer, and every vocab id exists.

Typing ignores accents and `¿` / `¡`, so beginners can answer `como estas` for `¿Cómo estás?`.

## GitHub Pages

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds `dist` and deploys it with GitHub Actions.

One setting is not stored in the repo. A repo admin needs to turn Pages on once:

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Merge this project to `main` (or run the workflow) and wait until the deploy job is green.

The site is then <https://theaby.github.io/learn-spanish/>. The Vite `base` in `vite.config.ts` is `/learn-spanish/`. If the repository name changes, update that `base` (and the manifest `start_url` / `scope`) to the new path.

Pages on the free plan needs a public repository. Speech recognition is best in Chrome or Edge. Safari and Firefox can still play Spanish audio, and every speaking exercise can be skipped without losing a heart. After the first visit, the service worker caches the app for offline use.
