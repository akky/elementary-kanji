"use strict";

describe('dom handling test', () => {

  // https://www.npmjs.com/package/karma-html2js-preprocessor
  beforeEach(function() {
    document.body.innerHTML = window.__html__['test.html'];
  });

  describe('replaceAllText()', () => {
    it('should kanji has grade info in following braces', () => {

        replaceAllText();
        assert.equal(`<h1>漢(3)字(1)の変(4)換</h1>
<div>

難(6)しい漢(3)字(1)、簡(6)単(4)な感(3)じ、アルファベットABC。


</div>
<p>よく右(1)左(1)を見(1)ましょう
</p>`,
             document.body.innerHTML.trim()
        );
//      console.log(document.body.innerHTML);
    });
  });
/*
  describe('replaceAllTextNode()', () => {
    it('should kanji are wrapped by span with grade', () => {

        replaceAllTextNode();
        assert.equal(`<h1>漢(3)字(1)の変(4)換</h1>
<div>

難(6)しい漢(3)字(1)、簡(6)単(4)な感(3)じ、アルファベットABC。


</div>
<p>よく右(1)左(1)を見(1)ましょう
</p>`,
             document.body.innerHTML.trim()
        );
        console.log(document.body.innerHTML);
    });
  });
*/

  describe('replaceByRegexp()', () => {
    it('should wrap kanji with span and grade data', () => {

        replaceByRegexp();
        const span = document.querySelector('span.grade_2.kanji-grade');
        assert.equal('3ねんせい', span.dataset.gradeLabel);
    });
  });


});
