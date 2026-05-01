// -------------------- IMPORTS -------------------- 
import {logQuestion, questionsObjArr} from './questions.js';
// -------------------- DOM VARIABLES -------------------- 
const gridItems = document.querySelectorAll('.grid-item');
const confirmChoiceBtn = document.getElementById('confirmChoicebtn');
const confirmAnsBtn = document.getElementById('confirmAnsBtn');
const choicesArea = document.getElementById('choices');
const questionsArea = document.getElementById('question');
const questionText = document.getElementById('qText');
const answerOptions = document.querySelectorAll('.aText');
const nextQuesBtn = document.getElementById('nextQuesBtn');
const pointsThisQues = document.getElementById('pointsThisQues');
const scoreboard = document.getElementById('scoreboard');
const endModal = document.getElementById('modal')
const newGameBtn = document.getElementById('newGameBtn');
const homeBtn = document.getElementById('homeBtn');
const modalScore = document.getElementById('modalScore');
const homeIcon = document.getElementById('homeIcon');
// -------------------- VARIABLES -------------------- 
let score = 0; //stores user score
let clickedOption = ''; //option (out of the possible answers) clicked by the user
let currentQuestionIndex //Will hold the index of the selected grid item
let questionList = []; //Will hold a randomly generated set of questions corresponding to the number of grid items
let roundCounter = 0; //counts how many rounds have been played
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
    }

gridItems.forEach(item => {
    item.addEventListener('click', handleGridClick)
})

gridItems.forEach(item => {
    item.addEventListener('click', e => {
        item.classList.add('selected-grid-item');

        gridItems.forEach(gridItem => {
            if(e.target !== gridItem){
                gridItem.classList.remove('selected-grid-item');
            }
        })
    })
})

//function to handle clicking home button
export const handleHomeBtnClick = () => {
    window.location.replace('..');
}
//Adds event listener to home button
homeIcon.addEventListener('click', handleHomeBtnClick);

//loops through answers and adds event listeners (for appropriate styling when clicked - alternative to focus)
answerOptions.forEach(option => {
    option.addEventListener('click', e => {
        option.classList.add('selected-answer');
        //checks if selected answer matches current answer and removes highlighting if not
        answerOptions.forEach(ans => {
            if(e.target !== ans){
                ans.classList.remove('selected-answer');
            }
        })
    })
})

//Event listener for confirm button in choices section
confirmChoiceBtn.addEventListener('click', () => {
    //checks if a question box is selected
    console.log(currentQuestionIndex)
    if(currentQuestionIndex || currentQuestionIndex === 0){ 
        let currentQuesObj = questionList[currentQuestionIndex]; //variable to store current question object using question box id as an index
        questionText.innerHTML = currentQuesObj.question;

        //defaults to non-highlighted answer styles at first instance
        answerOptions.forEach(ans => {
            ans.classList.remove('selected-answer');
        })
        
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

        pointsThisQues.textContent = `${currentQuesObj.points} points`; //update points display

    }
    else{
        alert('Please select an option'); //alerts user if no question box is selected
    }

    
})

//Event listener for confirm button in questions section
confirmAnsBtn.addEventListener('click', () => {
    
    if(roundCounter === 4){
        roundCounter = 0;
        endModal.classList.toggle('hide');
        modalScore.textContent = `You scored ${score} points`;
    }
    
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

        //Update scores
        scoreboard.textContent = `SCORE: ${score}`;
        
        confirmAnsBtn.classList.toggle('hide') //hides confirm button
        nextQuesBtn.classList.toggle('hide') //displays next question button

        gridItems[currentQuestionIndex].classList.add('completed');
        gridItems[currentQuestionIndex].removeEventListener('click', handleGridClick);
    }    
    else{
        alert('Please select an option');
    }
})

const reloadGame = () => {
    window.location.reload()
}
newGameBtn.addEventListener('click', reloadGame);

homeBtn.addEventListener('click', () => {
    window.location.replace('..')
})

//Event listener for next question button in questions section
nextQuesBtn.addEventListener('click', () => {
    console.log(roundCounter)

    
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

    //resets stored values for selected question and selected answer
    currentQuestionIndex = undefined;
    clickedOption = '';

    pointsThisQues.textContent = 'SELECT A QUESTION';
    roundCounter++ //
    console.log(`Rounds: ${roundCounter}`)
})










