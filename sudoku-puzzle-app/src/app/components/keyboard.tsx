import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuKeyboard, deleteSudokuInput, selectCandidateModeCheckbox, selectSudokuCandidate } from "../action/sudoku"
import { mockData } from "../data/mockData"
import { text } from "../text/text"
import { SudokuState } from "../models/sudoku"

const keyboardInput: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

enum KeyboardMode {
    NORMAL = "NORMAL",
    CANDIDATE = "CANDIDATE"
}

export const Keyboard: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const isAutoCandidateModeOn = useSelector((state: SudokuState) => state.isAutoCandidateModeOn)
    const { sudokuId } = mockData[0]
    const [ keyboardMode, setKeyboardMode ] = React.useState<KeyboardMode>(KeyboardMode.NORMAL)

    const onModeButtonClick = (mode: KeyboardMode): void => {
        setKeyboardMode(mode)
    }
    const onNumericButtonClick = (id: number, value: number): void => {
        if (keyboardMode===KeyboardMode.NORMAL) {
            dispatch(selectSudokuKeyboard(id, value))
        } else {
            dispatch(selectSudokuCandidate(id, value))
        }
    }
    const onDeleteButtonClick = (id: number): void => {
        dispatch(deleteSudokuInput(id))
    }
    const onAutoCandidateModeCheckboxClick = (): void => {
        dispatch(selectCandidateModeCheckbox())
    }

    const getCandidateStyle = (rowIndex: number, colIndex: number): React.CSSProperties | undefined => {
        if (keyboardMode===KeyboardMode.CANDIDATE) {
            let marginTop = 0
            if (rowIndex === 0) {
                marginTop = 4
            } else if (rowIndex === 2) {
                marginTop = -4
            }

            let marginLeft = 0
            if (colIndex === 0) {
                marginLeft = 4
            } else if (colIndex === 2) {
                marginLeft = -4
            }

            return {
                position: "absolute",
                top: `${(100/3) * rowIndex}%`,
                left: `${(100/3) * colIndex}%`,
                marginTop: `${marginTop}px`,
                marginLeft: `${marginLeft}px`
            }
        }
        return undefined
    }

    return (
        <div className="keyboard">
            <div>
                <button onClick={(): void => {onModeButtonClick(KeyboardMode.NORMAL)}} type="button" className={`keyboard-mode normalMode ${keyboardMode===KeyboardMode.NORMAL && "keyboard-mode-selected"}`}>Normal</button>
                <button onClick={(): void => {onModeButtonClick(KeyboardMode.CANDIDATE)}} type="button" className={`keyboard-mode candidateMode ${keyboardMode===KeyboardMode.CANDIDATE && "keyboard-mode-selected"}`}>Candidate</button>
            </div>
            {keyboardInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => (
                            <div key={colIndex} className="button numberic" onClick={(): void => {onNumericButtonClick(sudokuId, cell)}} >
                                <div 
                                    className={`keyboard-svg key-${cell} ${keyboardMode===KeyboardMode.CANDIDATE && "key-candidate"}`} 
                                    style={getCandidateStyle(rowIndex, colIndex)}
                                />
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