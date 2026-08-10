
function player(name, mark){
  return { name, mark};
}

const gameBoard = (() => {
  let board = [];
  
  const crateGrid = () => {
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
    
  };

  const markBoard = (position, playerToken, currentTurn) => {
    if (board[position].length === 0) {
      board[position] = playerToken;
      currentTurn++;
    }
  }
    
  const getBoard = () => board;

  return { crateGrid, getBoard, markBoard };
    
})();


const gameController = (() => {
  const board = gameBoard;
  gameBoard.crateGrid();

  const player1 = player("Juan", "X");
  const player2 = player2("BOT", "O");

  
  
  let currentTurn = 1;
  let playersTurn = "player1"
  

  const switchTurn = ((currentTurn) => {
    if (currentTurn % 2 == 0) {
      playersTurn = "player1"

    } else {
      playersTurn = "player2" 
    }
  });


  switchTurn(currentTurn);

  


  
  console.log(board.getBoard())
 
  
  
})();

controller = gameController;









