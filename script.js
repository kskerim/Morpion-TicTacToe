const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const gameStatus = document.getElementById('gameStatus');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeWinnerModalButton = winnerModal.querySelector('.close-button');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Initialise ou redessine le plateau de jeu
function drawBoard() {
    gameBoard.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellElement);
    });
}

// Gère le clic sur une cellule
function handleCellClick(index) {
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    gameState[index] = currentPlayer;
    drawBoard();
    checkWinner();
}

// Vérifie si un joueur a gagné et met à jour le statut du jeu
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    // Vérifie si toutes les cellules sont remplies
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        announceWinner('Nobody'); // Match nul
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
}

// Annonce le gagnant ou un match nul
function announceWinner(winner) {
    if (winner === 'Nobody') {
        winnerMessage.innerText = 'Match nul !';
    } else {
        winnerMessage.innerText = `Joueur ${winner} a gagné !`;
    }
    winnerModal.style.display = 'block';
}

// Met à jour l'affichage du statut du jeu
function updateGameStatus() {
    gameStatus.innerText = `Au tour de : ${currentPlayer}`;
}

// Réinitialise le jeu
restartButton.addEventListener('click', () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    drawBoard();
    updateGameStatus();
    winnerModal.style.display = 'none';
});

// Ferme le pop-up de victoire
closeWinnerModalButton.addEventListener('click', () => {
    winnerModal.style.display = 'none';
});

drawBoard();
updateGameStatus();
