# Nvision Nutrition Git Workflow guidelines:

MASTER branch -> production ready, always working code.

TESTING branch -> used for integrating new features and testing new code. Pull Requests should be done to this branch.

<FEATURE> branches -> all work should be done on feature branches created off of TESTING.

Commit often! Commit messages should explain what you completed or changed since the last commit. Pull requests should be easily understood because the commit messages break down each step that was added to the code. If you forget to commit for some time, the commit message should be broken into smaller commit messages which detail the changes. Think of the person doing the code review when you make commits.

## Checklist Before Submitting a Pull Request:
 - remove all console logs
 - Pull current TESTING branch to <FEATURE> branch ("git pull origin testing") and resolve all merge conflicts.
 - Double check functionality after resolving merge conflicts
 - Label any commented out code blocks if they cannot be deleted for some reason.
 - Resolve all linting ERRORS (red underline). Try to minimize any use of ESLINT exceptions. (Yellow underline - warnings - are OK)


Never do work on the master branch - updates to the master branch should only come through Architecture Manager.

All work should be done on a feature branch created off of testing, named according to the feature or feature edit you are working on.