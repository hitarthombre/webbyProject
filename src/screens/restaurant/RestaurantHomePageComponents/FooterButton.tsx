import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
//   import { useRouter, useLocalSearchParams } from "expo-router";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
//   const route = useRouter();

const FooterButton = ({ title, id, navigation,screen }: any) => {
  // const router = useRouter();

  const handleItemPress = (screen: string) => {
    navigation.navigate(screen);
    // <Text>HEllo</Text>
  };
  return(
  <TouchableOpacity
    style={styles.footerButton}
    onPress={() => {
      console.log(id);
      // handleItemPress(screen);
      // navigation.navigate("Home");
    }}
  >
    <Text style={styles.footerButtonText}>{title}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    borderWidth: 0.3,
    width: "48%",
    height: screenHeight * 0.05,
    borderRadius: 4,
    backgroundColor: "rgb(248, 68, 100)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FooterButton;
