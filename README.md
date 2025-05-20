# elementary-kanji

[Elementary Kanji]() is a Chrome Extension to show which Kanji is taught in which elementary school grade.

## How it works

With this Chrome extension, when you show a web page, kanji are emphasized by its taught grade.

![sample page](screenshots/download_blocked.png)

## unit test

~~~
$ yarn test
~~~

The above command invokes Karma test runner. Karma auto-requires js modules (like as Chrome Extension env does) so test code can call them.

Karma always comes with (headless) browser, which I do not use now. Test runner without client browser would fit better for this project but I could not find.

## lint and fix

[eslint](https://eslint.org/) is used for JavaScript, [stylelint](https://stylelint.io/) for CSS.

~~~
$ yarn lint
~~~

This check source code statistically.

~~~
$ yarn beautify
~~~

This one fixes checked code. (CSS lint by stylelint may not fix all warnings. In this case you need to revise them manually after running this)

## prepare data

~~~
$ yarn scrape
~~~

This takes kanji list from Mext website, format them in JavaScript file to be imported.

## packaging

~~~
$ yarn run pack
~~~

This only packs neccessary files for deployment on Extension stores. (currently for Chrome store)

## depending libraries

  * [findAndReplaceDOMText](https://github.com/padolsey/findAndReplaceDOMText) to wrap detected kanji-s on DOM.

## contribution

### site info

Send me a PR.

### translation

Please add _locales/(your locale)/messages.json , then send me a PR.

## credit

This extension is by MIT License

## development

  * install [node](https://nodejs.org/en/)  (I recommend nvm for Windows)
  * install [yarn](https://yarnpkg.com/)
  * 


## CI

CI runs on GitHub Actions. It installs Chrome and sets `CHROME_BIN` so Karma can launch `ChromeHeadless`.
The workflow also runs `yarn scrape` to fetch kanji data before tests.

Packed extension zip would be uploaded on artifact section on the successful build.
When a tag starting with `v` is pushed, the workflow creates a numbered GitHub release with `extension.zip` attached.

## deployment

### Chrome Webstore API

You need to register API and get keys manually.

[How to](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md)

create project: [webstore-publish]

It is not really practical. Oauth call gives you refresh token but that works only in 3600 seconds. Oauth from CircleCI(or other tool) would be complecated.

cf. [Is it possible to auto\-update a chrome extension published on the chrome web store? \- Stack Overflow](https://stackoverflow.com/questions/13139627/is-it-possible-to-auto-update-a-chrome-extension-published-on-the-chrome-web-sto/26754858)

### Firefox

[Build and Sign WebExtensions with CircleCI - mkelly\.me](http://www.mkelly.me/blog/build-and-sign-webextensions-with-circleci/)



# ToDo-es

## ToDo: show how to read each kanji-s

requires external library and/or API for this.

 * [Wikipedia 常用漢字一覧(読みあり)](https://ja.wikipedia.org/wiki/%E5%B8%B8%E7%94%A8%E6%BC%A2%E5%AD%97%E4%B8%80%E8%A6%A7)
 * [常用漢字表 on github by someone](https://github.com/cjkvi/cjkvi-tables)

## ToDo: expand to Middle and High-school

## ToDo: expand to on'yomi/kun'yomi grades

  cf. http://www.mext.go.jp/a_menu/shotou/new-cs/1385768.htm

## ToDo: add to show readings for kanji

  https://developer.yahoo.co.jp/webapi/jlp/furigana/v1/furigana.html
  https://github.com/kishierik/jpTranslit/blob/master/js/main.js


