import {
  ImageBackground,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {Button, HeaderWithTitle} from '../../components';
import React from 'react';
import {backgroundImage} from '../../assets/images';

const CodensedFormFeeView = ({
  navigation,
  inputFields,
  academicDetails,
  subjectDetail,
  SubjectCard,
  paymentStatus,
  payCondensedFees,
  handlePrint,
  onCheckBoxChange,
  receiptNo,
  handlereceiptPrint,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Condensed Form" navigation={navigation} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainview}>
            <View style={styles.inputContainer}>
              {inputFields.map(eachField => (
                <View key={eachField.label}>
                  <Text style={styles.inputLabel}>{eachField.label}</Text>
                  <TextInput
                    value={academicDetails[eachField.key]}
                    style={styles.input}
                    editable={false}
                  />
                </View>
              ))}
            </View>

            {paymentStatus !== 'Not Paid Yet' ? (
              <>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, styles.sectionLabel]}>
                    Subject List
                  </Text>
                  {subjectDetail?.length > 0 && (
                    <FlatList
                      data={subjectDetail}
                      renderItem={({item}) => (
                        <SubjectCard
                          item={item}
                          showCheckbox={true}
                          onCheckBoxChange={onCheckBoxChange}
                        />
                      )}
                      keyExtractor={item => item.SubjectID}
                    />
                  )}
                </View>
                <Button
                  buttonStyle={styles.printButton}
                  title="Print Form Details"
                  onPress={handlePrint}
                />
                {receiptNo && (
                  <Button
                    buttonStyle={styles.receiptNo}
                    title={`Download Receipt (No. ${receiptNo})`}
                    onPress={handlereceiptPrint}
                  />
                )}
              </>
            ) : (
              <Button title="Pay Fee" onPress={payCondensedFees} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default CodensedFormFeeView;
