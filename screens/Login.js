import React from "react";
import {
  View,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Login = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 -pt-2`}>
      <ImageBackground
        source={{
          uri: "https://www.wbhidcoltd.com/assets/frontend/img/login-bg.png",
        }}
        style={styles.background}
      >
        <View>
          <TextInput
            style={tw`text-xl bg-white text-black pl-4 pr-17 py-3 my-2`}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={tw`bg-cyan-700 p-3 rounded-md`}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={tw`text-xl text-center text-white`}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Login;
