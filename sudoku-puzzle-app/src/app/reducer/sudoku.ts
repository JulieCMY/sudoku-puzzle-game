import { createStore } from "redux";
import { SudokuActions } from "../action/sudoku";
import { SudokuState } from "../models/sudoku";

const initialState: SudokuState = {
    selectedCellIndex: undefined,
}

const sudokuReducer= (state = initialState, action: SudokuActions): SudokuState => {
    switch (action.type) {
        case "SELECT_SUDOKU_CELL":
            return {
                ...state,
                selectedCellIndex: action.index,
            }
        default:
            return state
    }
}

const store = createStore(sudokuReducer);

export default store