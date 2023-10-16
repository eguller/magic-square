import React from 'react'
import Cell from '../game/Cell'
import State from '../game/State'
import '../styles/styles.css'


function Cell_Component({cell, state, onClick}: {cell: Cell, state: State, onClick: any}) {
    const gameSize = state.size;
    const isNextMove = state.isNextMove(cell);
    const beginningOfTheGame = state.isInitialState();
    const currentCell = cell.positionEquals(state.currentCell);
    const isGameOver = state.gameOver();
    const won = state.won();

    const width = getWidth(gameSize);
    const commondivStyles = `w-${width} rounded-md aspect-w-1 aspect-h-1`;
    const cellConfig: CellConfig = createCellConfig(cell, isNextMove, beginningOfTheGame, currentCell, isGameOver, won, onClick);

    return (
        <div className={`${commondivStyles} ${cellConfig.divStyle}`} onClick={() => cellConfig.onClick(cell)}>
            <span className={`flex items-center justify-center ${cellConfig.spanStyle} font-mono rounded-md`}>{cellConfig.value}</span>
        </div>
    );
    
}

function createCellConfig(cell: Cell, isNextMove: boolean, beginningOfTheGame: boolean, currentCell: boolean, isGameOver: boolean, won: boolean, onClick: any){
    
    if(cell.isEmpty()){
        if(isNextMove && !beginningOfTheGame){
            return new CellConfig("bg-green-200 cursor-pointer", "", "", onClick); 
        } else if(isNextMove && beginningOfTheGame){
            return new CellConfig("bg-gray-200 cursor-pointer", "", "", onClick);
        } else {
            return new CellConfig("bg-gray-200 cursor-not-allowed", "", "", () => void(0));
        }
    } else {
        if(currentCell){
            if(isGameOver) {
                if(won) {
                    return new CellConfig("bg-orange-300  ", "border-4 border-green-400", cell.value.toString(), onClick)
                } else {
                    return new CellConfig("bg-orange-300  ", "border-4 border-red-400", cell.value.toString(), onClick)     
                }
            } else {
                return new CellConfig("bg-orange-300  ", "border-4 border-blue-400", cell.value.toString(), onClick)
            }
        } else {
            return new CellConfig("bg-orange-300 cursor-pointer", "",  cell.value.toString(), onClick);
        }
    }
}

function getWidth(gameSize: number){
    if(gameSize === 5){
        return "16";
    } else if(gameSize === 6){
        return "14";
    } else if(gameSize === 7) {
        return "12";
    } else if(gameSize === 8) {
        return "11";
    } else if(gameSize === 9) {
        return "9";
    } else {
        return "8";
    }

}
class CellConfig {
    divStyle: string;
    spanStyle: string;
    value: string;
    onClick: any;

    constructor(divStyle: string, spanStyle: string, value: string, onClick: any){
        this.divStyle = divStyle;
        this.spanStyle = spanStyle;
        this.value = value;
        this.onClick = onClick;
    }
}

export default Cell_Component;