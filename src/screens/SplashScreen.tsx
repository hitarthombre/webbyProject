import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const text = "Where to eat";
  const [displayText, setDisplayText] = React.useState("");

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Text typing animation
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    // Delayed navigation
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }],
            },
          ]}
        >
          <Image
            source={require("../../assets/images/auth_icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.webbyText}>WEBBY</Text>
          <Text style={styles.typingText}>{displayText}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDE5B1",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: width * 0.7,
    height: width * 0.7,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  typingText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "300",
    letterSpacing: 1,
    marginBottom: 10,
  },
  webbyText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 2,
    // textShadowColor: "rgba(255, 75, 58, 0.2)",
    // textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default SplashScreen;
