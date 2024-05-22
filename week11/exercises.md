# Exercise 12: Fetching from a simple JS client

_Goal: Create a simple (i.e., non React) client to consume one of the "HeapOverrun" API_.

Create a `simple-application` project using HTML, plain JavaScript, and `fetch` to get the list of all questions from the API Server in Express developed in Week 04. Set up CORS accordingly on the server.


# Exercise 13: React meets Express - part I

_Goal: Start connecting the "HeapOverrun" React Client and the API Server._

Starting from the React application developed in Week 10 and the API Server in Express developed in Week 04, make the React application consume some of the APIs to get the content.

In particular, replace the "fake" questions and answers with the information obtained through the server. To do so, set up CORS appropriately in Express, call the appropriate APIs from React (see the empty `API.js` file in `react-qa`), and set up `useEffect()` as needed.

For this week, we want to call the APIs to *get* the list of questions and the associated answers for each of them. Ignore the creation, editing, or deletion of questions and answers.