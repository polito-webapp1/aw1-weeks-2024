// import
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {check, validationResult} from 'express-validator';
import {listQuestions, getQuestion, listAnswersOf, addAnswer, updateAnswer, voteAnswer} from './dao.mjs';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));
// set up and enable CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

/* ROUTES */

// GET /api/questions
app.get('/api/questions', (request, response) => {
  listQuestions()
  .then(questions => response.json(questions))
  .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async(req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if(question.error)
      res.status(404).json(question);
    else
      res.json(question);
  } catch {
    res.status(500).end();
  }
});

// GET /api/questions/<id>/answers
app.get('/api/questions/:id/answers', async (req, res) => {
  try {
    const answers = await listAnswersOf(req.params.id);
    res.json(answers);
  } catch {
    res.status(500).end();
  }
});

// POST /api/questions/<id>/answers
app.post('/api/questions/:id/answers', [
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const newAnswer = req.body;
  const questionId = req.params.id;

  try {
    const id = await addAnswer(newAnswer, questionId);
    res.status(201).location(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: 'Impossible to create the answer.'});
  }
});

// PUT /api/answers/<id>
app.put('/api/answers/:id', [
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const answerToUpdate = req.body;
  answerToUpdate.id = req.params.id;

  try {
    await updateAnswer(answerToUpdate);
    res.status(200).end();
  } catch {
    res.status(503).json({'error': `Impossible to update answer #${req.params.id}.`});
  }
});

// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', [
  check('vote').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if(num === 1)
      res.status(204).end();
    else
      throw new Error(`Error in casting a vote for answer #${answerId}`);
  } catch(e) {
    res.status(503).json({error: e.message});
  }
});

// far partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });