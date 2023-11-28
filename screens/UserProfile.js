import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";

const UserProfile = () => {
  const authCtx = useAppContext();
  const navigation = useNavigation();

  // const route = useRoute();

  // Extract the parameters from the route
  // const { params } = route;
  // const { userPhoneNumber } = params;
  // const userName = route?.params?.customer;
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userData } = useAppContext();

  const userMobile = "+91" + userData;

  useEffect(() => {
    // Replace with the actual URL of your PHP script
    const apiUrl =
      "https://www.wbhidcoltd.com/select_bookings_of_particular_user.php";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: userMobile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setUserBookings(data.user_bookings);
        } else {
          console.error("Error fetching user bookings:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function UserPersonalDetails() {
    const filteredBookings = userBookings.filter(
      (booking) => booking.mobile === userMobile
    );

    if (filteredBookings.length > 0) {
      return (
        <View style={tw`my-2 p-2 bg-cyan-700 rounded-md`}>
          <Text style={tw`text-white`}>
            Name: {filteredBookings[0].username}
          </Text>
          <Text style={tw`text-white`}>
            Phone: {filteredBookings[0].mobile}
          </Text>
          {/* Display additional booking details as needed */}
        </View>
      );
    } else {
      return (
        <View style={tw`my-2 p-2 bg-green-700`}>
          <Text>No matching entry found for the given mobile number.</Text>
        </View>
      );
    }
  }

  // console.log("Customer on Profile", userName);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View
            style={tw`flex flex-row justify-between px-5 pb-5 items-center`}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={45}
                  color="green"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="red"
                  onPress={authCtx.logOut}
                />
                <Text style={tw`text-xs text-center text-red-600`}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex py-2 px-6`}>
            {userMobile == "+919875437382" ? (
              <TouchableOpacity
                style={tw`py-2 px-4 mb-2 bg-blue-700 rounded-sm`}
              >
                <Text
                  onPress={() => {
                    navigation.navigate("Admin");
                  }}
                  style={tw`font-bold text-lg text-white text-center`}
                >
                  YOU ARE ADMIN
                </Text>
              </TouchableOpacity>
            ) : null}
            <Text style={tw`font-bold text-xl`}>Personal Details :</Text>
            <UserPersonalDetails />
            {/* {userBookings.map((booking, index) => (
            <View key={index} style={tw` my-2 p-2 bg-green-700`}>
              <Text>Name: {booking[0].username}</Text>
              <Text>Phone: {booking[0].mobile}</Text>

              
            </View>
          ))} */}
          </View>

          <View style={tw`flex py-2 px-6`}>
            <Text style={tw`font-bold text-xl`}>All Bookings</Text>
          </View>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View>
              {userBookings.length === 0 ? (
                <Text>No bookings found for this user.</Text>
              ) : (
                <View>
                  {/* <Text>User Bookings:</Text> */}
                  {userBookings.map((booking, index) => (
                    <View
                      key={index}
                      style={tw`mx-6 my-2 p-2 bg-green-700 rounded-md shadow-lg`}
                    >
                      <View style={tw`border border-white`}>
                        <View
                          style={tw`bg-green-900 p-2 border-b border-white`}
                        >
                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Booking Id:</Text>
                            <Text style={tw`text-white`}>
                              HIDCO_00{booking.user_id}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Property:</Text>
                            <Text style={tw`text-white`}>
                              {booking.property}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Date From:</Text>
                            <Text style={tw`text-white`}>
                              {booking.date_from}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Date To:</Text>
                            <Text style={tw`text-white`}>
                              {booking.date_to}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Check-in:</Text>
                            <Text style={tw`text-white`}>
                              {booking.check_in_time}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Check-out:</Text>
                            <Text style={tw`text-white`}>
                              {booking.check_out_time}
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Price:</Text>
                            <Text style={tw`text-white`}>
                              Rs. {booking.total_price} /-
                            </Text>
                          </View>

                          <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white`}>Payment Status:</Text>
                            <Text style={tw`text-white`}>
                              {booking.payment_status}
                            </Text>
                          </View>
                        </View>

                        {booking.payment_status === "Not paid" ? (
                          <>
                            <View style={tw`flex-row justify-center gap-1`}>
                              <TouchableOpacity
                                style={tw`px-4 py-2 bg-cyan-700 border-2 border-cyan-900 m-auto mt-2 w-40 rounded`}
                              >
                                <Text
                                  style={tw`text-white text-center text-sm font-bold`}
                                >
                                  Make Payment
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={tw`px-4 py-2 bg-red-700 border-2 border-red-900 m-auto mt-2 w-44 rounded`}
                              >
                                <Text
                                  style={tw`text-white text-center text-sm font-bold`}
                                >
                                  Cancel My Request
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <Text
                              style={tw`text-center text-white text-xs p-2 mt-2 bg-green-900 font-semibold border-t border-white`}
                            >
                              *Pay Now to avoid cancellation of booking
                              accepatance!
                            </Text>
                          </>
                        ) : (
                          <Text></Text>
                        )}
                      </View>
                      {/* Display additional booking details as needed */}
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UserProfile;
