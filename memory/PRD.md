# PRD — Bahari Global Holdings Website

## Problem Statement
Deploy the uploaded `bahri-main2` app (React + FastAPI + MongoDB) to production on the Emergent platform. This was a deployment task, not a feature build.

## Architecture
- **Frontend**: React (CRA + craco), react-router, framer-motion, tailwind. API base URL from `REACT_APP_BACKEND_URL` (`/app/frontend/src/lib/api.js`).
- **Backend**: FastAPI, all routes under `/api`. Reads `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, optional `SMTP_*` from env.
- **DB**: MongoDB (built-in). Writes: quote_requests, contact_messages, newsletter_subscribers. Reads: in-memory seed (6 vessels, 6 news, 4 case studies).
- **Email**: SMTP notifications (email_service.py) — gracefully skips if SMTP env not set. Currently NOT configured (submissions still saved to Mongo + visible in Admin).

## Endpoints
- `GET /api/health`, `GET /api/` — health/status
- `POST/GET /api/quotes`, `POST/GET /api/contact`, `POST/GET /api/newsletter` (idempotent)
- `GET /api/vessels`, `/api/vessels/{id}`, `/api/news`, `/api/news/{slug}`, `/api/case-studies`, `/api/case-studies/{slug}`
- `GET /api/admin/submissions` (no auth)

## Pages
Home, About, Maritime/Logistics Services, Vessel Chartering/Brokerage, Port Agency, Ports & Regions, Projects, Investors, News + article detail, Contact, Admin.

## Status (2026-06 deploy session)
- ✅ Real Bahari codebase restored into /app (was default scaffold).
- ✅ Backend + frontend deps installed, services running.
- ✅ Verified: /api/health, /api/vessels, POST /api/quotes → Mongo → /api/admin/submissions (via external URL).
- ✅ Frontend renders correctly (home hero, nav, KPIs).
- ✅ deployment_agent: PASS — no blockers (env-driven config, no hardcoded secrets, CORS ok, supervisor valid).
- Ready to click Deploy.

## Security notes
- No secrets committed in repo (`.env` gitignored, not present in zip).
- CORS_ORIGINS="*" — acceptable because Emergent serves frontend + API same-origin. Tighten to the exact domain if ever split across hosts.
- `/api/admin/submissions` is unauthenticated — add auth (Phase 4) before exposing real customer data publicly.

## Backlog / Next
- P1: Add auth to `/admin` (JWT or Google) before real traffic.
- P1: Configure SMTP env vars to enable email notifications.
- P2: Admin filters + CSV export.
- P2: Move vessels/news/case-studies from in-memory seed to Mongo + CRUD (CMS).
