import React from "react";
import { View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import tw from "twrnc";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { signOutFromGoogle } from "../utils/authHelpers";
import userStore from "../zustand/userStore";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { setUser, getUser, clearUser } = userStore();
  const user = getUser();
  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl mb-8 text-center`}>
        Welcome to Restaurant App {user.email}
      </Text>

      <Button
        style={tw`mb-4`}
        onPress={() => navigation.navigate("RegisterRestaurant")}
      >
        Register New Restaurant
      </Button>

      <Button
        appearance="ghost"
        status="danger"
        onPress={async () => {
          await signOutFromGoogle();
          clearUser();
          navigation.replace("Login");
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default HomeScreen;
