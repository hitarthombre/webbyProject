import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import ProfileTopBar from "./ProfileTopBar";
import ProfileMiddleBar from "./ProfileMiddleBar";
import ProfileButtonBar from "./ProfileButtonBar";
import NavigationBar from "../../components/NavigationBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Profile = ({ navigation }: any) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.TopBar}>
        <ProfileTopBar />
      </View>
      <View style={styles.ButtonBar}>
        <ProfileButtonBar />
      </View>
      <View style={styles.MiddleBar}>
        <ProfileMiddleBar />
      </View>
      <View style={styles.NavigationBar}>
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TopBar: {
    // height: screenHeight * 0.18,
  },
  ButtonBar: {
    // height: screenHeight * 0.1,
  },
  MiddleBar: {
    height: screenHeight * 0.65,
  },
  NavigationBar: {
    position: "absolute",
    bottom: 0,
    // height: "100",
    width: "100%",
  },
});

export default Profile;
