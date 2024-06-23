interface ObjectCollection<T>{
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
    playerStats: ObjectCollection<PlayerMatrics>  // record game progress made by the player
    candidateStats: ObjectCollection<CandidateMatrics>  // record candidate list
}