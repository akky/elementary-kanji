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
    it('should kanji are wrapped by span with grade', () => {

        replaceByRegexp();
        assert.equal(`<h1><span class="grade_2">漢</span><span class="grade_0">字</span>の<span class="grade_3">変</span>換</h1>\n<div>\n\n<span class="grade_5">難</span>しい<span class="grade_2">漢</span><span class="grade_0">字</span>、<span class="grade_5">簡</span><span class="grade_3">単</span>な<span class="grade_2">感</span>じ、アルファベットABC。\n\n\n</div>\n<p>よく<span class="grade_0">右</span><span class="grade_0">左</span>を<span class="grade_0">見</span>ましょう\n</p>`,
             document.body.innerHTML.trim()
        );
//      console.log(document.body.innerHTML);
    });
  });


});
