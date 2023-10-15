import React from 'react'
import State from '../game/State';
import '../styles/styles.css'

function Header({state}: {state: State}) {
    const message = getMessage(state);
    return (
        <div className='h-12 bg-yellow-400'>
            <p className='text-2xl text-center align-middle h-fit'><span>{message}</span>
            </p>
        </div>
    )
}

function getMessage(state: State){
    if(state.isInitialState()){
        return "Click any cell to begin"
    } else if(state.gameOver()){
        if(state.won()){
            return "You won! :)";
        } else {
            return "Game over! :(";
        }
    } else {
        return "Magic Square";
    }
}


export default Header