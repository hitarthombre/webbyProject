import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import userStore from "../../zustand/userStore";
import axios from "axios";
import API_BASE_URL from "../../../config";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define type interfaces
interface DateItem {
  id: string;
  day: string;
  date: number;
  month: string;
  isToday: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
}

interface TableItem {
  id: string;
  chairs: number;
}

// Constants with explicit types
const MAX_CHAIRS_PER_TABLE: number = 8;
const TABLE_SIZE: number = 150;
const CHAIR_SIZE: number = 40;
const RADIUS: number = 100;
const angleOffset: number = -Math.PI / 2;
const PEOPLE_LIMIT: number = 30;

// Generate dates for the next 7 days
const generateDates = (): DateItem[] => {
  const dates: DateItem[] = [];
  const today: Date = new Date();

  for (let i: number = 0; i < 7; i++) {
    const date: Date = new Date(today);
    date.setDate(today.getDate() + i);

    const day: string = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .slice(0, 3);
    const dateNum: number = date.getDate();
    const month: string = date
      .toLocaleDateString("en-US", { month: "short" })
      .slice(0, 3);

    dates.push({
      id: i.toString(),
      day,
      date: dateNum,
      month,
      isToday: i === 0,
    });
  }

  return dates;
};

// Generate time slots
const generateTimeSlots = (type: string): TimeSlot[] => {
  if (type === "breakfast") {
    return [
      { id: "b1", time: "11:00 AM" },
      { id: "b2", time: "11:30 AM" },
    ];
  } else if (type === "lunch") {
    return [
      { id: "l1", time: "12:00 PM" },
      { id: "l2", time: "12:30 PM" },
      { id: "l3", time: "01:00 PM" },
      { id: "l4", time: "01:30 PM" },
      { id: "l5", time: "02:00 PM" },
      { id: "l6", time: "02:30 PM" },
      { id: "l7", time: "03:00 PM" },
      { id: "l8", time: "03:30 PM" },
      { id: "l9", time: "04:00 PM" },
      { id: "l10", time: "04:30 PM" },
    ];
  } else if (type === "dinner") {
    return [
      { id: "d1", time: "06:00 PM" },
      { id: "d2", time: "06:30 PM" },
      { id: "d3", time: "07:00 PM" },
      { id: "d4", time: "07:30 PM" },
    ];
  }

  return [];
};

interface bookingDetailsinterface {
  userId: string;
  restaurantId: string;
  membersCount: number;
  selectedDate: string;
  selectedTimeSlot: string;
}
const RestaurantBooking = ({ route }: any) => {
  const insets = useSafeAreaInsets();

  const [membersCount, setMembersCount] = useState<number>(5);
  const [selectedDate, setSelectedDate] = useState<string>("0");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isRequestingPerms, setIsRequestingPerms] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(
    null
  );
  const [bookingDetails, setBookingDetails] = useState<bookingDetailsinterface>(
    {
      userId: "",
      restaurantId: "",
      membersCount: 0,
      selectedDate: "",
      selectedTimeSlot: "",
    }
  );
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const { getUser } = userStore();
  const user = getUser();
  useEffect(() => {
    console.log("Restaurant Data:", restaurant);
  }, []);
  // Change from selectedMealType to expandedSections
  const [expandedSections, setExpandedSections] = useState<{
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  }>({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const toggleSection = (section: "breakfast" | "lunch" | "dinner"): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addMember = (): void => {
    if (membersCount >= PEOPLE_LIMIT) {
      Alert.alert(
        "Limit Reached",
        `You cannot add more than ${PEOPLE_LIMIT} people.`
      );
      return;
    }
    setMembersCount((prev: number) => prev + 1);
  };

  const removeMember = (): void =>
    setMembersCount((prev: number) => (prev > 0 ? prev - 1 : 0));

  const handleBookNow = async (): Promise<void> => {
    try {
      if (!selectedTimeSlot) {
        Alert.alert(
          "Select Time Slot",
          "Please select a time slot to proceed."
        );
        return;
      }

      const selectedDateObj = generateDates().find(
        (d) => d.id === selectedDate
      );
      // Get the selected time slot details
      let selectedTimeSlotText = "";
      const allTimeSlots = [
        ...generateTimeSlots("breakfast"),
        ...generateTimeSlots("lunch"),
        ...generateTimeSlots("dinner"),
      ];
      const selectedTimeSlotObj = allTimeSlots.find(
        (t) => t.id === selectedTimeSlot
      );

      if (selectedTimeSlotObj) {
        selectedTimeSlotText = selectedTimeSlotObj.time;
      }

      if (!user?._id || !restaurant?._id || !membersCount || !selectedDateObj) {
        Alert.alert(
          "Missing Information",
          "Please ensure all booking details are provided."
        );
        return;
      }

      // Format date in the requested format: day-month-year (9-3-25)
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2); // Get last 2 digits of year
      const monthNumber = today.getMonth() + 1; // getMonth() is 0-indexed

      // Format date properly (9-3-25 format)
      const formattedDate = `${selectedDateObj.date}-${monthNumber}-${year}`;

      // Booking logic with correct data
      const bookingData = {
        userId: user._id,
        restaurantId: restaurant._id,
        membersCount,
        selectedDate: formattedDate, // Now in format "9-3-25"
        selectedTimeSlot: selectedTimeSlotText,
      };

      const response = await axios.post(
        API_BASE_URL + "/api/bookings",
        bookingData
      );

      Alert.alert("Booking Successful", "Your booking has been confirmed.");
      // navigation.preload("Home");
      navigation.goBack();
    } catch (error) {
      console.error("Booking error:", error);

      // Check if it's an axios error with response
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
        Alert.alert(
          "Booking Failed",
          error.response.data.message ||
            "There was an error making your booking."
        );
      } else {
        Alert.alert(
          "Booking Failed",
          "There was an error connecting to the server."
        );
      }
    }
  };

  // Calculate number of tables based on members count
  const numberOfTables: number = Math.ceil(membersCount / MAX_CHAIRS_PER_TABLE);

  // Render tables based on the member count
  const renderTables = (): TableItem[] => {
    let remaining: number = membersCount;
    const tables: TableItem[] = [];

    for (
      let tableIndex: number = 0;
      tableIndex < numberOfTables;
      tableIndex++
    ) {
      const chairsForThisTable: number = Math.min(
        remaining,
        MAX_CHAIRS_PER_TABLE
      );
      remaining -= chairsForThisTable;

      tables.push({
        id: `table-${tableIndex}`,
        chairs: chairsForThisTable,
      });
    }

    return tables;
  };

  // Render table item with chairs
  const renderTableItem = ({ item }: { item: TableItem }) => {
    return (
      <View style={styles.tableContainer}>
        <Image
          source={require("../../../assets/images/table.png")}
          style={styles.tableImage}
        />
        {renderChairs(item.chairs, item.id)}
      </View>
    );
  };

  // Render chairs around a table
  const renderChairs = (chairsCount: number, tableId: string) => {
    return Array.from({ length: chairsCount }, (_, i: number) => {
      const angle: number = angleOffset + (2 * Math.PI * i) / chairsCount;

      // Reduce radius to bring chairs closer inside the table
      const innerRadius: number = RADIUS - 10;
      const x: number = innerRadius * Math.cos(angle);
      const y: number = innerRadius * Math.sin(angle);

      return (
        <Image
          key={`chair-${tableId}-${i}`}
          source={require("../../../assets/images/chair.png")}
          style={[
            styles.chairImage,
            {
              left: x + TABLE_SIZE / 2 - CHAIR_SIZE / 2,
              top: y + TABLE_SIZE / 2 - CHAIR_SIZE / 2,
              transform: [{ rotate: `${(angle * 180) / Math.PI + 90}deg` }], // Adjust rotation to face inward
            },
          ]}
        />
      );
    });
  };

  // Render date item
  const renderDateItem = ({ item }: { item: DateItem }) => {
    const isSelected: boolean = item.id === selectedDate;

    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selectedDateItem,
          item.isToday && styles.todayDateItem,
        ]}
        onPress={() => {
          setSelectedDate(item.id);
          setBookingDetails({
            ...bookingDetails,
            selectedDate: `${item.date}-${item.month}`,
          });
        }}
      >
        {item.isToday && <Text style={styles.todayText}>Today</Text>}
        <Text style={styles.dayText}>{item.day}</Text>
        <Text style={styles.dateText}>
          {item.date} {item.month}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render time slot
  const renderTimeSlot = ({ item }: { item: TimeSlot }) => {
    const isSelected: boolean = selectedTimeSlot === item.id;
    const currentTime = new Date();
    const selectedDateObj = generateDates().find((d) => d.id === selectedDate);
    const isToday = selectedDateObj?.isToday;
    
    // Convert time string to Date object for comparison
    const [time, modifier] = item.time.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const timeSlotDate = new Date();
    timeSlotDate.setHours(hours, minutes, 0, 0);
    
    const isPastTime = isToday && timeSlotDate < currentTime;
  
    return (
      <TouchableOpacity
        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot, isPastTime && styles.disabledTimeSlot]}
        onPress={() => {
          if (!isPastTime) {
            setSelectedTimeSlot(item.id);
            setBookingDetails({
              ...bookingDetails,
              selectedTimeSlot: item.time,
            });
          }
        }}
        disabled={isPastTime}
      >
        <Text style={[styles.timeText, isPastTime && styles.disabledText]}>{item.time}</Text>
      </TouchableOpacity>
    );
  };
  

  const styles = StyleSheet.create({
    disabledTimeSlot: {
      backgroundColor: "#d3d3d3",
    },
    disabledText: {
      color: "#a9a9a9",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: insets.top,
      // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 8,
    },
    guestCountContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    guestCountText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    guestButtons: {
      flexDirection: "row",
    },
    guestButton: {
      width: 36,
      height: 36,
      backgroundColor: "#f5f5f5",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
    },
    guestButtonText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    tablesContainer: {
      height: 250,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      paddingHorizontal: 16,
    },
    tableList: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
    tableContainer: {
      width: TABLE_SIZE,
      height: TABLE_SIZE,
      margin: 16,
      marginRight: 50,
      position: "relative",
    },
    tableImage: {
      width: TABLE_SIZE,
      height: TABLE_SIZE,
      resizeMode: "contain",
    },
    chairImage: {
      position: "absolute",
      width: CHAIR_SIZE,
      height: CHAIR_SIZE,
      resizeMode: "contain",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    scrollView: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginLeft: 16,
    },
    dateList: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    dateItem: {
      width: 80,
      height: 100,
      borderRadius: 8,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      padding: 8,
    },
    selectedDateItem: {
      backgroundColor: "#e6f7ff",
      borderWidth: 1,
      borderColor: "#1890ff",
    },
    todayDateItem: {
      backgroundColor: "#fff3e0",
    },
    todayText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#ff9800",
      marginBottom: 4,
    },
    dayText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    dateText: {
      fontSize: 14,
    },
    helperText: {
      fontSize: 12,
      color: "#666",
      marginLeft: 16,
      marginBottom: 16,
    },
    mealTypeContainer: {
      marginHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 8,
      overflow: "hidden",
    },
    mealTypeHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      backgroundColor: "#f9f9f9",
    },
    mealTypeLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    mealTypeText: {
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
    },
    mealTypeTimeRange: {
      fontSize: 12,
      color: "#666",
      marginLeft: 8,
    },
    timeSlotList: {
      padding: 12,
    },
    timeSlotGrid: {
      padding: 12,
    },
    timeSlot: {
      width: 90,
      height: 70,
      borderRadius: 8,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      marginBottom: 12,
      padding: 8,
    },
    selectedTimeSlot: {
      backgroundColor: "#e6f7ff",
      borderWidth: 1,
      borderColor: "#1890ff",
    },
    timeText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    bottomSpacer: {
      height: 80,
    },
    bookButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#eee",
    },
    bookButton: {
      backgroundColor: "#fff",
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#000",
    },
    bookButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.headerTitle}>BOOKING</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Guest counter */}
        <View style={styles.guestCountContainer}>
          <Text style={styles.guestCountText}>
            NUMBER OF GUEST: {membersCount}
          </Text>
          <View style={styles.guestButtons}>
            <TouchableOpacity style={styles.guestButton} onPress={addMember}>
              <Text style={styles.guestButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guestButton} onPress={removeMember}>
              <Text style={styles.guestButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Table selection - horizontal scrolling */}
        <View style={styles.tablesContainer}>
          <FlatList
            data={renderTables()}
            renderItem={renderTableItem}
            keyExtractor={(item: TableItem) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tableList}
          />
        </View>

        {/* When are you visiting section */}

        <Text style={styles.sectionTitle}>When are you visiting?</Text>

        {/* Date selector */}
        <FlatList
          data={generateDates()}
          renderItem={renderDateItem}
          keyExtractor={(item: DateItem) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
        />

        <Text style={styles.helperText}>Select the time of day</Text>

        {/* Breakfast section */}
        <View style={styles.mealTypeContainer}>
          <TouchableOpacity
            style={styles.mealTypeHeader}
            onPress={() => toggleSection("breakfast")}
          >
            <View style={styles.mealTypeLeft}>
              <Ionicons name="sunny" size={24} color="#333" />
              <Text style={styles.mealTypeText}>Breakfast</Text>
              <Text style={styles.mealTypeTimeRange}>11:00 AM to 12:00 PM</Text>
            </View>
            <Ionicons
              name={expandedSections.breakfast ? "chevron-up" : "chevron-down"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {expandedSections.breakfast && (
            <FlatList
              data={generateTimeSlots("breakfast")}
              renderItem={renderTimeSlot}
              keyExtractor={(item: TimeSlot) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.timeSlotList}
              nestedScrollEnabled={true}
            />
          )}
        </View>

        {/* Lunch section */}
        <View style={styles.mealTypeContainer}>
          <TouchableOpacity
            style={styles.mealTypeHeader}
            onPress={() => toggleSection("lunch")}
          >
            <View style={styles.mealTypeLeft}>
              <Ionicons name="restaurant" size={24} color="#333" />
              <Text style={styles.mealTypeText}>Lunch</Text>
              <Text style={styles.mealTypeTimeRange}>12:00 PM to 5:00 PM</Text>
            </View>
            <Ionicons
              name={expandedSections.lunch ? "chevron-up" : "chevron-down"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {expandedSections.lunch && (
            <FlatList
              nestedScrollEnabled={true}
              data={generateTimeSlots("lunch")}
              renderItem={renderTimeSlot}
              keyExtractor={(item: TimeSlot) => item.id}
              horizontal
              contentContainerStyle={styles.timeSlotGrid}
            />
          )}
        </View>

        {/* Dinner section */}
        <View style={styles.mealTypeContainer}>
          <TouchableOpacity
            style={styles.mealTypeHeader}
            onPress={() => toggleSection("dinner")}
          >
            <View style={styles.mealTypeLeft}>
              <Ionicons name="moon" size={24} color="#333" />
              <Text style={styles.mealTypeText}>Dinner</Text>
              <Text style={styles.mealTypeTimeRange}>6:00 PM to 12:00 AM</Text>
            </View>
            <Ionicons
              name={expandedSections.dinner ? "chevron-up" : "chevron-down"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {expandedSections.dinner && (
            <FlatList
              data={generateTimeSlots("dinner")}
              renderItem={renderTimeSlot}
              keyExtractor={(item: TimeSlot) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.timeSlotList}
              nestedScrollEnabled={true}
            />
          )}
        </View>

        {/* Spacer for bottom button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Book button */}
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantBooking;
