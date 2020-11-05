#!/usr/bin/env node

const fs = require('fs');
const Compiler = require('./index.js');

const css = fs.readFileSync(0, 'utf-8');
const compiler = new Compiler(css);
const result = compiler.compile();
process.stdout.write(result);



// var compiler = new Compiler(`
// @media (max-width: 10000px) {
//   :root {
//     --plum: #360922;
//     --plum_accent: #691240;
//     --plum_black: #210015;
//     --plum_light: #7B144A;
//     --orange: #FA4616;
//     --orange_accent: #F26722;
//     --gray: #E6E6E6;
//     --gray_accent: #F4F4F4;
//   }

// header {
//   background-color: var(--plum);
// }

// @media (max-width: 767px) {
//   header {
//     padding: 1em;
//   }
// }

// `);
// var result = compiler.compile();
// process.stdout.write(result);
