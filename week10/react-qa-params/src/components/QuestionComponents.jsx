/* eslint-disable react/prop-types */
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Answers from './AnswerComponents';
import AnswerForm from './AnswerForm';

export function QuestionLayout(props) {
  return(<>
    <QuestionDescription question={props.question} />
    <Answers answers={props.answers} voteUp={props.voteUp} />
  </>);
}

export function AddEditQuestionLayout(props) {
  const params = useParams();
  // Beware: params are always strings!
  const answerId = parseInt(params.answerId);

  let editableAnswer = undefined;
  if(props.mode==='edit') {
    const answers = props.question.getAnswers();
    editableAnswer = answerId && answers.find(ans => ans.id == answerId);
  }
  
  return(<>
    <QuestionDescription question={props.question} />
    { 
    props.mode === 'edit' && !editableAnswer ?
      /* If we are in edit mode but the editableAnswer is falsy, the ID passed as param is wrong! */
      <>
        <p>Answer not found!</p>
        <Link className='btn btn-danger' to='../../' relative='path'>Go back</Link>
      </>
      /* When we are in edit mode, editableAnswer will be undefined and therefore falsy inside AnswerForm */
      : <AnswerForm mode={props.mode} answer={editableAnswer} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}/>
    }
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
