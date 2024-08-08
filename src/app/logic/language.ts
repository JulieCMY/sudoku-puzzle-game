import { Language } from "../models/config";
import { chineseText, englishText } from "../text/text";

export const getTextByLanguage = (language: Language) => {
    return language === Language.EN ? englishText : chineseText
}