function Gameboard() {

  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
          board[i].push(0);
      }
  }

  return {
      board
  }

}

function Players() {

  let playerOneName = ""
  let playerTwoName = ""
  const players = [{
          name: playerOneName,
          token: 1
      },
      {
          name: playerTwoName,
          token: 2
      }
  ];

  let activePlayer = playerOneName

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
      activePlayer === playerOneName ? activePlayer = playerTwoName : activePlayer = playerOneName
  }

    // Setter-Methode für playerOneName
    const setPlayerOneName = (newName) => {
        if (activePlayer === playerOneName) {
            activePlayer = newName; // Synchronisiere activePlayer, falls er Player 1 ist
        }
        playerOneName = newName;
        players[0].name = newName; // Aktualisiere das players-Array
    };
  
    // Setter-Methode für playerTwoName
    const setPlayerTwoName = (newName) => {
        if (activePlayer === playerTwoName) {
            activePlayer = newName; // Synchronisiere activePlayer, falls er Player 2 ist
        }
        playerTwoName = newName;
        players[1].name = newName; // Aktualisiere das players-Array
    };

  return {
      players,
      getActivePlayer,
      switchActivePlayer,
      setPlayerOneName,
      setPlayerTwoName,
      playerOneName,
      playerTwoName
  }

}

function GameController() {




  let board = Gameboard();
  const players = Players();
  const results = document.querySelector("#results")

  const resetBoard = () => {
      board = Gameboard();
      console.log("Board has been reset.");
      console.log(board.board);
      return
  }

  const checkWin = () => {
      const winningCombinations = [
          // rows
          [
              [0, 0],[0, 1],[0, 2]
          ],
          [
              [1, 0],[1, 1],[1, 2]
          ],
          [
              [2, 0],[2, 1],[2, 2]
          ],
          // columns
          [
              [0, 0],[1, 0],[2, 0]
          ],
          [
              [0, 1],[1, 1],[2, 1]
          ],
          [
              [0, 2],[1, 2],[2, 2]
          ],
          // diagonal
          [
              [0, 0],[1, 1],[2, 2]
          ],
          [
              [0, 2],[1, 1],[2, 0]
          ],
      ]

      for (let combination of winningCombinations) {
          [a, b, c] = combination;

          if (
              board.board[a[0]][a[1]] !== 0 &&
              board.board[a[0]][a[1]] === board.board[b[0]][b[1]] &&
              board.board[a[0]][a[1]] === board.board[c[0]][c[1]]
          ) {
              return board.board[a[0]][a[1]];
          }
      }
      if (board.board.every(row => row.every(cell => cell > 0))) {
          return 0;
      }
  }

  const selectField = (row, column) => {
      if (board.board[row][column] === 0) {
          board.board[row][column] = (players.getActivePlayer() === players.players[0].name) ? players.players[0].token : players.players[1].token;

          if (checkWin() === 1 || checkWin() === 2) {
              console.log(`${players.getActivePlayer()} has won!`);
              results.textContent = `${players.getActivePlayer()} has won!`
              console.log(board.board);
              return
          } else if (checkWin() === 0) {
              console.log("It's a draw!")
              console.log(board.board);
              results.textContent = "It's a draw!"
              return
          }

          players.switchActivePlayer();
          console.log(board.board);
          return
      } else {
          console.log("This field is not empty. Choose again, please.");
          console.log(board.board);
          return
      }
  }

  const enterNames = document.querySelector("#enter-names-dialog");
  enterNames.showModal();
  enterNames.addEventListener("close", () => {
      let playerOneNameInput = document.querySelector("#inputPlayerOneName");
      let playerTwoNameInput = document.querySelector("#inputPlayerTwoName");
  
      if (playerOneNameInput && playerTwoNameInput) {
          let playerOneName = inputPlayerOneName.value;
          let playerTwoName = inputPlayerTwoName.value;
          game.players.setPlayerOneName(playerOneName);
          game.players.setPlayerTwoName(playerTwoName)
  
          // Update player names in the Players object
  
      }
  });
  
  document.querySelector("#start-game").addEventListener("click", () => {
      enterNames.close();
  });
  
  document.querySelector("#reset-game").addEventListener("click", () => {
      game.resetBoard();
      const fields = document.querySelectorAll(".field");
      const results = document.querySelector("#results")
      fields.forEach((field) => {
          field.textContent = "";
      }
      )
      results.textContent = "Game initialised"
      enterNames.showModal();
  }
  )

  return {
      selectField,
      resetBoard,
      checkWin,
      players
  };

}

function GameUI(game) {
    const fields = document.querySelectorAll(".field");
    const results = document.querySelector("#results")

    const handleFieldClick = (event) => {
        if (game.checkWin()) 
            return;
        if (event.target.textContent !== "") {
            console.log("This field is already taken.");
            results.textContent = "This field is already taken."
            return;
        }
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        console.log(`${game.players.getActivePlayer()} selected cell: Row ${row}, Column ${col}`);
        results.textContent = `${game.players.getActivePlayer()} selected cell: Row ${row}, Column ${col}`
        event.target.textContent = game.players.getActivePlayer() === game.players.players[0].name ? "X" : "O";
        game.selectField(row, col);
    };

    const init = () => {
        fields.forEach((field) => field.addEventListener("click", handleFieldClick));
        console.log("Game initialized.");
        results.textContent = "Game initialized."

    };

    return {
        init
    };
}

const game = GameController();
const gameUI = GameUI(game);
gameUI.init();
