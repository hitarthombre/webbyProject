import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SearchRestro from "../Search/SearchRestro";
import NavigationBar from "../../components/NavigationBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Search = ({navigation}:any) => {
  return (
    <View>
      <View style={styles.SearchContainer}>
        <SearchRestro />
      </View>
      <View style={styles.navigation}>
      <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    height: screenHeight * 0.08,
    backgroundColor: "#000",
  },
  SearchContainer: {
    height: screenHeight * 0.93,
    width: screenWidth,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
