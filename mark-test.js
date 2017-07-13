const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const toMarkdown = require('to-markdown');

// input and destination files (node arguments)
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// Read input and write front matter as output
const markdown = function (input) {
  fs.readFile(input, 'utf8', (err, data) => {
    // exit on error
    if (err) {
      return console.log(err);
    }

    const dom = new JSDOM(data);
    const body = dom.window.document.childNodes[2].childNodes[2];
    const article = body.querySelector('.article-text-block').childNodes;

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
    console.log(md);

  });
}

markdown(arg1);