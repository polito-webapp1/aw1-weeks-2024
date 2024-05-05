'use strict';

let sortingOrder = "asc";

function Question(id, text, email, date) {
    this.id =id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);
    this.answers = [];
  
    this.add = (answer) => {
      this.answers.push(answer);
    }

    this.getAnswers = () => {
        return [...this.answers];
    }

    this.init = () => {
        this.answers = [
            new Answer(1, 'Yes', 'luca.mannella@polito.it', '2024-02-28', -10),
            new Answer(2, 'Not in a million year', 'guido.vanrossum@python.org', '2024-03-01', 5),
            new Answer(3, 'No', 'albert.einstein@relativity.org', '2024-03-11'),
            new Answer(4, 'Then, I don\'t know', 'luca.mannella@polito.it', '2024-03-10')
        ];
    }
}

function Answer(id, text, email, date, score=0) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.score = score;
    this.date = dayjs(date);
  
    this.toString = () => {
      return `${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

/*
 * STRING LITERAL WAY
 * Write directly the HTML inside a string.
 */
function createAnswerRowLiteral(answer) {
    return `<tr id="answer-${answer.id}">
        <td>${answer.date.format("MMMM DD, YYYY")}</td>
        <td>${answer.text}</td>
        <td>${answer.email}</td>
        <td>${answer.score}</td>
        <td>
            <button class="btn btn-warning"><i class='bi bi-arrow-up'></i></button>
            <button class="btn btn-primary"><i class='bi bi-pencil-square mx-1'></i></button>
            <button class="btn btn-danger"><i class='bi bi-trash'></i></button>
        </td>
    </tr>
    `
}

/*
 * CLASSIC WAY
 * Creating every element using DOM methods.
 */
function createAnswerRow(answer) {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `answer-${answer.id}`);

    const tdDate = document.createElement('td');
    tdDate.innerText = answer.date.format("YYYY-MM-DD");
    tr.appendChild(tdDate);

    const tdText = document.createElement('td');
    tdText.innerText = answer.text;
    tr.appendChild(tdText);

    const tdAuthor = document.createElement('td');
    tdAuthor.innerText = answer.email;
    tr.appendChild(tdAuthor);

    const tdScore = document.createElement('td');
    tdScore.innerText = answer.score;
    tr.appendChild(tdScore);

    const tdActions = document.createElement('td');
        const buttonVote = document.createElement('button');
        buttonVote.classList.add('btn', 'btn-warning');
        buttonVote.innerHTML = "<i class='bi bi-arrow-up'></i>"
        tdActions.appendChild(buttonVote);

        buttonVote.addEventListener('click', event => {
            console.log(event.target.parentElement.parentElement);  // note that it changes if you click on the drawing or outside of it
            console.log(event.currentTarget.parentElement.parentElement.id);  // with currentTarget it always gets the button
            tdScore.innerText = Number(tdScore.innerText) + 1;
            answer.score = answer.score +1;
        })

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('btn', 'btn-primary', 'mx-1');
        buttonEdit.innerHTML = "<i class='bi bi-pencil-square'></i>"
        tdActions.appendChild(buttonEdit);

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger');
        buttonDelete.innerHTML = "<i class='bi bi-trash'></i>"
        tdActions.appendChild(buttonDelete);

        buttonDelete.addEventListener('click', event => {
            console.log(event.currentTarget.parentElement.parentElement.id);
            tr.remove();
        })
    tr.appendChild(tdActions);

    return tr;
}

function fillAnswersTable(answers) {
    const answerTable = document.getElementById('answers-table');
    // const answersTable = document.querySelector('#answers-table');  // <-- alternative

    /*
     * After adding sorting operation, is necessary to clean the table before inserting ordered answers.
     * This piece of code is useless when the application is started for the first time.
     */

    /* Very simple approach used during lecture to clean the table; remove all the HTML content. It deletes also the row dedicated to inserting a new answer. */
    // answerTable.innerHTML = "";

    /* Cleaning the table; inserting only the "new-answer-row" */
    answerTable.innerHTML = `<tr id="new-answer-row">
        <td><input class="form-control" type="date"></td>
        <td><input class="form-control" type="text"></td>
        <td><input class="form-control" type="text"></td>
        <td><input class="form-control" type="text" size="3"></td>
        <td><button class="btn btn-success">Add</button></td>
    </tr>
    `

    for(const answer of answers) {
        const trAnswer = createAnswerRow(answer);
        answerTable.prepend(trAnswer);

        /*
         * Alternative: using string literal.
         * Note: with this approach event listeners are not enabled!
         */
        // const trAnswer = createAnswerRowLiteral(answer);
        // answerTable.insertAdjacentHTML('afterbegin', trAnswer);
    }
}

function addSortListener(answers) {
    const sortScoreIcon = document.getElementById('sort-score');
    sortScoreIcon.addEventListener('click', event => {
        const sortedAnswers = [...answers];
        if(sortingOrder === "asc") {
            sortedAnswers.sort((a,b) => a.score - b.score);  // ordering
            sortingOrder = "desc";                           // changing next sort value
            // updating icon
            sortScoreIcon.classList.remove("bi-sort-numeric-down-alt");
            sortScoreIcon.classList.add("bi-sort-numeric-up");
        }
        else {
            sortedAnswers.sort((a,b) => b.score - a.score);  // ordering
            sortingOrder = "asc";                            // changing next sort value
            // updating icon
            sortScoreIcon.classList.remove("bi-sort-numeric-up");
            sortScoreIcon.classList.add("bi-sort-numeric-down-alt");
        }
        console.log(sortedAnswers);
        fillAnswersTable(sortedAnswers);
    })
}

function main() {
    const question = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');
    question.init();
    const answers = question.getAnswers();
    //console.log(answers);  --> printing answers before start working on them
    fillAnswersTable(answers);
    addSortListener(answers);
}

main();
