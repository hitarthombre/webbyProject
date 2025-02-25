import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import React from "react";
  import Icon from "@expo/vector-icons/MaterialIcons";
  
  const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
  
  const Rating = ({ rating }:any) => (
    <View style={styles.ratingBar}>
      <View style={styles.ratingLeft}>
        <Icon name="star" size={22} color="rgb(248, 68, 100)" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <TouchableOpacity style={styles.rateButton}>
        <Text style={styles.rateButtonText}>Rate Now</Text>
      </TouchableOpacity>
    </View>
  );
  
  const styles = StyleSheet.create({
    ratingBar: {
      height: screenHeight * 0.06,
      width: screenWidth * 0.98,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      backgroundColor: "#f2f5fa",
    },
    ratingLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 10,
    },
    ratingText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    rateButton: {
      backgroundColor: "#fff",
      padding: 5,
      borderRadius: 8,
      borderColor: "rgb(248, 68, 100)",
      borderWidth: 0.5,
    },
    rateButtonText: {
      fontSize: 12,
      fontWeight: "500",
      color: "rgb(248, 68, 100)",
    },
  });
  
  export default Rating;
  