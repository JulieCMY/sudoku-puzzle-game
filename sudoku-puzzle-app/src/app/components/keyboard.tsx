import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuKeyboard, deleteSudokuInput, selectCandidateModeCheckbox } from "../action/sudoku"
import { mockData } from "../data/mockData"
import { text } from "../text/text"
import { SudokuState } from "../models/sudoku"

export const Keyboard: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const isAutoCandidateModeOn = useSelector((state: SudokuState) => state.isAutoCandidateModeOn)
    const { sudokuId } = mockData[0]
    const keyboardInput: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    const onNumericButtonClick = (id: number, value: number): void => {
        dispatch(selectSudokuKeyboard(id, value))
    }
    const onDeleteButtonClick = (id: number): void => {
        dispatch(deleteSudokuInput(id))
    }
    const onAutoCandidateModeCheckboxClick = (): void => {
        dispatch(selectCandidateModeCheckbox())
    }

    return (
        <div className="keyboard">
            {keyboardInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => (
                            <div key={colIndex} className="button numberic">
                                <div className={`keyboard-svg key-${cell}`} onClick={(): void => {onNumericButtonClick(sudokuId, cell)}} />
                            </div>
                        ))
                    }
                </div>
            ))}
            <div key="delete" className="button delete" onClick={(): void => {onDeleteButtonClick(sudokuId)}} />
            <div className="keyboard-auto" onClick={onAutoCandidateModeCheckboxClick}>
                <input type="checkbox" checked={isAutoCandidateModeOn} className="keyboard-checkbox" />
                <div>{text.autoCandidateMode}</div>
            </div>
        </div>
    )
}