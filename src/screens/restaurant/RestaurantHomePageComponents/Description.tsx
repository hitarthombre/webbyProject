import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const Description = ({ name, location, description, avgCost,cuisine } :any) => {
  const [expanded, setExpanded] = React.useState(false);

  //   const fullDescription = `Experience luxury dining at its finest with panoramic city views. Our restaurant offers a perfect blend of traditional and modern cuisine, crafted by award-winning chefs. `;
  const fullDescription = description;
  // console.log("Data : ", description);
  console.log("Props Received:", {
    name,
    location,
    description,
    avgCost,
    cuisine
  });

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(" ", maxLength));
    // console.log(fullDescription);
  };

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.hotelName}>{name}</Text>

      <View style={styles.locationRow}>
        <Icon name="location-on" size={18} color="#666" />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      <View style={styles.typeRow}>
        <View style={styles.cuisineContainer}>
          <Icon name="restaurant" size={16} color="#666" />
          <Text style={styles.cuisineText}>{cuisine}</Text>
        </View>
        <View style={styles.costContainer}>
          <Icon name="payment" size={16} color="#666" />
          <Text style={styles.costText}>{avgCost}</Text>
        </View>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          {expanded ? (
            fullDescription
          ) : (
            <>
              {truncateText(fullDescription, 100)}
              <Text>... </Text>
              <Text
                onPress={() => setExpanded(true)}
                style={styles.readMoreText}>
                more
              </Text>
            </>
          )}
          {expanded && (
            <Text
              onPress={() => setExpanded(false)}
              style={styles.readMoreText}>
              {" "}
              less
            </Text>
          )}
        </Text>
      </View>

      <View style={styles.facilitiesRow}>
        {[
          { icon: "wifi", label: "Free WiFi" },
          { icon: "local-parking", label: "Parking" },
          { icon: "ac-unit", label: "AC" },
          { icon: "smoke-free", label: "No Smoking" },
        ].map((facility, index) => (
          <View key={index} style={styles.facilityItem}>
            <Icon
              name={facility.icon as keyof typeof MaterialIcons.glyphMap}
              size={16}
              color="#666"
            />
            <Text style={styles.facilityText}>{facility.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    width: screenWidth * 0.98,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginTop: 1,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cuisineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cuisineText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  costText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  facilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  descriptionBox: {
    // marginVertical: 12,
    marginBottom: 8,
  },
  readMoreText: {
    color: "rgb(248, 68, 100)",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Description;
