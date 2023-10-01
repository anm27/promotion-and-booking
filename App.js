import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Bbcc from "./screens/Bbcc";
import HappyWorks from "./screens/HappyWorks";
import EnterOtp from "./screens/EnterOtp";
import { AppProvider } from "./AppContext";
import { useAppContext } from "./AppContext";
import Header from "./components/Header";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

function WelcomeScreen() {
  const { userData } = useAppContext();

  return (
    <>
      <Header />
      <Text>User Data: {userData ? userData.name : "Guest"}</Text>
    </>
  );
}

function AppNavigator() {
  const { userData } = useAppContext();
  console.log(userData);

  // Define the screens you want to render

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userData ? (
          <>
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
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EnterOtp"
              component={EnterOtp}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
