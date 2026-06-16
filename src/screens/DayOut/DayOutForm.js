import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Switch, ImageBackground, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { HeaderWithTitle } from '../../components';
import { backgroundImage } from '../../assets/images';
import { colors } from '../../styles';
import { indent, halfIndent } from '../../styles/dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../../services';
import { showLoader, hideLoader } from '../../components/appLoader';
import DocumentPicker, { types } from 'react-native-document-picker';
import { launchCamera } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DayOutForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    fromTime: new Date(new Date().setHours(9, 0, 0, 0)),
    toTime: new Date(new Date().setHours(18, 0, 0, 0)),
    reasonID: '',
    comment: '',
    isUrgent: false,
    document: null,
  });

  const [dateSelected, setDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);

  useEffect(() => {
    fetchReasons();
  }, [formData.isUrgent]);

  const fetchReasons = () => {
    showLoader();
    const urgentFlag = formData.isUrgent ? 'yes' : 'no';
    API.get(`GetLeaveReason?LeaveType=DayOut&Urgent=${urgentFlag}`)
      .then(res => {
        if (res.data && Array.isArray(res.data.Data)) {
          setReasons(res.data.Data.map(item => ({ label: item.LeaveReason, value: item.ID })));
        }
        hideLoader();
      }).catch(() => hideLoader());
  };

  const validateTime = () => {
    const now = new Date();
    const isToday = moment(formData.date).isSame(now, 'day');

    // Check if past 5:55 PM for today
    if (isToday && now.getHours() >= 17 && now.getMinutes() >= 55) {
      Alert.alert("Restriction", "Day out requests for Today are not allowed after 5:55 PM.");
      return false;
    }

    const start = formData.fromTime.getHours();
    const end = formData.toTime.getHours();

    // Note:- you're allowed to take day out between 9:00 AM and 6:00 PM
    if (start < 9 || end > 18 || (end === 18 && formData.toTime.getMinutes() > 0)) {
      Alert.alert("Time Limit", "You are only allowed to take day out between 9:00 AM and 6:00 PM.");
      return false;
    }

    if (formData.fromTime >= formData.toTime) {
      Alert.alert("Invalid Time", "To Time must be after From Time.");
      return false;
    }

    return true;
  };

  const handleSendRequest = () => {
    if (!validateTime()) return;

    const selectedReason = reasons.find(r => r.value === formData.reasonID)?.label || "Other";
    const newDayOut = {
      id: Math.random().toString(36).substr(2, 9),
      date: moment(formData.date).format('DD-MM-YYYY'),
      fromTime: moment(formData.fromTime).format('hh:mm A'),
      toTime: moment(formData.toTime).format('hh:mm A'),
      reason: selectedReason + (formData.comment ? ` (${formData.comment})` : ''),
      status: 'Pending',
      isUrgent: formData.isUrgent,
    };

    Alert.alert("Request Sent", "Your Day Out request has been submitted successfully.", [
      { text: "OK", onPress: () => navigation.navigate('dayOut', { newDayOut }) }
    ]);
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({ type: [types.pdf] });
      setFormData({ ...formData, document: { ...res[0], isImage: false } });
      setUploadModalVisible(false);
    } catch (err) { if (!DocumentPicker.isCancel(err)) Alert.alert('Error picking PDF'); }
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (res) => {
      if (res.assets) {
        setFormData({ ...formData, document: { name: res.assets[0].fileName, uri: res.assets[0].uri, isImage: true } });
        setUploadModalVisible(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <HeaderWithTitle title="New Day Out Request" navigation={navigation} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Restriction Notes */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="information-outline" size={20} color={colors.blue} />
              <Text style={styles.infoText}>Note :- you're allowed to take day out between 9:00 AM and 6:00 PM</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="clock-alert-outline" size={20} color="#F44336" />
              <Text style={styles.infoText}>Note :- Dayout request for Today are not allowed after 5:55 PM</Text>
            </View>
          </View>

          <View style={styles.clayForm}>
            <Text style={styles.sectionLabel}>Schedule</Text>

            {/* Date Selection */}
            <TouchableOpacity style={styles.glassInput} onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.inputText, !dateSelected && {color: '#999'}]}>
                {dateSelected ? moment(formData.date).format('DD MMMM YYYY') : "Select Day Out Date"}
              </Text>
              <Icon name="calendar-month" size={22} color={colors.blue} />
            </TouchableOpacity>

            <View style={styles.timeRow}>
              <TouchableOpacity style={[styles.glassInput, {flex: 1, marginRight: 10}]} onPress={() => setShowFromPicker(true)}>
                <View>
                  <Text style={styles.miniLabel}>From Time</Text>
                  <Text style={styles.inputText}>{moment(formData.fromTime).format('hh:mm A')}</Text>
                </View>
                <Icon name="clock-start" size={20} color={colors.blue} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.glassInput, {flex: 1}]} onPress={() => setShowToPicker(true)}>
                <View>
                  <Text style={styles.miniLabel}>To Time</Text>
                  <Text style={styles.inputText}>{moment(formData.toTime).format('hh:mm A')}</Text>
                </View>
                <Icon name="clock-end" size={20} color={colors.blue} />
              </TouchableOpacity>
            </View>

            {/* Reason Grid */}
            <Text style={[styles.sectionLabel, {marginTop: 20}]}>Select Reason</Text>
            <View style={styles.reasonsGrid}>
              {reasons.map(r => (
                <TouchableOpacity
                  key={r.value}
                  onPress={() => setFormData({...formData, reasonID: r.value})}
                  style={[styles.reasonChip, formData.reasonID === r.value && styles.selectedChip]}
                >
                  <Text style={[styles.chipText, formData.reasonID === r.value && styles.selectedChipText]}>{r.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="Add additional comments (Optional)"
              multiline
              numberOfLines={3}
              value={formData.comment}
              onChangeText={(t) => setFormData({...formData, comment: t})}
            />

            <View style={styles.switchContainer}>
              <View>
                <Text style={styles.switchLabel}>Mark as Urgent</Text>
                <Text style={styles.switchSub}>Fast-track approval process</Text>
              </View>
              <Switch
                value={formData.isUrgent}
                onValueChange={(v) => setFormData({...formData, isUrgent: v, reasonID: ''})}
                trackColor={{ false: "#D1D9E6", true: colors.blue }}
                thumbColor="#fff"
              />
            </View>

            <TouchableOpacity style={styles.uploadClay} onPress={() => setUploadModalVisible(true)}>
              {formData.document?.isImage ? (
                <Image source={{uri: formData.document.uri}} style={styles.prev} />
              ) : (
                <Icon name={formData.document ? "file-pdf-box" : "cloud-upload-outline"} size={28} color={formData.document ? "#4CAF50" : colors.blue} />
              )}
              <Text style={[styles.uploadText, formData.document && {color: '#4CAF50'}]} numberOfLines={1}>
                {formData.document ? formData.document.name : "Supporting Document (Optional)"}
              </Text>
              {formData.document && (
                <Pressable onPress={() => setFormData({...formData, document: null})}><Icon name="close-circle" size={20} color="#F44336" /></Pressable>
              )}
            </TouchableOpacity>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelClay} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitClay, (!dateSelected || !formData.reasonID) && styles.disabledSubmit]}
                onPress={handleSendRequest}
                disabled={!dateSelected || !formData.reasonID}
              >
                <Text style={styles.submitText}>SUBMIT REQUEST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modals */}
      <DatePicker modal mode="date" open={showDatePicker} date={formData.date} minimumDate={new Date()} onConfirm={(d) => {setShowDatePicker(false); setFormData({...formData, date:d}); setDateSelected(true)}} onCancel={() => setShowDatePicker(false)} />
      <DatePicker modal mode="time" open={showFromPicker} date={formData.fromTime} onConfirm={(t) => {setShowFromPicker(false); setFormData({...formData, fromTime:t})}} onCancel={() => setShowFromPicker(false)} />
      <DatePicker modal mode="time" open={showToPicker} date={formData.toTime} onConfirm={(t) => {setShowToPicker(false); setFormData({...formData, toTime:t})}} onCancel={() => setShowToPicker(false)} />

      <Modal isVisible={isUploadModalVisible} onBackdropPress={() => setUploadModalVisible(false)} style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <Text style={styles.modalTitle}>Upload Proof</Text>
          <View style={styles.modalOptions}>
            <TouchableOpacity style={styles.modalOpt} onPress={takePhoto}><Icon name="camera-iris" size={40} color={colors.blue} /><Text style={styles.optLab}>Camera</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOpt} onPress={pickDocument}><Icon name="file-pdf-box" size={40} color="#F44336" /><Text style={styles.optLab}>PDF File</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F3F8' },
  bg: { width: '100%', height: '100%' },
  scrollContent: { paddingBottom: 50 },
  infoCard: { backgroundColor: '#fff', margin: 15, padding: 12, borderRadius: 15, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  infoText: { fontSize: 12, marginLeft: 8, color: '#666', fontWeight: '500' },
  clayForm: { backgroundColor: '#F0F3F8', margin: 15, padding: 20, borderRadius: 30, shadowColor: "#a3b1c6", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 1, shadowRadius: 20, elevation: 10, borderWidth: 1, borderColor: '#fff' },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 15 },
  glassInput: { backgroundColor: 'rgba(255,255,255,0.7)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#fff' },
  inputText: { fontSize: 15, color: colors.black, fontWeight: '500' },
  miniLabel: { fontSize: 10, color: '#888', marginBottom: 2 },
  timeRow: { flexDirection: 'row' },
  reasonsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  reasonChip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, backgroundColor: '#E0E5EC', marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#fff' },
  selectedChip: { backgroundColor: '#4CAF50' },
  chipText: { fontSize: 13, color: '#444', fontWeight: '600' },
  selectedChipText: { color: '#fff' },
  textArea: { backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, padding: 15, height: 80, textAlignVertical: 'top', marginTop: 10, borderWidth: 1, borderColor: '#fff' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, padding: 15, backgroundColor: '#E0E5EC', borderRadius: 20 },
  switchLabel: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  switchSub: { fontSize: 11, color: '#666' },
  uploadClay: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 20, backgroundColor: '#F0F3F8', borderStyle: 'dashed', borderWidth: 2, borderColor: colors.blue, marginBottom: 25 },
  uploadText: { flex: 1, marginLeft: 12, fontSize: 13, color: colors.blue, fontWeight: '600' },
  prev: { width: 30, height: 30, borderRadius: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelClay: { flex: 1, marginRight: 10, padding: 18, borderRadius: 25, backgroundColor: '#E0E5EC', alignItems: 'center', elevation: 4 },
  submitClay: { flex: 2, padding: 18, borderRadius: 25, backgroundColor: colors.blue, alignItems: 'center', elevation: 6 },
  disabledSubmit: { backgroundColor: '#BDBDBD', elevation: 0 },
  cancelText: { color: '#666', fontWeight: 'bold' },
  submitText: { color: '#fff', fontWeight: 'bold', letterSpacing: 1 },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: '#fff', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  handle: { width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  modalOptions: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 },
  modalOpt: { alignItems: 'center' },
  optLab: { marginTop: 10, fontWeight: '600', color: '#444' }
});

export default DayOutForm;
