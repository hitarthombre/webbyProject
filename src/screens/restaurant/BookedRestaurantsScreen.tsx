import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
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

export default function BookedRestaurantsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY] = useState(new Animated.Value(0));
  const [bookedRestaurants, setBookedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUser } = userStore();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const pUser = getUser(); // Get user details
        const response = await axios.post(
          `${API_BASE_URL}/api/bookings/fetchUserBookings`,
          {
            userId: pUser?._id,
          }
        );
        setBookedRestaurants(response.data.bookedRestaurants);
      } catch (err) {
        setError("Failed to load booked restaurants. " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter restaurants based on search query
  const filteredRestaurants = bookedRestaurants.filter(
    (booking) =>
      booking.restaurant.restaurantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search bookings..."
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
            filteredRestaurants.map((booking) => (
              <View key={booking._id} style={styles.bookingCard}>
                <Text style={styles.bookingInfo}>
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </Text>
                <Text style={styles.bookingInfo}>
                  Time: {booking.bookingTime}
                </Text>
                <Text style={styles.bookingInfo}>
                  Guests: {booking.numberOfGuests}
                </Text>
                <Text style={styles.bookingInfo}>
                  Status: <Text style={styles.statusText}>{booking.status}</Text>
                </Text>
                <RestroCard
                  image={booking.restaurant.image[0]}
                  discount="20% OFF"
                  name={booking.restaurant.restaurantName}
                  cuisine={booking.restaurant.cuisine}
                  rating={booking.restaurant.rating}
                  time={booking.restaurant.time}
                  description={booking.restaurant.description}
                  restaurantId={booking.restaurant._id}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No restaurant bookings found.
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
    paddingHorizontal: 20,
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
  bookingCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: "#4A5568",
  },
  statusText: {
    fontWeight: "600",
    color: "#667eea",
  },
});