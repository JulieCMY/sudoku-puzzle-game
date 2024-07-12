import React from "react"
import { connect } from "react-redux"
import { selectSudokuCell } from "../action/sudoku"
import { Cell } from "./cell"
import { findDuplicateCellIndex, getSudokuCellIndex, processSudokuPlayerData } from "../logic/sudoku"
import { ObjectCollection } from "../models/sudoku"
import { sudokuBoardData } from "../data/sudokuData"
import { RootState } from "../models/state"

interface StateProps {
    sudokuId: number
    sudokuData: number[][]
    selectedCellIndex: number | undefined
    shouldRevealPuzzle: boolean
    revealedCells: ObjectCollection<number[][]>
    playerData: number[][]
    currentCorrectedCells: number[]
    duplicatedCellIndexList: number[]
}

interface DispatchProps {
    selectSudokuCell: typeof selectSudokuCell
}

interface BoardProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { sudokuId, sudokuData} = sudokuBoardData[0]
    const { 
        revealedCells, 
        selectedCellIndex, 
        playerStats, 
        correctedCells, 
        shouldRevealPuzzle 
    } = state.sudoku
    const currentSudokuPlayerStats = playerStats[sudokuId] ?? {}
    const currectRevealedData = revealedCells[sudokuId] ?? []
    const currentCorrectedCells = correctedCells[sudokuId] ?? []
    const playerData = processSudokuPlayerData(sudokuData, currentSudokuPlayerStats, currectRevealedData)
    const duplicatedCellIndexList = findDuplicateCellIndex(playerData)
    return {
        sudokuId,
        sudokuData,
        selectedCellIndex,
        shouldRevealPuzzle,
        revealedCells,
        playerData,
        currentCorrectedCells,
        duplicatedCellIndexList
    }
}

const BoardComponent: React.FunctionComponent<BoardProps> = (props) => {
    const {
        sudokuId,
        sudokuData,
        selectedCellIndex,
        shouldRevealPuzzle,
        revealedCells,
        playerData,
        currentCorrectedCells,
        duplicatedCellIndexList,
        selectSudokuCell
    } = props

    const onCellClick = (rowIndex: number, colIndex: number): void => {
        const selectedIndex = getSudokuCellIndex(rowIndex, colIndex)
        if (selectedCellIndex !== selectedIndex) {
            selectSudokuCell(selectedIndex)
        }
    }

    const checkIsCellConflict = (rowIndex: number, colIndex: number): boolean => {
        return !shouldRevealPuzzle && duplicatedCellIndexList.includes(getSudokuCellIndex(rowIndex, colIndex))
    }
    const checkIsCellRevealed = (rowIndex: number, colIndex: number): boolean => {
        return shouldRevealPuzzle || !!revealedCells[sudokuId]?.[rowIndex]?.[colIndex]
    }
    const checkIsCellCorrected = (rowIndex: number, colIndex: number): boolean => {
        return !checkIsCellRevealed(rowIndex, colIndex) && currentCorrectedCells.includes(getSudokuCellIndex(rowIndex, colIndex))
    }

    return (
        <div className="board">
            {playerData.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: number, colIndex: number) => (
                        <Cell 
                            key={getSudokuCellIndex(rowIndex, colIndex)}
                            sudokuData={sudokuData}
                            playerData={playerData}
                            sudokuId={sudokuId}
                            isCellConflict={checkIsCellConflict(rowIndex, colIndex)}
                            isCellRevealed={checkIsCellRevealed(rowIndex, colIndex)}
                            isCellCorrected={checkIsCellCorrected(rowIndex, colIndex)}
                            value={cell}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            onPress={onCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

const dispatchActions = {
    selectSudokuCell
}

export const Board = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(BoardComponent)