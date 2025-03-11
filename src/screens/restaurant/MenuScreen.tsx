// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Dimensions,
//   SafeAreaView,
//   BackHandler
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get("window");

// const MenuScreen = ({ route, navigation }: any) => {
//   const [menu, setMenu] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { restaurantId } = route.params;

//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await fetch(
//           `http://192.168.1.6:3000/api/menu/restaurant/${restaurantId}`
//         );
//         const data = await response.json();

//         console.log("Fetched menu data:", data); // Debugging API response

//         if (response.ok && data.menu) {
//           setMenu(data.menu);
//         } else {
//           setError(data.error || "Error fetching menu");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("An error occurred while fetching the menu.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuData();
//   }, [restaurantId]);

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       navigation.goBack();
//       return true;
//     });

//     return () => backHandler.remove();
//   }, [navigation]);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text style={styles.loadingText}>Loading menu...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   if (!menu || menu.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>No menu available!</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Menu</Text>
//       <ScrollView contentContainerStyle={styles.menuContainer}>
//         {menu.map((item, index) => (
//           <View key={item._id} style={[styles.menuItem, index % 2 !== 0 ? { marginLeft: 8 } : {}]}>
//             <Image source={{ uri: item.image }} style={styles.itemImage} />
//             <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
//             <Text style={styles.itemInfo}>{item.category} • ₹{item.price_inr.toFixed(0)}</Text>
//             <Text style={styles.itemType}>{item.isVeg ? "🌱" : "🍗"}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 8,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#4CAF50",
//     fontWeight: "bold",
//   },
//   errorText: {
//     fontSize: 14,
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//     textAlign: "center",
//   },
//   menuContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   menuItem: {
//     width: screenWidth * 0.46, // Smaller width for compact layout
//     backgroundColor: "#f9f9f9",
//     borderRadius: 6,
//     padding: 8,
//     marginBottom: 8,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 1.5,
//     elevation: 1,
//   },
//   itemImage: {
//     width: screenWidth * 0.38, // Reduced image size
//     height: screenWidth * 0.38,
//     borderRadius: 6,
//   },
//   itemName: {
//     fontSize: 13,
//     fontWeight: "bold",
//     marginTop: 4,
//     textAlign: "center",
//   },
//   itemInfo: {
//     fontSize: 11,
//     color: "#555",
//     textAlign: "center",
//   },
//   itemType: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#333",
//   },
// });

// export default MenuScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Dimensions,
//   SafeAreaView,
//   BackHandler
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get("window");

// const MenuScreen = ({ route, navigation }: any) => {
//   const [menu, setMenu] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { restaurantId } = route.params;

//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await fetch(
//           `http://192.168.1.6:3000/api/menu/restaurant/${restaurantId}`
//         );
//         const data = await response.json();

//         console.log("Fetched menu data:", data);

//         if (response.ok && data.menu) {
//           setMenu(data.menu);
//         } else {
//           setError(data.error || "Error fetching menu");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("An error occurred while fetching the menu.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuData();
//   }, [restaurantId]);

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       navigation.goBack();
//       return true;
//     });

//     return () => backHandler.remove();
//   }, [navigation]);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text style={styles.loadingText}>Loading menu...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   if (!menu || menu.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>No menu available!</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Menu</Text>
//       <ScrollView contentContainerStyle={styles.menuList}>
//         {menu.map((item) => (
//           <View key={item._id} style={styles.menuItem}>
//             <Image source={{ uri: item.image }} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//               <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
//               <Text style={styles.itemCategory}>
//                 {item.category} · {item.isVeg ? "🌱" : "🍗"}
//               </Text>
//             </View>
//             <Text style={styles.itemPrice}>₹{item.price_inr.toFixed(0)}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#4CAF50",
//     fontWeight: "bold",
//   },
//   errorText: {
//     fontSize: 14,
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//     textAlign: "center",
//   },
//   menuList: {
//     paddingVertical: 5,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     borderRadius: 6,
//     padding: 8,
//     marginVertical: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 1.5,
//     elevation: 1,
//   },
//   itemImage: {
//     width: 50, // Smaller image
//     height: 50,
//     borderRadius: 6,
//     marginRight: 10,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   itemCategory: {
//     fontSize: 12,
//     color: "#666",
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#000",
//     marginLeft: 10,
//   },
// });

// export default MenuScreen;

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
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
      marginLeft: 10,
    },
    categoryBreak: {
      height: 15, // Space between categories
      backgroundColor: "#f1f1f1",
      marginVertical: 10,
      borderRadius: 5,
    },
  });

  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const  restaurantId  = route.params.restaurantId;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/menu/restaurant/${restaurantId}`
        );
        const data = await response.json();

        console.log("Fetched menu data:", data);

        if (response.ok && data.menu) {
          setMenu(data.menu);
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

  if (!menu || menu.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No menu available!</Text>
      </SafeAreaView>
    );
  }

  // **🔹 Step 1: Group menu items by category**
  const categorizedMenu: { [key: string]: any[] } = {};
  menu.forEach((item) => {
    if (!categorizedMenu[item.category]) {
      categorizedMenu[item.category] = [];
    }
    categorizedMenu[item.category].push(item);
  });

  // **🔹 Step 2: Define the category order**
  const categoryOrder = [
    "Pizza",
    "Chicken",
    "Sushi",
    "Burger",
    "Desserts",
    "Dosa",
    "Idli",
    "Pav Bhaji",
    "Momos",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.menuList}>
        {categoryOrder.map((category) => {
          if (!categorizedMenu[category]) return null; // Skip empty categories

          return (
            <View key={category}>
              {/* **🔹 Category Header** */}
              <Text style={styles.categoryHeader}>{category}</Text>

              {/* **🔹 Render Menu Items for this Category** */}
              {categorizedMenu[category].map((item) => (
                <View key={item._id} style={styles.menuItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemCategory}>
                      {item.category} · {item.isVeg ? "🌱" : "🍗"}
                    </Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    ₹{item.price_inr.toFixed(0)}
                  </Text>
                </View>
              ))}

              {/* **🔹 Add a Break Between Categories** */}
              <View style={styles.categoryBreak} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );

};



export default MenuScreen;
