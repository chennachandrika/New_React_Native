import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import todoReducer from "./reducers"

const rootReducers=combineReducers({todoReducer})

export const Store=createStore(rootReducers,applyMiddleware(thunk))