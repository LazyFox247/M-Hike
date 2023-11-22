import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import { RadioButton } from "react-native-paper";

const db = SQLite.openDatabase("hike.db");

const AddScreen = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [parking, setParking] = useState("yes");
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");

  const addHike = () => {
    if (!name) {
      Alert.alert("Name Required", "Name of Hike");
      return;
    }
    if (!location) {
      Alert.alert("location Required", "Location");
      return;
    }
    if (!date) {
      Alert.alert("date Required", "Date of Hike");
      return;
    }
    if (!parking) {
      Alert.alert("parking Required", "Parking");
      return;
    }
    if (!length) {
      Alert.alert("length Required", "Length of Hike");
      return;
    }
    if (!difficulty) {
      Alert.alert("difficulty Required", "Level of Difficulty");
      return;
    }
    if (!description) {
      Alert.alert("description required", "Description");
      return;
    }

    db.transaction((txn) => {
      txn.executeSql(
        "insert into hike(name, location, date, parking, length, difficulty, description) values(?,?,?,?,?,?,?)",
        [name, location, date, parking, length, difficulty, description],
        (tx, results) => {
          setName("");
          setLocation("");
          setDate("");
          setParking("");
          setLength("");
          setDifficulty("");
          setDescription("");
          Alert.alert("Added Hike", "Successfully saved!");
        },
        (tx, error) => {
          console.log("Save error:" + error.message);
        }
      );
    });
  };

  return (
    <View>
      <Text style={{ fontSize: 36 }}>M-Hike</Text>

      <TextInput
        style={styles.input}
        placeholder="Name of Hike"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Hike"
        value={date}
        onChangeText={setDate}
      />
      <View style={styles.text}>
        <Text style={{ fontSize: 30 }}>Parking</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setParking(newValue)}
          value={parking}
        >
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Text style={{ fontSize: 20 }}>Yes</Text>
              <RadioButton value="yes" />
            </View>
            <View style={styles.rowContainer}>
              <Text style={{ fontSize: 20 }}>No</Text>
              <RadioButton value="no" />
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Length of Hike"
        value={length}
        onChangeText={setLength}
      />

      <TextInput
        style={styles.input}
        placeholder="Level of Difficulty"
        value={difficulty}
        onChangeText={setDifficulty}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Add Hike" onPress={addHike} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    borderWidth: 2,
    borderColor: "gray",
    padding: 5,
    margin: 10,
    fontSize: 20,
    borderRadius: 5,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddScreen;
