function player(name, mark) {
  return {  
    getPlayerName() {
      return name;
    },
    
    getPlayerMark() {
      return mark;
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

  const getCurrentTurn = () => currentTurn; 

  const getActivePlayer = () => activePlayer;

  const showTurn = () => {
    return (`It's ${activePlayer.player.getPlayerName()}'s turn!`);
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

    
  
  const playRound = (selectedCell) => {
    move = board.markBoard(selectedCell, activePlayer.player.getPlayerMark());
    

    if (move){
      board.showBoard();
      let checkWinner = isWinner();

      if(checkWinner){
        return `winner: ${activePlayer.player.getPlayerName()}`;
      }

      if(currentTurn === 9 && !checkWinner){
        return "TIE!";
      }
      currentTurn++;
      let currentMark = activePlayer.player.getPlayerMark();
      switchTurn();
      return currentMark;

    }
    
  };

  //console.log(board.getBoard())

  return{
    switchTurn,
    playRound,
    isWinner,
    showTurn,
    getActivePlayer,
    getCurrentTurn,
  }
 
  
  
})();




const uiController = ((cell) => {
    let gameGrid = document.querySelector(".game-grid"); 
    const turnCounter = document.querySelector(".turn-counter");
    const playerTurn = document.querySelector(".player-turn");
    const game = gameController;
    let mark;

    const displayPlayerTurn = () => {
      playerTurn.textContent = game.showTurn();
    }
   
    const showTurnNumber = () =>{
      turnCounter.textContent = `Turn: ${game.getCurrentTurn()}!`
    }
    showTurnNumber();
    displayPlayerTurn();

    gameGrid.addEventListener("click", event =>{
      let selectedCell = event.target.id;
      let cell = event.target;
     
      mark = game.playRound(parseInt(selectedCell));
  

      if (cell.textContent === "" && mark != "TIE!"){
        event.target.textContent = mark;
        showTurnNumber();
        displayPlayerTurn();
      }

  
      
      if (mark === "TIE!") {
        console.log(mark);
        turnCounter.textContent = "";
        playerTurn.textContent = mark;
      }
      
      
      
    });
    

  return {showTurnNumber, displayPlayerTurn};
})();




const controller = uiController;














