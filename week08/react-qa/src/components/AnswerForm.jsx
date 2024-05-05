import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AnswerForm() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    // farà qualcosa
  }

  return(
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      <Button variant='primary' type='Submit'>Add</Button> <Button variant='danger'>Cancel</Button>
    </Form>
  );
}

export default AnswerForm;