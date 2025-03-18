import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// imports of components
import Header from "./RestaurantHomePageComponent s/Header";
import Rating from "./RestaurantHomePageComponents/Rating";
import ImageCarousel from "./RestaurantHomePageComponents/ImageCarousel";
import Description from "./RestaurantHomePageComponents/Description";
import NavigationBar from "../../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const SearchedRestro = ({ route }: any) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;

  // State for distance calculation
  const [distance, setDistance] = useState("Calculating...");

  // Static coordinates for Polytechnic, Nizampura, near Shastri Bridge, Vadodara, Gujarat
  const restaurantCoordinates = {
    latitude: 22.3117,
    longitude: 73.1823,
  };

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Get user's current location and calculate distance
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLong = position.coords.longitude;

            const calculatedDistance = calculateDistance(
              userLat,
              userLong,
              restaurantCoordinates.latitude,
              restaurantCoordinates.longitude
            );

            setDistance(`${calculatedDistance} km`);
          },
          (error) => {
            console.error("Error getting location:", error);
            setDistance("2 km"); // Fallback to default
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setDistance("2 km"); // Fallback if geolocation isn't available
      }
    };

    getUserLocation();
  }, []);

  const openInMaps = () => {
    const mapUrl = Platform.select({
      ios: `maps://app?saddr=Current+Location&daddr=${restaurantCoordinates.latitude},${restaurantCoordinates.longitude}`,
      android: `google.navigation:q=${restaurantCoordinates.latitude},${restaurantCoordinates.longitude}`,
    });

    Linking.canOpenURL(mapUrl).then((supported) => {
      if (supported) {
        Linking.openURL(mapUrl);
      } else {
        // Fallback to web URL if the maps app isn't available
        Linking.openURL(
          `https://www.google.com/maps/dir/?api=1&destination=${restaurantCoordinates.latitude},${restaurantCoordinates.longitude}`
        );
      }
    });
  };

  useEffect(() => {
    console.log("Restaurant Data:", restaurant); // Keep the logging

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    navigation.preload("MenuItems");
  }, []);

  interface Restro {
    id: number;
    name: string;
    description: string;
    time: string;
    far: string;
    location: string;
    avgCost: string;
    rating: string;
    image: string[];
    cuisine: string[];
    ownerName: string;
    email: string;
    phone: string;
  }

  const [restro, setRestro] = useState<Restro>({
    id: 1001,
    name: restaurant.restaurantName || "Restaurant",
    description: restaurant.description || "No description available",
    time: `${restaurant.time?.open || "10:00"} - ${
      restaurant.time?.close || "22:00"
    }`,
    far: distance, // Use the calculated distance
    location: `${restaurant.location?.shopNo || ""}, ${
      restaurant.location?.floorNo || ""
    }, ${restaurant.location?.area || ""}, ${restaurant.location?.city || ""}`,
    avgCost: "2000 for four",
    rating: restaurant.rating || "4.0",
    image: restaurant.image || [],
    cuisine: restaurant.cuisine ? restaurant.cuisine.split(",") : ["Various"],
    ownerName: restaurant.ownerName || "Owner",
    email: restaurant.email || "email@example.com",
    phone: restaurant.phone || "Not available",
  });

  // Update restro when distance changes
  useEffect(() => {
    setRestro((prev) => ({
      ...prev,
      far: distance,
    }));
  }, [distance]);

  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleCall = () => {
    Linking.openURL(`tel:${restro.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${restro.email}`);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "transparent"]}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
      </LinearGradient>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!restro) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No restaurant data found!</Text>
      </View>
    );
  }

  const {
    name,
    location,
    description,
    rating,
    avgCost,
    cuisine,
    ownerName,
    email,
    phone,
  } = restro;

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Image Carousel with Header Overlay */}
          <View style={styles.carouselContainer}>
            <ImageCarousel
              imageUrls={
                restro.image.length > 0
                  ? restro.image
                  : [
                      "https://via.placeholder.com/400x200?text=No+Image",
                      "https://via.placeholder.com/400x200?text=No+Image",
                    ]
              }
              onIndexChange={setActiveImageIndex}
            />
            {renderHeader()}

            {/* Image Pagination */}
            <View style={styles.pagination}>
              {restro.image.length > 0
                ? restro.image.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeImageIndex === index &&
                          styles.paginationDotActive,
                      ]}
                    />
                  ))
                : [0, 1].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeImageIndex === index &&
                          styles.paginationDotActive,
                      ]}
                    />
                  ))}
            </View>
          </View>

          {/* Restaurant Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.nameContainer}>
              <Text style={styles.restaurantName}>{name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{rating}</Text>
                <Ionicons name="star" size={16} color="#FFF" />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={20} color="#666" />
                <Text style={styles.statText}>{restro.time}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="currency-rupee" size={20} color="#666" />
                <Text style={styles.statText}>{avgCost}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="location-outline" size={20} color="#666" />
                <Text style={styles.statText}>{restro.far}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Cuisines Section */}
            <Text style={styles.sectionTitle}>Cuisines</Text>
            <View style={styles.cuisineContainer}>
              {cuisine.map((item, index) => (
                <View key={index} style={styles.cuisineTag}>
                  <Text style={styles.cuisineTagText}>{item.trim()}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            {/* Owner Details Section */}
            <View style={styles.ownerSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>

              <View style={styles.ownerDetail}>
                <View style={styles.ownerInfo}>
                  <FontAwesome name="user" size={18} color="#666" />
                  <Text style={styles.ownerText}>
                    <Text style={styles.ownerLabel}>Owner: </Text>
                    {ownerName}
                  </Text>
                </View>
              </View>

              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={handleCall}
                >
                  <FontAwesome name="phone" size={18} color="#FFF" />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={handleEmail}
                >
                  <FontAwesome name="envelope" size={18} color="#FFF" />
                  <Text style={styles.contactButtonText}>Email</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contactDetails}>
                <View style={styles.contactItem}>
                  <FontAwesome name="phone" size={16} color="#666" />
                  <Text style={styles.contactText}>{phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <FontAwesome name="envelope" size={16} color="#666" />
                  <Text style={styles.contactText}>{email}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Location Section - Map View */}
            <View style={styles.mapSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity
                style={styles.mapViewButton}
                onPress={openInMaps}
              >
                <View style={styles.mapButtonContent}>
                  <Ionicons name="location" size={24} color="#FFF" />
                  <Text style={styles.mapButtonText}>View on Google Maps</Text>
                </View>
                <Text style={styles.mapAddressText}>{restro.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.menuButton]}
          onPress={() =>
            navigation.navigate("MenuItems", { restaurantId: restaurant._id })
          }
        >
          <Ionicons name="restaurant-outline" size={20} color="#FFF" />
          <Text style={styles.footerButtonText}>View Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.bookButton]}
          onPress={() =>
            navigation.navigate("RestaurantBooking", { restaurant })
          }
        >
          <Ionicons name="calendar-outline" size={20} color="#FFF" />
          <Text style={styles.footerButtonText}>Book Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flexGrow: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    height: screenHeight * 0.4,
    position: "relative",
  },
  pagination: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  paginationDotActive: {
    backgroundColor: "#FFF",
    width: 24,
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 20,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    width: "70%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cuisineText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  // Updated location styles
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginRight: 10,
  },
  mapButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 24,
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: "#666",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1A1A1A",
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1A1A1A",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    gap: 12,
  },
  footerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  menuButton: {
    backgroundColor: "#FF4B3A",
  },
  bookButton: {
    backgroundColor: "#4CAF50",
  },
  footerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  // New styles for cuisines
  cuisineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  cuisineTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  cuisineTagText: {
    fontSize: 14,
    color: "#444",
  },
  // New styles for owner section
  ownerSection: {
    marginTop: 8,
  },
  ownerDetail: {
    marginBottom: 16,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  ownerText: {
    fontSize: 16,
    color: "#333",
  },
  ownerLabel: {
    fontWeight: "600",
  },
  contactActions: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  contactDetails: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
  },
  // New map section styles
  mapSection: {
    marginTop: 24,
  },
  mapViewButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    overflow: "hidden",
  },
  mapButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 16,
    gap: 12,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  mapAddressText: {
    padding: 16,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

export default SearchedRestro;
