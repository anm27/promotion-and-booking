import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Slides from "../components/Slides";
import * as Animatable from "react-native-animatable";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import tw from "twrnc";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

const duration = 500;

const HappyWorks = () => {
  const defaultAnim = useSharedValue(5);
  const changedAnim = useSharedValue(20);

  const animatedLinear = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));

  React.useEffect(() => {
    defaultAnim.value = withRepeat(withSpring(-defaultAnim.value), -1, true);
    changedAnim.value = withRepeat(
      withSpring(-changedAnim.value, {
        mass: 10,
        damping: 40,
      }),
      -1,
      true
    );
  }, []);

  const locations = ["Happy Works 2", "Happy Works 3"];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());

  const [formattedDateTime, setFormattedDateTime] = useState(
    new Date() // Initialize with the current date and time
  );

  const [formattedCheckoutDateTime, setFormattedCheckoutDateTime] = useState(
    new Date() // Initialize with the current date and time
  );

  const [formattedDate, setFormattedDate] = useState(
    new Date() // Initialize with the current date and time
  );

  const [formattedDateTo, setFormattedDateTo] = useState(
    new Date() // Initialize with the current date and time
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isDatePickerToVisible, setDatePickerToVisibility] = useState(false);

  const [isDateTimePickerVisible, setDateTimePickerVisibility] =
    useState(false);

  const [isCheckoutDateTimePickerVisible, setCheckoutDateTimePickerVisibility] =
    useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDateToPicker = () => {
    setDatePickerToVisibility(true);
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const showCheckoutDateTimePicker = () => {
    setCheckoutDateTimePickerVisibility(true);
  };

  const getCheckinDate = () => {
    console.log("Check-in Date:", formattedDateTime.toISOString());
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideDateToPicker = () => {
    setDatePickerToVisibility(false);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const hideCheckoutDateTimePicker = () => {
    setCheckoutDateTimePickerVisibility(false);
  };

  const handleDateTimeConfirm = (date) => {
    setFormattedDateTime(date);
    hideDateTimePicker();
  };

  const handleDateConfirm = (date) => {
    setFormattedDate(date);
    hideDatePicker();
  };

  const handleDateToConfirm = (date) => {
    setFormattedDateTo(date);
    hideDateToPicker();
  };

  const handleCheckoutDateTimeConfirm = (date) => {
    setFormattedCheckoutDateTime(date);
    hideCheckoutDateTimePicker();
  };

  const hourlyRate = 600;

  const meetInDate = new Date(formattedDate);
  const meetOutDate = new Date(formattedDateTo);

  const checkInDateTime = new Date(formattedDateTime);
  const checkOutDateTime = new Date(formattedCheckoutDateTime);

  const checkInDate = meetInDate.toLocaleDateString();
  const checkInTime = checkInDateTime.toLocaleTimeString();
  const checkOutDate = meetOutDate.toLocaleDateString();
  const checkOutTime = checkOutDateTime.toLocaleTimeString();

  // Converting string type time to usable calculation type time

  const userCheckinTime = checkInTime;
  const partsTime = userCheckinTime.split(" ");
  const timePart = partsTime[0]; // "7:00:09"
  const amPmPart = partsTime[1]; // "PM"

  // Now, format the time as "h:mm AM/PM"
  const timeParts = timePart.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];

  let formattedUserCheckinBookingTime = hours + ":" + minutes + " " + amPmPart;

  const userCheckoutTime = checkOutTime;
  const partsCheckoutTime = userCheckoutTime.split(" ");
  const timeCheckoutPart = partsCheckoutTime[0]; // "7:00:09"
  const amPmCheckoutPart = partsCheckoutTime[1]; // "PM"

  // Now, format the time as "h:mm AM/PM"
  const timeCheckoutParts = timeCheckoutPart.split(":");
  const hoursCheckout = parseInt(timeCheckoutParts[0]);
  const minutesCheckout = timeCheckoutParts[1];

  let formattedUserCheckOutBookingTime =
    hoursCheckout + ":" + minutesCheckout + " " + amPmCheckoutPart;

  // Converting string type date to usable calculation type data

  const checkoutDateString = checkOutDate;
  const parts = checkoutDateString.split("/");
  const month = parseInt(parts[0]) - 1; // Subtract 1 from the month because months are 0-based
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  const checkoutDateObject = new Date(year, month, day);

  console.log("Usable Check-out: ", checkoutDateObject);

  const checkInDateString = checkInDate;
  const partsCheckin = checkInDateString.split("/");
  const monthCheckin = parseInt(partsCheckin[0]) - 1; // Subtract 1 from the month because months are 0-based
  const dayCheckin = parseInt(partsCheckin[1]);
  const yearCheckin = parseInt(partsCheckin[2]);

  const checkInDateObject = new Date(yearCheckin, monthCheckin, dayCheckin);

  console.log("Usable Check-in: ", checkInDateObject);

  const calculateTotalPrice = () => {
    const date1 = new Date(checkInDateObject);
    const date2 = new Date(checkoutDateObject);

    const timeDifferenceInMs = date2 - date1;
    const timeDifferenceInSeconds = timeDifferenceInMs / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHr = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHr / 24;

    // console.log("Days Difference by ANM:", timeDifferenceInMs);
    // console.log("Days Difference by ANM:", timeDifferenceInSeconds);
    // console.log("Days Difference by ANM:", timeDifferenceInMinutes);
    // console.log("Days Difference by ANM:", timeDifferenceInHr);
    console.log("Days Difference by ANM:", timeDifferenceInDays);

    // Log the components
    // console.log("Check-in Date:", checkInDate);
    // console.log("Check-in Time:", checkInTime);
    // console.log("Check-Out Date:", checkOutDate);
    // console.log("Check-Out Time:", checkOutTime);
    // console.log(checkInDate - checkOutDate);

    // Calculate the time difference in milliseconds
    const timeDifferenceInMilliseconds =
      checkOutDateTime.getTime() - checkInDateTime.getTime();

    console.log(
      "Time Difference (milliseconds):",
      timeDifferenceInMilliseconds
    );

    // Calculate the time difference in hours
    const timeDifferenceInHours =
      timeDifferenceInMilliseconds / (1000 * 60 * 60);

    console.log("Time Difference (hours):", timeDifferenceInHours);

    // Calculate the number of days
    // const numberOfDays = Math.ceil(timeDifferenceInHours / 24);
    const numberOfDays = timeDifferenceInDays + 1;

    console.log("Number of Days Now:", numberOfDays);

    // Calculate the total price
    const totalHourlyPrice = hourlyRate * timeDifferenceInHours;

    const totalPrice = totalHourlyPrice * numberOfDays;

    console.log("Total Price:", totalPrice);

    return { totalPrice, numberOfDays };
  };

  const { totalPrice, numberOfDays } = calculateTotalPrice();

  // Function to send data to the PHP script
  const sendDataToPhpScript = async () => {
    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/insert_into_hw_bookings.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: "Happy Works 2", // Change this to your property data
            date_from: formattedDate.toISOString(),
            date_to: formattedDateTo.toISOString(),
            meet_in_time: checkInTime,
            meet_out_time: checkOutTime,
            total_price: totalPrice, // Assuming you have calculated totalPrice
          }),
        }
      );

      console.log("HTTP Response Status:", response.status);

      const data = await response.json();

      console.log("PHP Script Response:", data);

      if (data.success) {
        console.log("Data sent successfully:", data.message);
        Alert.alert("Booking Confirmed!", data.message);
      } else {
        // console.error("Error sending data:", data.message);
        Alert.alert("Oops!", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Header />
          <Categories />
          <View>
            <Slides />
          </View>

          <View style={tw`mx-5 mt-2 shadow`}>
            <View style={tw`bg-cyan-700 py-5 px-3 rounded-t`}>
              <Text style={tw`font-bold text-3xl text-white`}>
                Conference Rooms
              </Text>
            </View>
          </View>
          <View style={tw`bg-blue-100 mx-5 shadow mb-5 rounded-b`}>
            <View style={tw`bg-white`}>
              <Animatable.Text
                style={{
                  padding: 6,
                  textAlign: "center",
                  fontSize: 14,
                }}
                animation="flash" // You can use different animations, like "bounce", "pulse", "flash", etc.
                iterationCount="infinite" // Infinite animation
                duration={5000} // Animation duration in milliseconds
              >
                <Text style={tw`text-green-700 font-semibold`}>
                  * Booking is applicable only from 09:00 AM to 09:00 PM
                </Text>
              </Animatable.Text>
            </View>

            {/* <Animated.View style={[animatedLinear]}>
              <Text>
                * Bookings are applicable only from 09:00 AM to 09:00 PM
              </Text>
            </Animated.View> */}

            <View>
              <View style={tw`flex flex-row justify-between items-center p-2 `}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Price :
                </Text>
                <View style={tw`flex flex-row items-end bg-white px-2`}>
                  <Text style={tw`font-semibold text-lg text-green-700`}>
                    Rs. {totalPrice} /-
                  </Text>
                  <Text style={tw`text-sm text-gray-500 pb-.5`}>
                    {" "}
                    for selected dates & times
                  </Text>
                </View>
              </View>

              <View style={tw`flex flex-row justify-between items-center p-2 `}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  No. of Persons :
                </Text>
                <Text
                  style={tw`font-semibold text-lg text-cyan-700 bg-white px-7`}
                >
                  5 Max
                </Text>
              </View>
              <View style={tw`flex flex-row justify-between items-center p-2 `}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Location :
                </Text>

                <View style={tw`flex bg-white rounded-md`}>
                  <SelectDropdown
                    data={locations}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={tw`bg-white`}
                    buttonTextStyle={tw`text-cyan-700`}
                    renderDropdownIcon={() => (
                      <Text style={tw`text-cyan-700 ml-2`}>▼</Text>
                    )}
                    dropdownStyle={tw`bg-white border border-gray-300 rounded-md mt-2`}
                    rowStyle={tw`px-3 py-2`}
                    rowTextStyle={tw`text-cyan-700`}
                  />
                </View>
              </View>
              <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Conference from :
                </Text>
                <View style={tw`bg-cyan-700 p-2`}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <Text style={tw`text-white`}>{checkInDate}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Conference to :
                </Text>
                <View style={tw`bg-cyan-700 p-2`}>
                  <TouchableOpacity onPress={showDateToPicker}>
                    <Text style={tw`text-white`}>{checkOutDate}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Meet-in Time :
                </Text>
                <View style={tw`bg-cyan-700 p-2`}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <Text style={tw`text-white`}>
                      {formattedUserCheckinBookingTime.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Text
                  style={tw`font-semibold text-lg text-gray-600 tracking-wide`}
                >
                  Meet-out Time :
                </Text>
                <View style={tw`bg-cyan-700 p-2`}>
                  <TouchableOpacity onPress={showCheckoutDateTimePicker}>
                    <Text style={tw`text-white`}>
                      {formattedUserCheckOutBookingTime.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={tw`bg-green-700 px-3 py-3 m-2 mx-2.8 rounded-`}
                onPress={sendDataToPhpScript}
              >
                <Text style={tw`text-center text-lg text-white font-bold`}>
                  Check availability!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date" // "date" for date picker, "time" for time picker, "datetime" for both
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerToVisible}
            mode="date" // "date" for date picker, "time" for time picker, "datetime" for both
            onConfirm={handleDateToConfirm}
            onCancel={hideDateToPicker}
          />
          <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode="time" // "date" for date picker, "time" for time picker, "datetime" for both
            onConfirm={handleDateTimeConfirm}
            onCancel={hideDateTimePicker}
          />
          <DateTimePickerModal
            isVisible={isCheckoutDateTimePickerVisible}
            mode="time" // "date" for date picker, "time" for time picker, "datetime" for both
            onConfirm={handleCheckoutDateTimeConfirm}
            onCancel={hideCheckoutDateTimePicker}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    borderWidth: 1,
    borderColor: "#b58df1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#b58df1",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default HappyWorks;
