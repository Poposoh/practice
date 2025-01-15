//实现井字棋游戏
import 'src/App.css';
import { useState } from 'react';
function TictactoeGame() {
  return (
    <div className='gameBox'>
      <Game />
    </div>
  )
}
export default TictactoeGame;

interface SquareProps {
  value: string | null;
  winner: boolean;
  handleSquareClick: (index:number) => void;
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string| null)[];
  onPlay: (squares: (string | null)[]) => void;
}

const Square: React.FC<SquareProps> = ({value, winner, handleSquareClick}) => {
  return (
    <button className='square' style={{background: winner ? "red" : ""}} onClick={() => handleSquareClick}>{value}</button>
  )
}

const Board: React.FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  const winnerArr = caculateWinner(squares) || [];
  let hasNull = squares.includes(null);
  let status:string;
  if(winnerArr.length) {
    status = `Winner is: ${squares[winnerArr[0]]}`
  } else {
    if(!hasNull) {
      status = "End in a draw!!"
    } else {
      status = `Next player is: ${xIsNext ? "X" : "O"}`
    }
  }
  const handleSquareClick = (index:number) => {
    if(squares[index] || caculateWinner(squares)) {
      return;
    }
    const tempSquares = [...squares];
    tempSquares[index] = xIsNext ? "X" : "O";
    onPlay(tempSquares);
  }
  return (
    <>
      <div className='winner'>{status}</div>
      <div className='board'>
        {squares.length && squares.map((item, index)=>{
          return <Square key={index} winner={winnerArr.includes(index)} handleSquareClick={() => handleSquareClick(index)} value={item}/>
        })}
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0; 
  function handlePlay(nextSquares:string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(index:number) {
    setCurrentMove(index);
  }
  const move = history.map((squares, index) => {
    let description;
    if(index > 0) {
      description = `Go to ${index} step`
    } else {
      description = "Go to game start"
    }
    return(
      <li key={index}>
        <span>You are at move # {index}</span>
        <br />
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={() => handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </div>
  )
}

function caculateWinner(squares:(string | null)[]) {
  const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < winner.length; i++) {
    const [a, b, c] = winner[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return squares[a];
      return [a, b, c]
    }
  }
  return null;
}