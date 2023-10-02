import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const UserProfile = () => {
  const authCtx = useAppContext();
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <View style={tw`flex flex-row justify-between px-5 pb-5 items-center`}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserProfile");
              }}
            >
              <MaterialCommunityIcons
                name="face-man-profile"
                size={45}
                color="green"
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <MaterialIcons
                name="logout"
                size={24}
                color="red"
                onPress={authCtx.logOut}
              />
              <Text style={tw`text-xs text-center text-red-600`}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UserProfile;
