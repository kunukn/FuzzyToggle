# FuzzyToggle

## About

A toggle with fuzzy state between value `[0; 1]` from given duration.

## Demo

* <a target="_blank" href="https://codepen.io/kunukn/pen/9e3a7609e3c2185d463c35c0837ab69c">Codepen - show concept</a>
* <a target="_blank" href="https://codepen.io/kunukn/pen/b0fb4e0076f2fe6ed35998de1226b320">Codepen - checkbox</a>
* <a target="_blank" href="https://codesandbox.io/s/4wr00vqw9x">Codesandbox - Checkbox</a>


## Getting started

`npm i @kunukn/fuzzytoggle`

## Usage example

```js
import createToggle from '@kunukn/fuzzytoggle';

let log = console.log;
let onUpdate = ({value:v, motion:m, hasReversed:h}) => { log(v,m,h) };
let onUpdate = ({value:v, motion:m, hasReversed:h}) => { log(v,m,h) };

let fuzzy = createToggle({
    duration: 1000,
    value: 0,
    onUpdate,
    onDone,
});

fuzzy.toggle();
// example: 
// console.log -> 0.2, 'expanding', false

setTimeout(()=>{
    fuzzy.toggle();
// example: 
// console.log -> 0.5, 'collapsing', true
}, 600);
```

## Methods

* toggle
* cancel

## Event hooks

* onUpdate
* onDone
* onCancel
* onToggle

## Size

ES5 `FuzzyToggle.umd.js`<br>
UMD minified 2.93 kb (gzipped 1.25 kb)
