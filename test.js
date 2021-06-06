const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

var columns = [];
var results = [];
var numInCsv = [];
var file = '';
var sum = 0;
var average = 0;
var numFound = 0;


readline.question(`Enter your file name: `, name => {
  file = name;
  console.log(file);
  if (path.extname(file) == '.csv') {
    console.log('here');
    fs.createReadStream(file)
      .pipe(csv({
        mapHeaders: ({
          header,
          index
        }) => header.toLowerCase()
      }))
      .on('headers', (headers) => {
        console.log(headers);
        columns = headers;
      })
      .on('data', (row) => {
        results.push(row);
        // console.log(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          for (const element of columns) {
            if (results[i][element] != "" && !isNaN(results[i][element])) {
              // console.log("empty");
                // console.log(results[i][element]+" is a number");
                numInCsv.push(parseInt(results[i][element]));
                sum = sum + parseInt(results[i][element]);
                numFound ++;
                // console.log(sum);
            }
          }
        }
        console.log("Sum = " + sum + " Average = " + (sum / numFound) + " Mediane = "+calculateMedian() + " Max = "+Math.max.apply(null, numInCsv));
    });
  } else {
    console.log("Incorrect type of file!");
  }
  readline.close()
});

function calculateMedian(){
  if(numInCsv.length ===0) return 0;

  numInCsv.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(numInCsv.length / 2);

  if (numInCsv.length % 2)
    return numInCsv[half];

  return (numInCsv[half - 1] + numInCsv[half]) / 2.0;
}
