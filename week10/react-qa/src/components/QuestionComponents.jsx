/* eslint-disable react/prop-types */
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import Answers from './AnswerComponents';
import AnswerForm from './AnswerForm';

export function QuestionLayout(props) {
  return(<>
    <QuestionDescription question={props.question} />
    <Answers answers={props.answers} voteUp={props.voteUp} />
  </>);
}

export function AddEditQuestionLayout(props) {
  const location = useLocation();
  const editableAnswer = location.state;

  /**
   * Se accediamo alla URL di Edit tramite routing "diretto" (i.e., scrivendo la URL nella barra degli indirizzi),
   * in location.state non abbiamo nulla e non possiamo gestire l'edit correttamente.
   */ 
  if(props.mode==='edit' && !editableAnswer)
    return(<>
      <p className='lead'>Error: edit mode not available! Please, go back to the answer you want to edit and try again.</p>
      <Link className='btn btn-danger' to={'../..'} relative='path'>Back to the question</Link>
    </>);
  else
    return(<>
      <QuestionDescription question={props.question} />
      {/* When we are in edit mode, editableAnswer will be undefined and therefore falsy inside AnswerForm */}
      <AnswerForm mode={props.mode} answer={editableAnswer} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}/>
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
