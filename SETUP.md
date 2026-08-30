# Setup

Same loop as live-sound-eq-sop, on a fresh repo.

## 1. Create the repo

github.com/new → name it exactly `dj-mixing-sop` → **Public** → do NOT add a
README, .gitignore or license (this folder has all three).

## 2. Install and verify

```bash
npm install
npm test          # expect 18 passing
```

## 3. Look at it before committing

```bash
npm run preview
# then open http://localhost:3000
```

Check both mode buttons switch content, the EDM checkbox adds the six
overlay steps without duplicating anything, and the troubleshooting table
renders at the bottom regardless of mode.

## 4. Commit and push

```bash
git init
git add .
git commit -m "DJ Mixing SOP — attested procedures for a two-sub, two-main rig"
git remote add origin https://github.com/davidpetry-cloud/dj-mixing-sop.git
git branch -M main
git push -u origin main
```

## 5. Netlify

app.netlify.com → Add new site → Import an existing project → GitHub →
`dj-mixing-sop`. Settings auto-fill from `netlify.toml`. Deploy.

## 6. Cross-link

Add the new repo to `david-petry.netlify.app` alongside the EQ SOP, and add
a line in each project's README pointing at the other — they're two rigs
from the same practitioner, worth reading together.
