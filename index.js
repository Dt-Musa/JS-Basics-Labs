let increaseButton = document.getElementById('increase-button');
let decreaseButton = document.getElementById('decrease-button');
let resetButton = document.getElementById('reset-button');
let clearHistoryButton = document.getElementById('clear-history-button');
let countLabel = document.getElementById('count-label');
let stepInput = document.getElementById('step-input');
let minInput = document.getElementById('min-input');
let maxInput = document.getElementById('max-input');
let limitWarning = document.getElementById('limit-warning');
let historyDisplay = document.getElementById('history-display');

let count = 0;
let history = [0];

function updateColor() {
    if (count > 0) {
        countLabel.style.color = 'blue';
    } else if (count < 0) {
        countLabel.style.color = 'red';
    } else {
        countLabel.style.color = '#ffffff';
    }
}

function updateButtonStates() {
    let min = parseInt(minInput.value) || -100;
    let max = parseInt(maxInput.value) || 100;
    
    increaseButton.disabled = count >= max;
    decreaseButton.disabled = count <= min;
}

function updateLimitWarning() {
    let min = parseInt(minInput.value) || -100;
    let max = parseInt(maxInput.value) || 100;
    
    if (count >= max) {
        limitWarning.textContent = ' Max limit reached!';
        limitWarning.classList.add('warning-active');
    } else if (count <= min) {
        limitWarning.textContent = ' Min limit reached!';
        limitWarning.classList.add('warning-active');
    } else {
        limitWarning.textContent = '';
        limitWarning.classList.remove('warning-active');
    }
}

function updateHistory() {
    historyDisplay.textContent = history.join('  ');
}

function validateInputs() {
    let step = parseInt(stepInput.value) || 1;
    if (step <= 0) stepInput.value = 1;
    
    let min = parseInt(minInput.value) || -100;
    let max = parseInt(maxInput.value) || 100;
    if (min > max) {
        maxInput.value = min;
    }
}

function clampValue(value) {
    let min = parseInt(minInput.value) || -100;
    let max = parseInt(maxInput.value) || 100;
    
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function updateCount(newValue) {
    count = clampValue(newValue);
    countLabel.textContent = count;
    updateColor();
    updateButtonStates();
    updateLimitWarning();
    if (history[history.length - 1] !== count) {
        history.push(count);
        if (history.length > 10) history.shift();
        updateHistory();
    }
}

increaseButton.addEventListener('click', () => {
    validateInputs();
    let step = parseInt(stepInput.value) || 1;
    updateCount(count + step);
});

decreaseButton.addEventListener('click', () => {
    validateInputs();
    let step = parseInt(stepInput.value) || 1;
    updateCount(count - step);
});

resetButton.addEventListener('click', () => {
    history = [0];
    updateHistory();
    updateCount(0);
});

clearHistoryButton.addEventListener('click', () => {
    history = [count];
    updateHistory();
});

stepInput.addEventListener('change', validateInputs);
minInput.addEventListener('change', () => {
    validateInputs();
    updateButtonStates();
    updateLimitWarning();
});
maxInput.addEventListener('change', () => {
    validateInputs();
    updateButtonStates();
    updateLimitWarning();
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        increaseButton.click();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        decreaseButton.click();
    } else if (event.key.toUpperCase() === 'R') {
        resetButton.click();
    } else if (event.key.toUpperCase() === 'C') {
        event.preventDefault();
        history = [count];
        updateHistory();
    }
});

// Initialize button states and history on load
window.addEventListener('load', () => {
    updateButtonStates();
    updateHistory();
});
