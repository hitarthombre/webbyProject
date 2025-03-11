import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RegisterRestaurantScreen from "../screens/restaurant/RegisterRestaurantScreen";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";
import Product from "../screens/Product/Product";
import HomeScreen from "../screens/restaurant/HomeScreen";
import FooterButton from "../screens/restaurant/RestaurantHomePageComponents/FooterButton";
import SearchedRestro from "../screens/restaurant/RestaurantHomePage";
import RestaurantBooking from "../screens/restaurant/RestaurantBooking";
import CategoryScreen from "../screens/restaurant/CategoryScreen";
import MenuScreen from "../screens/restaurant/MenuScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
        component={MenuScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Prevents going back to login
      />
      <Stack.Screen
        name="RegisterRestaurant"
        component={RegisterRestaurantScreen}
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
     
      <Stack.Screen
        name="FooterButton"
        component={FooterButton}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantHomePage"
        component={SearchedRestro}
        options={{ headerShown: false , title: "Restaurant" }}
      />
      <Stack.Screen
        name="RestaurantBooking"
        component={RestaurantBooking}
        options={{ headerShown: false, title: "Restaurant Booking" }}
        
      />
      <Stack.Screen
        name="categories"
        component={CategoryScreen}
        options={{ headerShown: false, title: "Restaurant Booking" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
