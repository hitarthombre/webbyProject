import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Screenwidth = Dimensions.get("window").width;
const Screenheight = Dimensions.get("window").height;

const RestroCard = ({ image, discount, name, cuisine, rating, price,description }:any) => {
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite icon

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <View>
          <Image source={{ uri: image }} style={styles.img} />
          {discount && (
            <View style={styles.Timing}>
              <Text style={styles.TiText}>{discount}</Text>
            </View>
          )}
          <View style={[styles.Timing]}>
            <Text style={styles.TiText}>8:00 AM - 10:00 PM</Text>
          </View>
          <TouchableOpacity
            onPress={toggleFavorite}
            style={styles.favoriteIcon}>
            <MaterialIcons
              name="favorite"
              size={24}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>

          <Text style={styles.overlayText}>
            <Text style={styles.timeText}>20 min : 2 km</Text>
          </Text>

          <View style={styles.contentContainer}>
            <View style={styles.rowBox}>
              <Text style={styles.RestroName}>{name}</Text>
              <View style={styles.ratcontainer}>
                <Text style={styles.ratingText}>{rating}</Text>
                <MaterialIcons name="star" size={24} color="#EAC452" />
              </View>
            </View>
            <Text style={styles.Cousin}>{cuisine}</Text>
            {/* <Text style={styles.Cousin}>{price}</Text> */}

            <View style={styles.rowBox}>
              <Text style={{width:"70%",fontSize:11,color:"gray"}} numberOfLines={2}>{description}</Text>
              <TouchableOpacity style={styles.MenuButton}>
                <Text style={styles.buttonText}>MENU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
  },
  Box: {
    width: "100%",
    maxWidth: 500,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 15,
  },
  img: {
    width: "100%",
    height: Screenheight * 0.2,
    resizeMode: "cover",
  },
  RestroName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    flex: 1,
    marginRight: 10,
    marginTop: -10,
  },
  Cousin: {
    fontSize: 11,
    color: "gray",
    marginTop: -2,
  },
  rowBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratcontainer: {
    flexDirection: "row",
    backgroundColor: "#417C45",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
  },
  ratingText: {
    color: "white",
    marginRight: 5,
  },
  Timing: {
    bottom: "45%",
    position: "absolute",
    left: "4%",
    fontWeight: "600",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom:14
  },
  MenuButton: {
    backgroundColor: "#009999",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  TiText: {
    fontSize: 10,
  },
  overlayText: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.8,
  },
  favoriteIcon: {
    position: "absolute",
    top: "22%",
    left: "100%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    opacity: 0.5,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
    padding: 4,
    color: "white",
  },
  timeText: {
    color: "green",
    fontWeight: "700",
    fontSize: 12,
  },
});

export default RestroCard;
