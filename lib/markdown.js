const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const toMarkdown = require('to-markdown');

// to-md config file
const config = require('../to-md.config.js');

const args = config.input;
// console.log(args);

// Read input and write front matter as output
const markdown = function (input, dest) {
  fs.readFile(input, 'utf8', (err, data) => {
    // exit on error
    if (err) {
      return console.log(err);
    }

    // const dom = new JSDOM(data);
    // const body = dom.window.document.childNodes[2].childNodes[2];
    // const article = body.querySelector('.article-text-block').childNodes;

    md = toMarkdown(data, {
      converters: [
        // {
        //   filter: ['html', 'body', 'span', 'div', 'article', 'section'],
        //   replacement: function (innerHTML) {
        //     return innerHTML;
        //   }
        // },
        {
          filter: ['head', 'script', 'style', 'footer', 'ul', 'img', 'hr'],
          replacement: function () {
            return '';
          }
        },
        {
          filter: function (node) {
            return node.nodeName !== 'ARTICLE'
          },
          replacement: function (innerHTML, node) {
            if (node.nodeName === 'A') {
              const titlePart = node.title ? ' "' + node.title + '"' : ''
              return '[' + innerHTML + '](' + node.getAttribute('href') + titlePart + ')';
            } else if (node.nodeName.charAt(0) === 'H') {
              var hLevel = node.nodeName.charAt(1)
              var hPrefix = ''
              for (var i = 0; i < hLevel; i++) {
                hPrefix += '#'
              }
              return '\n\n' + hPrefix + ' ' + innerHTML + '\n\n';
            }
            const tag = node.tagName.toLowerCase();
            return `<${tag}>${innerHTML}</${tag}>`;
          }
        },
      ]
    });

    // Write front matter to file
    fs.writeFile(dest, md, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Succesfully wrote front matter from ' + input + ' to ' + dest);
    });

  });
}

// execute front matter conversion and file writing for each html file in the arguments
args.forEach((arg, index) => {
  if (index) {
    const outputDir = path.join(path.dirname(arg), 'tmp');
    // const fileName = path.basename(arg, '.html');
    const fileName = 'mark';
    const extName = '.md';
    const output = path.join(outputDir, fileName + extName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // console.log(output);
    markdown(arg, output);
  }
}, this);