import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
// import NavigationBar from "../Universal/NavigationBar";
import RestroCard from "../../components/RestroCard";
import NavigationBar from "../../components/NavigationBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({navigation}:any) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.HomeContainer}>
        <RestroCard />
      </View>
      <View style={styles.navigation}>
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    height: screenHeight * 0.93,
    width: screenWidth,
    backgroundColor: "#000",
    // justifyContent: "center",
    alignItems: "center",
  },
  navigation: {
    // zIndex: -1,
    // bottom: 0,
    // position: "absolute",
    height: screenHeight * 0.08,
    backgroundColor: "#000",
  },
  cardContainer: {
    // flexGrow: "column",
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    // padding: 20,
    // justifyContent: "space-between",
    flexDirection: "column",
    // alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    width: "105%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "#121212",
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    // resizeMode: "cover",
  },
  dataContainer: {
    width: "85%",
    height: "50%",
    // backgroundColor: "#f0f0f0",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    // paddingVertical: 10,
    // position: "absolute",
    zIndex: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    // marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: "#555",
    // marginBottom: 5,
  },
  timing: {
    fontSize: 12,
    color: "#fff",
    position: "absolute",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#fff",
    position: "absolute",
    bottom: 5,
  },
});

export default Home;
