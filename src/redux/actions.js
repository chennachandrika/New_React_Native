export const SET_TODO_LIST="SET_TODO_LIST"
export const SET_TODO_TEXT="SET_TODO_TEXT"
export const SET_TODO="SET_TODO"

export const setTodoList=list=>dispatch=>{
    dispatch({
        type:SET_TODO_LIST,
        payload:list
    })
}

export const setTodo=text=>dispatch=>{
    dispatch({
        type:SET_TODO,
        payload:text
    })
}

export const setTodoText=text=>dispatch=>{
    dispatch({
        type:SET_TODO_TEXT,
        payload:text
    })
}