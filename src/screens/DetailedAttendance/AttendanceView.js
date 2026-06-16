import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import styles from './styles';

import {colors} from '../../styles';

import {backgroundImage} from '../../assets/images';
import {HeaderWithTitle} from '../../components';

import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {indent} from '../../styles/dimensions';

const AttedanceView = ({
  togglePopup,
  navigation,
  setDataForPopup,
  markedDates,
  open,
  currentdata,
  setOpen,
  subjectcode,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle
          title="Subject Wise Attendance"
          navigation={navigation}
        />
        <View style={styles.mainview}>
          {subjectcode && (
            <Text style={styles.subjectcode}>Subject Code - {subjectcode}</Text>
          )}
          <Calendar
            onDayPress={day => {
              setDataForPopup(day);
            }}
            style={{
              marginHorizontal: 10,
              borderRadius: 5,
            }}
            theme={{
              arrowColor: colors.blue,
              selectedDayBackgroundColor: colors.blue,
            }}
            maxDate={new Date().toString()}
            markedDates={markedDates}
            markingType="multi-dot"
          />
        </View>
        {/* <Tooltip
          visible={open}
          onClose={() => {
            setOpen(false);
          }}
          withPointer={true}
          popover={<Text>no caret!</Text>}
        /> */}

        <Modal
          isVisible={open}
          animationIn="fadeInUpBig"
          onBackdropPress={togglePopup}
          animationOut="fadeOutDownBig">
          <View style={styles.popupView}>
            {currentdata && (
              <View>
                <View style={styles.popheader}>
                  <Text style={styles.dateHeader}>{currentdata.date}</Text>
                  <Icon
                    name="close-circle"
                    color={colors.blue}
                    size={indent * 2.5}
                    style={styles.icon}
                    onPress={togglePopup}
                  />
                </View>
                <View style={styles.popupDataView}>
                  <Text style={styles.presentdata}>Total Lectures</Text>
                  <Text style={styles.presentdata}>{currentdata.total}</Text>
                </View>

                <View style={styles.popupDataView}>
                  <Text style={styles.presentdata}>Present</Text>
                  <Text style={styles.presentdata}>{currentdata.present}</Text>
                </View>
                <View
                  style={[
                    styles.popupDataView,
                    {
                      marginBottom: indent,
                    },
                  ]}>
                  <Text style={styles.presentdata}>Absent</Text>
                  <Text style={styles.presentdata}>{currentdata.absent}</Text>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default AttedanceView;
