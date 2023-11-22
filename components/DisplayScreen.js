import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = SQLite.openDatabase("hike.db");

const DisplayScreen = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [hikeList, setHikeList] = useState([]);

  useEffect(() => displayAllHikes, [isFocused]);

  const displayAllHikes = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "select * from hike",
        [],
        (tx, results) => {
          console.log("No. of records:" + results.rows.length);

          let temp = [];

          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setHikeList(temp);
        },
        (tx, error) => {
          console.log("Display error:" + error.message);
        }
      );
    });
  };

  const confirmAlert = (hike_id) => {
    Alert.alert("Confirm", "Are you sure you want to delete it?", [
      {
        text: "NO",
      },
      {
        text: "YES",
        onPress: () => deleteHike(hike_id),
      },
    ]);
  };

  const deleteHike = (hike_id) => {
    db.transaction((txn) => {
      txn.executeSql(
        "delete from hike where id=?",
        [hike_id],
        (tx, results) => {
          Alert.alert("Deleted", "Successfully deleted!");

          displayAllHikes();
        },
        (tx, error) => {
          console.log("Deletion error:" + error.message);
        }
      );
    });
  };

  const updateHike = (item) => {
    navigation.navigate("Edit", {
      id: item.id,
      name: item.name,
      location: item.location,
      doh: item.date,
      pa: item.parking,
      loh: item.length,
      lod: item.difficulty,
      description: item.description,
    });
  };

  const showItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text>{item.location}</Text>
        <Text>{item.date}</Text>
        <Text>{item.parking}</Text>
        <Text>{item.length}</Text>
        <Text>{item.difficulty}</Text>
        <Text>{item.description}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              updateHike(item);
            }}
          >
            <MaterialCommunityIcons
              name="book-edit"
              color={"green"}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => confirmAlert(item.id)}
          >
            <MaterialCommunityIcons name="delete" color={"red"} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Hike List</Text>

      <FlatList
        style={{ marginBottom: 50 }}
        data={hikeList}
        renderItem={({ item }) => showItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  item: {
    width: "100%",
    margin: 10,
    padding: 10,
    backgroundColor: "skyblue",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default DisplayScreen;
