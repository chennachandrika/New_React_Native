import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoApp from "./components/TodoApp";
import Todo from "./components/Todo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TodoApp}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Todo"
          component={Todo}
          options={{ title: "Edit Todo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
