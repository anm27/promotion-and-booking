import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PlotDetail from "./PlotDetail";

const Area = ({ name, id }) => {
  const navigation = useNavigation();

  return (
    <>
      <PlotDetail key={id} id={id} name={name} />
    </>
  );
};

export default Area;
