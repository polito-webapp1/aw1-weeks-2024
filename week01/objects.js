'use strict';

// nuovo oggetto
const movie = {
  title: 'Titanic',
  genre: 'drama',
  duration: 200
}

// stampa oggetto e proprietà titolo
console.log(movie);
console.log(movie['title']);
console.log(movie.title); // equivalente di riga 12

movie.director = 'Cameron'; // aggiungo proprietà
// movie['director'] = 'Cameron';
delete movie.genre; // rimuovo proprietà

console.log(movie);

movie['title'] // la proprietà che si chiama 'title'
movie.title // idem come sopra
const title = 'director'; // proprietà in variabile
console.log(movie[title]);

// stampo tutte le proprietà (nome e valore)
for(const prop in movie) {
  console.log(`${prop} is ${movie[prop]}`);
}

// copia di oggetto
const titanic = Object.assign({}, movie);
console.log(titanic);

// aggiunta di proprietà (una, in questo caso) all'oggetto
Object.assign(movie, {budget: '200 millions USD'}); //movie.budget = ...
console.log(movie);

// unione di oggetti in nuovo
const improvedMovie = Object.assign({}, movie, {cast: '...'});
console.log(improvedMovie);

console.log(titanic);

const titanic2 = {... movie}; // come riga 29
