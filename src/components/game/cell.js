import React, { useEffect, useState } from "react"

const Cell = ({ index, nextPlayer, onClick, reset }) => {

  const [content, setContent] = useState('');

  const press = () => {
    if (content === '') {
      setContent(nextPlayer);
      onClick(index, content === '' && nextPlayer);
    }
  }

  useEffect(() => {
    reset === false && setContent('');
  }, [reset]);

  return (
    <span
      className="flex justify-center items-center w-full aspect-square cursor-pointer bg-indigo-400 text-white text-5xl font-bold select-none active:scale-[0.97] border border-white rounded-lg"
      onClick={press}
    >
      {content}
    </span>
  )

}
export default Cell

