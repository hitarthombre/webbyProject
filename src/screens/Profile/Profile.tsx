import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileTopBar from "./ProfileTopBar";
import ProfileMiddleBar from "./ProfileMiddleBar";
import ProfileButtonBar from "./ProfileButtonBar";
import NavigationBar from "../../components/NavigationBar";
import userStore from "../../zustand/userStore";
import axios from "axios";
import API_BASE_URL from "../../../config";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface User {
  email: string;
  idToken: string;
  name?: string;
  photoUrl?: string;
}

const Profile = ({ navigation }: any) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const { getUser } = userStore();

  const fetchUser = async () => {
    const pUser = getUser();
    console.log("user name:"+pUser.email);
    const res = await axios.post(`${API_BASE_URL}/api/users/getUser`, {
      email: pUser.email,
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
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.TopBar}>
        <ProfileTopBar user={user} />
      </View>
      <View style={styles.ButtonBar}>
        <ProfileButtonBar user={user} />
      </View>
      <View style={styles.MiddleBar}>
        <ProfileMiddleBar user={user} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
