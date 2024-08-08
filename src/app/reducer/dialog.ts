import combineSectionReducers from "combine-section-reducers"
import { DialogActions } from "../action/dialog"
import { SudokuActions } from "../action/sudoku"

export const dialog = combineSectionReducers({
    isCompletePuzzleDialogOpen,
    isHowToPlayDialogOpen
})

function isCompletePuzzleDialogOpen(state: boolean = false, action: DialogActions | SudokuActions): boolean {
    switch (action.type) {
        case "SELECT_DROPDOWN_REVEAL_PUZZLE": {
            return true
        }
        case "USER_COMPLETE_SUDOKU_PUZZLE": {
            return true
        }
        case "DISMISS_COMPLETE_PUZZLE_DIALOG": {
            return false
        }
        default:
            return state
    }

}

function isHowToPlayDialogOpen(state: boolean = false, action: DialogActions): boolean {
    switch (action.type) {
        case "SHOW_HOW_TO_PLAY_DIALOG": {
            return true
        }
        case "DISMISS_HOW_TO_PLAY_DIALOG": {
            return false
        }
        default:
            return state
    }
}