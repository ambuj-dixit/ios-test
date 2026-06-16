import React from 'react';
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import { backgroundImage, TransportImage } from '../../assets/images';
import { HeaderWithTitle, Button } from '../../components';
import styles from './styles';
import { formatDate } from '../../utils/commonFunctions';

const TransportCardView = ({ transportDetails, feesDetails, navigation, handlePress }) => {

  if (!transportDetails) {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={backgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.imageContainer}>
            <Image source={TransportImage} style={styles.profileImage} resizeMode="contain" />
            <Text style={styles.Detailnotfound}>No Transport Details Found</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={{ width: '100%', height: '100%' }}
      >
        <HeaderWithTitle title="Transport Details" navigation={navigation} />
        <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
          <Text style={styles.infocardHeading}>Transport Fee Details</Text>
          <View style={styles.rowContainer}>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Due</Text>
              <Text style={styles.infoinput}>{feesDetails?.Total_Due}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Paid</Text>
              <Text style={styles.infoinput}>{feesDetails?.Total_Paid}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Balance</Text>
              <Text style={styles.infoinput}>{feesDetails?.Balance_Amount}</Text>
            </View>
          </View>
          <Text style={styles.infocardHeading}>Transport Details</Text>
          <View style={styles.transportDetails}>
            <View style={[styles.rowContainer1, { marginTop: 20 }]}>
              <Text style={styles.infoheading1}>Student Name</Text>
              <Text style={styles.infoheading1}>Vehicle Number</Text>
              <Text style={styles.infoheading1}>Pickup Point</Text>
            </View>
            <View style={styles.rowContainer1}>
              <Text style={styles.infoinput1}>
                {transportDetails?.StudentName}
              </Text>
              <Text style={styles.infoinput1}>{transportDetails?.Vehical_No}</Text>
              <Text style={styles.infoinput1}>{transportDetails?.Route_Name}</Text>
            </View>
            <View style={[styles.rowContainer1, { marginTop: 20 }]}>
              <Text style={styles.infoheading1}>Valid From</Text>
              <Text style={styles.infoheading1}>Valid To</Text>
              <Text style={styles.infoheading1}>Pickup Time</Text>
            </View>
            <View style={styles.rowContainer1}>
              <Text style={styles.infoinput1}> {formatDate(transportDetails?.Valid_From)}</Text>
              <Text style={styles.infoinput1}>{formatDate(transportDetails?.Valid_To)}</Text>
              <Text style={styles.infoinput1}>{transportDetails?.Pickup_Time}</Text>
            </View>
            <View style={[styles.rowContainer1, { marginTop: 20 }]}>
              <Text style={styles.infoheading1}>Status</Text>
              <Text style={styles.infoheading1}>Bus Incharge</Text>
              <Text style={styles.infoheading1}>DropOut Time</Text>
            </View>
            <View style={styles.rowContainer1}>
              <Text
                style={[
                  styles.infoinput1,
                  {
                    color: transportDetails?.Status === 'Active' ? 'green' : 'red',
                  },
                ]}
              >
                {transportDetails?.Status}
              </Text>
              <Text style={styles.infoinput1}>{transportDetails?.BusIncharge}</Text>
              <Text style={styles.infoinput1}>{transportDetails?.Drop_Time}</Text>
            </View>
            <View style={styles.cardsection}>
              <View style={styles.flexRow}>
                <Button
                  title="View Bus Pass"
                  onPress={handlePress}
                  buttonStyle={styles.custom}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default TransportCardView;
