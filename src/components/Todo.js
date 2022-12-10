import {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

const Todo = ({navigation, route}) => {
  const {todo, id} = route.params;
  const [todoText, setTodoText] = useState({todo, id});
  const handleTodo = () => {
    navigation.navigate('Home', {todo: todoText.todo, id: todoText.id});
  };
  return (
    <View style={{margin: 12}}>
      <TextInput
        onChangeText={text => setTodoText({...todoText, todo: text})}
        value={todoText.todo}
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
