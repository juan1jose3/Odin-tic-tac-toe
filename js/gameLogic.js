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
  
  const createGrid = () => {
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
    return board;
  }
  const showBoard = () => {
    console.log(
      `
      
      ${board[0]} | ${board[1]} | ${board[2]} \n
      ${board[3]} | ${board[4]} | ${board[5]} \n
      ${board[6]} | ${board[7]} | ${board[8]} \n
      
    `);
  };

  return { createGrid, showBoard, markBoard, getBoard };
    
})();


const gameController = (() => {
  const board = gameBoard;
  board.createGrid();

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
  

  const switchTurn = () => {
    if (activePlayer.turn === 1) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    
  };

  const showTurn = () => {
    console.log(`It's ${activePlayer.player.getPlayerName()}'s turn`);
  };

  const winningOptions = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  let isWinner = () => {
    const currentBoard = board.getBoard();
    return winningOptions.some((winnOption => currentBoard[winnOption[0]] && currentBoard[winnOption[0]] === currentBoard[winnOption[1]] && currentBoard[winnOption[1]] === currentBoard[winnOption[2]]));
  };

    
  
  const playRound = () => {
    const player1 = [0, 1, 5, 6, 7]; 
    const player2 = [2, 3, 4, 8];
    let p1Index = 0;
    let p2Index = 0;
    while (currentTurn < 9) {
      showTurn();
      console.log(`Turn: ${currentTurn}`);
      let position;
      
      if (activePlayer.player.getPlayerName() === "Juan") {
        position = player1[p1Index];
        p1Index++;
      } else {
        position = player2[p2Index];
        p2Index ++
      }
      
      move = board.markBoard(position, activePlayer.player.getPlayerMark());
  
      if (move) {
        board.showBoard();
        if (isWinner()) {
          console.log(`Is winner: ${activePlayer.player.getPlayerName()}`);
          break;
        }
        switchTurn();
        currentTurn++;
      }

      if (currentTurn === 9 && !isWinner()) {
        console.log("TIE");
        break;
      }
  
    }

    console.log("GAME OVER");
  };

    playRound();

  //console.log(board.getBoard())
 
  
  
})();

const controller = gameController;









