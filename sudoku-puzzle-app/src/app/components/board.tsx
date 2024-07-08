import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuCell } from "../action/sudoku"
import { Cell } from "./cell"
import { findDuplicateCellIndex, getSudokuCellIndex, processSudokuPlayerData } from "../logic/sudoku"
import { SudokuState } from "../models/sudoku"
import { sudokuBoardData } from "../data/sudokuData"

export const Board: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const { sudokuId: id, sudokuData: data} = sudokuBoardData[0]
    const revealedData = useSelector((state: SudokuState) => state.revealedCells)
    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const playerStats = useSelector((state: SudokuState) => state.playerStats)
    const shouldRevealPuzzle = useSelector((state: SudokuState) => state.shouldRevealPuzzle)

    const currentSudokuPlayerStats = playerStats[id] ?? {}
    const playerData = processSudokuPlayerData(data, currentSudokuPlayerStats, revealedData)
    const duplicatedCellIndexList = findDuplicateCellIndex(playerData)

    const onCellClick = (rowIndex: number, colIndex: number): void => {
        const selectedIndex = getSudokuCellIndex(rowIndex, colIndex)
        if (selectedCellIndex !== selectedIndex) {
            dispatch(selectSudokuCell(selectedIndex))
        }
    }

    const checkIsCellRevealed = (rowIndex: number, colIndex: number): boolean => {
        return shouldRevealPuzzle || !!revealedData?.[rowIndex]?.[colIndex]
    }

    return (
        <div className="board">
            {playerData.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: number, colIndex: number) => (
                        <Cell 
                            key={getSudokuCellIndex(rowIndex, colIndex)}
                            sudokuData={data}
                            playerData={playerData}
                            sudokuId={id}
                            isConflict={!shouldRevealPuzzle && duplicatedCellIndexList.includes(getSudokuCellIndex(rowIndex, colIndex))}
                            value={cell}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isCellRevealed={checkIsCellRevealed(rowIndex, colIndex)}
                            onPress={onCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
