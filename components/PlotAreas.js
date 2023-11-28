import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import sanityClient from "../sanity";
import Area from "./Area";
import Header from "./Header";

const PlotAreas = () => {
  const [areas, setAreas] = useState([]);
  const [plotNumber, setPlotNumber] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "areas"] {
      ...,
      
    }
    `
      )
      .then((data) => {
        setAreas(data);
        console.log("Area from Plotarea", data);
      });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "plots"] {
      ...,
      
    }
    `
      )
      .then((data) => {
        setPlotNumber(data);
        console.log("PlotNum from Plotarea", data);
      });
  }, []);
  // console.log("Area from Plotarea", areas);
  // console.log("PlotNum from Plotarea", plotNumber);

  return (
    <>
      <View style="">
        <Header />
        <View style={tw`mt-6`}>
          <Text
            style={tw`text-2xl text-center font-bold text-gray-500 tracking-wider`}
          >
            Select Area & Proceed
          </Text>
        </View>

        {areas?.map((areas) => (
          <Area key={areas._id} id={areas._id} name={areas.name} />
        ))}
      </View>
    </>
  );
};

export default PlotAreas;
