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

