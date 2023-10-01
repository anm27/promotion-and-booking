import React, { useEffect } from "react";
import { Platform, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc"; // Assuming you have this module
import Header from "../components/Header";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import Popular from "../components/Popular";
import Slides from "../components/Slides";
import { useAppContext } from "../AppContext";

export default function HomeScreen() {
  const { userData } = useAppContext(); // Access user data from the global state
  // useEffect(() => {
  //   console.log("User Data:", userData);
  // }, [userData]);

  return (
    <>
      {Platform.OS === "web" ? (
        // Web Based Coding
        <div>Web specific content</div>
      ) : (
        // Mobile Based Coding

        <SafeAreaView style={tw`bg-gray-200`}>
          <ScrollView>
            <Text>{userData}</Text>
            <Header />
            <Categories />
            <Slides />
            <Featured />
            <Popular />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, // You can specify your desired width
    height: 200, // You can specify your desired height
    resizeMode: "cover",
  },
});
