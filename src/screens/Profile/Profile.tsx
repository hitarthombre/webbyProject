import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ProfileTopBar from "./ProfileTopBar";
import ProfileMiddleBar from "./ProfileMiddleBar";
import ProfileButtonBar from "./ProfileButtonBar";
import NavigationBar from "../../components/NavigationBar";
import userStore from "../../zustand/userStore";
import axios from "axios";
import API_BASE_URL from "../../../config";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

interface User {
  _id: {
    $oid: string;
  };
  name: string;
  email: string;
  idToken: string;
  photoUrl: string;
  address: string;
  phoneNumber: string;
  location: Location;
  __v: number;
}

const Profile = ({ navigation }: any) => {
  //  useFocusEffect(
  //     useCallback(() => {
  //       navigation.dispatch(CommonActions.preload("Profile"));
  //       navigation.dispatch(CommonActions.preload("Search"));
  //       navigation.dispatch(CommonActions.preload("Home"));
  //     }, [navigation])
  //   );
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const { getUser } = userStore();
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
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const fetchUser = async () => {
    const pUser = getUser();
    console.log("user name:" + pUser._id);
    const res = await axios.post(`${API_BASE_URL}/api/users/getUser`, {
      _id: pUser._id,
    });
    setUser(res.data.user);

    setLoading(false); // Set loading to false after data is fetched
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%", paddingTop: insets.top }}>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      <View style={styles.TopBar}>
        <ProfileTopBar user={user} />
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
export default Profile;
