import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
} from 'react-native';
import styles from './styles';

import {colors} from '../../styles';
import {Button, LoginBackHeader} from '../../components';
import {backgroundImage} from '../../assets/images';
import {Dropdown} from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Entypo';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {indent} from '../../styles/dimensions';

const Login = ({
  username,
  password,
  setUsername,
  onLogin,
  setPassword,
  instituteDetails,
  onForgotPasswordButtonclick,
  navigation,
  Session,
  setSession,
  sessions,
  copyUniqueId,
  IMEINo,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={backgroundImage}
      style={styles.background}>
      <LoginBackHeader navigation={navigation} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.rootContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginhead}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.formheading}>{instituteDetails?.ClientName}</Text>
          <Text style={styles.formSubheading}>Sign In To College Portal</Text>
          <View style={styles.inputitems}>
            <Text style={styles.labels}>Session</Text>
            <Dropdown
              data={sessions}
              style={styles.dropdown}
              labelField="Session"
              valueField="Session"
              search={false}
              onChange={event => {
                setSession(event?.Session);
              }}
              selectedTextStyle={styles.dropdownSelectedText}
              value={Session}
            />
            <Text style={styles.labels}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={text => {
                setUsername(text.toUpperCase());
              }}
              placeholderTextColor={colors.placeholder}
              placeholder="UserName"
              keyboardType="visible-password"
              autoCapitalize="none"
            />
            <Text style={styles.labels}>Password</Text>

            <TextInput
              value={password}
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
            />

            <Text style={styles.labels}>Unique ID</Text>

            <View style={styles.uniqueContainer}>
              <TextInput
                value={IMEINo}
                editable={false}
                style={[styles.input, styles.disabledInput]}
                placeholder="Unique Number"
                placeholderTextColor={colors.placeholder}
                onEndEditing={onLogin}
              />
              <Pressable style={styles.copyButton} onPress={copyUniqueId}>
                <Octicons name="share" size={indent} color={colors.black} />
                <Text style={styles.copyText}>Share</Text>
              </Pressable>
            </View>

            <Button title="Login" onPress={onLogin} />

            {/* <TouchableOpacity onPress={onForgotPasswordButtonclick}>
              <Text style={styles.forgotlabel}>Forgot Password?</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.loginfooter}>
          <Text style={styles.loginfootertext}>
            A Product Of MKT Softwares Pvt. Ltd.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;
