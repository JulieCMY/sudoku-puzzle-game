import { createStore } from "redux";
import { SudokuActions } from "../action/sudoku";
import { SudokuState } from "../models/sudoku";
import { sudokuBoardData } from "../data/sudokuData";
import { processRevealSudokuCell, solveSudoku } from "../logic/sudoku";

const initialState: SudokuState = {
    selectedCellIndex: undefined,
    playerStats: {},
    candidateStats: {},
    revealedCells: [],
    isAutoCandidateModeOn: false,
    shouldRevealPuzzle: false,
    currentSudokuBoardData: sudokuBoardData[0].sudokuData
}

const sudokuReducer = (state = initialState, action: SudokuActions): SudokuState => {
    switch (action.type) {
        case "SELECT_SUDOKU_CELL":
            return {
                ...state,
                selectedCellIndex: action.index,
            }
        case "SELECT_SUDOKU_KEYBOARD": {
            const selectedCellIndex = state.selectedCellIndex
            if (selectedCellIndex !== undefined) {
                const userData = state.playerStats[action.id] ?? {}
                userData[selectedCellIndex] = action.value
                return {
                    ...state,
                    playerStats: {
                        ...state.playerStats,
                        [action.id]: userData
                    }
                }
            }
            return state
        }
        case "DELETE_SUDOKU_INPUT": {
            const selectedCellIndex = state.selectedCellIndex
            if (selectedCellIndex !== undefined) {
                const playerData = state.playerStats[action.id] ?? {}
                const sudokuInput = playerData[selectedCellIndex]
                const candidateData = state.candidateStats[action.id] ?? {}
                const candidateList = candidateData[selectedCellIndex] ?? []
                if (sudokuInput) {
                    delete playerData[selectedCellIndex]
                    return {
                        ...state,
                        playerStats: {
                            ...state.playerStats,
                            [action.id]: playerData
                        }
                    }
                } else if (candidateList.length > 0) {
                    delete candidateData[selectedCellIndex]
                    return {
                        ...state,
                        candidateStats: {
                            ...state.candidateStats,
                            [action.id]: candidateData
                        }
                    }
                }
            }
            return state
        }
        case "SELECT_SUDOKU_CANDIDATE": {
            const selectedCellIndex = state.selectedCellIndex
            if (selectedCellIndex !== undefined) {
                const userData = state.candidateStats[action.id] ?? {}
                const candidateList = userData[selectedCellIndex] ?? []
                if (candidateList.includes(action.value)) {
                    userData[selectedCellIndex] = [...candidateList.filter(value => value !== action.value)]
                } else {
                    userData[selectedCellIndex] = [...candidateList, action.value].sort()
                }
                return {
                    ...state,
                    candidateStats: {
                        ...state.candidateStats,
                        [action.id]: userData
                    }
                }
            }
            return state
        }
        case "SELECT_CANDIDATE_MODE_CHECKBOX": {
            return {
                ...state,
                isAutoCandidateModeOn: !state.isAutoCandidateModeOn
            }
        }
        case "SELECT_DROPDOWN_REVEAL_CELL": {
            const { selectedCellIndex, revealedCells, currentSudokuBoardData } = state
            if (selectedCellIndex !== undefined) {
                const currentRevealedCells = revealedCells.length === 0 ? currentSudokuBoardData : revealedCells
                return {
                    ...state,
                    revealedCells: processRevealSudokuCell(currentRevealedCells, selectedCellIndex)
                }
            }
            return state
        }
        case "SELECT_DROPDOWN_REVEAL_PUZZLE": {
            return {
                ...state,
                shouldRevealPuzzle: true,
                revealedCells: solveSudoku(state.currentSudokuBoardData)
            }
        }
        case "SELECT_DROPDOWN_RESET_PUZZLE": {
            return {
                ...state,
                shouldRevealPuzzle: false,
                revealedCells: [],
                playerStats: {}
            }
        }
        default:
            return state
    }
}

const store = createStore(sudokuReducer);

export default store