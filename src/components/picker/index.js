import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal, Text, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

const DateTimePickerModal = ({
  data,
  onCloseItemPickerModal,
  onItemChange,
  isItemPickerModalVisible,
  selectedValue,
}) => (
  <Modal
    transparent={true}
    animationType="none"
    statusBarTranslucent
    onRequestClose={onCloseItemPickerModal}
    visible={isItemPickerModalVisible}>
    <View style={styles.modalBackground}>
      {data.map(item => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              onItemChange(item.value);
              onCloseItemPickerModal();
            }}
            key={item.label}>
            <View style={styles.pickerItem}>
              <Text style={styles.pickerText}>{item.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  </Modal>
);

DateTimePickerModal.propTypes = {
  data: PropTypes.array,
  onCloseItemPickerModal: PropTypes.func,
  onItemChange: PropTypes.func,
  isItemPickerModalVisible: PropTypes.bool,
  selectedValue: PropTypes.string,
};

export default DateTimePickerModal;
