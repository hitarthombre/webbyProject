import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { styles } from '../screens/restaurant/HomeScreen'
import { Ionicons } from '@expo/vector-icons'

const HomeHeader = () => {
  return (
      <View style={styles.header}>
          <View style={styles.headerRow}>
            {/* Address Bar */}
            <TouchableOpacity style={styles.addressContainer}>
              <View style={styles.addressLeft}>
                <Ionicons name="location" size={20} color="#E23744" />
                <View style={styles.addressTextContainer}>
                  <Text style={styles.address}>Home</Text>
                  <Text numberOfLines={1} style={styles.addressText}>
                    123 Main Street, New York, NY 10001
                  </Text>
                </View>
              </View>
              <View style={styles.addressRight}>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </View>
            </TouchableOpacity>
            {/* Profile Button */}
            <TouchableOpacity style={styles.profileContainer}>
              <Ionicons name="person-circle-outline" size={30} color="#666" />
            </TouchableOpacity>
          </View>

       
        </View>
  )
}

export default HomeHeader