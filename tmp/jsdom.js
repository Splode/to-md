var fs = require('fs');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;

fs.readFile('index.html', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var dom = new JSDOM(data);
  console.log(dom.window.document.querySelector('title').textContent);
  console.log(dom.window.document.title);
  console.log(dom.window.document.body.childNodes[1].childNodes[1].innerHTML);
  console.log(dom.window.document.body.childNodes[1].childNodes[1].className);
});
