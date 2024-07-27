import combineSectionReducers from "combine-section-reducers"
import { configureStore } from "@reduxjs/toolkit"
import { sudoku } from "./sudoku"
import { dialog } from "./dialog"
import { config } from "./config"

const store = configureStore({
    reducer: combineSectionReducers({
        config,
        sudoku,
        dialog
    })
});

export default store