import {SET_TODO_LIST,SET_TODO_TEXT,SET_TODO,SET_ACTIVE_TODO} from "./actions"

const initialState={
    todoList:[],
    todoAdd:"",
    // todoText:"",
    activeTodo:""
}

function todoReducer(state=initialState,action){
    switch(action.type){
        case SET_TODO_LIST:
            return {...state,todoList:action.payload}
        case SET_TODO:
            return {...state,todoAdd:action.payload}
        // case SET_TODO_TEXT:    
        //     return {...state,todoText:action.payload}
        case SET_ACTIVE_TODO:
            return {...state,activeTodo:action.payload}
        default:
            return state;
    }
}

export default todoReducer