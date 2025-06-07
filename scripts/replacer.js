/*--- Eslint suppress ---*/
/* eslint-disable no-unused-vars */
/* global allKanjiList */
/* global allKanjiStingArray */
/* global findAndReplaceDOMText */

'use strict';

const MAX_ELEMENTARY_GRADE = 6;
const GRADE_LABELS = [
    '1ねんせい',
    '2ねんせい',
    '3ねんせい',
    '4ねんせい',
    '5ねんせい',
    '6ねんせい'
];

function hasLetterInGrade(letter, grade) {
    return allKanjiList[grade].some(function (kanji) {
        if (kanji === letter) {
            return true;
        }
        return false;
    });
}

/**
 * 
 * @return 0-6 if kanji, otherwise null
 */
function getGradeOfLetter(letter) {
    for (let i=0 ; i<MAX_ELEMENTARY_GRADE ; i++) {
        if (hasLetterInGrade(letter, i)) {
            return i;
        }
    }
    return null;
}

function default_converter(letter, grade) {
    return letter + '(' + (grade+1) + ')';
}

function html_converter(letter, grade) {
    return '<span class="grade_' + (grade) + '">' + letter + '</span>';
}

function span_wrapper(node, grade) {
    let span=document.createElement('span'); 
    //  node.appendChild(span); 
    //div.innerText="test123";
    span.nodeValue = node.nodeValue;
    node.parentNode.replaceChild(span, node);

//  return '<span class="grade_' + (grade) + '">' + letter + '</span>';
}

function replaceLetter(letter, converter = default_converter) {
    const max_elementary_grade = 6;
    for (let i=0 ; i<max_elementary_grade ; i++) {
        if (hasLetterInGrade(letter, i)) {
            return converter(letter, i);
        }
    }
    return letter;
}

function replaceNodeText(original, converter = default_converter) {
    let convertedText = '';
    original.split('').forEach(function (l) {
        convertedText = convertedText + replaceLetter(l, converter);
    });

    return convertedText;
}

function replaceTextWithProcessedNodeTree(originalNode) {
/*  // prepare the same node by clone, then remove all children
    let clone = originalNode.cloneNode(true);
console.log(clone);
    while (clone.firstChild) {
        clone.removeChild(clone.firstChild);
    }
console.log(clone);
*/
    let childrenNodes = [];
    let originalText = originalNode.nodeValue;
    let currentText = '';
    for (let i=0 ; i < originalText.length ; i++) {
        let currentLetter = originalText[i];
        let grade = getGradeOfLetter(currentLetter);
        //console.log(grade, currentLetter);
        if (grade === null) {
            currentText += currentLetter;
        } else {
            //console.log(currentLetter);
            // create text node by previous letter
            if (currentText !== '') {
                let newTextNode = document.createTextNode(currentText);
                //console.log("currentText", currentText);
                currentText = '';

                childrenNodes.push(newTextNode);
            }

            // create span node
            //console.log("currentLetter", currentLetter);
            let span = document.createElement('span'); 
            span.innerText = currentLetter;
            span.setAttribute('class', 'grade_' + grade);

            //          originalNode.parentNode.appendChild(span);
            childrenNodes.push(span);
        }
    }

    let div = document.createElement('div'); 
    childrenNodes.forEach(function (value, index) {
        div.appendChild(value);
    });

    // DOMの順序を壊す操作は、すべてループの異常となってしまう
    //  https://stackoverflow.com/questions/31956960/dom-treewalker-to-return-all-text-nodes
    //    originalNode.parentNode.insertBefore(div, originalNode.nextSibling);
    //    originalNode.parentNode.replaceChild(div, originalNode);
    // remove original node, as all text are copied now
    //    originalNode.parentNode.removeChild(originalNode);

    // DOMの更新操作が入る場合、TreeWalkerでやるのは筋が悪いのかもしれない

    // こういうのもあるにはあるけど
    //   https://j11y.io/javascript/replacing-text-in-the-dom-solved/


}

// handling DOM to insert span (not working yet!)
function replaceAllTextNode() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,  // works only on text nodes
        null,
        false
    );

    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.trim()) { // if a node is not empty
            replaceTextWithProcessedNodeTree(walker.currentNode);
            /*            walker.currentNode.textContent = replaceNodeText(
                walker.currentNode.nodeValue,
                html_converter
            );
*/
        }
    }
}

// handling text insertion (working)
function replaceAllText() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,  // works only on text nodes
        null,
        false
    );

    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.trim()) { // if a node is not empty
            walker.currentNode.nodeValue = replaceNodeText(
                walker.currentNode.nodeValue,
                default_converter
            );
        }
    }
}

function replaceByRegexp() {
    for (let grade=0 ; grade<MAX_ELEMENTARY_GRADE ; grade++) {
        replaceOneGradeByRegexp(grade);
    }
    applyTooltipData();
}

function replaceOneGradeByRegexp(grade) {
    let kanjiString = allKanjiStingArray[grade];
    let kanjiRegExp = new RegExp('[' + kanjiString + ']', 'gmu');
    findAndReplaceDOMText(document.body, {
        find: kanjiRegExp,
        replace: function (portion) {
            const span = document.createElement('span');
            span.textContent = portion.text;
            span.className = 'grade_' + grade;
            return span;
        }
        //      forceContext: root.findAndReplaceDOMText.NON_INLINE_PROSE
    });
}

function applyTooltipData() {
    GRADE_LABELS.forEach(function (label, index) {
        document.querySelectorAll('span.grade_' + index).forEach(function (el) {
            el.classList.add('kanji-grade');
            el.dataset.gradeLabel = label;
        });
    });
}

//replaceAllText();
//replaceAllTextNode();
replaceByRegexp();
