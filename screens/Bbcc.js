import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

const Bbcc = () => {
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDatePickerHall, setActiveDatePickerHall] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef(null);
  const screenWidth = Dimensions.get("window").width - 25;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hallDates, setHallDates] = useState({});

  const handleNext = () => {
    const newPosition = (currentSlide + 1) * screenWidth;
    if (newPosition < screenWidth * data.length) {
      scrollRef.current.scrollTo({ x: newPosition, animated: true });
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    const newPosition = (currentSlide - 1) * screenWidth;
    if (newPosition >= 0) {
      scrollRef.current.scrollTo({ x: newPosition, animated: true });
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getPriceForDate = (date, rent) => {
    const day = date.getDay();
    rent = Number(rent); // Convert to number if not already

    // Assuming Saturday and Sunday have a different price
    if (day === 0 || day === 6) {
      return rent * 1.2;
    } else {
      return rent;
    }
  };

  const [price, setPrice] = useState(getPriceForDate(selectedDate));

  const onDateChange = (itemId, event, newDate) => {
    setShowDatePicker(Platform.OS === "ios");

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (newDate) {
      setSelectedDate(newDate);

      const updatedHallDates = { ...hallDates };
      updatedHallDates[itemId] = {
        date: newDate,
        price: getPriceForDate(
          newDate,
          data.find((item) => item.id === itemId)?.rent || 0 // Ensure rent is defined
        ),
      };
      setHallDates(updatedHallDates);
    }
  };

  const formattedDate = `${selectedDate.getDate()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getFullYear()}`;

  // Get today's date and time
  const today = new Date();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch("https://www.wbhidcoltd.com/demo.php");
      let responseText = await response.text();
      console.log("Server Response:", responseText);

      // Continue with JSON parsing if the responseText looks like JSON
      let jsonData = JSON.parse(responseText);
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <Categories />

        <ScrollView
          vertical={true}
          style={tw`m-4 bg-white rounded-lg shadow-md overflow-hidden`}
        >
          <Image
            source={{
              uri: "https://www.showsbee.com/newmaker/www/u/2022/20223/com_img/Biswa-Bangla-Convention-Centre.jpg",
            }}
            style={tw`w-full h-47`}
            resizeMode="cover"
          />

          <ScrollView
            ref={scrollRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={tw`pt-4 px-4`}
          >
            {data.map((item, index) => (
              <View key={index} style={tw`flex flex-row gap-10 pr-7`}>
                <View style={tw`w-92`}>
                  <View>
                    <Text style={tw`text-xl font-bold mb-2`}>{item.title}</Text>
                    <Text style={tw`text-gray-600`}>
                      {"Narkel Bagan, New Town"}
                    </Text>
                    <Text
                      style={tw`text-white bg-cyan-700 my-2 py-2 text-center text-xl font-bold`}
                    >
                      {item.hall_type} ({item.hall_num})
                    </Text>
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>Seating Capacity :</Text>
                      <Text>{item.seating_capacity}</Text>
                    </View>
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>Security Deposit :</Text>
                      <Text>{item.deposit}</Text>
                    </View>
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>
                        For additional hours @ Rs.{item.additional_hour_at}/-
                        per hour (Subject to a max. of 3 hours)
                      </Text>
                    </View>
                  </View>
                  <Text style={tw`text-green-700 py-2`}>
                    {"Select Date below to see price for that date:"}
                  </Text>
                  <View style={tw`flex-row justify-between items-center mt-2`}>
                    <TouchableOpacity
                      style={tw`bg-yellow-700 p-3`}
                      onPress={() => setActiveDatePickerHall(item.id)}
                    >
                      <Text style={tw`text-xs text-white`}>
                        Selected Date :
                      </Text>
                      <Text style={tw`text-white font-bold`}>
                        {hallDates[item.id]
                          ? `${hallDates[item.id].date.getDate()}/${
                              hallDates[item.id].date.getMonth() + 1
                            }/${hallDates[item.id].date.getFullYear()}`
                          : formattedDate}
                      </Text>
                    </TouchableOpacity>
                    <View style={tw`bg-gray-300 p-3`}>
                      <Text style={tw`text-green-700 font-bold text-xs`}>
                        Rent 9 am to 9 pm :
                      </Text>
                      <Text style={tw`text-green-700 font-bold`}>
                        Rs.{" "}
                        {hallDates[item.id]
                          ? hallDates[item.id].price
                          : getPriceForDate(selectedDate, item.rent)}
                        /-
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={tw`bg-green-700 p-3 mt-3 mb-1 rounded-lg`}
                  >
                    <Text style={tw`text-white font-bold text-center text-lg`}>
                      Proceed to Booking
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={tw`flex-row justify-around items-center mb-2 mx-4`}>
            <TouchableOpacity style={tw`bg-cyan-700 p-3`} onPress={handlePrev}>
              <Text style={tw`text-white`}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`bg-cyan-700 p-3`} onPress={handleNext}>
              <Text style={tw`text-white`}>Next</Text>
            </TouchableOpacity>
          </View>

          {activeDatePickerHall !== null && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) =>
                onDateChange(activeDatePickerHall, event, date)
              }
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Bbcc;
