# Exercise 15: Now, with authentication

_Goal: Add authentication to the "HeapOverrun" React Client._

Starting from the React application and the API Server in Express developed in Exercise 14, add an authentication layer in the server and apply the needed changes in the React application. Only the _login_ mechanism is required. We will **not** cover the registration phase (i.e., signup).

In particular, on the server:
- Install `passport`.
- Configure it to use sessions and the username/password strategy for login.
- For hashing the password (to store it in the database), use `scrypt` as shown during the lecture.
- Create a login and a logout route (e.g., `POST /api/sessions` for login).
- Protect any suitable route so only logged-in and authorized users can call those APIs. In particular, only logged-in user can vote the answers.

Instead, on the React client:
- Prepare a login form using controlled input components.
- Handle the login form submission to call the login API on the server.
- Welcome the newly logged-in user on the application's homepage (e.g., with an alert saying "Welcome, <name>!")
- Update the other API calls for passing the session cookie via CORS.
- Verify that the entire application is still working as expected.

An updated SQLite database, with a some new columns in the `user` table, is available on the GitHub repository. The password for all the users is: `testtest`.