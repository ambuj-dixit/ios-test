import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {backgroundImage} from '../../assets/images';
import CheckBox from 'react-native-check-box';
import {colors} from '../../styles';
import {HeaderWithTitle} from '../../components';
import styles from './styles';
import {globalConstants} from '../../constants';

const {courseRegistration} = globalConstants.default;

const CourceregistrationView = ({
  StudentName_IN_Hindi,
  setCheckbox1,
  registrationDetails,
  checkbox1,
  courseRegistrationData,
  FacebookID,
  navigation,
  setMobileNo,
  setDataForInput,
  handleToggle,
  inputLabels,
  onSave,
}) => {
  const isSelected = SubjectCode => {
    return checkbox1.includes(SubjectCode);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Course Registration" navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputcontainer}>
            <View style={styles.innerHeading}>
              <Text style={styles.formheading}>Registration Details</Text>
              <View style={styles.btncontain}>
                <TouchableOpacity
                  style={styles.btnChangepassword}
                  onPress={onSave}>
                  <Text style={styles.btnChangepasswordtext}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnReset}>
                  <Text style={styles.btnChangepasswordtext}>Print</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputitems}>
              {inputLabels.map(eachItem => (
                <View key={eachItem.elementName}>
                  <Text style={styles.labels}>
                    {courseRegistration.inputLabels[eachItem.elementName]}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.placeholder}
                    // placeholder="2303482"
                    editable={eachItem.isEditable ?? false}
                    value={registrationDetails[eachItem.elementName]}
                    autoCapitalize="none"
                    onChangeText={text => {
                      setDataForInput(text, eachItem.elementName);
                    }}
                  />
                </View>
              ))}
            </View>

            <View style={styles.cardsection}>
              <Text style={styles.cardheading} />
              {courseRegistrationData?.course_subjects.map(course => (
                <Pressable
                  style={styles.card}
                  key={course.SubjectCode}
                  onPress={() => handleToggle(course?.SubjectCode)}>
                  <View style={styles.checkbox}>
                    <CheckBox
                      isChecked={isSelected(course?.SubjectCode)}
                      onClick={() => handleToggle(course?.SubjectCode)}
                    />
                  </View>
                  <View style={styles.leftitems}>
                    <View>
                      <Text style={styles.nameheading}>Subject Name</Text>
                      <Text style={styles.name}>{course.SubjectName}</Text>
                    </View>
                    <View>
                      <Text style={styles.nameheading}>Subject Code</Text>
                      <Text style={styles.name}>{course.SubjectCode}</Text>
                    </View>
                  </View>
                  <View style={styles.rightitems}>
                    <View>
                      <Text style={styles.nameheading}>Subject Type</Text>
                      <Text style={styles.name}>{course.SubjectCatType}</Text>
                    </View>
                    <View>
                      <Text style={styles.nameheading}>Credit</Text>
                      <Text style={styles.name}>{course.Credit}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default CourceregistrationView;
