import { useState, forceUpdate } from "react";
import Cell from "./Cell"
import Restart from "./Restart";


var XPlays = [];
var OPlays = [];
var isWin = false;

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


function Board(props) {
  let cells = [];

  const [currentPlayer, toggleCurrentPlayer] = useState('X');

  const [boardState, setBoardState]= useState(["", "", "", "", "", "", "", "", ""]);
  
  const setBoard = (index, player) => setBoardState((prev) => {
    prev[index] = player;
    return prev;
  })


  const togglePlayer = () => toggleCurrentPlayer((prev) => {
    return (prev === 'X') ? 'O' : 'X';
  })

  //const [currentIndex, setcurrentIndex] = useState("");

  async function handleRestart() {
    for (let i = 0; i < 9; i++) {
      setBoard(i, "");
    }
    XPlays = [];
    OPlays = [];
    isWin = false;
    await delay(100);
    if (currentPlayer === 'O') togglePlayer();
  }

  async function checkWinOrDraw(plays) {
    if (plays.length >= 3) {

      console.log(boardState);

      for (let combination of WINNING_COMBINATIONS) {
        if (plays.includes(combination[0]) && plays.includes(combination[1]) && plays.includes(combination[2])) {
          console.log(`${currentPlayer} wins `);
          isWin = true;
        }
      }
      await delay(10);
      if (boardState.every(cell => cell !== "") && !isWin) {
        console.log('Game is a draw');
      }
    }
  }

  function handleClick(index) {
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
    console.log(index);

    console.log('XPlays: ' + XPlays);
    console.log('OPlays: ' + OPlays);

  }

  for (let i = 0; i < 9; i++) {
    cells.push(<Cell key={i} index={i} click={() => handleClick(i)} currentPlayer={currentPlayer} cellState={boardState[i]} />);
  }

  return (
    <div className="board" id="board">
      {cells}
      <Restart clickRestart={() => handleRestart()} />
    </div>
  )
}


export default Board