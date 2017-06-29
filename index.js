var fs = require('fs');
var toMarkdown = require('to-markdown');

fs.readFile('ideum.html', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  md = toMarkdown(data);
  fs.writeFile('test.md', md, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(md);
  });
});

var test = fs.readFile('ideum.html', 'utf8', function(err, data) {
  return toMarkdown(data);
});

console.log(test);
