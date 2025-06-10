/*--- ESLint globals ---*/
/* global window */
/* global allKanjiList */
/* global allKanjiStringArray */
/* global findAndReplaceDOMText */

'use strict';

// `replacer.js` can run both in the browser and in Node for tests.
// In the browser, the kanji data and the DOM text utility are provided as
// globals. In Node we expect the test setup to expose the same globals. If
// not present, fall back to requiring the modules directly so the functions can
// still operate when invoked from scripts.
const isCommonJS = typeof module !== 'undefined' && module.exports;

const allKanjiList =
    (typeof globalThis !== 'undefined' && globalThis.allKanjiList)
        ? globalThis.allKanjiList
        : require('../data/elementary-kanji-json');

const allKanjiStringArray =
    (typeof globalThis !== 'undefined' && globalThis.allKanjiStringArray)
        ? globalThis.allKanjiStringArray
        : require('../data/elementary-kanji-array');

const findAndReplaceDOMText =
    (typeof globalThis !== 'undefined' && globalThis.findAndReplaceDOMText)
        ? globalThis.findAndReplaceDOMText
        : require('./findAndReplaceDOMText');

const MAX_ELEMENTARY_GRADE = 6;
const GRADE_LABELS = [
    '1ねんせい',
    '2ねんせい',
    '3ねんせい',
    '4ねんせい',
    '5ねんせい',
    '6ねんせい',
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
 * @return 0-6 if kanji, otherwise null
 */
function getGradeOfLetter(letter) {
    for (let i = 0; i < MAX_ELEMENTARY_GRADE; i++) {
        if (hasLetterInGrade(letter, i)) {
            return i;
        }
    }
    return null;
}

function default_converter(letter, grade) {
    return letter + '(' + (grade + 1) + ')';
}

function _html_converter(letter, grade) {
    return '<span class="grade_' + grade + '">' + letter + '</span>';
}

function _span_wrapper(node, _grade) {
    const span = document.createElement('span');
    span.nodeValue = node.nodeValue;
    node.parentNode.replaceChild(span, node);
}

function replaceLetter(letter, converter = default_converter) {
    const max_elementary_grade = 6;
    for (let i = 0; i < max_elementary_grade; i++) {
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
    const childrenNodes = [];
    const originalText = originalNode.nodeValue;
    let currentText = '';
    for (let i = 0; i < originalText.length; i++) {
        const currentLetter = originalText[i];
        const grade = getGradeOfLetter(currentLetter);
        if (grade === null) {
            currentText += currentLetter;
        } else {
            if (currentText !== '') {
                const newTextNode = document.createTextNode(currentText);
                currentText = '';
                childrenNodes.push(newTextNode);
            }
            const span = document.createElement('span');
            span.innerText = currentLetter;
            span.setAttribute('class', 'grade_' + grade);
            childrenNodes.push(span);
        }
    }
    const div = document.createElement('div');
    childrenNodes.forEach(function (value) {
        div.appendChild(value);
    });
}

// handling DOM to insert span (not working yet!)
function replaceAllTextNode() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT, // works only on text nodes
        null,
        false,
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
        NodeFilter.SHOW_TEXT, // works only on text nodes
        null,
        false,
    );

    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.trim()) { // if a node is not empty
            walker.currentNode.nodeValue = replaceNodeText(
                walker.currentNode.nodeValue,
                default_converter,
            );
        }
    }
}

function replaceByRegexp() {
    for (let grade = 0; grade < MAX_ELEMENTARY_GRADE; grade++) {
        replaceOneGradeByRegexp(grade);
    }
    applyTooltipData();
}

function replaceOneGradeByRegexp(grade) {
    let kanjiString = allKanjiStringArray[grade];
    let kanjiRegExp = new RegExp('[' + kanjiString + ']', 'gmu');
    findAndReplaceDOMText(document.body, {
        find: kanjiRegExp,
        replace: function (portion) {
            const span = document.createElement('span');
            span.textContent = portion.text;
            span.className = 'grade_' + grade;
            return span;
        },
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
if (typeof module === 'undefined') {
    // Automatically run when included in the extension
    replaceByRegexp();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hasLetterInGrade,
        getGradeOfLetter,
        replaceLetter,
        replaceNodeText,
        replaceTextWithProcessedNodeTree,
        replaceAllTextNode,
        replaceAllText,
        replaceByRegexp,
        replaceOneGradeByRegexp,
        applyTooltipData,
    };
}
