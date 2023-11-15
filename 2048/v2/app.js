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

// Generate Number

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

// Move

let removeNumber = () => {
    for (i = 0; i < 16; i++) {
        grid.children[i].textContent = "";
        grid.children[i].removeAttribute("class");
        grid.children[i].classList.add("block");
    }
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

let resetGrid = () => {
    emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Score

let incrementScore = (number) => {
    score.textContent = parseInt(score.textContent) + parseInt(number)
}

// Game Over

let gameOver = () => {
    const modal = document.querySelector("#game-over");
    modal.style.opacity = "100%";
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
        gameOver()
    }
})
