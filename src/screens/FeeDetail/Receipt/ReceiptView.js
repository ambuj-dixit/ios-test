import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import React from 'react';
import {backgroundImage, downloadReceipt} from '../../../assets/images';

import styles from '../styles';
import {Button, HeaderWithTitle} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../../styles';

const FeedetailView = ({
  feeDetail,
  navigation,
  handlePress,
  handlePrint,
  selectedReceipts,
  handleCheckBox,
  handleSummaryPrint,
  setfeeReceiptValue,
  feeReceiptValue,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.parent}>
          <Text style={styles.cardheading}>Receipt Details</Text>
          <View style={styles.receiptCard}>
            <View style={styles.leftitems}>
              <View>
                <Text style={styles.nameheading}>Sr. No.</Text>
              </View>
            </View>
            <View style={styles.rightitems}>
              <View>
                <Text style={styles.nameheading}>Receipt No.</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.nameheading}>Download</Text>
              </View>
            </View>
          </View>
          {feeDetail?.receiptDetail?.length > 0 ? (
            feeDetail?.receiptDetail?.map((itm, idx) => (
              <Pressable
                style={styles.receiptCard}
                key={idx}
                onPress={() => handlePrint(itm?.PRNO)}>
                <View style={styles.leftitems}>
                  <Text>{idx + 1}.</Text>
                </View>

                <View style={styles.rightitems}>
                  <Text style={[styles.name, {color: colors.black}]}>
                    {itm?.PRNO}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handlePrint(itm?.PRNO)}>
                  <Image
                    source={downloadReceipt}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </Pressable>
            ))
          ) : (
            <Text style={{textAlign: 'center', paddingVertical: 20}}>
              No Record Found
            </Text>
          )}
        </View>

        {/* <View style={styles.btncontain}>
        
          <Button
            onPress={handlePress}
            title="Print"
            buttonStyle={styles.printButton}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default FeedetailView;
