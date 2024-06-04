/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';
import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Answers(props) {
  return(
    <>
    <Row>
      <Col as='h2'>Answers ({props.answers.length}):</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        {/* UPDATED */}
        <AnswerTable answers={props.answers} voteUp={props.voteUp} loggedIn={props.loggedIn} user={props.user}/>
        {props.loggedIn && <Link className="btn btn-primary mb-4" to="addAnswer">Add</Link>}   
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
          {props.loggedIn && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {/* UPDATED */}
        { sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp} loggedIn={props.loggedIn} user={props.user}/>) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr>
      <AnswerData answer={props.answer}/>
      {/* UPDATED */}
      {props.loggedIn && <AnswerAction answer={props.answer} voteUp={props.voteUp} user={props.user}/>}
    </tr>
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

/* UPDATED */
function AnswerAction(props) {
  return(
    <td>
      <Button variant='warning' onClick={
        () => props.voteUp(props.answer.id)
      } disabled={props.answer.voted || props.user.username === props.answer.email}><i className='bi bi-arrow-up'></i></Button>

      {props.user.username === props.answer.email && <>
      <Link className='btn btn-primary mx-1 ' to={`editAnswer/${props.answer.id}`} state={props.answer.serialize()} disabled={!props.loggedIn}>
        <i className='bi bi-pencil-square' />
      </Link> 
      <Button variant='danger'><i className='bi bi-trash'></i></Button>
      </>}
    </td>
  );
}

export default Answers;
