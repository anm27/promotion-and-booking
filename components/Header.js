import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  // const authCtx = useAppContext();
  const navigation = useNavigation();
  return (
    <>
      <View style={tw`flex flex-row justify-between px-5 pb-5 items-center`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserMenu");
          }}
        >
          <MaterialIcons name="menu-open" size={45} color="green" />
        </TouchableOpacity>
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
      </View>
    </>
  );
};

export default Header;
