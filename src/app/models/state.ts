import { ConfigState } from "./config";
import { DialogState } from "./dialog";
import { SudokuState } from "./sudoku";

export interface RootState {
    config: ConfigState
    sudoku: SudokuState
    dialog: DialogState
}