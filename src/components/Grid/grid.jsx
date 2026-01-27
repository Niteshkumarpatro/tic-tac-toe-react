import { toast, ToastContainer } from "react-toastify";
import Card from "../Card/card";
import "./grid.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import isWinner from "../../helpers/checkWinner";

function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true); // false->x,true->0
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (turn === true) {
      // eslint-disable-next-line react-hooks/immutability
      board[index] = "O";
    } else {
      board[index] = "x";
    }
    const win = isWinner(board, turn ? "O" : "x");

    console.log("winner is", win);

    if (win) {
      setWinner(win);
      toast.success(`Congratulations ${win} win the game!!`);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className="grid-wrapper">
      <ToastContainer position="top-center" />

      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}

      <h1 className="turn-highlight">Current Turn :{turn ? "o" : "x"}</h1>
      <div className="grid">
        {board.map((value, idx) => {
          return <Card gameEnd={winner?true:false} onPlay={play} player={value} key={idx} index={idx} />;
        })}
      </div>
    </div>
  );
}

export default Grid;
