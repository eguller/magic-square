import React from 'react'
import Cell from '../game/Cell'
import '../styles/styles.css'


function Cell_Component({cell, isNextMove, beginningOfTheGame, currentCell, onClick}: {cell: Cell, isNextMove: boolean, beginningOfTheGame: boolean, currentCell: boolean, onClick: any}) {
    const commondivStyles = "w-9 lg:w-12 xl:w-14 rounded-md aspect-w-1 aspect-h-1";
    const cellConfig: CellConfig = createCellConfig(cell, isNextMove, beginningOfTheGame, currentCell, onClick);

    return (
        <div className={`${commondivStyles} ${cellConfig.divStyle}`} onClick={() => cellConfig.onClick(cell)}>
            <span className={`flex items-center justify-center ${cellConfig.spanStyle} font-mono rounded-md`}>{cellConfig.value}</span>
        </div>
    );
    
}

function createCellConfig(cell: Cell, isNextMove: boolean, beginningOfTheGame: boolean, currentCell: boolean, onClick: any){
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
            return new CellConfig("bg-orange-300  ", "border-4 border-blue-400", cell.value.toString(), onClick)
        } else {
            return new CellConfig("bg-orange-300 cursor-pointer", "",  cell.value.toString(), onClick);
        }
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