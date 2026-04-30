// -------------------- IMPORTS -------------------- 
import {logQuestion, questionsObjArr} from './questions.js';
// -------------------- DOM VARIABLES -------------------- 
const gridItems = document.getElementsByClassName('grid-item');
const confirmChoiceBtn = document.getElementById('confirmChoicebtn');
const confirmAnsBtn = document.getElementById('confirmAnsBtn');
const choicesArea = document.getElementById('choices');
const questionsArea = document.getElementById('question');
const questionText = document.getElementById('qText');
const answerOptions = document.querySelectorAll('.aText');
const qBoxes = document.querySelectorAll('.grid-item')
const nextQuesBtn = document.getElementById('nextQuesBtn');
// -------------------- VARIABLES -------------------- 
let score = 0; //stores user score
let clickedOption = ''; //option (out of the possible answers) clicked by the user
let clickedBox = ''; //question box clicked by user
let currentQuestionIndex //Will hold the index of the selected grid item
let questionList = []; //Will hold a randomly generated set of questions corresponding to the number of grid items
// -------------------- FUNCTIONS -------------------- 

//Generates random list of questions
const generateQuestionList = (arr, qArr) => {

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(i === 0){
                qArr.push(arr[Math.floor(Math.random()*26)])
            }
            else if(i === 1){
                qArr.push(arr[Math.floor(Math.random()*38) + 26])
            }
            else if(i === 2){
                qArr.push(arr[Math.floor(Math.random()*35) + 64])
            }
        }
    }
}
//calls function to generate random list with object array and empty array as parameters
generateQuestionList(questionsObjArr, questionList)
console.log(questionList)

//Randomises the possible answers of a question and puts them in an array
const shuffle = qObj => {
    let shuffledAnsArr = [...qObj.allAns]

    for(let i=0; i<shuffledAnsArr.length; i++){
        let temp = shuffledAnsArr[i]; //grab current item
        let randomIndex = Math.floor(Math.random()* shuffledAnsArr.length);  //generate random number
        shuffledAnsArr[i] = shuffledAnsArr[randomIndex] //switch current item with random item
        shuffledAnsArr[randomIndex] = temp //switches temporarily held value for random index value
    }
    return shuffledAnsArr;
}

// -------------------- MAIN PROGRAM -------------------- 

// Adds an event listener to each grid item and stores respective ids in a variable to later be used as indices
const handleGridClick = e =>{
       currentQuestionIndex = parseInt(e.target.id)-1;
       console.log(`${currentQuestionIndex} clicked`)
    }

for(const item of gridItems){
    item.addEventListener('click', handleGridClick)
}
//Event listener for confirm button in choices section
confirmChoiceBtn.addEventListener('click', () => {
    //checks if a question box is selected
    console.log(currentQuestionIndex)
    if(currentQuestionIndex || currentQuestionIndex === 0){ 
        let currentQuesObj = questionList[currentQuestionIndex]; //variable to store current question object using question box id as an index
        questionText.innerHTML = currentQuesObj.question;

        let ansArr = shuffle(currentQuesObj); //shuffles potential answers

        //loops through node list of answers (p tags)
        answerOptions.forEach((option, index) => {
            option.textContent = ansArr[index] //assigns answer text (from object) to p tag 

            option.addEventListener('click', () => {
                clickedOption = option.textContent; //stores text of selected answer to compare against correct answer
            })
        })

        choicesArea.classList.toggle('hide'); //hides choices grid
        questionsArea.classList.toggle('hide'); //displays question section
    }
    else{
        alert('Please select an option'); //alerts user if no question box is selected
    }
})

//Event listener for confirm button in questions section
confirmAnsBtn.addEventListener('click', () => {
    //checks if an option has been selected 
    if(clickedOption){
        let currentQuesObj = questionList[currentQuestionIndex] //for easier typing and reading - same as previous event listener

        //checks if answer is correct
        if(clickedOption === currentQuesObj.correctAns){
            console.log('Right Answer!')
            score = score+=currentQuesObj.points //stores points from question
        }
        else {
            console.log('Unlucky. Try again')
        }

        //loops through answers to apply style - this is so that every option is styled
        answerOptions.forEach(option => {
            if(option.textContent === currentQuesObj.correctAns){
                option.classList.add('correct-answer')
            }
            else{
                option.classList.add('incorrect-answer')
            }
        })
        
        console.log(`Score: ${score}`)

        confirmAnsBtn.classList.toggle('hide') //hides confirm button
        nextQuesBtn.classList.toggle('hide') //displays next question button

        gridItems[currentQuestionIndex].classList.add('completed');
        gridItems[currentQuestionIndex].removeEventListener('click', handleGridClick);

        console.log(questionList)
        
    }    
    else{
        alert('Please select an option');
    }
})

//Event listener for next question button in questions section
nextQuesBtn.addEventListener('click', () => {
    let currentQuesObj = questionList[currentQuestionIndex] //same as previous event listeners

    choicesArea.classList.toggle('hide'); //shows choices grid
    questionsArea.classList.toggle('hide'); //hides question

    nextQuesBtn.classList.toggle('hide'); //hides next question button (for next time question is displayed)
    confirmAnsBtn.classList.toggle('hide') //shows confirm button for answer

    //loops through answers to remove classes that change bg colour depending on whether or not answer is correct
    answerOptions.forEach(option => {
            if(option.textContent === currentQuesObj.correctAns){
                option.classList.remove('correct-answer')
            }
            else{
                option.classList.remove('incorrect-answer')
            }
        })

    currentQuestionIndex = undefined;
    clickedOption = '';
})










