import { useState } from "react";
import Cell from "./Cell"
import PlayerTurn from "./PlayerTurn";
import Banner from "./Banner";


var XPlays = [];
var OPlays = [];
var isWin = false;
var isDraw = false;


const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Game() {
  let cells = [];

  const [currentPlayer, toggleCurrentPlayer] = useState('X');

  const [bannerMessage, setBannerMessage] = useState('');

  const [boardState, setBoardState] = useState(["", "", "", "", "", "", "", "", ""]);

  const setBanner= (message) => setBannerMessage(() => {
    return message;
  })

  const setBoard = (index, player) => setBoardState((prev) => {
    prev[index] = player;
    return prev;
  })

  const togglePlayer = () => toggleCurrentPlayer((prev) => {
    return (prev === 'X') ? 'O' : 'X';
  })

  function handleRestart() {
    for (let i = 0; i < 9; i++) {
      setBoard(i, "");
    }
    XPlays = [];
    OPlays = [];
    isWin = false;
    isDraw = false;
    if (currentPlayer === 'O') togglePlayer();
    setBanner('');
  }

  async function checkWinOrDraw(plays) {
    if (plays.length >= 3) {
      for (let combination of WINNING_COMBINATIONS) {
        if (plays.includes(combination[0]) && plays.includes(combination[1]) && plays.includes(combination[2])) {
          isWin = true;
         setBanner(currentPlayer + ' wins!');
        }
      }
      await delay(10);
      if (boardState.every(cell => cell !== "") && !isWin) {
        isDraw = true;
        setBanner('Game is a draw');
      }
    }
  }

  async function handleClick(index) {
    if (boardState[index] === "" && !isWin) {
      setBoard(index, currentPlayer);
      if (currentPlayer === 'X') {
        XPlays.push(index);
        XPlays.sort();
        checkWinOrDraw(XPlays);
      }
      else {
        OPlays.push(index);
        OPlays.sort();
        checkWinOrDraw(OPlays);
      }
      togglePlayer();
    }
  }

  for (let i = 0; i < 9; i++) {
    cells.push(<Cell key={i} index={i} click={() => handleClick(i)} cellState={boardState[i]} />);
  }

  return (
    <div className="game" id="game">
      <div className="board" id="board">
        {cells}
      </div>
      <PlayerTurn currentPlayer={!isWin && !isDraw && currentPlayer } />
      <Banner clickRestart={() => handleRestart()} message={bannerMessage} />
    </div>
  )
}


export default Game