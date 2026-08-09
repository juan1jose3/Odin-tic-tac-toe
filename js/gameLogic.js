
function player(name, mark){
  return { name, mark };
}

const gameBoard = (() => {
  let board = [];
  
  const crateGrid = () => {
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
    return board;
  };

  const markBoard = (player, icon) => {
    
  };



  const getBoard = () => board;

  return { crateGrid, getBoard };
    
})();


const gameController = (() => {
  board = gameBoard().crateGrid();
  
})();







