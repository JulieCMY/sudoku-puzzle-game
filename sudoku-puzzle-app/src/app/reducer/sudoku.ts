import { createStore } from "redux";
import { SudokuActions } from "../action/sudoku";
import { SudokuState } from "../models/sudoku";

const initialState: SudokuState = {
    selectedCellIndex: undefined,
    playerStats: {},
    candidateStats: {}
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
            if (!!selectedCellIndex) {
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
            if (!!selectedCellIndex) {
                const userData = state.playerStats[action.id] ?? {}
                delete userData[selectedCellIndex]
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
        case "SELECT_SUDOKU_CANDIDATE": {
            const selectedCellIndex = state.selectedCellIndex
            if (!!selectedCellIndex) {
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
        default:
            return state
    }
}

const store = createStore(sudokuReducer);

export default store