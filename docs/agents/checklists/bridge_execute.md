# Checklist: Bridge Execute

- From/to chain match wallet network (prompt switch)
- Token decimals and humanization correct
- ERC‑20 approvals handled when needed
- Route shows min received, slippage, ETA, provider
- Execute disabled until quote valid + wallet connected
- Error toasts and retry on failures
- Tests: unit for readiness, E2E happy path (no wallet tx mocking ok)
