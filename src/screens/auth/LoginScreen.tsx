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
  hasPreviousSignIn,
  getCurrentUser,
} from "../../utils/authHelpers";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import axios from "axios";
import userStore from "../../zustand/userStore";
import API_BASE_URL from "../../../config";
const LoginScreen = ({ navigation }: any) => {
  const { setUser, getUser } = userStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInProgress, setIsInProgress] = useState(false);
  // google sign-in
  const handleGoogleSignIn = async () => {
    setIsInProgress(true);
    // const currentUser = await hasPreviousSignIn();
    // if (currentUser) {
    //   const loggedInUser = {'email' : currentUser.user.email, 'idToken' : currentUser.user.id, 'name' : currentUser.user.name, 'photoUrl' : currentUser.user.photo};
    //   setUser(loggedInUser);
    // }

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
          setIsInProgress(false);
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
    } finally {
      setIsInProgress(false);
    }
  };

  const handleLogin = async () => {
    setIsInProgress(true);
    if (!validateEmail(email) || !validatePass(password)) {
      Alert.alert("Invalid email or password");
      setPassword("");
      setIsInProgress(false);
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
        console.log(password, "res:" + response);
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
      } finally {
        setIsInProgress(false);
      }
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4 items-center`}>
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
      <View style={tw`w-full`}>
        <Button
          onPress={handleLogin}
          style={[tw`mb-4 ml-6 mr-6`, { backgroundColor: colors.primary }]}
          disabled={isInProgress}
        >
          Login
        </Button>
      </View>
      <Button
        appearance="ghost"
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register
      </Button>
      {/* google login */}
      {/* <Pressable
        style={tw`flex-row justify-center items-center mt-4`}
        onPress={handleGoogleSignIn}
      >
        <View style={tw`w-10 h-10 rounded-full`}>
          <Image
            source={require("../../../assets/images/google_icon.png")}
            style={tw`w-full h-full`}
          ></Image>
        </View>
      </Pressable> */}

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          handleGoogleSignIn();
        }}
        disabled={isInProgress}
      />
    </View>
  );
};
export default LoginScreen;
