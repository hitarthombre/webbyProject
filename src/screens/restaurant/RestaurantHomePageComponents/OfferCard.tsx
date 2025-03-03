import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const OfferCard = ({
  name,
  description,
  time,
  distance,
  offer,
  imageUrl,
}: any) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["#F4D793", "#8E1616"]} style={styles.OfferCard}>
        
          <View style={styles.Container}>
            <View style={styles.Textcontainer}>
              <Text style={styles.Restroname}>{name}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.imgContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={[
                  styles.image,
                  { transform: [{ rotateZ: "320deg" }, { rotateY: "15deg" }] },
                ]}
              />
            </View>
            <Text style={styles.overlayText}>
              <Text style={styles.timeText}>
                {time} : {distance}
              </Text>
            </Text>
            <Text style={styles.Offer}>
              <Text style={styles.OfferText}>{offer}</Text>
            </Text>
          
        </View>
      </LinearGradient>
    </View>
   
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  OfferCard: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.13,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFE5AD",
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    overflow: "hidden",
  },
  Textcontainer: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.098,
    padding: 1,
  },
  Restroname: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FBF5E5",
  },
  description: {
    color: "#FFF",
    fontSize: 10,
  },
  imgContainer: {
    width: screenWidth * 0.2,
  },
  image: {
    width: screenWidth * 0.33,
    height: screenHeight * 0.33,
    resizeMode: "contain",
    overflow: "hidden",
  },
  timeText: {
    color: "green",
    fontWeight: "700",
    fontSize: 10,
  },
  overlayText: {
    height: "50%",
    width: screenWidth * 0.35,
    position: "absolute",
    top: 60,
    left: 10,
    marginTop: 2,

    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.8,
  },
  Offer: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.12,
    position: "absolute",
    left: "62%",
    padding: 4,
    paddingVertical: 15,
    bottom: "60%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.9,
    backgroundColor: "#fff",
  },
  OfferText: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OfferCard;
