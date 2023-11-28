import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={tw`mx-5`}
          onPress={() => {
            navigation.navigate("Auditoriums");
          }}
        >
          <View style={tw`rounded-md bg-green-700 py-3 px-3`}>
            <Image
              source={require("../img/auditorium.png")}
              style={tw`m-auto w-7 h-7 w-7 h-7`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text style={tw`text-white pt-2 font-bold text-center text-xs`}>
              Auditoriums
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-5`}>
          <View style={tw`rounded-md bg-green-700 py-3 px-3`}>
            <Image
              source={require("../img/hotel.png")}
              style={tw`m-auto w-7 h-7`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text style={tw`text-white pt-2 font-bold text-center text-xs`}>
              Accomodations
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HappyWorks")}
          style={tw`mx-5`}
        >
          <View style={tw`rounded-md bg-green-700 py-3 px-3`}>
            <Image
              source={require("../img/workspace.png")}
              style={tw`m-auto w-7 h-7`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text style={tw`text-white pt-2 font-bold text-center text-xs`}>
              Happy Works
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-5`}>
          <View style={tw`rounded-md bg-green-700 py-3 px-3`}>
            <Image
              source={require("../img/banquet.png")}
              style={tw`m-auto w-7 h-7`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text style={tw`text-white pt-2 font-bold text-center text-xs`}>
              Banquets
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Categories;
