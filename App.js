import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "Amer", key: "1" },
    { text: "Amco", key: "2" },
    { text: "Ameri", key: "3" },
    { text: "Carape", key: "4" },
    { text: "Carape", key: "5" }
  ]);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key !== key); 
    });
  };

  const submitHandler = item => {
    if (item.length > 3) {
      setTodos(prevTodos => {
        return [{ text: item, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OPS!", "Todos must be over three characters long", [
        { text: "Understood", onPress: () => console.log("Closed") }
      ]);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => {
                return <TodoItem item={item} pressHandler={pressHandler} />;
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
    padding: 40
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
