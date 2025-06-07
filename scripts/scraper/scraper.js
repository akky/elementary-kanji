'use strict'

// source and output
const data_source_url = 'https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/syo/koku/001.htm';
const LOCAL_HTML_PATH = 'data/mext-kanji-table.html';
const JAVASCRIPT_JSON_FILENAME = 'data/elementary-kanji-json.js';
const JAVASCRIPT_STRING_ARRAY_FILENAME = 'data/elementary-kanji-array.js';

// libraries
const scrapeIt = require("scrape-it");
const fs = require('fs');
const assert = require('assert');

// "一　二（2字）" -> [ "一", "二" ]
function parseKanjiList(original) {
    let countRemoved = original.replace(/（\d+字）/, '');
    return countRemoved.split('　');
}

async function fetchKanjiItems() {
    try {
        return await scrapeIt(data_source_url, {
            items: { listItem: '.text_content td' }
        });
    } catch (err) {
        console.log('failed to fetch kanjis from ' + data_source_url + ', using local file.');
        const localHtml = fs.readFileSync(LOCAL_HTML_PATH, 'utf8');
        return await scrapeIt({ html: localHtml }, {
            items: { listItem: '.text_content td' }
        });
    }
}

fetchKanjiItems().then(({ data }) => {
    if (!data.items) {
        return console.log('failed to obtain kanji list');
    }

    let allKanjiList = [];
    data.items.forEach(function (value, index) {
        let kanjiArray = parseKanjiList(value);
        allKanjiList[index] = kanjiArray;
    });

    // sanity check
    assert(allKanjiList.length == 6, 'there should be 6 grades');
    assert(allKanjiList[0].length >= 70, '1st grade has enough kanjis');
    assert(allKanjiList[1].length >= 150, '2nd grade has enough kanjis');
    assert(allKanjiList[2].length >= 190, '3rd grade has enough kanjis');
    assert(allKanjiList[3].length >= 190, '4th grade has enough kanjis');
    assert(allKanjiList[4].length >= 180, '5th grade has enough kanjis');
    assert(allKanjiList[5].length >= 180, '6th grade has enough kanjis');

    saveAsJavascriptArray(allKanjiList);
    saveAsJavascriptStringArray(allKanjiList);
});

function saveAsJavascriptArray(allKanjiList) {
    fs.writeFile(JAVASCRIPT_JSON_FILENAME, 'const allKanjiList = ' + JSON.stringify(allKanjiList), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('JSON file saved to ' + JAVASCRIPT_JSON_FILENAME);
    });
}

function saveAsJavascriptStringArray(allKanjiList) {
    let html = '';
    let allKanjiStingArray = [];
    for (let i=0 ; i<6 ; i++) {
        let regexp = '';
        allKanjiList[i].forEach(function(value) {
            regexp += value;
        });
        allKanjiStingArray[i] = regexp;
    }

    fs.writeFile(JAVASCRIPT_STRING_ARRAY_FILENAME, 'const allKanjiStingArray = ' + JSON.stringify(allKanjiStingArray), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('kanji string array file saved to ' + JAVASCRIPT_STRING_ARRAY_FILENAME);
    });
}
