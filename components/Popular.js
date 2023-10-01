import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const Popular = () => {
  return (
    <>
      <View style={tw`m-5`}>
        <Text style={tw`font-bold text-3xl text-gray-700`}>Popular</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={tw`ml-5 bg-white pr-5`}
      >
        <TouchableOpacity style={tw`ml-6 py-5 pr-5`}>
          <View style={tw`rounded-md shadow-md bg-green-700`}>
            <Image
              source={{
                uri: "https://www.millenniumpost.in/h-upload/2023/04/09/1600x960_687335-whatsapp-image-2023-04-09-at-92221-pm.jpg",
              }}
              style={tw`m-auto h-40 w-60 rounded-sm bg-gray-300 p-10`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text
              style={tw`text-center text-white font-bold text-lg p-2 w-60 uppercase`}
            >
              DHONO DHANYO AUDITORIUM, ALIPORE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`ml-6 py-5 pr-5 `}>
          <View style={tw`rounded-md shadow-md bg-green-700`}>
            <Image
              source={{
                uri: "https://www.showsbee.com/newmaker/www/u/2022/20223/com_img/Biswa-Bangla-Convention-Centre.jpg",
              }}
              style={tw`m-auto h-40 w-60 rounded-sm bg-gray-300 p-10`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text
              style={tw`text-center text-white font-bold text-lg p-2 w-60 uppercase`}
            >
              Biswa Bangla Convention Center
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={tw`ml-6 py-5 pr-5`}>
          <View style={tw`rounded-md shadow-md bg-green-700`}>
            <Image
              source={{
                uri: "https://coworkingers.com/wp-content/uploads/2023/07/2022-10-05-min.jpg",
              }}
              style={tw`m-auto h-40 w-60 rounded-sm bg-gray-300 p-10`}
              // Aap yahaan image ke size adjust kar sakte hain
            />
            <Text
              style={tw`text-center text-white font-bold text-lg p-2 w-60 uppercase`}
            >
              HAPPY WORKS - WORKING POD
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Popular;
