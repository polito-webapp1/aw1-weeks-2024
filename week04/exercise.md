# Exercise 5: Q&A API Server

_Goal: Building an API Server for a Q&A application._

Design and implement and HTTP API server in Express for a Q&A example application, called "HeapOverrun". Starting from the template project `qa-server` available in the Week 04 folder:

- Define a set of HTTP APIs for each of the needed operations on Questions and Answers, in the `README.md` document.
    - Operations may be list, create, add, modify, ...
    - For each API, define the HTTP method, the URL (with parameters), the Request Body (if any), the Response Body (if any), the status code(s) in case of success or failure (with the corresponding error body).
- Review the SQLite database developed last week (Week 03), in Exercise 4, and the related code. If any SQL query is still missing in the code, complete it.
- Implement an HTTP server using Express, containing the HTTP Routes for the defined APIs, and executing the proper SQL queries on the database.
    - Remember the server-side validation of input values, and ensure database integrity.

Note: the API **Design** phase does not have a single solution, there are many options to explore, with their pros and cons. We will discuss some of them in class.
