import React from 'react';
import { View, StyleSheet, Linking, Dimensions, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterRestauranrButton() {
  const handleRedirect = () => {
    Linking.openURL('https://webby-puce.vercel.app/');
  };
  
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        style={({pressed}) => [
          styles.redirectButton,
          pressed && styles.buttonPressed
        ]}
        onPress={handleRedirect}>
        <LinearGradient
          colors={['#FF512F', '#F09819']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Add your Restaurant</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 24, // This matches the ml-6 mr-6 (6 units × 4 = 24)
    marginBottom: 13,
  },
  redirectButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});