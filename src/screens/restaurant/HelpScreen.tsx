import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HelpScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>Frequently Asked Questions</Text>

        <View style={styles.faqContainer}>
          <Text style={styles.question}>
            1. How do I book a seat at a restaurant?
          </Text>
          <Text style={styles.answer}>
            To book a seat, navigate to the restaurant's page, select your
            preferred date and time, and click on the "Book Now" button.
          </Text>

          <Text style={styles.question}>
            2. How can I view available restaurants?
          </Text>
          <Text style={styles.answer}>
            You can view available restaurants by navigating to the home screen,
            where you will see a list of restaurants. You can filter by cuisine
            or location.
          </Text>

          <Text style={styles.question}>
            3. How can I contact customer support?
          </Text>
          <Text style={styles.answer}>
            You can contact our customer support via email at
            webbybypolytut@gmail.com.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL("mailto:webbybypolytut@gmail.com")}
        >
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  faqContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: "#FF4B3A",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default HelpScreen;
