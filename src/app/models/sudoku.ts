export interface ObjectCollection<T> {
    [objectKey: string]: T | undefined
}

export interface PlayerMatrics {
    [cellIndex: string]: number
}

export interface CandidateMatrics {
    [cellIndex: string]: number[]
}

export interface SudokuState {
    selectedCellIndex?: number
    playerStats: ObjectCollection<PlayerMatrics>        // record game progress made by the player
    candidateStats: ObjectCollection<CandidateMatrics>  // record candidate list
    revealedCells: ObjectCollection<number[][]>         // record revealed sudoku cells
    correctedCells: ObjectCollection<number[]>          // record checked sudoku cells
    isAutoCandidateModeOn: boolean
    isShowHighlightedCellOn: boolean
    shouldRevealPuzzle: boolean
    currentSudokuBoardData: number[][]                  // TODO
}