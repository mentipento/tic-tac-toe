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

  let playerOneName = "Peter";
  let playerTwoName = "Klaus"

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

  return {
      players,
      getActivePlayer,
      switchActivePlayer
  }

}

function GameController() {

  let board = Gameboard();
  const players = Players();

  const resetBoard = () => {
    board = Gameboard();
    console.log("Board has been reset.");
    return board.board;
  }

  const checkWin = () => {
    const winningCombinations = [
// rows
      [[0,0] , [0,1] , [0,2]],
      [[1,0] , [1,1] , [1,2]],
      [[2,0] , [2,1] , [2,2]],
// columns
      [[0,0] , [1,0] , [2,0]],
      [[0,1] , [1,1] , [2,1]],
      [[0,2] , [1,2] , [2,2]],
// diagonal
      [[0,0] , [1,1] , [2,2]],
      [[0,2] , [1,1] , [2,0]],
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

  }

  const selectField = (row, column) => {
    if (board.board[row][column] === 0) {
      board.board[row][column] = (players.getActivePlayer() === players.players[0].name) ? players.players[0].token : players.players[1].token;

    if (checkWin() === 1 ) {
      console.log(`${players.getActivePlayer()} has won!`);
      return board.board;
    }

      players.switchActivePlayer();
      return board.board;
    } else {
      console.log("This field is not empty. Choose again, please.")
      return
    }
  }
  return {
      selectField,
      resetBoard,
      checkWin
  };

}

const game = GameController()