//'use strict'; // di default con i moduli ES

// CommonJS
//const dayjs = require('dayjs');

// ES
import dayjs from 'dayjs';

let oggi = dayjs(); // oggi
console.log(oggi.format('YYYY-MM-DD'));