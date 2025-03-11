import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal } from "react-native";
import React, {useState} from "react";
import { Ionicons } from '@expo/vector-icons'; 

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const MenuItem = ({ title, subtitle, hasChevron = true, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
      {hasChevron && (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );
};

function Demo() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = (type: any) => {
    // Handle logout logic based on type (current device or all devices)
    setLogoutModalVisible(false);
    console.log(`Logging out from ${type}`);
    // Add actual logout logic here
  };

  return (
    <SafeAreaView>
        <StatusBar barStyle="light-content"/>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => console.log("Go back")}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text />
            <View style={{ width: 24 }} />
        </View>
      <View style={styles.divider} />
      <View style={styles.mainContainer} >
      <MenuItem
        title="Favourite Reastraunts"
        subtitle="Your favourite reastraunts"
        onPress={() => console.log("Favourite Reastraunts pressed")}
      />
      <View style={styles.divider} />
      <MenuItem
        title="Your Booking"
        subtitle="Your booking history"
        onPress={() => console.log("Your Booking pressed")}
      />
        <View style={styles.divider} />
        <MenuItem
          title="Bookings"
          subtitle="Your bookings"
          onPress={() => console.log("Bookings pressed")}
        />
      <View style={styles.divider} />
      <MenuItem
        title="History"
        subtitle="Your search history"
        onPress={() => console.log("History pressed")}
      />
      <View style={styles.divider} />
      <MenuItem
        title="About Us"
        subtitle="Get to know us"
        onPress={() => console.log("About Us pressed")}
      />
      <View style={styles.divider} />
      <MenuItem
        title="Settings"
        subtitle="Your settings"
        onPress={() => console.log("Settings pressed")}
      />
      <View style={styles.divider} />
      <MenuItem
        title="Help"
        subtitle="Get help"
        onPress={() => console.log("Help pressed")}
      />
      <View style={styles.divider} />
      <MenuItem
        title="Logout"
        subtitle="Logout from the app"
        onPress={() => setLogoutModalVisible(true)}
      />
      <View style={styles.divider} />
      </View>
      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log out from?</Text>

            <View style={{height:1, backgroundColor:"#333"}} />
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => handleLogout('current')}
            >
              <Text style={styles.modalOptionText}>Current Device</Text>
            </TouchableOpacity>
            
            <View style={styles.modalDivider} />
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => handleLogout('all')}
            >
              <Text style={styles.modalOptionText}>All Devices</Text>
            </TouchableOpacity>
            
            <View style={styles.modalDivider} />
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setLogoutModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: screenHeight * 0.06,
  },
  headerTitle: {
    fontSize: screenHeight * 0.03,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: screenHeight * 0.02,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.02,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
  },
  menuItemSubtitle: {
    color: "#999",
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1.5,
    width: "100%",
    backgroundColor: "#333",
  },
  mainContainer: {
    flex: 1,
    height: screenHeight,
    width: screenWidth * 0.95,
    marginLeft: screenWidth * 0.025,
  },  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 16,
  },
  modalOption: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#E53935',
    fontSize: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#333',
    width: '95%',
    alignSelf: 'center',
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
  },
});

export default Demo;