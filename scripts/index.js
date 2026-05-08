// --------------- DOM VARIABLES ---------------
const quickRoundSelect = document.getElementById('quickRoundDiv');

// --------------- EVENT HANDLER FUNCTIONS ---------------

const handleQuickRoundClick = () => {
    window.location.replace(new URL('../game.html', import.meta.url).href);
    console.log('clicked')
}

quickRoundSelect.addEventListener('click', handleQuickRoundClick)
