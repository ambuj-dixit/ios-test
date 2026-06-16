import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../styles';
import {backgroundImage} from '../../../assets/images';
import {colors} from '../../../styles';
import {Button} from '../../../components';

const VerifyOTP = ({otp, setOtp, handleSubmit, error, navigation}) => {
  const handleNavigate = () => {
    navigation?.navigate('login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        {/* <View style={styles.loginhead}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.heading}>ESIM Campus Solution</Text>
          <Text style={styles.subheading}>
            Transforming Education with ESIM Campus Solution
          </Text>
        </View> */}

        <View style={styles.inputcontainer}>
          <Text style={styles.formheading}>Verify OTP</Text>
          <Text style={styles.formheading2}>
            OTP is sent to your registered mail address
          </Text>
          <View style={styles.inputitems}>
            <Text style={styles.labels}>OTP</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholderTextColor={colors.placeholder}
              placeholder="Eneter OTP here"
              autoCapitalize="none"
            />

            <Button title="Verify" onPress={handleSubmit} />

            <TouchableOpacity onPress={handleNavigate}>
              <Text style={styles.forgotlabel}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default VerifyOTP;
