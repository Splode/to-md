const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// to-md config file
const config = require('../to-md.config.js');

const args = config.input;

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index) {
    const outputDir = path.join(path.dirname(arg), 'tmp');

    // console.log(outputDir);
    rimraf(outputDir, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }
}, this);