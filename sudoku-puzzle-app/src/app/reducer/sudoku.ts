import { createStore } from "redux";
import { SudokuActions } from "../action/sudoku";
import { SudokuState } from "../models/sudoku";

const initialState: SudokuState = {
    selectedCellIndex: undefined,
    playerStats: {},
    candidateStats: {},
    isAutoCandidateModeOn: false
}

const sudokuReducer= (state = initialState, action: SudokuActions): SudokuState => {
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
            const userData = state.candidateStats[action.id] ?? {}
            const candidateList = userData[action.index] ?? []
            if (candidateList.includes(action.value)) {
                userData[action.index] = [...candidateList.filter(value => value !== action.value)]
            } else {
                userData[action.index] = [...candidateList, action.value].sort()
            }
            return {
                ...state,
                candidateStats: {
                    ...state.candidateStats,
                    [action.id]: userData
                }
            }
        }
        case "SELECT_CANDIDATE_MODE_CHECKBOX": {
            return {
                ...state,
                isAutoCandidateModeOn: !state.isAutoCandidateModeOn
            }
        }
        default:
            return state
    }
}

const store = createStore(sudokuReducer);

export default store