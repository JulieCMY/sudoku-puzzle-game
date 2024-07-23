import combineSectionReducers from "combine-section-reducers"
import { configureStore } from "@reduxjs/toolkit"
import { sudoku } from "./sudoku"
import { dialog } from "./dialog"

const store = configureStore({
    reducer: combineSectionReducers({
        sudoku,
        dialog
    })
});

export default store