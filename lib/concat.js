const fs = require('fs');
const path = require('path');
const concat = require('concat');

// to-md config file
const config = require('../to-md.config.js');

const args = config.input;

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index) {
    const outputDir = path.join(path.dirname(arg), 'tmp');
    // const fileName = path.basename(arg, '.html');
    const fileFront = 'front';
    const fileMark = 'mark';
    const extName = '.md';
    // const output = path.join(outputDir, fileName + extName);

    const output = path.join(path.dirname(arg), config.output);

    const frontMatter = path.join(outputDir, fileFront + extName);
    const frontMark = path.join(outputDir, fileMark + extName);

    // console.log(output);
    concat([frontMatter, frontMark], output);
  }
}, this);