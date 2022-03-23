import fs from 'fs'
import { parse } from 'csv-parse'
const convertWorkflowToUseSteps = require('./convertWorkflowToUseSteps.js')

/*
This function reads a CSV file containing Zooniverse Workflows, then attempts
to transform those Workflow's Tasks into Steps, using the FEM
convertWorkflowToUseSteps() function.
 */
function main (inputFileName) {
  if (!inputFileName) {
    console.log('Please specify a workflow CSV')
    return
  }

  let rowIndex = -1
  let csvHeaders = []

  const TASKS_COLUMN_KEY = 'tasks'
  const STEPS_COLUMN_KEY = 'steps'
  const FIRST_TASK_COLUMN_KEY = 'first_task'
  let tasksColumnIndex = 0
  let firstTaskColumnIndex = 0
  let stepsColumnIndex = 0

  fs.createReadStream(inputFileName)
    .pipe(parse({delimiter: ','}))
    .on('data', (csvRow) => {
      rowIndex++

      // Register CSV headers and figure out which column has the Tasks data, etc.
      if (rowIndex === 0) {
        csvHeaders = csvRow
        tasksColumnIndex = csvRow.indexOf(TASKS_COLUMN_KEY)
        firstTaskColumnIndex = csvRow.indexOf(FIRST_TASK_COLUMN_KEY)
        stepsColumnIndex = csvRow.indexOf(STEPS_COLUMN_KEY)
        return
      }

      // For every other row, it's a Workflow with some Tasks that need to be extracted.
      try {
        // Extract the tasks
        const rawTasksData = csvRow[tasksColumnIndex]
        const tasks = JSON.parse(rawTasksData)
        const first_task = csvRow[firstTaskColumnIndex]
        const steps = csvRow[stepsColumnIndex]

        // TODO: figure out what the first_task is, it's not always T0

        console.log(tasks, first_task, steps)


      } catch (err) {
        console.log('<ERROR>')
      }
    })
    .on('end',function() {
      // Do nothing
    })
}

const inputFileName = process.argv[2]

main (inputFileName)

/*
const fs = require('fs')
const parse = require('csv-parse').parse
const convertWorkflowToUseSteps = require('./convertWorkflowToUseSteps.js')

const inputFileName = process.argv[2]

if (!inputFileName) {
  console.log('Please specify a workflow CSV')
  return
}

console.log('convertWorkflowToUseSteps ', convertWorkflowToUseSteps)

fs.createReadStream(inputFileName)
  .pipe(parse({delimiter: ','}))
  .on('data', function(csvRow) {
    console.log(csvRow)
  })
  .on('end',function() {
    // Do nothing
  })
*/
