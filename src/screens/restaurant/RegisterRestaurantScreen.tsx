import { View, Text, TextInput, Animated, ScrollView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import tw from "twrnc";

const RegisterRestaurantScreen = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({"shopNo": "", "floorNo": "", "area": "", "city": ""});
  
  return (
    <View style={tw`bg-white h-full`}>
      <Text style={tw`mb-6 text-3xl font-bold m-4`}>
        Restaurant Information
      </Text>
      {/* <View style={tw`w-full bg-gray-200 h-[1px]`} /> */}

      <ScrollView style={tw`px-4`}>
        <View style={tw`py-5 bg-white rounded-3xl shadow-md mt-2`}>
          <View>
            <Text style={tw`mx-4 font-semibold`}>Restaurant Name</Text>
            <Text style={tw`mx-4 font-light text-gray-400 text-xs`}>
              Customers will see this name on Webby
            </Text>

            <View style={tw`w-full bg-gray-200 h-[1px] mt-6`} />

            <View
              style={tw`p-4 border border-gray-200 rounded-2xl my-4 mx-4 shadow-sm bg-white`}
            >
              {/* Input Field */}
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                placeholder="Restaurant name*"
                style={tw`text-sm`}
              />
            </View>
          </View>
        </View>
        <View style={tw` mt-6 py-5 bg-white rounded-3xl shadow-md`}>
          <View>
            <Text style={tw`mx-4 font-semibold`}>Owner details</Text>
            <Text style={tw`mx-4 font-light text-gray-400 text-xs`}>
              Webby will use these details for all business communications and
              updates
            </Text>

            <View style={tw`w-full bg-gray-200 h-[1px] mt-6`} />

            <View
              style={tw`p-4 border border-gray-200 rounded-2xl my-4 mx-4 shadow-sm bg-white`}
            >
              {/* Input Field */}
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                placeholder="Full name*"
                style={tw`text-sm`}
              />
              {/* Input Field */}
            </View>
            <View
              style={tw`p-4 border border-gray-200 rounded-2xl mx-4 shadow-sm bg-white`}
            >
              {/* Input Field */}
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                placeholder="Email*"
                style={tw`text-sm`}
              />
            </View>
            <View
              style={tw`p-4 border border-gray-200 rounded-2xl my-4 mx-4 shadow-sm bg-white`}
            >
              {/* Input Field */}
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                placeholder="Phone number*"
                style={tw`text-sm`}
              />
            </View>
          </View>
        </View>
        <View style={tw` my-6 py-5 bg-white rounded-3xl shadow-md`}>
          <View>
            <Text style={tw`mx-4 font-semibold`}>
              Add your restaurants's location
            </Text>

            <View style={tw`w-full bg-gray-200 h-[1px] mt-6`} />
            {/* second part of address */}
            <View style={tw`p-4`}>
              {/* map contaner */}
              <View style={tw`mx-2`}>
                {/* map */}
                <View
                  style={tw`h-55 bg-red-100 border-[1px] border-gray-200 rounded-t-md`}
                ></View>
                {/* map text */}
                <View
                  style={tw`border-[1px] border-indigo-100 p-4 shadow-xl shadow-gray-300 bg-white rounded-b-md`}
                >
                  <Text style={tw`font-bold my-1`}>Alkapuri</Text>
                  <Text style={tw`text-gray-500 text-sm`}>
                    vadodara, Gujarat
                  </Text>
                </View>
              </View>
              {/*  manual address entry */}
              <View style={tw`flex gap-4 mt-4`}>
                <View
                  style={tw`p-4 border border-gray-200 rounded-2xl mx-2 shadow-sm bg-white`}
                >
                  {/* Input Field */}
                  <TextInput
                    value={address.shopNo}
                    onChangeText={(text) => setAddress({...address, "shopNo": text})}
                    keyboardType="phone-pad"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    placeholder="Shop no / Building no"
                    style={tw`text-sm`}
                  />
                </View>
                <View
                  style={tw`p-4 border border-gray-200 rounded-2xl mx-2 shadow-sm bg-white`}
                >
                  {/* Input Field */}
                  <TextInput
                    value={address.floorNo}
                    onChangeText={(text) => setAddress({...address, "floorNo": text})}
                    keyboardType="phone-pad"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    placeholder="Floor / tower no"
                    style={tw`text-sm`}
                  />
                </View>
                <View
                  style={tw`p-4 border border-gray-200 rounded-2xl mx-2 shadow-sm bg-white`}
                >
                  {/* Input Field */}
                  <TextInput
                    value={address.area}
                    onChangeText={(text)=>setAddress({...address, "area": text})}
                    keyboardType="phone-pad"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    placeholder="Area"
                    style={tw`text-sm`}
                  />
                </View>
                <View
                  style={tw`p-4 border border-gray-200 rounded-2xl mx-2 shadow-sm bg-white`}
                >
                  {/* Input Field */}
                  <TextInput
                    value={address.city}
                    onChangeText={(text)=>setAddress({...address, "city": text})}
                    keyboardType="phone-pad"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    placeholder="City"
                    style={tw`text-sm`}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterRestaurantScreen;
