import React from "react"
import { connect } from "react-redux"
import { Dialog } from "./dialog"
import { dismissCompletePuzzleDialog } from "../action/dialog"
import { RootState } from "../models/state"

interface StateProps {
    isCompletePuzzleDialogOpen: boolean
}

interface DispatchProps {
    dismissCompletePuzzleDialog: typeof dismissCompletePuzzleDialog
}

interface DialogProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        isCompletePuzzleDialogOpen
    } = state.dialog
    return {
        isCompletePuzzleDialogOpen
    }
}

const DialogCompletePuzzleComponent: React.FunctionComponent<DialogProps> = (props) => {
    const { isCompletePuzzleDialogOpen, dismissCompletePuzzleDialog } = props
    const audioRef = React.useRef<HTMLAudioElement>(null)

    React.useEffect(() => {
        if (isCompletePuzzleDialogOpen) {
            audioRef?.current?.play()
        }
    }, [isCompletePuzzleDialogOpen])

    if (!isCompletePuzzleDialogOpen) {
        return null
    }

    return (
        <Dialog
            onCloseButtonClick={dismissCompletePuzzleDialog}
        >
            <i className="su-modal-star" />
            <h1 className="modal-system-header">Congrats!</h1>
            <p className="modal-system-subheader">You finished a <span className="highlight">medium</span> puzzle in 7:49.</p>
            <audio ref={audioRef}>
                <source src="https://static01.nyt.com/packages/other/crossword/puzzle-media/shared/San_Jose_Strut.mp3" type="audio/mpeg" />
            </audio>
        </Dialog>
    )
}

const dispatchActions = {
    dismissCompletePuzzleDialog
}

export const DialogCompletePuzzle = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(DialogCompletePuzzleComponent)