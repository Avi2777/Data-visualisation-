import {applyMiddleware, createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import { appsReducer } from "./reducers"


const middlewares = applyMiddleware(thunk)

const reducer = combineReducers({
  appsReducer
})

export const store = createStore(reducer,middlewares);
