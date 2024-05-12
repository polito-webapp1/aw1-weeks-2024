# Exercise 11: Adding multiple pages

_Goal: Managing routes in the "HeapOverrun" React app developed last week._

Starting from the app developed last week, incorporate React Router to enable multiple pages within the application.

Realize four different pages:

  1. **All the questions** in a list (`index`). _Clicking on one of them will bring you to the page described at point 2_.
  2. **Single question and its answers**, i.e., the current content of the application.
    - Clicking an "add" button will open the page to add a new answer.
    - The "edit" button will bring to the same page but in editing mode.
  3. Add/edit an answer, i.e., the form already in the app. _Submitting the form will bring you to the page described at point 3_.
  4. Properly **handle wrong URLs** by providing a _404 Not Found page_.

## Extra: managing different questions

Implements a route where the user can find all the asked questions.
Restructure the application in a proper way to manage this change.
