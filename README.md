# Zooniverse

Converts Zooniverse Workflow Tasks to FEM Steps. 2022 quickhack.

Created to quickly test out the code from the [Zooniverse Front-End-Monorepo](https://github.com/zooniverse/front-end-monorepo)
and may only make sense to certain Zooniverse team members.

## How To Use

Run this script on your favourite command line interface.

- Run `npm install` to install dependencies
- Run `node app/main example_workflows.csv` to process workflows and print the results on
  screen.
  - Or, run `node app/main example_workflows.csv > output.csv` to write to a file
- If you're developing the code, run `npm start` to compile and test the app.

Requirements:
- `node` and `npm`
