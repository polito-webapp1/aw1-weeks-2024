import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import NavHeader from "./components/NavHeader";
import { QuestionLayout, AddEditQuestionLayout } from './components/QuestionComponents';
import NotFound from './components/NotFoundComponent';
import { QuestionsLayout } from './components/QuestionListComponent';
import { LoginForm } from './components/AuthComponents';
import API from './API.mjs';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // NEW
  const [message, setMessage] = useState(''); // NEW
  const [user, setUser] = useState(''); // NEW

  useEffect(() => {
    // recuperiamo tutte le domande dal server
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

  // NEW
  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  // NEW
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  // NEW
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };

  return (
    <Routes>
      <Route element={<>
        {/* UPDATED */}
        <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} />
        <Container fluid className='mt-3'>
          {/* NEW */}
          {message && <Row>
            <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
          </Row> }
          <Outlet/>
        </Container>
        </>
      }>
        <Route index element={
          <QuestionsLayout questions={questions} />
        } />
        {/* UPDATED */}
        <Route path="/questions/:questionId" element={
          <QuestionLayout questions={questions} loggedIn={loggedIn} user={user} />
        }/>
        {/* UPDATED */}
        <Route path="/questions/:questionId/addAnswer" element={
          <AddEditQuestionLayout questions={questions} mode="add" user={user} />
        }/>
        {/* UPDATED */}
        <Route path="/questions/:questionId/editAnswer/:answerId" element={
          <AddEditQuestionLayout questions={questions} mode="edit" user={user} />
        }/>
        <Route path="*" element={ <NotFound/> } />
        {/* NEW */}
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />
        } />
      </Route>
    </Routes>
  );

}

export default App;
