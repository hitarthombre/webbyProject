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
  BackHandler,
} from "react-native";
import API_BASE_URL from "../../../config";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: screenWidth } = Dimensions.get("window");

const MenuScreen = ({ route, navigation }: any) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingTop: insets.top,
      paddingBottom: insets.bottom + 10, // Add bottom padding to prevent navigation overlap
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 14,
      color: "#4CAF50",
      fontWeight: "bold",
    },
    errorText: {
      fontSize: 14,
      color: "red",
      textAlign: "center",
      marginTop: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 8,
      textAlign: "center",
    },
    menuList: {
      paddingVertical: 5,
    },
    categoryHeader: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      textTransform: 'capitalize',
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      borderRadius: 6,
      padding: 8,
      marginVertical: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 1.5,
      elevation: 1,
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 6,
      marginRight: 10,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
    itemCategory: {
      fontSize: 12,
      color: "#666",
      textTransform: 'capitalize',
    },
    itemDescription: {
      fontSize: 11,
      color: "#888",
      marginTop: 2,
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
      marginLeft: 10,
    },
    categoryBreak: {
      height: 15,
      backgroundColor: "#f1f1f1",
      marginVertical: 10,
      borderRadius: 5,
    },
  });

  const [menuData, setMenuData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { restaurantId } = route.params;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/menu/restaurant/${restaurantId}`
        );
        const data = await response.json();

        console.log("Fetched menu data:", data);

        if (response.ok && data) {
          setMenuData(data);
        } else {
          setError(data.error || "Error fetching menu");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching the menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [restaurantId]);

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
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading menu...</Text>
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

  if (!menuData || !menuData.menu || menuData.menu.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No menu available!</Text>
      </SafeAreaView>
    );
  }

  // Group menu items by category
  const categorizedMenu: { [key: string]: any[] } = {};
  menuData.menu.forEach((item: any) => {
    if (!categorizedMenu[item.category]) {
      categorizedMenu[item.category] = [];
    }
    categorizedMenu[item.category].push(item);
  });

  // Get all categories from the data
  const categoryList = Object.keys(categorizedMenu);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      >
        {categoryList.map((category) => (
          <View key={category}>
            <Text style={styles.categoryHeader}>{category}</Text>
            {categorizedMenu[category].map((item) => (
              <View key={item._id} style={styles.menuItem}>
                <Image
                  source={{ uri: item.imageUrl }} // Changed from item.image to item.imageUrl
                  style={styles.itemImage}
                />  
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemCategory}>
                    {item.category} · {item.isVeg ? "🌱" : "🍗"}
                  </Text>
                  {item.description && (
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemPrice}>
                  ₹{item.price}
                </Text>
              </View>
            ))}
            <View style={styles.categoryBreak} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;