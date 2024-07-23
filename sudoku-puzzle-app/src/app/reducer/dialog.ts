import { DialogActions } from "../action/dialog"
import { SudokuActions } from "../action/sudoku"
import { DialogState } from "../models/dialog"

const initialState: DialogState = {
    isCompletePuzzleDialogOpen: false
}

export const dialog = (state = initialState, action: DialogActions | SudokuActions): DialogState => {
    switch (action.type) {
        case "SELECT_DROPDOWN_REVEAL_PUZZLE": {
            return {
                ...state,
                isCompletePuzzleDialogOpen: true
            }
        }
        case "DISMISS_COMPLETE_PUZZLE_DIALOG": {
            return {
                ...state,
                isCompletePuzzleDialogOpen: false
            }
        }
        default:
            return state
    }

}