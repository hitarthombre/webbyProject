import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const WINDOW_WIDTH = Dimensions.get("window").width;

const NavigationBar = ({ navigation, scrollY }: { navigation: any; scrollY?: Animated.Value }) => {
  // Create local animated value if not provided
  const localScrollY = useRef(new Animated.Value(0)).current;
  const effectiveScrollY = scrollY || localScrollY;
  
  // Animation for visibility
  const translateY = effectiveScrollY.interpolate({
    inputRange: [-50, 0, 100],
    outputRange: [0, 0, 20],
    extrapolate: 'clamp'
  });
  
  // Get current route for active state
  const currentRoute =
    navigation.getState().routes[navigation.getState().index].name;

  // Function to navigate
  const handleItemPress = (screen: string) => {
    navigation.navigate(screen);
  };

  // Helper: which tab is active?
  const isActive = (screen: string) => currentRoute === screen;

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ translateY }] }
      ]}
    >
      <View style={styles.barBackground}>
        <View style={styles.tabBar}>
          {/* =============== Home Tab =============== */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleItemPress("Home")}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive("Home") ? `home` : `home-outline`}
                size={24}
                color={isActive("Home") ? "#3b82f6" : "#6b7280"}
              />
              <Text style={[styles.tabText, isActive("Home") && styles.activeText]}>Home</Text>
            </View>
          </TouchableOpacity>

          {/* =============== Search Tab =============== */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleItemPress("Search")}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive("Search") ? `search` : `search-outline`}
                size={24}
                color={isActive("Search") ? "#3b82f6" : "#6b7280"}
              />
              <Text style={[styles.tabText, isActive("Search") && styles.activeText]}>Search</Text>
            </View>
          </TouchableOpacity>

          {/* =============== Profile Tab =============== */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleItemPress("Profile")}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive("Profile") ? `person` : `person-outline`}
                size={24}
                color={isActive("Profile") ? "#3b82f6" : "#6b7280"}
              />
              <Text style={[styles.tabText, isActive("Profile") && styles.activeText]}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

// HOC to use with scroll views
export const withNavigationBar = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    
    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          {...props}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <WrappedComponent {...props} />
        </Animated.ScrollView>
        <NavigationBar navigation={props.navigation} scrollY={scrollY} />
      </View>
    );
  };
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 10,
  },
  barBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
});