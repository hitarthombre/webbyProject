import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const RegisterRestaurantScreen = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    shopNo: "",
    floorNo: "",
    area: "",
    city: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!restaurantName.trim()) {
      setError("Input is required!");
    } else if (!fullName.trim()) {
      setError("Input is required!");
    } else if (!email.trim()) {
      setError("Input is required!");
    } else if (!phone.trim()) {
      setError("Input is required!");
    } else {
      setError(""); // Clear error if input is valid
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Restaurant Information</Text>
      <View style={styles.maindivider} />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.section}>
            <View>
              <Text style={styles.sectionTitle}>Restaurant Name</Text>
              <Text style={styles.sectionSubtitle}>
                Customers will see this name on Webby
              </Text>

              <View style={styles.divider} />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <TextInput
                  value={restaurantName}
                  onChangeText={(text) => setRestaurantName(text)}
                  placeholder="Restaurant name*"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <View style={[styles.section]}>
            <View>
              <Text style={styles.sectionTitle}>Owner details</Text>
              <Text style={styles.sectionSubtitle}>
                Webby will use these details for all business communications and
                updates
              </Text>

              <View style={styles.divider} />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Full name*"
                  style={styles.input}
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="Email*"
                  style={styles.input}
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="Phone number*"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <View style={[styles.section]}>
            <View>
              <Text style={styles.sectionTitle}>
                Add your restaurants's location
              </Text>

              <View style={styles.divider} />

              <View style={styles.mapContainer}>
                <View style={styles.mapWrapper}>
                  <View style={styles.map}></View>
                  <View style={styles.mapTextContainer}>
                    <Text style={styles.mapTitle}>Alkapuri</Text>
                    <Text style={styles.mapSubtitle}>vadodara, Gujarat</Text>
                  </View>
                </View>

                <View style={styles.addressInputsContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={address.shopNo}
                      onChangeText={(text) =>
                        setAddress({ ...address, shopNo: text })
                      }
                      keyboardType="phone-pad"
                      placeholder="Shop no / Building no"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={address.floorNo}
                      onChangeText={(text) =>
                        setAddress({ ...address, floorNo: text })
                      }
                      keyboardType="phone-pad"
                      placeholder="Floor / tower no"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={address.area}
                      onChangeText={(text) =>
                        setAddress({ ...address, area: text })
                      }
                      keyboardType="phone-pad"
                      placeholder="Area"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={address.city}
                      onChangeText={(text) =>
                        setAddress({ ...address, city: text })
                      }
                      keyboardType="phone-pad"
                      placeholder="City"
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={validateForm}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  headerText: {
    marginBottom: 24,
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    display: "flex",
    gap: 16,
  },
  section: {
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 8,
  },
  sectionTitle: {
    marginHorizontal: 16,
    fontWeight: "600",
  },
  sectionSubtitle: {
    marginHorizontal: 16,
    fontWeight: "300",
    color: "#9CA3AF",
    fontSize: 12,
  },
  divider: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    height: 1,
    marginTop: 24,
  },
  inputContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "white",
  },
  input: {
    fontSize: 14,
  },
  marginTop: {
    marginTop: 24,
  },
  marginVertical: {
    marginVertical: 24,
    // marginTop: 24,
  },
  mapContainer: {
    padding: 16,
  },
  mapWrapper: {
    marginHorizontal: 8,
  },
  map: {
    height: 220,
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  mapTextContainer: {
    borderWidth: 1,
    borderColor: "#E0E7FF",
    padding: 16,
    shadowColor: "#9CA3AF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    backgroundColor: "white",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  mapTitle: {
    fontWeight: "bold",
    marginVertical: 4,
  },
  mapSubtitle: {
    color: "#6B7280",
    fontSize: 14,
  },
  addressInputsContainer: {
    marginTop: 16,
    gap: 1,
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 16,
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  maindivider: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    height: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});

export default RegisterRestaurantScreen;
