import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import {QuestionLayout, AddEditQuestionLayout} from './components/QuestionComponents';
import NotFound from './components/NotFoundComponent';
import { QuestionsLayout } from './components/QuestionListComponent';
import API from './API.mjs';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // recuperiamo tutte le domande dal server
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

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

  return (
    <Routes>
      <Route element={<>
        <NavHeader />
        <Container fluid className='mt-3'>
          <Outlet/>
        </Container>
        </>
      }>
        <Route index element={
          <QuestionsLayout questions={questions} />
        } />
        <Route path="/questions/:questionId" element={
          <QuestionLayout questions={questions} />
        }/>
        <Route path="/questions/:questionId/addAnswer" element={
          <AddEditQuestionLayout questions={questions} mode="add" addAnswer={addAnswer} />
        }/>
        <Route path="/questions/:questionId/editAnswer/:answerId" element={
          <AddEditQuestionLayout questions={questions} mode="edit" updateAnswer={updateAnswer} />
        }/>
        <Route path="*" element={ <NotFound/> } />
      </Route>
    </Routes>
  );

}

export default App;
