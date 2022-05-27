import React, { useEffect, useState } from "react"
import Cell from "./cell"
import Button from '../button/button'

const Board = ({ firstPlayer = 'x' }) => {

  const [nextPlayer, setNextPlayer] = useState(firstPlayer);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState('');
  const [winMove, setWinMove] = useState({isWin: false, cells: []});
  const [scores, setScores] = useState({'x': 0, 'o': 0});
  const [gameOver, setGameOver] = useState(false);
  const [clearCell, setClearCell] = useState(false);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [rowSize, setRowSize] = useState(5);
  const maxMoves = Math.ceil((rowSize ** 2) / 2);
  const boardCells = [];
  for (let i = 1; i < (rowSize ** 2) + 1; i++) {
    boardCells.push(i);
  }

  const checkWin = (moves, size) => {
    moves.map(x => {
      if ([x - 1, x, x + 1].every(y => moves.includes(y)) && (x % rowSize > 1)) {
        setWinMove({isWin: true, cells: [x - 1, x, x + 1]});
      }
      if ([x - size, x, x + size].every(y => moves.includes(y)) && (x > rowSize) && ((rowSize ** 2 - x) > rowSize)) {
        setWinMove({isWin: true, cells: [x - size, x, x + size]});
      }
      if ([x + (size - 1), x, x - (size - 1)].every(y => moves.includes(y)) && (x > rowSize) && (x % rowSize > 1) && ((rowSize ** 2 - x) > rowSize)) {
        setWinMove({isWin: true, cells: [x + (size - 1), x, x - (size - 1)]});
      }
      if ([x + (size + 1), x, x - (size + 1)].every(y => moves.includes(y)) && (x > rowSize) && (x % rowSize > 1) && ((rowSize ** 2 - x) > rowSize)) {
        setWinMove({isWin: true, cells: [x + (size + 1), x, x - (size + 1)]});
      }
    })
  }

  const checkMove = (moves, player) => {
    if (moves.length > 0 && moves.length <= maxMoves && winMove.isWin) {
      setWinner(`player ${player} has won!`);
      let newScore = player === 'x' ? { 'x': scores.x + 1, 'o': scores.o } : { 'x': scores.x, 'o': scores.o + 1 };
      setScores(newScore);
      setGameOver(true);
    } else if (moves.length > 0 && moves.length === maxMoves && !winMove.isWin) {
      setWinner(`it's a draw!`);
      setGameOver(true);
    }
  }

  useEffect(() => {
    checkMove(xMoves, currentPlayer);
    checkMove(oMoves, currentPlayer);
  }, [xMoves, oMoves, currentPlayer])

  const reset = () => {
    setXMoves([]);
    setOMoves([]);
    setGameOver(false);
    setClearCell(true);
    setWinner(``);
    setWinMove({isWin: false, cells: []});
  }

  const handleMove = (index, content, moves) => {
    setClearCell(false);
    let copyXMoves = xMoves;
    let copyOMoves = oMoves;
    content === 'x' ? copyXMoves.push(index) : copyOMoves.push(index);
    content === 'x' ? setXMoves(copyXMoves) : setOMoves(copyOMoves);
    setCurrentPlayer(content);
    nextPlayer === 'x' ? setNextPlayer('o') : setNextPlayer('x');
    checkWin(moves, rowSize);
  }

  const WelcomeScreen = () => {
    return <div className="mb-3">
      <label htmlFor="row-size" className="text-cream text-2xl font-bold mr-3 capitalize">board size :</label>
      <select id="row-size" value={rowSize} onChange={(e) => setRowSize(e.target.value)} className="rounded-lg outline-none cursor-pointer py-1 px-2 text-lg bg-cell text-cream">
        <option value={3}>3 x 3</option>
        <option value={4}>4 x 4</option>
        <option value={5}>5 x 5</option>
        <option value={6}>6 x 6</option>
        <option value={8}>8 x 8</option>
        <option value={10}>10 x 10</option>
      </select>
    </div>
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <WelcomeScreen />
      <h2 className="text-2xl font-bold text-center capitalize w-full mb-5 select-none text-cream">next player: <span className="text-rose-500">{nextPlayer}</span></h2>
      <div className="grid grid-cols-2 rounded-lg overflow-hidden mb-4 w-full">
        <div className="flex flex-col justify-center items-center">
          <span className="block w-full text-center text-lg font-bold text-cream bg-rose-500 capitalize py-2">player X</span>
          <span className="block w-full text-center text-3xl font-bold text-cell bg-cream capitalize py-2">{scores.x}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="block w-full text-center text-lg font-bold text-cream bg-rose-500 capitalize py-2">player O</span>
          <span className="block w-full text-center text-3xl font-bold text-cell bg-cream capitalize py-2">{scores.o}</span>
        </div>
      </div>
      <div style={{ '--size': rowSize }} className={`grid [grid-template-columns:repeat(var(--size),_1fr)] gap-1 my-5 relative w-full rounded-lg ${gameOver ? 'pointer-events-none' : ''}`}>
        {boardCells.map((x, i) => (
          <Cell key={x + i} index={x} nextPlayer={nextPlayer} onClick={(index, content) => handleMove(index, content, (content === 'x' ? xMoves : oMoves))} reset={clearCell} isWin={gameOver && winMove.cells.includes(x)} />
        ))}
        <span 
          className={`${gameOver ? 'flex' : 'hidden'} justify-center items-center absolute top-0 left-0 w-full h-full z-10 bg-main-bg bg-opacity-90 text-cream capitalize text-3xl font-bold select-none`}
        >
          {winner}
        </span>
      </div>
      <Button
        text="reset"
        className="bg-rose-500 mt-4 border-rose-500 rounded-lg text-cream text-xl font-bold w-full uppercase"
        onClick={reset}
      />
    </div>
  )

}
export default Board

