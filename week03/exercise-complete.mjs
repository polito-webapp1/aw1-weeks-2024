import dayjs from 'dayjs';
import sqlite from 'sqlite3';

// Apertura database e creazione oggetto
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata
  this.getAnswers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId=user.id WHERE answer.questionId = ?';
      db.all(sql, [this.id], (err, rows) => {
        if (err)
          reject(err)
        else {
          const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
          resolve(answers);
        }
      });
    });
  }

  // metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata
  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT id from user WHERE email = ?';
      db.get(sql, [answer.email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          sql = "INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?, ?, DATE(?), ?, ?)";
          db.run(sql, [answer.text, row.id, answer.date.toISOString(), answer.score, this.id], function (err) {
            if (err)
              reject(err);
            else
              resolve(this.lastID);
          });
        } else
          resolve("Author not available, check the inserted email.");
      });
    });
  }

  // metodo per prendere tutte le top "num" risposte della Question instanziata
  this.getTop = (num) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId=user.id WHERE answer.questionId = ? ORDER BY answer.score DESC LIMIT ?';
      db.all(sql, [this.id, num], (err, rows) => {
        if (err)
          reject(err)
        else {
          const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
          resolve(answers);
        }
      });
    });
  }
}

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.score = score;
  this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {

  // metodo per recuperare una singola Question dato il suo ID
  this.getQuestion = function (id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          resolve(new Question(row.id, row.text, row.email, row.date));
        } else {
          resolve("Question not available, check the inserted id.");
        }
      });
    });
  }

  // metodo per aggiungere una nuova Question di un autore esistente
  this.addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT id from user WHERE email = ?';
      db.get(sql, [question.email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          sql = 'INSERT INTO question(text, authorId, date) VALUES(?,?,DATE(?))';
          db.run(sql, [question.text, row.id, question.date.toISOString()], function (err) {
            if (err)
              reject(err);
            else
              resolve(this.lastID);
          });
        } else
          resolve("Author not available, check the inserted email.");
      });
    });
  }
}

// funzione asincrona per il test
async function main() {
  const ql = new QuestionList();

  const firstQuestion = await ql.getQuestion(1);
  console.log(await firstQuestion.getTop(2));

  const newQuestionId = await ql.addQuestion(new Question(undefined, "Is 1 bigger than 10?", "luigi.derussis@polito.it", dayjs()));
  const newQuestion = await ql.getQuestion(newQuestionId);
  console.log(await newQuestion.getAnswers());
}

main();