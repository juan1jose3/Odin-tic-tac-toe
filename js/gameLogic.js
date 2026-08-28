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
  
  const wipeMarkers = () =>{
    board.length = 0;
  }

  const getBoard = () => {
    return [...board];
  }

  const printBoard = () => {
    console.log(
      `
      ${board[0]} | ${board[1]} | ${board[2]} \n
      ${board[3]} | ${board[4]} | ${board[5]} \n
      ${board[6]} | ${board[7]} | ${board[8]} \n
      
    `);
  };

  return { createGrid, printBoard, markBoard, getBoard, wipeMarkers };
    
})();


const gameController = (() => {
  const board = gameBoard;
  board.createGrid();

  const players = [
    {
      player: player("Juan", "X")
    },

    {
      player: player("BOT", "O")
    }
  ]  

  let turnNumber = 1;
  let activePlayer = players[0];
  
  const createPlayers = (player1, player2) =>{
    players[0].player = player(player1, "X");
    players[1].player = player(player2, "O");
  }

  const switchTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    
  };


  const getCurrentTurn = () => turnNumber; 
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

  const resetGame = () => {
      switchTurn();
      board.wipeMarkers();
      board.createGrid();
      turnNumber = 1;
  };

  const playRound = (selectedCell) => {

    let move = board.markBoard(selectedCell, activePlayer.player.getPlayerMark());
    if (move){
      turnNumber ++;
      return true;
    } 
    return false;    
  };

  return{
    createPlayers,
    switchTurn,
    playRound,
    isWinner,
    showTurn,
    getActivePlayer,
    getCurrentTurn,
    resetGame
  }
})();




const uiController = (() => {
    let gameGrid = document.querySelector(".game-grid"); 
    const turnCounter = document.querySelector(".turn-counter");
    const playerTurn = document.querySelector(".player-turn");
    const buttonArea = document.querySelector(".button-area");
    const playNowButton = document.querySelector(".play-now-button");
    const playAgainButton = document.querySelector(".play-again-button");
    const game = gameController;
    let gameStart = false;
    let gameOver = false;
    let round;

   
    const showGameStatus = () =>{      
      turnCounter.textContent = `Turn: ${game.getCurrentTurn()}!`
      playerTurn.textContent = game.showTurn();
    }

    const showGameOverState = () =>{
      turnCounter.textContent = `${game.getActivePlayer().player.getPlayerName()} WINS!`;
      playerTurn.textContent = "GAME OVER!";
    }
    gameGrid.addEventListener("click", event =>{
      if (!gameOver && gameStart){
        let selectedCell = event.target.closest(".cell");
        if (!selectedCell) return;
       
        round = game.playRound(parseInt(selectedCell.id));
        
        if(round){
          selectedCell.textContent = game.getActivePlayer().player.getPlayerMark();

          selectedCell.textContent === "X" ? selectedCell.classList.add("icon-x") : selectedCell.classList.add("icon-o");
        
          const findWinner = game.isWinner();
          
          if(findWinner){
            gameOver = true;
            showGameOverState();
            playAgainButton.classList.remove("hidden-button");
          }else{
            game.switchTurn();
            showGameStatus();
          }
        }

        if(game.getCurrentTurn() === 10 && !gameOver){
          gameOver = true;
          turnCounter.textContent = "TIE!";
          playerTurn.textContent = "GAME OVER!";
          playAgainButton.classList.remove("hidden-button");
          return;
        }
      }
    });

    buttonArea.addEventListener("click", event =>{
        
      let button = event.target.closest("button");
      if(!button) return;

      if(button.classList.contains("play-now-button") && !gameStart){
        const player1Info = document.querySelector(".player1-info");
        const player2Info = document.querySelector(".player2-info");

        const player1Name = player1Info.value;
        const player2Name = player2Info.value;

        if(player1Name.length > 0 && player2Name.length > 0 && player1Name != player2Name){
          gameStart = true;
          gameController.createPlayers(player1Name, player2Name);
          
          playNowButton.classList.add("hidden-button");
          const divNameP1 = document.createElement("div");
          divNameP1.textContent = player1Name;

          const divNameP2 = document.createElement("div");
          divNameP2.textContent = player2Name;

          player1Info.replaceWith(divNameP1);
          player2Info.replaceWith(divNameP2);
          showGameStatus();

        }else{
          alert("Both names are empty or Are the same Type Again");
          return;
        }

        
      }
      else if(gameOver && button.classList.contains("play-again-button") && gameStart){
        gameOver = false;
        gameController.resetGame();
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
          cell.classList.contains("icon-x") ? cell.classList.remove("icon-x") : cell.classList.remove("icon-o");
          
          cell.textContent = "";
        });
        playAgainButton.classList.add("hidden-button");

        showGameStatus();
      }
    });
    

  return {showGameStatus,showGameOverState};
})();




const controller = uiController;














