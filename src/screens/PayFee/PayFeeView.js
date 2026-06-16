import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {styles} from './styles';
import {Button, HeaderWithTitle} from '../../components';
import {colors} from '../../styles';

const PayFeeView = ({
  data,
  feeDetail,
  navigation,
  userDetails,
  amount,
  handleUpdate,
  error,
  handlePay,
  isPay,
}) => {
  return (
    <View>
      <HeaderWithTitle title="Transaction summary" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Registration No.</Text>
          </View>
          <View>
            <Text style={styles.text}>{userDetails?.RegNo}</Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Student Name</Text>
          </View>
          <View>
            <Text style={styles.text}>{userDetails?.StudentName}</Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Balance Amount</Text>
          </View>
          <View>
            <Text style={styles.text}>{amount ?? 0}</Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Amount Pay</Text>
          </View>
          <View>
            <TextInput
              placeholder={`Greater than  0 Less than ${amount}`}
              placeholderTextColor={colors.placeholder}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={e => handleUpdate('amount', e)}
              value={data?.amount}
            />
          </View>
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Processing Charges</Text>
          </View>
          <View>
            <TextInput
              placeholder={`Processing Fee`}
              placeholderTextColor={colors.placeholder}
              style={styles.input}
              editable={false}
              value={'0'}
            />
          </View>
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Total Amount</Text>
          </View>
          <View>
            <TextInput
              placeholder={`Total Amount`}
              placeholderTextColor={colors.placeholder}
              style={styles.input}
              editable={false}
              value={data?.amount}
            />
          </View>
        </View>
        {error ? (
          <View style={styles.flexRow}>
            <Text style={styles.errorMsg}>* {error}</Text>
          </View>
        ) : null}

        <Text style={styles.redText}>
          Note - Please do not close app or refresh page while making payment
        </Text>

        <View>
          <Button title="Pay Now" onPress={handlePay} />
        </View>
      </View>
    </View>
  );
};

export default PayFeeView;
