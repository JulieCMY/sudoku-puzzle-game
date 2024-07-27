import { Language } from "../models/config"

export type ConfigActions =
    | ReturnType<typeof toggleLanguageSwitch>

export const toggleLanguageSwitch = (language: Language) => {
    return {
        type: "TOGGLE_LANGUAGE_SWITCH",
        language
    } as const
}