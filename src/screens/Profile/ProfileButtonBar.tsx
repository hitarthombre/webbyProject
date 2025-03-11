import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from "react-native";
import { signOutFromGoogle } from "../../utils/authHelpers";
import { MaterialIcons } from "@expo/vector-icons"; // Example icon library
import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileButtonBar = ({ user }: any) => {
  const navigation = useNavigation();
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  // const isDarkMode = theme === "dark";
  const isDarkMode = false;
  // const router = useRouter();

  const goSettings = () => {
    // router.push("/components/Settings/Settings");
  };
  const goBookMark = () => {
    // router.push("/components/Bookmark/Bookmark");
  };
  const goNotification = () => {
    // router.push("/components/Notification/Notification");
  };
  const gohelp = () => {
    // router.push("/components/Help/Help");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
      ]}
    >
      {/* Second Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={goSettings}
      >
        <MaterialIcons
          name="settings"
          size={30}
          color={isDarkMode ? "#FFF" : "#000"}
        />
        <Text
          style={[styles.buttonText, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          Settings
        </Text>
      </TouchableOpacity>

      {/* Third Button */}
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <MaterialIcons
          name="notifications"
          size={30}
          color={isDarkMode ? "#FFF" : "#000"}
          onPress={goNotification}
        />
        <Text
          style={[styles.buttonText, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          Notifications
        </Text>
      </TouchableOpacity>

      {/* Fourth Button */}
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <MaterialIcons
          name="help"
          size={30}
          color={isDarkMode ? "#FFF" : "#000"}
          onPress={gohelp}
        />
        <Text
          style={[styles.buttonText, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          Help
        </Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={async() => {
          await signOutFromGoogle();
          navigation.navigate("Login");
        }}
      >
        <View style={styles.signOutButton}>
          <MaterialIcons name="logout" size={24} color="#FFF"/>
        </View>
        <Text
          style={[styles.buttonText, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          Log Out
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    // position: "absolute",
    // bottom: 20,
    // right: 20,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 4,
    paddingHorizontal: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingVertical: 10,
    width: screenWidth,
    height: screenHeight * 0.1,
  },
  button: {
    alignItems: "center",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default ProfileButtonBar;
