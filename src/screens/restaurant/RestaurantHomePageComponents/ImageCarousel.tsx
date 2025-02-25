import { View, FlatList, Dimensions, Image, StyleSheet } from "react-native";
import React from "react";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const flatListRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [isResetting, setIsResetting] = React.useState(false);

  const loopedImages = [
    { url: imageUrls[imageUrls.length - 1], id: "start-clone" },
    ...imageUrls.map((url, index) => ({ url, id: index.toString() })),
    { url: imageUrls[0], id: "end-clone" },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isResetting && flatListRef.current) {
        const nextIndex = currentIndex + 1;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        handleIndexChange(nextIndex);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isResetting]);

  const handleIndexChange = (index: number) => {
    if (index === loopedImages.length - 1 && flatListRef.current) {
      setIsResetting(true);
      setTimeout(() => {
        setCurrentIndex(1);
        flatListRef.current?.scrollToOffset({
          offset: screenWidth,
          animated: false,
        });
        setIsResetting(false);
      }, 300);
    } else if (index === 0 && flatListRef.current) {
      setIsResetting(true);
      setTimeout(() => {
        setCurrentIndex(imageUrls.length);
        flatListRef.current?.scrollToOffset({
          offset: screenWidth * imageUrls.length,
          animated: false,
        });
        setIsResetting(false);
      }, 300);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={loopedImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        )}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          handleIndexChange(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {imageUrls.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              currentIndex === i + 1 ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: screenHeight * 0.25,
    width: screenWidth,
  },
  carouselImage: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});

export default ImageCarousel;
