export type SudokuActions =
    | ReturnType<typeof selectSudokuCell>
    | ReturnType<typeof selectSudokuKeyboard>
    | ReturnType<typeof deleteSudokuInput>
    | ReturnType<typeof selectSudokuCandidate>
    | ReturnType<typeof selectCandidateModeCheckbox>

export const selectSudokuCell = (index: number) => {
    return {
        type: "SELECT_SUDOKU_CELL",
        index,
    } as const
};

export const selectSudokuKeyboard = (id: number, value: number) => {
    return {
        type: "SELECT_SUDOKU_KEYBOARD",
        id,
        value,
    } as const
};

export const deleteSudokuInput = (id: number) => {
    return {
        type: "DELETE_SUDOKU_INPUT",
        id
    } as const
};

export const selectSudokuCandidate = (id: number, value: number) => {
    return {
        type: "SELECT_SUDOKU_CANDIDATE",
        id,
        value
    } as const
};

export const selectCandidateModeCheckbox = () => {
    return {
        type: "SELECT_CANDIDATE_MODE_CHECKBOX",
    } as const
};