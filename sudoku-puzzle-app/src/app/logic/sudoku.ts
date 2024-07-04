import { ObjectCollection, PlayerMatrics } from "../models/sudoku"

/** 
 * Returns the index of a Sudoku cell from 0 to 80 based on its row and column index.
 * @param rowIndex the index of a certain sudoku cell's row
 * @param colIndex the index of a certain sudoku cell's column
 * @returns The index of sudoku cell from 0 to 80
 */
export const getSudokuCellIndex = (rowIndex: number, colIndex: number): number => {
    return rowIndex * 9 + colIndex
}

/**
 * Returns the row and column index of a Sudoku cell based on its index from 0 to 80.
 * 
 * @param cellIndex - The index of the Sudoku cell from 0 to 80.
 * @returns The index of the row and column of the cell.
 */
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

/**
 * Processes player data to update the Sudoku board with the player's matrix data.
 * 
 * @param data - The initial Sudoku board data as a 9 x 9 array.
 * @param playerMatrics - The player's matrix data as an object with cell indices as keys and values.
 * @returns The updated Sudoku board data as a 9 x 9 array.
 */
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

/**
 * Finds the indices of duplicate cells in the player's Sudoku data.
 * 
 * @param playerData - The player's Sudoku board data as a 9 x 9 array.
 * @returns An array of indices of duplicate cells.
 */
export const findDuplicateCellIndex = (playerData: number[][]): number[] => {
    let duplicatesList: number[] = []

    // find duplicates in rows
    playerData.map((rowData: number[], rowIndex: number) => {
        const counter: ObjectCollection<number[]> = {}
        rowData.map((cellValue: number, colIndex: number) => {
            if (!!cellValue) {
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

    // find duplicates in 3 x 3 Sub-grid
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

/**
 * Gets the list of all candidate numbers for a given Sudoku cell based on the current board data.
 * 
 * @param cellIndex - The index of the Sudoku cell from 0 to 80.
 * @param sudokuData - The current Sudoku board data as a 9 x 9 array.
 * @returns An array of candidate numbers for the cell.
 */
export const getAllCandidateList = (cellIndex: number, sudokuData: number[][]): number[] => {
    const { rowIndex, colIndex } = getSudokuRowColIndex(cellIndex)
    const allCandidateList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return allCandidateList.filter(candidate => {
        const rowList = sudokuData[rowIndex]
        const colList = sudokuData.map(row => row[colIndex])
        let threeTimesThreeList: number[] = []
        const rowStartIndex = Math.floor(rowIndex / 3) * 3
        const colStartIndex = Math.floor(colIndex / 3) * 3
        for (let row = rowStartIndex; row < rowStartIndex + 3; row++) {
            for (let col = colStartIndex; col < colStartIndex + 3; col++) {
                threeTimesThreeList = [...threeTimesThreeList, sudokuData[row][col]]
            }
        }

        return !rowList.some(rowValue => rowValue === candidate) && !colList.some(colValue => colValue === candidate) && !threeTimesThreeList.some(threeSetValue => threeSetValue === candidate)
    })
}

/**
 * Checks if it's valid to place a number in a given cell.
 * 
 * @param board - The Sudoku grid.
 * @param row - The row index.
 * @param col - The column index.
 * @param num - The number to place.
 * @returns True if valid, otherwise false.
 */
const isValidPlacement = (board: number[][], row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
        if (
            board[row][x] === num ||
            board[x][col] === num ||
            board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][Math.floor(col / 3) * 3 + x % 3] === num
        ) {
            return false
        }
    }
    return true
}

/**
 * Finds the next empty cell in the grid.
 * 
 * @param board - The Sudoku grid.
 * @returns The row and column indices of the next empty cell, or null if there are no empty cells.
 */
const findEmptyCell = (board: number[][]): { row: number, col: number } | null => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return { row, col }
            }
        }
    }
    return null
}

/**
 * Solves the Sudoku puzzle using backtracking.
 * 
 * @param board - The Sudoku grid to solve.
 * @returns True if the puzzle is solved, otherwise false.
 */
const solveSudokuTracking = (board: number[][]): boolean => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true // Puzzle is solved
    }

    const { row, col } = emptyCell

    for (let num = 1; num <= 9; num++) {
        if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuTracking(board)) {
                return true;
            }
            board[row][col] = 0 // Backtrack
        }
    }
    return false
}

export const solveSudoku = (board: number[][]): number[][] => {
    const solvedBoard = JSON.parse(JSON.stringify(board))
    solveSudokuTracking(solvedBoard)
    return solvedBoard
}