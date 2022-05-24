import React, { useEffect, useState } from "react"

const Cell = ({ index, nextPlayer, onClick, reset, isWin }) => {

  const [content, setContent] = useState('');

  const press = () => {
    if (content === '') {
      setContent(nextPlayer);
      onClick(index, content === '' && nextPlayer);
    }
  }

  useEffect(() => {
    reset === true && content !== '' && setContent('');
  }, [reset]);

  return (
    <span
      className={`flex justify-center items-center w-full aspect-square cursor-pointer select-none active:scale-[0.97] transition-all rounded-lg ${isWin ? 'bg-white text-cell' : 'bg-cell text-cream'}`}
      onClick={press}
    >
      {content === 'x' && 
        <svg className="fill-current w-14 h-14 sm:w-20 sm:h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>      }
      {content === 'o' &&
        <svg className="fill-current w-14 h-14 sm:w-20 sm:h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 32.01c-123.5 0-224 100.5-224 224s100.5 224 224 224s224-100.5 224-224S347.5 32.01 224 32.01zM224 416c-88.22 0-160-71.78-160-160s71.78-159.1 160-159.1s160 71.78 160 159.1S312.2 416 224 416z" /></svg>      }
    </span>
  )

}
export default Cell

