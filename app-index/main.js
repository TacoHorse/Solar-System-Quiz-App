`use strict`

function serveQuiz() {
    renderCurrentFormState();
}

function renderCurrentFormState() {
    $('.js-quiz-control-buttons').on('click', '.js-quiz-next-button', e => {
        if ($('.js-quiz-next-button').attr('value') === 'Start Quiz') {
            $('.js-quiz-next-button').attr('value', 'Next Question');
        }
        if($('input:radio:checked').length > 0){
        let restart = false;
        let answer = validateUserAnswer(STORE.currentPlanet, STORE.questionNumber);
        let position = handleUserPosition(restart);
        let score = handleUserScore(answer);
        renderPlanetProfile();
        renderUserInformation(position, score);
        renderQuestion(STORE.currentPlanet);
        renderOptions(STORE.currentPlanet);
        }
        else{
            alert('Please select an answer');
         }
    });
}

function renderPreQuestionState () {
    
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
        for (let i=0; i <= 2; i++) { // loop through array until
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
    if (STORE.questionNumber === 1) {
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
function  handleUserPosition(hasRestarted) {
       if (hasRestarted === true) {
           STORE.questionNumber = 0;
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

/* Is passed the current planet
    returns a completed DOM element containing the options for the current question*/
function renderOptions(planet) {
        const currentQuestion = STORE.questionNumber; // get current question number
        const position = planetToNumber(planet); // convert planet to array position number
        const length = STORE.planets[position][planet].length; // count length of planet array
        let options = '';
        let testId = '';
        let output = '<span class="multiple-choice js-multiple-choice" role="question choices">';
        for (let i = 0; i < length; i++) { // for each element in the planets specific array
            testId = STORE.planets[position][planet][i].id; // check the id property
            if (typeof(testId) != 'undefined') { 
                // one part of the planet array does not contain question information, catch to remove
                if (testId === currentQuestion) { // if id property is equal to currentQuestion
                options = STORE.planets[position][planet][i].options; // set question options
                }
            }
        }
        for (let i = 0; i <= 3; i++) { // loop through the options array
            output += `<label for="user-answer-${i}" class="radio-labels">
                        <input type="radio" name="user-answers" id="user-answer-${i}" class="user-answer-${i}">
                        ${options[i]}</label>`; // create the apprporiate DOM elements for that option
        }
        output += '</span>';
        $('.js-multiple-choice').replaceWith(output); //temporary
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
            if (typeof(testId) != 'undefined') { 
                // one part of the planet array does not contain question information, catch to remove
                if (testId === currentQuestion) { // if id property is equal to currentQuestion
                question = STORE.planets[position][planet][i].question; // set question
                }
            }
        }
        output = `<section class="quiz-questions-answers js-quiz-questions-answers">${question}</section>`; // build apprporiate DOM elements
        $('.js-quiz-questions-answers').replaceWith(output); //temporary
}

// Pass completed strings from handleUserScore and handleUserPosition 
function renderUserInformation(position, score) {
    let output = `<section class="quiz-progress js-quiz-progress">
                    <span class="question-number js-question-number">${position}</span>
                    <span class="question-grading js-question-grading">${score}</span>
                    </section>`;
    $('.js-quiz-progress').replaceWith(output);
}

// Renders a factoid for the current question
function renderFactoid (planet) {
    const currentQuestion = STORE.questionNumber; // get current question number
    const position = planetToNumber(planet); // convert planet to array position number
    const length = STORE.planets[position][planet].length; // count length of planet array
    let factoid = '';

    for (let i = 0; i < length; i++) { // for each element in the planets specific array
        testId = STORE.planets[position][planet][i].id; // check the id property
        if (typeof(testId) != 'undefined') { 
            // one part of the planet array does not contain question information, catch to remove
            if (testId === currentQuestion) { // if id property is equal to currentQuestion
            factoid = STORE.planets[position][planet][i].factoid; // set question
            }
        }
    }
    let output = `<section class="quiz-questions-answers js-quiz-questions-answers">${factoid}</section>`
    $('.js-quiz-questions-answers').replaceWith(output);
}

// Renders the planet profile shown at the top of the page
function renderPlanetProfile () {
    if (STORE.questionNumber === 0) {
        let output = `<h1>Solar System Quiz</h1>
        <p>Journey through the Solar System with this short quiz and learn some cool facts along the way.</p>`;
        $('.js-quiz-intro-planet-profile').append(output);
    }
    else {
        for (let i = 0; i < STORE.planets.length; i++) {
            let planet = Object.keys(STORE.planets[i]).toString();
            for (let j = 0; j < STORE.planets[i][planet].length; j++) {
                let id = STORE.planets[i][planet][j].id;
                if (typeof(id) != 'undefined') { 
                    if (id === STORE.questionNumber) {
                        STORE.currentPlanet = planet;
                        let output = `<h1>${planet}</h1>
                        <p>
                        <span class="planet-circumference js-planet-circumference">Circumference: ${STORE.planets[i][planet][2].facts[0].circumference} </span><br />
                        <span class="planet-circumference js-planet-circumference">Distance from Sun (light minutes): ${STORE.planets[i][planet][2].facts[1].distance} </span><br />
                        <span class="planet-circumference js-planet-circumference">Planet Type: ${STORE.planets[i][planet][2].facts[2].type} </span><br />
                        <span class="planet-circumference js-planet-circumference">Daytime Temperature: ${STORE.planets[i][planet][2].facts[3].temp}</span>
                        </p>`;
                        $('.js-quiz-intro-planet-profile').empty();
                         $('.js-quiz-intro-planet-profile').append(output);
                    }
                }
            }
        }
    }
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

$(serveQuiz);