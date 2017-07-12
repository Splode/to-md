var fs = require('fs');
var path = require('path');
var concat = require('concat');

var args = process.argv;

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index >= 2) {
    var outputDir = path.join(path.dirname(arg), 'tmp');
    // var fileName = path.basename(arg, '.html');
    var fileFront = 'front';
    var fileMark = 'mark';
    var extName = '.md';
    // var output = path.join(outputDir, fileName + extName);

    var output = path.join(path.dirname(arg), 'test.md');

    var frontMatter = path.join(outputDir, fileFront + extName);
    var frontMark = path.join(outputDir, fileMark + extName);

    // console.log(output);
    concat([frontMatter, frontMark], output);
  }
}, this);