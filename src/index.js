import fs from 'fs'
import { parse } from 'csv-parse'
import convertWorkflowToUseSteps from './convertWorkflowToUseSteps.js'

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
        const tasks = JSON.parse(csvRow[tasksColumnIndex])
        const first_task = csvRow[firstTaskColumnIndex]
        const steps = JSON.parse(csvRow[stepsColumnIndex])

        // Transform and roll out!
        const convertedData = convertWorkflowToUseSteps({ first_task, steps, tasks })

        // Print to screen
        console.log(convertedData)

      } catch (err) {
        console.log('<ERROR>', err)
      }
    })
    .on('end',function() {
      // Do nothing
    })
}

const inputFileName = process.argv[2]

main (inputFileName)
