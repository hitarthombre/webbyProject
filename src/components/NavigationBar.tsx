import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
// import { useRouter, usePathname } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const NavigationBar = ({navigation}:any) => {
  const systemTheme = useColorScheme();
  // const router = useRouter();

  // // 1. Grab the current path
  // const pathname = usePathname();

  // 2. Determine if dark mode is active
  const isDarkMode = systemTheme === "dark";

  // 3. Function to navigate
  const handleItemPress = (screen: string) => {
    navigation.navigate(screen);
  };

  // 4. Helper: which tab is active?
  const isActive = (path: string) => {
    // // If the route is the root "/", treat it the same as "/components/Home/Home"
    // if (path === "/components/Home/Home" && pathname === "/") {
    //   return true;
    // }
    // // Otherwise, do exact match
    // return pathname === path;
    return false
  };

  return (
    <View style={styles.container}>
      {/* Bottom Navigation Bar */}
      <View
        style={[
          styles.tabBar,
          { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
        ]}>
        {/* =============== Home Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Home")}>
          <Ionicons
            name="home"
            size={24}
            color={
              isActive("/components/Home/Home")
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color: isActive("/components/Home/Home")
                  ? isDarkMode
                    ? "#FFF"
                    : "#000"
                  : isDarkMode
                  ? "gray"
                  : "#aaa",
              },
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* =============== Restaurant Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("RestaurantPage")}>
          <Ionicons
            name="restaurant"
            size={24}
            color={
              isActive("/components/Restaurant/Restaurant")
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color: isActive("/components/Restaurant/Restaurant")
                  ? isDarkMode
                    ? "#FFF"
                    : "#000"
                  : isDarkMode
                  ? "gray"
                  : "#aaa",
              },
            ]}>
            Restaurant
          </Text>
        </TouchableOpacity>

        {/* =============== Search Tab =============== */}
        {/* <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Search")}>
          <Ionicons
            name="search"
            size={24}
            color={
              isActive("/components/Search/Search")
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color: isActive("/components/Search/Search")
                  ? isDarkMode
                    ? "#FFF"
                    : "#000"
                  : isDarkMode
                  ? "gray"
                  : "#aaa",
              },
            ]}>
            Search
          </Text>
        </TouchableOpacity> */}

        {/* =============== Profile Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Profile")}>
          <Ionicons
            name="person"
            size={24}
            color={
              isActive("/components/Profile/Profile")
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color: isActive("/components/Profile/Profile")
                  ? isDarkMode
                    ? "#FFF"
                    : "#000"
                  : isDarkMode
                  ? "gray"
                  : "#aaa",
              },
            ]}>
            Profile
          </Text>
        </TouchableOpacity>

        {/* =============== Product Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Product")}>
          <Ionicons
            name="pricetag"
            size={24}
            color={
              isActive("/components/Product/Product")
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color: isActive("/components/Product/Product")
                  ? isDarkMode
                    ? "#FFF"
                    : "#000"
                  : isDarkMode
                  ? "gray"
                  : "#aaa",
              },
            ]}>
            Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    // any container styling
  },
  tabBar: {
    height: screenHeight * 0.07,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical:10,
    paddingHorizontal:15,
    marginBottom:10
  },
  tabButton: {
    alignItems: "center",
    
  },
  tabText: {
    fontSize: 12,
    margin: 3,
  },
});
