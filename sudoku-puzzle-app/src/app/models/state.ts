import { DialogState } from "./dialog";
import { SudokuState } from "./sudoku";

export interface RootState {
    sudoku: SudokuState
    dialog: DialogState
}