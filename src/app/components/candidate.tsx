import React from "react"
import { connect } from "react-redux"
import { selectSudokuCandidate } from "../action/sudoku"
import { NumberIcon } from "./number_icon"
import { RootState } from "../models/state"
import { getAllCandidateList } from "../logic/sudoku"
import { arePropsEqual } from "../utils/props_comparer"

const candidateInput: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

interface StateProps {
    isAutoCandidateModeOn: boolean
    candidateList: number[]
    allValidCandidateList: number[]
}

interface DispatchProps {
    selectSudokuCandidate: typeof selectSudokuCandidate
}

interface PassthroughProps {
    sudokuId: number
    cellIndex: number
    isCellSelected: boolean
    playerData: number[][]

}

interface ContainerProps extends PassthroughProps {}

interface CandidateProps extends StateProps, DispatchProps, PassthroughProps {}

const areStatePropsEqual = (nextState: StateProps, prevState: StateProps): boolean => {
    return arePropsEqual<StateProps>(prevState, nextState)
}

function mapStateToProps(state: RootState, ownProps: ContainerProps): StateProps {
    const { isAutoCandidateModeOn, candidateStats } = state.sudoku
    const { sudokuId, playerData, cellIndex } = ownProps
    const candidateData = candidateStats[sudokuId] ?? {}
    const candidateList = cellIndex !== undefined ? candidateData[cellIndex] : []
    const allValidCandidateList = getAllCandidateList(cellIndex, playerData)

    return {
        isAutoCandidateModeOn,
        candidateList,
        allValidCandidateList
    }
}

const CandidateComponent: React.FunctionComponent<CandidateProps> = (props) => {
    const {
        sudokuId,
        isCellSelected,
        isAutoCandidateModeOn,
        allValidCandidateList,
        candidateList,
        selectSudokuCandidate
    } = props

    const onCandidateButtonClick = (id: number, value: number): void => {
        if (isCellSelected && !isAutoCandidateModeOn) {
            selectSudokuCandidate(id, value)
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
                                        <NumberIcon value={cell}/>
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

const dispatchActions: DispatchProps = {
    selectSudokuCandidate
}

export const Candidate = connect(mapStateToProps, dispatchActions, undefined, { areStatePropsEqual})(CandidateComponent)