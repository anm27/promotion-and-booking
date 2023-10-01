import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Bbcc from "./screens/Bbcc";
import HappyWorks from "./screens/HappyWorks";

const Stack = createNativeStackNavigator();

function WelcomeScreen() {
  return (
    <>
      <HomeScreen />
    </>
  );
}

function SafeApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bbcc"
          component={Bbcc}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HappyWorks"
          component={HappyWorks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <SafeApp />
    </SafeAreaProvider>
  );
}

export default App;
