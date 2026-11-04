# Camino — Learn Spanish

A small, installable web app for total beginners who want to speak and read Spanish a little every day. Lessons run in the browser. Without a Firebase project, progress stays in `localStorage` on that device. With Firebase configured, people can sign in and keep the same XP, streak, finished lessons, and review words on every device. Guest practice still works, and the first sign-in on a device folds that guest progress into the account.

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

## Accounts with Firebase

Camino uses the Firebase Spark (free) plan: Authentication (email/password and Google) and one Cloud Firestore document per person at `users/{uid}`. Hearts are only for the lesson you’re in, so they are not stored. The web config is public by design. If those values are missing at build time, the app stays in guest-only mode and does not call Firebase.

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

Open the printed URL (`/learn-spanish/`). The Auth emulator is on port 9099 and Firestore on 8080. Password-reset emails show up in the emulator UI at <http://127.0.0.1:4000>, not in a real inbox.

```bash
npm test
npm run test:rules
```

`test:rules` starts the Firestore emulator and checks that a signed-in user can only read and write `users/{their uid}`.

### Create the real Firebase project

1. Open the [Firebase console](https://console.firebase.google.com/) and create a project. The Spark plan is enough. Leave Google Analytics off if you don’t want it.
2. In the project, go to **Build → Authentication → Get started**. Under **Sign-in method**, enable **Email/Password** (the first switch only) and **Google**.
3. Still in Authentication, open **Settings → Authorized domains** and add `theaby.github.io`. `localhost` is already there.
4. Go to **Build → Firestore Database → Create database**. Pick a region close to you. Start in **production mode**. The checked-in rules replace the default lock-down when you deploy them.
5. Go to **Project settings → General → Your apps**. Add a **Web** app. You do not need Firebase Hosting. Copy the config values (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
6. Put those values where the build can see them.
   - On your machine, copy [`.env.example`](.env.example) to `.env.local` and fill in the `VITE_FIREBASE_*` lines. Do not set `VITE_FIREBASE_USE_EMULATOR` for this file.
   - For GitHub Pages, open the repository **Settings → Secrets and variables → Actions → Variables** and add the same names: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID`. The next push to `main` bakes them into the site. They are not secrets; Firebase expects them in the client.
7. Point the Firebase CLI at the real project and deploy the rules in [`firestore.rules`](firestore.rules):

```bash
npx firebase login
npx firebase use --add
npx firebase deploy --only firestore:rules
```

`firebase use --add` should select the project you just created, not `demo-camino`. `demo-camino` is only for the emulators.

After the Pages workflow goes green, sign-up on <https://theaby.github.io/learn-spanish/> uses the real project. A guest who already practiced on that browser keeps those lessons when they create an account.

## GitHub Pages

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds `dist` and deploys it with GitHub Actions.

One setting is not stored in the repo. A repo admin needs to turn Pages on once:

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Merge this project to `main` (or run the workflow) and wait until the deploy job is green.

The site is then <https://theaby.github.io/learn-spanish/>. The Vite `base` in `vite.config.ts` is `/learn-spanish/`. If the repository name changes, update that `base` (and the manifest `start_url` / `scope`) to the new path. The Pages workflow passes `VITE_FIREBASE_*` repository variables into the build. Until you add them, the live site stays guest-only.

Pages on the free plan needs a public repository. Speech recognition is best in Chrome or Edge. Safari and Firefox can still play Spanish audio, and every speaking exercise can be skipped without losing a heart. After the first visit, the service worker caches the app for offline use.
