// -------------------- IMPORTS -------------------- 
import {questionsArr, logQuestion, questionsObjArr} from './questions.js';

// -------------------- DOM VARIABLES -------------------- 
const gridItem = document.getElementsByClassName('grid-item');
const confirmChoiceBtn = document.getElementById('confirmChoicebtn');
const confirmAnsBtn = document.getElementById('confirmAnsBtn');
const choicesArea = document.getElementById('choices');
const questionsArea = document.getElementById('question');
const questionText = document.getElementById('qText');

// -------------------- VARIABLES -------------------- 

const randomQuestion = Math.floor(Math.random()*100);
const randomEasyQuestion = Math.floor(Math.random()*26);
const randomMediumQuestion = Math.floor(Math.random()*38) + 26;
const randomHardQuestion = Math.floor(Math.random()*35) + 64;



// -------------------- FUNCTIONS -------------------- 

const questionList = [];

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

generateQuestionList(questionsObjArr, questionList)


// -------------------- MAIN PROGRAM -------------------- 


let currentQuestionIndex;

for(const item of gridItem){
    item.addEventListener('click', e =>{
       currentQuestionIndex = parseInt(e.target.id)-1;
       console.log(currentQuestionIndex)
       logQuestion(questionList, currentQuestionIndex)
    })
}


confirmChoiceBtn.addEventListener('click', () => {
    if(currentQuestionIndex){
        
        questionText.innerHTML = questionList[currentQuestionIndex].question;

        choicesArea.classList.toggle('hide');
        questionsArea.classList.toggle('hide');

    }
})

confirmAnsBtn.addEventListener('click', () => {
        choicesArea.classList.toggle('hide');
        questionsArea.classList.toggle('hide');

})










