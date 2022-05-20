import React, { useMemo, useState } from "react"
import Cell from "./cell"
import Button from '../button/button'

const Board = ({ firstPlayer = 'x' }) => {

  // Could provide a way for users to choose the first player to start the game (in future)
  const [nextPlayer, setNextPlayer] = useState(firstPlayer);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState('No winners yet!');
  const [gameOver, setGameOver] = useState(false);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const reset = () => {
    setXMoves([]);
    setOMoves([]);
    setGameOver(false);
    setWinner(`No winners yet!`);
    console.log('reset!', gameOver);
  }

  const winCheck = (player, moves) => {
    let results = winCombinations.map(x => x.every(x => moves.includes(x)));
    if (moves.length < 6) {
      if (results.includes(true)) {
        setWinner(`player ${player} has won!`);
        setGameOver(true);
      }
    } else {
      reset();
    }
    console.log(moves);
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
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-center capitalize w-full mb-7 select-none text-black">next player: <span className="text-rose-500">{nextPlayer}</span></h2>
      <div className={`grid grid-cols-3 gap-0 ${gameOver ? 'pointer-events-none' : ''}`}>
        {cells.map((x, i) => (
          <Cell key={x + i} index={x} nextPlayer={nextPlayer} onClick={handleMove} reset={gameOver} />
        ))}
      </div>
      <span className="capitalize my-5 text-xl font-bold select-none">{winner}</span>
      <Button
        text="reset"
        className="bg-rose-500 border-rose-500 rounded text-white text-lg font-bold w-32 capitalize"
        onClick={reset}
      />
    </div>
  )

}
export default Board

