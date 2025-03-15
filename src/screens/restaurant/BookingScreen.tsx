import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for bookings
const bookings = [
  {
    id: '1',
    restaurantName: 'La Piazza Italian',
    date: '2025-03-15',
    time: '19:30',
    guests: 4,
    tableNumber: 'A12',
    status: 'upcoming',
    image: 'https://api.a0.dev/assets/image?text=italian%20restaurant%20interior&aspect=16:9'
  },
  {
    id: '2',
    restaurantName: 'Sushi Master',
    date: '2025-03-20',
    time: '20:00',
    guests: 2,
    tableNumber: 'B8',
    status: 'upcoming',
    image: 'https://api.a0.dev/assets/image?text=japanese%20restaurant%20interior&aspect=16:9'
  },
  {
    id: '3',
    restaurantName: 'The Grill House',
    date: '2025-03-10',
    time: '18:00',
    guests: 6,
    tableNumber: 'C4',
    status: 'completed',
    image: 'https://api.a0.dev/assets/image?text=steakhouse%20interior&aspect=16:9'
  }
];

const BookingsScreen = ({ navigation,route}:any) => {
  const insets = useSafeAreaInsets();

  const renderBookingCard = ({ item }:any) => {
    const isUpcoming = item.status === 'upcoming';
    
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: isUpcoming ? '#4CAF50' : '#9E9E9E' }]}>
              <Text style={styles.statusText}>{isUpcoming ? 'Upcoming' : 'Completed'}</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{item.guests} guests</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="restaurant-outline" size={20} color="#666" />
              <Text style={styles.detailText}>Table {item.tableNumber}</Text>
            </View>
          </View>

          {isUpcoming && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.modifyButton}>
                <Text style={styles.buttonText}>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  const user = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modifyButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BookingsScreen;