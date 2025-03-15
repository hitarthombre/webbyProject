import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

const CustomGoogleSigninButton = ({ colors, handleGoogleSignIn, isInProgress }:any) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { borderColor: colors.primary },
        isInProgress && styles.disabled
      ]}
      onPress={handleGoogleSignIn}
      disabled={isInProgress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/google_icon.png')}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'white',
    marginVertical: 10,
    width: '87%',
    // marginHorizontal:160,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  disabled: {
    opacity: 0.7,
  }
});

export default CustomGoogleSigninButton;
