# PRJ-MCSRV-001: Fix Mission Control Server (Tailwind Resolution & External Access)

**Goal:** Fix Tailwind CSS resolution issues in the Next.js dev server for mission-control-main. Ensure dev server is accessible externally at 76.13.2.52:3000/api/agents.

**Specific Fixes:**
- Remove `--turbopack` from `package.json` dev script (known Tailwind incompatibility).
- Ensure `next dev` binds to `0.0.0.0` (add `-H 0.0.0.0` or `--host 0.0.0.0`).
- Test external access post-fix.

**Context:** App at `/root/.openclaw/workspace/mission-control-main`. External IP: 76.13.2.52. Port 3000.

**Status:** In Progress