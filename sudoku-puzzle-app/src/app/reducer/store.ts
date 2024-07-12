import combineSectionReducers from "combine-section-reducers"
import { configureStore } from "@reduxjs/toolkit"
import { sudokuReducer } from "./sudoku"

const store = configureStore({
    reducer: combineSectionReducers({
        sudoku: sudokuReducer
    })
});

export default store