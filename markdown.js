var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;

var args = process.argv;
// console.log(args);

// Write test data to file
var testWrite = function (dest) {
  fs.writeFile(dest, 'test', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('Succesfully wrote to ' + dest);
  });
}

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index >= 2) {
    var outputDir = path.join(path.dirname(arg), 'tmp');
    // var fileName = path.basename(arg, '.html');
    var fileName = 'mark';
    var extName = '.md';
    var output = path.join(outputDir, fileName + extName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // console.log(output);
    testWrite(output);
  }
}, this);