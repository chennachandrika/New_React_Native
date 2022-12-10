import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {useSelector,useDispatch} from "react-redux"
import {setTodoList,setTodoText} from "../redux/actions"


const TodoApp = ({ navigation, route }) => {

  const {todoList,todoText}=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()

  // const [todoList, setTodoList] = useState([]);
  // const [todoText, setTodoText] = useState();
  const handleList = () => {
    if (todoText !== "") {
      dispatch(setTodoList([...todoList, { todo: todoText, id: uuidv4() }]));
      dispatch(setTodoText(""));
    }
  };
  const updateValues = () => {
    if (route.params?.todo) {
      const prevTodo = todoList.filter((todo) => todo.id === route.params.id);
      if (prevTodo[0].id === route.params.id) {
        const newList = todoList.filter((todo) => todo.id !== route.params.id);
        dispatch(setTodoList([
          ...newList,
          { id: prevTodo[0].id, todo: route.params.todo },
        ]));
      }
    }
  };
  useEffect(() => {
    updateValues();
  }, [route.params?.todo]);
  const renderTodoAdder = () => (
    <View style={styles.addTodo}>
      <TextInput
        onChangeText={(text) => dispatch(setTodoText(text))}
        value={todoText}
        style={styles.input}
        placeholder="Add New Todo"
      />
      <Button title="+" onPress={() => handleList()} />
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
                onPress={() =>
                  navigation.navigate("Todo", { todo: todo.todo, id: todo.id })
                }
              >
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
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 10,
    margin: 4,
  },
  addTodo: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderColor: "#EBEBEB",
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    color: "black",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  todoAppWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    width: "100%",
  },
  titleFont: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  todosWrapper: {
    width: "100%",
    marginTop: 20,
  },
});

export default TodoApp;
