////// Variables //////
const body = document.querySelector('body')
const grid = document.querySelector("#game-container");
const score = document.querySelector("#score");
let isGameOver = false;
let emptyGrid;

//Array for position of the children
const rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
const rowsReverse = rows.map(subArray => [...subArray]);
rowsReverse.forEach(element => {
   element.reverse()
});
const columns = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16],
];
const columnsReverse = columns.map(subArray => [...subArray]);
columnsReverse.forEach(element => {
   element.reverse()
});

////// Functions //////

let randomPosition = () => {
    random = Math.floor(Math.random()*16)
    return random
}

let newNumber = () => {
    let cell = grid.children[randomPosition()]
    while (cell.textContent) {
        cell = grid.children[randomPosition()]
    }
    let random = Math.ceil(Math.random()*5)
    if (random == 1) {
        cell.textContent = Number(4)
        cell.classList.add ("x4")
    } else {
        cell.textContent = Number(2)
        cell.classList.add ("x2")
    }
}

let move = (array) => {
    resetGrid()
    let temp = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    for (let i = 0; i < 16; i++) {
        if (grid.children[i].textContent){
            emptyGrid[i] = grid.children[i].textContent
        }
    }
    for (let i = 0; i < 16; i++) {
        if (emptyGrid[i]) {
            for (let j = 0; j < 4; j++) {
                if (array[j].indexOf(i+1) !== -1) {
                    temp[j][array[j].indexOf(i+1)] = emptyGrid[i]
                }
            }
        }
    }
    let newTemp = removeZero(temp);
    resetGrid();
    removeNumber();
    for (let i = 0; i <= 3; i++) {
        for (let j = 2; j >= 0; j--) {
            if (newTemp[i][j] == newTemp[i][j+1] && newTemp[i][j] !== 0) {
                newTemp[i][j+1] = parseInt(newTemp[i][j])+parseInt(newTemp[i][j+1])
                incrementScore(newTemp[i][j+1])
                newTemp[i].splice(j, 1)
                if (newTemp[i].length !== 4) {
                    newTemp[i].unshift(0)
                }
            }
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (newTemp[i][j]) {
                grid.children[array[i][j]-1].textContent = newTemp[i][j]
                grid.children[array[i][j]-1].classList.add(`x${grid.children[array[i][j]-1].textContent}`)
            }
        }
    }
    
    resetGrid()
}

let removeZero = (temp) => {
    let newTemp = []
    temp.forEach(element => {
        let filtered = element.filter((number) => number != 0)
        while (filtered.length !== 4) {
            filtered.unshift(0)
        }
        newTemp.push(filtered)
    })
    return newTemp
}

let checkMove = (array, gameOver) => {
    resetGrid()
    let temp = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    for (let i = 0; i < 16; i++) {
        if (grid.children[i].textContent){
            emptyGrid[i] = grid.children[i].textContent
        }
    }
    for (let i = 0; i < 16; i++) {
        if (emptyGrid[i]) {
            for (let j = 0; j < 4; j++) {
                if (array[j].indexOf(i+1) !== -1) {
                    temp[j][array[j].indexOf(i+1)] = emptyGrid[i]
                }
            }
        }
    }
    let newTemp = removeZero(temp);
    resetGrid();
    for (let i = 0; i <= 3; i++) {
        for (let j = 2; j >= 0; j--) {
            if (newTemp[i][j] == newTemp[i][j+1] && newTemp[i][j] !== 0) {
                newTemp[i].splice(j, 1)
                if (newTemp[i].length !== 4) {
                    newTemp[i].unshift(0)
                }
            }
        }
    }
    if (temp.toString() === newTemp.toString()) {
        return false
    } else {
        return true
    }
}

let checkGameOver = () => {
    if (checkMove(columns) == false && checkMove(columnsReverse) == false && checkMove(rows) == false && checkMove(rowsReverse) == false) {
        isGameOver = true
    }
}

let incrementScore = (number) => {
    score.textContent = parseInt(score.textContent) + parseInt(number)
}

let removeNumber = () => {
    for (i = 0; i < 16; i++) {
        grid.children[i].textContent = "";
        grid.children[i].removeAttribute("class");
        grid.children[i].classList.add("block");
    }
}

let resetGrid = () => {
    emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

////// Actions //////

newNumber()
newNumber()
document.addEventListener("keyup", (e) => {
    if (!isGameOver) {
    switch(e.key) {
        case "ArrowUp" :
            if (checkMove(columnsReverse)) {
            move(columnsReverse)
            newNumber()
            }
            break;
        case "ArrowDown" :
            if (checkMove(columns)) {
            move(columns)
            newNumber()
            }
            break;
        case "ArrowLeft" :
            if (checkMove(rowsReverse)) {
            move(rowsReverse)
            newNumber()
            }
            break;
        case "ArrowRight" :
            if (checkMove(rows)) {
            move(rows)
            newNumber()
            }
            break;
        }
    checkGameOver()
    } else {
       /*  console.log("game over")
        let newDiv = document.createElement('div');
        let gameOverModal = body.appendChild(newDiv);
        gameOverModal.id = "gameOverModal";
        let gameOverWindow = gameOverModal.appendChild(newDiv);
        gameOverWindow.id = "gameOverWindow"; */
    }
})
