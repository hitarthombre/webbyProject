import { View, Text, SafeAreaView, StatusBar, } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { configureGoogleSignIn } from "./src/utils/authHelpers";
import HomeScreen from "./src/screens/restaurant/HomeScreen";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import * as NavigationBar from 'expo-navigation-bar';
import RegisterRestaurantScreen from "./src/screens/restaurant/RegisterRestaurantScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// import { Immersive } from 'react-native-immersive'
const App = () => {
  useEffect(() => {``
    // SystemNavigationBar.navigationHide();
    configureGoogleSignIn();
    // Clean up immersive mode on component unmount

  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
