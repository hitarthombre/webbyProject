import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NavigationBar = ({ navigation }: any) => {
  // // 1. Grab the current path
  const currentRoute =
    navigation.getState().routes[navigation.getState().index].name;

  // 3. Function to navigate
  const handleItemPress = (screen: string) => {
    navigation.navigate(screen);
    // <Text>HEllo</Text>
  };

  // 4. Helper: which tab is active?
  const isActive = (screen: string) => currentRoute === screen;

  return (
    <View style={styles.container}>
      {/* Bottom Navigation Bar */}
      <View style={[styles.tabBar,{backgroundColor: '#fff'}]}>
        {/* =============== Home Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Home")}
        >
          <Ionicons
            name={isActive("Home") ? `home` : `home-outline`}
            size={24}
          />
        </TouchableOpacity>

        {/* =============== Restaurant Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("RestaurantPage")}
        >
          <Ionicons
            name={
              isActive("RestaurantPage") ? `restaurant` : `restaurant-outline`
            }
            size={24}
          />
        </TouchableOpacity>
        {/* =============== Search Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Search")}
        >
          <Ionicons
            name={
              isActive("Search") ? `search` : `search-outline`
            }
            size={24}
          />
        </TouchableOpacity>

        {/* =============== Product Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Product")}
        >
          <Ionicons
            name={isActive("Product") ? `pricetag` : `pricetag-outline`}
            size={24}
          />
        </TouchableOpacity>
        {/* =============== Profile Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("Profile")}
        >
          <Ionicons
            name={isActive("Profile") ? `person` : `person-outline`}
            size={24}
          />
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
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.3,
    borderTopColor: "#ddd",
    zIndex: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    margin: 3,
    display: "none",
  },
});