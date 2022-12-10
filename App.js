import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoApp from "./src/components/TodoApp";
import Todo from "./src/components/Todo";

import {Provider} from "react-redux"
import {Store} from "./src/redux/store"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
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
    </Provider>
  );
}
