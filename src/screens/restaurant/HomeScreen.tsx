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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import RestroCard from "../../components/RestroCard";
const RestaurantApp = () => {
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
    },
  ]); // Initialize state for storing restaurant data

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(
        "https://webby-rl6u.onrender.com/api/restaurants/get"
      );
      const restaurants = response.data; // Assuming the API response contains an array of restaurants
      console.log("Restaurant Details:", restaurants);
      return restaurants;
    } catch (error: any) {
      console.error("Error fetching restaurant details:", error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const restaurants = await fetchRestaurantDetails();
      if (restaurants) {
        setData(restaurants); // Update state with the fetched data
      }
    };
    getData();
  }, []); // Empty dependency array ensures it runs only once on component mount

  const categories = [
    {
      name: "Healthy",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg ",
    },
    {
      name: "Home Style",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg ",
    },
    {
      name: "Pizza",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg ",
    },
    {
      name: "Chicken",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg ",
    },
  ];

  const featuredRestaurants = [
    {
      name: "Sultan Kacchi Biryani",
      cuisine: "Biryani, Desserts, Kacchi",
      rating: "4.2 ★",
      price: "₹250 for one",
      discount: "20% OFF",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
    {
      name: "Spicy Grill",
      cuisine: "Grill, BBQ, Fast Food",
      rating: "4.5 ★",
      price: "₹300 for one",
      discount: "15% OFF",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
    {
      name: "Veggie Delight",
      cuisine: "Vegetarian, Salads, Healthy",
      rating: "4.0 ★",
      price: "₹200 for one",
      discount: "10% OFF",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
  ];

  const newCategories = [
    {
      name: "Sushi",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
    {
      name: "Burgers",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
    {
      name: "Desserts",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
    {
      name: "cake",
      imageUrl:
        "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {/* Address Bar */}
            <TouchableOpacity style={styles.addressContainer}>
              <View style={styles.addressLeft}>
                <Ionicons name="location" size={20} color="#E23744" />
                <View style={styles.addressTextContainer}>
                  <Text style={styles.address}>Home</Text>
                  <Text numberOfLines={1} style={styles.addressText}>
                    123 Main Street, New York, NY 10001
                  </Text>
                </View>
              </View>
              <View style={styles.addressRight}>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </View>
            </TouchableOpacity>
            {/* Profile Button */}
            <TouchableOpacity style={styles.profileContainer}>
              <Ionicons name="person-circle-outline" size={30} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Search and Filter Container */}
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={24} color="#666" />
              <TextInput style={styles.searchInput} placeholder="Search ..." />
            </View>
            <TouchableOpacity style={styles.filterContainer}>
              <Ionicons name="options-outline" size={24} color="#E23744" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <View key={category.name} style={styles.categoryItem}>
              <Image
                source={{ uri: category.imageUrl }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </View>

        {/* New Categories */}
        <View style={styles.categoriesContainer}>
          {newCategories.map((category) => (
            <View key={category.name} style={styles.categoryItem}>
              <Image
                source={{ uri: category.imageUrl }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
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
  <RestroCard 
    key={index}
    image={restaurant.image}
    discount={restaurant.discount}
    name={restaurant.name}
    cuisine={restaurant.cuisine}
    rating={restaurant.rating}
    price={restaurant.price}
    time={restaurant.time}
  />
))}

      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationBar></NavigationBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    position:'relative',
    top:0
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
    justifyContent: "space-between",
    marginBottom: 16,
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
});

export default RestaurantApp;
