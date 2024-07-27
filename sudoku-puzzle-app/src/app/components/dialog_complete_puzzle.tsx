import React from "react"
import { connect } from "react-redux"
import { Dialog } from "./dialog"
import { dismissCompletePuzzleDialog } from "../action/dialog"
import { RootState } from "../models/state"
import { Language } from "../models/config"
import { getTextByLanguage } from "../logic/language"

interface StateProps {
    isCompletePuzzleDialogOpen: boolean
    language: Language
}

interface DispatchProps {
    dismissCompletePuzzleDialog: typeof dismissCompletePuzzleDialog
}

interface DialogProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        dialog: {
            isCompletePuzzleDialogOpen
        },
        config: {
            language
        }
    } = state
    return {
        isCompletePuzzleDialogOpen,
        language
    }
}

const DialogCompletePuzzleComponent: React.FunctionComponent<DialogProps> = (props) => {
    const { isCompletePuzzleDialogOpen, language, dismissCompletePuzzleDialog } = props
    const audioRef = React.useRef<HTMLAudioElement>(null)
    const text = getTextByLanguage(language)

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
            <h1 className="modal-system-header">{text.completePuzzleDialog.title}</h1>
            <p className="modal-system-subheader">{text.completePuzzleDialog.body1}<span className="highlight">medium</span>{text.completePuzzleDialog.body2}7:49{text.completePuzzleDialog.body3}</p>
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