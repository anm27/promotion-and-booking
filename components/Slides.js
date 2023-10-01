import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

const SLIDES_DATA = [
  {
    id: "1",
    image:
      "https://www.wbhidcoltd.com/assets/frontend/img/happywork/hbanner04.jpg",
    // text: "Dummy Text 1",
  },
  {
    id: "2",
    image:
      "https://www.wbhidcoltd.com/assets/frontend/img/happywork/hbanner05.jpg",
    // text: "Dummy Text 2",
  },
  {
    id: "3",
    image:
      "https://www.wbhidcoltd.com/assets/frontend/img/happywork/hbanner02.jpg",
    // text: "Dummy Text 3",
  },
  {
    id: "4",
    image:
      "https://www.wbhidcoltd.com/assets/frontend/img/happywork/hbanner03.jpg",
    // text: "Dummy Text 4",
  },
  {
    id: "5",
    image:
      "https://www.wbhidcoltd.com/assets/frontend/img/happywork/hbanner01.jpg",
    // text: "Dummy Text 4",
  },
  {
    id: "6",
    image:
      "https://assets.telegraphindia.com/telegraph/2021/Dec/1638498484_03salt-workpod2_4c.jpg",
    // text: "Dummy Text 4",
  },
];

const Slides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < SLIDES_DATA.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        slider.current.scrollToIndex({ index: currentIndex + 1 });
      } else {
        setCurrentIndex(0);
        slider.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, 3000);

    return () => clearInterval(interval); // Clear interval when component is unmounted
  }, [currentIndex]);

  return (
    <FlatList
      ref={slider}
      data={SLIDES_DATA}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScrollEndDrag={(e) => {
        setCurrentIndex(
          Math.floor(
            e.nativeEvent.contentOffset.x / Dimensions.get("window").width
          )
        );
      }}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ width: Dimensions.get("window").width }}>
          <View style={tw`ml-5 mt-6 mr-5 rounded shadow relative`}>
            <Image
              source={{ uri: item.image }}
              style={tw`w-full h-64`}
              resizeMode="cover"
            />
            <Text
              style={[
                tw`text-black text-center text-xl font-bold`,
                { position: "absolute", top: 10, left: 0, right: 0 },
              ]}
            >
              {item.text}
            </Text>
            <Text
              style={tw`flex-1 w-full absolute bottom-0 p-2 bg-gray-700 bg-opacity-70 text-3xl text-white`}
            >
              The Perfect Place for Your Next Meeting
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Slides;
