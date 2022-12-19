import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

import todoReducer from "./reducers"

let composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware()

const rootReducers=combineReducers({todoReducer})

export const Store=createStore(rootReducers,composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(mySaga)