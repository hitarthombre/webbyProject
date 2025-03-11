import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ImageCarouselProps {
  imageUrls: string[];
  onIndexChange?: (index: number) => void;
}

const ImageCarousel = ({ imageUrls, onIndexChange }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setActiveIndex(newIndex);
      if (onIndexChange) {
        onIndexChange(newIndex);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={imageUrls}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default ImageCarousel;