import { PlayerMatrics } from "../models/sudoku"

export const getSudokuCellIndex = (rowIndex: number, colIndex: number): number => {
    return rowIndex * 9 + colIndex
}

export const getSudokuRowColIndex = (cellIndex: number): {
    rowIndex: number,
    colIndex: number
} => {
    const rowIndex = Math.floor(cellIndex / 9)
    const colIndex = cellIndex % 9
    return {
        rowIndex,
        colIndex
    }
}

export const processSudokuPlayerData = (data: number[][], playerMatrics: PlayerMatrics): number[][] => {
    let playerData: number[][] = []
    data.map((rowData: number[], rowIndex: number) => {
        playerData = [
            ...playerData,
            [...rowData]
        ]
    })
    Object.keys(playerMatrics).map(cellIndex => {
        const { rowIndex, colIndex } = getSudokuRowColIndex(parseInt(cellIndex))
        playerData[rowIndex][colIndex] = playerMatrics[cellIndex]
    })
    return playerData
}