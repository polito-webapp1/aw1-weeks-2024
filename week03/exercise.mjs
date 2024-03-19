import sqlite from 'sqlite3';
import dayjs from 'dayjs';

// Apertura database e creazione oggetto
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

// Oggetto rappresentante le domande
function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata
  this.getAnswers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT answer.id, text, user.email, date, score FROM answer, user WHERE questionId=? AND answer.authorId=user.id';
      db.all(sql, [this.id], (err, rows) => {
        if(err)
          reject(err);
        else {
          const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
          resolve(answers);
        }
      })
    });
  }
}

// Oggetto rappresentante le risposte
function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.score = score;
}


async function main() {
  let fake = new Question(1,'','',''); // TODO: RIMPIAZZARE COL METODO CORRETTO
  // 1. PROMISE E THEN
  // fake.getAnswers().then(results => console.log(results));
  // 2. ASYNC/AWAIT
  const results = await fake.getAnswers();
  console.log(results);
}

main();