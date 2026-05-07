// -------------------- IMPORTS -------------------- 
import {questionsObjArr} from './questions.js';
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
const finishGameBtn = document.getElementById('finishGameBtn');
const scoresSection = document.getElementById('scores');
// -------------------- PROGRAM VARIABLES -------------------- 
let score = 0; //stores user score
let clickedOption = ''; //option (out of the possible answers) clicked by the user
let currentQuestionIndex //Will hold the index of the selected grid item
let questionList = []; //Will hold a randomly generated set of questions corresponding to the number of grid items
let roundCounter = 0; //counts how many rounds have been played

// -------------------- UTILITY FUNCTIONS -------------------- 

//Generates random list of questions
const generateQuestionList = (arr, qArr) => {
    let arrCopy = [...arr]
    let noOfEasyQs = 0;
    let noOfMedQs = 0;
    let noOfHardQs = 0;

    arrCopy.forEach(question => {
        if(question.points === 100){
            noOfEasyQs+=1;
        }
        else if(question.points === 200){
            noOfMedQs+=1;
        }
        else if(question.points === 300){
            noOfHardQs+=1;
        }
    })

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(i === 0){
                let randomIndex = Math.floor(Math.random()*noOfEasyQs)
                let randomQ = arrCopy[randomIndex]
                arrCopy.splice(randomIndex, 1);
                qArr.push(randomQ);
                noOfEasyQs--
            }
            else if(i === 1){
                let randomIndex = Math.floor(Math.random()*noOfMedQs) + noOfEasyQs;
                let randomQ = arrCopy[randomIndex];
                qArr.push(randomQ);
                arrCopy.splice(randomIndex, 1);
                noOfMedQs--
            }
            else if(i === 2){
                let randomIndex = Math.floor(Math.random()*noOfHardQs) + noOfEasyQs + noOfMedQs;
                let randomQ = arrCopy[randomIndex];
                qArr.push(randomQ);
                arrCopy.splice(randomIndex, 1);
                noOfHardQs--
            }
        }
    }
}

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

//toggles opacity and display of sections
const toggleAppearance = (toHide, toDisplay, time) => {
    toHide.classList.toggle('transparent');

    setTimeout(() => {
        toHide.classList.toggle('hide');
        toDisplay.classList.toggle('hide');
    }, time);

    setTimeout(() => {
        toDisplay.classList.toggle('transparent')
    }, time*2);
}

const flicker = (el, prop) => {

    el.classList.toggle(prop);

    setTimeout(() => {
        el.classList.toggle(prop);
    }, 400);
}
// -------------------- EVENT HANDLER FUNCTIONS -------------------- 

// Adds an event listener to each grid item and stores respective ids in a variable to later be used as indices
const handleGridClick = e =>{
       currentQuestionIndex = parseInt(e.target.id)-1;
}

//Shows Modal when finish game button is clicked
const handleFinGameBtn = () => {
    roundCounter = 0;
    endModal.classList.toggle('hide');
        
    setTimeout(() => {
        endModal.classList.toggle('transparent')
    }, 200);

    modalScore.textContent = `You scored ${score} points`;
}

//function to handle clicking home button
const handleHomeBtnClick = () => {
    window.location.replace(new URL('../index.html', import.meta.url).href);
}

//function to restart game
const restartGame = () => {
    window.location.replace(new URL('../game.html', import.meta.url).href);
}

// -------------------- MAIN PROGRAM -------------------- 

//calls function to generate random list with object array and empty array as parameters
generateQuestionList(questionsObjArr, questionList);
newGameBtn.addEventListener('click', restartGame); 
homeBtn.addEventListener('click', handleHomeBtnClick);
homeIcon.addEventListener('click', handleHomeBtnClick);
finishGameBtn.addEventListener('click', handleFinGameBtn);

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
    console.log(currentQuestionIndex) //checks if a question box is selected
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

        flicker(scoresSection, 'transparent');
        toggleAppearance(choicesArea, questionsArea, 300);        
        
        setTimeout(() => {
            pointsThisQues.textContent = `${currentQuesObj.points} points`; //update points display
        }, 350)
        

        
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
            score = score+=currentQuesObj.points //stores points from question
        }

        //loops through answers to apply style - this is so that every option is styled
        answerOptions.forEach(option => {
            if(option.textContent === currentQuesObj.correctAns){
                option.classList.add('correct-answer')
            }
            else{
                option.classList.add('incorrect-answer')
            }

            option.classList.add('locked')
        })

        scoreboard.textContent = `SCORE: ${score}`; //Update scores
        roundCounter++ //Increment the round 

        if(roundCounter === 5){
            confirmAnsBtn.classList.toggle('hide') //hides confirm button
            finishGameBtn.classList.toggle('hide'); // Displays finish game button
            console.log('triggered')
        }
        else{
             confirmAnsBtn.classList.toggle('hide') //hides confirm button
            nextQuesBtn.classList.toggle('hide') //displays next question button
        }
    
        gridItems[currentQuestionIndex].classList.add('completed');
        gridItems[currentQuestionIndex].removeEventListener('click', handleGridClick);
    }    
    else{
        alert('Please select an option');
    }
})

//Event listener for next question button in questions section
nextQuesBtn.addEventListener('click', () => {    
    let currentQuesObj = questionList[currentQuestionIndex] //same as previous event listeners
    toggleAppearance(questionsArea, choicesArea, 300);
    nextQuesBtn.classList.toggle('hide'); //hides next question button (for next time question is displayed)
    
    //timeout stops confirm answer button reappearing too quickly
    setTimeout(() => {
        confirmAnsBtn.classList.toggle('hide') //shows confirm button for answer
    },300)

    flicker(scoresSection, 'transparent');
    
    //loops through answers to remove classes that change bg colour depending on whether or not answer is correct
    answerOptions.forEach(option => {
            option.classList.remove('locked')
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

    setTimeout(() => {
        pointsThisQues.textContent = 'SELECT A QUESTION';
    }, 350)
    
})










