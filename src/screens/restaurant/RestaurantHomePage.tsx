import React, { useEffect, useState } from "react";
// import { useRouter, useLocalSearchParams } from "expo-router";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// imports of components
import Header from "./RestaurantHomePageComponents/Header";
import Rating from "./RestaurantHomePageComponents/Rating";
import ImageCarousel from "./RestaurantHomePageComponents/ImageCarousel";
import Description from "./RestaurantHomePageComponents/Description";
import FooterButton from "./RestaurantHomePageComponents/FooterButton";
import OfferCard from "./RestaurantHomePageComponents/OfferCard";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

// const OfferCard = () => <View style={styles.offerCard} />;

const SearchedRestro = () => {
  // const { id } = useLocalSearchParams(); // Get restaurant ID from search params
  interface Restro {
    id: number;
    name: string;
    offer: string;
    description: string;
    time: string;
    far: string;
    location: string;
    avgCost: string;
    rating: string;
    image: {
      [key: string]: string;
    };
  }

  const [restro, setRestro] = useState<Restro>({
    id: 1001,
    name: "A1 Steakhouse",
    offer: "10%",
    description:
      "A1 Steakhouse is a restaurant that serves high-quality steaks and other American classics.",
    time: "20 min",
    far: "2 km",
    location: "Chowkhandi",
    avgCost: "Rs: 2000 for four",
    rating: "6.5/10",
    image: {
      url1: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      url2: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      url3: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      url4: "https://plus.unsplash.com/premium_photo-1661433201283-fcb240e88ad4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      url5: "https://images.unsplash.com/photo-1497644083578-611b798c60f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
  }); // State to store restaurant details
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // Error state
  // const router = useRouter();

  // useEffect(() => {
  //   // const fetchRestroData = async () => {
  //   //   try {
  //   //     const response = await fetch(
  //   //       // `http://localhost:3000/api/restro/${id}`
  //   //       // `http://192.168.1.5:3000/api/restro/${id}`
  //   //       `http://192.168.0.177:3000/api/restro/${id}`
  //   //     );
  //   //     const data = await response.json();
  //   //     if (response.ok) {
  //   //       console.log("Fetched Data:", data); // Print the fetched data in the console
  //   //       setRestro(data.restaurant); // Set restaurant data
  //   //     } else {
  //   //       setError(data.error || "Error fetching data");
  //   //     }
  //   //   } catch (err) {
  //   //     console.error("Fetch Error:", err); // Log any fetch errors
  //   //     setError("An error occurred while fetching data.");
  //   //   } finally {
  //   //     setLoading(false); // Set loading to false after the fetch
  //   //   }
  //   // };

  //   fetchRestroData();
  // }, [id]);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#4CAF50" />
  //       <Text style={styles.loadingText}>Loading restaurant details...</Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!restro) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No restaurant data found!</Text>
      </View>
    );
  }

  // Destructure data from `restro` and store in local variables
  const { name, location, description, rating, avgCost } = restro;

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <Header
            icon="arrow-back-ios"
            onPress={() => {
              // router.push("/components/Search/Search");
            }}
          />
          <Text style={styles.headerTitle}>Home</Text>
          <Header icon="share" onPress={() => {}} />
        </View>

        {/* Scroll View containing all the content of the page */}
        <ScrollView>
          <View style={styles.content}>
            {/* Image Carousel */}
            <ImageCarousel
              imageUrls={[
                restro.image.url1,
                restro.image.url2,
                restro.image.url3,
                restro.image.url4,
                restro.image.url5,
              ]}
            />

            {/* Rating Bar */}
            <Rating rating={rating} />

            {/* Pass local variables to Description */}
            <Description
              name={name}
              location={location}
              description={description}
              avgCost={avgCost}
            />

            {/* Offers Section */}
            <View style={styles.offersSection}>
              <Text style={styles.sectionTitle}>Top Offers for you</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <OfferCard
                    key={index}
                    name={restro.name}
                    description={restro.description}
                    time={restro.time}
                    distance={restro.far}
                    offer={restro.offer}
                    imageUrl={restro.image[`url${index + 1}`]} // Dynamically load each image URL
                  />
                ))}
              </ScrollView>
            </View>

            {/* Regular Images
            <Image
              source={require("../assets/image1.jpg")}
              style={styles.regularImage}
            />
            <Image
              source={require("../assets/image2.jpg")}
              style={styles.regularImage}
            /> */}
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View style={styles.footer}>
          <FooterButton title="Menu" id={restro.id} />
          <FooterButton title="Book" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  header: {
    height: screenHeight * 0.065,
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    right: screenWidth * 0.34,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 10,
    alignItems: "center",
    gap: 4,
  },
  regularImage: {
    width: screenWidth * 0.98,
    height: screenHeight * 0.25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  offersSection: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.98,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginTop: 3,
  },
  offerCard: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.085,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 5,
    marginTop: 10,
  },
  footer: {
    height: screenHeight * 0.07,
    borderTopWidth: 0.3,
    borderTopColor: "grey",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
});

export default SearchedRestro;
