const glob = require('glob');

const inputGlob = 'news/**/*.html';

module.exports = {
  input: glob.sync(inputGlob),
  output: 'news_item.md',
}