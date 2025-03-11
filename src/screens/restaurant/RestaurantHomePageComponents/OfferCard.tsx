import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const OfferCard = ({
  name,
  description,
  time,
  distance,
  offer,
  imageUrl,
  onPress,
}:any) => {
  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>{offer} OFF</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.descriptionText} numberOfLines={2}>{description}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: screenWidth * 0.7,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    marginRight: 16,
  },
  imageContainer: {
    height: screenHeight * 0.12,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  offerBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF4B3A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offerText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
  },
  contentContainer: {
    padding: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    lineHeight: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  }
});

export default OfferCard;