# Playbook: Branching

1. Update main
   - git checkout main && git pull --ff-only
2. Create branch
   - git checkout -b <issue>-<feature>
3. Push and track
   - git push -u origin <issue>-<feature>
4. Keep rebased
   - git fetch origin && git rebase origin/main
5. Open PR early as draft
   - convert to Ready when CI green and acceptance met
