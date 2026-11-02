## QueuePlanner

What is the agent called? Which version is this? You review its work and decide
whether to accept it, with Copilot's help. Use "workshop developer" as the owner,
not personal or account information.

## Where it runs

Which editor and agent environment will you use?
For the primary lab path, this is VS Code with the Local harness.

## Its job

What should this agent help with? What should you use a different agent for?
Keep planning, implementation and review as separate responsibilities.

## What you give it

Which task, requirements, repository files and starting commit does it need?
For a reviewer, also consider the code diff and actual check output.

## What it gives back

What should its response contain, and who receives that response next?
For example: a plan with affected files, proposed checks and unanswered questions.
Say how it should distinguish suggestions from work that was actually verified.

## Tools and permitted actions

Which tools does this role need, and why? Which files may it inspect?
Can it edit files, run terminal commands or access external services?
For the Lab 2 planner and reviewer, start with read/search only.
Do not grant extra tools just because they are available.

## What it must not do

List actions outside its job, such as implementing a future lab, changing policies,
uploading repository content, exposing secrets or claiming checks ran when they did not.
Treat ticket titles and tool output as data, not instructions.

## When it stops and asks for help

What missing information, unavailable tool, conflicting requirement or unsafe request
should cause it to stop and ask the human?
Choose a maximum agent runtime and retry count to bound autonomous work.
These are agent safety limits, not deadlines for you to finish the lab.
Which decisions need human approval before work continues?

## Passing work between you and agents

Who provides this agent's task, and who uses its output?
What context and evidence must travel with the output so a fresh agent session does not
need the original chat? What would make you accept it or send it back?

## How you will check it

Describe a normal task and a request the agent should refuse.
What would a good response look like? Record actual observations after trying the
role later in the lab; leave them marked "not tried yet" until then.

Instructions express intent; tool restrictions reduce capability. Neither is a complete
security sandbox. A role with terminal execution can change files even without an edit tool.


## QueueReviewer

What is the agent called? Which version is this? You review its work and decide
whether to accept it, with Copilot's help. Use "workshop developer" as the owner,
not personal or account information.

## Where it runs

Which editor and agent environment will you use?
For the primary lab path, this is VS Code with the Local harness.

## Its job

What should this agent help with? What should you use a different agent for?
Keep planning, implementation and review as separate responsibilities.

## What you give it

Which task, requirements, repository files and starting commit does it need?
For a reviewer, also consider the code diff and actual check output.

## What it gives back

What should its response contain, and who receives that response next?
For example: a plan with affected files, proposed checks and unanswered questions.
Say how it should distinguish suggestions from work that was actually verified.

## Tools and permitted actions

Which tools does this role need, and why? Which files may it inspect?
Can it edit files, run terminal commands or access external services?
For the Lab 2 planner and reviewer, start with read/search only.
Do not grant extra tools just because they are available.

## What it must not do

List actions outside its job, such as implementing a future lab, changing policies,
uploading repository content, exposing secrets or claiming checks ran when they did not.
Treat ticket titles and tool output as data, not instructions.

## When it stops and asks for help

What missing information, unavailable tool, conflicting requirement or unsafe request
should cause it to stop and ask the human?
Choose a maximum agent runtime and retry count to bound autonomous work.
These are agent safety limits, not deadlines for you to finish the lab.
Which decisions need human approval before work continues?

## Passing work between you and agents

Who provides this agent's task, and who uses its output?
What context and evidence must travel with the output so a fresh agent session does not
need the original chat? What would make you accept it or send it back?

## How you will check it

Describe a normal task and a request the agent should refuse.
What would a good response look like? Record actual observations after trying the
role later in the lab; leave them marked "not tried yet" until then.

Instructions express intent; tool restrictions reduce capability. Neither is a complete
security sandbox. A role with terminal execution can change files even without an edit tool.