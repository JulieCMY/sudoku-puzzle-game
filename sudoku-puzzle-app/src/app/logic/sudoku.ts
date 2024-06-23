export const getSudokuCellIndex = (rowIndex: number, colIndex: number): number => {
    return rowIndex * 9 + colIndex
}