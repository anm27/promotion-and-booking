import "react-native-gesture-handler";
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
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "./screens/UserProfile";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function WelcomeScreen() {
  const { userData } = useAppContext();

  return (
    <>
      <Header />
      <Text>User Data: {userData ? userData.name : "Guest"}</Text>
    </>
  );
}

function ProfileNavigator() {
  // const { userData } = useAppContext();
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Profile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        {/* You can add more Drawer.Screen components as needed */}
      </Drawer.Navigator>
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
            <Stack.Screen
              name="UserProfile"
              component={ProfileNavigator}
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
      {/* <ProfileNavigator /> */}
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
