import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import styles from './styles';
import {maleProfile, home} from '../../assets/images'; // Reusing home or other images if needed
import {CustomHeader} from '../../components';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather for a cleaner formal look
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import {globalConstants} from '../../constants';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning, 👋';
  if (hour < 17) return 'Good Afternoon, 👋';
  return 'Good Evening, 👋';
};

const DashboardView = ({
  navigation,
  onCardPress,
  instituteDetails,
  academicDetails,
  profileData,
  feeDueDetail,
}) => {
  const totalAmountDue = feeDueDetail?.TotalDueAmount || 0;
  const totalAmountPaid = feeDueDetail?.TotalPaidAmount || 0;
  const totalBalance = feeDueDetail?.TotalBalanceAmount || 0;

  const navigateToFeature = (title, route = null) => {
    if (route) {
      navigation.navigate(route);
    } else {
      navigation.navigate('ComingSoon', { title });
    }
  };

  const handleWhatsAppSupport = () => {
    const phoneNumber = '+917651840024'; // ENTER_YOUR_WHATSAPP_NUMBER_HERE (Example number from API used)
    const message = `Hello ESIM Pulse, I am ${academicDetails?.StudentName} (Reg No: ${academicDetails?.RegNo}). I need assistance.`;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`).catch(() => {
          Alert.alert('Error', 'WhatsApp is not installed and could not open the browser.');
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CustomHeader
        instituteDetails={instituteDetails}
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Greeting & Student Name */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
          <Text
            style={styles.studentName}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {academicDetails?.StudentName || 'STUDENT NAME'}
          </Text>
        </View>

        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('profile')}
        >
          <View style={styles.imageWrapper}>
            {profileData?.Photo && profileData?.Photo !== 'N/A' ? (
              <Image
                source={{uri: 'data:image/png;base64,' + profileData?.Photo}}
                style={styles.profileImage}
              />
            ) : (
              <Image source={maleProfile} style={styles.profileImage} />
            )}
            <View style={styles.activeDot} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.courseName} numberOfLines={2} adjustsFontSizeToFit>
              {academicDetails?.CourseName || 'Course Name'}
            </Text>
            <Text style={styles.schoolName} numberOfLines={1} adjustsFontSizeToFit>
              {academicDetails?.SchoolName || 'School Name'}
            </Text>
          </View>

          <Icon name="chevron-right" size={20} color="#1A1D1E" style={styles.chevronIcon} />
        </TouchableOpacity>

        {/* Academic Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Icon name="users" size={18} color="#0052CC" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Batch</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{academicDetails?.Batch || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Icon name="calendar" size={18} color="#0052CC" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Semester</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{academicDetails?.CourseYear || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Icon name="credit-card" size={18} color="#0052CC" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Fee Setup</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {academicDetails?.Email?.toLowerCase()?.includes('annual') ? 'Annual' : 'Semester'}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Icon name="file-text" size={18} color="#0052CC" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Reg. Number</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{academicDetails?.RegNo || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Fees Section */}
        <View style={styles.feesCard}>
          <View style={styles.feesHeader}>
            <View style={styles.feeStatItem}>
              <Text style={styles.feeStatLabel}>Total Amount Due</Text>
              <Text style={styles.feeStatValue}>₹{totalAmountDue.toLocaleString()}</Text>
            </View>
            <View style={styles.feeDivider} />
            <View style={styles.feeStatItem}>
              <Text style={styles.feeStatLabel}>Total Amount Paid</Text>
              <Text style={styles.feeStatValue}>₹{totalAmountPaid.toLocaleString()}</Text>
            </View>
            <View style={styles.feeDivider} />
            <View style={styles.feeStatItem}>
              <Text style={styles.feeStatLabel}>Total Balance</Text>
              <Text style={styles.feeStatValue}>₹{totalBalance.toLocaleString()}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            activeOpacity={0.9}
            onPress={() => onCardPress({ routeNames: 'FEE_PAY' })}
          >
            <Text style={styles.payButtonText}>Pay Dues Now</Text>
            <Icon name="arrow-right" size={18} color="#003399" style={styles.payButtonIcon} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <ActionItem
            icon="book-open"
            label="Teaching Plan"
            onPress={() => navigateToFeature('Teaching Plan')}
          />
          <ActionItem
            icon="award"
            label="Student Marksheet"
            onPress={() => navigateToFeature('Student Marksheet')}
          />
          <ActionItem
            icon="lock"
            label="Change Password"
            onPress={() => navigateToFeature('Change Password', globalConstants.default.routeNames.CHANGE_PASSWORD)}
          />
          <ActionItem
            icon="file-text"
            label="Assignment"
            onPress={() => navigateToFeature('Assignment')}
          />
        </View>

        {/* ESIM Pulse Support */}
        <TouchableOpacity
          style={styles.supportCard}
          activeOpacity={0.8}
          onPress={handleWhatsAppSupport}
        >
          <View style={styles.botIconContainer}>
            <MIcon name="robot-outline" size={35} color="#0052CC" />
          </View>
          <View style={styles.supportInfo}>
            <Text style={styles.supportTitle}>Help from ESIM Pulse</Text>
            <Text style={styles.supportSub}>Get instant help for your queries</Text>
          </View>
          <View style={styles.getHelpButton}>
             <MIcon name="chat-processing-outline" size={16} color="#0052CC" />
             <Text style={styles.getHelpText}>Get Help</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const ActionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.actionIconContainer}>
      <Icon name={icon} size={22} color="#1A1D1E" />
    </View>
    <Text style={styles.actionLabel} numberOfLines={2}>{label}</Text>
  </TouchableOpacity>
);

export default DashboardView;
