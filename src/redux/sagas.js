import {takeEvery} from 'redux-saga/effects'
import firestore from '@react-native-firebase/firestore';

function* setTodoList(){
    const list = [];
    const ref = firestore().collection('todos');
    ref.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {todo, id} = doc.data();
          list.push({
            id,
            todo,
          });
        });
    })
    yield put({type:'SET_TODO_LIST_SUCCESS', payload:list})
}

//generators
function* mySaga(){
    yield takeEvery('SET_TODO_LIST',setTodoList)
}

export default mySaga;