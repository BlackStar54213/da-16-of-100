
const words = ["javascript", "hangman", "programming", "openai", "developer", "challenge"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let maxAttempts = 6;
function displayWord() {
    return selectedWord.replace(new RegExp(`[^${guessedLetters.join('')}]`, 'g'), '_');
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayWord();
    document.getElementById('guessed-letters').textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
}

function checkGuess(letter) {
    if (guessedLetters.includes(letter)) {
        alert('You already guessed that letter.');
        return;
    }

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        maxAttempts--;
    }

    updateDisplay();

    if (checkWin()) {
        endGame(true);
    } else if (maxAttempts === 0) {
        endGame(false);
    }
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert('Please enter a valid single letter.');
        return;
    }

    checkGuess(guess);
    guessInput.value = '';
}

function checkWin() {
    return displayWord() === selectedWord;
}

function endGame(isWinner) {
    if (isWinner) {
        alert('Congratulations! You guessed the word: ' + selectedWord);
    } else {
        alert('Game over! The word was: ' + selectedWord);
    }

    if (confirm('Do you want to play again?')) {
        resetGame();
    } else {
        document.getElementById('word-display').textContent = '';
        document.getElementById('guessed-letters').textContent = '';
        document.getElementById('guess-input').style.display = 'none';
        document.querySelector('button').style.display = 'none';
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    maxAttempts = 6;
    updateDisplay();
}

// Initial display
updateDisplay();