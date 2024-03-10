# Exercise 3: Q&A
_Goal: managing a simple data structure as an array of objects_.

Using JavaScript objects and functional programming methods, manage objects that contain information about a question and their answers.

Each answer will contain:
- Response (text)
- Respondent name
- Score (integer number, positive or negative)
- Date
- Id (number, uniquely representing the respondent)

Define a constructor function `Answer` to create one or more answers.

A question, instead, is made of:
- Question (text)
- Questioner name
- Date
- List of answers
- Id (number, uniquely representing the questioner)

Define a constructor function `Question` to represent a question. Implement the following methods to manipulate its answers: 

- `add(answer)` // pass a fully-constructed `Answer` object
- `find(id)` // returns all the Answers of a given person
- `afterDate(date)` // returns an array of Answers after the given date
- `listByDate()` // returns an array of Answers, sorted by increasing date
- `listByScore()` // idem, by decreasing score

Create an instance of `Question` with at least four `Answer`s in it.