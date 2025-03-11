import React, { useEffect, useState } from "react"; 
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  ActivityIndicator, 
  Modal, 
  FlatList 
} from "react-native"; 
import Icon from "react-native-vector-icons/Feather"; 
import Ionicons from "react-native-vector-icons/Ionicons"; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios"; 
import NavigationBar from "../../components/NavigationBar"; 
import RestroCard from "../../components/RestroCard"; 
import API_BASE_URL from "../../../config"; 
import userStore from "../../zustand/userStore"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RestaurantApp = ({ navigation }:any) => { 
  
  const insets = useSafeAreaInsets();
  const { getUser } = userStore(); 
  const [user, setUser] = useState<any>();

  const [data, setData] = useState([ 
    { 
      _id: { 
        $oid: "67cd8d793d2bb9757e6fb62b", 
      }, 
      restaurantName: "bhai bhai", 
      ownerName: "Vasu Navadiya", 
      email: "v@gmail.com", 
      phone: "1234567890", 
      password: "$2b$10$S1UZNd10Qe8FPs58/4HJL.gopskEWZKB.CK3/4fkQ60YWZNTCb62S", 
      location: { 
        shopNo: "12", 
        floorNo: "3", 
        area: "Mota Varachha", 
        city: "surat", 
      }, 
      time: { 
        open: "9 am", 
        close: "8 pm", 
      }, 
      cuisine: "Gujrati,Kathyavadi,Panjabi,Chinese", 
      createdAt: { 
        $date: "2025-03-09T12:45:46.004Z", 
      }, 
      __v: 0, 
      image: [ 
        "https://images.unsplash.com/photo-1483833761820-0509d3217039?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D", 
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D", 
        "https://images.unsplash.com/photo-1497644083578-611b798c60f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D", 
        "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D", 
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D", 
      ], 
      rating: "4.5", 
      description: "Bhai Bhai is a family-friendly restaurant offering authentic Gujarati, Kathiyawadi, Punjabi, and Chinese cuisines in the heart of Surat.", 
      promoted: true, 
    }, 
  ]); 

  const [categories, setCategories] = useState([ 
    { 
      _id: { 
        $oid: "67bde51e2211272b98932cf6", 
      }, 
      name: "Pizza", 
      image: "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1740498142/istockphoto-901501348-612x612_vrfhpi.jpg", 
      __v: 0, 
    }, 
  ]); 
  
  const [loading, setLoading] = useState(true); 

  const fetchRestaurantDetails = async () => { 
    try { 
      const response = await axios.get(`${API_BASE_URL}/api/restaurants/get/1`); 
      const restaurants = response.data;
      return restaurants; 
    } catch (error) { 
      console.error("Error fetching restaurant details:", error.message); 
    } 
  };

  const fetchCategories = async () => { 
    try { 
      const response = await axios.get(`${API_BASE_URL}/api/homepage/getCategories`);
      const categories = response.data;
      return categories; 
    } catch (error) { 
      console.error("Error fetching categories:", error.message); 
    } 
  };

  const fetchUser = async () => { 
    const pUser = getUser(); 
    const res = await axios.post(`${API_BASE_URL}/api/users/getUser`, { 
      email: pUser.email, 
    }); 
    res && setUser(res.data.user); 
  };

  useEffect(() => { 
    const getData = async () => { 
      const restaurants = await fetchRestaurantDetails(); 
      if (restaurants) { 
        setData(restaurants);
      } 
      const categories = await fetchCategories(); 
      if (categories) { 
        setCategories(categories);
      } 
      fetchUser(); 
      setLoading(false);
    }; 
    getData(); 
  }, []);

  // Get user address from the user state
  const getUserAddress = () => {
    if (user && user.address) {
      return `${user.address}`;
    }
    return "Set your address";
  };

  // Render the new header with just the address
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color="#FF4B3A" />
        <View>
          <Text style={styles.locationTitle}>Delivery to</Text>
          <Text style={styles.locationText}>{getUserAddress()}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.profileContainer}>
        <Image 
          source={{ 
            uri: user.profileImage || "https://via.placeholder.com/150" 
          }} 
          style={styles.profileImage} 
        />
      </TouchableOpacity> */}
    </View>
  );

  // Render the new promotion banner with LinearGradient
  const renderPromoBanner = () => (
    <LinearGradient
      colors={['#FF4B3A', '#FF8C8A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.promoBanner}
    >
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>70% OFF</Text>
        <Text style={styles.promoSubtitle}>Special Offer</Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <Image 
        source={{ 
          uri: "https://res.cloudinary.com/webbybyweber/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734847416/cld-sample-4.jpg"
        }} 
        style={styles.promoImage} 
      />
    </LinearGradient>
  );

  // Define the styles inside the component so it has access to insets
  const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      backgroundColor: "#F8F8F8", 
      paddingTop: insets.top
    },
    // New Header Styles
    header: { 
      padding: 16, 
      backgroundColor: "#FFF",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    locationTitle: { 
      fontSize: 12, 
      color: '#666', 
      marginLeft: 8, 
    },
    locationText: { 
      fontSize: 14, 
      fontWeight: '600', 
      marginLeft: 8, 
    },
    profileContainer: { 
      padding: 8, 
    },
    profileImage: { 
      width: 35, 
      height: 35, 
      borderRadius: 18, 
    },
    // New Promo Banner Styles
    promoBanner: { 
      margin: 16, 
      borderRadius: 16, 
      padding: 16, 
      flexDirection: 'row', 
      alignItems: 'center', 
      overflow: 'hidden', 
    },
    promoContent: { 
      flex: 1, 
    },
    promoTitle: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      color: '#FFF', 
      marginBottom: 4, 
    },
    promoSubtitle: { 
      fontSize: 16, 
      color: '#FFF', 
      marginBottom: 12, 
    },
    promoButton: { 
      backgroundColor: '#FFF', 
      paddingHorizontal: 16, 
      paddingVertical: 8, 
      borderRadius: 8, 
      alignSelf: 'flex-start', 
    },
    promoButtonText: { 
      color: '#FF4B3A', 
      fontWeight: '600', 
    },
    promoImage: { 
      width: 100, 
      height: 100, 
      borderRadius: 50, 
    },
    // New Categories Styles
    categoriesSection: { 
      marginVertical: 16, 
    },
    sectionTitle: { 
      fontSize: 18, 
      fontWeight: '600', 
      marginLeft: 16, 
      marginBottom: 12, 
    },
    categoriesList: { 
      paddingHorizontal: 16, 
    },
    categoryCard: { 
      marginRight: 16, 
      alignItems: 'center', 
    },
    categoryImage: { 
      width: 80, 
      height: 80, 
      borderRadius: 40, 
      marginBottom: 8, 
      backgroundColor: "#fff", 
      elevation: 10, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.5, 
      shadowRadius: 5, 
    },
    categoryName: { 
      fontSize: 14, 
      fontWeight: '500', 
    },
    // Restaurant Count Section
    restaurantCount: { 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: 16, 
    },
    popularContainer: { 
      flexDirection: "row", 
      alignItems: "center", 
      gap: 4, 
    },
    countText: { 
      fontSize: 14, 
      fontWeight: "500", 
    },
    popularText: { 
      fontSize: 14, 
    },
    // Loading Container
    loadingContainer: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
    }, 
  });

  return ( 
    <SafeAreaView style={styles.container}> 
      <Modal transparent={true} visible={loading}> 
        <View style={styles.loadingContainer}> 
          <ActivityIndicator size="large" color="#FF4B3A" /> 
        </View> 
      </Modal> 
      
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}> 
        {/* New Header */}
        {renderHeader()}
        
        {/* New Promotion Banner */}
        {renderPromoBanner()}

        {/* Categories Section with updated styling */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => navigation.navigate("categories", { category: item.name })}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Restaurant Count */}
        <View style={styles.restaurantCount}>
          <Text style={styles.countText}>{data.length} restaurants around you</Text>
          <View style={styles.popularContainer}>
            <Icon name="heart" size={16} />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        </View>

        {/* Restaurant Cards - Keeping Original */}
        {data.map((restaurant, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantHomePage", { restaurant })
            }
            key={index}
          >
            <RestroCard
              image={restaurant.image[0]}
              discount="20 % OFF"
              name={restaurant.restaurantName}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              time={restaurant.time}
              description={restaurant.description}
              restaurantId={restaurant._id}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationBar navigation={navigation}></NavigationBar>
    </SafeAreaView>
  ); 
};

export default RestaurantApp;