import Board from './components/game/board'

const App = () => {
  return (
    <div className="flex flex-col justify-start w-full max-w-lg mx-auto h-screen py-10 px-12 sm:py-40 bg-main-bg">
      <header className="">
        <h1 className="text-4xl text-cell font-bold text-center mb-10 select-none uppercase">tic tac toe!</h1>
      </header>
      <main className="flex flex-col justify-between items-center">
        <Board />
      </main>
    </div>
  );
}

export default App;
