import { View, Image, Alert, Pressable } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import tw from "twrnc";
import { useState } from "react";
import { colors } from "../../theme/colors";
import {
  signOutFromGoogle,
  signUpWithGoogle,
  validateEmail,
  validatePass,
} from "../../utils/authHelpers";
import axios from "axios";
import userStore from "../../zustand/userStore";
import API_BASE_URL from "../../../config";
const LoginScreen = ({ navigation }: any) => {
  const { setUser, getUser } = userStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const userInfo = await signUpWithGoogle();
      if (userInfo.type === "success") {
        // fetch user from server
        const user = {
          idToken: userInfo.data?.idToken,
          email: userInfo.data?.user.email,
        };
        // console.log("email:"+user.idToken)
        const response = await axios.get(`${API_BASE_URL}/api/users/login`, {
          params: {
            email: user.email,
            idToken: user.idToken,
          },
        });
        // check if user exists
        if (response.data.status === false) {
          Alert.alert(response.data.message);
          signOutFromGoogle();
          return;
        } else {
          if (response.status === 201) {
            Alert.alert(
              "Sign-In Successful",
              `Welcome ${userInfo.data?.user.name}!`
            );
            setUser(response.data.user);
            navigation.navigate("Home");
          }
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Sign-In Failed", "Please try again.");
      signOutFromGoogle();
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email) || !validatePass(password)) {
      Alert.alert("Invalid email or password");
      setPassword("");
      return;
    } else {
      // continue login process
      try {
        const user = { email, password };
        const response = await axios.get(
          `${API_BASE_URL}/api/users/loginbyemail`,
          {
            params: {
              email: user.email,
              password: user.password,
            },
          }
        );
        console.log(password,"res:"+response)
        if (response.data.status === false) {
          Alert.alert("Invalid email or password");
          setPassword("");
          return;
        } else {
          Alert.alert("Login Successful");
          navigation.navigate("Home");
          setUser(response.data.user);
        }
      } catch (error) {
        Alert.alert(
          error instanceof Error
            ? error.message
            : "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Image
        source={require("../../../assets/images/auth_icon.png")}
        style={tw`w-full h-30 mb-8`}
      ></Image>
      <Text style={tw`text-2xl mb-8 text-center font-bold`}>Login</Text>
      <Input
        // verify user entered correct email accoring to syntax
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={tw`mb-4 ml-6 mr-6`}
        textStyle={tw`p-2`}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`mb-4 ml-6 mr-6`}
        textStyle={tw`p-2`}
      />
      <Button
        onPress={handleLogin}
        style={[tw`mb-4 ml-6 mr-6`, { backgroundColor: colors.primary }]}
      >
        Login
      </Button>
      <Button
        appearance="ghost"
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register
      </Button>
      {/* google login */}
      <Pressable
        style={tw`flex-row justify-center items-center mt-4`}
        onPress={handleGoogleSignIn}
      >
        <View style={tw`w-10 h-10 rounded-full`}>
          <Image
            source={require("../../../assets/images/google_icon.png")}
            style={tw`w-full h-full`}
          ></Image>
        </View>
      </Pressable>
    </View>
  );
};
export default LoginScreen;
