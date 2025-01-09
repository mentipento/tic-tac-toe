const rows = 3;
const columns = 3;
const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(0);
      }
    }


let playerOneName = "Peter";
let playerTwoName = "Klaus"

const players = [
        {
          name: playerOneName,
          token: 1
        },
        {
          name: playerTwoName,
          token: 2
        }
      ];



let activePlayer = playerOneName

const switchActivePlayer = () => {
  activePlayer === playerOneName ? activePlayer = playerTwoName : activePlayer = playerOneName
}

      const selectField = (row, column) => {
        board[row][column] = (activePlayer === players[0].name) ? players[0].token : players[1].token;
        switchActivePlayer();
        return board;
      }