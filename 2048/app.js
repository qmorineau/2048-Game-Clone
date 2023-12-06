////// Variables //////

let isGameOver = false;
const grid = document.querySelector('#board');

//Array for position of the children

const rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
const rowsReverse = rows.map(subArray => [...subArray]);
rowsReverse.forEach(element => {
   element.reverse();
});
const columns = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16],
];

const columnsReverse = columns.map(subArray => [...subArray]);
columnsReverse.forEach(element => {
   element.reverse();
});

////// Functions //////

// Generate Number

const randomPosition = () => {
    random = Math.floor(Math.random()*16);
    return random;
}

const newNumber = () => {
    let cell = grid.children[randomPosition()];
    while (cell.textContent) {
        cell = grid.children[randomPosition()];
    }
    let random = Math.ceil(Math.random()*5);
    if (random == 1) {
        cell.textContent = Number(4);
        cell.classList.add ("x4");
    } else {
        cell.textContent = Number(2);
        cell.classList.add ("x2");
    }
}

// Move

const move = (direction) => {
    let emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let temp = retrieveGrid(direction, emptyGrid);
    let newTemp = removeZero(temp);
    resetEmptyGrid();
    removeNumber();
    newTemp = gridAfterMove(newTemp, false);
    writeNumber(newTemp, direction);
}

const checkMove = (direction) => {
    let emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    resetEmptyGrid();
    let temp = retrieveGrid(direction, emptyGrid);
    let newTemp = removeZero(temp);
    resetEmptyGrid();
    newTemp = gridAfterMove(newTemp, true);
    if (temp.toString() === newTemp.toString()) {
        return false;
    } else {
        return true;
    }
}

const retrieveGrid = (array, emptyGrid) => {
    let temp = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    for (let i = 0; i < 16; i++) {
        if (grid.children[i].textContent) {
            emptyGrid[i] = grid.children[i].textContent;
        }
    }
    for (let i = 0; i < 16; i++) {
        if (emptyGrid[i]) {
            for (let j = 0; j < 4; j++) {
                if (array[j].indexOf(i+1) !== -1) {
                    temp[j][array[j].indexOf(i+1)] = emptyGrid[i];
                }
            }
        }
    }
    return temp;
}

const gridAfterMove = (temp, check) => {
    let moveTotalScore = 0;
    for (let i = 0; i <= 3; i++) {
        for (let j = 2; j >= 0; j--) {
            if (temp[i][j] == temp[i][j+1] && temp[i][j] !== 0) {
                temp[i][j+1] = parseInt(temp[i][j])+parseInt(temp[i][j+1]);
                if (!check) {
                    moveTotalScore += parseInt(temp[i][j+1]);
                    incrementScore(temp[i][j+1]);
                }
                temp[i].splice(j, 1);
                if (temp[i].length !== 4) {
                    temp[i].unshift(0);
                }
            }
        }
    }
    if (moveTotalScore) {
        displayTotalMoveScore(moveTotalScore)
    }
    return temp;
}

const writeNumber = (newTemp, array) => {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (newTemp[i][j]) {
                grid.children[array[i][j]-1].textContent = newTemp[i][j];
                grid.children[array[i][j]-1].classList.add(`x${grid.children[array[i][j]-1].textContent}`);
            }
        }
    }
}

const removeNumber = () => {
    for (i = 0; i < 16; i++) {
        grid.children[i].textContent = "";
        grid.children[i].removeAttribute("class");
        grid.children[i].classList.add("cell");
    }
}

const removeZero = (temp) => {
    let newTemp = [];
    temp.forEach(element => {
        let filtered = element.filter((number) => number != 0);
        while (filtered.length !== 4) {
            filtered.unshift(0);
        }
        newTemp.push(filtered);
    })
    return newTemp;
}

const resetEmptyGrid = () => {
    emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Score

const incrementScore = (number) => {
    const score = document.querySelector("#actual-score");
    score.textContent = parseInt(score.textContent) + parseInt(number);
}

const displayTotalMoveScore = (number) => {
    const score = document.querySelector(".score");
    const newDiv = document.createElement("div");
    const tempDiv = score.appendChild(newDiv);
    tempDiv.textContent = `+${number}`;
    tempDiv.id = "move-total-score";
    setTimeout(() => {
        tempDiv.remove();
    }, 800)
}

const refreshHighScore = () => {
    let localBestScore = JSON.parse(localStorage.getItem("High Score"));
    let mainScore = document.querySelector("#actual-score").textContent;
    let bestScore = document.querySelector("#best-score");
    if (parseInt(mainScore) > parseInt(localBestScore)) {
        localStorage.setItem("High Score", JSON.stringify(parseInt(mainScore)));
    }
    localBestScore = JSON.parse(localStorage.getItem("High Score"));
    bestScore.textContent = localBestScore;
}

const retrieveHighScore = () => {
    if (!localStorage.getItem("High Score")) {
        localStorage.setItem("High Score", JSON.stringify(0));
    } else {
        refreshHighScore();
    }
}

// Game Over

const gameOver = () => {
    const modal = document.querySelector("#game-over");
    const button = document.querySelector(".game-over-restart");
    modal.style.opacity = "100%";
    button.style.cursor = "pointer";
}

const checkGameOver = () => {
    if (checkMove(columns) == false && checkMove(columnsReverse) == false && checkMove(rows) == false && checkMove(rowsReverse) == false) {
        isGameOver = true;
    }
}

const newGameFunc = () => {
    const modal = document.querySelector("#game-over");
    const button = document.querySelector('.game-over-restart');
    const score = document.querySelector('#actual-score');
    score.textContent = 0;
    button.style.cursor = "default";
    modal.style.opacity = "0%";
    isGameOver = false;
    removeNumber();
    newNumber();
    newNumber();
}

////// Actions //////

retrieveHighScore();
newNumber();
newNumber();
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch(e.key) {
        case "ArrowUp" :
            if (checkMove(columnsReverse)) {
                move(columnsReverse);
                newNumber();
            }
            break;
        case "ArrowDown" :
            if (checkMove(columns)) {
                move(columns);
                newNumber();
            }
            break;
        case "ArrowLeft" :
            if (checkMove(rowsReverse)) {
                move(rowsReverse);
                newNumber();
            }
            break;
        case "ArrowRight" :
            if (checkMove(rows)) {
                move(rows);
                newNumber();
            }
            break;
        case "r" :
            newGameFunc()
            break;
        }
    refreshHighScore();
    checkGameOver();
    if (isGameOver) {
        gameOver();
    }
})
document.addEventListener("click", (e) => {
    if (e.target.matches(".restart")) {
        newGameFunc()
    }
})
