import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import NavigationBar from "../../components/NavigationBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const RestaurantPage = ({navigation}:any) => {
  return (
    <View>
      <View style={styles.RestaurantContainer}></View>
      <View style={styles.navigation}>
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  RestaurantContainer: {
    height: screenHeight * 0.93,
    width: screenWidth,
    backgroundColor: "#000",
    alignItems: "center",
  },
  navigation: {
    height: screenHeight * 0.08,
    backgroundColor: "#000",
  },
});

export default RestaurantPage;
