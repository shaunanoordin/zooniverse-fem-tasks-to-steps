const convertWorkflowToUseSteps = require('./convertWorkflowToUseSteps.js')

console.log('Hello')

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
