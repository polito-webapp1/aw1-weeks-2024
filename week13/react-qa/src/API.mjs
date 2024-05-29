import { Question, Answer } from './QAModels.mjs';

const SERVER_URL = 'http://localhost:3001';

const getQuestions = async () => {
  const response = await fetch(SERVER_URL + '/api/questions');
  if(response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(q => new Question(q.id, q.text, q.email, q.date));
  }
  else
    throw new Error('Internal server error');
}

const getAnswers = async (questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`);
  if(response.ok) {
    const answersJson = await response.json();
    return answersJson.map(ans => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
  }
  else
    throw new Error('Internal server error');
}

const vote = async (answerId) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answerId}/vote`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({vote: 'upvote'})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
  // TODO: migliorare gestione errori/risposte 
}

const addAnswer = async (answer, questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({text: answer.text, email: answer.email, score: 0, date: answer.date})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
  // TODO: migliorare gestione errori/risposte 
}

const updateAnswer = async (answer) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answer.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({text: answer.text, email: answer.email, score: answer.score, date: answer.date})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
  // TODO: migliorare gestione errori/risposte 
}

const API = {getAnswers, getQuestions, vote, addAnswer, updateAnswer};
export default API;