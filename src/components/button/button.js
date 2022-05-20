import React from "react"

const Button = ({ text, type = "button", color = "white", textColor, outlined, disabled = false, className, leftIconClass, rightIconClass, autoFocus, name, value, onClick, loading = false, leftIcon, rightIcon }) => {

  let colorStyles = `${outlined ? 'bg-transparent text-[var(--color)]' : 'bg-[var(--color)] text-white'} border-2 border-[var(--color)]`;

  return (
    <button
      type={type}
      disabled={disabled}
      autoFocus={autoFocus}
      name={name}
      value={value}
      style={{ '--color': color, '--text-color': textColor }}
      className={`
      block min-h-6 select-none origin-center active:scale-[0.97] transition-transform duration-[75ms] py-2 px-3 shadow focus:outline-none 
      ${outlined ? 'bg-transparent' : ''} border-2
      ${disabled ? 'cursor-not-allowed bg-gray-400 border-gray-400' : 'cursor-pointer'} ${className}
      `}
      onClick={onClick}
    >
      {loading ?
        <svg className={`animate-spin mr h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        :
        <>
          <span className={`${leftIconClass}`}>{leftIcon}</span>
          {text}
          <span className={`${rightIconClass}`}>{rightIcon}</span>
        </>
      }
    </button>
  )

}
export default Button

