import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import RestaurantForm from "../RestaurantFormScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "RegisterRestaurant">;

const RegisterRestaurantScreen = ({ navigation }: Props) => {
  return (
    <View style={tw`flex-1 p-4`}>
      <RestaurantForm navigation={navigation} />
    </View>
  );
};

export default RegisterRestaurantScreen;
