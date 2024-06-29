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

    // find duplicates in 3 x 3 set
    for (let row = 0; row < playerData.length; row = row + 3) {
        for (let col = 0; col < playerData[0].length; col = col + 3) {
            const counter: ObjectCollection<number[]> = {}
            for (let colIndex = col; colIndex < col + 3; colIndex++) {
                for (let rowIndex = row; rowIndex < row + 3; rowIndex++) {
                    const cellValue = playerData[rowIndex][colIndex]
                    if (!!cellValue) {
                        counter[cellValue] = counter[cellValue] || []
                        counter[cellValue]?.push(getSudokuCellIndex(rowIndex, colIndex))
                    }
                }
            }
            Object.keys(counter).map(cellValue => {
                const cellIndexList = counter[cellValue] ?? []
                if (cellIndexList.length > 1) {
                    duplicatesList = [...duplicatesList, ...cellIndexList]
                }
            })
        }
    }


    return duplicatesList.filter((value, index, self) => {
        return self.indexOf(value) === index
    })
}

export const getAllCandidateList = (cellIndex: number, sudokuData: number[][]): number[] => {
    const { rowIndex, colIndex } = getSudokuRowColIndex(cellIndex)
    const allCandidateList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return allCandidateList.filter(candidate => {
        const rowList = sudokuData[rowIndex]
        const colList = sudokuData.map(row => row[colIndex])
        let threeTimesThreeList: number[] = []
        const rowStartIndex = Math.floor(rowIndex / 3) * 3
        const colStartIndex = Math.floor(colIndex / 3) * 3
        for (let row = rowStartIndex; row < rowStartIndex + 3; row ++) {
            for (let col = colStartIndex; col < colStartIndex + 3; col ++) {
                threeTimesThreeList = [...threeTimesThreeList, sudokuData[row][col]]
            }
        }

        return !rowList.some(rowValue => rowValue === candidate) && !colList.some(colValue => colValue === candidate) && !threeTimesThreeList.some(threeSetValue => threeSetValue === candidate)
    })
}