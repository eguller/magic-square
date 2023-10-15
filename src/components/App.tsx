import React, { useState } from 'react';
import '../styles/styles.css'
import Header from './Header'
import Board from './Board';
import Controls from './Controls';
import State from '../game/State';
import Cell from '../game/Cell';
function App() {
  const [gameSize, setGameSize] = useState(5); // [gameSize, setGameSize
  const [state, setState] = useState(State.init(gameSize));

  
  const onCellClick = (cell: Cell) => {
    if(cell.isEmpty()){
      const nextCell = state.toNextCellAt(cell.row, cell.column);
      if(state.canMoveTo(nextCell)){
        const nextState = state.moveTo(nextCell);
        setState(nextState);
      }
    } else {

    }    
  }

  const onNewGameClick = () => {
    setState(State.init(gameSize));
  }

  const onGameSizeChange = (size: number) => {
  
    setGameSize(size);
    setState(State.init(size));
  }

  const onBackButtonClick = () => {
    const nextState = state.back();
    setState(nextState);
  }

  const backButtonOnClick = state.isInitialState() ? () => void(0) : onBackButtonClick;
  

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-8 max-w-lg">
        <Header state={state} />
        <Board state={state} onCellClick={onCellClick}/>
        <Controls state={state} onGameSizeChange={onGameSizeChange} onNewGameClick={onNewGameClick} onBackButtonClick={backButtonOnClick} />
      </div>
    </div>
    
  )
}

export default App

