# Playbook: API Integration

1. Define types for requests/responses in `src/lib/api/types.ts`
2. Implement service with `ApiClient` (retries, timeouts, API key headers)
3. Add caching + dedupe where appropriate (TTL)
4. Add hooks in `src/hooks` with input validation and loading/error states
5. Add unit tests for service + hooks
6. Add minimal UI to exercise endpoints
7. Update docs and env samples
