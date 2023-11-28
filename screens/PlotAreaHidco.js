import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import sanityClient from "../sanity";
import Area from "..components/Area";
import Header from "../components/Header";

const PlotAreaHidco = () => {
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
      });
  }, []);

  // console.log(areas);

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

export default PlotAreaHidco;
