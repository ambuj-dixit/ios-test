import {Text, View, Image, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {} from '../../assets/images';
import {Button, HeaderWithTitle} from '../../components';
import {colors} from '../../styles';

import styles from './styles';

const GatePassRequestView = ({navigation, academicDetails, handleDownload}) => {
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <HeaderWithTitle title="Gate Pass Request" navigation={navigation} />

      <View style={styles.container}>
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
          placeholder="Programme Name"
          autoCapitalize="none"
          value={academicDetails?.CourseName}
          editable={false}
        />
        <Button title="Download Gate Pass" onPress={handleDownload} />
      </View>
    </ScrollView>
  );
};

export default GatePassRequestView;
