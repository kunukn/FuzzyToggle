# FuzzyToggle

## About

A toggle with fuzzy state between value `[0; 1]` from given duration.

## Demo

* <a target="_blank" href="https://codepen.io/kunukn/full/9e3a7609e3c2185d463c35c0837ab69c">Codepen - show concept</a>
* <a target="_blank" href="https://codepen.io/kunukn/full/b0fb4e0076f2fe6ed35998de1226b320">Codepen - checkbox</a>
* <a target="_blank" href="https://codesandbox.io/s/4wr00vqw9x">Codesandbox - Checkbox</a>


## Getting started

`npm i @kunukn/fuzzytoggle`

## Usage example

```js
import createToggle from '@kunukn/fuzzytoggle';

function log(){ console.log(...arguments) };
let onUpdate = ({value:v, motion:m}) => { log('upd:',v,m) };
let onDone = ({value:v, motion:m, hasReversed:h}) => { log('done:',v,m,h) };

let fuzzy = createToggle({
    duration: 1000,
    value: 0, // 0 or 1
    onUpdate,
    onDone,
});

fuzzy.toggle();
// example:
// console.log -> upd: 0.2 'expanding'

setTimeout(()=>{
    fuzzy.toggle();
// example:
// console.log -> upd: 0.5 'collapsing'
}, 600);


// console.log -> done: 0 'collapsed' true
```



## Methods

* `toggle` reverses the toggle direction until value 0 or 1
* `cancel` cancels and stops current toggle direction

## Event hooks

* onUpdate: `({value, motion}) => { /* your code */ }`
* onDone: `({value, motion, hasReversed}) => { /* your code */ }`
* onCancel: `({value, motion, hasReversed}) => { /* your code */ }`
* onToggle: `({value, motion, hasReversed}) => { /* your code */ }`

## Size

ES5 `FuzzyToggle.umd.js`<br>
UMD minified 2.93 kb (gzipped 1.25 kb)
