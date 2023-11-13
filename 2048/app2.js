// Variables

const grid = document.querySelector("#game-container");
const score = document.querySelector("#score");

// Functions

let newNumber = () => {

}

let moveCell = () => {
    let cell = document.querySelector('.cell')
    cell.style.gridArea = "2 / 2 / 3 / 3"
}

// Actions

setTimeout(() => {
    moveCell()
}, 5000);