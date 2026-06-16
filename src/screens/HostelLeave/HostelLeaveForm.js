import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Switch, ImageBackground, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderWithTitle } from '../../components';
import { backgroundImage } from '../../assets/images';
import { colors } from '../../styles';
import { indent, halfIndent } from '../../styles/dimensions';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../../services';
import { showLoader, hideLoader } from '../../components/appLoader';
import DocumentPicker, { types } from 'react-native-document-picker';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const HostelLeaveForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    leaveFor: '', // ID of the selected reason
    reasonDetail: '', // Manual text reason
    isUrgent: false,
    document: null,
    agreed: false
  });

  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);

  const [reasons, setReasons] = useState([]);
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);

  useEffect(() => {
    fetchReasons();
  }, [formData.isUrgent]);

  const fetchReasons = () => {
    showLoader();
    const urgentFlag = formData.isUrgent ? 'yes' : 'no';
    const url = `GetLeaveReason?LeaveType=leave&Urgent=${urgentFlag}`;

    API.get(url)
      .then(res => {
        if (res.data && Array.isArray(res.data.Data)) {
          const formattedReasons = res.data.Data.map(item => ({
            label: item.LeaveReason,
            value: item.ID
          }));
          setReasons(formattedReasons);
        } else {
          setReasons([]);
        }
        hideLoader();
      })
      .catch(err => {
        console.error('Error fetching reasons:', err);
        hideLoader();
      });
  };

  const handleSelectReason = (id) => {
    setFormData({ ...formData, leaveFor: id });
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.pdf],
      });
      setFormData({ ...formData, document: res[0] });
      setUploadModalVisible(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Unknown error: ' + JSON.stringify(err));
      }
    }
  };

  const isFormValid = isStartDateSelected &&
                    isEndDateSelected &&
                    (formData.leaveFor || formData.reasonDetail.trim() !== '') &&
                    formData.agreed;

  const handleSendRequest = () => {
    const selectedReasonLabel = reasons.find(r => r.value === formData.leaveFor)?.label || "Other";

    const newLeaveData = {
      id: Math.random().toString(36).substr(2, 9),
      startDate: moment(formData.startDate).format('DD-MM-YYYY'),
      endDate: moment(formData.endDate).format('DD-MM-YYYY'),
      reason: formData.leaveFor === '14' || !formData.leaveFor ? formData.reasonDetail : selectedReasonLabel,
      status: 'Pending',
      isUrgent: formData.isUrgent,
    };

    Alert.alert(
      "Request Sent",
      "Your leave request has been submitted and sent to your parent's WhatsApp for consent.",
      [{
        text: "OK",
        onPress: () => navigation.navigate('hostelLeave', { newLeave: newLeaveData })
      }]
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <HeaderWithTitle title="Apply for Leave" navigation={navigation} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formCard}>

            {/* Dates Section */}
            <View style={styles.section}>
               <Text style={styles.label}>Start Date</Text>
               <TouchableOpacity
                 style={styles.dateSelector}
                 onPress={() => setOpenStartPicker(true)}
               >
                  <Text style={[styles.dateTextValue, !isStartDateSelected && {color: colors.black3}]}>
                    {isStartDateSelected ? moment(formData.startDate).format('DD-MM-YYYY') : "Select Start Date"}
                  </Text>
                  <Icon name="calendar-range" size={20} color={colors.blue} />
               </TouchableOpacity>

               <Text style={styles.label}>End Date</Text>
               <TouchableOpacity
                 style={styles.dateSelector}
                 onPress={() => setOpenEndPicker(true)}
               >
                  <Text style={[styles.dateTextValue, !isEndDateSelected && {color: colors.black3}]}>
                    {isEndDateSelected ? moment(formData.endDate).format('DD-MM-YYYY') : "Select End Date"}
                  </Text>
                  <Icon name="calendar-range" size={20} color={colors.blue} />
               </TouchableOpacity>

               <DatePicker
                 modal
                 open={openStartPicker}
                 date={formData.startDate}
                 mode="date"
                 onConfirm={(date) => {
                   setOpenStartPicker(false);
                   setFormData({ ...formData, startDate: date });
                   setIsStartDateSelected(true);
                 }}
                 onCancel={() => {
                   setOpenStartPicker(false);
                 }}
               />

               <DatePicker
                 modal
                 open={openEndPicker}
                 date={formData.endDate}
                 mode="date"
                 minimumDate={formData.startDate}
                 onConfirm={(date) => {
                   setOpenEndPicker(false);
                   setFormData({ ...formData, endDate: date });
                   setIsEndDateSelected(true);
                 }}
                 onCancel={() => {
                   setOpenEndPicker(false);
                 }}
               />
            </View>

            {/* Urgent Switch */}
            <View style={styles.switchRow}>
              <View>
                <Text style={styles.label}>Mark as Urgent</Text>
                <Text style={styles.subLabel}>Higher priority for processing</Text>
              </View>
              <Switch
                value={formData.isUrgent}
                onValueChange={(val) => setFormData({...formData, isUrgent: val, leaveFor: ''})}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor={formData.isUrgent ? colors.white : "#f4f3f4"}
              />
            </View>

            {/* Reasons Selection Box */}
            <Text style={styles.label}>Select Reason</Text>
            <View style={styles.reasonsContainer}>
              {reasons.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  activeOpacity={0.7}
                  onPress={() => handleSelectReason(item.value)}
                  style={[
                    styles.reasonChip,
                    formData.leaveFor === item.value && styles.selectedReasonChip
                  ]}
                >
                  <Text style={[
                    styles.reasonText,
                    formData.leaveFor === item.value && styles.selectedReasonText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Manual Reason Entry */}
            <Text style={[styles.label, { marginTop: 10 }]}>Other / Detailed Reason</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="If your reason is different or you want to provide details, write here..."
              multiline
              numberOfLines={4}
              value={formData.reasonDetail}
              onChangeText={(txt) => setFormData({...formData, reasonDetail: txt})}
              placeholderTextColor={colors.black3}
            />

            {/* Document Upload */}
            <Pressable style={styles.uploadBtn} onPress={() => setUploadModalVisible(true)}>
              <Icon name={formData.document ? "file-pdf-box" : "file-upload-outline"} size={24} color={formData.document ? "#4CAF50" : colors.blue} />
              <Text style={[styles.uploadText, formData.document && { color: '#4CAF50' }]}>
                {formData.document ? formData.document.name : "Upload Supporting Document (Optional)"}
              </Text>
              {formData.document && (
                <Pressable onPress={() => setFormData({...formData, document: null})} style={styles.removeDoc}>
                   <Icon name="close-circle" size={20} color={colors.red} />
                </Pressable>
              )}
            </Pressable>

            <View style={styles.whatsappNote}>
              <Icon name="whatsapp" size={24} color="#25D366" />
              <Text style={styles.noteText}>This request would go to your parent's WhatsApp for the consent approval.</Text>
            </View>

            <View style={styles.checkRow}>
              <CheckBox
                value={formData.agreed}
                onValueChange={(val) => setFormData({...formData, agreed: val})}
                tintColors={{ true: "#4CAF50", false: colors.black3 }}
              />
              <Text style={styles.checkText}>I agree with the hostel leave terms and conditions</Text>
            </View>

            <Pressable
              disabled={!isFormValid}
              style={[styles.submitBtn, !isFormValid && styles.disabledBtn]}
              onPress={handleSendRequest}
            >
              <Text style={styles.submitBtnText}>SEND FOR APPROVAL</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Themed Upload Modal */}
      <Modal
        isVisible={isUploadModalVisible}
        onBackdropPress={() => setUploadModalVisible(false)}
        style={styles.modalBottom}
        backdropOpacity={0.4}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Upload Document</Text>
          <Text style={styles.modalSubTitle}>Select a PDF file from your device storage</Text>

          <TouchableOpacity style={styles.modalOption} onPress={pickDocument}>
            <View style={[styles.optionIcon, { backgroundColor: '#E3F2FD' }]}>
               <Icon name="file-pdf-box" size={28} color="#F44336" />
            </View>
            <View style={styles.optionTextContainer}>
               <Text style={styles.optionTitle}>Select PDF Document</Text>
               <Text style={styles.optionDesc}>Browse your local storage for documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => setUploadModalVisible(false)}>
             <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { width: '100%', height: '100%' },
  scrollContent: { paddingBottom: 30 },
  formCard: { backgroundColor: colors.white, margin: indent, padding: indent, borderRadius: 12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  section: { marginBottom: 10 },
  label: { fontSize: 14, color: colors.black, marginBottom: 8, fontWeight: 'bold' },
  subLabel: { fontSize: 11, color: colors.black3, marginTop: -4, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, marginBottom: 15, color: colors.black, fontSize: 14 },
  dateSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff' },
  dateTextValue: { fontSize: 14, color: colors.black },
  textArea: { height: 80, textAlignVertical: 'top' },

  // Reasons Selection Styles
  reasonsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  reasonChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  selectedReasonChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    elevation: 3,
  },
  reasonText: { fontSize: 13, color: colors.black },
  selectedReasonText: { color: colors.white, fontWeight: 'bold' },

  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  uploadBtn: { flexDirection: 'row', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: colors.blue, padding: 15, borderRadius: 8, justifyContent: 'center', marginBottom: 20, backgroundColor: '#F4F7FF', position: 'relative' },
  uploadText: { color: colors.blue, marginLeft: 10, fontWeight: '600', fontSize: 13, flex: 1 },
  removeDoc: { padding: 5 },

  whatsappNote: { flexDirection: 'row', backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  noteText: { flex: 1, marginLeft: 10, fontSize: 12, color: '#2E7D32', lineHeight: 18 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  checkText: { flex: 1, marginLeft: 10, color: colors.black, fontSize: 13 },
  submitBtn: { backgroundColor: colors.blue, padding: 16, borderRadius: 8, alignItems: 'center', elevation: 2 },
  disabledBtn: { backgroundColor: '#BDBDBD' },
  submitBtnText: { color: colors.white, fontWeight: 'bold', fontSize: 15, letterSpacing: 1 },

  // Modal Styles
  modalBottom: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: colors.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' },
  modalHandle: { width: 40, height: 5, backgroundColor: '#E0E0E0', borderRadius: 3, marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 5 },
  modalSubTitle: { fontSize: 13, color: colors.black3, marginBottom: 20 },
  modalOption: { flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15, backgroundColor: '#F9F9F9', borderRadius: 12, marginBottom: 15 },
  optionIcon: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  optionTextContainer: { marginLeft: 15, flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.black },
  optionDesc: { fontSize: 12, color: colors.black3 },
  cancelBtn: { padding: 15, width: '100%', alignItems: 'center' },
  cancelText: { fontSize: 16, color: colors.red, fontWeight: 'bold' }
});

export default HostelLeaveForm;
