class Cell {
    value: number;
    row: number;
    column: number;
    constructor(value: number, row: number, colum: number){
        this.value = value;
        this.row  = row;
        this.column = colum;
    }

    isEmpty(): boolean {
        const isEmpty = !this.value || this.value === 0;
        return isEmpty;
    }

    valueEquals(cell: Cell): boolean {
        return this.value === cell.value && this.positionEquals(cell);
    }

    positionEquals(cell: Cell | undefined): boolean {
        if(!cell) return false;
        
        return this.row === cell.row && this.column === cell.column;
    }
};

export default Cell;