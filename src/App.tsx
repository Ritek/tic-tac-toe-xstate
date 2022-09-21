import { useMachine } from '@xstate/react';
import './App.css';

import { gameMachine } from './lib/turnMachine'

function App() {
  const [state, send] = useMachine(gameMachine);

  const renderField = (id: number) => {
    if (state.context.board[id] === 0) return '';
    else if (state.context.board[id] === 1) return 'X';
    else return 'O';
  }

  const buttonClick = (field: number) => {
    const move = {field}
    send({type: 'MAKE_MOVE', ...move});
  }

  const resetBoard = () => {
    send({type: 'RESET'});
  }

  return (
    <div style={{width: "50%", margin: "auto", marginTop: "5%"}} className="App">
      <h2 className='gameMessage'>{state.context.message}</h2>
      <table>
        <tbody>
          <tr>
            <td><div className="content" onClick={() => buttonClick(0)}>{renderField(0)}</div></td>
            <td><div className="content" onClick={() => buttonClick(1)}>{renderField(1)}</div></td>
            <td><div className="content" onClick={() => buttonClick(2)}>{renderField(2)}</div></td>
          </tr>
          <tr>
            <td><div className="content" onClick={() => buttonClick(3)}>{renderField(3)}</div></td>
            <td><div className="content" onClick={() => buttonClick(4)}>{renderField(4)}</div></td>
            <td><div className="content" onClick={() => buttonClick(5)}>{renderField(5)}</div></td>
          </tr>
          <tr>
            <td><div className="content" onClick={() => buttonClick(6)}>{renderField(6)}</div></td>
            <td><div className="content" onClick={() => buttonClick(7)}>{renderField(7)}</div></td>
            <td><div className="content" onClick={() => buttonClick(8)}>{renderField(8)}</div></td>
          </tr>
        </tbody>
      </table>
      <button className="resetButton" onClick={() => resetBoard()}>Reset &#8634;</button>
    </div>
  );
}

export default App;
