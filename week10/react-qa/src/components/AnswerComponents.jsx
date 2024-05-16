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
        <AnswerTable answers={props.answers} voteUp={props.voteUp}/>
        <Link className="btn btn-primary mb-4" to="addAnswer">Add</Link>
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
        { sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp} />) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr>
      <AnswerData answer={props.answer}/>
      <AnswerAction answer={props.answer} voteUp={props.voteUp} />
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

function AnswerAction(props) {
  return(
    <td>
      <Button variant='warning' onClick={
        () => props.voteUp(props.answer.id)
      }><i className='bi bi-arrow-up'></i></Button>
      <Link className='btn btn-primary' to={`editAnswer/${props.answer.id}`}
        /* serialize() method was added to QAModels.js. location.state can not manage properly "complex" objects (i.e., objects inside objects). */
        state={props.answer.serialize()}>
          <i className='bi bi-pencil-square' />
      </Link> 
      <Button variant='danger'><i className='bi bi-trash'></i></Button>
    </td>
  );
}

export default Answers;
