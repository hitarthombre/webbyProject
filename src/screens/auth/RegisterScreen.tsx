import React, { useState } from "react";
import { View, Image, Pressable, Alert } from "react-native";
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
import userStore from "../../zustand/userStore";
import API_BASE_URL from "../../../config";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInProgress, setIsInProgress] = useState(false);
  const { setUser, getUser } = userStore();
  const handleGetOtp = async () => {
    setIsInProgress(true);
    if (!validateEmail(email)) {
      Alert.alert("Enter valid email");
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
      } finally {
        setIsInProgress(false);
      }
    }
  };
  const handleRegister = async () => {
    setIsInProgress(true);
    // if (!validateEmail(email) || password === "") {
    //   Alert.alert("Please fill in all fields.");
    //   return;
    // }
    if (!validateEmail(email)) {
      Alert.alert("Please Enter valid email");
      setIsInProgress(false);
      return;
    } else if (!validateOtp(otp)) {
      Alert.alert("Invalid otp");
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
    } else {
      try {
        setIsInProgress(true);
        // Implement your registration API call here
        // await api.post('/auth/register', { email, password });
        const user = { email, password, otp, photoUrl: "", name: username };
        const response = await axios.post(
          `${API_BASE_URL}/api/users/registerbyemail`,
          user
        );
        if (response.data.status === false) {
          Alert.alert(response.data.message);
          setIsInProgress(false);
          return;
        } else {
          alert("Registration successful!");
          setIsInProgress(false);
          setUser(response.data.user);
          navigation.replace("Home");
        }
      } catch (error) {
        alert("Registration failed. Please try again.");
      } finally {
        setIsInProgress(false);
      }
    }
  };
  const handleGoogleSignIn = async () => {
    setIsInProgress(true);
    try {
      const userInfo = await signUpWithGoogle();
      if (userInfo.type === "success") {
        const user = {
          idToken: userInfo.data?.idToken,
          email: userInfo.data?.user.email,
          name: userInfo.data?.user.name,
          photoUrl: userInfo.data?.user.photo,
        };
        const response = await axios.post(
          `${API_BASE_URL}/api/users/register`,
          user
        );

        if (response.data.status === false) {
          Alert.alert("Sign-Up Failed", "User already exists.");
          signOutFromGoogle();
        } else if (response.status === 201) {
          Alert.alert("Sign-Up Successful", `Welcome ${user.name}!`);
          setUser(response.data.user);
          console.log(getUser());
          response.status === 201 && navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Sign-In Failed", "Please try again.");
      setIsInProgress(false);
      signOutFromGoogle();
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4 items-center`}>
      <Image
        source={require("../../../assets/images/auth_icon.png")}
        style={tw`w-full h-30 mb-8`}
      ></Image>
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
        <View style={tw`flex-row justify-between pl-6 pr-6 pb-4 `}>
          <Input
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            autoCapitalize="none"
            style={tw`w-[60%]`}
            textStyle={tw`p-2`}
            keyboardType="number-pad"
          />
          <Button style={tw`border-0 bg-yellow-500`} onPress={handleGetOtp}>
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
          onPress={handleRegister}
          disabled={isInProgress}
          style={[tw`mb-4 ml-6 mr-6`, { backgroundColor: colors.primary }]}
        >
          {isInProgress ? "Creating Account..." : "Register"}
        </Button>
      </View>

      <Button appearance="ghost" onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Button>
      {/* google login */}
      {/* <Pressable
        style={tw`flex-row justify-center items-center mt-4`}
        onPress={handleGoogleSignIn}
      >
        <View style={tw`flex-row justify-center items-center mt-4`}>
          <View style={tw`w-10 h-10 rounded-full`}>
            <Image
              source={require("../../../assets/images/google_icon.png")}
              style={tw`w-full h-full`}
            ></Image>
          </View>
        </View>
      </Pressable> */}
      <View style={tw`w-full flex-row justify-center`}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
          disabled={isInProgress}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
