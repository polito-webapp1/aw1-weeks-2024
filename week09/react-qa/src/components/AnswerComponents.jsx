/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from './AnswerForm';

function Answers (props) {

  return(
    <>
    <Row>
      <Col as='h2'>Answers ({props.answers.length}):</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <AnswerTable answers={props.answers} voteUp={props.voteUp}></AnswerTable>
        <AnswerForm />
      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp}/>) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerAction answerId={props.answer.id} voteUp={props.voteUp}/></tr>
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
        () => props.voteUp(props.answerId)
      }><i className='bi bi-arrow-up'></i></Button>
      <Button variant='primary' className='mx-1'><i className='bi bi-pencil-square'></i></Button> 
      <Button variant='danger'><i className='bi bi-trash'></i></Button>
    </td>
  );
}

export default Answers;