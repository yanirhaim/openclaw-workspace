---
created: 2026-03-24
updated: 2026-03-24
author: ceo
status: active
tags: [decisions]
---

# Decisions Log

## 2026-03-24 — Company Structure

**Context:** Founder (Yanir) wanted to build a company of AI agents with two departments.
**Decision:** Dev Department (Mantis, Star Lord, Grok) and Product Manager Department (Rocket, Nebula, Drax). All Guardians of the Galaxy characters.
**Rationale:** Guardians theme chosen by Yanir.
**Impact:** All agent IDs follow the character names: `mantis`, `star-lord`, `grok`, `rocket`, `nebula`, `drax`.

---

## 2026-03-24 — Delegation Architecture

**Context:** CEO needs a way to delegate tasks to agents without doing the work itself.
**Decision:** 2-depth spawn system. CEO spawns dept heads (depth 1), dept heads spawn workers (depth 2). Workers are leaf nodes.
**Rationale:** Clean separation of orchestration vs. execution.
**Impact:** `maxSpawnDepth: 2` in openclaw.json. Workers cannot spawn further agents.

---

_(Future decisions logged here using [[templates/decision]])_
