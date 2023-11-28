import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import sanityClient from "../sanity";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const PlotDetail = ({ id, name }) => {
  const navigation = useNavigation();
  const [plotNo, setPlotNo] = useState([]);

  useState(() => {
    sanityClient
      .fetch(
        `
        *[_type=="areas" && (_id in path($id))]{
          ...,
          plots[]->{
            ...,
          },
        }[0]
    `,
        { id }
      )
      .then((data) => {
        setPlotNo(data?.plots);
      });
  }, [id]);

  // console.log("PlotDetails :", plotNo);

  return (
    <View>
      <TouchableOpacity
        style={tw`p-3 px-7 mx-4 mt-8 bg-green-700 rounded-md`}
        onPress={() => navigation.navigate("Search", { id: id })}
      >
        <Text style={tw`text-white font-bold text-lg tracking-wider text-lg`}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlotDetail;
