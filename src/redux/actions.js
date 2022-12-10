export const SET_TODO_LIST="SET_TODO_LIST"
export const SET_TODO_TEXT="SET_TODO_TEXT"

export const setTodoList=list=>dispatch=>{
    dispatch({
        type:SET_TODO_LIST,
        payload:list
    })
}

export const setTodoText=text=>dispatch=>{
    dispatch({
        type:SET_TODO_TEXT,
        payload:text
    })
}