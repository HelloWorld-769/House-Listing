import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

import HomeListScreen from "../screens/HomeListScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import AddHomeScreen from "../screens/AddHomeScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home List"
        component={HomeListScreen}
        options={{ title: "Home Hunt" }}
      />
      <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} />
      <Stack.Screen name="AddHome" component={AddHomeScreen} />
    </Stack.Navigator>
  );
}

function AboutStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="about" component={AboutScreen}  options={{title:"About"}}/>
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name == "Home") {
              iconName = "home";
            } else if (route.name == "About") {
              iconName = "info";
            }

            return <MaterialIcons name={iconName} size={27} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={StackNavigator} options={{headerShown:false}} />
        <Tab.Screen name="About" component={AboutStackNavigator} options={{headerShown:false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
