/* eslint-disable react/prop-types */
import dayjs from 'dayjs';

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../API.mjs';

function AnswerForm(props) {
  const {questionId} = useParams();
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false);
  
  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [email, setEmail] = useState(props.answer ? props.answer.email : props.user.username);
  const [date, setDate] = useState(props.answer ? props.answer.date : dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event) => {
    event.preventDefault();
    // creare un nuova risposta
    const answer = {text, email, date};

    setWaiting(true);
    // TODO: aggiungere validazione

    if(props.mode === 'edit') {
      // aggiornare la risposta in questione
      API.updateAnswer({id: props.answer.id, ...answer, score: props.answer.score})
        .then(()=> navigate(`/questions/${questionId}`));
        //.catch() gestire eventuali errori
    } else {
      // aggiungere la risposta allo stato
      API.addAnswer(answer, questionId)
        .then(()=> navigate(`/questions/${questionId}`));
        //.catch() gestire eventuali errori
    }
  }

  return(
    <>
    {waiting && <Alert variant='secondary'>Please, wait for the server's answer...</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required={true} value={email} disabled={true}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      {props.mode==='add' && <Button variant='success' type='submit' disabled={waiting}>Add</Button>}
      {props.mode==='edit' && <Button variant='primary' type='submit' disabled={waiting}>Update</Button>}
      <Link className='btn btn-danger mx-2 my-2' to={props.answer ? '../..':'..'} relative='path'>Cancel</Link>
    </Form>
    </>
  );
}

export default AnswerForm;
