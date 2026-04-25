// -------------------- IMPORTS -------------------- 
import {questionsArr, logQuestion} from './questions.js'

// -------------------- DOM VARIABLES -------------------- 
const gridItem = document.getElementsByClassName('grid-item');

for(const item of gridItem){
    item.addEventListener('click', ()=>{
        console.log('Grid item clicked!')
    })
}



const randomNum = Math.floor(Math.random()*100)

logQuestion(randomNum)

