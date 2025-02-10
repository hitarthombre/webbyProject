import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RestaurantPage from "../screens/restaurant/Restaurant";
import RegisterRestaurantScreen from "../screens/restaurant/RegisterRestaurantScreen";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";
import Product from "../screens/Product/Product";
import HomeScreen from "../screens/restaurant/HomeScreen";
import MenuItemsScreen from "../screens/restaurant/menuItemsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="RegisterRestaurant"
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MenuItems"
        component={MenuItemsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{  headerShown: false}} // Prevents going back to login
      />
      <Stack.Screen
        name="RegisterRestaurant"
        component={RegisterRestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantPage"
        component={RestaurantPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
