let level = 1;
let score = 0;
let maxLevels = null; // Infinite levels by default
let gameRunning = false;

function startGame() {
    gameRunning = true;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    showLevel();
}

function showLevel() {
    document.getElementById('level').innerText = level;
    document.getElementById('score').innerText = score;
    
    let frequency = Math.floor(Math.random() * (22000 - 12000 + 1)) + 12000;
    document.getElementById('frequency').innerText = `Can you hear this frequency? ${frequency} Hz`;

    playBeep(frequency);

    // Clear previous response
    document.getElementById('response').value = '';
}

function submitResponse() {
    let response = document.getElementById('response').value.toUpperCase();
    
    if (response === 'Y') {
        score++;
        document.getElementById('game-message').innerText = 'Nice job! You heard it!';
    } else if (response === 'N') {
        document.getElementById('game-message').innerText = 'You missed it! Game Over!';
        endGame();
        return;
    }

    // Go to next level
    level++;
    
    // Check if the game has reached the max levels
    if (maxLevels !== null && level > maxLevels) {
        document.getElementById('game-message').innerText = `Congratulations! You completed all ${maxLevels} levels!`;
        endGame();
    } else {
        showLevel();
    }
}

function playBeep(frequency) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Play for 1 second
}

function endGame() {
    gameRunning = false;
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    alert(`Game Over! Your final score is ${score}`);
}

function showInstructions() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
}

function goBackToMenu() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

function exitGame() {
    window.close(); // Try to close the window if it's an open tab
}
