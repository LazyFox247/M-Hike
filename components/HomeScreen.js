import React, { useEffect } from "react";
import DisplayScreen from "./DisplayScreen";
import EditScreen from "./EditScreen";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hike.db");

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeScreen = () => {
  useEffect(() => createTable, []);

  const createTable = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "create table if not exists hike" +
          "(id integer primary key autoincrement, name text, location text, date text, parking text, length text, difficulty text, description text)",
        [],
        (tx, results) => {
          console.log("Hike Table has been Created!");
        },
        (tx, error) => {
          console.log("Create failed: " + error.message);
        }
      );
    });
  };
  return (
    <Stack.Navigator initialRouteName="Display">
      <Stack.Screen name="Display" component={DisplayScreen} />

      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
