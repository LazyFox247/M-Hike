import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { RadioButton } from "react-native-paper";

const db = SQLite.openDatabase("hike.db");

const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, name, location, date, parking, length, difficulty, description } =
    route.params;

  const [editId, setEditId] = useState();
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDate, setEditDate] = useState();
  const [editParking, setEditParking] = useState("");
  const [editLength, setEditLength] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    setEditId(id);
    setEditName(name);
    setEditLocation(location);
    setEditDate(date);
    setEditParking(parking);
    setEditLength(length);
    setEditDifficulty(difficulty);
    setEditDescription(description);
  }, []);

  const editHike = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "update hike set name=?, location=?, date=?, parking=?, length=?, difficulty=?, description=? where id=?",
        [
          editName,
          editLocation,
          editDate,
          editParking,
          editLength,
          editDifficulty,
          editDescription,
          editId,
        ],
        (tx, results) => {
          navigation.navigate("Show");
        },
        (tx, error) => {
          console.log("Update failed:" + error.message);
        }
      );
    });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name of Hike"
        value={editName}
        onChangeText={setEditName}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={editLocation}
        onChangeText={setEditLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Hike"
        value={editDate}
        onChangeText={setEditDate}
      />

      <RadioButton.Group
        onValueChange={(newValue) => setEditParking(newValue)}
        value={editParking}
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

      <TextInput
        style={styles.input}
        placeholder="Length of Hike"
        value={editLength}
        onChangeText={setEditLength}
      />

      <TextInput
        style={styles.input}
        placeholder="Level of Difficulty"
        value={editDifficulty}
        onChangeText={setEditLength}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={editDescription}
        onChangeText={setEditDescription}
      />

      <Button
        title="Edit Hike"
        onPress={() => {
          editHike();
        }}
      />
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
});

export default EditScreen;
