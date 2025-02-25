import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({
  icon,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name={icon}
      size={20}
      color="#121212"
      style={{ padding: 5, marginHorizontal: 5 }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});

export default Header;
