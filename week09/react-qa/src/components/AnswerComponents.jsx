import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from './AnswerForm';
import { useState } from 'react';

function Answers(props) {
  const [mode, setMode] = useState('view');
  const [editableAnswer, setEditableAnswer] = useState();

  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode('edit');
  }

  return(
    <>
    <Row>
      <Col as='h2'>Answers ({props.answers.length}):</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <AnswerTable answers={props.answers} voteUp={props.voteUp} handleEdit={handleEdit}></AnswerTable>
        
        {mode === 'view' && <Button variant='primary' onClick={() => {setMode('add');}}>Add</Button>}
        
        {mode === 'add' && <AnswerForm addAnswer={(answer) => {props.addAnswer(answer); setMode('view');}} cancel={()=> setMode('view')} mode={mode}/>}

        {mode === 'edit' && <AnswerForm key={editableAnswer.id} answer={editableAnswer} updateAnswer={(answer) => {props.updateAnswer(answer); setMode('view');}} cancel={()=> setMode('view')} mode={mode}/>}

      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  const [sortOrder, setSortOrder] = useState('none');

  const sortedAnswers = [...props.answers];
  if(sortOrder === 'asc')
    sortedAnswers.sort((a,b) => a.score - b.score);
  else if (sortOrder == 'desc')
    sortedAnswers.sort((a,b) => b.score - a.score);

  const sortByScore = () => {
    setSortOrder(oldOrder => oldOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>text</th>
          <th>Author</th>
          <th>Score <Button variant='link' onClick={sortByScore} style={{color: 'black'}}><i className={sortOrder ==='asc' ? 'bi bi-sort-numeric-up' : 'bi bi-sort-numeric-down'}></i></Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp} handleEdit={props.handleEdit}/>) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerAction answer={props.answer} voteUp={props.voteUp} handleEdit={props.handleEdit}/></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return(
    <td>
      <Button variant='warning' onClick={
        () => props.voteUp(props.answer.id)
      }><i className='bi bi-arrow-up'></i></Button>
      <Button variant='primary' className='mx-1' onClick={
        () =>props.handleEdit(props.answer)
      }><i className='bi bi-pencil-square'></i></Button> 
      <Button variant='danger'><i className='bi bi-trash'></i></Button>
    </td>
  );
}

export default Answers;