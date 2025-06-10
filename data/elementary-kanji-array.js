const allKanjiStringArray = [
    "字右左見",
    "",
    "漢感",
    "変単",
    "",
    "難簡",
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = allKanjiStringArray;
} else {
    window.allKanjiStringArray = allKanjiStringArray;
}
