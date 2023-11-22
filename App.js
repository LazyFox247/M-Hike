import React from "react";
import HomeScreen from "./components/HomeScreen";
import AddScreen from "./components/AddScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Ionicons name="home" color={"blue"} size={24} />,
            tabBarActiveBackgroundColor: "aliceblue",
            tabBarInactiveBackgroundColor: "white",
          }}
        />

        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons name="add-circle" color={"blue"} size={24} />
            ),
            tabBarActiveBackgroundColor: "aliceblue",
            tabBarInactiveBackgroundColor: "white",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
