# Exercise 7: Dynamic Q&A Webpage

_**Goal**: adding dynamic behaviors to the "HeapOverrun" answers page, using JavaScript and manipulating the DOM of the webpage developed last week._

## Loading the answers

Load the list of answers from a dedicated JavaScript array and display it in the table on the webpage. Use suitable DOM manipulation methods.

Each answer in JavaScript is represented by text, respondent email, score (negative or positive integer), and date. You can re-use the same data structure created for Exercise 3-4.

In addition, each answer has associated three buttons: one to increase the score of the specific answer, one to edit it, and one to delete the answer from the list displayed on the webpage. Be sure to include those buttons while building the list of answers to display.

## Changing the score

Implement the function to increase the score of a specific answer from the webpage list in JavaScript. To do so, you have to define an `EventListener` in a suitable place (in the code) for each "vote up" button.

Please, note that after reloading the page, all the answers will appear again with the original score (i.e., the change is not persistent).

## Delete an answer

Create a function to delete a specific answer. As before, define an `EventListener` in the code for each "delete" button, and keep in mind that this change won't be persistent.
