// --------------- DOM VARIABLES ---------------
const quickRoundSelect = document.getElementById('quickRoundDiv');
const infiniteSelect = document.getElementById('infiniteMode')
// --------------- EVENT HANDLER FUNCTIONS ---------------
const handleQuickRoundSelect = () => {
    window.location.href = 'game.html?mode=quickround'
}

const handleInfiniteSelect = () => {
     window.location.href = 'game.html?mode=infinite'
}
// --------------- PROGRAM ---------------
quickRoundSelect.addEventListener('click', handleQuickRoundSelect)
infiniteSelect.addEventListener('click', handleInfiniteSelect)




