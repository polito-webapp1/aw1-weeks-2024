import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function QuestionsLayout(props) {
  return (
    <>
      <Row>
        <Col>
          <h1>Welcome to HeapOverrun!</h1>
          <p className='lead'>We now have {props.questions.length} questions available.</p>
        </Col>
      </Row>
      <Row>
        <dl>
          {
            props.questions.map((q) => <QuestionRow question={q} key={q.id}/>)
          }
        </dl>
      </Row>
    </>
  );
}

function QuestionRow(props) {
  return (
    <>
      <dt>Question #{props.question.id}: <Link to={`/questions/${props.question.id}`}>{props.question.text}</Link></dt>
      <dd>Asked by {props.question.author} on {props.question.date.format('YYYY-MM-DD')}</dd>
    </>
  );
}