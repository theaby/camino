# Camino

A small, installable web app for speaking and reading Spanish a little every day. Lessons run in the browser. Without a Firebase project, progress stays in `localStorage` on that device. With Firebase configured, people can sign in and keep the same XP, streak, finished lessons, and review words on every device. Guest practice still works, and the first sign-in on a device folds that guest progress into the account.

The course is a path of short lessons (about ten exercises): multiple choice, word banks, typing, matching, listening (Spanish text-to-speech), and speaking (speech recognition, with a skip when the browser cannot do it).

Live site: <https://theaby.github.io/camino/>. The previous address, <https://theaby.github.io/learn-spanish/>, no longer works. The source is <https://github.com/theaby/camino>.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. The app is served under `/camino/` so asset paths match GitHub Pages, for example `http://localhost:5173/camino/`.

```bash
npm test
npm run build
npm run preview
```

## Levels

The path runs from A1 through C1. The original twelve lessons stay first, with the same ids, so saved progress still lines up. Later lessons add the preterite and imperfect, future and conditional, perfect tenses, the subjunctive, and longer reading and listening. [CURRICULUM.md](CURRICULUM.md) maps each unit to its CEFR level and to the Instituto Cervantes Plan Curricular. Typed answers that leave out an accent still count, and the lesson says so. ñ stays ñ.

`npm test` includes a course check: unique ids, answers that are actually among the options, word-bank tiles that include the answer, and vocabulary that is used. `npm run validate` runs that check on its own.

From the path, **Find your level** is a short placement check. It marks earlier levels done without changing XP. **Test out** does the same for one level, and needs two thirds of those items.

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

A typed answer that leaves out an accent still counts, and the lesson says so. `ñ` stays `ñ`. `¿` and `¡` are optional.

## Accounts with Firebase

Camino uses the Firebase Spark (free) plan: Authentication (email/password and Google) and one Cloud Firestore document per person at `users/{uid}`. That document is the same progress record as guest mode: XP, streak, finished lesson ids, and review words. Placement and test-out only add lesson ids, and those ids are written to the same document. The first sign-in folds the guest record in, including those ids, without adding XP for a lesson that was granted rather than played. Later sign-ins add only what changed on the device. Hearts are only for the lesson you’re in, so they are not stored.

The public web config for project `camino-ce661` lives in [`src/lib/firebase-config.ts`](src/lib/firebase-config.ts). Production builds use it. A complete `VITE_FIREBASE_*` set, from the environment or from GitHub Actions variables, replaces it. `npm run dev` without those variables stays guest-only. `npm run dev:emulator` still talks to the local emulators.

### Try it locally with the emulators

Java 21 or newer is required.

```bash
npm install
npm run emulators
```

In another terminal:

```bash
npm run dev:emulator
```

Open the printed URL (`/camino/`). The Auth emulator is on port 9099 and Firestore on 8080. Password-reset emails show up in the emulator UI at <http://127.0.0.1:4000>, not in a real inbox.

```bash
npm test
npm run test:rules
```

`test:rules` starts the Firestore emulator and checks that a signed-in user can only read and write `users/{their uid}`.

### Project camino-ce661

The Firebase project already exists. Production builds sign in against it without any Actions variables. On that project:

1. **Build → Authentication → Sign-in method**: Email/Password (the first switch only) and Google.
2. **Authentication → Settings → Authorized domains**: `theaby.github.io`. `localhost` is already there.
3. **Build → Firestore Database**: a database in production mode. Deploy the checked-in rules so they replace the default lock-down:

```bash
npx firebase login
npx firebase deploy --only firestore:rules
```

[`.firebaserc`](.firebaserc) sets the default project to `camino-ce661`, so that deploy targets it. `demo-camino` is only the emulator project used by `npm run dev:emulator` and `npm run test:rules`.

To point a build at a different Firebase project, set all four of `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`. Optional: `VITE_FIREBASE_STORAGE_BUCKET` and `VITE_FIREBASE_MESSAGING_SENDER_ID`. Copy [`.env.example`](.env.example) to `.env.local` for a local override, and do not set `VITE_FIREBASE_USE_EMULATOR` in that file. The same names can be GitHub Actions variables; the Pages workflow passes them through, and a blank variable leaves the committed config in place.

Sign-up on <https://theaby.github.io/camino/> uses `camino-ce661`. A guest who already practiced on that browser keeps those lessons when they create an account.

## GitHub Pages

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds `dist` and deploys it with GitHub Actions. The site is <https://theaby.github.io/camino/>. The Vite `base` in `vite.config.ts` is `/camino/`, and the manifest `start_url` and `scope` use that same path. The production build includes the `camino-ce661` web config. The Pages workflow still passes `VITE_FIREBASE_*` repository variables through, and a complete set replaces that config.

Pages on the free plan needs a public repository. Speech recognition is best in Chrome or Edge. Safari and Firefox can still play Spanish audio, and every speaking exercise can be skipped without losing a heart. After the first visit, the service worker caches the app for offline use.
