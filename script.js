// const { lavenderblush } = require("color-name");

//build myQuestions, an array of question objects containing a question, choices, an answer

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];




function buildQuiz(){

    //create a variable to store the html output representing the quiz
    const output = [];

    //now we need to use JS to interpret our array and generate html code to display
    myQuestions.forEach((currentQuestion, questionNumber)=> {

        //an array containing our list of answers choices is needed to store
        const answers = [];

        for(choice in currentQuestion.answers){

            //code each choice as an input selector displaying '(a,b,c,d): answer'
            answers.push(
                `<label>
                <input type="radio" name="question${questionNumber}" value="${choice}">
                    ${choice} :
                    ${currentQuestion.answers[choice]}
                </label>`

            );


        }
        // add this question and all of its answer choices joined together to the output
        output.push(
            //question and answer 'containers'
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>
        <br>
        `
        );

    });


    quizContainer.innerHTML = output.join(" ");

};

function showResults(){

    //get all questions and returns them as a node list
    const answerContainers = quizContainer.querySelectorAll('.answers');

     // keep track of user's answers
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber)=>{

        //
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;


       // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length}`;

};



//display the quiz right away
buildQuiz();

//when quiz is submitted, show the results
submitButton.addEventListener('click', showResults);
