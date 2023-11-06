// Variables 

const grid = document.querySelector("#container");
const rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
const rowsReverse = rows.forEach(element => {
    element.reverse()
});
const columns = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16],
];
const columnsReverse = columns.forEach(element => {
    element.reverse()
});

// Functions

let randomPosition = () => {
    random = Math.ceil(Math.random()*4)
    return random
}

let moveUp = () => {
    console.log("test")
}

let moveDown = () => {
    console.log("test")
}

let moveLeft = () => {
    console.log("test")
}

let moveRight = () => {
    console.log("test")
}


let newNumber = () => {
    let newDiv = document.createElement("div");
    let newCase = grid.appendChild(newDiv);
    newCase.textContent = "2";
    newCase.classList.add("x2");
    newCase.classList.add("number");
    newCase.style.gridColumn = randomPosition();
    newCase.style.gridRow = randomPosition();
}

// Actions

newNumber()
document.addEventListener("keyup", (e) => {
    let numbers = document.querySelectorAll(".number")
    switch(e.key) {
        case "ArrowUp" :
            numbers.forEach(element => {
                moveUp(element)
            });
            console.log(gridElement)
            resetGrid()
            break;
        case "ArrowDown" :
            numbers.forEach(element => {
                moveDown(element)
            });
            break;
        case "ArrowLeft" :
            numbers.forEach(element => {
                moveLeft(element)
            });
            break;
        case "ArrowRight" :
            numbers.forEach(element => {
                moveRight(element)
            });
            break;

    }
    newNumber()
})