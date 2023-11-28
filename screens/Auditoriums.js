// ...
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Easing,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Categories from "../components/Categories";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Auditoriums = () => {
  const [auditoriumData, setAuditoriumData] = useState([]);

  const animatedValue = new Animated.Value(1);

  const navigation = useNavigation();

  useEffect(() => {
    const moveAnimation = Animated.timing(animatedValue, {
      toValue: 0.5,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: false,
    });

    const sequence = Animated.sequence([
      moveAnimation,
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);

    const loop = Animated.loop(sequence);

    // Start the animation and store the reference
    const animation = loop.start();

    // Clean up the animation when the component is unmounted
    return () => {
      // Check if animation is defined before stopping
      if (animation) {
        animation.stop();
      }
    };
  }, [animatedValue]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("https://www.wbhidcoltd.com/hidco_audis.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setAuditoriumData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView style={tw``}>
          {/* <Image source={require("../img/bgbs.png")} style={tw`flex-row`} /> */}

          {/* <View style={tw`flex-1 justify-center items-center`}>
            <AnimatedImage
              source={require("../img/bgbs.png")}
              style={[
                tw`flex-row absolute top-50`,
                {
                  transform: [
                    { scale: animatedValue }, // Scale the image
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200], // Change this value based on your desired movement
                      }),
                    },
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 300], // Change this value based on your desired movement
                      }),
                    },
                  ],
                },
              ]}
            />
          </View> */}

          <Header />
          <Categories />
          {auditoriumData && auditoriumData.length > 0 ? (
            auditoriumData.map((auditorium, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Navigate to the screen related to the clicked auditorium
                  navigation.navigate(auditorium.screen_name, {
                    auditoriumData: auditorium,
                  });
                }}
                style={tw`flex mx-2 mb-2 mt-5 bg-white bg-opacity-50 rounded-md mb-4`}
              >
                <View style={tw`flex flex-row`}>
                  {auditorium.audi_image ? (
                    <>
                      <View
                        style={tw`flex relative border-green-700 py-.2 pl-.2 border-t-2 border-l-2 border-b-2 rounded-tl rounded-bl`}
                      >
                        <Image
                          source={{
                            uri: auditorium.audi_image,
                          }}
                          // source={{ uri: `./img/${auditorium.audi_image}` }}
                          style={tw`w-50 h-50 rounded-l`}
                        />
                        <View
                          style={tw`absolute -bottom-4 right-0 w-30 py-1.5 bg-green-700 rounded-tl rounded-bl opacity-90`}
                        >
                          <Text
                            style={tw`text-white text-center font-bold text-base`}
                          >
                            Book Now!
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    <Text>No Image Available</Text>
                  )}
                  <View
                    style={tw`flex justify-center items-start p-.2 border-t-2 border-r-2 border-cyan-700 border-b-2 rounded-tr rounded-br`}
                  >
                    <Text
                      style={tw`text-xl px-2 w-50 font-semibold text-gray-700`}
                    >
                      {auditorium.audi_name}
                    </Text>
                    <Text style={tw`px-2 py-1 w-50`}>
                      {auditorium.audi_location}
                    </Text>
                    <View
                      style={tw`flex-row justify-between items-center px-2 py-1`}
                    >
                      <Text>Price as low as: </Text>
                      <Text>Rs. {auditorium.price_as_low_as}/-</Text>
                    </View>
                    <View
                      style={tw`flex-row justify-between items-center px-2 py-1 mb-7`}
                    >
                      <Text>Discount upto: </Text>
                      <Text>{auditorium.discount_upto}</Text>
                    </View>
                    <View
                      style={tw`flex-row absolute -bottom-4 left-0 rounded-tr rounded-br bg-cyan-700 items-center px-9 py-1.5`}
                    >
                      <AntDesign
                        style={{ opacity: 0.5, marginRight: 3 }}
                        name="star"
                        size={17}
                        color="white"
                      />
                      <Text style={tw`text-base text-white`}>5.0</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={tw`text-center text-2xl`}>Loading...</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Auditoriums;
