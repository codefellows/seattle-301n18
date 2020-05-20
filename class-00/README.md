## Overview

The labs in this folder should be completed independently prior to the first Code 301 lecture.

Each assignment has a corresponding Canvas assignment. Make sure to complete each lab and submit the assignment so your TA can grade your work. Ask your instructor or a TA if you have any questions.

## Before you begin 

## Cloning Our Class Repo

- Visit your class repository in a browser (link can be found in your course syllabus)
- **Fork the class repository** by clicking the "Fork" button on the repo page in GitHub.
- Once you do this, you'll have your own "copy" of the repo
- **Clone the repository** 
  - On your local machine, create a `301` folder under your current `codefellows` folder
  - Create your clone within this folder
  - Note: Your future 301 lab assignments will also be done here
- **Set the class repository as your `upstream`**
  - `cd` into your cloned repo and type this command:
  - `git remote add upstream CLASS-REPO-URL`
    - Replace CLASS-REPO-URL with the actual URL to the class repository, not your fork.
- From this point on, when your instructor commits changes to the class repository, you can pull those changes into your fork with this command, from within your folder
  - `git pull upstream master`
  
### Why are we doing this?

- Maintaining your own fork allows you to keep connected to the class "master" repository, while still being able to make changes to your version or fork of it.
