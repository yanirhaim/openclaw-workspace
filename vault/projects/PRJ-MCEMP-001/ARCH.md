# Mission Control Architecture: Team Roster Update

## Goal
Update the team roster in the mission-control-main app to reflect current agents:
- main (Luchito, CEO)
- mantis (Engineering Lead)
- star-lord (Architect)
- rocket (Engineer)
- grok (QA)

Remove nebula and drax from all references.

## Architecture Changes

### 1. API Layer (`src/app/api/agents/route.js`)
- **Update `AGENT_REGISTRY`**: Remove `nebula` and `drax` entries
- **Modify roles**:
  - `star-lord`: Change role from "Backend Engineer" → "Architect"
  - `rocket`: Change role from "Product & PM Lead" → "Engineer"
- **Preserve structure**: Maintain existing data flow and session integration

### 2. Frontend Rendering
- **No changes required**: The current `GET` endpoint returns filtered list automatically
- **Validation**: Confirm `employees page.jsx` uses `/api/agents` without client-side filtering

## Data Flow
1. **Source of Truth**: `AGENT_REGISTRY` in `route.js` defines all valid agents
2. **Live Sessions**: `sessions_list` tool populates active/inactive status
3. **Response Construction**: Merges registry data with live session states

## Implementation Steps
1. Edit `src/app/api/agents/route.js`
2. Remove `nebula` and `drax` from `AGENT_REGISTRY`
3. Update `star-lord` and `rocket` roles
4. Save file
5. Restart dev server:
   ```bash
   pkill -f 'mission-control-main'
   cd /root/.openclaw/workspace/mission-control-main
   npm run dev
   ```

## Verification
- Visit `http://localhost:3000/employees` (or relevant route)
- Confirm only 5 agents appear with correct roles
- Check browser console for API response format

## Impact
- **Immediate**: Roster updates on next server restart
- **Maintenance**: Future agent changes should follow same pattern in `AGENT_REGISTRY`

## Dependencies
- None

## Risks
- If `employees page.jsx` has client-side filtering, additional changes may be needed (not required based on current implementation)

## Status
- **Completed**: ARCH.md updated with design
- **Next Step**: Engineering Lead (mantis) to review and delegate implementation to rocket (Engineer)