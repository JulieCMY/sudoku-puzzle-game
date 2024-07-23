import combineSectionReducers from "combine-section-reducers"
import { DialogActions } from "../action/dialog"
import { SudokuActions } from "../action/sudoku"

export const dialog = combineSectionReducers({
    isCompletePuzzleDialogOpen
})

function isCompletePuzzleDialogOpen(state: boolean = false, action: DialogActions | SudokuActions): boolean {
    switch (action.type) {
        case "SELECT_DROPDOWN_REVEAL_PUZZLE": {
            return true
        }
        case "DISMISS_COMPLETE_PUZZLE_DIALOG": {
            return false
        }
        default:
            return state
    }

}