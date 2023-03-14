const gameElements = document.querySelectorAll('.puzzle-element');
const gameBoard = document.querySelector('#board');

const gameState = [
  [gameElements[0], gameElements[1], gameElements[2]],
  [gameElements[3], gameElements[4], gameElements[5]],
  [gameElements[6], gameElements[7], gameElements[8]],
];


function render(gameBoard, gameState) {
    gameState.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        column.style.top = `${rowIndex * 100}px`;
        column.style.left = `${columnIndex * 100}px`;
  
        column.style['background-position-y'] = `-${rowIndex * 100}px`;
        column.style['background-position-x'] = `-${columnIndex * 100}px`;
  
        gameBoard.appendChild(column);
      });
    });
  }
function swapElement(element1, element2) {
    const tempTop = element1.style.top;
    const tempLeft = element1.style.left;
  
    element1.style.top = element2.style.top;
    element1.style.left = element2.style.left;
  
    element2.style.top = tempTop;
    element2.style.left = tempLeft;
}
function move(x, y){
    let emptyX, emptyY;
    gameState.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column.innerText === '0') {
          emptyX = rowIndex;
          emptyY = columnIndex;
        }
      });
    });
  
    if (
      (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
      (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
    ) {
      swapElement(gameState[x][y], gameState[emptyX][emptyY]);
  
      const temp = gameState[x][y];
      gameState[x][y] = gameState[emptyX][emptyY];
      gameState[emptyX][emptyY] = temp;
    }
}
  
function initBoard(gameBoard, gameState) {

    for( let i = 0; i <100 ; i ++){
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
        move(x, y)
    }
    

}
render(gameBoard, gameState);
initBoard(gameBoard, gameState)


  
gameBoard.addEventListener('click', (event) => {
    const target = event.target;

    let x, y;
  
    gameState.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === target) {
          x = rowIndex;
          y = columnIndex;
        }
      });
    });
  
    move(x,y)
});