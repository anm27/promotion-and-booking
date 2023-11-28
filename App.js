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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfile from "./screens/UserProfile";
import Menu from "./screens/Menu";
import ScanQr from "./screens/ScanQr";
import PlotAreas from "./components/PlotAreas";
import Search from "./screens/Search";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PaymentPage from "./screens/PaymentPage";
import Auditoriums from "./screens/Auditoriums";
import Admin from "./screens/Admin";
import Dda from "./screens/Dda";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

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

function MenuNavigator() {
  // const { userData } = useAppContext();
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="MenuUser"
          component={Menu}
          options={{ headerShown: false }}
        />
        {/* You can add more Drawer.Screen components as needed */}
      </Drawer.Navigator>
    </>
  );
}

function NavigateToAllotments() {
  // const authCtx = useContext(AuthContext);

  const RedirectTo = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Plot"
          component={PlotAreas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={RedirectTo}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-home"
                size={24}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ScanQr"
          component={ScanQr}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
      </Tab.Navigator>
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
              name="Auditoriums"
              component={Auditoriums}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bbcc"
              component={Bbcc}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dda"
              component={Dda}
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
            <Stack.Screen
              name="PaymentPage"
              component={PaymentPage}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="UserMenu"
              component={MenuNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={NavigateToAllotments}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{ headerShown: true }}
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
