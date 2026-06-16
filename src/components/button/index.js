import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const Button = ({title, onPress, buttonStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
