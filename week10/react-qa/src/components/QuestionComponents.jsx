/* eslint-disable react/prop-types */
import { Col, Row } from 'react-bootstrap';

import Answers from './AnswerComponents';
import AnswerForm from './AnswerForm';

export function QuestionLayout(props) {
  return(<>
    <QuestionDescription question={props.question} />
    <Answers answers={props.answers} voteUp={props.voteUp} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}></Answers>
  </>);
}

export function AddEditQuestionLayout(props) {
  return(<>
    <QuestionDescription question={props.question} />
    <AnswerForm mode={props.mode} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}/>
  </>);
}

function QuestionDescription (props) {
  return(
    <>
      <Row>
        <Col md={6} as='p'>
          <strong>Question #{props.question.id}:</strong>
        </Col>
        <Col md={6} as='p' className='text-end'>
          Asked by <span className='badge rounded-pill text-bg-secondary'>{props.question.email}</span>
        </Col>
      </Row>
      <Row>
        <Col as='p' className='lead'>{props.question.text}</Col>
      </Row>
    </>
  );
}
