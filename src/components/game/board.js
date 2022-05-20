import React, { useMemo, useState } from "react"
import Cell from "./cell"
import Button from '../button/button'

const Board = ({ firstPlayer = 'x' }) => {

  // Could provide a way for users to choose the first player to start the game (in future)
  const [nextPlayer, setNextPlayer] = useState(firstPlayer);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const reset = () => {
    setXMoves([]);
    setOMoves([]);
    setGameOver(false);
    setWinner(``);
  }

  const winCheck = (player, moves) => {
    let results = winCombinations.map(x => x.every(x => moves.includes(x)));
    if (moves.length <= 5 && results.includes(true)) {
      setWinner(`player ${player} has won!`);
      setGameOver(true);
    } else if (moves.length > 0 && moves.length === 5 && !results.includes(true)) {
      setWinner(`it's a draw!`);
      setGameOver(true);
    }
  }

  useMemo(() => {
    winCheck(currentPlayer, xMoves);
    winCheck(currentPlayer, oMoves);
  }, [xMoves, oMoves]);

  const handleMove = (index, content) => {
    content === 'x' ? setXMoves([...xMoves, index]) : setOMoves([...oMoves, index]);
    setCurrentPlayer(content);
    nextPlayer === 'x' ? setNextPlayer('o') : setNextPlayer('x');
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-2xl font-bold text-center capitalize w-full mb-5 select-none text-black">next player: <span className="text-rose-500">{nextPlayer}</span></h2>
      <div className={`grid grid-cols-3 gap-0 my-5 relative w-full ${gameOver ? 'pointer-events-none' : ''}`}>
        {cells.map((x, i) => (
          <Cell key={x + i} index={x} nextPlayer={nextPlayer} onClick={handleMove} reset={gameOver} />
        ))}
        <span 
          className={`${gameOver ? 'flex' : 'hidden'} justify-center items-center rounded-lg absolute top-0 left-0 w-full h-full z-10 bg-white bg-opacity-90 text-rose-500 capitalize text-3xl font-bold select-none [text-shadow:1px_1px_#bebebe]`}
        >
          {winner}
        </span>
      </div>
      <Button
        text="reset"
        className="bg-rose-500 mt-4 border-rose-500 rounded-lg text-white text-xl font-bold w-full uppercase"
        onClick={reset}
      />
    </div>
  )

}
export default Board

