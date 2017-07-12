var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var args = process.argv;

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index >= 2) {
    var outputDir = path.join(path.dirname(arg), 'tmp');

    // console.log(outputDir);
    rimraf(outputDir, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }
}, this);