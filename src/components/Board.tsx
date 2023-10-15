import React from 'react'
import CellComponent from './Cell'
import '../styles/styles.css'
import State from '../game/State'

function Board({state, onCellClick}: {state: State, onCellClick: any}) {
  return (
    <div className="flex justify-center">
      <div className={`grid grid-cols-${state.size} gap-0.5 flex items-center justify-center`}>
          {
          state.cells.map((row, rowIndex) => {
              return row.map((cell, columnIndex) => {
                  return <CellComponent key={`cell-${rowIndex}-${columnIndex}`} cell={cell} isNextMove={state.isNextMove(cell)} beginningOfTheGame={state.isInitialState()} currentCell={cell.positionEquals(state.currentCell)} onClick={onCellClick} gameSize={state.size} />
              });
          })
          }
      </div>
    </div>
  );  
};

export default Board;