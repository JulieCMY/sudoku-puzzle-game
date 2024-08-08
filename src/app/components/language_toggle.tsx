import React from "react"
import "../css/language_toggle.css"
import { Language } from "../models/config"
import { toggleLanguageSwitch } from "../action/config"
import { RootState } from "../models/state"
import { connect } from "react-redux"
import { SwitchToggle } from "./switch_toggle"

interface StateProps {
    language: Language
}

interface DispatchProps {
    toggleLanguageSwitch: typeof toggleLanguageSwitch
}

interface LanguageToggleProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { language } = state.config
    return {
        language
    }
}

const LanguageToggleComponent: React.FunctionComponent<LanguageToggleProps> = (props) => {
    const {
        language,
        toggleLanguageSwitch
    } = props
    return (
        <div className="language_toggle_wrapper">
            <SwitchToggle 
                selectedValue={language}
                toggleValues={[Language.EN, Language.ZH]}
                toggleTexts={["EN","中文"]}
                onClick={toggleLanguageSwitch}
            />
        </div>
    )
}

const dispatchActions = {
    toggleLanguageSwitch
}

export const LanguageToggle = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(LanguageToggleComponent)