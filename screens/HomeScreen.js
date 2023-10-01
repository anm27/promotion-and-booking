import React from "react";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc"; // Assuming you have this module
import Header from "../components/Header";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import Popular from "../components/Popular";
import Slides from "../components/Slides";

export default function HomeScreen() {
  return (
    <>
      {Platform.OS === "web" ? (
        // Web Based Coding
        <div>Web specific content</div>
      ) : (
        // Mobile Based Coding

        <SafeAreaView style={tw`bg-gray-200`}>
          <ScrollView>
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
