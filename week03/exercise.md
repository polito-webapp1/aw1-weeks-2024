# Exercise 4: Q&A, with a database

_Goal: interacting with a database while experimenting with async code_.

Update the previous "Q&A" exercise to use a database.

Manage a list of objects that include information about some questions and their answers. The stored information is similar to the previous exercise, with an _additional id_ for questions/answers and the user's email as their username, i.e.,:

| `Question` object |
|----------|
| id (int) |
| question text (string) |
| questioner email (string) |
| posting date (datejs) |

Note that the "list of answers (array)" is no longer needed, since answers will be stored in a suitable database table.

| `Answer` object |
|--------|
| id (int) |
| answer text (string) |
| respondent email (string) |
| posting date (datejs) |
| score (positive or negative integer) |


The information should be stored in a SQlite database (`questions.sqlite`), designed with database tables corresponding to the Q&A data and a dedicated table to store the questioner/respondent information:

### `question` table

| Field | Type |
|-------|------|
| id    | integer |
| text | text |
| authorId | integer |
| date | date |

### `answer` table

| Field | Type |
|-------|------|
| id    | integer |
| text | text |
| authorId | integer |
| date | date |
| score | integer |
| questionId | integer |

### `user` table

| Field | Type |
|-------|------|
| id    | integer |
| name | text |
| email | text |


Each `Question` object will have the following methods, operating directly on the database:

* `addAnswer(answer)` // pass a fully-constructed `Answer` object and store it in the database.
* `getAnswers()` // returns a Promise that resolves to an array with all the `Answer`s to that question, by querying the database.
* `getTop(num)` // returns a Promise that resolves to an array with the _num_ best `Answer`s, according to their score.

A new `QuestionList` object represents all the `Question`s, with the following methods operating on the database:

* `addQuestion(question)` // pass a fully-constructed `Question` object.
* `getQuestion(id)` // returns a Promise that resolves to a `Question` with the given id.
* `afterDate(date)` // returns a Promise that resolves to an array with all the `Question`s after the given date.

__Suggestion__: implement the methods in this order: `QuestionList.getQuestion`, `QuestionList.addQuestion`, `Question.getAnswers`, `Question.addAnswer`, `Question.getTop`, `QuestionList.afterDate`.
