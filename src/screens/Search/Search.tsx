import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchModal from "./SearchModal"; // Import the new SearchModal component
import API_BASE_URL from "../../../config";

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch search suggestions
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
        console.error("Error fetching search results aha:", error);
      });
  }, [searchText]);

  const handleSuggestionPress = (item:any) => {
    console.log("Selected:", item); // Replace with navigation logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Button to open search modal */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => setModalVisible(true)}>
          {/* <Ionicons name="search" size={24} color="#666" /> */}
          <Text style={styles.searchPlaceholder}>Search ...</Text>
        </TouchableOpacity>

        {/* Other components like categories, promotions, etc., go here */}
      </ScrollView>

      {/* Search Modal */}
      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        searchText={searchText}
        setSearchText={setSearchText}
        suggestions={suggestions}
        onSuggestionPress={handleSuggestionPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    height: 40,
  },
  searchPlaceholder: {
    color: "#666",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Search;