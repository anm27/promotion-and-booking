import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import sanityClient from "../sanity";

const Error = ({ userPremisesNo, premises }) => {
  const [premisesNo, setPremisesNo] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    
        *[_type == "plots"] {
  
          premises_num,
          
        }[]

    `
      )
      .then((data) => {
        setPremisesNo(data);
        // console.log(data.plots);
      });
  }, []);

  //   console.log(premisesNo);
  if (
    userPremisesNo !== premises[0] &&
    userPremisesNo !== premises[1] &&
    userPremisesNo !== premises[2] &&
    userPremisesNo !== premises[3] &&
    userPremisesNo !== ""
  ) {
    return (
      <View>
        <View style={tw`m-2 mt-22 h-full`}>
          <Text style={tw`text-2xl text-red-700 mb-2`}>Oops!</Text>
          <View
            style={tw`font-bold text-3xl px-4 py-2 bg-red-700 text-white shadow-lg border-red-700 border mb-2`}
          >
            <Text
              style={tw`flex text-left text-white font-bold text-3xl px-3 mb-1`}
            >
              Premises No. {userPremisesNo}
            </Text>
            <Text
              style={tw`flex text-left text-white font-bold text-3xl px-3 mb-1`}
            >
              Not found!
            </Text>
          </View>

          <Text
            style={tw`font-bold text-3xl px-4 py-2 bg-green-700 text-white shadow-lg border-green-700 border`}
          >
            Kindly visit HIDCO for more information.
          </Text>
        </View>
      </View>
    );
  }
};

export default Error;
