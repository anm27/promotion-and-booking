import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
// import NumberToWords from "number-to-words";
import tw from "twrnc";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

const Dda = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedHallIndex, setSelectedHallIndex] = useState(null);
  const [propertyName, setPropertyName] = useState(null);
  const [seatingCapacity, setSeatingCapacity] = useState(null);
  const [securityDeposit, setSecurityDeposit] = useState(null);
  const [additionalHourCharges, setAdditionalHourCharges] = useState(null);
  const [totalInitPrice, setTotalInitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");

  console.log("selectedHallIndex: ", selectedHallIndex);

  // console.log("Property Name: ", propertyName);

  const propertyLocation = "Dda " + propertyName;

  console.log("Property Loc: ", propertyLocation);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedHallIndex(0); // Set the first hall as the default selection
      onHallSelect(locations[0], 0); // Trigger the selection manually
    }
  }, [data]);

  // Function to convert a numeric price to words
  // const priceToWords = (price) => {
  //   return NumberToWords.toWords(price).replace(/-/g, " ");
  // };

  // Function to format a number in the Indian numbering system

  const formatIndianNumber = (num) => {
    const suffixes = ["", "thousand", "lakh", "crore"];
    const twoDigitNumbers = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const tenToNineteen = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const toWords = (num, level) => {
      if (num === 0) return "";

      const hundredsDigit = Math.floor(num / 100);
      const remainder = num % 100;

      let words = "";

      if (hundredsDigit > 0) {
        words += twoDigitNumbers[hundredsDigit] + " hundred";
      }

      if (remainder > 0) {
        if (words !== "") {
          words += " and ";
        }

        if (remainder < 10) {
          words += twoDigitNumbers[remainder];
        } else if (remainder < 20) {
          words += tenToNineteen[remainder - 10];
        } else {
          const tensDigit = Math.floor(remainder / 10);
          const onesDigit = remainder % 10;
          words += tens[tensDigit];
          if (onesDigit > 0) {
            words += "-" + twoDigitNumbers[onesDigit];
          }
        }
      }

      if (level === 0) {
        return words;
      }

      if (words !== "") {
        words += " " + suffixes[level];
      }

      return words;
    };

    if (num === 0) return "zero";

    let level = 0;
    let words = "";

    while (num > 0) {
      const remainder = num % 100;
      if (remainder > 0) {
        const partWords = toWords(remainder, level);
        words = partWords + (words !== "" ? " " + words : "");
      }
      level++;
      num = Math.floor(num / 100);
    }

    return words;
  };

  // Function to format a date as "dd/mm/yyyy"
  function formatDate(date) {
    return date.toLocaleDateString("en-GB");
  }

  const [formattedDate, setFormattedDate] = useState(new Date());
  const [formattedDateForTo, setFormattedDateForTo] = useState(new Date());

  const checkInDate = formattedDate.toString();
  const checkOutDate = formattedDateForTo.toString();
  const checkInTime = "9:00AM";
  const checkOutTime = "9:00PM";
  // totalPrice,
  // numberOfDays,

  console.log("FormattedDate: ", formattedDate, typeof formattedDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isDatePickerToVisible, setDatePickerToVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDateToPicker = () => {
    setDatePickerToVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideDateToPicker = () => {
    setDatePickerToVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setFormattedDate(date);
    hideDatePicker();
  };

  const handleDateToConfirm = (date) => {
    setFormattedDateForTo(date);
    hideDateToPicker();
  };

  const scrollRef = useRef(null);

  const locations = [
    "Main Convention Hall (Hall - 01)",
    "Mini Auditorium (Hall - 06)",
    "Mini Auditorium (Hall - 07)",
    "Banquet Cum Exhibition Hall (Hall - 03)",
    "Banquet Cum Exhibition Hall (Hall - 05)",
  ];

  // Default hall index to be selected
  const defaultSelectedHallIndex = 0;

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
    // Set the default selected hall when the component mounts
    setSelectedHallIndex(defaultSelectedHallIndex);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
    // const { totalCalcPrice, numberOfDays } = calculateTotalPrice();
    setTotalPrice(totalCalcPrice);
  }, [selectedHallIndex, formattedDate, formattedDateForTo]);

  const fetchData = async () => {
    try {
      let response = await fetch("https://www.wbhidcoltd.com/demo.php");
      let responseText = await response.text();
      console.log("Server Response:", responseText);

      // Continue with JSON parsing if the responseText looks like JSON
      let jsonData = JSON.parse(responseText);
      setData(jsonData); // Set the data state
    } catch (error) {
      console.error(error);
    }
  };

  const onHallSelect = (selectedItem, index) => {
    setSelectedHallIndex(index);
    setPropertyName(selectedItem);
    setSeatingCapacity(data[index]?.seating_capacity);
    setSecurityDeposit(data[index]?.deposit);
    setAdditionalHourCharges(data[index]?.additional_hour_at);
    const initialPrice = Number(data[index]?.rent) || 0;
    setTotalInitPrice(initialPrice.toFixed(2));
  };

  const calculateTotalPrice = () => {
    const date1 = new Date(formattedDate);
    const date2 = new Date(formattedDateForTo);

    const timeDifferenceInMs = date2 - date1;
    const timeDifferenceInSeconds = timeDifferenceInMs / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHr = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHr / 24;

    console.log("Days Difference by ANM:", timeDifferenceInDays);

    // Calculate the number of days

    const roundupNumberOfDays = Math.ceil(timeDifferenceInDays);
    const numberOfDays = roundupNumberOfDays + 1;

    console.log("Number of Days Now:", numberOfDays);

    // Calculate the total price

    //   const totalCalcPrice = totalPrice * numberOfDays;

    //   console.log("Total Price:", totalCalcPrice);

    //   return { totalCalcPrice, numberOfDays };
    // };

    // const { totalCalcPrice, numberOfDays } = calculateTotalPrice();

    const basePrice = Number(data[selectedHallIndex]?.rent) || 0;
    const currentDate = new Date(formattedDate);
    let totalInitPrice = 0;

    for (let i = 0; i < numberOfDays; i++) {
      // Check if the current date is a weekend (Saturday or Sunday)
      const isWeekend =
        currentDate.getDay() === 0 /* Sunday */ ||
        currentDate.getDay() === 6; /* Saturday */

      // Apply pricing adjustments based on weekdays or weekends
      if (isWeekend) {
        totalInitPrice += basePrice * 1.15; // 15% increase on weekends
      } else {
        totalInitPrice += basePrice * 0.9; // 10% discount on weekdays
      }

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    totalInitPrice = totalInitPrice.toFixed(0);

    // totalPriceForUsingOutside = totalPrice;

    // setTotalPrice(totalPrice);

    console.log("Set Total Price:", totalInitPrice);

    // const totalPrice = setTotalPrice();
    const totalCalcPrice = Number(totalInitPrice);
    const totalCalcPriceInWords = formatIndianNumber(totalCalcPrice);

    return { totalCalcPrice: totalInitPrice, numberOfDays };
  };

  const { totalCalcPrice, numberOfDays } = calculateTotalPrice();
  // setTotalPrice(totalCalcPrice);

  console.log(formatIndianNumber(totalCalcPrice));

  console.log(
    "Total Price & Calculated Price by ANM: ",
    totalInitPrice,
    totalCalcPrice,
    "Type of CalcPrice: ",
    typeof totalCalcPrice,
    "Type of Total Price: ",
    typeof totalInitPrice
  );

  // setTotalCalcPriceString(totalCalcPrice);

  // Function to send data to the PHP script
  const checkAvailability = async () => {
    // setTotalPrice(totalCalcPrice);

    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/check_availability_hidco_properties.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: propertyLocation, // Change this to your property data
            date_from: formattedDate,
            date_to: formattedDateForTo,
            check_in_time: "9:00AM",
            check_out_time: "9:00PM",
            total_price: totalInitPrice, // Assuming you have calculated totalPrice
          }),
        }
      );

      console.log("HTTP Response Status:", response.status);

      const data = await response.json();

      console.log("PHP Script Response:", data);

      if (data.success) {
        // console.log("Data sent successfully:", data.message);
        Alert.alert("Congratulations!", data.message, [
          {
            text: "OK",
            onPress: () => {
              // Navigate to the payment page with booking data
              navigation.navigate("PaymentPage", {
                propertyLocation,
                checkInDate,
                checkOutDate,
                checkInTime,
                checkOutTime,
                totalPrice,
                numberOfDays,
              });
            },
          },
        ]);
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
            <View style={tw`flex flex-row gap-10 pr-7`}>
              <View style={tw`w-92`}>
                <View>
                  <Text style={tw`text-xl font-bold mb-2`}>
                    {"Biswa Bangla Convention Center"}
                  </Text>
                  <Text style={tw`text-gray-600`}>
                    {"Narkel Bagan, New Town"}
                  </Text>

                  <View style={tw`flex bg-white rounded-md my-2`}>
                    <SelectDropdown
                      data={locations}
                      // onSelect={onHallSelect}
                      defaultButtonText={locations[selectedHallIndex]} // Set the default selected value
                      onSelect={(selectedItem, index) => {
                        setSelectedHallIndex(index);
                        onHallSelect(selectedItem, index);
                      }}
                      // defaultButtonText="Main Convention Hall (Hall - 01)"
                      buttonTextAfterSelection={(selectedItem, index) => {
                        setPropertyName(selectedItem);
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={tw`bg-cyan-700 w-full`}
                      buttonTextStyle={tw`text-white font-bold`}
                      renderDropdownIcon={() => (
                        <Text style={tw`text-white ml-2`}>▼</Text>
                      )}
                      dropdownStyle={tw`bg-white border border-gray-300 rounded-md`}
                      rowTextStyle={tw`text-cyan-700`}
                    />
                  </View>
                  {seatingCapacity && (
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>Seating Capacity:</Text>
                      <Text>{seatingCapacity} seats</Text>
                    </View>
                  )}
                  {securityDeposit && (
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>Security Deposit:</Text>
                      <Text>Rs. {securityDeposit} /-</Text>
                    </View>
                  )}
                  {additionalHourCharges && (
                    <View
                      style={tw`flex-row justify-between items-center mt-2`}
                    >
                      <Text>
                        For additional hours @ Rs. {additionalHourCharges}/- per
                        hour (Subject to a max. of 3 hours)
                      </Text>
                    </View>
                  )}
                </View>
                <View style={tw`flex-row justify-between items-center mt-2`}>
                  <Text>Regular price/day from 9am to 9pm:</Text>
                  <Text>Rs. {totalInitPrice} /-</Text>
                </View>
                {selectedHallIndex !== null && (
                  <>
                    <Text style={tw`text-green-700 py-2`}>
                      {"Select Dates below to see price for that date range:"}
                    </Text>

                    <View>
                      <View
                        style={tw`flex-row justify-between items-center mt-2`}
                      >
                        <TouchableOpacity
                          onPress={showDatePicker}
                          style={tw`bg-yellow-700 px-2 py-2`}
                        >
                          <Text style={tw`text-white`}>
                            Date From: {formatDate(formattedDate)}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={showDateToPicker}
                          style={tw`bg-yellow-700 px-2 py-2`}
                        >
                          <Text style={tw`text-white`}>
                            Date To: {formatDate(formattedDateForTo)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                <View
                  style={tw`flex-row justify-between items-center mt-2 border-t border-b border-gray-300 py-2`}
                >
                  <Text style={tw`w-50 font-bold`}>
                    Price for selected dates from 9am to 9pm:
                  </Text>
                  <Text
                    style={tw`w-50 text-center bg-cyan-700 text-white w-35 py-2 font-bold`}
                  >
                    Rs. {totalCalcPrice} /-
                  </Text>
                </View>
                {/* <Text style={tw`w-100 text-center uppercase`}>
                  ({formatIndianNumber(totalCalcPrice)})
                </Text> */}
                <TouchableOpacity
                  onPress={checkAvailability}
                  style={tw`bg-green-700 p-3 mt-3 mb-1 rounded-lg`}
                >
                  <Text style={tw`text-white font-bold text-center text-lg`}>
                    Check Availability
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerToVisible}
            mode="date"
            onConfirm={handleDateToConfirm}
            onCancel={hideDateToPicker}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dda;
