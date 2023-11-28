import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";

import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

// import axios from "axios";

// async function getUser() {
//   try {
//     const response = await axios.get("http://127.0.0.1/api/plots/read.php");
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getUser();

// const [loading, setLoading] = useState(true);
// const [error, setError] = useState("");
// const [plot, setPlot] = useState([]);

// if (loading) {
//   return (
//     <View style={tw`flex-1 justify-center`}>
//       <ActivityIndicator size={"large"} color={"blue"} />
//     </View>
//   );
// }

// const getPlotDetails = async () => {
//   try {
//     const res = await fetch(`http://127.0.0.1/api/search_db.php`);
//     const data = await res.json();
//     setPlot(data);
//     console.log(data);
//   setLoading(false);
//   } catch (e) {
//     alert("Error: " + e);
//   }
// finally {
//     setLoading(false)
// }
// };

const DATA = [
  {
    plots: [
      {
        tags: [],
        _id: "618705bc8b76a09fc28d6b37",
        number: "OP-42",
        alloted_to: "Debasis Sen",
        price: "2.4 Cr.",
        size_in_acres: "20",
        location: "AA-2",
      },
      {
        tags: [],
        _id: "618705bc8b76a09fc28d6b50",
        number: "OP-34",
        alloted_to: "Amarendra Mishra",
        price: "1.4 Cr.",
        size_in_acres: "12",
        location: "AA-3",
      },
    ],
  },
];

const Plots = (props) => {
  const { number, alloted_to, price, size_in_acres, location } = props;
  return (
    <>
      <View
        style={tw`flex flex-row p-4 m-4 shadow-sm rounded-sm items-center justify-between w-96`}
      >
        <View style={tw`text-lg`}>
          <Text style={tw`font-bold text-lg`}>{"Plot Number"}</Text>
          <Text style={tw`font-bold text-lg`}>{"Alloted to"}</Text>
          <Text style={tw`font-bold text-lg`}>{"Price"}</Text>
          <Text style={tw`font-bold text-lg`}>{"Size in acres"}</Text>
          <Text style={tw`font-bold text-lg`}>{"Location"}</Text>
        </View>
        <View>
          {/* <MaterialCommunityIcons name="image-area" size={24} color="black" /> */}
          <Text style={tw`font-bold text-lg`}>: {number}</Text>
          <Text style={tw`font-bold text-lg`}>: Sri. {alloted_to}</Text>
          <Text style={tw`font-bold text-lg`}>: {price}</Text>
          <Text style={tw`font-bold text-lg`}>: {size_in_acres}</Text>
          <Text style={tw`font-bold text-lg`}>: {location}</Text>
        </View>
      </View>
    </>
  );
};

const PlotNum = () => {
  return <Text style={tw`text-green-700`}>AB/36/2</Text>;
};

const PlotNum2 = () => {
  return <Text style={tw`text-green-700`}>BD/42/3</Text>;
};

const HomeAllotments = () => {
  const [plotNo, setPlotNo] = useState("");

  handlePlotInput = (text) => {
    setPlotNo(text);
    // let formattedText = text.split(" ").join("");
    // if (formattedText.length > 0) {
    //   formattedText = formattedText.match(new RegExp(".{1,2}", "g")).join("/");
    // }

    // console.log(text);
    // return formattedText;
  };

  const renderItem = ({ item }) => (
    <Plots
      number={item.plots[0].number}
      alloted_to={item.plots[0].alloted_to}
      price={item.plots[0].price}
      size_in_acres={item.plots[0].size_in_acres}
      location={item.plots[0].location}
    />
  );

  if (!plotNo) {
    return (
      <View style={tw`h-96`}>
        <Text style={tw`font-bold text-2xl text-center m-5 text-gray-500`}>
          Find Your Plot
        </Text>
        <View
          style={tw`flex flex-row bg-green-700 items-center justify-start rounded-md shadow-lg border-gray-800 p-3 m-3`}
        >
          <Ionicons
            style={tw`mx-4`}
            name="ios-search"
            size={24}
            color="white"
          />

          <TextInput
            style={tw`flex-1 text-base text-white`}
            placeholderTextColor={"white"}
            placeholder="Enter Plot No."
            onChangeText={handlePlotInput}
            // onChange={(newText) => setPlotNo(newText)}
          />
        </View>

        <View style={tw`flex items-center justify-center h-full w-full`}>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.plots[0]._id}
          ItemSeparatorComponent={() => <View style={tw`bg-green-700 h-2`} />}
        /> */}
          <Text style={{ padding: 10, fontSize: 42 }}>
            {/* {plotNo
              .split(" ")
              .map((word) => word && "🍕")
              .join(" ")} */}
          </Text>
        </View>
      </View>
    );
  } else if (plotNo !== "AB/36/2" && plotNo !== "BD/42/3") {
    return (
      <View style={tw`h-96`}>
        <Text style={tw`font-bold text-2xl text-center m-5 text-gray-500`}>
          Find Your Plot
        </Text>
        <View
          style={tw`flex flex-row bg-green-700 items-center justify-start rounded-md shadow-lg border-gray-800 p-3 m-3`}
        >
          <Ionicons
            style={tw`mx-4`}
            name="ios-search"
            size={24}
            color="white"
          />

          <TextInput
            style={tw`flex-1 text-base text-white`}
            placeholderTextColor={"white"}
            placeholder="Enter Plot No."
            onChangeText={handlePlotInput}
            // defaultValue={plotNo}
          />
        </View>
        <View style={tw`flex justify-center h-full w-full`}>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.plots[0]._id}
          ItemSeparatorComponent={() => <View style={tw`bg-green-700 h-2`} />}
        /> */}
          <Text
            style={tw`flex text-left text-red-700 font-bold text-3xl px-3 mb-4`}
          >
            Plot not found.
          </Text>
          <Text style={tw`text-3xl px-3`}>
            Kindly visit WBHIDCO for further information.
          </Text>
        </View>
      </View>
    );
  } else if (plotNo == "AB/36/2") {
    return (
      <View style={tw`h-96`}>
        <Text style={tw`font-bold text-2xl text-center m-5 text-gray-500`}>
          Find Your Plot
        </Text>
        <View
          style={tw`flex flex-row bg-green-700 items-center justify-start rounded-md shadow-lg border-gray-800 p-3 m-3`}
        >
          <Ionicons
            style={tw`mx-4`}
            name="ios-search"
            size={24}
            color="white"
          />

          <TextInput
            style={tw`flex-1 text-base text-white`}
            placeholderTextColor={"white"}
            placeholder="Enter Plot No."
            onChangeText={handlePlotInput}
            // defaultValue={plotNo}
          />
        </View>
        <View style={tw`flex items-center justify-center h-full w-full`}>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.plots[0]._id}
          ItemSeparatorComponent={() => <View style={tw`bg-green-700 h-2`} />}
        /> */}
          <View style={tw`m-2`}>
            <Text style={tw`font-bold text-3xl mb-4`}>
              Plot No. {<PlotNum />} is alloted to:
            </Text>
            <Text
              style={tw`font-bold text-3xl px-4 py-2 bg-green-700 text-white shadow-lg border-green-700 border`}
            >
              Sri. Debasis Sen
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (plotNo == "BD/42/3") {
    return (
      <View style={tw`h-96`}>
        <Text style={tw`font-bold text-2xl text-center m-5 text-gray-500`}>
          Find Your Plot
        </Text>
        <View
          style={tw`flex flex-row bg-green-700 items-center justify-start rounded-md shadow-lg border-gray-800 p-3 m-3`}
        >
          <Ionicons
            style={tw`mx-4`}
            name="ios-search"
            size={24}
            color="white"
          />

          <TextInput
            style={tw`flex-1 text-base text-white`}
            placeholderTextColor={"white"}
            placeholder="Enter Plot No."
            onChangeText={handlePlotInput}
            // defaultValue={plotNo}
          />
        </View>
        <View style={tw`flex items-center justify-center h-full w-full`}>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.plots[0]._id}
          ItemSeparatorComponent={() => <View style={tw`bg-green-700 h-2`} />}
        /> */}
          <View style={tw`m-2`}>
            <Text style={tw`font-bold text-3xl mb-4`}>
              Plot No. {<PlotNum2 />} is alloted to:
            </Text>
            <Text
              style={tw`font-bold text-3xl px-4 py-2 bg-green-700 text-white shadow-lg border-green-700 border`}
            >
              Sri. Abin Banerjee
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default HomeAllotments;
