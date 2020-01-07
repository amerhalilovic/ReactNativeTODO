import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
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

var firebaseConfig = {
  apiKey: "AIzaSyCc-DnRmfH9T38ZdL-S-wWWaB4PKvwbD9g",
  authDomain: "react-firebase-19421.firebaseapp.com",
  databaseURL: "https://react-firebase-19421.firebaseio.com",
  projectId: "react-firebase-19421",
  storageBucket: "react-firebase-19421.appspot.com",
  messagingSenderId: "999387387625",
  appId: "1:999387387625:web:3ff5ba55e736274e958278",
  measurementId: "G-LL3D4RBWE2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(prevTodos => {
      return [{ text: "Burch", key: Math.random().toString() }, ...prevTodos];
    });
  }, []);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key !== key);
    });
    firebase
      .database()
      .ref("todos")
      .set(todos);
  };

  const submitHandler = item => {
    if (item.length > 3) {
      setTodos(prevTodos => {
        return [{ text: item, key: Math.random().toString() }, ...prevTodos];
      });

      firebase
        .database()
        .ref("todos")
        .set(todos);
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
