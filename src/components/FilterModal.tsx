import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../../config';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  onClear,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('sort');
  const [selectedSort, setSelectedSort] = useState<string>('relevance');
  const [selectedDistance, setSelectedDistance] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const screenWidth = Dimensions.get('window').width;
  
  // Adjust the category width based on screen size for better space allocation
  const categoryWidth = screenWidth < 375 ? '30%' : '35%';
  const optionsWidth = screenWidth < 375 ? '70%' : '65%';

  const filterCategories: FilterCategory[] = [
    // {
    //   id: 'sort',
    //   title: 'Sort',
    //   options: []
    // },
    // {
    //   id: 'availableToday',
    //   title: 'Available Today',
    //   options: []
    // },
    // {
    //   id: 'availableTomorrow',
    //   title: 'Available Tomorrow',
    //   options: []
    // },
    // {
    //   id: 'distance',
    //   title: 'Distance',
    //   options: []
    // },
    {
      id: 'ratings',
      title: 'Ratings',
      options: []
    },
    // {
    //   id: 'restaurantCategory',
    //   title: 'Restaurant Category',
    //   options: []
    // },
    // {
    //   id: 'dietaryPreferences',
    //   title: 'Dietary Preferences',
    //   options: []
    // },
    // {
    //   id: 'discount',
    //   title: 'Discount',
    //   options: []
    // },
    // {
    //   id: 'amenities',
    //   title: 'Amenities',
    //   options: []
    // },
    // {
    //   id: 'costForTwo',
    //   title: 'Cost for two',
    //   options: []
    // },
    // {
    //   id: 'moreFilters',
    //   title: 'More filters',
    //   options: []
    // },
    {
      id: 'cuisines',
      title: 'Cuisines',
      options: []
    },
  ];

  const cuisineOptions = [
    { id: 'indian', label: 'Indian' },
    { id: 'marathi', label: 'Marathi' },
    { id: 'gujarati', label: 'Gujarati' },
    { id: 'indonesian', label: 'Indonesian' },
    { id: 'thai', label: 'Thai' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'italian', label: 'Italian' },
    { id: 'southIndian', label: 'South Indian' },
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'distance', label: 'Distance: Nearby To Far' },
    { id: 'popularity', label: 'Popularity: High to Low' },
    { id: 'costLowHigh', label: 'Cost for two: Low to High' },
    { id: 'costHighLow', label: 'Cost for two: High to Low' },
  ];

  const distanceOptions = [
    { id: 'all', label: 'All' },
    { id: '2km', label: 'Within 2km' },
    { id: '5km', label: 'Within 5km' },
    { id: '10km', label: 'Within 10km' },
    { id: '15km', label: 'Within 15km' },
  ];

  const ratingOptions = [
    { id: '4.5', label: 'Rating 4.5+' },
    { id: '4', label: 'Rating 4+' },
    { id: '3.5', label: 'Rating 3.5+' },
  ];

  const restaurantCategoryOptions = [
    { id: 'bar', label: 'Bar' },
    { id: 'bistro', label: 'Bistro' },
    { id: 'cafe', label: 'Cafe' },
    { id: 'dessertParlour', label: 'Dessert Parlour' },
    { id: 'fineDining', label: 'Fine Dining' },
    { id: 'foodCourt', label: 'Food Court' },
    { id: 'lounge', label: 'Lounge' },
    { id: 'microbrewery', label: 'Microbrewery' },
    { id: 'nightlife', label: 'Nightlife' },
    { id: 'restobar', label: 'Restobar' },
  ];

  const renderFilterOptions = () => {
    switch (selectedCategory) {
      case 'sort':
        return (
          <View>
            <Text style={styles.optionsTitle}>SORT BY</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => setSelectedSort(option.id)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedSort === option.id && styles.radioOuterSelected
                  ]}>
                    {selectedSort === option.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
        
      case 'distance':
        return (
          <View>
            <Text style={styles.optionsTitle}>DISTANCE</Text>
            {distanceOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => setSelectedDistance(option.id)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedDistance === option.id && styles.radioOuterSelected
                  ]}>
                    {selectedDistance === option.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'ratings':
        return (
          <View>
            <Text style={styles.optionsTitle}>RATINGS</Text>
            {ratingOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => setSelectedRating(option.id)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedRating === option.id && styles.radioOuterSelected
                  ]}>
                    {selectedRating === option.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'restaurantCategory':
        return (
          <View>
            <Text style={styles.optionsTitle}>RESTAURANT CATEGORY</Text>
            {restaurantCategoryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => {
                  if (selectedCategories.includes(option.id)) {
                    setSelectedCategories(selectedCategories.filter(id => id !== option.id));
                  } else {
                    setSelectedCategories([...selectedCategories, option.id]);
                  }
                }}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    selectedCategories.includes(option.id) && styles.checkboxSelected
                  ]}>
                    {selectedCategories.includes(option.id) && (
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'cuisines':
        return (
          <View>
            <Text style={styles.optionsTitle}>CUISINES</Text>
            {cuisineOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => {
                  if (selectedCategories.includes(option.id)) {
                    setSelectedCategories(selectedCategories.filter(id => id !== option.id));
                  } else {
                    setSelectedCategories([...selectedCategories, option.id]);
                  }
                }}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    selectedCategories.includes(option.id) && styles.checkboxSelected
                  ]}>
                    {selectedCategories.includes(option.id) && (
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );


      default:
        return null;
    }
  };

  const generateApiLink = () => {
    const baseUrl = `${API_BASE_URL}/api/restaurants/filtered-search`; // Replace with your actual API base URL
    const params: Record<string, string | string[]> = {
      // sort: selectedSort,
      // distance: selectedDistance,
      cusines: selectedCategories,
      ratings: selectedRating,
      
    };

    // Construct query string
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(',')}`; // Join array values
        }
        return `${key}=${value}`;
      })
      .join('&');

    return `${baseUrl}?${queryString}`;
  };

  // const handleApply = () => {
  //   const apiLink = generateApiLink();
  //   console.log('Generated API Link:', apiLink); // Log the API link or handle it as needed
  //   onApply(); // Call the original onApply function
  // };

  const handleApply = () => {
    const filters = {
      cuisines: selectedCategories, // Selected cuisines
      ratings: selectedRating, // Selected rating
    };
    
    onApply(filters); // Pass filters to Search.tsx
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <ScrollView 
                style={[styles.categoriesList, { width: 10 }]}
                showsVerticalScrollIndicator={false}
              >
                {filterCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category.id && styles.selectedCategoryItem
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text 
                      style={[
                        styles.categoryText,
                        selectedCategory === category.id && styles.selectedCategoryText
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={[styles.optionsContainer, { width: optionsWidth }]}>
                <ScrollView 
                  contentContainerStyle={styles.optionsScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {renderFilterOptions()}
                </ScrollView>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  categoriesList: {
    backgroundColor: '#F8F8F8',
    
    // width is now set dynamically
  },
  categoryItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  selectedCategoryItem: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#FF4B3A',
  },
  categoryText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FF4B3A',
    fontWeight: '600',
  },
  optionsContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    // width is now set dynamically
  },
  optionsScroll: {
    padding: 16,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  optionContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: '#FF4B3A',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4B3A',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#FF4B3A',
    borderColor: '#FF4B3A',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Allow text to take available space
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 24 : 16, // Extra padding for Android
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  clearButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FF4B3A',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterModal;