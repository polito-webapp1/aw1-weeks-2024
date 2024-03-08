'use strict' ;

const names = `Luigi De Russis, Luca Mannella, 
Fulvio Corno, Juan Pablo Saenz Moreno, 
Enrico Masala, Antonio Servetti, Eros Fani`;
// esempio con ``: se le usate invece di '', potete avere strighe multi-linea: in quel caso, dovete gestire anche gli a capo, -- vedere sotto

// togliamo gli a capo
const inlineNames = names.replace(/\n/g, ' ');

// creazione dell'array dei nomi
const nameArray = inlineNames.split(',');

// rimozione degli spazi intorno alla virgola
for(let i =0; i < nameArray.length; i++)
  nameArray[i] = nameArray[i].trim();

// ALTERNATIVA
/*
for(let [i, n]  of nameArray.entries())
  nameArray[i] = n.trim() ;
*/

// creazione degli acronimi
const acronyms = [];

for(const name of nameArray) {
  // ogni parola in una posizione dell'array
  const words = name.split(' ');
  let initials = '';
  // memorizzo la prima lettera di ogni parola
  for(const word of words) {
    if (word) {
      initials += word[0];
    }
  }
  acronyms.push(initials);
}

// stampo il risultato
for(let i=0; i < nameArray.length; i++) {
    console.log(`${acronyms[i]} - ${nameArray[i]}`);
}