const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

var columns = [];
var results = [];
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
              console.log("empty");
                console.log(results[i][element]+" is a number");
                sum = sum + parseInt(results[i][element]);
                numFound ++;
                console.log(sum);
            }
          }
        }
        console.log("Sum = " + sum + " Average = " + (sum / numFound));
    });
  } else {
    console.log("Incorrect type of file!");
  }
  readline.close()
});
