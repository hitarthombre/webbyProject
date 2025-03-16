import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import userStore from "../../zustand/userStore";
import { Input, Button } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import API_BASE_URL from "../../../config";
import { colors } from "../../theme/colors";
import * as SecureStore from "expo-secure-store";
import { signOutFromGoogle } from "../../utils/authHelpers";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

type MenuItemProps = {
  title: string;
  subtitle?: string;
  hasChevron?: boolean;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  subtitle,
  hasChevron = true,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
      {hasChevron && <Ionicons name="chevron-forward" size={20} color="#666" />}
    </TouchableOpacity>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  const { user, setUser, clearUser } = userStore();

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
      // Updated to match the API controller implementation
      const userData = {
        userId: user?._id,
        name: username,
        address: address,
        phoneNumber: phoneNumber,
        photoUrl: photo || "",
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/users/update`,
        userData
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
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully!"
        );
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
      // Updated to match the API controller implementation
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/delete`,
        { data: { userId: user?._id } } // Send userId in request body for DELETE
      );

      // Handle response
      if (response.data.status === false) {
        Alert.alert("Delete Failed", response.data.message);
      } else {
        clearUser();
        await SecureStore.deleteItemAsync("user");
        signOutFromGoogle();
        Alert.alert(
          "Account Deleted",
          "Your account has been deleted successfully!"
        );
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
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white p-5 rounded-lg w-11/12 max-h-5/6`}>
          <Text style={tw`text-2xl font-bold mb-4 text-center`}>
            Edit Profile
          </Text>

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
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white p-5 rounded-lg w-4/5`}>
          <Text style={tw`text-xl font-bold mb-4 text-center`}>
            Delete Account
          </Text>
          <Text style={tw`text-center mb-6`}>
            Are you sure you want to delete your account? This action cannot be
            undone.
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.mainContainer}>
          <MenuItem
            title="Edit Profile"
            subtitle="Change your name, description, and profile photo"
            onPress={() => setShowEditModal(true)}
          />
          <View style={styles.divider} />

          <MenuItem
            title="Delete Account"
            subtitle="Permanently delete your account and all data"
            onPress={() => setShowDeleteModal(true)}
          />
          <View style={styles.divider} />
        </View>

        {/* Render Modals */}
        {renderEditProfileModal()}
        {renderDeleteAccountModal()}
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: screenHeight * 0.02,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.02,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
  },
  menuItemSubtitle: {
    color: "#999",
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    width: "95%",
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginVertical: 4,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.05,
  },
});
