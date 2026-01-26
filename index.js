let increaseButton = document.getElementById('increase-button');
let decreaseButton = document.getElementById('decrease-button');
let resetButton = document.getElementById('reset-button');
let countLabel = document.getElementById('count-label');
let stepInput = document.getElementById('step-input');
let minInput = document.getElementById('min-input');
let maxInput = document.getElementById('max-input');

let count = 0;

function updateColor() {
    if (count > 0) {
        countLabel.style.color = 'blue';
    } else if (count < 0) {
        countLabel.style.color = 'red';
    } else {
        countLabel.style.color = '#ffffff';
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
}

increaseButton.addEventListener('click', () => {
    let step = parseInt(stepInput.value) || 1;
    updateCount(count + step);
});

decreaseButton.addEventListener('click', () => {
    let step = parseInt(stepInput.value) || 1;
    updateCount(count - step);
});

resetButton.addEventListener('click', () => {
    updateCount(0);
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
    }
});






