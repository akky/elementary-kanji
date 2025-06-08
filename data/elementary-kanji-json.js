const allKanjiList = [
  ['字', '右', '左', '見'],
  [],
  ['漢', '感'],
  ['変', '単'],
  [],
  ['難', '簡']
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = allKanjiList;
} else {
  window.allKanjiList = allKanjiList;
}
