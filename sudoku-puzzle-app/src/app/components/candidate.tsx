import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuCandidate } from "../action/sudoku"
import { Icon } from "./icon"
import { SudokuState } from "../models/sudoku"
import { getAllCandidateList } from "../logic/sudoku"

const candidateInput: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

export const Candidate: React.FunctionComponent<{sudokuId: number, sudokuData: number[][], playerData: number[][], cellIndex: number, isCellSelected: boolean}> = ({sudokuId, sudokuData, playerData, cellIndex, isCellSelected}) => {
    const dispatch = useDispatch()
    const isAutoCandidateModeOn = useSelector((state: SudokuState) => state.isAutoCandidateModeOn)
    const candidateStats = useSelector((state: SudokuState) => state.candidateStats)
    const candidateData = candidateStats[sudokuId] ?? {}
    const candidateList = !!cellIndex ? candidateData[cellIndex] : []
    const allValidCandidateList = getAllCandidateList(cellIndex, playerData)

    const onCandidateButtonClick = (id: number, value: number): void => {
        if (isCellSelected && !isAutoCandidateModeOn) {
            dispatch(selectSudokuCandidate(id, value))
        }
    }

    return (
        <div className="candidate">
            {candidateInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => {
                            const isCandidateSeletced = isAutoCandidateModeOn ? allValidCandidateList.includes(cell) : candidateList?.includes(cell)
                            return (
                                (
                                    <div 
                                        key={colIndex} 
                                        className={`candidate-button ${isCellSelected ? "candidate-button-hoverable" : ""} ${isCandidateSeletced && isCellSelected ? "candidate-button-selected-highlight" : ""} ${isCandidateSeletced && !isCellSelected ? "candidate-button-selected" : ""}`}
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