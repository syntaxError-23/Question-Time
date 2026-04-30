// -------------------- IMPORTS -------------------- 
import {logQuestion, questionsObjArr} from './questions.js';

// -------------------- DOM VARIABLES -------------------- 
const gridItem = document.getElementsByClassName('grid-item');
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

qBoxes.forEach(box => {
    box.addEventListener('click', () => {
        clickedBox = box.id
    })
})

confirmChoiceBtn.addEventListener('click', () => {
    if(currentQuestionIndex && clickedBox){ 
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
    else{
        alert('Please select an option');
    }
})

confirmAnsBtn.addEventListener('click', () => {
    if(clickedOption){
        let currentQuesObj = questionList[currentQuestionIndex]

        if(clickedOption === currentQuesObj.correctAns){
            console.log('Right Answer!')
            score = score+=currentQuesObj.points
        }
        else {
            console.log('Unlucky. Try again')
        }

        answerOptions.forEach(option => {
            if(option.textContent === currentQuesObj.correctAns){
                option.classList.add('correct-answer')
            }
            else{
                option.classList.add('incorrect-answer')
            }
        })
        
        console.log(`Score: ${score}`)

        confirmAnsBtn.classList.toggle('hide')
        nextQuesBtn.classList.toggle('hide')
    }    
    else{
        alert('Please select an option');
    }


})

nextQuesBtn.addEventListener('click', () => {
    let currentQuesObj = questionList[currentQuestionIndex]

    choicesArea.classList.toggle('hide');
    questionsArea.classList.toggle('hide');

    nextQuesBtn.classList.toggle('hide')
    confirmAnsBtn.classList.toggle('hide')

    answerOptions.forEach(option => {
            if(option.textContent === currentQuesObj.correctAns){
                option.classList.remove('correct-answer')
            }
            else{
                option.classList.remove('incorrect-answer')
            }
        })
})










