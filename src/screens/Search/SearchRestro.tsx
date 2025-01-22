import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Keyboard,
  useColorScheme,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Themes for light and dark mode
const themes = {
  light: {
    backgroundColor: "#fff",
    textColor: "#000",
    borderColor: "#ccc",
    placeholderTextColor: "#888",
    iconColor: "red",
  },
  dark: {
    backgroundColor: "#000",
    textColor: "#fff",
    borderColor: "#555",
    placeholderTextColor: "#aaa",
    iconColor: "white",
  },
};

const SearchRestro = () => {
  const colorScheme = useColorScheme(); // Detects 'light' or 'dark'
  const currentTheme = themes[colorScheme === "dark" ? "dark" : "light"];

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Listen for keyboard show/hide events
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(true)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Whenever 'searchText' changes, fetch data
  useEffect(() => {
    if (searchText.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    fetch(`http://192.168.149.104:3000/api/search?term=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.results);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchText]);

  const renderItem = ({ item }:any) => (
    <TouchableOpacity
      onPress={() => {
        alert(
          `You pressed hotel : ${item.name} and its description : ${item.description}`
        );
        // console.log(item.name, item.url);
      }}
      style={[
        styles.suggestionItem,
        {
          backgroundColor: currentTheme.backgroundColor,
          shadowColor: colorScheme === "dark" ? "#fff" : "#000",
          borderBottomColor: currentTheme.borderColor,
        },
      ]}>
      <View>
        <Image source={{ uri: item.url }} style={styles.imageSuggest} />
      </View>
      <View style={{ height: "100%", width: "80%" }}>
        <Text
          style={[styles.suggestionText, { color: currentTheme.textColor }]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.suggestionDesc,
            { color: currentTheme.placeholderTextColor },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.searchBorder,
            { borderColor: currentTheme.borderColor },
          ]}>
          <TextInput
            style={[styles.input, { color: currentTheme.textColor }]}
            placeholder="Lakh Ahiya ..."
            placeholderTextColor={currentTheme.placeholderTextColor}
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons
            name="search"
            size={27}
            style={[styles.searchicon, { color: currentTheme.iconColor }]}
          />
        </View>

        <View
          style={[
            styles.filterBorder,
            { borderColor: currentTheme.borderColor },
          ]}>
          <Text style={[styles.filtter, { color: currentTheme.textColor }]}>
            Filtter
          </Text>
          <MaterialIcons
            name="camera"
            size={27}
            style={[styles.filttericon, { color: currentTheme.iconColor }]}
          />
        </View>
      </View>

      {isKeyboardVisible && searchText.trim().length > 0 && (
        <View
          style={[
            styles.suggestions,
            { backgroundColor: currentTheme.backgroundColor },
          ]}>
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text
                style={[
                  styles.noResults,
                  { color: currentTheme.placeholderTextColor },
                ]}>
                No records found
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
};

export default SearchRestro;

/* ----------------- STYLES ----------------- */
const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.93,
    width: screenWidth,
    position: "absolute",
    gap: 8,
  },
  barContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.6,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    left: "4%",
    width: "85%",
    height: "100%",
    position: "absolute",
    fontSize: 16,
  },
  searchicon: {
    position: "absolute",
    left: "86%",
  },
  filterBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  filttericon: {
    position: "absolute",
    left: "70%",
  },
  filtter: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    left: "10%",
  },
  suggestions: {
    maxHeight: screenHeight * 0.5,
    width: screenWidth * 0.98,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  suggestionItem: {
    width: "100%",
    // textOverflow: "hidden",
    flexDirection: "row",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  suggestionText: {
    // flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  noResults: {
    textAlign: "center",
    marginTop: 5,
  },
  imageSuggest: {
    width: 80,
    height: 80,
    borderRadius: 10,
    // marginLeft: 10,
    // paddingRight: 20,
    backgroundColor: "#ccc",
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  suggestionDesc: {
    marginTop: 5,
    fontSize: 14,
    color: "#888",
    // flex: 1,
    lineHeight: 22,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
  },
});
