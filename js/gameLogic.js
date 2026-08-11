
function player(name, mark) {
  return {
    name,
    mark,
    
    getPlayerName() {
      return name;
    },
    
    getPlayerMark() {
      return mark
    }
  };
}

const gameBoard = (() => {
  let board = [];
  
  const crateGrid = () => {
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
    
  };

  const markBoard = (position, playerMark) => {
    if (board[position].length === 0) {
      board[position] = playerMark;
      console.log("Valid Spot!");
      return true;
    }
    
    

    console.log("This spot is Filled!");
    return false;
  }
    
  const getBoard = () => {
    console.log(
      `
      ${board[0]} | ${board[1]} | ${board[2]} \n
      ${board[3]} | ${board[4]} | ${board[5]} \n
      ${board[6]} | ${board[7]} | ${board[8]} \n
    `);
  };

  return { crateGrid, getBoard, markBoard };
    
})();


const gameController = (() => {
  const board = gameBoard;
  board.crateGrid();

  const players = [
    {
      player: player("Juan", "X"),
      turn: 1
    },

    {
      player: player("BOT", "O"),
      turn: 2
    }
  ]  

  let currentTurn = 1;
  let move;
  let activePlayer = players[0];
  

  const switchTurn = (() => {
    if (activePlayer.turn === 1) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    
  });

  const showTurn = (() => {
    console.log(`It's ${activePlayer.player.getPlayerName()}'s turn`);
  });
  
  const playRound = (() => {
    showTurn();
    console.log(`Turn: ${currentTurn}`);
    
    move = board.markBoard(0, activePlayer.player.getPlayerMark());

    if (move) {
      currentTurn++;
    }
    
    board.getBoard();
    switchTurn();
    
    showTurn();
  
    console.log(`Turn: ${currentTurn}`);
    
    move = board.markBoard(0, activePlayer.player.getPlayerMark());
    board.getBoard();

    if (move) {
      currentTurn++;
    }
  });

    playRound();

  //console.log(board.getBoard())
 
  
  
})();

controller = gameController;









