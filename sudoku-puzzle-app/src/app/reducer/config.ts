import combineSectionReducers from "combine-section-reducers"
import { Language } from "./../models/config"
import { ConfigActions } from "../action/config"

export const config = combineSectionReducers({
    language
})

function language(state: Language = Language.EN, action: ConfigActions): Language {
    switch (action.type) {
        case "TOGGLE_LANGUAGE_SWITCH": {
            return action.language
        }
        default:
            return state
    }

}