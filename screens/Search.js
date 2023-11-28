import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import sanityClient from "../sanity";
import Detail from "../components/Detail";
import Error from "../components/Error";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

const Search = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id);

  //   const navigation = useNavigation();
  const [plotNum, setPlotNum] = useState([]);
  const [premisesNum, setPremisesNum] = useState("");

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  const [input1, setInput1] = useState("");
  const [dash1, setDash1] = useState("-");
  const [input2, setInput2] = useState("");
  const [dash2, setDash2] = useState("-");
  const [input3, setInput3] = useState("");

  const userInputText = input1 + dash1 + input2 + dash2 + input3;
  // console.log(userInputText);

  useEffect(() => {
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
        setPlotNum(data?.plots);
        // console.log("Plot in Search:", plotNum);
      });
  }, [id]);

  // console.log(plotNum);

  // console.log(premisesNum[0].premises_num);

  // handlePlotInput = (text) => {
  //   setPremisesNum(text);
  //   // console.log(premisesNum);
  // };

  return (
    <>
      <SafeAreaView>
        <Header />
        <View style={tw`h-96 mt-5`}>
          <Text style={tw`ml-4 font-semibold text-base`}>
            Enter Premises Number below & find your plot:
          </Text>
          <View>
            {/* <Text style={tw`font-bold text-2xl text-center m-5 text-gray-500`}>
            Find Your Plot
          </Text> */}
            <View
              style={tw`flex flex-row bg-green-700 items-center justify-start rounded-md shadow-lg border-gray-800 p-3 m-3`}
            >
              <Ionicons
                style={tw`mx-4`}
                name="ios-search"
                size={24}
                color="white"
              />

              {/* <TextInput
              style={tw`flex-1 text-base text-white`}
              placeholderTextColor={"white"}
              placeholder="Enter Premises No. (e.g. 12-34-56)"
              onChangeText={handlePlotInput}
            /> */}
              <View style={tw`flex flex-row`}>
                <TextInput
                  ref={input1Ref}
                  style={tw`p-1 px-2 mx-2 border border-gray-200 text-xl text-white`}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={(pin) => {
                    setInput1(pin);
                    if (input1 !== "") {
                      input2Ref.current.focus();
                      console.log(input1.length);
                    }
                  }}
                />

                <TextInput
                  style={tw`text-3xl text-center text-white`}
                  maxLength={1}
                  defaultValue="-"
                />

                <TextInput
                  ref={input2Ref}
                  style={tw`p-1 px-2 mx-2 border border-gray-200 text-xl text-white`}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={(pin) => {
                    setInput2(pin);
                    if (input2 !== "") {
                      input3Ref.current.focus();
                    }
                  }}
                />

                <TextInput
                  style={tw`text-3xl text-center text-white`}
                  maxLength={1}
                  defaultValue="-"
                />

                <TextInput
                  ref={input3Ref}
                  style={tw`p-1 px-2 mx-2 border border-gray-200 text-xl text-white`}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={(pin) => {
                    setInput3(pin);
                  }}
                />
              </View>
            </View>
            <View style={tw`flex items-center justify-center mt-4`}>
              <TouchableOpacity
                style={tw`m-2 px-8 py-3 bg-green-700 w-52 rounded`}
                onPress={() => setPremisesNum(userInputText)}
              >
                <Text style={tw`text-white text-center text-xl font-bold`}>
                  Find Your Plot
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex items-center justify-center h-full w-full`}>
              {plotNum.map((plot) => (
                <Detail
                  key={plot._id}
                  id={plot._id}
                  allotedTo={plot.alloted_to}
                  plot_num={plot.plot_num}
                  premises_num={plot.premises_num}
                  userPremisesNo={premisesNum}
                />
              ))}
              <Error
                userPremisesNo={premisesNum}
                premises={plotNum?.map((data) => data.premises_num)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;
