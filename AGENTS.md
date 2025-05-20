# Guidelines for AI Contributions

This repository contains a browser extension for highlighting kanji by grade and showing grade information via tooltips. It is an older project and may have build issues. The following instructions apply to all files in this repo.

## Coding Style
- Use modern JavaScript (ES2020 or later).
- Keep the formatting compatible with `eslint` and `stylelint` configurations provided in the repo.
- Prefer using `const` and `let` over `var`.

## Directory Layout
- `scripts/` contains JavaScript source files.
- `css/` contains style sheets.
- `data/` stores generated data files that define kanji lists.
- `unittest/` holds mocha tests run with Karma.

## Programmatic Checks
Before committing, run:

```bash
yarn lint
yarn test
```

Both commands should succeed. If the environment lacks network access and dependencies are missing, document this limitation in your PR message.

## Building
To create a distribution package, run `yarn pack` after tests pass. This generates `elementary-kanji-extension.zip` for deployment.

## Browser Compatibility
Ensure the extension remains compatible with Manifest V3 for Chrome and with Firefox via `web-ext`. Use the latest stable Chrome Extension SDK and update build scripts when new versions are released. Do not remove existing tooling without discussion.

