<<<<<<< HEAD
const Stack = require('./stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();



var currentPage = 'url';
// ------------------------------
// Helper Functions
// ------------------------------
showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log(`<< Previous page = ${backPages.peek()}`);
  console.log(`>> Next page = ${nextPages.peek()}`);
}

newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  //clear the nextpages stack
  while(!nextPages.isEmpty()){
    nextPages.pop();
  }
  showCurrentPage(`New page: ${page}`);
  //in this example, our script is the webpage, so on our webpage we can show current page with this.showCurrentPage method
}

backPage = () => {
  //when we navigate backwards, our old webpage is a next page 
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("BACK: ");
}

nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("NEXT: ");
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url: \n';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
var finish = false;
var showBack = false;
var showNext = false;

showCurrentPage('DEFAULT: ');

while(finish === false){
  let instructions = baseInfo;
  if(!backPages.isEmpty()){
    instructions = instructions.concat(`${backInfo} ... `);
    showBack = true;
  }else{
    showBack = false;
  }

  if(nextPages.peek()!=null){
    instructions = instructions.concat(` ${nextInfo} ... `);
    showNext = true;
  }else{
    showNext = false;
  }

  instructions = instructions.concat(`${quitInfo}.`);

  console.log(instructions);


  // ------------------------------
  // User Interface Part 2
  // ------------------------------

  const answer = prompt(question);
  lowerCaseAnswer = answer.toLowerCase();

  

  //remember we want to navigate to the original 
  if(lowerCaseAnswer !== 'n' && lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'q'){
    newPage(answer);
  }else if(lowerCaseAnswer === 'n' && showNext){
    nextPage();
  }else if(lowerCaseAnswer === 'b' && showBack){
    backPage();
  }else if(lowerCaseAnswer === 'n'){
    console.log('Cannot go to next page')
  }else if(lowerCaseAnswer === 'b'){
    console.log('Cannot go back')
  }else if(lowerCaseAnswer == 'q'){
    finish = true; 
  }
  
}

=======
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
>>>>>>> 5024e9419d65935e6bc5c02dc26c9bb987f1932d
