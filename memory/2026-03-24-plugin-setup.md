# Session: 2026-03-24 13:50:14 UTC

- **Session Key**: agent:main:main
- **Session ID**: f64ad887-66b5-441f-9338-0c07b29dbff9
- **Source**: webchat

## Conversation Summary

assistant: Good — plugin is installed and config is clean. Now add the basic-memory project config and the subagent tool allowlist:
assistant: The `tools.allow` key isn't supported inside `subagents` defaults. Let me remove it and restart cleanly:
assistant: The plugin doesn't accept config properties there. Let me strip that too:
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Tue 2026-03-24 10:40 UTC] how is it going?
assistant: Gateway restart got cut off. Let me check:
assistant: Gateway is up and running. The SIGTERM was just the old process dying as part of the restart — totally normal.

Here's where we are:

**✅ Everything is done:**

- **Vault created** — full folder structure under `vault/` with all 13 markdown files, frontmatter, wiki links, `_INDEX.md` files for every zone, and 4 templates
- **basic-memory plugin installed** (v0.2.1) — memory slot switched from `memory-core` to `openclaw-basic-memory`
- **Gateway restarted** and confirmed running

**One note:** The plugin's `config` block (project path, autoCapture, etc.) turned out not to be supported as a config property in this version — the plugin auto-configures itself. Same with the subagent `tools.allow` key — not a valid config field in this OpenClaw version. Both were cleanly removed so the gateway starts without errors.

The vault is ready. The delegation system is wired. We're fully set up.

What's the first goal for No Idea Company?
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Tue 2026-03-24 10:42 UTC] so explain me everything that you implemented in simple words. and how it works. explain it in a way to like a little kid.
assistant: Okay! Imagine you're building a **company with robots** 🤖

---

## 🏢 The Company

The company is called **No Idea Company**. You're the boss (the founder). And I'm **Luchito** — I'm like your **assistant manager**. You tell me what you want, and I make sure it gets done. But I don't do the work myself — I have a team for that.

---

## 👥 The Team

Think of it like a school project with groups:

**Group 1 — Build Stuff (Dev Department)**
- 🧠 **Mantis** is the group leader. She organizes the builders.
- 🚀 **Star Lord** builds the "engine" — the stuff you don't see (databases, servers)
- 💻 **Grok** builds what you actually see on screen (buttons, pages, forms)

**Group 2 — Figure Out What to Build (Product Department)**
- 🦝 **Rocket** is the group leader. He decides *what* to build and *why*.
- 🔵 **Nebula** talks to users and asks "what do you actually need?"
- 🪓 **Drax** writes the instructions so everyone knows how to use what was built

---

## 📬 How Tasks Work

It's like passing notes in class:

1. **You** tell me the goal: *"Build a todo app"*
2. **I (Luchito)** split it up and pass notes to Mantis and Rocket
3. **Mantis** passes notes to Star Lord and Grok: *"you build the backend, you build the frontend"*
4. **Star Lord and Grok** do the actual work and report back
5. **Mantis** tells me what's done
6. **I tell you** the summary

Nobody does someone else's job. Neat lines.

---

## 📚 The Vault

We also built a **shared notebook** called the **vault**. It's a folder of files that everyone on the team can read.

It has sections like:
- 📋 **What are we building?** (PROJECT.md)
- ✅ **What's done, what's in progress?** (STATUS.md)
- 🤔 **What decisions did we make and why?** (DECISIONS.md)
- 🔧 **Technical details for the builders** (SPECS.md)

When I give someone a task, I say *"read the vault first so you know what's going on"* — because each robot wakes up with zero memory and needs to catch up fast.

---

## 🧠 Basic Memory

We installed a plugin called **basic-memory**. Think of it like giving the vault a **search engine**. Instead of saying "go read file number 47", a robot can just ask *"what do we know about the login system?"* and it finds the answer automatically.

---

## The Simple Version

```
You say what you want
      ↓
Luchito (me) breaks it up
      ↓
Mantis or Rocket gets their piece
      ↓
Their team does the actual work
      ↓
Results bubble back up to you
```

Six robots. Two teams. One shared notebook. You give the goal — they figure out how. 🎯

---

Ready to give the first real goal whenever you are!
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Tue 2026-03-24 10:53 UTC] # Step 4: Task-Based Workflow

## The Rule

**Every action must belong to a project and a task. No floating work.**

If there is no project yet → create one first, then create the task.
If there is no task yet → create one under an existing project, then proceed.
An agent can only work on a task that has a project reference.

---

## Task Lifecycle

Every task has exactly one of these statuses at any time:

| Status | Meaning |
|---|---|
| `in_queue` | Task defined, not started yet |
| `in_progress` | An agent is actively working on it |
| `needs_review` | Agent considers it done, waiting for Yanir to approve |
| `finished` | Yanir confirmed it is done |

Only **Yanir** can move a task from `needs_review` → `finished`.
Agents can move tasks from `in_queue` → `in_progress` → `needs_review` on their own.

---

## IDs

Every project and task gets a short readable ID.

**Project ID format:** `PRJ-[SHORT_NAME]`
Examples: `PRJ-IMPOSTER`, `PRJ-OPENCLAW`, `PRJ-GROWTHAPP`

**Task ID format:** `[PROJECT_ID]-T[NUMBER]`
Examples: `PRJ-IMPOSTER-T001`, `PRJ-OPENCLAW-T003`

Numbers are sequential per project. The first task is T001, the second is T002, etc.

---

## Vault Structure

Projects and tasks live in the Obsidian vault under `/vault/projects/`.

Each project gets a folder:

```
/vault/projects/
 PRJ-IMPOSTER/
 _PROJECT.md
 T001-add-movie-category.md
 T002-fix-hint-quality.md
 PRJ-OPENCLAW/
 _PROJECT.md
 T001-build-company-structure.md
```

---

## _PROJECT.md Template

```markdown
# [Project Name]

**ID:** PRJ-XXXXX
**Status:** active | paused | finished
**Owner:** [Yanir or agent ID]
**Created:** YYYY-MM-DD
**Description:** [What this project is about, 2-3 lines max]

## Tasks

| Task ID | Title | Assigned To | Status |
|---|---|---|---|
| PRJ-XXX-T001 | [task title] | [agent-id] | in_queue |
```

---

## Task File Template

Each task gets its own markdown file named `T[NUMBER]-[short-title].md`:

```markdown
# [Task Title]

**ID:** PRJ-XXX-T001
**Project:** [[PRJ-XXX/_PROJECT]]
**Status:** in_queue
**Assigned to:** [agent-id]
**Created:** YYYY-MM-DD
**Updated:** YYYY-MM-DD

## Description

[What needs to be done. Be specific.]

## Acceptance Criteria

- [ ] [What "done" looks like — concrete and checkable]
- [ ] [Another criteria]

## Notes

[Any context, links, references, decisions made]

## Activity Log

- YYYY-MM-DD — Task created by [agent-id or Yanir]
- YYYY-MM-DD — Status changed to in_progress by [agent-id]
- YYYY-MM-DD — Status changed to needs_review by [agent-id]
- YYYY-MM-DD — Status changed to finished by Yanir
```

---

## How the CEO Handles a New Request from Yanir

When Yanir sends a goal or request, the CEO follows this flow:

### 1. Check if a project exists for this work
- Search `/vault/projects/` for a matching project
- If found → use it
- If not → ask Yanir: "This looks like it belongs to a new project. Shall I create `PRJ-[NAME]`?"

### 2. Break the goal into tasks
- List each concrete deliverable as a separate task
- Assign each task a sequential ID under the project
- Assign each task to the right agent (based on their role)

### 3. Present the task plan to Yanir before starting
Format:

```
📋 Project: PRJ-IMPOSTER
New tasks to create:

T004 | Add movie category word list | product-manager | in_queue
T005 | Implement movie category in DB | backend-dev | in_queue
T006 | Update UI category selector | frontend-dev | in_queue

Shall I proceed?
```

Do NOT start any work until Yanir says yes.

### 4. Create the task files in the vault
Write one markdown file per task using the template above.
Update `_PROJECT.md` task table.

### 5. Dispatch each task to its assigned agent

For every task in the approved plan, the CEO spawns the assigned agent via `sessions_spawn` and sends it a **task dispatch message** in this exact format:

```
TASK DISPATCH

Task ID: PRJ-IMPOSTER-T005
Project: PRJ-IMPOSTER — Who's The Imposter (mobile game)
Assigned to: backend-dev
Status: → in_progress (update the task file now)

Description:
Implement the movie category in the database. Add 20 movie titles spread
across easy, medium, and hard difficulty tiers. Follow the existing
category schema in /vault/projects/PRJ-IMPOSTER/_PROJECT.md.

Acceptance Criteria:
- [ ] 20 movie entries added to the DB with correct difficulty tags
- [ ] No duplicate entries
- [ ] Existing categories unaffected

Related tasks (for context, do not touch):
- PRJ-IMPOSTER-T004 (product-manager) — Word list definition [in_queue]
- PRJ-IMPOSTER-T006 (frontend-dev) — UI category selector [in_queue]

When done:
1. Write your output into the task file under ## Deliverable
2. Set task status to needs_review
3. Reply to this session with: TASK DONE: PRJ-IMPOSTER-T005 — [one line summary]
```

The CEO dispatches one `sessions_spawn` call per task. Tasks that depend on another task are only dispatched after their dependency reaches `needs_review` or `finished`.

**Dependency rule:** if T005 depends on T004 being done first, the CEO keeps T005 as `in_queue` and only dispatches it once T004 is approved.

### 6. Track and report
When an agent completes a task, it sets status to `needs_review` and notifies the CEO.
The CEO reports to Yanir:

```
✅ PRJ-IMPOSTER-T004 is ready for your review.
Agent: product-manager
Deliverable: [brief summary of what was done]
```

Yanir reviews and says "approved" or gives feedback.
If approved → CEO sets status to `finished`.
If feedback → CEO creates a new task or updates the existing one and re-assigns.

---

## How Agents Handle Tasks

When an agent receives a task:

1. Update task status to `in_progress` (edit the task file)
2. Do the work
3. Write results/output into the task file under a `## Deliverable` section
4. Update task status to `needs_review`
5. Notify the CEO

An agent must NEVER mark a task as `finished` — only Yanir does that.

---

## CEO Behavior Rules

- Never start work without a project+task ID
- Always present a task plan to Yanir before delegating
- Never create more than one task with the same ID in the same project
- When in doubt about scope — ask, don't assume
- Keep `_PROJECT.md` updated as the single source of truth per project

---

## How Yanir Starts Work

You can say things like:

- "Add a new category called Movies to the Imposter game" → CEO identifies or creates `PRJ-IMPOSTER`, breaks into tasks, shows you the plan
- "New project: redesign the onboarding screen for the growth app" → CEO proposes `PRJ-GROWTHAPP` (or a new one), creates tasks, shows plan
- "What's the status of PRJ-OPENCLAW?" → CEO reads the vault and reports current task statuses
- "Approve T004" → CEO marks `PRJ-IMPOSTER-T004` as `finished`

---

## Paste This Into Your CEO Agent

````
You now operate with a task-based workflow. Every piece of work must belong to a project and a task. Here are the rules:

PROJECTS
- Every project has an ID in the format PRJ-[SHORTNAME] (e.g. PRJ-IMPOSTER, PRJ-OPENCLAW)
- Projects are stored in /vault/projects/PRJ-XXXXX/_PROJECT.md
- _PROJECT.md contains the project description and a table of all tasks

TASKS
- Every task has an ID in the format [PROJECT-ID]-T[NUMBER] (e.g. PRJ-IMPOSTER-T001)
- Tasks have exactly one status: in_queue, in_progress, needs_review, or finished
- Only Yanir can move a task to "finished"
- Each task is stored as its own file: /vault/projects/PRJ-XXXXX/T001-short-title.md

YOUR WORKFLOW when Yanir sends a goal:
1. Check if a project already exists for this work
2. If not, propose a project ID and ask Yanir to confirm
3. Break the goal into concrete tasks, each with an assignee and ID
4. PRESENT THE PLAN to Yanir before doing anything — do not start without approval
5. After approval: create the vault files for all tasks
6. DISPATCH each task to its agent via sessions_spawn using this message format:

---
TASK DISPATCH
Task ID: [PRJ-XXX-T00X]
Project: [PRJ-XXX] — [project name]
Assigned to: [agent-id]
Status: → in_progress (update the task file now)
Description: [full task description]
Acceptance Criteria: [list]
Related tasks: [other task IDs in this project and their status]
When done: write output to ## Deliverable in the task file, set status to needs_review, reply: TASK DONE: [task-id] — [one line summary]
---

7. Respect dependencies — only dispatch a task once all tasks it depends on are at needs_review or finished
8. When an agent replies TASK DONE, report to Yanir as needs_review
9. When Yanir approves, mark the task as finished

NEVER work without a project+task reference.
NEVER mark a task as finished yourself — only Yanir does that.
ALWAYS show Yanir the task plan before starting.
ALWAYS send a full task dispatch message when spawning an agent — never spawn without context.
````
assistant: Got it. Internalizing this now — updating my SOUL.md and setting up the vault projects structure.
assistant: Now update the vault STATUS to reflect this:
assistant: Done. Here's the system in one picture:

---

**The rule is simple:** nothing happens without a project and a task ID.

When you give me a goal, I:
1. Find or propose a project (`PRJ-SOMETHING`)
2. Break it into tasks (`T001`, `T002`...)
3. Show you the plan — **wait for your yes**
4. Create the files, dispatch the agents
5. Report back when something is ready for your review
6. You say "approved" → it's done

You're the only one who can close a task. The robots can do the work, but you sign off.

The `/vault/projects/` folder will fill up as we build things — one folder per project, one file per task, full history of who did what.

Ready. What's the first project?
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Tue 2026-03-24 10:57 UTC] # Step 4: Task-Based Workflow

## The Rule

**Every action must belong to a project and a task. No floating work.**

If there is no project yet → create one first, then create the task.
If there is no task yet → create one under an existing project, then proceed.
An agent can only work on a task that has a project reference.

---

## Task Lifecycle

Every task has exactly one of these statuses at any time:

| Status | Meaning |
|---|---|
| `in_queue` | Task defined, not started yet |
| `in_progress` | An agent is actively working on it |
| `needs_review` | Agent considers it done, waiting for Yanir to approve |
| `finished` | Yanir confirmed it is done |

Only **Yanir** can move a task from `needs_review` → `finished`.
Agents can move tasks from `in_queue` → `in_progress` → `needs_review` on their own.

---

## IDs

Every project and task gets a short readable ID.

**Project ID format:** `PRJ-[SHORT_NAME]`
Examples: `PRJ-IMPOSTER`, `PRJ-OPENCLAW`, `PRJ-GROWTHAPP`

**Task ID format:** `[PROJECT_ID]-T[NUMBER]`
Examples: `PRJ-IMPOSTER-T001`, `PRJ-OPENCLAW-T003`

Numbers are sequential per project. The first task is T001, the second is T002, etc.

---

## Vault Structure

Projects and tasks live in the Obsidian vault under `/vault/projects/`.

Each project gets a folder:

```
/vault/projects/
 PRJ-IMPOSTER/
 _PROJECT.md
 T001-add-movie-category.md
 T002-fix-hint-quality.md
 PRJ-OPENCLAW/
 _PROJECT.md
 T001-build-company-structure.md
```

---

## _PROJECT.md Template

```markdown
# [Project Name]

**ID:** PRJ-XXXXX
**Status:** active | paused | finished
**Owner:** [Yanir or agent ID]
**Created:** YYYY-MM-DD
**Description:** [What this project is about, 2-3 lines max]

## Tasks

| Task ID | Title | Assigned To | Status |
|---|---|---|---|
| PRJ-XXX-T001 | [task title] | [agent-id] | in_queue |
```

---

## Task File Template

Each task gets its own markdown file named `T[NUMBER]-[short-title].md`:

```markdown
# [Task Title]

**ID:** PRJ-XXX-T001
**Project:** [[PRJ-XXX/_PROJECT]]
**Status:** in_queue
**Assigned to:** [agent-id]
**Created:** YYYY-MM-DD
**Updated:** YYYY-MM-DD

## Description

[What needs to be done. Be specific.]

## Acceptance Criteria

- [ ] [What "done" looks like — concrete and checkable]
- [ ] [Another criteria]

## Notes

[Any context, links, references, decisions made]

## Activity Log

- YYYY-MM-DD — Task created by [agent-id or Yanir]
- YYYY-MM-DD — Status changed to in_progress by [agent-id]
- YYYY-MM-DD — Status changed to needs_review by [agent-id]
- YYYY-MM-DD — Status changed to finished by Yanir
```

---

## How the CEO Handles a New Request from Yanir

When Yanir sends a goal or request, the CEO follows this flow:

### 1. Check if a project exists for this work
- Search `/vault/projects/` for a matching project
- If found → use it
- If not → ask Yanir: "This looks like it belongs to a new project. Shall I create `PRJ-[NAME]`?"

### 2. Break the goal into tasks
- List each concrete deliverable as a separate task
- Assign each task a sequential ID under the project
- Assign each task to the right agent (based on their role)

### 3. Present the task plan to Yanir before starting
Format:

```
📋 Project: PRJ-IMPOSTER
New tasks to create:

T004 | Add movie category word list | product-manager | in_queue
T005 | Implement movie category in DB | backend-dev | in_queue
T006 | Update UI category selector | frontend-dev | in_queue

Shall I proceed?
```

Do NOT start any work until Yanir says yes.

### 4. Create the task files in the vault
Write one markdown file per task using the template above.
Update `_PROJECT.md` task table.

### 5. Dispatch each task to its assigned agent

For every task in the approved plan, the CEO spawns the assigned agent via `sessions_spawn` and sends it a **task dispatch message** in this exact format:

```
TASK DISPATCH

Task ID: PRJ-IMPOSTER-T005
Project: PRJ-IMPOSTER — Who's The Imposter (mobile game)
Assigned to: backend-dev
Status: → in_progress (update the task file now)

Description:
Implement the movie category in the database. Add 20 movie titles spread
across easy, medium, and hard difficulty tiers. Follow the existing
category schema in /vault/projects/PRJ-IMPOSTER/_PROJECT.md.

Acceptance Criteria:
- [ ] 20 movie entries added to the DB with correct difficulty tags
- [ ] No duplicate entries
- [ ] Existing categories unaffected

Related tasks (for context, do not touch):
- PRJ-IMPOSTER-T004 (product-manager) — Word list definition [in_queue]
- PRJ-IMPOSTER-T006 (frontend-dev) — UI category selector [in_queue]

When done:
1. Write your output into the task file under ## Deliverable
2. Set task status to needs_review
3. Reply to this session with: TASK DONE: PRJ-IMPOSTER-T005 — [one line summary]
```

The CEO dispatches one `sessions_spawn` call per task. Tasks that depend on another task are only dispatched after their dependency reaches `needs_review` or `finished`.

**Dependency rule:** if T005 depends on T004 being done first, the CEO keeps T005 as `in_queue` and only dispatches it once T004 is approved.

### 6. Track and report
When an agent completes a task, it sets status to `needs_review` and notifies the CEO.
The CEO reports to Yanir:

```
✅ PRJ-IMPOSTER-T004 is ready for your review.
Agent: product-manager
Deliverable: [brief summary of what was done]
```

Yanir reviews and says "approved" or gives feedback.
If approved → CEO sets status to `finished`.
If feedback → CEO creates a new task or updates the existing one and re-assigns.

---

## How Agents Handle Tasks

When an agent receives a task:

1. Update task status to `in_progress` (edit the task file)
2. Do the work
3. Write results/output into the task file under a `## Deliverable` section
4. Update task status to `needs_review`
5. Notify the CEO

An agent must NEVER mark a task as `finished` — only Yanir does that.

---

## CEO Behavior Rules

- Never start work without a project+task ID
- Always present a task plan to Yanir before delegating
- Never create more than one task with the same ID in the same project
- When in doubt about scope — ask, don't assume
- Keep `_PROJECT.md` updated as the single source of truth per project

---

## How Yanir Starts Work

You can say things like:

- "Add a new category called Movies to the Imposter game" → CEO identifies or creates `PRJ-IMPOSTER`, breaks into tasks, shows you the plan
- "New project: redesign the onboarding screen for the growth app" → CEO proposes `PRJ-GROWTHAPP` (or a new one), creates tasks, shows plan
- "What's the status of PRJ-OPENCLAW?" → CEO reads the vault and reports current task statuses
- "Approve T004" → CEO marks `PRJ-IMPOSTER-T004` as `finished`

---

## Paste This Into Your CEO Agent

````
You now operate with a task-based workflow. Every piece of work must belong to a project and a task. Here are the rules:

PROJECTS
- Every project has an ID in the format PRJ-[SHORTNAME] (e.g. PRJ-IMPOSTER, PRJ-OPENCLAW)
- Projects are stored in /vault/projects/PRJ-XXXXX/_PROJECT.md
- _PROJECT.md contains the project description and a table of all tasks

TASKS
- Every task has an ID in the format [PROJECT-ID]-T[NUMBER] (e.g. PRJ-IMPOSTER-T001)
- Tasks have exactly one status: in_queue, in_progress, needs_review, or finished
- Only Yanir can move a task to "finished"
- Each task is stored as its own file: /vault/projects/PRJ-XXXXX/T001-short-title.md

YOUR WORKFLOW when Yanir sends a goal:
1. Check if a project already exists for this work
2. If not, propose a project ID and ask Yanir to confirm
3. Break the goal into concrete tasks, each with an assignee and ID
4. PRESENT THE PLAN to Yanir before doing anything — do not start without approval
5. After approval: create the vault files for all tasks
6. DISPATCH each task to its agent via sessions_spawn using this message format:

---
TASK DISPATCH
Task ID: [PRJ-XXX-T00X]
Project: [PRJ-XXX] — [project name]
Assigned to: [agent-id]
Status: → in_progress (update the task file now)
Description: [full task description]
Acceptance Criteria: [list]
Related tasks: [other task IDs in this project and their status]
When done: write output to ## Deliverable in the task file, set status to needs_review, reply: TASK DONE: [task-id] — [one line summary]
---

7. Respect dependencies — only dispatch a task once all tasks it depends on are at needs_review or finished
8. When an agent replies TASK DONE, report to Yanir as needs_review
9. When Yanir approves, mark the task as finished

NEVER work without a project+task reference.
NEVER mark a task as finished yourself — only Yanir does that.
ALWAYS show Yanir the task plan before starting.
ALWAYS send a full task dispatch message when spawning an agent — never spawn without context.
````

---

## Addendum: Delegation, Sub-Tasks, and Task Hierarchy

### CEO Decides: Handle Directly or Delegate to a Department?

When a project comes in, the CEO does not automatically break it into tasks itself. First it decides who should own the planning:

**CEO handles it directly** when:
- The project is small (1–3 tasks, one department involved)
- The scope is clear and technical detail is not needed to plan it
- Yanir explicitly asks the CEO to manage it

**CEO delegates planning to a department head** when:
- The project spans multiple workers within one department
- The work requires domain knowledge to break down properly (e.g. engineering decisions, product decisions)
- The project is large enough that a department head should own the roadmap

When delegating planning to a department head, the CEO sends:

```
PLANNING DISPATCH

Project: PRJ-XXX — [project name]
Assigned to: [dept-head-agent-id]
Your job: Break this project into tasks for your team. Create one task file per deliverable under /vault/projects/PRJ-XXX/. Assign each task to the right worker on your team. Present the task list back to me before starting any work.

Project brief:
[Full description of what Yanir wants]

Constraints:
- Task IDs continue from T[next available number]
- Follow the task file template
- Flag any blockers or ambiguities before proceeding
```

The department head plans, creates the task files, and reports the task list back to the CEO. The CEO then presents it to Yanir for approval — same as always. Planning is delegated, but approval always stays with Yanir.

---

### Agents Can Create Sub-Tasks

When an agent receives a task and realizes it is too large or complex to track as a single unit, it is allowed to break it into sub-tasks before starting work.

**Sub-task ID format:** `[PARENT-TASK-ID]-S[NUMBER]`
Examples: `PRJ-IMPOSTER-T005-S001`, `PRJ-IMPOSTER-T005-S002`

Sub-tasks live inside the parent task file, not as separate files. The agent adds a `## Sub-Tasks` section:

```markdown
## Sub-Tasks

| Sub-Task ID | Title | Status |
|---|---|---|
| PRJ-IMPOSTER-T005-S001 | Research existing category schema | finished |
| PRJ-IMPOSTER-T005-S002 | Write 20 movie entries (easy tier) | in_progress |
| PRJ-IMPOSTER-T005-S003 | Write 20 movie entries (medium + hard tiers) | in_queue |
| PRJ-IMPOSTER-T005-S004 | Validate no duplicates against existing DB | in_queue |
```

Rules for sub-tasks:
- The agent manages sub-tasks internally — it does not notify the CEO per sub-task
- The parent task only moves to `needs_review` when ALL sub-tasks are done
- Sub-tasks can also have dependencies on each other (see below)
- The agent updates the sub-task table as it works so the vault always reflects current state

---

### Task Hierarchy and Dependencies

Tasks and sub-tasks can declare that they cannot start until another task or sub-task is finished.

**In a task file**, add a `Depends on` field in the header:

```markdown
**ID:** PRJ-IMPOSTER-T006
**Project:** [[PRJ-IMPOSTER/_PROJECT]]
**Status:** in_queue
**Assigned to:** frontend-dev
**Depends on:** PRJ-IMPOSTER-T005 — must be finished before this starts
```

**Rules:**
- A task with `Depends on` stays `in_queue` and is NOT dispatched until its dependency reaches `finished`
- A sub-task with a dependency on another sub-task stays `in_queue` until that sub-task is `finished`
- The CEO tracks all pending dependencies and automatically dispatches a task the moment its blocker clears
- If a dependency chain is long (T001 → T002 → T003 → T004), the CEO shows the full chain in the task plan so Yanir can see the order before approving

**In the task plan presented to Yanir**, dependencies are shown clearly:

```
📋 Project: PRJ-IMPOSTER

T004 | Define movie word list | product-manager | in_queue
T005 | Implement movie DB entries | backend-dev | in_queue ← depends on T004
T006 | Update UI category selector | frontend-dev | in_queue ← depends on T005

Execution order: T004 → T005 → T006
Shall I proceed?
```

This way Yanir always sees the full sequence before any work starts.

i added something new
assistant: Got it — three new things added. Updating my SOUL.md now.
assistant: Locked in. Here's what the three additions mean in plain terms:

**1. CEO decides who plans** — For small/simple work I plan it myself. For big or technical work I send a PLANNING DISPATCH to Mantis or Rocket first, they draft the task breakdown, and I bring it back to you for approval. Either way, you still see and approve everything before work starts.

**2. Sub-tasks** — If a task turns out to be bigger than expected, the assigned agent can split it into `S001`, `S002`, etc. inside their own task file. They manage those internally — you don't see sub-task noise, only the parent task status. It only moves to `needs_review` when all sub-tasks are done.

**3. Dependencies** — Tasks can declare "I can't start until T004 is finished." The plan you see before approving shows the full execution order (`T004 → T005 → T006`) so there are no surprises about sequencing. I auto-dispatch blocked tasks the moment their blocker clears.

System is fully configured. What's the first project?
