import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuCandidate } from "../action/sudoku"
import { Icon } from "./icon"
import { SudokuState } from "../models/sudoku"

const candidateInput: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

export const Candidate: React.FunctionComponent<{sudokuId: number}> = ({sudokuId}) => {
    const dispatch = useDispatch()
    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const candidateStats = useSelector((state: SudokuState) => state.candidateStats)
    const candidateData = candidateStats[sudokuId] ?? {}
    const candidateList = !!selectedCellIndex ? candidateData[selectedCellIndex] : []

    const onCandidateButtonClick = (id: number, value: number): void => {
        dispatch(selectSudokuCandidate(id, value))
    }

    return (
        <div className="candidate">
            {candidateInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => {
                            const isCandidateSeletced = candidateList.includes(cell)
                            return (
                                (
                                    <div 
                                        key={colIndex} className={`candidate-button ${isCandidateSeletced ? "candidate-button-selected" : ""}`}
                                        onClick={(): void => {
                                            onCandidateButtonClick(sudokuId,cell)
                                        }}
                                    >
                                        <Icon value={cell}/>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
            ))}
        </div>
    )
}