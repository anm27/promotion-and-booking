import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <>
      <View style={tw`flex flex-row justify-between px-5 py-5 items-center`}>
        <View>
          <MaterialIcons name="menu-open" size={45} color="green" />
        </View>
        <View>
          <MaterialCommunityIcons
            name="face-man-profile"
            size={45}
            color="green"
          />
        </View>
      </View>
    </>
  );
};

export default Header;
