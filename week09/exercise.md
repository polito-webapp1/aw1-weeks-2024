# Exercise 10: Forms and state

_Goal: Managing forms and related states in the "HeapOverrun" React app developed last week._

## Add a new answer (II part)

Starting from the form defined in the previous exercise, handle the insertion of a new answer in the table. Use the defined state to perform this operation.

## To use state or not to use state

Make the entire form appear and disappear through a suitable button at the end of the table. Do you need a new state?

Now, sort the table content by clicking on the "Score" header. For simplicity, a first click will sort the table from the lowest value to the highest and a second click from the highest to the lowest. Do you need a new state?

## Edit an answer

Make the "edit" button available for each answer row work. When pressed, re-use the form on the question page to edit the chosen answer. Handle the state update accordingly.

What happens when you edit two answers, one after the other, without submitting the form? Why? How can you solve the issue?

## Delete an answer (optional)

By clicking on the "delete" button associated with an answer, the answer should be deleted from the table (and the state).
