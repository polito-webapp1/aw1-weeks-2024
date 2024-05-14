import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { Routes, Route, Outlet } from 'react-router-dom';

import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import {QuestionLayout, AddEditQuestionLayout} from './components/QuestionComponents';
import NotFound from './components/NotFoundComponent';


const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'luigi.derussis@polito.it', '2024-02-07');
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          // ritorno una nuova, aggiornata, risposta
          return new Answer(ans.id, ans.text, ans.email, ans.date, ans.score +1);
        else
          return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, answer.date, 0);
      return [...oldAnswers, newAnswer];
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map((ans) => {
        if(ans.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.email, answer.date, ans.score);
        }
        else
          return ans;
      });
    });
  }

  /** --------------- Route dell'applicazione ------------------------
         Possibili alternative sono indicate nelle righe successive
      ----------------------------------------------------------------
    ----- Funzionalità non implementate -----
    Questions:     /
                   /questions
    AddQuestion:   /questions/add
                   /addQuestions
    EditQuestion:  /questions/:questionId/edit (???)
        (questa è probabilmente una funzionalità che non vogliamo, o che vogliamo solo per admin)
    ----- Funzionalità implementate -----
    AnswerPage:    /questions/:questionId
                   /questions/:questionId/answers
    AddAnswer:     /questions/:questionId/addAnswers
                   /questions/:questionId/answers/add
                   /answers/new
    EditAnswer:    /questions/:questionId/editAnswer/:answerId
                   /questions/:questionId/answers/:answerId/edit
                   /answers/:answerId/edit
    -------
    404 not found: *
    -------
  **/

  return (
    <Routes>
      <Route element={<>
        <NavHeader questionNum={question.id} />
        <Container fluid className='mt-3'>
          <Outlet/>
        </Container>
        </>
      }>
        <Route path='/' element={<p className="lead">ToDo: implement here question list!</p>} />
        <Route path="/questions/:questionId" element={
          <QuestionLayout question={question} answers={answers} voteUp={voteUp} />
        }/>
        <Route path="/questions/:questionId/addAnswer" element={
          <AddEditQuestionLayout question={question} mode="add" addAnswer={addAnswer} />
        }/>
        <Route path="/questions/:questionId/editAnswer/:answerId" element={
          <AddEditQuestionLayout question={question} mode="edit" updateAnswer={updateAnswer} />
        }/>
        <Route path="*" element={ <NotFound/> } />
      </Route>
    </Routes>
  );

}

export default App;
