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
export const processSudokuPlayerData = (data: number[][], playerMatrics: PlayerMatrics, revealedData: number[][]): number[][] => {
    const playerData: number[][] = JSON.parse(JSON.stringify(data))
    Object.keys(playerMatrics).map(cellIndex => {
        const { rowIndex, colIndex } = getSudokuRowColIndex(parseInt(cellIndex))
        playerData[rowIndex][colIndex] = playerMatrics[cellIndex]
    })
    revealedData.map((rowCells: number[], rowIndex: number) => {
        rowCells.map((cell: number, colIndex: number) => {
            if (!!cell) {
                playerData[rowIndex][colIndex] = cell
            }
        })
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

export const processRevealSudokuCell = (board: number[][], cellIndex: number): number[][] => {
    const { rowIndex, colIndex } = getSudokuRowColIndex(cellIndex)
    const solvedSudoku = solveSudoku(board)
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[rowIndex][colIndex] = solvedSudoku[rowIndex][colIndex]
    return newBoard
}

export const checkIsCorrectPlacement = (board: number[][], cellValue: number, cellIndex: number): boolean => {
    const { rowIndex, colIndex } = getSudokuRowColIndex(cellIndex)
    const solvedSudoku = solveSudoku(board)
    return cellValue === solvedSudoku[rowIndex][colIndex]
}

export const checkIsCellPrefilled = (rowIndex: number, colIndex: number, sudokuData: number[][]): boolean => {
    return !!sudokuData[rowIndex][colIndex]
}

export const checkIsCellSelected = (rowIndex: number, colIndex: number, selectedCellIndex?: number): boolean => {
    return selectedCellIndex === getSudokuCellIndex(rowIndex, colIndex)
}

export const checkIsCellHighlighted = (rowIndex: number, colIndex: number, selectedCellIndex?: number): boolean => {
    if (selectedCellIndex === undefined || checkIsCellSelected(rowIndex, colIndex, selectedCellIndex)) {
        return false
    }
    const { rowIndex: rIndex, colIndex: cIndex } = getSudokuRowColIndex(selectedCellIndex)
    const isInSameRow = rowIndex === rIndex
    const isInSameColumn = colIndex === cIndex
    const isInSameSubGrid = Math.floor(rowIndex / 3) * 3 === Math.floor(rIndex / 3) * 3 && Math.floor(colIndex / 3) * 3 === Math.floor(cIndex / 3) * 3
    return isInSameRow || isInSameColumn || isInSameSubGrid
}

export const checkIsCellSameValue = (rowIndex: number, colIndex: number, playerData: number[][], selectedCellIndex?: number): boolean => {
    if (selectedCellIndex === undefined) {
        return false
    }
    const { rowIndex: rIndex, colIndex: cIndex } = getSudokuRowColIndex(selectedCellIndex)
    const selectedCellValue = playerData[rIndex][cIndex]
    return !!selectedCellValue && playerData[rowIndex][colIndex] === selectedCellValue

}

export const checkIsKeyNumberCompleted = (keyValue: number, playerData: number[][]): boolean => {
    let count = 0
    playerData.map((rowData: number[], rowIndex: number) => {
        rowData.map((_cellValue: number, colIndex: number) => {
            if (playerData[rowIndex][colIndex] === keyValue) {
                count++
            }
        })
    })
    return count === 9
}

export const checkIsSudokuPuzzleCompleted = (board: number[][], playerData: number[][]): boolean => {
    const solvedSudoku = solveSudoku(board)
    return solvedSudoku.every((rowData: number[], rowIndex: number) => {
        return rowData.every((cellValue: number, colIndex: number) => {
            return cellValue === playerData[rowIndex][colIndex]
        })
    })
}