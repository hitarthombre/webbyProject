import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { styles } from "../screens/restaurant/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = ({ navigation, user }: any) => {
  const [showFullAddress, setShowFullAddress] = useState(false);

  const toggleAddress = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {/* Address Bar */}
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={toggleAddress}
        >
          <View style={styles.addressLeft}>
            <Ionicons name="location" size={20} color="#E23744" />
            <View style={styles.addressTextContainer}>
              <Text style={styles.address}>Home</Text>
              <Text
                numberOfLines={showFullAddress ? undefined : 1}
                style={styles.addressText}
              >
                {user.address}
              </Text>
            </View>
          </View>
          <View style={styles.addressRight}>
            <Ionicons
              name={showFullAddress ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </View>
        </TouchableOpacity>
        {/* Profile Button */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          {!user.photoUrl && (
            <Ionicons name="person-circle-outline" size={30} color="#666" />
          )}
          {user.photoUrl && (
            <Image
              source={{ uri: user.photoUrl }}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
