/* Strange JS behaviors and where to find (some of) them */
'use strict';

const type = typeof NaN;
console.log('NaN is a ' + type); // <your guess>
console.log(`NaN === NaN? ${NaN === NaN}\n`); // <your guess>

console.log(`NaN == NaN? ${NaN == NaN}`); // <your guess>
console.log(`null == undefined? ${null == undefined}\n`); // <your guess>

console.log(`null == false? ${null == false}`); // <your guess>
console.log(`'' == false? ${'' == false}`); // <your guess>
console.log(`3 == true? ${3 == true}`); // <your guess>
console.log(`0 == -0? ${0 == -0}\n`); // <your guess>

console.log(`true + true = ${true + true}`); // <your guess>
console.log(`true !== 1? ${true !== 1}\n`); // <your guess>

console.log(`5 + '10' = ${5 + '10'}`); // <your guess>
console.log(`'5' - 1 = ${'5' - 1}\n`); // <your guess>

console.log(`1 < 2 < 3? ${1 < 2 < 3}`); // <your guess>
console.log(`3 > 2 > 1? ${3 > 2 > 1}\n`); // <your guess>

console.log(`0.2 + 0.1 === 0.3? ${0.2 + 0.1 === 0.3}\n`); // <your guess>

console.log('b' + 'a' + (+ 'a') + 'a'); // <your guess>