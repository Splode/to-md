var fs = require('fs');
var toMarkdown = require('to-markdown');

var filter = {
  filter: function(node) {
    return node.nodeName === 'title';
  }
};

var replacement = {
  replacement: function(innerHTML, node) {
    return node.outerHTML;
  }
}


fs.readFile('index.html', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(toMarkdown(data, filter));
});
