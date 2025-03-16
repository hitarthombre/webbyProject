import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import RestroCard from "../../components/RestroCard";
import API_BASE_URL from "../../../config";
import userStore from "../../zustand/userStore";
import restaurantStore from "../../zustand/RestaurantStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";

const RestaurantApp = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { getUser } = userStore();
  const { getRestaurants, setRestaurants } = restaurantStore();

  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [localRestaurants, setLocalRestaurants] = useState([]);
  const [restaurants, setRestaurantsState] = useState([]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/restaurants/get/1`);
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurant details:", error.message);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/homepage/getCategories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      return [];
    }
  };

  const fetchUser = async () => {
    const pUser = getUser();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/getUser`, {
        _id: pUser._id,
      });
      setUser(res.data.user);
      console.log("User data updated:", res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      let storedRestaurants = getRestaurants();

      if (storedRestaurants.length === 0) {
        console.log("Fetching restaurants from API...");
        const fetchedRestaurants = await fetchRestaurantDetails();
        if (fetchedRestaurants) {
          setRestaurants(fetchedRestaurants);
          setLocalRestaurants(fetchedRestaurants);
        }
      } else {
        console.log("Using restaurants from Zustand store...");
        setLocalRestaurants(storedRestaurants);
      }

      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      await fetchUser();

      // Fetch restaurant data
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/getRandomPromoted`);
        setRestaurantsState(response.data.results);
      } catch (error) {
        console.error("Error fetching promoted restaurants:", error.message);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.dispatch(CommonActions.preload("Profile"));
      navigation.dispatch(CommonActions.preload("Search"));
    }, [navigation])
  );

  // Render the header with just the address
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color="#FF4B3A" />
        <View>
          <Text style={styles.locationTitle}>Delivery to</Text>
          <Text style={styles.locationText}>{user?.address || "Set your address"}</Text>
        </View>
      </View>
    </View>
  );

  // Render the promotion banner with LinearGradient
  const renderPromoBanner = () => (
    <LinearGradient
      colors={["#FF4B3A", "#FF8C8A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.promoBanner}
    >
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>70% OFF</Text>
        <Text style={styles.promoSubtitle}>Special Offer</Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
        }}
        style={styles.promoImage}
      />
    </LinearGradient>
  );

  // Function to render each restaurant item
  const renderRestaurantItem = ({ item }: { item: any }) => (
    <LinearGradient
      colors={["#FF4B3A", "#FF8C8A"]}
      style={styles.bannerContainer}
    >
      <Image source={{ uri: item.image[0] }} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerText}>{item.restaurantName}</Text>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={() => navigation.navigate("RestaurantHomePage", { restaurant: item })}
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
      paddingTop: insets.top,
    },
    header: {
      padding: 16,
      backgroundColor: "#FFF",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationTitle: {
      fontSize: 12,
      color: "#666",
      marginLeft: 8,
    },
    locationText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 8,
    },
    promoBanner: {
      margin: 16,
      borderRadius: 16,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    promoContent: {
      flex: 1,
    },
    promoTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FFF",
      marginBottom: 4,
    },
    promoSubtitle: {
      fontSize: 16,
      color: "#FFF",
      marginBottom: 12,
    },
    promoButton: {
      backgroundColor: "#FFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    promoButtonText: {
      color: "#FF4B3A",
      fontWeight: "600",
    },
    promoImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    categoriesSection: {
      marginVertical: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 16,
      marginBottom: 12,
    },
    categoriesList: {
      paddingHorizontal: 16,
    },
    categoryCard: {
      marginRight: 16,
      alignItems: "center",
    },
    categoryImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 8,
      backgroundColor: "#fff",
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: "500",
    },
    restaurantCount: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
    },
    popularContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    countText: {
      fontSize: 14,
      fontWeight: "500",
    },
    popularText: {
      fontSize: 14,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    bannerList: {
      height: 140,
      marginVertical: 16,
    },
    bannerContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      width: Dimensions.get("window").width * 0.9,
      height: 120,
      marginRight: 10,
      borderRadius: 8,
      overflow: "hidden",
      elevation: 2,
    },
    bannerImage: {
      // marginLeft: ,
      width: "35%",
      height: "100%",
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    bannerTextContainer: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 40,
      paddingRight: 10,
    },
    bannerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFF",
      textAlign: "left",
    },
    bookNowButton: {
      marginTop: 10,
      backgroundColor: "#FFF",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
    bookNowText: {
      color: "#FF4B3A",
      fontWeight: "600",
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Modal transparent={true} visible={loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4B3A" />
        </View>
      </Modal>

      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        {renderHeader()}

        {/* Promotion Banner */}
        {/* {renderPromoBanner()} */}

        {/* Horizontal Scroll View for Restaurant Banners */}
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bannerList}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() =>
                  navigation.navigate("categories", { category: item.name })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Restaurant Count */}
        <View style={styles.restaurantCount}>
          <Text style={styles.countText}>
            {localRestaurants.length} restaurants around you
          </Text>
          <View style={styles.popularContainer}>
            <Icon name="heart" size={16} />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        </View>

        {/* Restaurant List */}
        {localRestaurants.map((restaurant, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("RestaurantHomePage", { restaurant })
            }
          >
            <RestroCard
              image={restaurant.image[0]}
              discount="20% OFF"
              name={restaurant.restaurantName}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              time={restaurant.time}
              description={restaurant.description}
              restaurantId={restaurant._id}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default RestaurantApp;