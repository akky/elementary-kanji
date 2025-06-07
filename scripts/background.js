'use strict';

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id) {
        return;
    }
    try {
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['css/kanji_grades.css']
        });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [
                'data/elementary-kanji-array.js',
                'data/elementary-kanji-json.js',
                'scripts/findAndReplaceDOMText.js',
                'scripts/replacer.js'
            ]
        });
    } catch (e) {
        console.error(e);
    }
});
