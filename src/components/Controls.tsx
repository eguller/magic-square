import React from 'react'
import State from '../game/State';
import '../styles/styles.css'

function Controls({state, onGameSizeChange, onNewGameClick, onBackButtonClick}: {state: State, onGameSizeChange: any, onNewGameClick: any, onBackButtonClick: any}) {
  const isBackButtonDisabled = state.isInitialState() ? "bg-blue-300 focus:outline-none disabled:opacity-25 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 cursor-pointer";
    return (
        <div className='bg-gray-100 grid grid-flow-row grid-cols-1 rounded-xl'>
          <div className='flex justify-between border-b-black border-b-2'>
            <div className='m-3'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2 items-center" onClick={onNewGameClick}>
                <span>New Game</span>
              </button>
            </div>
            <div className='m-3'>
              <button className={`text-white font-bold px-4 py-2  rounded inline-flex items-center ${isBackButtonDisabled}`} onClick={onBackButtonClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="fill-current w-4 h-4 mr-2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
  </svg>
                <span>Back</span>
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='border-b-2 border-r-2 rounded-br-md border-black w-24'>
                <span className='b'>Game Size</span>
            </div>
            <div className="flex justify-between m-3">
              {
                [5,6,7,8,9, 10].map((size) => {
                  const isCurrentSize = state.size === size ? "bg-blue-500" : "bg-blue-300 hover:bg-blue-700";
                  return <button className={`${isCurrentSize} text-white rounded px-2 py-1 items-center`} onClick={() => onGameSizeChange(size)}>
                    <span>{size} x {size}</span>
                  </button>
                })
              }
            </div>
          </div>
        </div>
    );
}

export default Controls