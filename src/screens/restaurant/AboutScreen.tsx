import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const MenuItem = ({ title, subtitle, hasChevron = true, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
      {hasChevron && (
        <Ionicons name="chevron-forward" size={20} color="black" />
      )}
    </TouchableOpacity>
  );
};

const InfoModal = ({ visible, title, content, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {content}
          </ScrollView>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AboutScreen = () => {
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [librariesModalVisible, setLibrariesModalVisible] = useState(false);
  const [licensesModalVisible, setLicensesModalVisible] = useState(false);

  const appVersion = "v1.0.0 Live";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <MenuItem
          title="Terms of Service"
          onPress={() => setTermsModalVisible(true)}
        />
        
        <View style={styles.divider} />
        
        <View style={{marginLeft: 20, marginTop: 15, marginBottom: 15}}>
          <Text style={styles.menuItemTitle}>App version</Text>
          <Text style={styles.menuItemSubtitle}>{appVersion}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <MenuItem
          title="Open Source Libraries"
          onPress={() => setLibrariesModalVisible(true)}
        />
        
        <View style={styles.divider} />
        
        <MenuItem
          title="Licenses and Registrations"
          onPress={() => setLicensesModalVisible(true)}
        />
      </View>
      
      <View style={styles.divider} />

      {/* Terms of Service Modal */}
      <InfoModal
        visible={termsModalVisible}
        title="Terms of Service"
        onClose={() => setTermsModalVisible(false)}
        content={
          <View>
            <Text style={styles.modalHeading}>Webby Terms of Service</Text>
            <Text style={styles.modalParagraph}>Last Updated: March 16, 2025</Text>
            
            <Text style={styles.modalHeading}>1. Acceptance of Terms</Text>
            <Text style={styles.modalParagraph}>
              By accessing or using the Webby application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
            </Text>
            
            <Text style={styles.modalHeading}>2. User Accounts</Text>
            <Text style={styles.modalParagraph}>
              To use certain features of Webby, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </Text>
            
            <Text style={styles.modalHeading}>3. Privacy Policy</Text>
            <Text style={styles.modalParagraph}>
              Your use of Webby is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </Text>
            
            <Text style={styles.modalHeading}>4. Content</Text>
            <Text style={styles.modalParagraph}>
              You retain ownership of any content you submit, post, or display on or through Webby. By submitting content, you grant Webby a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.
            </Text>
            
            <Text style={styles.modalHeading}>5. Prohibited Conduct</Text>
            <Text style={styles.modalParagraph}>
              You may not use Webby for any illegal purpose or to violate any laws. You may not upload viruses or malicious code or interfere with the app's functionality.
            </Text>
            
            <Text style={styles.modalHeading}>6. Termination</Text>
            <Text style={styles.modalParagraph}>
              We reserve the right to terminate or suspend your account and access to Webby at our sole discretion, without notice, for conduct that we believe violates these Terms of Service.
            </Text>
            
            <Text style={styles.modalHeading}>7. Changes to Terms</Text>
            <Text style={styles.modalParagraph}>
              We may modify these Terms at any time. Your continued use of Webby after any such changes constitutes your acceptance of the new Terms.
            </Text>
            
            <Text style={styles.modalHeading}>8. Contact</Text>
            <Text style={styles.modalParagraph}>
              If you have any questions about these Terms, please contact us at support@webbyapp.com.
            </Text>
          </View>
        }
      />

      {/* Open Source Libraries Modal */}
      <InfoModal
        visible={librariesModalVisible}
        title="Open Source Libraries"
        onClose={() => setLibrariesModalVisible(false)}
        content={
          <View>
            <Text style={styles.modalHeading}>Libraries Used in Webby</Text>
            
            <Text style={styles.libraryName}>react-native</Text>
            <Text style={styles.modalParagraph}>
              Framework for building native apps using React. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>expo</Text>
            <Text style={styles.modalParagraph}>
              Platform for making universal native apps for Android, iOS, and the web. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>@expo/vector-icons</Text>
            <Text style={styles.modalParagraph}>
              Icon library for Expo apps. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>react-navigation</Text>
            <Text style={styles.modalParagraph}>
              Routing and navigation for React Native apps. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>axios</Text>
            <Text style={styles.modalParagraph}>
              Promise-based HTTP client for the browser and Node.js. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>async-storage</Text>
            <Text style={styles.modalParagraph}>
              Data storage system for React Native. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>react-native-reanimated</Text>
            <Text style={styles.modalParagraph}>
              React Native's Animated library reimplemented. MIT License.
            </Text>
            
            <Text style={styles.libraryName}>react-native-gesture-handler</Text>
            <Text style={styles.modalParagraph}>
              Native-driven gesture management APIs for React Native. MIT License.
            </Text>
          </View>
        }
      />

      {/* Licenses and Registrations Modal */}
      <InfoModal
        visible={licensesModalVisible}
        title="Licenses and Registrations"
        onClose={() => setLicensesModalVisible(false)}
        content={
          <View>
            <Text style={styles.modalHeading}>Webby Licenses</Text>
            
            <Text style={styles.licenseHeading}>Software License</Text>
            <Text style={styles.modalParagraph}>
              Webby is licensed under a proprietary license. All rights reserved.
            </Text>
            
            <Text style={styles.licenseHeading}>App Store Registration</Text>
            <Text style={styles.modalParagraph}>
              Webby is registered on the Apple App Store and Google Play Store under the developer account "Webby Technologies, Inc."
            </Text>
            
            <Text style={styles.licenseHeading}>Data Processing</Text>
            <Text style={styles.modalParagraph}>
              Webby is registered as a data processor in compliance with applicable data protection regulations, including GDPR and CCPA.
            </Text>
            
            <Text style={styles.licenseHeading}>Patent Information</Text>
            <Text style={styles.modalParagraph}>
              Certain features of Webby may be protected by pending patent applications.
            </Text>
            
            <Text style={styles.licenseHeading}>Trademark</Text>
            <Text style={styles.modalParagraph}>
              "Webby" and the Webby logo are registered trademarks of Webby Technologies, Inc.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: screenHeight * 0.05,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemSubtitle: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    width: "95%",
    backgroundColor: "#DDD",
    marginLeft: "2.25%",
    marginTop: 4,
    marginBottom: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    maxHeight: screenHeight * 0.6,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  modalHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  modalParagraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    color: '#333',
  },
  libraryName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 2,
    color: '#2196F3',
  },
  licenseHeading: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 2,
    color: '#2196F3',
  },
});