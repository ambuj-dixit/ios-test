import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {backgroundImage} from '../../assets/images';
import {colors, fontSizes, fontWeights} from '../../styles';
import {Button} from '../../components';

const ResetPassword = ({
  regId,
  setRegId,
  email,
  setEmail,
  handleSubmit,
  error,
  navigation,
}) => {
  const handleNavigate = () => {
    navigation.navigate('login');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        {/* <View style={styles.loginhead}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.heading}>ESIM Campus Solution</Text>
          <Text style={styles.subheading}>
            Transforming Education with ESIM Campus Solution
          </Text>
        </View> */}

        <View style={styles.inputcontainer}>
          <Text style={styles.formheading}>Forgot Password</Text>
          <Text style={styles.formheading2}>Enter your details below</Text>
          <View style={styles.inputitems}>
            <Text style={styles.labels}>Student Registration Number</Text>
            <TextInput
              style={styles.input}
              value={regId}
              onChangeText={setRegId}
              placeholderTextColor={colors.placeholder}
              placeholder="Registration Number"
              autoCapitalize="none"
              keyboardType="number-pad"
            />

            <Text style={styles.labels}>{error?.regId}</Text>

            <Text style={styles.labels}>Registered Email Id</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.placeholder}
              placeholder="Email Address "
              autoCapitalize="none"
            />

            <Button title="Continue" onPress={handleSubmit} />

            <TouchableOpacity onPress={handleNavigate}>
              <Text style={styles.forgotlabel}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ResetPassword;
