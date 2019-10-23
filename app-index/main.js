`use strict`

// Primary function call to serve the quiz to the user
// Performs preliminary checks on the current state of the form and executes
// Behavior as necessary
function serveQuiz() {

    $('.js-quiz-control-buttons').on('click', '.js-quiz-next-button', e => { // If the user hits the 'next' button'

        handleNextButton();

    });

    $('.js-quiz-control-buttons').on('click', '.js-quiz-restart-button', e => { // if the user hits restart quiz

        handleRestartButton();

    });
}

// Handles form behavior for when the next button is clicked 
function handleNextButton() {
    if (STORE.questionNumber >= 16) {
        renderSummary();
    } else {
        STORE.restart = false; // User is not restarting
        STORE.answer = validateUserAnswer(STORE.currentPlanet, STORE.questionNumber); // Check the user's answer
        let boolState = handleFormState(); // Find out the state of the form (has the user seen a factoid or not?)

        if ($('input:radio:checked').length > 0) { // If the user has entered an answer
            if (boolState === true) { // if form is in factoid state
                handleFactoidState(); // generate factoid for the current planet + question
                handleAnswerHighlight(STORE.answer); // Highlight the user's choice as incorrect or correct to inform them visually
            }
            if (boolState === false) { // if form is not in factoid state
                handleQuestion(); // generate the next planet + question
            }
        } else // If the user has not entered an answer
            alert('Please select an answer');
    }
}

// Handles form behavior for when the restart button is clicked
function handleRestartButton() {
    STORE.restart = true; // User is restarting
    $('.js-quiz-restart-button').prop('disabled', true); // Disable restart button
    renderDefaultPage();
    STORE.restart = false;
}

// Display the factoid for the current question in STORE.questionNumber
function handleFactoidState() {
    $('.js-quiz-next-button').attr('value', 'Next Question'); // Sets the value of the next button to 'next question'
    $('.js-quiz-next-button').attr('aria-label', 'Proceed to next question'); // Sets the value of the aria label for the button
    renderFactoid(STORE.currentPlanet); // Render the factoid for the current planet
    $('.js-quiz-form').data('form-state', 'asking'); // Set form state to asking
}

// Creates a boolean value for the state of the form where
// true = factoid state, false = asking state
function handleFormState() {
    let formState = $('.js-quiz-form').data('form-state');
    if (formState === 'factoid') {
        return true;
    }
    else return false;
}

/*Check the user's input answer against the correct answer
    Passed 'planet' and 'id' where;
    planet is the planet name currently in the DOM
    id is the question number n of 16 currently in the DOM */
function validateUserAnswer(planet, id) {
    const position = planetToNumber(planet); // find planet position in array
    const userAnswer = $("input[name=user-answers]:checked").parent('label').text().trim(); // find what answer the user picked
    let correctAnswer = ''; // placeholder for correct answer
    if (STORE.questionNumber === 0) {
        return true;
    }
    else {
        for (let i = 0; i <= 2; i++) { // loop through array until question is found
            currId = STORE.planets[position][planet][i].id; // current id to look at
            if (currId === id) { // if it matches passed id
                correctAnswer = STORE.planets[position][planet][i].correct; // set correct answer
            }
        }

        if (userAnswer === correctAnswer) { // if user answer is right return true, if it is not return false
            return true;
        }
        else
            return false;
    }

}

// Increment user score and return updated string
function handleUserScore(isCorrect) {
    if (STORE.questionNumber === 0) {
        STORE.scoreCorrect = 0;
        STORE.scoreIncorrect = 0;
        return `Correct: ${STORE.scoreCorrect} Incorrect: ${STORE.scoreIncorrect}`;
    }
    else {
        if (isCorrect === true) {
            STORE.scoreCorrect++;
            return `Correct: ${STORE.scoreCorrect} Incorrect: ${STORE.scoreIncorrect}`;
        }
        else if (isCorrect === false) {
            STORE.scoreIncorrect++;
            return `Correct: ${STORE.scoreCorrect} Incorrect: ${STORE.scoreIncorrect}`;
        }
        else { // Catch to make sure only boolean is being passed
            console.log('Oops it looks like you passed a non-boolean value.  Pass boolean only');
        }
    }
}

// Increment or reset user position based on value of hasRestarted, return updated string
function handleUserPosition(hasRestarted) {
    if (hasRestarted === true) {
        STORE.questionNumber = 0;
        STORE.currentPlanet = 'not-started';
        return `Question: ${STORE.questionNumber}/16`;
    }
    else if (hasRestarted === false) {
        STORE.questionNumber++;
        return `Question: ${STORE.questionNumber}/16`;
    }
    else { // Catch to make sure only boolean is being passed
        console.log('Oops it looks like you passed a non-boolean value.  Pass boolean only');
    }
}
// Handles the question form state
function handleQuestion() {
    $('.js-quiz-next-button').attr('value', 'Check Answer'); // Sets the value of the next button to 'check answer'
    $('.js-quiz-next-button').attr('aria-label', 'Check Answer'); // Set the aria label for the button
    $('.js-quiz-restart-button').prop('disabled', false); // Makes sure the Restart button is enabled
    let position = handleUserPosition(STORE.restart); // Increment user position 
    let score = handleUserScore(STORE.answer); // Increment user score
    $('.js-quiz-form').data('form-state', 'factoid'); // Set form state to factoid
    renderPlanetProfile(); // Generate the planet profile
    renderUserInformation(position, score); // Display the new user score information
    renderQuestion(STORE.currentPlanet); // Display the next question
    renderOptions(STORE.currentPlanet); // Display the options for that question
}
/* Is passed the current planet
    returns a completed DOM element containing the options for the current question*/
function renderOptions(planet) {
    const currentQuestion = STORE.questionNumber; // get current question number
    const position = planetToNumber(planet); // convert planet to array position number
    const length = STORE.planets[position][planet].length; // count length of planet array
    let options = '';
    let testId = '';
    let output = '<span class="multiple-choice js-multiple-choice">';
    for (let i = 0; i < length; i++) { // for each element in the planets specific array
        testId = STORE.planets[position][planet][i].id; // check the id property
        if (typeof (testId) != 'undefined') {
            // one part of the planet array does not contain question information, catch to remove
            if (testId === currentQuestion) { // if id property is equal to currentQuestion
                options = STORE.planets[position][planet][i].options; // set question options
            }
        }
    }
    for (let i = 0; i <= 3; i++) { // loop through the options array
        output += `<label for="user-answer-${i}" class="radio-labels">
                            <input type="radio" name="user-answers" id="user-answer-${i}" class="user-answers js-user-answers">${options[i]}</label>`; // create the apprporiate DOM elements for that option
    }
    output += '</span>';
    $('.js-multiple-choice').replaceWith(output);
}

// Pass current planet to render current question
function renderQuestion(planet) {
    const currentQuestion = STORE.questionNumber; // get current question number
    const position = planetToNumber(planet); // convert planet to array position number
    const length = STORE.planets[position][planet].length; // count length of planet array
    let question = '';
    let testId = '';
    let output = '';
    for (let i = 0; i < length; i++) { // for each element in the planets specific array
        testId = STORE.planets[position][planet][i].id; // check the id property
        if (typeof (testId) != 'undefined') {
            // one part of the planet array does not contain question information, catch to remove
            if (testId === currentQuestion) { // if id property is equal to currentQuestion
                question = STORE.planets[position][planet][i].question; // set question
            }
        }
    }
    output = `<section aria-label="Question: ${question}" class="quiz-questions-answers js-quiz-questions-answers">${question}</section>`; // build apprporiate DOM elements
    $('.js-quiz-questions-answers').replaceWith(output);
}

// Pass completed strings from handleUserScore and handleUserPosition 
function renderUserInformation(position, score) {
    let output = `<section aria-label="User progress" class="quiz-progress js-quiz-progress">
                    <span aria-label="Current Question: ${position}" class="question-number js-question-number">${position}</span>
                    <span aria-label="${score}" class="question-grading js-question-grading">${score}</span>
                    </section>`;
    $('.js-quiz-progress').replaceWith(output);
}

// Pass the current planet to render a factoid for the current question
function renderFactoid(planet) {
    const currentQuestion = STORE.questionNumber; // get current question number
    const position = planetToNumber(planet); // convert planet to array position number
    const length = STORE.planets[position][planet].length; // count length of planet array
    let factoid = '';

    for (let i = 0; i < length; i++) { // for each element in the planets specific array
        testId = STORE.planets[position][planet][i].id; // check the id property
        if (typeof (testId) != 'undefined') {
            // one part of the planet array does not contain question information, catch to remove
            if (testId === currentQuestion) { // if id property is equal to currentQuestion
                factoid = STORE.planets[position][planet][i].factoid; // set question
            }
        }
    }
    let output = `<section aria-label="Information on correct answer: ${factoid}"class="quiz-questions-answers js-quiz-questions-answers">${factoid}</section>`
    $('.js-quiz-questions-answers').replaceWith(output);
}

// Renders the planet profile shown at the top of the page, sets new current planet in STORE
function renderPlanetProfile() {
    if (STORE.questionNumber === 0) {
        let output = `<h1 role="heading" aria-label="Welcome to the Solar System Quiz">Solar System Quiz</h1>
        <p class="planet-profile js-planet-profile">Journey through the Solar System with this short quiz and learn some cool facts along the way.</p>`;
        $('.js-quiz-intro-planet-profile').append(output);
    }
    else {
        for (let i = 0; i < STORE.planets.length; i++) {
            let planet = Object.keys(STORE.planets[i]).toString();
            for (let j = 0; j < STORE.planets[i][planet].length; j++) {
                let id = STORE.planets[i][planet][j].id;
                if (typeof (id) != 'undefined') {
                    if (id === STORE.questionNumber) {
                        STORE.currentPlanet = planet;
                        let output = `<img class="planet-picture js-planet-picture" src="images/${planet}.jpg" alt="Image , picture of ${planet}">
                        <section><h1 role="heading" aria-label="Profile of the planet ${planet}">${planet}</h1>
                        <p class="planet-profile js-planet-profile">
                        <span class="planet-circumference js-planet-circumference"><strong>Circumference:</strong> ${STORE.planets[i][planet][2].facts[0].circumference} </span><br />
                        <span class="planet-distance js-planet-distance"><strong>Distance from Sun (light minutes):</strong> ${STORE.planets[i][planet][2].facts[1].distance} </span><br />
                        <span class="planet-type js-planet-type"><strong>Planet Type:</strong> ${STORE.planets[i][planet][2].facts[2].type} </span><br />
                        <span class="planet-temp js-planet-temp"><strong>Daytime Temperature:</strong> ${STORE.planets[i][planet][2].facts[3].temp}</span>
                        </p></section>`;
                        $('.js-quiz-intro-planet-profile').empty();
                        $('.js-quiz-intro-planet-profile').append(output);
                    }
                }
            }
        }
    }
}

// Renders the summary of the current quiz session
function renderSummary() {
    const percentCorrect = STORE.scoreCorrect / 16;
    const percentIncorrect = STORE.scoreIncorrect / 16;
    const quizHeader = `<h1 role="heading" aria-label="Your results">Quiz Results</h1>`;
    const quizDoneMessage = `<section class="quiz-questions-answers js-quiz-questions-answers">You have reached the end of the quiz! Below you can find a summary of your quiz results</section>`;
    const summaryDetails = `<span class="quiz-results js-quiz-results"><p>Questions Correct: ${STORE.scoreCorrect} / ${percentCorrect * 100}%</p><p>Questions Incorrect: ${STORE.scoreIncorrect} / ${percentIncorrect * 100}%</p><span role="quiz-control-buttons" class="quiz-results-buttons js-quiz-results-buttons">
    <input type="button" role="button" aria-label="Retake the quiz" name="stop-start-restart-button" id="stop-start-restart-button" class="quiz-buttons js-quiz-buttons js-quiz-restart-button" value="Take Again">
</span></span>`;

    $('.js-quiz-progress').empty();
    $('.js-quiz-intro-planet-profile').empty();
    $('.js-quiz-control-buttons').empty();
    $('.js-quiz-questions-answer').empty();
    $('.js-quiz-intro-planet-profile').append(quizHeader);
    $('.js-quiz-questions-answers').replaceWith(quizDoneMessage);
    $('.js-multiple-choice').replaceWith(summaryDetails);

}

// Render the default page for restart
function renderDefaultPage() {
    const quizOptions = `<span class="multiple-choice js-multiple-choice">
    <label for="user-answer-0" class="radio-labels">
        <input type="radio" name="user-answers" id="user-answer-0" class="user-answers js-user-answers">A</label>
    <label for="user-answer-1" class="radio-labels">
        <input type="radio" name="user-answers" id="user-answer-1" class="user-answers js-user-answers">B</label>
    <label for="user-answer-2" class="radio-labels">
        <input type="radio" name="user-answers" id="user-answer-2" class="user-answers js-user-answers">C</label>
    <label for="user-answer-3" class="radio-labels">
        <input type="radio" name="user-answers" id="user-answer-3" class="user-answers js-user-answers">D</label>
    </span>`;
    const quizHeader = `<img class="planet-picture js-planet-picture" src="images/solarsys2.png" alt="Image , Diagram of the Solar System">
    <section>
    <h1 role="heading" aria-label="Welcome to the Solar System Quiz">Solar System Quiz</h1>
    <p class="planet-profile js-planet-profile">Journey through the Solar System with this short quiz and learn some cool facts along the way.</p>
    </section>`;
    const quizIntro = `<section class="quiz-questions-answers js-quiz-questions-answers">The Quiz consists of 16 questions, two for each planet, and will be presented in planetary order.  You cannot repeat questions but you also cannot fail.  Select any radial button below and press Start to begin!</section>`;

    let position = handleUserPosition(STORE.restart); // Reset user position
    let score = handleUserScore(true);
    $('.js-quiz-intro-planet-profile').empty();
    $('.js-quiz-intro-planet-profile').append(quizHeader);
    $('.js-multiple-choice').replaceWith(quizOptions);
    $('.js-quiz-questions-answers').replaceWith(quizIntro);
    $('.js-quiz-form').data('form-state', 'asking'); // Set form state to asking
    renderUserInformation(position, score);

}

// Takes a planet name as an input and returns its (array position) number
function planetToNumber(planet) {
    let planetNum = 0;
    switch (planet) {
        case 'mercury':
            planetNum = 0;
            break;
        case 'venus':
            planetNum = 1;
            break;
        case 'earth':
            planetNum = 2;
            break;
        case 'mars':
            planetNum = 3;
            break;
        case 'jupiter':
            planetNum = 4;
            break;
        case 'saturn':
            planetNum = 5;
            break;
        case 'uranus':
            planetNum = 6;
            break;
        case 'neptune':
            planetNum = 7;
            break;
    }
    return planetNum;
}

// Highlights correct answers when user is told factoid
function switchCorrectAnswer() {
    $("input[name=user-answers]:checked").parent('label').addClass('correct');
    $('.js-multiple-choice').addClass('correct-box');
}

// Highlights incorrect answers when users is told factoid, also highlights correct answer
function switchIncorrectAnswer() {
    const id = STORE.questionNumber;
    const planet = STORE.currentPlanet;
    const position = planetToNumber(planet);
    let correctAnswer = '';

    for (let i = 0; i <= 2; i++) { // loop through array until question is found
        currId = STORE.planets[position][planet][i].id; // current id to look at
        if (currId === id) { // if it matches passed id
            correctAnswer = STORE.planets[position][planet][i].correct; // set correct answer
        }
    }

    $(`label:contains('${correctAnswer}')`).addClass('correct');
    $("input[name=user-answers]:checked").parent('label').addClass('incorrect');
    $('.js-multiple-choice').addClass('incorrect-box');
}

function handleAnswerHighlight(userAnswer) {
    if (userAnswer === true) {
        switchCorrectAnswer();
    }
    if (userAnswer === false) {
        switchIncorrectAnswer();
    }
}

$(serveQuiz);