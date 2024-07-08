import React from "react"
import { useSelector } from "react-redux"
import { Candidate } from "./candidate"
import { SudokuState } from "../models/sudoku"
import { getSudokuCellIndex } from "../logic/sudoku"

export const Cell: React.FunctionComponent<{
    sudokuData: number[][],
    playerData: number[][],
    sudokuId: number,
    value: number,
    rowIndex: number,
    colIndex: number,
    isConflict: boolean,
    isCellRevealed: boolean
    onPress: (rowIndex: number, colIndex: number) => void
}> = ({
    sudokuData,
    playerData,
    sudokuId,
    value,
    rowIndex,
    colIndex,
    isConflict,
    isCellRevealed,
    onPress
}) => {
    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const isAutoCandidateModeOn = useSelector((state: SudokuState) => state.isAutoCandidateModeOn)
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
                        <div className={`cell-conflict ${isConflict? "conflicted": ""}`}/>
                    </div>
                ) : (
                    <div key={colIndex}>
                        <Candidate 
                            sudokuId={sudokuId}
                            sudokuData={sudokuData}
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