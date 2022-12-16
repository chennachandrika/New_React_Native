import {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveTodo, setTodoList} from '../redux/actions';

const Todo = ({navigation, route}) => {
  // const {todo, id} = route.params;
  // const [todoText, setTodoText] = useState({todo, id});

  const {todoList, activeTodo} = useSelector(
    state => state.todoReducer,
  );  
  // const activeText = todoList.filter(todo => todo.id === activeTodo[0].id);
  const {todo, id} = activeTodo[0];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTodo([{todo,id}]));
  }, [activeTodo.id]);

  const handleTodo = () => {
    const newList = todoList.filter(todo => todo.id !== activeTodo[0].id);
    dispatch(setTodoList([...newList, {id: id, todo: activeTodo[0].todo}]));
    const {todo, id} = activeTodo[0];
    id.set({
      id:id,
      todo:todo
    })
    navigation.navigate('Home');
    //removed params through navigation
  };
  return (
    <View style={{margin: 12}}>
      <TextInput
        onChangeText={text => dispatch(setActiveTodo([{todo:text,id}]))}
        value={activeTodo[0].todo}
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
