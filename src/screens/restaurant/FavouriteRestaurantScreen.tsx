import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import RestroCard from "../../components/RestroCard";
import API_BASE_URL from "../../../config";
import userStore from "../../zustand/userStore";
import { useStore } from "zustand";

export default function FavoriteRestaurantsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY] = useState(new Animated.Value(0));
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUser } = userStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const pUser = getUser(); // Get user details
        const response = await axios.post(
          `${API_BASE_URL}/api/restaurants/fetchAllFavorite`,
          {
            userId: pUser?._id,
          }
        );
        setFavoriteRestaurants(response.data.favoriteRestaurants);
      } catch (err) {
        setError("Failed to load favorite restaurants." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Filter restaurants based on search query
  const filteredRestaurants = favoriteRestaurants.filter(
    (restaurant) =>
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Header animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [
      Platform.OS === "ios" ? 120 : 100,
      Platform.OS === "ios" ? 80 : 60,
    ],
    extrapolate: "clamp",
  });

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[styles.searchContainer, { opacity: searchBarOpacity }]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#667eea"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search favorites..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
      </Animated.View>

      {loading ? (
        <ActivityIndicator size="large" color="#667eea" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestroCard
                key={restaurant._id}
                image={restaurant.image[0]}
                discount="20% OFF"
                name={restaurant.restaurantName}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                time={restaurant.time}
                description={restaurant.description}
                restaurantId={restaurant._id}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>
              No favorite restaurants found.
            </Text>
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2D3748",
    height: "100%",
  },
  scrollContent: {
    paddingTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#A0AEC0",
  },
});
