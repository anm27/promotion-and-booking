import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import sanityClient from "../sanity";

const Detail = ({ allotedTo, plot_num, premises_num, userPremisesNo }) => {
  const [premises, setPremises] = useState([]);

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
        setPremises(data);
        console.log(data.plots);
      });
  }, []);

  console.log("Premises: ", premises);

  if (!userPremisesNo) {
    return (
      <View>
        {/* <Text>
          NOTE: You can search your property by entering Premises Number only in
          the format {"(12-34-56)"}.
        </Text> */}
      </View>
    );
  } else if (userPremisesNo == premises_num) {
    return (
      <View>
        <View style={tw`m-2 mt-22 h-full`}>
          <Text style={tw`font-bold text-3xl mb-4 tracking-wider`}>
            Plot No. {plot_num} with Premises No. {userPremisesNo} is alloted
            to:
          </Text>
          <Text
            style={tw`font-bold text-3xl px-4 py-2 bg-green-700 text-white shadow-lg border-green-700 border`}
          >
            Sri. {allotedTo}
          </Text>
        </View>
      </View>
    );
  }
  // else if (userPremisesNo !== premises_num && ) {
  //   return (
  //     <View>
  //       <View style={tw`m-2`}>
  //         <Text style={tw`font-bold text-3xl mb-4`}>
  //           Premises No. {userPremisesNo} Not found
  //         </Text>
  //         <Text
  //           style={tw`font-bold text-3xl px-4 py-2 bg-green-700 text-white shadow-lg border-green-700 border`}
  //         >
  //           Kindly visit HIDCO for more information
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }
};

export default Detail;
