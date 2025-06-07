const stylelint = require('stylelint');

function createNoopRule(ruleName) {
    return stylelint.createPlugin(ruleName, () => {
        return (root, result) => {};
    });
}

const ruleNames = [
    'string-quotes',
    'color-hex-case',
    'color-hex-length',
    'number-leading-zero',
    'number-no-trailing-zeros',
    'value-list-comma-newline-after',
    'value-list-comma-space-after',
    'declaration-colon-space-after',
    'block-opening-brace-newline-after',
    'block-closing-brace-newline-before',
    'block-opening-brace-space-before',
    'declaration-block-trailing-semicolon',
    'selector-combinator-space-after',
    'selector-combinator-space-before',
    'selector-list-comma-newline-after',
    'indentation'
];

const rules = {};
for (const name of ruleNames) {
    const fullName = `stylistic/${name}`;
    const plugin = createNoopRule(fullName);
    plugin.ruleName = fullName;
    plugin.messages = stylelint.utils.ruleMessages(fullName, {});
    rules[name] = plugin;
}

module.exports = { rules };
