# Nvision Nutrition Git Workflow guidelines:

MAIN branch -> production ready, always working code.

TESTING branch -> used for integrating new features and testing new code. Pull Requests should be done to this branch.

<FEATURE> branches -> all work should be done on feature branches created off of TESTING.

Commit often! Commit messages should explain what you completed or changed since the last commit. Pull requests should be easily understood because the commit messages break down each step that was added to the code. If you forget to commit for some time, the commit message should be broken into smaller commit messages which detail the changes. Think of the person doing the code review when you make commits.

## Checklist Before Submitting a Pull Request:
 - remove all console logs
 - Pull current TESTING branch to <FEATURE> branch ("git pull origin testing") and resolve all merge conflicts.
 - Double check functionality after resolving merge conflicts
 - Label any commented out code blocks if they cannot be deleted for some reason.
 - Resolve all linting ERRORS (red underline). Try to minimize any use of ESLINT exceptions. (Yellow underline - warnings - are OK)

Try to keep PRs small!

Never do work on the master branch - updates to the master branch should only come through Architecture Manager.

All work should be done on a feature branch created off of testing, named according to the feature or feature edit you are working on.

## NOTE ON EXTERNAL PACKAGES
- before running npm install with any package, have it approved by the Architecture Manager! Try to limit the use of external packages as much as possible.

## Code Reviews:
For detailed instructions on how to perform the actual code review check out: https://learn-2.galvanize.com/cohorts/2479/blocks/94/content_files/Front%20End%20Capstone/exercises/code_reviews.md

- When you have submitted a Pull Request to testing, ping the group Slack channel to let everyone know you have submitted one
- If you are available to perform a code review, ping the slack channel to let everyone know you are picking up a PR and which one it is
  - Code should be reviewed in the order in which the PRs are submitted
  - PLEASE try to avoid submitting a new PR if there are PRs currently in the queue, this will cause Merge Gremlins

## ESLINT setup:
