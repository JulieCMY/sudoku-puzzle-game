import React from "react"
import { useDispatch } from "react-redux"
import { selectSudokuKeyboard } from "../action/sudoku"
import { mockData } from "../data/mockData"

export const Keyboard: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const { sudokuId } = mockData[0]
    const keyboardInput: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    const onNumericButtonClick = (id: number, value: number): void => {
        dispatch(selectSudokuKeyboard(id, value))
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
            <div key="delete" className="button delete" />
        </div>
    )
}