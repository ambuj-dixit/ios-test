import {Text, View, Pressable, RefreshControl, Modal} from 'react-native';
import CheckBox from 'react-native-check-box';
import React from 'react';

import styles from '../styles';
import {Button, HeaderWithTitle} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {indent} from '../../../styles/dimensions';

const FeedetailView = ({
  feeDetail,
  navigation,
  closeModal,
  selectedVoucher,
  selectedReceipts,
  handleCheckBox,
  modalVisible,
  onRefresh,
  handleVoucherView,
  studentFeeHeadVoucharDetail,
}) => {
  const handleFeePay = () => {
    if (!['', null, undefined].includes(selectedVoucher)) {
      navigation.navigate('paymentForm', {voucher: selectedVoucher});
    } else {
      alert('First select the voucher');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={false} />
        }>
        <View style={styles.parent}>
          <View style={styles.feecards}>
            <Feecard
              shorttitle="Due"
              bigtitle={feeDetail?.feeDueDetail?.TotalDueAmount ?? 0}
              // customStyle={styles.due}
            />
            <Feecard
              shorttitle="Paid"
              bigtitle={feeDetail?.feeDueDetail?.TotalPaidAmount ?? 0}
              // customStyle={styles.paid}
            />
            <Feecard
              shorttitle="Scholarship"
              bigtitle={feeDetail?.feeDueDetail?.TotalScholorshipAmount ?? 0}
              // customStyle={styles.scholarship}
            />
            <Feecard
              shorttitle="Balance"
              bigtitle={feeDetail?.feeDueDetail?.TotalBalanceAmount ?? 0}
              // customStyle={styles.balance}
            />
          </View>

          {/* Reciept Details start */}

          {feeDetail?.voucherDetail && feeDetail?.voucherDetail?.length > 0 ? (
            <View style={styles.cardsection}>
              <Text style={styles.cardheading}>Voucher No. </Text>

              {feeDetail?.voucherDetail?.map(itm => (
                <Pressable
                  style={[
                    styles.receiptCard,
                    styles.shadowProp,
                    {
                      backgroundColor:
                        selectedVoucher === itm?.VoucherNo
                          ? colors.blue
                          : colors.white,
                    },
                  ]}
                  key={itm?.VNo}
                  onPress={() => handleCheckBox(itm?.VoucherNo, 'voucher')}>
                  <View style={styles.cardInfo}>
                    <CheckBox
                      isChecked={
                        selectedVoucher === itm?.VoucherNo ? true : false
                      }
                      checkBoxColor={
                        selectedVoucher === itm?.VoucherNo
                          ? colors.white
                          : colors.blue
                      }
                      onClick={() => handleCheckBox(itm?.VoucherNo, 'voucher')}
                    />

                    <Text
                      style={[
                        styles.name,
                        {
                          color:
                            selectedVoucher === itm?.VoucherNo
                              ? colors.white
                              : colors.blue,
                        },
                      ]}>
                      {' '}
                      {itm?.VNo}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.viewButton}
                    onPress={() => handleVoucherView(itm)}>
                    <Icon
                      name="information-circle-outline"
                      color={
                        selectedVoucher === itm?.VoucherNo
                          ? colors.white
                          : colors.blue
                      }
                      size={indent * 1.5}
                    />
                  </Pressable>
                </Pressable>
              ))}
              <Button title={'Pay Fee'} onPress={handleFeePay} />
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* {"BalanceAmount": "0", "FeeHeadName": "Exam Fee", "PaidAmount": "10000", 
      "TotalAmount": "10000", "VoucherNo": "230601-3", "scholarship_amt": "0"} */}
      {modalVisible && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalRoot}>
            <View style={styles.mainContainer}>
              <Pressable style={styles.modalHeader} onPress={closeModal}>
                <Text style={styles.helperText}>Voucher Detail</Text>
                <Text style={styles.closeText}>X</Text>
              </Pressable>

              <View style={styles.modalBody}>
                <ScrollView persistentScrollbar={true}>
                  {studentFeeHeadVoucharDetail?.data?.length > 0
                    ? studentFeeHeadVoucharDetail.data.map(item => (
                        <View
                          key={item.FeeHeadName}
                          style={[styles.voucherItem]}>
                          <Text style={styles.FeeHeadName}>
                            {item.FeeHeadName}
                          </Text>
                          <View style={styles.modalInfoRow}>
                            <Text>Balance Amount : </Text>
                            <Text>₹{item.BalanceAmount}</Text>
                          </View>
                          <View style={styles.modalInfoRow}>
                            <Text>Paid Amount : </Text>
                            <Text>₹{item.PaidAmount}</Text>
                          </View>
                          <View style={styles.modalInfoRow}>
                            <Text>Total Amount : </Text>
                            <Text>₹{item.TotalAmount}</Text>
                          </View>
                          <View style={styles.modalInfoRow}>
                            <Text>Scholarship Amount : </Text>
                            <Text>₹{item.scholarship_amt}</Text>
                          </View>
                        </View>
                      ))
                    : null}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const Feecard = ({shorttitle, bigtitle, customStyle}) => (
  <View style={[styles.feecarditem, customStyle, styles.shadowProp]}>
    <Text style={styles.shorttitle}>{shorttitle}</Text>
    <Text style={styles.bigtitle}>{bigtitle}</Text>
  </View>
);

export default FeedetailView;
