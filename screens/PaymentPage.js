import { encode } from "base-64";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../AppContext";
import tw from "twrnc";

const sendBookingDetailsToUser = async (to, msg, from) => {
  try {
    // Send the msg using Twilio's REST API
    const authorizationHeader = `Basic ${encode(
      "AC97433d1fd8408ae83b7e0bfa8875cd78:027a3ac9c8d1588227cb3b4a1c118118"
    )}`;

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/AC97433d1fd8408ae83b7e0bfa8875cd78/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authorizationHeader,
        },
        body: `To=${encodeURIComponent(
          to
        )}&From=${from}&Body=Hello from HIDCO: ${msg}`,
      }
    );

    if (response.ok) {
      // Implement msg verification logic here
      // You can prompt the user to enter the msg and verify it with your server or Twilio Verify service

      // If verification is successful, navigate to the home screen
      return true;
    } else {
      console.error("Error sending msg:", response.status, response.statusText);
      const responseBody = await response.text();
      console.error("Response Body:", responseBody);
      // Display an error message to the user
      return false;
    }
  } catch (error) {
    console.error("Error sending msg:", error);
    // Display an error message to the user
    return false;
  }
};

const PaymentPage = () => {
  const route = useRoute();
  const {
    propertyLocation,
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    totalPrice,
    numberOfDays,
  } = route.params;

  console.log("Total Calculated Price by ANM: ", totalPrice);

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
            property: propertyLocation, // Change this to your property data
            date_from: checkInDate,
            date_to: checkOutDate,
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
        // alert("Booking available. Proceed to payment!");
      } else {
        // console.error("Error sending data:", data.message);
        alert("Oops!", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   Send User and his Particular Booking details

  const sendUserParticularBookings = async () => {
    const userMobile = "+91" + userData;
    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/send_user_particular_bookings.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            mobile: userMobile,
            property: propertyLocation, // Change this to your property data
            date_from: checkInDate,
            date_to: checkOutDate,
            check_in_time: checkInTime,
            check_out_time: checkOutTime,
            no_of_days: numberOfDays,
            total_price: totalPrice, // Assuming you have calculated totalPrice
          }),
        }
      );

      console.log("HTTP Response Status:", response.status);

      const data = await response.json();

      console.log("PHP Script Response:", data);

      if (data.success) {
        console.log("User Particular Booking sent successfully:", data.message);
        // alert("Booking available. Proceed to payment!");
      } else {
        // console.error("Error sending data:", data.message);
        alert("Oops!", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [bookingPurpose, setBookingPurpose] = useState("");

  // Dummy card details state
  //   const [msgValue, setMsgValue] = useState("");
  const [userName, setUserName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const { userData } = useAppContext(); // Access user data from the global state
  const mobile = "+91" + userData;

  const navigation = useNavigation();
  //   const handle = () => {
  //     // Perform payment processing logic here (dummy for testing purposes)
  //     if (cardNumber && expiryDate && cvv) {
  //       // Payment successful
  //       alert("Payment Successful!");

  //     if (success) {
  //         // If verification is successful, navigate to the home screen
  //         navigation.navigate("Entermsg", { msgValue, user });
  //       } else {
  //         // Display an error message to the user
  //         console.error("Login failed", `+91${user}`);
  //       }

  //     //   sendBookingDetailsToUser();
  //       // You can navigate to a confirmation page or perform further actions here
  //     } else {
  //       alert("Please enter valid card details.");
  //     }
  //   };

  const handlePayment = async () => {
    if (userName && cardNumber && expiryDate && cvv) {
      // Payment successful
      alert("Payment Successful!");
      // You can navigate to a confirmation page or perform further actions here
      const msgToUser = `Payment of Rs. ${totalPrice} for your booking at ${propertyLocation} was successful.  Check-in Date: ${checkInDate} - ${checkOutDate}. Check-in Time: ${checkInTime} - ${checkOutTime}. Pls be on time. Thanks from HIDCO.`;

      //   setMsgValue(msgToUser);
      //   console.log(msgValue);
      const userPhoneNumber = "+91" + userData; // Replace with the user's phone number

      const fromPhoneNumber = "+15596440016";

      console.log(
        "Phone: ",
        userPhoneNumber,
        "Msg: ",
        msgToUser,
        "Customer: ",
        userName
      );

      const success = await sendBookingDetailsToUser(
        userPhoneNumber,
        msgToUser,
        fromPhoneNumber
      );

      console.log(success);

      if (success) {
        sendDataToPhpScript();
        sendUserParticularBookings();
        // If payment is successful, navigate to the home screen
        navigation.navigate(
          "UserProfile"
          //   , {
          // customer: userName,
          //   userName,
          //   }
        );
      } else {
        // Display an error message to the user
        console.error("Booking failed", `${userPhoneNumber}`);
      }
    } else {
      alert("Please enter valid card details.");
    }
  };

  //---------------------------- Sending user bookings details for Approval of Booking Starts -------------------------

  const handleApprovalRequest = async () => {
    console.log(
      "Sending data to PHP script:",
      JSON.stringify({
        username: userName,
        mobile: mobile,
        property: propertyLocation,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        total_price: totalPrice,
        no_of_days: numberOfDays,
        purpose_of_booking: bookingPurpose,
        status: "Confirmation Pending",
        payment_status: "Not paid",
      })
    );

    // console.log(
    //   "All Data: ",
    //   userName,
    //   mobile,
    //   propertyLocation,
    //   checkInDate,
    //   checkOutDate,
    //   checkInTime,
    //   checkOutTime,
    //   totalPrice,
    //   numberOfDays,
    //   bookingPurpose
    // );
    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/approval_request_from_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            mobile: mobile,
            property: propertyLocation,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            check_in_time: checkInTime,
            check_out_time: checkOutTime,
            total_price: totalPrice,
            no_of_days: numberOfDays,
            purpose_of_booking: bookingPurpose,
          }),
        }
      );

      console.log("HTTP Response Status:", response.status);

      console.log("Booking Purpose: ", bookingPurpose);

      console.log("Content-Type:", response.headers.get("Content-Type"));

      const data = await response.json();
      console.log("Data: ", data);

      // const text = await response.text();
      // console.log("Raw Response Content:", text);

      console.log("PHP Script Response:", data);

      if (data.success) {
        console.log("Data sent successfully:", data.message);
        alert("Booking request sent for approval!");

        navigation.navigate("Home");

        const msgToUser = `Booking request of Rs. ${totalPrice} for ${propertyLocation} has been sent successful for approval. Check-in Date: ${checkInDate} - ${checkOutDate}. Check-in Time: ${checkInTime} - ${checkOutTime}. One of our executive officer will contact you soon. Thanks from HIDCO.`;

        //   setMsgValue(msgToUser);
        //   console.log(msgValue);
        const userPhoneNumber = "+91" + userData; // Replace with the user's phone number

        const fromPhoneNumber = "+15596440016";

        console.log(
          "Phone: ",
          userPhoneNumber,
          "Msg: ",
          msgToUser,
          "Customer: ",
          userName
        );

        const success = await sendBookingDetailsToUser(
          userPhoneNumber,
          msgToUser,
          fromPhoneNumber
        );

        console.log(success);
      } else {
        // console.error("Error sending data:", data.message);
        alert("Oops! Error sending booking request: ", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  //--------------------------- Sending user bookings details for Approval of Booking End ---------------------------------

  return (
    <>
      <SafeAreaView>
        <Header />
        <View style={tw`mx-6`}>
          <Text style={styles.heading}>Booking Details</Text>

          <View style={tw`bg-cyan-700 p-4 rounded-md`}>
            <View
              style={tw`flex flex-row justify-between border-b pb-2 border-white`}
            >
              <Text style={tw`text-white`}>Property: </Text>
              <Text style={tw`text-white font-extrabold`}>
                {propertyLocation}
              </Text>
            </View>

            <View
              style={tw`flex flex-row justify-between border-b py-2 border-white`}
            >
              <Text style={tw`text-white`}>Check-in Date: </Text>
              <Text style={tw`text-white font-extrabold`}>{checkInDate}</Text>
            </View>

            <View
              style={tw`flex flex-row justify-between border-b py-2 border-white`}
            >
              <Text style={tw`text-white`}>Check-out Date: </Text>
              <Text style={tw`text-white font-extrabold`}>{checkOutDate}</Text>
            </View>

            <View
              style={tw`flex flex-row justify-between border-b py-2 border-white`}
            >
              <Text style={tw`text-white`}>Check-in Time: </Text>
              <Text style={tw`text-white font-extrabold`}>{checkInTime}</Text>
            </View>

            <View
              style={tw`flex flex-row justify-between border-b py-2 border-white`}
            >
              <Text style={tw`text-white`}>Check-out Time: </Text>
              <Text style={tw`text-white font-extrabold`}>{checkOutTime}</Text>
            </View>

            <View
              style={tw`flex flex-row justify-between border-b py-2 border-white`}
            >
              <Text style={tw`text-white`}>Total Price: </Text>
              <Text style={tw`text-white font-extrabold`}>
                Rs. {totalPrice}
              </Text>
            </View>

            <View style={tw`flex flex-row justify-between pt-2`}>
              <Text style={tw`text-white`}>Number of Days: </Text>
              <Text style={tw`text-white font-extrabold`}>{numberOfDays}</Text>
            </View>
          </View>

          {propertyLocation.includes("BBCC") ? (
            <>
              <Text style={tw`font-bold text-lg mt-2`}>NOTE:</Text>
              <Text style={tw`mb-2`}>
                Write purpose of your booking & Request for Approval if you want
                to book this place. After receiving your request our executive
                will reach out to you ASAP.
              </Text>
              <TextInput
                style={tw`border border-cyan-700 px-2`}
                placeholder="Enter the purpose of booking*"
                multiline={true} // Enables multiline input
                numberOfLines={4} // Sets the number of visible lines
                onChangeText={(text) => {
                  setBookingPurpose(text);
                }}
              />
            </>
          ) : (
            <>
              <Text style={styles.heading}>Payment Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Name on the Card"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                secureTextEntry
                value={cvv}
                onChangeText={(text) => setCVV(text)}
              />
            </>
          )}
          {propertyLocation.includes("BBCC") ? (
            <TouchableOpacity onPress={handleApprovalRequest}>
              <Text
                style={tw`px-2 py-2 bg-green-700 text-white text-center text-lg mt-2 rounded-md font-bold`}
              >
                Request for Approval
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Make Payment</Text>
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Make Payment</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PaymentPage;
