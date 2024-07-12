import { isEqual } from "lodash"

export function arePropsEqual<T>(nextState: T, prevState: T) {
    return isEqual(prevState, nextState)
}