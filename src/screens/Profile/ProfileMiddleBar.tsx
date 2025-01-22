import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing icons from expo
// import { useRouter } from "expo-router"; // Importing useRouter for routing

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileMiddleBar = () => {
  // Dictionary to store data with title, icon name, id, color, and path
  const dataDict = {
    1: {
      id: "1",
      title: "Favorite Restaurants",
      iconName: "heart",
      color: "#FF6347",
      path: "/components/FavoriteRestaurants/FavoriteRestaurants",
    },
    2: {
      id: "2",
      title: "Your Bookings",
      iconName: "calendar",
      color: "#FFA500",
      path: "/components/YourBookings/YourBookings",
    },
    3: {
      id: "3",
      title: "History",
      iconName: "time",
      color: "#4682B4",
      path: "/components/History/History",
    },
    4: {
      id: "4",
      title: "About",
      iconName: "alert",
      color: "#32CD32",
      path: "/components/About/About",
    },
  };

  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "#333" : "#FFF";

  // const router = useRouter(); // Initialize useRouter

  // Function to handle navigation when an item is clicked
  const handleItemPress = (path: string) => {
    // router.push(path); // Navigates to the given path
  };

  // Convert dictionary to an array for FlatList
  const dataArray = Object.keys(dataDict).map((key) => ({
    ...dataDict[key],
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
      ]}>
      <FlatList
        data={dataArray}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleItemPress(item.path)} // Calling the navigation function
          >
            <View
              style={[
                styles.item,
                { backgroundColor: item.color }, // Apply color dynamically
              ]}>
              <Ionicons
                name={item.iconName}
                size={25}
                color="#FFF" // Icon color
                style={styles.leftIcon}
              />
              <Text style={[styles.itemText, { color: "#FFF" }]}>
                {item.title}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#FFF" // Icon color
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: screenHeight * 0.75,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: "space-between",
    shadowColor: "#121212",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 22,
    marginLeft: 10,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export default ProfileMiddleBar;
