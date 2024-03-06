# Exercise 1: Better Scores
_Goal: basic handling of JavaScript arrays_

Develop a small JavaScript program to manage the scores given to your user in a question-and-answer website (e.g., StackOverflow). Scores are integer numbers, and they may be negative. You should:
 
- Define an array with all the scores you received in chronological order. For the moment:
  - Embed the scores directly in the source code.
  - Ignore the question, answer, and date that generated the score.
- Duplicate the array, but:
  - Eliminate all negative scores (call `NN` the number of negative scores that are deleted).
  - Eliminate the two lowest-ranking scores.
  - Add `NN+2` new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
- Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.

# Exercise 2: My Users' List
_Goal: basic handling of JavaScript strings_

Develop a small JS program to manage the list of users in a Q&A website.

- Define the names of users as a comma-separated list.
  - For instance: "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla"
- Parse the string and create an array containing one name per array position.
  - Beware: no extra spaces should be present.
- Create a second array by computing the acronyms of the people as the initial letters of the name. Acronyms should be in all-capital letters.
  - For example, Luigi De Russis -> LDR.
- Print the resulting list of acronyms and the full names.
  - Extra: in alphabetical order of acronym.