import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import API_BASE_URL from "../../../config";

const { width: screenWidth } = Dimensions.get("window");

const CategoryScreen = ({ route, navigation }: any) => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { category } = route.params;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        console.log(`Fetching items for category: ${category}`);
        const response = await fetch(
          `${API_BASE_URL}/api/menu/category/${category}`
        );
        const data = await response.json();

        console.log("Fetched category data:", data);

        if (response.ok) {
          setMenuItems(
            data.flatMap((restaurant: any) =>
              restaurant.menu_items.map((item: any) => ({
                ...item,
                restaurant_name: restaurant.restaurant_name,
                restaurant_address: restaurant.restaurant_address,
                restaurant_rating: restaurant.restaurant_rating,
              }))
            )
          );
        } else {
          setError(data.error || "Error fetching category items");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching the category items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={styles.loadingText}>Loading {category} items...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No {category} items available!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <ScrollView contentContainerStyle={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.menuItem}>
            {/* onPress={() => navigation.navigate("ItemDetails", { item })}> */}
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.restaurantName} numberOfLines={1}>
                {item.restaurant_name}
              </Text>
              <Text style={styles.restaurantAddress} numberOfLines={1}>
                {item.restaurant_address}
              </Text>
              <View style={styles.ratingSection}>
                <Text style={styles.restaurantRating}>
                  ⭐ {item.restaurant_rating}
                </Text>
              </View>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.itemPrice}>₹{item.price_inr.toFixed(0)}</Text>
              <Text style={styles.itemType}>{item.isVeg ? "🌱" : "🍗"}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#ff6600",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
    color: "#333",
  },
  menuList: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginVertical: 2,
  },
  restaurantAddress: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffb400",
  },
  priceSection: {
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6600",
  },
  itemType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745",
  },
});

export default CategoryScreen;
