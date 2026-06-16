import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fontSizes, fontWeights} from '../../styles';
import {backgroundImage} from '../../assets/images';
import {Button, HeaderWithTitle, DateTimePickerModal} from '../../components';
import {Picker} from '@react-native-picker/picker';
import CheckBox from 'react-native-check-box';

import styles from './styles';

const INT_DATA = [
  {label: 'Yes', value: 'yes'},
  {label: 'No', value: 'no'},
];

const SEC_DATA = [
  {label: 'Higher Studies', value: 'Higher Studies'},
  {label: 'Government Job', value: 'Government Job'},
  {label: 'Business', value: 'Business'},
  {label: 'Other', value: 'Other'},
];

const Concentformview = ({
  handlePress,
  academicDetails,
  navigation,
  isItemPickerModalVisible,
  toggleItemPickerModal,
  issecondItemPickerModalVisible,
  toggleSecondPicker,
}) => {
  const [selectedValue, setSelectedValue] = useState('Select');
  const [showInput, setShowInput] = useState(false);
  const [secondDropdownValue, setSecondDropdownValue] = useState('');
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [declaration, setDeclaration] = useState(false);

  const handleFirstDropdownChange = itemValue => {
    setSelectedValue(itemValue);
    setShowInput(itemValue === 'yes');
    setShowSecondDropdown(itemValue === 'no');
  };

  const handleFormSubmit = () => {
    if (!declaration) {
      alert('First accept the terms.');
      return;
    }
    if (selectedValue != '' && secondDropdownValue != '') {
      let data = {
        Interested_for_Placement: selectedValue,
        If_Not_Interested_for_Placement_OR_Reason_OR_AreaofInterest:
          secondDropdownValue,
        Declaration: declaration,
      };

      handlePress(data);
    } else {
      alert('Fill the form first');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Consent form" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputcontainer}>
            <Text style={styles.formheading}>Consent Form</Text>
            <View style={styles.inputitems}>
              <Text style={styles.labels}>Student Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                autoCapitalize="none"
                editable={false}
                value={academicDetails?.StudentName}
              />

              <Text style={styles.labels}>Father Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                autoCapitalize="none"
                value={academicDetails?.FatherName}
                editable={false}
              />
              <Text style={styles.labels}>Mother Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                autoCapitalize="none"
                value={academicDetails?.MotherName}
                editable={false}
              />
              <Text style={styles.labels}>Enrollment No.</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder="Enrollment No."
                autoCapitalize="none"
                value={academicDetails?.RegNo}
                editable={false}
              />

              <Text style={styles.labels}>Programme</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                autoCapitalize="none"
                value={academicDetails?.CourseName}
                editable={false}
              />

              <Text style={styles.labels}>Intersted For Placement</Text>
              {isItemPickerModalVisible && (
                <DateTimePickerModal
                  isItemPickerModalVisible={isItemPickerModalVisible}
                  data={INT_DATA}
                  onCloseItemPickerModal={toggleItemPickerModal}
                  onItemChange={handleFirstDropdownChange}
                />
              )}

              <Pressable
                onPress={toggleItemPickerModal}
                style={styles.pickerInput}>
                <Text style={styles.text}>{selectedValue}</Text>
                {/* style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  placeholder=""
                  autoCapitalize="none"
                  value={selectedValue}
                  editable={false}
                  showSoftInputOnFocus={false} */}
              </Pressable>
              {/* 
              <Picker
                selectedValue={selectedValue}
                onValueChange={handleFirstDropdownChange}>
                <Picker.Item
                  label="Select"
                  value="select"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label="Yes"
                  value="yes"
                  style={styles.pickerItem}
                />
                <Picker.Item label="No" value="no" style={styles.pickerItem} />
              </Picker> */}

              {showInput && (
                <View style={{marginTop: 10}}>
                  <Text style={styles.labels}>Area of Interest:</Text>
                  <TextInput
                    placeholder=""
                    style={styles.input}
                    onChangeText={e => setSecondDropdownValue(e)}
                  />
                </View>
              )}

              {showSecondDropdown && (
                <View style={{marginTop: 10}}>
                  <Text style={styles.notInterested}>
                    If Not Interested for Placement:
                  </Text>
                  {issecondItemPickerModalVisible && (
                    <DateTimePickerModal
                      isItemPickerModalVisible={issecondItemPickerModalVisible}
                      data={SEC_DATA}
                      onCloseItemPickerModal={toggleSecondPicker}
                      onItemChange={setSecondDropdownValue}
                    />
                  )}

                  <Pressable
                    onPress={toggleSecondPicker}
                    style={styles.pickerInput}>
                    <Text style={styles.text}>{secondDropdownValue}</Text>

                    {/* <TextInput
                      style={styles.input}
                      placeholderTextColor={colors.placeholder}
                      placeholder=""
                      autoCapitalize="none"
                      value={secondDropdownValue}
                      editable={false}
                    /> */}
                  </Pressable>
                  {/* <Picker
                    selectedValue={secondDropdownValue}
                    onValueChange={itemValue =>
                      setSecondDropdownValue(itemValue)
                    }>
                    <Picker.Item
                      label="Higher Studies"
                      value="Higher Studies"
                      style={styles.pickerItem}
                    />
                    <Picker.Item
                      label="Government Job"
                      value="Government Job"
                      style={styles.pickerItem}
                    />
                    <Picker.Item
                      label="Business"
                      value="Business"
                      style={styles.pickerItem}
                    />
                    <Picker.Item
                      label="Other"
                      value="Other"
                      style={styles.pickerItem}
                    />
                  </Picker> */}
                </View>
              )}
            </View>
            <View style={{marginTop: 25}}>
              <CheckBox
                isChecked={declaration}
                onClick={() => setDeclaration(!declaration)}
                rightText={
                  'I have read the above, understand it, and agree to it.'
                }
                rightTextStyle={styles.pickerItem}
              />
            </View>

            <Button title="Submit" onPress={handleFormSubmit} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Concentformview;
