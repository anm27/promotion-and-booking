import { encode } from "base-64";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const Admin = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { userData } = useAppContext();

  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to receive notifications was denied");
          return;
        }
      } catch (error) {
        console.error("Error requesting notification permissions:", error);
      }
    };

    registerForPushNotifications();
  }, []);

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
        console.error(
          "Error sending msg:",
          response.status,
          response.statusText
        );
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.wbhidcoltd.com/show_requests_by_user_for_approval.php"
      );
      const result = await response.json();

      // Check if the result is an array
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   onPress={() => handleCancel(item.ba_id, item.username, item.mobile, item.property, item.check_in_date, item.check_out_date, item.check_in_time, item.check_out_time, item.total_price, item.no_of_days)}

  const handleAccept = async (
    bookingId,
    username,
    mobile,
    property,
    dateFrom,
    dateTo,
    checkInTime,
    checkOutTime,
    totalPrice,
    noOfDays,
    paymentStatus
  ) => {
    Alert.alert(
      "Booking Acceptance",
      "Do you want to accept this booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Update the booking status on the client side
              const responseUpdate = await fetch(
                "https://www.wbhidcoltd.com/update_status_of_booking.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    client_booking_id: bookingId,
                  }),
                }
              );

              // Check the status before trying to read the body
              if (!responseUpdate.ok) {
                throw new Error(`HTTP error! Status: ${responseUpdate.status}`);
              }

              const resultUpdate = await responseUpdate.json();

              if (resultUpdate.success) {
                console.log("Booking status updated successfully");

                // Push Notification---------------------------------------------------------------------------

                // const pushToken = userData?.pushToken;

                // if (pushToken) {
                //   await Notifications.scheduleNotificationAsync({
                //     content: {
                //       title: "Booking Accepted",
                //       body: `Your booking for ${property} has been accepted!`,
                //     },
                //     trigger: null,
                //     channelId: "default",
                //   });
                // }

                const pushToken = userData?.pushToken;

                if (pushToken) {
                  // If userData and pushToken exist, proceed with scheduling notification
                  await Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Booking Accepted",
                      body: `Your booking for ${property} has been accepted!`,
                    },
                    trigger: null,
                    channelId: "default",
                  });
                }

                // --------------------------------------------------------------------------------------------

                const msgToUser = `Congratulations! Your request for booking of ${property} with Booking Approval Id: HIDCO_AP_ID_${bookingId} has been approved. Kindly make the payment within 48 hours by going to your profile.`;

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
                  username
                );

                const success = await sendBookingDetailsToUser(
                  userPhoneNumber,
                  msgToUser,
                  fromPhoneNumber
                );

                console.log("Success msg Twilio: ", success);

                if (success) {
                  // sendDataToPhpScript();
                  // sendUserParticularBookings();
                  // If payment is successful, navigate to the home screen
                  navigation.navigate(
                    "UserProfile"
                    //   , {
                    // customer: userName,
                    //   userName,
                    //   }
                  );
                  fetchData();
                } else {
                  // Display an error message to the user
                  console.error("Booking failed", `${userPhoneNumber}`);
                }

                // Now, send the booking details to your PHP backend
                const responseSendDetails = await fetch(
                  "https://www.wbhidcoltd.com/send_approved_req_to_final_booking_table.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username,
                      mobile,
                      property,
                      dateFrom,
                      dateTo,
                      checkInTime,
                      checkOutTime,
                      totalPrice,
                      noOfDays,
                      paymentStatus,
                    }),
                  }
                );

                if (!responseSendDetails.ok) {
                  throw new Error(
                    `HTTP error! Status: ${responseSendDetails.status}`
                  );
                }

                const resultSendDetails = await responseSendDetails.json();

                if (resultSendDetails.success) {
                  console.log("Booking details sent successfully");
                  // Reload data after accepting the booking
                  fetchData();
                } else {
                  console.error("Failed to send booking details");
                }
              } else {
                console.error("Failed to update booking status");
              }
            } catch (error) {
              console.error("Error updating booking status:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCancel = async (bookingId) => {
    // Implement logic for canceling the booking
    // ...

    // Show an alert for confirmation
    Alert.alert(
      "Booking Cancellation",
      "Are you sure you want to cancel this booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Update the booking status (you need to implement this)
            // updateBookingStatus(bookingId, "Cancelled");
            try {
              const response = await fetch(
                "https://www.wbhidcoltd.com/cancel_booking.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    client_booking_id: bookingId,
                  }),
                }
              );

              // Check the status before trying to read the body
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const result = await response.json();

              if (result.success) {
                console.log("Booking cancelled successfully");
                // Reload data after canceling the booking
                fetchData();
              } else {
                console.error("Failed to cancel booking:", result.message);
              }
            } catch (error) {
              console.error("Error cancelling booking:", error.message);
            }

            // Reload data after canceling the booking
            fetchData();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView style={tw`bg-gray-300`}>
        {/* <Text>Data from API:</Text> */}
        {data.map((item) => (
          <View
            style={tw`bg-white m-2 p-2 shadow-md rounded-md`}
            key={item.ba_id}
          >
            <Text style={tw`text-center font-extrabold py-1 mx-2 bg-gray-200`}>
              {"BBCC_" + item.ba_id}
            </Text>

            {/* Add more fields as needed */}
            <View style={tw`bg-cyan-600 m-2 p-5`}>
              <Text style={tw`text-white`}>
                A booking from Username: Amarendra Mishra with Mobile No.{" "}
                {item.mobile} is come for the {item.property} from check-in
                date: {item.check_in_date} to check-out date:{" "}
                {item.check_out_date} ({item.check_in_time} -{" "}
                {item.check_out_time}) by giving total price of{" "}
                {item.total_price}.
              </Text>
              <Text style={tw`text-white font-extrabold bg-gray-700 p-2 my-2`}>
                Purpose of Booking: {item.purpose_of_booking}
              </Text>
              <Text style={tw`text-white font-extrabold bg-gray-700 p-2 my-2`}>
                Status of Booking: {item.status}
              </Text>

              <Text style={tw`text-white font-extrabold bg-gray-700 p-2 my-2`}>
                Payment Status: {item.payment_status}
              </Text>
            </View>
            <View style={tw`flex flex-row gap-2 justify-between mx-2`}>
              <TouchableOpacity
                style={tw`bg-red-600 px-4 py-2`}
                onPress={() =>
                  handleCancel(
                    item.ba_id,
                    item.username,
                    item.mobile,
                    item.property,
                    item.check_in_date,
                    item.check_out_date,
                    item.check_in_time,
                    item.check_out_time,
                    item.total_price,
                    item.no_of_days,
                    item.payment_status
                  )
                }
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-green-600 px-4 py-2`}
                onPress={() =>
                  handleAccept(
                    item.ba_id,
                    item.username,
                    item.mobile,
                    item.property,
                    item.check_in_date,
                    item.check_out_date,
                    item.check_in_time,
                    item.check_out_time,
                    item.total_price,
                    item.no_of_days,
                    item.payment_status
                  )
                }
              >
                <Text>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Admin;
