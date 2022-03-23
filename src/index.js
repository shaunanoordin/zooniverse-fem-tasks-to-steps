import fs from 'fs'
import { parse } from 'csv-parse'
const convertWorkflowToUseSteps = require('./convertWorkflowToUseSteps.js')

function main (inputFileName) {
  if (!inputFileName) {
    console.log('Please specify a workflow CSV')
    return
  }

  fs.createReadStream(inputFileName)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvRow) {
      console.log(csvRow)
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
