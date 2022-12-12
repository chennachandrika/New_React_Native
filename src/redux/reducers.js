import {SET_TODO_LIST,SET_TODO_TEXT,SET_TODO} from "./actions"

const initialState={
    todoList:[],
    todoAdd:"",
    todoText:""
}

function todoReducer(state=initialState,action){
    switch(action.type){
        case SET_TODO_LIST:
            return {...state,todoList:action.payload}
        case SET_TODO:
            return {...state,todoAdd:action.payload}
        case SET_TODO_TEXT:    
            return {...state,todoText:action.payload}
        default:
            return state;
    }
}

export default todoReducer