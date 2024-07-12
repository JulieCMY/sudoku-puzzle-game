import React from "react"
import { useSelector, useDispatch, connect } from "react-redux"
import { selectSudokuKeyboard, deleteSudokuInput, selectCandidateModeCheckbox, selectSudokuCandidate } from "../action/sudoku"
import { sudokuBoardData } from "../data/sudokuData"
import { text } from "../text/text"
import { SudokuState } from "../models/sudoku"
import { RootState } from "../models/state"
import { arePropsEqual } from "../utils/props_comparer"

const keyboardInput: number[] = Array.from({ length: 9 }, (_, i) => i + 1)

enum KeyboardMode {
    NORMAL = "NORMAL",
    CANDIDATE = "CANDIDATE"
}

interface StateProps {
    isAutoCandidateModeOn: boolean
}

interface DispatchProps {
    selectSudokuKeyboard: typeof selectSudokuKeyboard
    selectSudokuCandidate: typeof selectSudokuCandidate
    deleteSudokuInput: typeof deleteSudokuInput
    selectCandidateModeCheckbox: typeof selectCandidateModeCheckbox
}

interface KeyboardProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        isAutoCandidateModeOn
    } = state.sudoku
    return {
        isAutoCandidateModeOn
    }
}

const KeyboardComponent: React.FunctionComponent<KeyboardProps> = (props) => {
    const {
        isAutoCandidateModeOn,
        selectSudokuKeyboard,
        selectSudokuCandidate,
        deleteSudokuInput,
        selectCandidateModeCheckbox
    } = props
    const { sudokuId } = sudokuBoardData[0]
    const [ keyboardMode, setKeyboardMode ] = React.useState<KeyboardMode>(KeyboardMode.NORMAL)

    const onModeButtonClick = (mode: KeyboardMode): void => {
        setKeyboardMode(mode)
    }
    const onNumericButtonClick = (id: number, value: number): void => {
        if (keyboardMode===KeyboardMode.NORMAL) {
            selectSudokuKeyboard(id, value)
        } else {
            selectSudokuCandidate(id, value)
        }
    }
    const onDeleteButtonClick = (id: number): void => {
        deleteSudokuInput(id)
    }
    const onAutoCandidateModeCheckboxClick = (): void => {
        selectCandidateModeCheckbox()
    }

    return (
        <>
            <div className="su-divider" />
            <div className="keyboard">
                <div>
                    <button 
                        type="button"
                        onClick={(): void => {onModeButtonClick(KeyboardMode.NORMAL)}}  
                        className={`keyboard-mode normalMode ${keyboardMode===KeyboardMode.NORMAL && "keyboard-mode-selected"}`}
                    >
                        {text.normal}
                    </button>
                    <button 
                        type="button"
                        onClick={(): void => {onModeButtonClick(KeyboardMode.CANDIDATE)}} 
                        className={`keyboard-mode candidateMode ${keyboardMode===KeyboardMode.CANDIDATE && "keyboard-mode-selected"}`}
                    >
                        {text.candidate}
                    </button>
                </div>
                <div className="su-keyboard-container">
                    {keyboardInput.map((cell: number, index: number) => (
                        <div 
                            key={index} 
                            className="button numeric keyboard-numeric" 
                            onClick={(): void => {onNumericButtonClick(sudokuId, cell)}} 
                        >
                            <div 
                                className={`keyboard-svg key-${cell} ${keyboardMode===KeyboardMode.CANDIDATE && `key-candidate key-candidate-${cell}`}`} 
                            />
                        </div>
                    ))}
                    <div 
                        key="delete" 
                        className="button numeric key-delete-container" 
                        onClick={(): void => {onDeleteButtonClick(sudokuId)}}
                    >
                        <div className={`keyboard-svg key-delete ${keyboardMode===KeyboardMode.CANDIDATE && "key-candidate-delete"}`} />
                    </div>
                </div>
                <div className="keyboard-auto" onClick={onAutoCandidateModeCheckboxClick}>
                    <input type="checkbox" checked={isAutoCandidateModeOn} className="keyboard-checkbox" />
                    <div>{text.autoCandidateMode}</div>
                </div>
            </div>
        </>
    )
}

const dispatchActions = {
    selectSudokuKeyboard,
    selectSudokuCandidate,
    deleteSudokuInput,
    selectCandidateModeCheckbox
}

export const Keyboard = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(KeyboardComponent)