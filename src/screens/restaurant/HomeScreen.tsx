import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import RestroCard from "../../components/RestroCard";
import HomeHeader from "../../components/HomeHeader";
import API_BASE_URL from "../../../config";
const RestaurantApp = ({ navigation }: any) => {
  const [data, setData] = useState([
    {
      name: "Sultan Kacchi Biryani",
      cuisine: "Biryani, Desserts, Kacchi",
      rating: "4.2 ★",
      price: "₹250 for one",
      discount: "20% OFF",
      image:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
      time: "20 min : 2 km",
      description:"Trial for restaurant"
    },
  ]); // Initialize state for storing restaurant data

  const [categories, setCategories] = useState([{
    "_id": {
      "$oid": "67bde51e2211272b98932cf6"
    },
    "name": "Pizza",
    "image": "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1740498142/istockphoto-901501348-612x612_vrfhpi.jpg",
    "__v": 0
  }]); // Initialize state for storing categories
  const [loading, setLoading] = useState(true); // Initialize state for managing loading state

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/restaurants/get/1`
      );
      const restaurants = response.data; // Assuming the API response contains an array of restaurants
      // console.log("Restaurant Details:", restaurants);
      return restaurants;
    } catch (error: any) {
      console.error("Error fetching restaurant details:", error.message);
    }
  };

  const fetchCategories = async () => {
    // console.log("API_BASE_URL",API_BASE_URL);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/homepage/getCategories`
      );
      
      const categories = response.data; // Assuming the API response contains an array of categories
      // console.log("/n/nCategories:/n/n", categories);
      return categories;
    } catch (error: any) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const restaurants = await fetchRestaurantDetails();
      if (restaurants) {
        setData(restaurants); // Update state with the fetched data
      }
      const categories = await fetchCategories();
      if (categories) {
        setCategories(categories); // Update state with the fetched categories
      }

      setLoading(false); // Hide loading modal once data is fetched
    };
    getData();
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        {/* Header */}
        <HomeHeader></HomeHeader>
        {/* Promotion Banner */}
        <View style={styles.promotionBanner}>
          <View>
            <Text style={styles.promotionTitle}>Up To 70% OFF</Text>
            <Text style={styles.promotionSubtext}>with free delivery</Text>
            <Text style={styles.promotionHighlight}>no COOKing!</Text>
            <Text>July 3</Text>
          </View>
          <Image
            source={{
              uri: "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg ",
            }}
            style={styles.promotionImage}
          />
        </View>

        <View style={styles.categoriesWrapper}>
          <FlatList 
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide scrollbar
            contentContainerStyle={styles.categoriesContainer} // Apply spacing styles
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Restaurant Count */}
        <View style={styles.restaurantCount}>
          <Text style={styles.countText}>127 restaurants around you</Text>
          <View style={styles.popularContainer}>
            <Icon name="heart" size={16} />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        </View>

        {/* Featured Restaurants */}
        {data.map((restaurant, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate("RestaurantHomePage",{restaurant})} key={index}>
            <RestroCard
              // key={index}
              image={restaurant.image[0]}
              discount={restaurant.discount}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              price={restaurant.price}
              time={restaurant.time}
              description={restaurant.description}

            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationBar navigation={navigation}></NavigationBar>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoriesWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    position: "relative",
    top: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    flex: 1,
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressTextContainer: {
    marginLeft: 8,
  },
  address: {
    fontWeight: "bold",
  },
  addressText: {
    color: "#666",
    maxWidth: 200, // Adjust width as needed
  },
  addressRight: {
    padding: 8,
  },
  profileContainer: {
    padding: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    marginRight: 8,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
  },
  promotionBanner: {
    margin: 16,
    padding: 24,
    backgroundColor: "#fecdd3",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  promotionSubtext: {
    fontSize: 14,
  },
  promotionHighlight: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  promotionImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 26,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  categoryText: {
    fontSize: 12,
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
  restaurantCard: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  discount: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cuisineText: {
    fontSize: 14,
    color: "#666",
  },
  rating: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: "#166534",
    fontSize: 12,
  },
  priceText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default RestaurantApp;
