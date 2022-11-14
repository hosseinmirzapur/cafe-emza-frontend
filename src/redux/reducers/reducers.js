import {combineReducers} from "redux";
import {loginReducer, userReducer} from "./loginReducers";
import {branchIdReducer, optionsReducer} from "./optionsReducer";

export const reducers = combineReducers({
    login: loginReducer,
    user: userReducer,
    options: optionsReducer,
    branchId: branchIdReducer
})