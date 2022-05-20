import Board from './components/game/board'

const App = () => {
  return (
    <div className="flex flex-col justify-start w-full max-w-lg mx-auto h-screen py-10 sm:py-40 bg-gray-50 uppercase">
      <header className="">
        <h1 className="text-2xl sm:text-3xl text-indigo-400 font-bold text-center mb-10 select-none">Let's play some tic tac toe!</h1>
      </header>
      <main className="flex flex-col justify-between items-center">
        <Board />
      </main>
    </div>
  );
}

export default App;
