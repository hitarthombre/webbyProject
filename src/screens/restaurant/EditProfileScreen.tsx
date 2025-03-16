import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
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


const EditProfileScreen = ({ navigation, route }: any) => {
  // Get current user from store
  const { user, setUser, clearUser } = userStore();

  // State for user details
  const [username, setUsername] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [photo, setPhoto] = useState<string | null>(user?.photoUrl || null);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  // Handle saving profile changes
  const handleSaveProfile = async () => {
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
      const userData = {
        userId: user?.id,
        name: username,
        photoUrl: photo || "",
        address: address,
        phoneNumber: phoneNumber,
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/users/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      // Handle response
      if (response.data.status === false) {
        Alert.alert("Update Failed", response.data.message);
      } else {
        // Update user data in Zustand store
        setUser({
          ...user,
          name: username,
          photoUrl: photo || "",
          address: address,
          phoneNumber: phoneNumber,
        });
        Alert.alert("Profile Updated", "Your profile has been updated successfully!");
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Update Error:", error);
      Alert.alert("Update Failed", "Please try again.");
    } finally {
      setIsInProgress(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setIsInProgress(true);

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/delete/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      // Handle response
      if (response.data.status === false) {
        Alert.alert("Delete Failed", response.data.message);
      } else {
        clearUser();
        Alert.alert("Account Deleted", "Your account has been deleted successfully!");
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Alert.alert("Delete Failed", "Please try again.");
    } finally {
      setIsInProgress(false);
      setShowDeleteModal(false);
    }
  };

  // Edit Profile Modal
  const renderEditProfileModal = () => (
    <Modal
      visible={showEditModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-5 rounded-lg w-11/12 max-h-5/6`}>
          <Text style={tw`text-2xl font-bold mb-4 text-center`}>Edit Profile</Text>
          
          <ScrollView>
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
            <View style={tw`mb-4 w-full`}>
              <Text style={tw`text-gray-600 mb-1 ml-1`}>Email</Text>
              <View style={tw`p-3 bg-gray-100 rounded-md`}>
                <Text>{user?.email}</Text>
              </View>
            </View>
            
            {/* Username Input */}
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={tw`mb-4`}
              textStyle={tw`p-2`}
              label="Username"
            />
            
            {/* Address */}
            <Input
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={tw`mb-4`}
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
              style={tw`mb-6`}
              textStyle={tw`p-2`}
              label="Phone Number"
            />
          </ScrollView>
          
          {/* Buttons */}
          <View style={tw`flex-row justify-between`}>
            <Button
              appearance="outline"
              status="basic"
              onPress={() => setShowEditModal(false)}
              style={tw`flex-1 mr-2`}
              disabled={isInProgress}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSaveProfile}
              disabled={isInProgress}
              style={[tw`flex-1 ml-2`, { backgroundColor: colors.primary }]}
            >
              {isInProgress ? "Saving..." : "Save Changes"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Delete Account Confirmation Modal
  const renderDeleteAccountModal = () => (
    <Modal
      visible={showDeleteModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-5 rounded-lg w-4/5`}>
          <Text style={tw`text-xl font-bold mb-4 text-center`}>Delete Account</Text>
          <Text style={tw`text-center mb-6`}>
            Are you sure you want to delete your account? This action cannot be undone.
          </Text>
          
          <View style={tw`flex-row justify-between`}>
            <Button
              appearance="outline"
              status="basic"
              onPress={() => setShowDeleteModal(false)}
              style={tw`flex-1 mr-2`}
              disabled={isInProgress}
            >
              Cancel
            </Button>
            <Button
              status="danger"
              onPress={handleDeleteAccount}
              disabled={isInProgress}
              style={tw`flex-1 ml-2`}
            >
              {isInProgress ? "Deleting..." : "Delete"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex-1 justify-center p-4 items-center`}>
          <Text style={tw`text-3xl mb-6 text-center font-bold`}>
            Profile
          </Text>
          
          {/* Profile Photo */}
          <View style={tw`mb-6 items-center`}>
            {user?.photoUrl ? (
              <Image
                source={{ uri: user.photoUrl }}
                style={tw`w-24 h-24 rounded-full`}
              />
            ) : (
              <View
                style={tw`w-24 h-24 rounded-full bg-gray-300 items-center justify-center`}
              >
                <Text style={tw`text-gray-500`}>No Photo</Text>
              </View>
            )}
          </View>
          
          {/* User Details */}
          <View style={tw`w-full px-6`}>
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-1 ml-1`}>Email</Text>
              <View style={tw`p-3 bg-gray-100 rounded-md`}>
                <Text>{user?.email}</Text>
              </View>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-1 ml-1`}>Username</Text>
              <View style={tw`p-3 bg-gray-100 rounded-md`}>
                <Text>{user?.name}</Text>
              </View>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-1 ml-1`}>Address</Text>
              <View style={tw`p-3 bg-gray-100 rounded-md`}>
                <Text>{user?.address}</Text>
              </View>
            </View>
            
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-600 mb-1 ml-1`}>Phone Number</Text>
              <View style={tw`p-3 bg-gray-100 rounded-md`}>
                <Text>{user?.phoneNumber}</Text>
              </View>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={tw`w-full px-6`}>
            <Button
              onPress={() => setShowEditModal(true)}
              style={[tw`mb-4`, { backgroundColor: colors.primary }]}
            >
              Edit Profile
            </Button>
            
            <Button
              status="danger"
              appearance="outline"
              onPress={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </View>
        </View>
      </ScrollView>
      
      {/* Render Modals */}
      {renderEditProfileModal()}
      {renderDeleteAccountModal()}
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;