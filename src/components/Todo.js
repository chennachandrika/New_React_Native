import {useState,useEffect} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useSelector,useDispatch} from "react-redux"
import {setTodoList,setTodoText} from "../redux/actions"

const Todo = ({navigation, route}) => {
  const {todo, id} = route.params;
  // const [todoText, setTodoText] = useState({todo, id});

  const {todoList,todoText}=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()
  
  useEffect(() => {
    dispatch(setTodoText(todo))
  }, [route.params?.todo]);

  const handleTodo = () => {
    const newList = todoList.filter((todo) => todo.id !== route.params.id);
    dispatch(setTodoList([
      ...newList,
      { id: id, todo: todoText },
    ]));
    navigation.navigate('Home');
  };
  return (
    <View style={{margin: 12}}>
      <TextInput
        onChangeText={text => dispatch(setTodoText(text))}
        value={todoText}
        style={styles.todoContainer}
        placeholder="Edit Todo"
      />
      <Button title="Save" onPress={() => handleTodo()} />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 10,
    margin: 4,
  },
});

export default Todo;
