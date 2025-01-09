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

  const board = Gameboard();
  const players = Players();
  const selectField = (row, column) => {
      board.board[row][column] = (players.getActivePlayer() === players.players[0].name) ? players.players[0].token : players.players[1].token;
      players.switchActivePlayer();
      return board.board;
  }
  return {
      selectField
  }
}

const game = GameController()