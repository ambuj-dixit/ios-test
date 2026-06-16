import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import React from 'react';
import {backgroundImage, userWallet} from '../../../assets/images';

import styles from '../styles';
import {Button, HeaderWithTitle} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../../styles';

const FeedetailView = ({
  feeDetail,
  handlePress,
  selectedVoucher,
  selectedReceipts,
  handleSummaryPrint,
  onRefresh,
  refreshing,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.cardheading}>Previous Payment Details</Text>
        <View style={styles.scrollParent}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }>
            {feeDetail?.prevTransactionDetail?.length > 0 ? (
              feeDetail?.prevTransactionDetail?.map((itm, idx) => (
                <View style={styles.cardMain} key={idx}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {itm['PaymentMode'] ?? ''}
                      </Text>
                    </View>

                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {itm['PaymentAmount'] ?? ''}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    {itm['DDNo/Cheque'] ? (
                      <View style={styles.leftCard}>
                        <Text style={{fontSize: 12, color: colors.placeholder}}>
                          DD/Cheque No.
                        </Text>
                        <Text style={styles.infoText}>
                          {itm['DDNo/Cheque'] ?? ''}
                        </Text>
                      </View>
                    ) : null}

                    <View style={{}}>
                      <Text style={{fontSize: 12, color: colors.placeholder}}>
                        Entry date
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {itm['EntryDate'] ?? ''}
                      </Text>
                    </View>

                    <View
                      style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.placeholder,
                          textAlign: 'right',
                        }}>
                        Txn date
                      </Text>
                      <Text style={{fontSize: 12, textAlign: 'right'}}>
                        {itm['TransactionDate'] ?? ''}
                      </Text>
                    </View>
                  </View>
                  {/* 
                  <View style={styles.card}>
                    <Text style={styles.nameheading}>Sr no</Text>
                    <Text style={styles.name}>{idx + 1}</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.nameheading}>Payment Mode</Text>
                    <Text style={styles.name}>
                      {itm['PaymentMode'] ?? ''}
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.nameheading}>Amount</Text>
                    <Text style={styles.name}>
                      {itm['PaymentAmount'] ?? ''}
                    </Text>
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.nameheading}>DD/Cheque Detail</Text>
                    <Text style={styles.name}>
                      {itm['DDNo/Cheque'] ?? ''}
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.nameheading}>Transaction Data</Text>
                    <Text style={styles.name}>
                      {itm['TransactionDate'] ?? ''}
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.nameheading}>Entry date</Text>
                    <Text style={styles.name}>{itm['EntryDate'] ?? ''}</Text>
                  </View> */}
                </View>
              ))
            ) : (
              <Text style={{textAlign: 'center', paddingVertical: 20}}>
                No Record Found
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.btncontain}>
          <Button
            title="Print Summary"
            buttonStyle={styles.printButtonStudent}
            onPress={() => handleSummaryPrint('students')}
          />

          <Button
            title="Print Summary for students"
            buttonStyle={styles.printButtonStudent}
            onPress={() => handleSummaryPrint()}
          />
        </View>
      </View>
    </View>
  );
};

export default FeedetailView;
