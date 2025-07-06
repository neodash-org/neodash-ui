# Deployment & Project Setup

This document summarizes the deployment and quality assurance setup for the Neodash UI project.

---

## 🚀 Deployment (Netlify)

- The app is deployed on [Netlify](https://www.netlify.com/).
- **Build command:** `pnpm run build`
- **Publish directory:** `.next`
- **Environment variables:** Set in the Netlify UI (e.g., `SENTRY_DSN`, API keys).
- **Production URL:** (add your Netlify site URL here)
- No build artifacts (e.g., `.next/`, `coverage/`) are committed to the repo.

---

## ⚙️ CI/CD (GitHub Actions)

- Lint, type-check, unit/integration tests, E2E tests, and build run on every push/PR to `main`.
- Source maps are uploaded to Sentry for better error stack traces.
- Test coverage is uploaded to Codecov.

---

## 🛡️ Sentry (Error Monitoring)

- Sentry is integrated for real-time error and performance monitoring.
- Only the `SENTRY_DSN` is set in Netlify env vars (never the auth token).
- Source maps are uploaded from CI for readable stack traces.

---

## 📊 Codecov (Test Coverage)

- Test coverage is generated with Vitest and uploaded to Codecov from CI.
- No coverage reports are committed to the repo (they are in `.gitignore`).
- See [Codecov dashboard](https://app.codecov.io/gh/neodash-org/neodash-ui) for reports.

---

## 📁 Folder Structure Notes

- `/docs/` — Project documentation (like this file). Add onboarding, contributing, or architecture docs here.
- `/designs/` — (Optional) Design system, Figma exports, or design specs. Not required for deployment or CI/CD. You can remove or ignore if not needed.

---

## 📝 To Do

- [ ] Add your Netlify production URL above.
- [ ] Add more docs as your project grows (e.g., onboarding, contributing, architecture).
