import React, { useState } from "react";
import {
  View,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useAppContext } from "../AppContext";

const EnterOtp = () => {
  const route = useRoute();

  // Extract the parameters from the route
  const { params } = route;
  const { otpValue, user } = params;

  console.log(user);

  const [otp, setOtp] = useState("");

  const { updateUser } = useAppContext(); // Use the context hook

  const handleOTPChange = (text) => {
    setOtp(text);
  };

  const getUserMobile = async () => {
    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/user_from_hidco_app.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: user, // Change this to your user data
          }),
        }
      );

      console.log("HTTP Response Status:", response.status);

      const data = await response.json();

      console.log("PHP Script Response for userMobile:", data);

      if (data.success) {
        console.log("Mobile no. sent successfully:", data.message);
        // Alert.alert("Booking Confirmed!", data.message);
      } else {
        // console.error("Error sending data:", data.message);
        Alert.alert("Oops!", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigation = useNavigation();

  const loginUser = async () => {
    // Generate a random OTP (you can customize this)

    if (otp === otpValue) {
      // If verification is successful, navigate to the home screen
      // Update user data in the global state
      updateUser(user);
      console.log("Navigating to Home screen with OTP:", otp);
      navigation.navigate("Home", { otp });
      getUserMobile();
    } else {
      // Display an error message to the user
      console.error("Login failed, incorrect OTP");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 -pt-2`}>
      {/* <Header /> */}
      <ImageBackground
        source={require("../img/login-bg.png")}
        style={styles.background}
      >
        <View>
          <View>
            <TextInput
              style={tw`text-xl bg-white text-black pl-4 pr-17 py-3 my-2`}
              placeholder="Enter OTP"
              keyboardType="numeric"
              onChangeText={handleOTPChange}
              value={otp}
            />

            <TouchableOpacity
              style={tw`bg-cyan-600 p-3 rounded-md`}
              onPress={loginUser}
            >
              <Text style={tw`text-xl text-center text-white`}>Login</Text>
            </TouchableOpacity>
          </View>
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
});

export default EnterOtp;
