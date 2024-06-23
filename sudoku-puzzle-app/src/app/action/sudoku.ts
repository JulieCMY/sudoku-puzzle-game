export type SudokuActions =
    | ReturnType<typeof selectSudokuCell>
    | ReturnType<typeof selectSudokuKeyboard>
    | ReturnType<typeof deleteSudokuInput>
    | ReturnType<typeof selectSudokuCandidate>

export const selectSudokuCell = (index: number) => {
    return {
        type: 'SELECT_SUDOKU_CELL',
        index,
    } as const;
};

export const selectSudokuKeyboard = (value: number) => {
    return {
        type: 'SELECT_SUDOKU_KEYBOARD',
        value,
    } as const;
};

export const deleteSudokuInput = () => {
    return {
        type: 'DELETE_SUDOKU_INPUT',
    } as const;
};

export const selectSudokuCandidate = () => {
    return {
        type: 'SELECT_SUDOKU_CANDIDATE',
    } as const;
};
