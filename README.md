# makeup-roving-tabindex

<p>
    <a href="https://travis-ci.org/makeup-js/makeup-roving-tabindex"><img src="https://api.travis-ci.org/makeup-js/makeup-roving-tabindex.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-js/makeup-roving-tabindex?branch=master'><img src='https://coveralls.io/repos/makeup-js/makeup-roving-tabindex/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-js/makeup-roving-tabindex"><img src="https://david-dm.org/makeup-js/makeup-roving-tabindex.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-js/makeup-roving-tabindex#info=devDependencies"><img src="https://david-dm.org/makeup-js/makeup-roving-tabindex/dev-status.svg" alt="devDependency status" /></a>
</p>

Implements a roving tab index on given collection of elements

A vanilla JavaScript port of <a href="https://github.com/ianmcburnie/jquery-roving-tabindex">jquery-roving-tabindex</a>.

## Experimental

This module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-roving-tabindex

// via yarn
yarn add makeup-roving-tabindex
```

## Example

```js
// require the module
const RovingTabindex = require('makeup-roving-tabindex');

// get an element reference
const widgetEl = document.querySelector('.widget');

// create a roving tabindex instance on the element
const rovingTabindex = RovingTabindex.createLinear(widgetEl, 'li');

// set the active element
rovingTabindex.index = 0;

// listen for events (optional)
widgetEl.addEventListener('rovingTabindexChange', function(e) {
    // console.log(e.detail);
})
```

Markup before:

```html
<div class="widget">
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>
```

Markup after:

```html
<div class="widget">
    <ul>
        <li data-makeup-index="0" tabindex="0">Item 1</li>
        <li data-makeup-index="1" tabindex="-1">Item 2</li>
        <li data-makeup-index="2" tabindex="-1">Item 3</li>
    </ul>
</div>
```

## Custom Events        

* `rovingTabindexChange`
    * detail
        * fromIndex
        * toIndex

## Dependencies

* `makeup-navigation-emitter`

## Development

* `npm start`
* `npm test`
* `npm run lint`
* `npm run fix`
* `npm run build`
* `npm run clean`

The following hooks exist, and do not need to be invoked manually:

* `npm prepublishOnly` cleans, lints, tests and builds on every `npm publish` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## Test Reports

Each test run will generate the following reports:

* `/reports/coverage` contains Istanbul code coverage report
* `/reports/html` contains HTML test report

## CI Build

https://travis-ci.org/makeup-js/makeup-roving-tabindex

## Code Coverage

https://coveralls.io/github/makeup-js/makeup-roving-tabindex
