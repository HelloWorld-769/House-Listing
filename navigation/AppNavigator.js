import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeListScreen from "../screens/HomeListScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import AddHomeScreen2 from "../screens/AddHomeScreen2";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home List"
          component={HomeListScreen}
          options={{ title: "Home Hunt" }}
        />
        <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} />
        <Stack.Screen
          name="AddHome2"
          component={AddHomeScreen2}
          options={{ title: "Create Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
