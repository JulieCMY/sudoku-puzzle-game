import React from "react"
import { connect, useSelector } from "react-redux"
import { Candidate } from "./candidate"
import { SudokuState } from "../models/sudoku"
import { getSudokuCellIndex } from "../logic/sudoku"
import { RootState } from "../models/state"
import { arePropsEqual } from "../utils/props_comparer"

interface StateProps {
    selectedCellIndex: number | undefined
    isAutoCandidateModeOn: boolean
}

interface PassthroughProps {
    sudokuData: number[][],
    playerData: number[][],
    sudokuId: number,
    value: number,
    rowIndex: number,
    colIndex: number,
    isCellConflict: boolean,
    isCellRevealed: boolean,
    isCellCorrected: boolean
    onPress: (rowIndex: number, colIndex: number) => void
}

const areStatePropsEqual = (nextState: StateProps, prevState: StateProps): boolean => {
    return arePropsEqual<StateProps>(prevState, nextState)
}

interface CellProps extends StateProps, PassthroughProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        selectedCellIndex,
        isAutoCandidateModeOn
    } = state.sudoku
    return {
        selectedCellIndex,
        isAutoCandidateModeOn
    }
}

const CellComponent: React.FunctionComponent<CellProps> = (props) => {
    const {
        sudokuData,
        playerData,
        sudokuId,
        value,
        rowIndex,
        colIndex,
        selectedCellIndex,
        isAutoCandidateModeOn,
        isCellConflict,
        isCellRevealed,
        isCellCorrected,
        onPress
    } = props
    const initialCellValue = sudokuData[rowIndex][colIndex]
    const isCellPrefilled = !!initialCellValue
    const isCellSelected = selectedCellIndex === getSudokuCellIndex(rowIndex, colIndex)
    const shouldShowBottomBorder = ((rowIndex + 1) % 3 === 0 && rowIndex !== 8)
    const shouldShowRightBorder = ((colIndex + 1) % 3 === 0 && colIndex !== 8)
    const shouldShowCandidate = isAutoCandidateModeOn ? !isCellPrefilled && !value : !value
    const onCellClick = () => {
        if (!isCellPrefilled) {
            onPress(rowIndex, colIndex)
        }
    }
    return (
        <div 
            key={colIndex}
            onClick={onCellClick}
            className={`cell-container ${isCellPrefilled ? "prefilled" : ""} ${isCellSelected ? "selected" : ""} ${shouldShowBottomBorder ? "cell-container-bottom-border" :""} ${shouldShowRightBorder? "cell-container-right-border" : ""}`}
        >
            {
                !shouldShowCandidate ? (
                    <div key={colIndex} className="numeric" style={{position: "relative"}}>
                        <div className={`keyboard-svg key-${value} ${isCellRevealed && !isCellPrefilled && "key-reveal-puzzle"}`} />
                        { isCellCorrected && <div className="cell-correction" /> }
                        <div className={`cell-conflict ${isCellConflict? "conflicted": ""}`}/>
                    </div>
                ) : (
                    <div key={colIndex}>
                        <Candidate 
                            sudokuId={sudokuId}
                            playerData={playerData}
                            cellIndex={getSudokuCellIndex(rowIndex, colIndex)}
                            isCellSelected={isCellSelected}
                        />
                    </div>
                )
            }
        </div>
    )
}

export const Cell = connect(mapStateToProps, undefined, undefined, { areStatePropsEqual})(CellComponent)