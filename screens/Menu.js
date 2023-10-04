import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import ImageModal from "../components/ImageModal";

const Menu = () => {
  const authCtx = useAppContext();
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetch("https://www.wbhidcoltd.com/insert_newsroom_in_hidco_app.php")
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(newsData);
  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`flex flex-row justify-between px-5 pb-5 items-center`}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <MaterialIcons name="menu-open" size={45} color="green" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          >
            <MaterialCommunityIcons
              name="face-man-profile"
              size={45}
              color="green"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-green-700 rounded-md`}
        >
          <Text style={tw`text-white`}>
            Find your properties using Premises Number
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={tw`mx-5 px-1 py-2 text-3xl font-bold`}>Newsroom</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Text style={tw`ml-6`}>Loading...</Text>
        ) : (
          newsData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={tw`mx-6`}
              onPress={() => openImageModal(item.large_image)}
            >
              <View style={tw`rounded-md bg-cyan-700 py-3 px-3`}>
                <View
                  style={tw`flex flex-row justify-between items-center gap-2`}
                >
                  <Text
                    style={tw`px-2 py-2 mb-2 bg-white text-base text-cyan-700`}
                  >
                    {item.date}
                  </Text>
                  <Image
                    source={{
                      uri:
                        "https://www.wbhidcoltd.com/upload_file/newsroom/" +
                        item.logo_img,
                    }}
                    style={tw`m-auto w-40 h-10 bg-white mb-2.3 bg-contain`}
                  />
                </View>
                <View style={{ height: 200 }}>
                  <ImageBackground
                    source={{
                      uri:
                        "https://www.wbhidcoltd.com/upload_file/newsroom/" +
                        item.large_image,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={tw`px-3 py-2 my-2 bg-white text-cyan-700 w-70 h-18`}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={tw`mt-4`}>
        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-cyan-700 rounded-md `}
        >
          <Text>Auditoriums</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-cyan-700 rounded-md `}
        >
          <Text>Accomodations/Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-cyan-700 rounded-md `}
        >
          <Text>Art Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-cyan-700 rounded-md `}
        >
          <Text>Workshops, Conference Rooms, Seminar Halls</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mx-6 my-2 shadow-lg py-2 px-3 bg-cyan-700 rounded-md `}
        >
          <Text>
            Lawns, Ground, Ceremony Halls, Open Theatre, Museum Space, Dining
            Hall
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={tw`flex mx-6 bg-white px-2 m-auto w-100`}>
          <MaterialIcons
            style={tw`m-auto`}
            name="logout"
            size={24}
            color="red"
            onPress={authCtx.logOut}
          />
          <Text style={tw`text-xs text-center text-red-600`}>Log Out</Text>
        </TouchableOpacity>
      </View>
      {/* Render the image modal if an image is selected */}
      {selectedImage && (
        <ImageModal
          visible={!!selectedImage}
          imageUrl={selectedImage}
          onClose={closeImageModal}
        />
      )}
    </SafeAreaView>
  );
};

export default Menu;
