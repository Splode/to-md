var fs = require('fs');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;

// input and destination files (node arguments)
var input = process.argv[2];
var dest = process.argv[3];

// Read input and write front matter as output
fs.readFile(input, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var dom = new JSDOM(data);
  var doc = dom.window.document.children[0].children;
  var head = dom.window.document.children[0].children[0];
  var body = dom.window.document.children[0].children[1];
  // console.log(dom.window.document.querySelector('title').textContent);
  // console.log(dom.window.document.title);
  // console.log(dom.window.document.body.childNodes[1].childNodes[1].innerHTML);
  // console.log(dom.window.document.body.childNodes[1].childNodes[1].className);
  // console.log(dom.window.document.childNodes[1].childNodes[0].children[0].attributes);
  // console.log(head.children);

  var headElements = head.children;
  var fmClose = '---';
  var fm = '---\n';

  // Loop through head elements for title tag
  // Important for order of front matter
  for (var i = 0; i < headElements.length; i++) {
    var el = headElements[i];

    // Write title
    if (el.nodeName === 'TITLE') {
      fm += 'title: ' + "'" + el.textContent + "'\n";
    }
  }

  // Loop through metadata
  for (var i = 0; i < headElements.length; i++) {
    var el = headElements[i];
    var metaContent = el.content;


    // Write meta tags
    if (el.nodeName === 'META' && el.name.length > 0) {
      var metaName = el.name;

      // Check to see if meta tag is open graph or twitter
      // If yes, wrap in quotes
      if (metaName.includes('og:')) {
        metaName = "'" + metaName + "'";
      } else if (metaName.includes('twitter')) {
        metaName = "'" + metaName + "'";
      }

      // Write front matter and header
      if (fm.includes('metadata')) {
        fm += '  ' + metaName + ': ' + "'" + metaContent + "'\n";
      } else {
        fm += 'metadata:\n' + '  ' + metaName + ': ' + "'" + metaContent + "'\n";
      }

    } else if (el.nodeName === 'META' && el.attributes.hasOwnProperty('property')) {
      function find() {
        for (var i = 0; i < el.attributes.length; i++) {
          if (el.attributes[i].nodeName === 'property') {
            //console.log(el.attributes[i].nodeName);
            return (el.attributes[i].nodeValue)
          }
        }
      }
      var metaName = find();
      // console.log(test);
      // Write front matter and header based on property attribute
      if (fm.includes('metadata')) {
        fm += '  ' + metaName + ': ' + "'" + metaContent + "'\n";
      } else {
        fm += 'metadata:\n' + '  ' + metaName + ': ' + "'" + metaContent + "'\n";
      }
    }
  }

  // Append front matter closing delimiter
  fm += fmClose;

  // Write front matter to file
  fs.writeFile(dest, fm, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Succesfully wrote front matter from ' + input + ' to ' + dest);
  });

  console.log(fm);
});
