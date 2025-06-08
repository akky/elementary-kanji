const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

let findAndReplaceDOMText;
let replacer;
let allKanjiList;
let allKanjiStringArray;

const html = fs.readFileSync(path.join(__dirname, '..', 'test.html'), 'utf8');

describe('dom handling test', () => {
  let window;
  let document;

  beforeEach(() => {
    const dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    global.Node = window.Node;
    global.NodeFilter = window.NodeFilter;
    // Load data and helper scripts before the replacer so globals are ready
    findAndReplaceDOMText = require('../scripts/findAndReplaceDOMText');
    allKanjiList = require('../data/elementary-kanji-json');
    allKanjiStringArray = require('../data/elementary-kanji-array');
    global.findAndReplaceDOMText = findAndReplaceDOMText;
    global.allKanjiList = allKanjiList;
    global.allKanjiStringArray = allKanjiStringArray;
    window.findAndReplaceDOMText = findAndReplaceDOMText;
    window.allKanjiList = allKanjiList;
    window.allKanjiStringArray = allKanjiStringArray;
    replacer = require('../scripts/replacer');
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.Node;
    delete global.NodeFilter;
    delete global.findAndReplaceDOMText;
    delete global.allKanjiList;
    delete global.allKanjiStringArray;
    delete window.findAndReplaceDOMText;
    delete window.allKanjiList;
    delete window.allKanjiStringArray;
    delete require.cache[require.resolve('../scripts/findAndReplaceDOMText')];
    delete require.cache[require.resolve('../scripts/replacer')];
    delete require.cache[require.resolve('../data/elementary-kanji-json')];
    delete require.cache[require.resolve('../data/elementary-kanji-array')];
    findAndReplaceDOMText = undefined;
    replacer = undefined;
    allKanjiList = undefined;
    allKanjiStringArray = undefined;
  });

  describe('replaceAllText()', () => {
    it('should kanji has grade info in following braces', () => {
      replacer.replaceAllText();
      expect(document.body.innerHTML.trim()).to.equal(
`<h1>漢(3)字(1)の変(4)換</h1>
<div>

難(6)しい漢(3)字(1)、簡(6)単(4)な感(3)じ、アルファベットABC。


</div>
<p>よく右(1)左(1)を見(1)ましょう
</p>`
      );
    });
  });

  describe('replaceByRegexp()', () => {
    it('should wrap kanji with span and grade data', () => {
      replacer.replaceByRegexp();
      const span = document.querySelector('span.grade_2.kanji-grade');
      expect(span.dataset.gradeLabel).to.equal('3ねんせい');
    });
  });
});
