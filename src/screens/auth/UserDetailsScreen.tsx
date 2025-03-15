import React, { useState } from "react";
import {
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import tw from "twrnc";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { colors } from "../../theme/colors";
import axios from "axios";
import userStore from "../../zustand/userStore";
import API_BASE_URL from "../../../config";
import * as ImagePicker from "expo-image-picker";
import { signOutFromGoogle } from "../../utils/authHelpers";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

const UserDetailsScreen = ({ navigation, route }: Props) => {
  // Get params passed from previous screen
  const { email, password, googleIdToken, isGoogleSignIn, photoUrl } =
    route.params || {};

  // State for user details
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState<string | null>(photoUrl || null);
  const [isInProgress, setIsInProgress] = useState(false);

  // Get user store functions
  const { setUser } = userStore();

  // Validate phone number
  const validatePhone = (phone: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  // Handle photo selection
  const handleSelectPhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "You need to allow access to your photos to continue."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting photo:", error);
      Alert.alert("Error", "Failed to select photo. Please try again.");
    }
  };

  // Handle complete registration with all user details
  const handleRegister = async () => {
    setIsInProgress(true);

    // Validation
    if (!username.trim()) {
      Alert.alert("Please enter a username");
      setIsInProgress(false);
      return;
    }

    if (!address.trim()) {
      Alert.alert("Please enter your address");
      setIsInProgress(false);
      return;
    }

    if (!validatePhone(phoneNumber)) {
      Alert.alert("Please enter a valid 10-digit phone number");
      setIsInProgress(false);
      return;
    }

    try {
      let response;

      if (isGoogleSignIn) {
        // Register with Google
        const userData = {
          idToken: googleIdToken,
          email: email,
          name: username,
          photoUrl: photo || "",
          address: address,
          phoneNumber: phoneNumber,
          location: {
            latitude: 22.311195,
            longitude: 73.181983,
          },
        };

        response = await axios.post(
          `${API_BASE_URL}/api/users/register`,
          userData
        );
      } else {
        // Register with email/password
        const userData = {
          email: email,
          password: password,
          name: username,
          photoUrl: photo || "",
          address: address,
          phoneNumber: phoneNumber,
          location: {
            latitude: 22.311195,
            longitude: 73.181983,
          },
        };

        response = await axios.post(
          `${API_BASE_URL}/api/users/registerbyemail`,
          userData
        );
      }

      // Handle response
      if (response.data.status === false) {
        Alert.alert("Registration Failed", response.data.message);
        setIsInProgress(false);
        return;
      } else {
        // Store user data in Zustand store
        setUser(response.data.user);
        Alert.alert("Registration Successful", `Welcome ${username}!`);
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Registration Failed", "Please try again.");
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex-1 justify-center p-4 items-center`}>
          <Text style={tw`text-3xl mb-6 text-center font-bold`}>
            Your Details
          </Text>
          {/* Profile Photo */}
          <TouchableOpacity onPress={handleSelectPhoto}>
            <View style={tw`mb-6 items-center`}>
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={tw`w-24 h-24 rounded-full`}
                />
              ) : (
                <View
                  style={tw`w-24 h-24 rounded-full bg-gray-300 items-center justify-center`}
                >
                  <Text style={tw`text-gray-500`}>Add Photo</Text>
                </View>
              )}
              <Text style={tw`mt-2 text-blue-500`}>Change Photo</Text>
            </View>
          </TouchableOpacity>
          {/* Email Display - Not editable */}
          <View style={tw`mb-4 ml-6 mr-6 w-full`}>
            <Text style={tw`text-gray-600 mb-1 ml-1`}>Email</Text>
            <View style={tw`p-3 bg-gray-100 rounded-md`}>
              <Text>{email}</Text>
            </View>
          </View>
          {/* Username Input */}
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={tw`mb-4 ml-6 mr-6`}
            textStyle={tw`p-2`}
            label="Username"
          />
          {/* Address */}
          <Input
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={tw`mb-4 ml-6 mr-6`}
            textStyle={tw`p-2`}
            label="Address"
            multiline={true}
            numberOfLines={3}
          />
          {/* Phone Number */}
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={tw`mb-6 ml-6 mr-6`}
            textStyle={tw`p-2`}
            label="Phone Number"
          />
          {/* Register Button */}
          <View style={tw`w-full`}>
            <Button
              onPress={handleRegister}
              disabled={isInProgress}
              style={[tw`mb-4 ml-6 mr-6`, { backgroundColor: colors.primary }]}
            >
              {isInProgress ? "Registering..." : "Complete Registration"}
            </Button>
          </View>
          {/* Back Button */}
          <Button
            appearance="ghost"
            onPress={() => {
              signOutFromGoogle();
              navigation.goBack();
            }}
          >
            Back
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserDetailsScreen;
