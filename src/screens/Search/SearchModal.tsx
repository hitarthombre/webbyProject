import React from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchModal = ({
  modalVisible,
  setModalVisible,
  searchText,
  setSearchText,
  suggestions,
  onSuggestionPress,
}:any) => {
  const renderSuggestionItem = ({ item }:any) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        onSuggestionPress(item);
        setModalVisible(false); // Close modal on selection
      }}>
      <Image source={{ uri: item.image[0] }} style={styles.suggestionImage} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.suggestionName}>{item.restaurantName}</Text>
        <Text style={styles.suggestionDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        setSearchText("");
      }}>
      <SafeAreaView style={styles.modalContainer}>
        {/* Top Bar */}
        <View style={styles.modalTopBar}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Search Restaurants</Text>
          <View style={{ width: 30 }} /> 
        </View>

        {/* Search Input */}
        <View style={styles.modalSearchContainer}>
          <Ionicons name="search" size={24} color="#666" />
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Search for restaurants..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>

        {/* Search Results */}
        <View style={styles.modalResultsContainer}>
          {searchText.trim().length > 0 ? (
            suggestions.length > 0 ? (
              <FlatList
                data={suggestions}
                renderItem={renderSuggestionItem}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text style={styles.noResultsText}>No restaurants found</Text>
            )
          ) : (
            <Text style={styles.noResultsText}>Type something to search</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    height: 40,
  },
  modalSearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  modalResultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  suggestionItem: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  suggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  suggestionDesc: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default SearchModal;