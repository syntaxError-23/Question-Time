// -------------------- IMPORTS -------------------- 
import {questionsArr, logQuestion, questionsObjArr} from './questions.js';

// -------------------- DOM VARIABLES -------------------- 
const gridItem = document.getElementsByClassName('grid-item');
const confirmChoiceBtn = document.getElementById('confirmChoicebtn');
const confirmAnsBtn = document.getElementById('confirmAnsBtn');
const choicesArea = document.getElementById('choices');
const questionsArea = document.getElementById('question');
const questionText = document.getElementById('qText');
const answerOptions = document.querySelectorAll('.aText');

// -------------------- VARIABLES -------------------- 
let score = 0;
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
console.log(questionList)

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
let currentQuestionIndex;

for(const item of gridItem){
    item.addEventListener('click', e =>{
       currentQuestionIndex = parseInt(e.target.id)-1;
    })
}

let clickedOption = ''

confirmChoiceBtn.addEventListener('click', () => {
    if(currentQuestionIndex){ 
        let currentQuesObj = questionList[currentQuestionIndex];
        questionText.innerHTML = currentQuesObj.question;

        let ansArr = shuffle(currentQuesObj);

        answerOptions.forEach((option, index) => {
            option.textContent = ansArr[index]

            option.addEventListener('click', () => {
                clickedOption = option.textContent;
            })
        })

        choicesArea.classList.toggle('hide');
        questionsArea.classList.toggle('hide');
    }
})

confirmAnsBtn.addEventListener('click', () => {
        let currentQuesObj = questionList[currentQuestionIndex]

        if(clickedOption === currentQuesObj.correctAns){
            console.log('Right Answer!')
            score = score+=currentQuesObj.points
        }
        else {
            console.log('Unlucky. Try again')
        }
        
        console.log(`Score: ${score}`)
        choicesArea.classList.toggle('hide');
        questionsArea.classList.toggle('hide');

})










