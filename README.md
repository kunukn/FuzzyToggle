# FuzzyToggle

## About

A toggle with fuzzy state between value `[0; 1]` from given duration.

## Demo

https://codepen.io/kunukn/pen/9e3a7609e3c2185d463c35c0837ab69c


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
* setConfig
* getConfig

## event hooks

* onUpdate
* onDone
* onCancel
* onReverse

## Size

ES5 `FuzzyToggle.umd.js`<br>
UMD minified 3.3 kb (gzipped 1.4 kb)

ES2015 `FuzzyToggle.umd.es2015.js`<br>
UMD minified 2.6 kb (gzipped 1.1 kb)
