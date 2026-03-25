# TASKS.md - PRJ-MCSRV-001

## Overview
Fix Tailwind CSS resolution and ensure external access for mission-control-main Next.js app.

## Tasks

**T001: Update package.json dev script [rocket]**
- Change `dev`: \"next dev --turbopack\" → `dev`: \"next dev --hostname 0.0.0.0\"
- This removes Turbopack (Tailwind incompatibility) and explicitly binds to 0.0.0.0 for external access.

**T002: Test dev server [rocket]**
- cd /root/.openclaw/workspace/mission-control-main
- npm install (if needed)
- npm run dev
- Verify Tailwind styles load (check a page with Tailwind classes)
- Test endpoint: curl http://localhost:3000/api/agents
- Note external IP 76.13.2.52:3000 (manual test or use external curl if possible)

**T003: QA Review [grok]**
- Review changes vs PROJECT.md
- Confirm fixes work

**Status:** T001/T002 Done, T003 Pending