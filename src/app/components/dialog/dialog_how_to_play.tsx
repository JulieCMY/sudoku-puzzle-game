import React from "react"
import { connect } from "react-redux"
import { Dialog } from "./dialog"
import { dismissHowToPlayDialog } from "../../action/dialog"
import { RootState } from "../../models/state"
import { Language } from "../../models/config"
import { getTextByLanguage } from "../../logic/language"

interface StateProps {
    isHowToPlayDialogOpen: boolean
    language: Language
}

interface DispatchProps {
    dismissHowToPlayDialog: typeof dismissHowToPlayDialog
}

interface DialogProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        dialog: {
            isHowToPlayDialogOpen
        },
        config: {
            language
        }
    } = state
    return {
        isHowToPlayDialogOpen,
        language
    }
}

const DialogHowToPlayComponent: React.FunctionComponent<DialogProps> = (props) => {
    const { isHowToPlayDialogOpen, language, dismissHowToPlayDialog } = props
    const text = getTextByLanguage(language)

    if (!isHowToPlayDialogOpen) {
        return null
    }

    return (
        <Dialog
            onCloseButtonClick={dismissHowToPlayDialog}
        >
            <div>
                <h1 className="modal-system-header">{text.howToPlayDialog.title}</h1>
                <p>{text.howToPlayDialog.description}</p>
                <ul className="bullet-list">
                    {
                        text.howToPlayDialog.details.map((text: string, index: number) => (
                        <li key={`how-to-play-${index}`}>{text}</li>
                    ))
                    }
                </ul>
            </div>
        </Dialog>
    )
}

const dispatchActions = {
    dismissHowToPlayDialog
}

export const DialogHowToPlay = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(DialogHowToPlayComponent)