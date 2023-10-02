import { encode } from "base-64";
import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const sendOTP = async (to, otp, from) => {
  try {
    // Send the OTP using Twilio's REST API
    const authorizationHeader = `Basic ${encode(
      "ACc5978fad8627c82a3d68370ab6675926:3ef71e923308d1036b61557d22269110"
    )}`;

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/ACc5978fad8627c82a3d68370ab6675926/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authorizationHeader,
        },
        body: `To=${encodeURIComponent(
          to
        )}&From=${from}&Body=Your OTP is: ${otp}`,
      }
    );

    if (response.ok) {
      // Implement OTP verification logic here
      // You can prompt the user to enter the OTP and verify it with your server or Twilio Verify service

      // If verification is successful, navigate to the home screen
      return true;
    } else {
      console.error("Error sending OTP:", response.status, response.statusText);
      const responseBody = await response.text();
      console.error("Response Body:", responseBody);
      // Display an error message to the user
      return false;
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Display an error message to the user
    return false;
  }
};

const Login = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");

  // State to store OTP

  const handleLogin = async () => {
    // Generate a random OTP (you can customize this)
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otpValue);
    const userPhoneNumber = "+91" + user; // Replace with the user's phone number

    const fromPhoneNumber = "+15124026795";

    const success = await sendOTP(userPhoneNumber, otpValue, fromPhoneNumber);

    if (success) {
      // If verification is successful, navigate to the home screen
      navigation.navigate("EnterOtp", { otpValue, user });
    } else {
      // Display an error message to the user
      console.error("Login failed", `+91${user}`);
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
          <TextInput
            style={tw`text-xl bg-white text-black pl-4 pr-17 py-3 my-2`}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            onChangeText={(mobile) => {
              setUser(mobile);
            }}
          />

          <View>
            {/* <TextInput
              style={tw`text-xl bg-white text-black pl-4 pr-17 py-3 my-2`}
              placeholder="Enter OTP"
              keyboardType="numeric"
              onChangeText={handleOTPChange}
              value={otp}
            /> */}

            <TouchableOpacity
              style={tw`bg-cyan-700 p-3 rounded-md`}
              onPress={handleLogin}
            >
              <Text style={tw`text-xl text-center text-white`}>Get OTP</Text>
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
