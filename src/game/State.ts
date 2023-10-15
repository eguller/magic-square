
import Cell from './Cell'

class State {
    size: number;
    cells: Cell[][] = [[]];
    currentCell?: Cell;
    constructor(size: number, cells: number[][]) {
        this.size = size;
        let maxNumber: number = 0;
        for(let i = 0; i < size; i++){
            this.cells[i] = [];
            for(let j = 0; j < size; j++){
                if(cells[i][j] > maxNumber && cells[i][j] > 0){
                    maxNumber = cells[i][j];
                    this.currentCell = new Cell(cells[i][j], i, j);
                    
                }
                this.cells[i][j] = new Cell(cells[i][j], i, j);
            }
        }
      }

      findNextMoves(): Cell[] {       
        if(this.currentCell){
            const nextMoves: Cell[] = [];
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row - 3 , this.currentCell.column));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row + 3 , this.currentCell.column));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row, this.currentCell.column - 3));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row, this.currentCell.column + 3));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row - 2, this.currentCell.column - 2));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row + 2, this.currentCell.column - 2));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row - 2, this.currentCell.column + 2));
            nextMoves.push(new Cell(this.currentCell.value + 1, this.currentCell.row + 2, this.currentCell.column + 2));
            const validMoves = nextMoves.filter((cell) => this.canMoveTo(cell));
            return validMoves;
        } else {
            //all cells are possible as next move.
            const validMoves: Cell[] = [];
            for(let i = 0; i < this.size; i++){
                for(let j = 0; j < this.size; j++){
                    validMoves.push(new Cell(1, i,j));
                }
            }
            return validMoves;
        }
      }

      isNextMove(cell: Cell): boolean {
        const nextMove = this.findNextMoves().find((nextMove) => nextMove.positionEquals(cell));
        return !!nextMove;
      }

      gameOver(): boolean {
        return this.findNextMoves().length === 0;
      }

      won(): boolean {
        return this.gameOver() && this.currentCell?.value === this.size * this.size;
      }

      canMoveTo(cell: Cell): boolean {
        if(cell.row < 0 || cell.row >= this.size || cell.column < 0 || cell.column >= this.size){
            return false;
        }
        if(this.cells[cell.row][cell.column].value !== 0){
            return false;
        }
        if(this.currentCell && cell.value !== this.currentCell.value + 1){
            return false;
        }

        if(this.currentCell){
            const rowDiff = Math.abs(this.currentCell.row - cell.row);
            const columnDiff = Math.abs(this.currentCell.column - cell.column);
            if(rowDiff === 3 && columnDiff === 0) {
                return true;
            } else if (columnDiff === 3 && rowDiff === 0){
                return true;
            } else if(rowDiff === 2 && columnDiff === 2){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
      }

      moveTo(cell: Cell): State {
        if(!this.canMoveTo(cell)){
            throw new Error("Invalid move");
        }
        const cells: number[][] = [[]];
        for(let i = 0; i < this.size; i++){
            cells[i] = [];
            for(let j = 0; j < this.size; j++){
                if (i === cell.row && j === cell.column) {
                    cells[i][j] = cell.value;
                } else {
                    cells[i][j] = this.cells[i][j].value;
                }
            }
        }
        const newState = new State(this.size, cells);
        return newState;
      }

      findCellWithMostNonEmptyNeighbours(): Cell {
        let maxNeighbours = 0; 
        const nextMoves = this.findNextMoves();
        if(nextMoves.length === 0){
            throw new Error("No next moves");
        }
        let cellWithMostNeighbours = nextMoves[0];
        for(let i = 1; i < nextMoves.length; i++){
            const numberOfNeighbours = this.findNumberOfNonEmptyNeighbours(nextMoves[i]);
            if(numberOfNeighbours > maxNeighbours){
                maxNeighbours = numberOfNeighbours;
                cellWithMostNeighbours = nextMoves[i];
            }
        }
        return cellWithMostNeighbours;
      }

      findNumberOfNonEmptyNeighbours(cell: Cell): number {
        let neighbors = 0;
        if (cell.row - 2 >= 0 && cell.column >= 0 && this.cells[cell.row - 2][cell.column].value !== 0) {
            neighbors++;
        }
        if (cell.row + 2 < this.size && cell.column >= 0 && this.cells[cell.row + 2][cell.column].value !== 0) {
            neighbors++;
        }
        if (cell.row >= 0 && cell.column - 2 >= 0 && this.cells[cell.row][cell.column - 2].value !== 0) {
            neighbors++;
        }
        if (cell.row >= 0 && cell.column + 2 < this.size && this.cells[cell.row][cell.column + 2].value !== 0) {
            neighbors++;
        }
        if (cell.row - 1 >= 0 && cell.column - 1 >= 0 && this.cells[cell.row - 1][cell.column - 1].value !== 0) {
            neighbors++;
        }
        if (cell.row + 1 < this.size && cell.column - 1 >= 0 && this.cells[cell.row + 1][cell.column - 1].value !== 0) {
            neighbors++;
        }
        if (cell.row - 1 >= 0 && cell.column + 1 < this.size && this.cells[cell.row - 1][cell.column + 1].value !== 0) {
            neighbors++;
        }
        if (cell.row + 1 < this.size && cell.column + 1 < this.size && this.cells[cell.row + 1][cell.column + 1].value !== 0) {
            neighbors++;
        }
        return neighbors;
      }
      public static init(size: number): State {
        const state = new State(size, Array.from(Array(size), () => Array(size).fill(0)));
        return state;
      }

      clone(): State {   
        const cells: number[][] = [[]];
        for(let i = 0; i < this.size; i++){
            cells[i] = [];
            for(let j = 0; j < this.size; j++){
                cells[i][j] = this.cells[i][j].value;
            }
        }
        const newState = new State(this.size, cells);
        return newState;
      }

      findSolution(): State | undefined {
        let currentState = this.clone();
        const solution = State._findSolution(currentState);
        return solution;
      }

    private static  _findSolution(state: State): State | undefined {
            if(state.gameOver()){
                if(state.won()){
                    return state;
                } else {
                    return undefined;
                }
            }
            const nextMoves = state.findNextMoves();
            const nextMovesWithNeighbors = nextMoves.map((cell) => { 
                return {cell, numberOfNeighbors: state.findNumberOfNonEmptyNeighbours(cell)}
            }).sort((a, b) => b.numberOfNeighbors - a.numberOfNeighbors);
            
            for(let i = 0; i < nextMovesWithNeighbors.length; i++){
                const nextState = state.moveTo(nextMovesWithNeighbors[i].cell);
                const solution = State._findSolution(nextState);
                if(solution){
                    return solution;
                }
            }
            return undefined;
        }

        isInitialState(): boolean {
            return this.currentCell ? false : true;
        }

        isCurrentCell(row: number, column: number): boolean {
            if(!this.currentCell){
                return false;
            } else {
                const isCurrentCell = (this.currentCell.row === row && this.currentCell.column === column);
                return isCurrentCell;
            }
        }

        
        toNextCellAt(i: number, j: number){
            return new Cell(this.currentCell ? this.currentCell.value + 1 : 1, i, j );
        }

        toCellAt(i: number, j: number){
            if(i < 0 || j < 0 || i >= this.size || j >= this.size){
                throw new Error(`Invalid location: {${i}, ${j}}`)
            }
            return this.cells[i][j];
        }

        isEmpty(i: number, j: number) {

            const cell = this.cells[i][j];
            const isEmpty = cell.value === 0 ? true : false;
            return isEmpty;
        }

        back(): State {
            if(!this.currentCell){
                return this.clone();
            }
            const cells: number[][] = [[]];
            for(let i = 0; i < this.size; i++){
                cells[i] = [];
                for(let j = 0; j < this.size; j++){
                    if (i === this.currentCell.row && j === this.currentCell.column) {
                        cells[i][j] = 0;
                    } else {
                        cells[i][j] = this.cells[i][j].value;
                    }
                }
            }
            const newState = new State(this.size, cells);
            return newState;
        }

        toString(): string {
            let str = "";
            for(let i = 0; i < this.size; i++){
                for(let j = 0; j < this.size; j++){
                    str += this.cells[i][j].value + ",";
                }
                str += "\n";
            }
            return str;
        }
};


export default State;