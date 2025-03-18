import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Platform,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
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
        const pUser = getUser();
        const response = await axios.get(
          `${API_BASE_URL}/api/userbookings/${pUser._id}`
        );
        setBookedRestaurants(response.data || []);
      } catch (err) {
        setError(
          "Failed to load booked restaurants. " +
            (err.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredRestaurants = bookedRestaurants.filter((booking) => {
    // Check if booking and restaurantId exist before accessing restaurantName
    return (
      booking &&
      booking.restaurantId &&
      booking.restaurantId.restaurantName &&
      booking.restaurantId.restaurantName
        .toLowerCase()
        .includes((searchQuery || "").toLowerCase())
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const options = { weekday: "short", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch (error) {
      return "Invalid Date";
    }
  };

  const renderRestaurantCard = (booking) => {
    // Return null if booking or restaurantId is missing
    if (!booking || !booking.restaurantId) {
      return null;
    }

    const restaurant = booking.restaurantId;
    const imageUrl =
      restaurant.image && restaurant.image.length > 0
        ? restaurant.image[0]
        : "https://via.placeholder.com/150";

    return (
      <TouchableOpacity
        key={booking._id || `booking-${Math.random()}`}
        style={styles.bookingCard}
        activeOpacity={0.9}
      >
        {/* Restaurant Image */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.restaurantImage}
          resizeMode="cover"
          defaultSource={{ uri: "https://placehold.co/600x400/png" }} // Add a placeholder image in your assets
        />

        {/* Restaurant Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {restaurant.restaurantName || "Unknown Restaurant"}
            </Text>
          </View>

          <Text style={styles.cuisineText} numberOfLines={1}>
            {restaurant.cuisine || "Mixed Cuisine"}
          </Text>

          {/* Booking Details */}
          <View style={styles.bookingDetailsContainer}>
            <View style={styles.bookingDetail}>
              <Ionicons name="calendar-outline" size={16} color="#667eea" />
              <Text style={styles.bookingDetailText}>
                {formatDate(booking.selectedDate)}
              </Text>
            </View>

            <View style={styles.bookingDetail}>
              <Ionicons name="time-outline" size={16} color="#667eea" />
              <Text style={styles.bookingDetailText}>
                {booking.selectedTimeSlot || "Time not specified"}
              </Text>
            </View>

            <View style={styles.bookingDetail}>
              <Ionicons name="people-outline" size={16} color="#667eea" />
              <Text style={styles.bookingDetailText}>
                {booking.membersCount || 0}{" "}
                {booking.membersCount === 1 ? "Guest" : "Guests"}
              </Text>
            </View>
          </View>
        </View>

        {/* Options Button */}
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#4A5568" />
        </TouchableOpacity>

        {/* Rating Badge positioned at bottom right */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {restaurant.rating ? restaurant.rating : "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#667eea" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {filteredRestaurants && filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((booking) =>
              booking ? renderRestaurantCard(booking) : null
            )
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="calendar-outline" size={60} color="#E2E8F0" />
              <Text style={styles.noDataText}>
                No restaurant bookings found.
              </Text>
              <Text style={styles.emptyStateSubText}>
                Your upcoming reservations will appear here.
              </Text>
            </View>
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
    marginHorizontal: 20,
    marginVertical: 15,
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
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  bookingCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
    height: 170, // Fixed height for more consistent appearance
  },
  restaurantImage: {
    width: 100,
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEFCBF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    position: "absolute",
    bottom: 12,
    right: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#744210",
    marginLeft: 2,
  },
  cuisineText: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 8,
  },
  bookingDetailsContainer: {
    marginTop: 4,
  },
  bookingDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bookingDetailText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#4A5568",
  },
  optionsButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "#4A5568",
  },
  emptyStateSubText: {
    fontSize: 14,
    color: "#A0AEC0",
    marginTop: 8,
    textAlign: "center",
  },
});
