import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { SudokuActions } from "../action/sudoku";
import { SudokuState } from "../models/sudoku";
import { sudokuBoardData } from "../data/sudokuData";
import { checkIsCorrectPlacement, getSudokuRowColIndex, processRevealSudokuCell, solveSudoku } from "../logic/sudoku";

const initialState: SudokuState = {
    selectedCellIndex: undefined,
    playerStats: {},
    candidateStats: {},
    revealedCells: {},
    correctedCells: {},
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
            const { selectedCellIndex, playerStats, correctedCells } = state
            if (selectedCellIndex !== undefined) {
                const userData = playerStats[action.id] ?? {}
                const currentSudokuInput = userData[selectedCellIndex]
                userData[selectedCellIndex] = action.value
                let correctedData = correctedCells[action.id] ?? []
                if (correctedData.includes(selectedCellIndex) && !!currentSudokuInput && currentSudokuInput !== action.value) {
                    correctedData = correctedData.filter(cellIndex => cellIndex !== selectedCellIndex)
                }
                return {
                    ...state,
                    playerStats: {
                        ...playerStats,
                        [action.id]: userData
                    },
                    correctedCells: {
                        ...correctedCells,
                        [action.id]: Array.from(new Set(correctedData))
                    }
                }
            }
            return state
        }
        case "DELETE_SUDOKU_INPUT": {
            const { selectedCellIndex, playerStats, candidateStats, correctedCells } = state
            if (selectedCellIndex !== undefined) {
                const playerData = playerStats[action.id] ?? {}
                const sudokuInput = playerData[selectedCellIndex]
                const candidateData = candidateStats[action.id] ?? {}
                const candidateList = candidateData[selectedCellIndex] ?? []
                if (sudokuInput) {
                    delete playerData[selectedCellIndex]
                    const correctedData = (correctedCells[action.id] ?? []).filter(cellIndex => cellIndex !== selectedCellIndex)
                    return {
                        ...state,
                        playerStats: {
                            ...state.playerStats,
                            [action.id]: playerData
                        },
                        correctedCells: {
                            ...correctedCells,
                            [action.id]: Array.from(new Set(correctedData))
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
        case "SELECT_DROPDOWN_CHECK_CELL": {
            const { selectedCellIndex, playerStats, revealedCells, correctedCells, currentSudokuBoardData } = state
            if (selectedCellIndex !== undefined) {
                const playerData = playerStats[action.id] ?? {}
                const sudokuInput = playerData[selectedCellIndex]
                if (checkIsCorrectPlacement(currentSudokuBoardData, sudokuInput, selectedCellIndex)) {
                    const revealCellList = revealedCells[action.id] ?? []
                    const currentRevealedCells = revealCellList.length === 0 ? currentSudokuBoardData : revealCellList
                    const { rowIndex, colIndex } = getSudokuRowColIndex(selectedCellIndex)
                    const newRevealedCells = JSON.parse(JSON.stringify(currentRevealedCells))
                    newRevealedCells[rowIndex][colIndex] = sudokuInput
                    return {
                        ...state,
                        revealedCells: {
                            ...revealedCells,
                            [action.id]: newRevealedCells
                        }
                    }
                } else {
                    const correctedData = [
                        ...(correctedCells[action.id] ?? []),
                        selectedCellIndex
                    ]
                    return {
                        ...state,
                        correctedCells: {
                            ...correctedCells,
                            [action.id]: Array.from(new Set(correctedData))
                        }
                    }
                }
            }
            return state
        }
        case "SELECT_DROPDOWN_CHECK_PUZZLE": {
            const { playerStats, revealedCells, correctedCells, currentSudokuBoardData } = state
            const playerData = playerStats[action.id] ?? {}
            const revealCellList = revealedCells[action.id] ?? []
            const currentRevealedCells = revealCellList.length === 0 ? currentSudokuBoardData : revealCellList
            const newRevealedCells = JSON.parse(JSON.stringify(currentRevealedCells))
            const currentCorrectedData = correctedCells[action.id] ?? []
            Object.keys(playerData).map((cellIndexStr: string) => {
                const sudokuInput = playerData[cellIndexStr]
                const cellIndex = parseInt(cellIndexStr)
                if (checkIsCorrectPlacement(currentSudokuBoardData, sudokuInput, cellIndex)) {
                    const { rowIndex, colIndex } = getSudokuRowColIndex(cellIndex)
                    newRevealedCells[rowIndex][colIndex] = sudokuInput
                } else {
                    currentCorrectedData.push(cellIndex)
                }
            })
            return {
                ...state,
                revealedCells: {
                    ...revealedCells,
                    [action.id]: newRevealedCells
                },
                correctedCells: {
                    ...correctedCells,
                    [action.id]: Array.from(new Set(currentCorrectedData))
                }
            }
        }
        case "SELECT_DROPDOWN_REVEAL_CELL": {
            const { selectedCellIndex, revealedCells, currentSudokuBoardData } = state
            if (selectedCellIndex !== undefined) {
                const revealCellList = revealedCells[action.id] ?? []
                const currentRevealedCells = revealCellList.length === 0 ? currentSudokuBoardData : revealCellList
                return {
                    ...state,
                    revealedCells: {
                        ...revealedCells,
                        [action.id]: processRevealSudokuCell(currentRevealedCells, selectedCellIndex)
                    }
                }
            }
            return state
        }
        case "SELECT_DROPDOWN_REVEAL_PUZZLE": {
            return {
                ...state,
                shouldRevealPuzzle: true,
                revealedCells: {
                    ...state.revealedCells,
                    [action.id]: solveSudoku(state.currentSudokuBoardData)
                }
            }
        }
        case "SELECT_DROPDOWN_RESET_PUZZLE": {
            const { playerStats, revealedCells } = state
            delete playerStats[action.id]
            delete revealedCells[action.id]
            return {
                ...state,
                shouldRevealPuzzle: false,
                playerStats,
                revealedCells
            }
        }
        default:
            return state
    }
}

const store = createStore(sudokuReducer, composeWithDevTools());

export default store