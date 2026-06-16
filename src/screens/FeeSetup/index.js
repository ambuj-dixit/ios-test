import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { backgroundImage } from '../../assets/images';
import { colors } from '../../styles';
import { indent } from '../../styles/dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../../services';
import { setLoginData } from '../../reduxOperations/login/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showLoader, hideLoader } from '../../components/appLoader';
import commonFunctions from '../../utils';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';

const FeeSetup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { pendingUser } = route.params || {};
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pendingUser?.StudentId) {
      fetchFeeOptions();
    } else {
      Alert.alert("Error", "Invalid user data. Please try logging in again.", [
        { text: "OK", onPress: () => navigation.navigate('studentLogin') }
      ]);
    }
  }, []);

  const fetchFeeOptions = () => {
    setLoading(true);
    API.get(`GetFeeSetup?Studentid=${pendingUser.StudentId}`)
      .then(res => {
        setLoading(false);
        let data = res.data?.data || res.data?.Data || res.data;

        if (Array.isArray(data)) {
          const normalized = data.map((item, index) => {
            const val = item.Fee_setup || item.FeeSetup || item.FeesSetup || (typeof item === 'string' ? item : `Option ${index + 1}`);
            return { label: val, id: index };
          });
          setOptions(normalized);
        } else {
          setOptions([{ label: 'Annual', id: 0 }, { label: 'Semester', id: 1 }]);
        }
      })
      .catch(() => {
        setLoading(false);
        setOptions([{ label: 'Annual', id: 0 }, { label: 'Semester', id: 1 }]);
      });
  };

  const handleSaveSetup = async () => {
    if (!selectedOption) {
      commonFunctions.showErrorMessage("Please select a fee setup option");
      return;
    }

    showLoader();
    API.get(`SaveFeeSetup?Studentid=${pendingUser.StudentId}&FeeSetup=${selectedOption}`)
      .then(async (res) => {
        hideLoader();
        commonFunctions.showSuccessMessage("Fee setup saved successfully", async () => {
           await finalizeLogin();
        });
      })
      .catch(err => {
        hideLoader();
        commonFunctions.showErrorMessage("Failed to save setup. Please try again.");
      });
  };

  const finalizeLogin = async () => {
      const device = await OneSignal.getDeviceState();
      if (device) {
        try {
          const body = {
            StudentID: pendingUser.StudentId,
            DeviceId: device.userId,
            Token: device.pushToken,
            Type: 'S',
          };
          await axios.post(
            'http://182.18.162.129:83/Calender_details.asmx/SaveDeviceIDAndToken',
            body,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          );
        } catch (error) { console.log('Notification registration failed during setup', error); }
      }

      try {
        await AsyncStorage.setItem('userData', JSON.stringify(pendingUser));
      } catch (err) { console.log('Error saving user data', err); }

      dispatch(setLoginData(pendingUser));
      navigation.navigate('main');
  };

  const renderOption = (item) => {
    const isSelected = selectedOption === item.label;
    const iconName = item.label.toLowerCase().includes('annual') ? 'calendar-check' : 'calendar-range';
    const displayLabel = item.label;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.clayCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedOption(item.label)}
      >
        <View style={[styles.iconWrapper, isSelected && { backgroundColor: '#fff' }]}>
          <Icon name={iconName} size={35} color={isSelected ? colors.blue : '#999'} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, isSelected && { color: '#fff' }]}>{displayLabel}</Text>
        </View>
        <View style={styles.radioOuter}>
           {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoClay}>
               <Icon name="cash-register" size={30} color={colors.blue} />
            </View>
            <Text style={styles.title}>Fee Setup</Text>
          </View>

          {/* Bilingual Notice Card - Full Text restored with Medium Sizing */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
               <Icon name="alert" size={24} color="#FF9800" />
               <Text style={styles.noticeTitle}>Action Required / आवश्यक कार्रवाई</Text>
            </View>
            <Text style={styles.noticeText}>
              Your Fee Setup has not been configured yet. Please select an appropriate Fee Setup from the dropdown below and submit to proceed.
            </Text>
            <Text style={styles.hindiText}>
              आपका शुल्क सेटअप अभी तक सेट नहीं किया गया है। कृपया नीचे दिए गए ड्रॉपडाउन से उचित शुल्क सेटअप चुनें और आगे बढ़ने के लिए सबमिट करें।
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.blue} style={{ marginTop: 30 }} />
          ) : (
            <View style={styles.optionsList}>
              {options.map(renderOption)}
            </View>
          )}

          {selectedOption?.toLowerCase().includes('semester') && (
            <View style={styles.infoBox}>
              <Icon name="information" size={22} color="#1565C0" />
              <Text style={styles.infoBoxText}>
                You have selected Semester Fee Setup. ₹4,000 will be automatically added to your Tuition Fee.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, !selectedOption && styles.disabledButton]}
            onPress={handleSaveSetup}
            disabled={!selectedOption}
          >
            <Text style={styles.submitText}>CONFIRM & CONTINUE</Text>
            <Icon name="chevron-right" size={22} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F3F8' },
  bg: { width: '100%', height: '100%' },
  scrollContent: { paddingHorizontal: indent * 1.5, paddingVertical: 35 },
  header: { alignItems: 'center', marginBottom: 25 },
  logoClay: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#a3b1c6",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)'
  },
  title: { fontSize: 26, fontWeight: '900', color: colors.black, letterSpacing: 0.5 },

  noticeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 22,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: "#a3b1c6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  noticeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  noticeTitle: { fontSize: 15, fontWeight: '800', color: '#E65100', marginLeft: 10 },
  noticeText: { fontSize: 13, color: '#444', marginBottom: 8, fontWeight: '500', lineHeight: 19 },
  hindiText: { fontSize: 13, color: '#666', fontWeight: '500', lineHeight: 22 },

  optionsList: { marginBottom: 20 },
  clayCard: {
    backgroundColor: '#F0F3F8',
    padding: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: "#a3b1c6",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5
  },
  selectedCard: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    elevation: 10
  },
  iconWrapper: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardInfo: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.black },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D9E6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.blue
  },
  submitButton: {
    backgroundColor: colors.blue,
    padding: 20,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 10
  },
  disabledButton: {
    backgroundColor: '#CED4DA',
    shadowOpacity: 0,
    elevation: 0
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.3)'
  },
  infoBoxText: {
    flex: 1,
    fontSize: 13,
    color: '#1565C0',
    marginLeft: 12,
    fontWeight: '700',
    lineHeight: 18
  }
});

export default FeeSetup;
