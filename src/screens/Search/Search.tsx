// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import SearchModal from "./SearchModal"; // Import the new SearchModal component
// import API_BASE_URL from "../../../config";

// const Search = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   // Fetch search suggestions
//   useEffect(() => {
//     if (searchText.trim().length === 0) {
//       setSuggestions([]);
//       return;
//     }
//     fetch(`${API_BASE_URL}/api/restaurants/search?term=${searchText}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setSuggestions(data.results || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching search results aha:", error);
//       });
//   }, [searchText]);

//   const handleSuggestionPress = (item:any) => {
//     console.log("Selected:", item); // Replace with navigation logic
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Button to open search modal */}
//         <TouchableOpacity
//           style={styles.searchContainer}
//           onPress={() => setModalVisible(true)}>
//           {/* <Ionicons name="search" size={24} color="#666" /> */}
//           <Text style={styles.searchPlaceholder}>Search ...</Text>
//         </TouchableOpacity>

//         {/* Other components like categories, promotions, etc., go here */}
//       </ScrollView>

//       {/* Search Modal */}
//       <SearchModal
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//         searchText={searchText}
//         setSearchText={setSearchText}
//         suggestions={suggestions}
//         onSuggestionPress={handleSuggestionPress}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#eee",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     margin: 16,
//     height: 40,
//   },
//   searchPlaceholder: {
//     color: "#666",
//     marginLeft: 8,
//     fontSize: 16,
//   },
// });

// export default Search;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import SearchModal from "./SearchModal";
import API_BASE_URL from "../../../config";
import NavigationBar from "../../components/NavigationBar";

// Define types for restaurant data
interface Restaurant {
  _id: string;
  name: string;
  rating: number;
  description: string;
  image: string;
  time: string;
  promoted: boolean;
  cuisine: string;
  address: string;
}

const Search = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
  const [randomRestaurants, setRandomRestaurants] = useState<Restaurant[]>([]);
  const [randomExtraRestaurants, setRandomExtraRestaurants] = useState<
    Restaurant[]
  >([]);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    fetch(`${API_BASE_URL}/api/restaurants/search?term=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchText]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/restaurants/random`)
      .then(async (response) => {
        const text = await response.text();
        console.log("Raw API Response:", text);

        try {
          const data = JSON.parse(text);
          if (data.results) {
            setRandomRestaurants(data.results);
            setRandomExtraRestaurants(shuffleArray(data.results));
          }
        } catch (error) {
          console.error("JSON Parsing Error:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching random restaurants:", error);
      });
  }, []);

  // Improved shuffle function with explicit type
  const shuffleArray = (array: Restaurant[]): Restaurant[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleSuggestionPress = (item: Restaurant) => {
    console.log("Selected:", item);
    // You can navigate or perform other actions here
  };

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantTime}>{item.time}</Text>
          <Text style={styles.restaurantRating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.searchPlaceholder}>Search ...</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        <FlatList
          data={randomRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Discover More</Text>
        <FlatList
          data={randomExtraRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => `extra-${item._id}`}
          scrollEnabled={false}
        />
      </ScrollView>

      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        searchText={searchText}
        setSearchText={setSearchText}
        suggestions={suggestions}
        onSuggestionPress={handleSuggestionPress}
      />

      <NavigationBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    height: 40,
  },
  searchPlaceholder: { color: "#666", marginLeft: 8, fontSize: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  restaurantName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  restaurantDesc: { fontSize: 14, color: "#666", marginTop: 4, flexShrink: 1 },
  restaurantDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  restaurantTime: { fontSize: 14, color: "#555" },
  restaurantRating: { fontSize: 14, fontWeight: "bold", color: "#ff9900" },
});

export default Search;
