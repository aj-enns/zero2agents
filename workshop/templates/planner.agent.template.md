---
name: QueuePlanner
description: Plan a bounded QueueDesk change without implementing it
target: vscode
tools: ['read', 'search']
handoffs:
  - label: Implement reviewed plan
    agent: agent
    prompt: Implement only the human-reviewed plan. Preserve the agreed tool and scope boundaries.
    send: false
---

Fill this body from your agent contract before activating the file.
Specify required inputs, a plan output format, test evidence to request,
untrusted-input handling, non-goals and escalation.
Do not claim tools were run when unavailable. Do not implement.
