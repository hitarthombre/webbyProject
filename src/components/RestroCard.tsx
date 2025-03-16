import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../../config";
import userStore from "../zustand/userStore";

const Screenwidth = Dimensions.get("window").width;
const Screenheight = Dimensions.get("window").height;

const RestroCard = ({
  image,
  discount,
  name,
  cuisine,
  rating,
  description,
  time,
  restaurantId,
  promoted,
}: any) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite icon
  const [restaurant, setRestaurant] = useState({});
  const [userId, setUserId] = useState("");
  const [favoriteRest, setFavoriteRest] = useState([]);
  const { getUser } = userStore();
  const toggleFavorite = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/restaurants/toggleFavorite`,
        {
          restaurantId: restaurantId,
          userId: userId,
        }
      );

      if (response) {
        setFavoriteRest((prevFavorites) =>
          prevFavorites.includes(restaurantId)
            ? prevFavorites.filter((id) => id !== restaurantId)
            : [...prevFavorites, restaurantId]
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const formatTime = () => {
    return `${time.open} - ${time.close}`;
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/restaurants/getOne/${restaurantId}`
        );
        setRestaurant(response.data);
      } catch (error) {
        // console.error("Error fetching restaurant data: ", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const pUser = getUser();
        console.log(pUser);
        const response = await axios.post(`${API_BASE_URL}/api/users/getUser`, {
          _id: pUser._id,
        });
        setUserId(response.data.user._id);
        setFavoriteRest(response.data.user.favoriteRestraunts || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Box}
        onPress={() =>
          navigation.navigate("RestaurantHomePage", { restaurant })
        }
      >
        <Image source={{ uri: image }} style={styles.img} />

        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
          <MaterialIcons
            name="favorite"
            size={24}
            color={favoriteRest.includes(restaurantId) ? "red" : "gray"}
          />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.RestroName}>{name}</Text>
            <View style={styles.ratcontainer}>
              <Text style={styles.ratingText}>{rating}</Text>
              <MaterialIcons name="star" size={16} color="#FFF" />
            </View>
          </View>

          <Text style={styles.Cousin}>{cuisine}</Text>

          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>

          <View style={styles.restaurantFooter}>
            <View style={styles.timeContainer}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.footerTimeText}>{formatTime()}</Text>
            </View>

            {promoted && (
              <View style={styles.promotedTag}>
                <Text style={styles.promotedText}>Promoted</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
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
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    padding: 16,
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor: "#F0F0F0",
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  RestroName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 10,
  },
  Cousin: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  ratcontainer: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  ratingText: {
    color: "#FFF",
    marginRight: 4,
    fontWeight: "600",
  },
  discountTag: {
    position: "absolute",
    bottom: "58%",
    left: "4%",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "500",
  },
  timeTag: {
    position: "absolute",
    bottom: "50%",
    left: "4%",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  favoriteIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  overlayDetails: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeInfo: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 12,
  },
  restaurantFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerTimeText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  promotedTag: {
    backgroundColor: "#FF4B3A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  promotedText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default RestroCard;
