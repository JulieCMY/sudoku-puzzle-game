import { ObjectCollection, PlayerMatrics } from "../models/sudoku"

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

export const findDuplicateCellIndex = (playerData: number[][]): number[] => {
    let duplicatesList: number[] = []

    // find duplicates in rows
    playerData.map((rowData: number[], rowIndex: number) => {
        const counter: ObjectCollection<number[]> = {}
        rowData.map((cellValue: number, colIndex: number) => {
            if(!!cellValue) {
                counter[cellValue] = counter[cellValue] || []
                counter[cellValue]?.push(getSudokuCellIndex(rowIndex, colIndex))
            }
        })
        Object.keys(counter).map(cellValue => {
            const cellIndexList = counter[cellValue] ?? []
            if (cellIndexList.length > 1) {
                duplicatesList = [...duplicatesList, ...cellIndexList]
            }
        })
    })

    // find duplicates in columns
    for (let col = 0; col < playerData[0].length; col++) {
        const counter: ObjectCollection<number[]> = {}
        for (let row = 0; row < playerData.length; row++) {
            const cellValue = playerData[row][col]
            if (!!cellValue) {
                counter[cellValue] = counter[cellValue] || []
                counter[cellValue]?.push(getSudokuCellIndex(row, col))
            }
        }
        Object.keys(counter).map(cellValue => {
            const cellIndexList = counter[cellValue] ?? []
            if (cellIndexList.length > 1) {
                duplicatesList = [...duplicatesList, ...cellIndexList]
            }
        })
    }

    return duplicatesList.filter((value, index, self) => {
        return self.indexOf(value) === index
    })
}