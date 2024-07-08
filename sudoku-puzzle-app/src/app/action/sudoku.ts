export type SudokuActions =
    | ReturnType<typeof selectSudokuCell>
    | ReturnType<typeof selectSudokuKeyboard>
    | ReturnType<typeof deleteSudokuInput>
    | ReturnType<typeof selectSudokuCandidate>
    | ReturnType<typeof selectCandidateModeCheckbox>
    | ReturnType<typeof selectDropdownRevealCell>
    | ReturnType<typeof selectDropdownRevealPuzzle>
    | ReturnType<typeof selectDropdownResetPuzzle>

export const selectSudokuCell = (index: number) => {
    return {
        type: "SELECT_SUDOKU_CELL",
        index,
    } as const
}

export const selectSudokuKeyboard = (id: number, value: number) => {
    return {
        type: "SELECT_SUDOKU_KEYBOARD",
        id,
        value,
    } as const
}

export const deleteSudokuInput = (id: number) => {
    return {
        type: "DELETE_SUDOKU_INPUT",
        id
    } as const
}

export const selectSudokuCandidate = (id: number, value: number) => {
    return {
        type: "SELECT_SUDOKU_CANDIDATE",
        id,
        value
    } as const
}

export const selectCandidateModeCheckbox = () => {
    return {
        type: "SELECT_CANDIDATE_MODE_CHECKBOX",
    } as const
}

export const selectDropdownRevealCell = () => {
    return {
        type: "SELECT_DROPDOWN_REVEAL_CELL",
    } as const
}

export const selectDropdownRevealPuzzle = () => {
    return {
        type: "SELECT_DROPDOWN_REVEAL_PUZZLE",
    } as const
}

export const selectDropdownResetPuzzle = () => {
    return {
        type: "SELECT_DROPDOWN_RESET_PUZZLE",
    } as const
}