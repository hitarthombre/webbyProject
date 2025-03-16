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
import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router"; // Importing useRouter for routing

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
interface UserProps {
  name: string;
  email: string;
  photoUrl?: string;
  address?: string;
  phoneNumber?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
const ProfileMiddleBar = () => {
  // Dictionary to store data with title, icon name, id, color, and path
  const dataDict = {
    1: {
      id: "1",
      title: "Favorite Restaurants",
      iconName: "heart",
      color: "#FFFFFF",
      path: "/components/FavoriteRestaurants/FavoriteRestaurants",
    },
    2: {
      id: "2",
      title: "Your Bookings",
      iconName: "calendar",
      color: "#FFFFFF",
      path: "/components/YourBookings/YourBookings",
    },
    3: {
      id: "3",
      title: "History",
      iconName: "time",
      color: "#FFFFFF",
      path: "/components/History/History",
    },
    4: {
      id: "4",
      title: "About",
      iconName: "alert",
      color: "#FFFFFF",
      path: "/components/About/About",
    },
  };

  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  // const isDarkMode = theme === "dark";
  const isDarkMode = false

  const backgroundColor = isDarkMode ? "#333" : "#FFF";

  // const router = useRouter(); // Initialize useRouter
const navigation = useNavigation();
  // Function to handle navigation when an item is clicked
  const handleItemPress = (path: string) => {
    // router.push(path); // Navigates to the given path
    switch (path) {
      case "Favorite Restaurants":
      navigation.navigate("favourite");
      break;
      case "Your Bookings":
      navigation.navigate("bookedScreen");
      break;
      case "History":
      navigation.navigate("Home");
      break;
      case "About":
      navigation.navigate("Home");
      break;
      default:
      navigation.navigate(path);
      break;
    }
    
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
            onPress={() => handleItemPress(item.title)} // Calling the navigation function
          >
            <View
              style={[
                styles.item,
                { backgroundColor: item.color, 
                  // borderBottomWidth: 1,
                  // borderColor: "#bababa"
                 }, // Apply color dynamically
              ]}>
              <Ionicons
                name={item.iconName}
                size={20}
                color="#4a4a4a" // Icon color
                style={styles.leftIcon}
              />
              <Text style={[styles.itemText, { color: "#4a4a4a" }]}>
                {item.title}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={15}
                color="#4a4a4a" // Icon color
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
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
    // borderRadius: 12,
    justifyContent: "space-between",
    // shadowColor: "#121212",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // elevation: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
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
