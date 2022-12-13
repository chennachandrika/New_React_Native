import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {useSelector, useDispatch} from 'react-redux';
import {setTodoList, setTodo, setActiveTodo} from '../redux/actions';

import firestore from '@react-native-firebase/firestore';

const TodoApp = ({navigation, route}) => {
  const {todoList, todoAdd} = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();

  const ref = firestore().collection('todos');

  useEffect(()=>{
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { todo, id } = doc.data();
        list.push({
          id,
          todo,
        });
      });

      dispatch(setTodoList(list));
    });
  },[])

  // const [todoList, setTodoList] = useState([]);
  // const [todoText, setTodoText] = useState();
  const handleList = async() => {
    if (todoAdd !== '') {
      const newId=uuidv4()
      dispatch(setTodoList([...todoList, {todo: todoAdd, id:newId }]));
      dispatch(setTodo(''));
      await ref.add({
        id:newId,
        todo: todoAdd,
      });
    }
    else{
      alert('Please Enter Todo')
      return
    }
  };

  // const updateValues = () => {
  //   if (route.params?.todo) {
  //     const prevTodo = todoList.filter((todo) => todo.id === route.params.id);
  //     if (prevTodo[0].id === route.params.id) {
  //       const newList = todoList.filter((todo) => todo.id !== route.params.id);
  //       dispatch(setTodoList([
  //         ...newList,
  //         { id: prevTodo[0].id, todo: route.params.todo },
  //       ]));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   updateValues();
  // }, [route.params?.todo]);

  const renderTodoAdder = () => (
    <View style={styles.addTodo}>
      <TextInput
        onChangeText={text => dispatch(setTodo(text))}
        value={todoAdd}
        style={styles.input}
        placeholder="Add New Todo"
      />
      <Button disabled={todoAdd.length===0} title="+" onPress={() => handleList()} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todoAppWrapper}>
        <Text style={styles.titleFont}>Todo App</Text>
        {renderTodoAdder()}
        <View style={styles.todosWrapper}>
          {todoList &&
            todoList.map((todo, i) => (
              <Text
                key={i}
                numberOfLines={1}
                style={styles.todoContainer}
                onPress={() => {
                  dispatch(setActiveTodo([{id:todo.id,todo:todo.todo}]));
                  navigation.navigate('Todo');
                  //removed params through navigation navigation.navigate("Todo", { todo: todo.todo, id: todo.id })
                }}>
                {todo.todo}
              </Text>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 10,
    margin: 4,
  },
  addTodo: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    color: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  todoAppWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    width: '100%',
  },
  titleFont: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todosWrapper: {
    width: '100%',
    marginTop: 20,
  },
});

export default TodoApp;
