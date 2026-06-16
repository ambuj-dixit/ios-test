import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import styles from '../styles';
import {backgroundImage} from '../../../assets/images';
import {colors} from '../../../styles';
import {Button} from '../../../components';

const UpdatePassword = ({
  regId,
  setRegId,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
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
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.heading}>ESIM Campus Solution</Text>
          <Text style={styles.subheading}>
            Transforming Education with ESIM Campus Solution
          </Text>
        </View> */}

        <View style={styles.inputcontainer}>
          <Text style={styles.formheading}>Reset Password</Text>

          <View style={styles.inputitems}>
            <Text style={styles.labels}>Student Registration Number</Text>
            <TextInput
              style={styles.input}
              value={regId}
              onChangeText={setRegId}
              placeholderTextColor={colors.placeholder}
              placeholder="Registration Number"
              autoCapitalize="none"
              editable={false}
            />

            <Text style={styles.labels}>New Password</Text>

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={colors.placeholder}
              placeholder="New Password "
              autoCapitalize="none"
            />

            <Text style={styles.labels}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={colors.placeholder}
              placeholder="Confirm Password"
              autoCapitalize="none"
            />

            <Button title="Reset" onPress={handleSubmit} />

            <TouchableOpacity onPress={handleNavigate}>
              <Text style={styles.forgotlabel}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UpdatePassword;
