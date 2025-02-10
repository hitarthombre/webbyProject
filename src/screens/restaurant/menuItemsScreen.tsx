// types.ts
interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  labels: string[];
}

interface RestaurantData {
  name: string;
  address: string;
  images: string[];
}

interface RouteParams {
  restaurantData: RestaurantData;
}

// MenuItemsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const PRESET_CUISINE_LABELS: string[] = [
  "Indian",
  "Italian",
  "Chinese",
  "Punjabi",
  "Continental",
];


const MenuItemsScreen = ({ route }:any) => {
  //   const { restaurantData } = route.params;
  const [menuItem, setMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    image: "",
    labels: [],
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [customLabel, setCustomLabel] = useState<string>("");
  const [allLabels, setAllLabels] = useState<string[]>(PRESET_CUISINE_LABELS);

  const pickImage = async (): Promise<void> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMenuItem((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  const toggleLabel = (label: string): void => {
    setMenuItem((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleAddCustomLabel = (): void => {
    if (!customLabel.trim()) {
      Alert.alert("Error", "Please enter a custom label");
      return;
    }

    const normalizedLabel = customLabel.trim();

    if (allLabels.includes(normalizedLabel)) {
      Alert.alert("Error", "This label already exists");
      return;
    }

    setAllLabels((prev) => [...prev, normalizedLabel]);
    setMenuItem((prev) => ({
      ...prev,
      labels: [...prev.labels, normalizedLabel],
    }));
    setCustomLabel("");
  };

  const handleAddMenuItem = (): void => {
    if (
      !menuItem.name.trim() ||
      !menuItem.description.trim() ||
      !menuItem.image
    ) {
      Alert.alert(
        "Error",
        "Please fill in all required fields and upload an image"
      );
      return;
    }

    if (menuItem.labels.length === 0) {
      Alert.alert("Error", "Please select at least one cuisine type");
      return;
    }

    setMenuItems((prev) => [...prev, { ...menuItem, id: Date.now() }]);
    setMenuItem({
      name: "",
      description: "",
      image: "",
      labels: [],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <Text style={styles.title}>Add Menu Items</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter item name"
            value={menuItem.name}
            onChangeText={(text) =>
              setMenuItem((prev) => ({ ...prev, name: text }))
            }
          />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter item description"
            value={menuItem.description}
            onChangeText={(text) =>
              setMenuItem((prev) => ({ ...prev, description: text }))
            }
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Item Image *</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>

          {menuItem.image && (
            <Image
              source={{ uri: menuItem.image }}
              style={styles.uploadedImage}
            />
          )}

          <Text style={styles.label}>Cuisine Type *</Text>
          <View style={styles.labelsContainer}>
            {allLabels.map((label) => (
              <TouchableOpacity
                key={label}
                style={[
                  styles.labelButton,
                  menuItem.labels.includes(label) && styles.labelButtonSelected,
                ]}
                onPress={() => toggleLabel(label)}
              >
                <Text
                  style={[
                    styles.labelButtonText,
                    menuItem.labels.includes(label) &&
                      styles.labelButtonTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.customLabelContainer}>
            <TextInput
              style={[styles.input, styles.customLabelInput]}
              placeholder="Add custom label"
              value={customLabel}
              onChangeText={setCustomLabel}
            />
            <TouchableOpacity
              style={styles.customLabelButton}
              onPress={handleAddCustomLabel}
            >
              <Text style={styles.customLabelButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMenuItem}
          >
            <Text style={styles.addButtonText}>Add Menu Item</Text>
          </TouchableOpacity>
        </View>

        {menuItems.length > 0 && (
          <View style={styles.menuListContainer}>
            <Text style={styles.menuListTitle}>Added Menu Items:</Text>
            {menuItems.map((item) => (
              <View key={item.id} style={styles.menuItemCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                />
                <View style={styles.menuItemDetails}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.menuItemLabels}>
                    {item.labels.map((label) => (
                      <Text key={label} style={styles.menuItemLabel}>
                        {label}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#333",
  },
  uploadedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  labelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  labelButtonSelected: {
    backgroundColor: "#007AFF",
  },
  labelButtonText: {
    color: "#333",
  },
  labelButtonTextSelected: {
    color: "#fff",
  },
  customLabelContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  customLabelInput: {
    flex: 1,
    marginBottom: 0,
  },
  customLabelButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  customLabelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  menuListContainer: {
    padding: 20,
  },
  menuListTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  menuItemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  menuItemLabels: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  menuItemLabel: {
    fontSize: 12,
    color: "#007AFF",
    backgroundColor: "#e6f2ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default MenuItemsScreen;
