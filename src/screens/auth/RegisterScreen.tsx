import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import tw from "twrnc";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { colors } from "../../theme/colors";
import {
  signOutFromGoogle,
  signUpWithGoogle,
  validateEmail,
  validateOtp,
  validatePass,
} from "../../utils/authHelpers";
import axios from "axios";
import API_BASE_URL from "../../../config";
import CustomGoogleSigninButton from "../../components/CustomGoogleSigninButton ";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInProgress, setIsInProgress] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleGetOtp = async () => {
    setIsInProgress(true);
    if (!validateEmail(email)) {
      Alert.alert("Enter valid email");
      setIsInProgress(false);
      return;
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
          email,
        });
        if (response.data.status === true) {
          Alert.alert("OTP sent successfully");
          setIsInProgress(false);
        } else if (response.data.status === false) {
          Alert.alert(response.data.message);
          setIsInProgress(false);
          return;
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        Alert.alert("Failed to send OTP", "Please try again");
      } finally {
        setIsInProgress(false);
      }
    }
  };

  const verifyOtp = async () => {
    setIsInProgress(true);
    if (!validateOtp(otp)) {
      Alert.alert("Invalid OTP");
      setIsInProgress(false);
      return false;
    }

    try {
      // Verify OTP with the server
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.data.status === true) {
        setOtpVerified(true);
        setIsInProgress(false);
        return true;
      } else {
        Alert.alert(response.data.message || "Invalid Otp, Try again");
        setIsInProgress(false);
        return false;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("OTP Verification Failed", "Please try again");
      setIsInProgress(false);
      return false;
    }
  };

  const handleContinue = async () => {
    setIsInProgress(true);

    if (!validateEmail(email)) {
      Alert.alert("Please enter valid email");
      setIsInProgress(false);
      return;
    } else if (!validateOtp(otp)) {
      Alert.alert("Invalid OTP");
      setIsInProgress(false);
      return;
    } else if (!validatePass(password)) {
      Alert.alert("Password length must be greater than 8");
      setIsInProgress(false);
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      setIsInProgress(false);
      return;
    }

    // Verify OTP if not already verified
    if (!otpVerified) {
      const isVerified = await verifyOtp();
      if (!isVerified) {
        return;
      }
    }

    // Navigate to UserDetails screen with email and password
    navigation.navigate("UserDetails", {
      email,
      password,
    });

    setIsInProgress(false);
  };

  const handleGoogleSignIn = async () => {
    setIsInProgress(true);
    try {
      const userInfo = await signUpWithGoogle();
      if (userInfo.type === "success") {
        // Just navigate to UserDetails with Google user info
        navigation.navigate("UserDetails", {
          email: userInfo.data?.user.email,
          photoUrl: userInfo.data?.user.photo,
          googleIdToken: userInfo.data?.idToken,
          isGoogleSignIn: true,
        });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Sign-In Failed", "Please try again.");
      signOutFromGoogle();
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4 items-center`}>
      <Image
        source={require("../../../assets/images/auth_icon.png")}
        style={tw`w-full h-40 mb-8`}
        resizeMode="contain"
      />
      <Text style={tw`text-3xl mb-8 text-center font-bold`}>SIGNUP</Text>

      <Input
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={tw`mb-4 ml-6 mr-6`}
        textStyle={tw`p-2`}
      />

      <View style={tw`w-full`}>
        <View style={tw`flex-row justify-between pl-6 pr-6 pb-4`}>
          <Input
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            autoCapitalize="none"
            style={tw`w-[60%]`}
            textStyle={tw`p-2`}
            keyboardType="number-pad"
          />
          <Button
            style={[tw`border-0`, { backgroundColor: colors.primary }]}
            onPress={handleGetOtp}
            disabled={isInProgress}
          >
            Get OTP
          </Button>
        </View>
      </View>

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`mb-4 ml-6 mr-6`}
        textStyle={tw`p-2`}
      />

      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={tw`mb-4 ml-6 mr-6`}
        textStyle={tw`p-2`}
      />

      <View style={tw`w-full`}>
        <Button
          onPress={handleContinue}
          disabled={isInProgress}
          style={[tw`mb-4 ml-6 mr-6`, { backgroundColor: colors.primary }]}
        >
          {isInProgress ? "Processing..." : "Continue"}
        </Button>
      </View>

      <CustomGoogleSigninButton
        colors={colors}
        handleGoogleSignIn={handleGoogleSignIn}
        isInProgress={isInProgress}
      />

      <Button appearance="ghost" onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Button>
    </View>
  );
};

export default RegisterScreen;
