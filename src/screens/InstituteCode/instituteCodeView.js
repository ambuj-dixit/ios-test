import React from 'react';
import {Text, View, Image, ImageBackground, TextInput,Modal,TouchableOpacity} from 'react-native';
import styles from './styles';
import {colors} from '../../styles';
import {Button} from '../../components';
import {backgroundImage} from '../../assets/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const InstituteCodeView = ({
  orgCode,
  setOrgCode,
  onSubmit,
  showForceUpdate,
  onForceUpdateClose,
  onForceUpdatePress,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={backgroundImage}
      style={styles.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.rootContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginhead}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.heading}>ESIM Campus Solution</Text>
          <Text style={styles.subheading}>
            Transforming Education with ESIM Campus Solution
          </Text>
        </View>

        <View style={styles.inputcontainer}>
          <View style={styles.inputitems}>
            <Text style={styles.labels}>Institute Code</Text>
            <TextInput
              style={styles.input}
              value={orgCode}
              onChangeText={text => {
                setOrgCode(text.toUpperCase());
              }}
              placeholderTextColor={colors.placeholder}
              placeholder="Institute Code"
              autoCapitalize="none"
              keyboardType="visible-password"
            />

            <Button title="Continue" onPress={onSubmit} />
          </View>
        </View>

        <View style={styles.loginfooter}>
          <Text style={styles.loginfootertext}>
            A Product Of MKT Softwares Pvt. Ltd.
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Modal transparent visible={showForceUpdate} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Update Required</Text>
            <Text style={styles.message}>
              A new version of the app is available. Please update to continue.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onForceUpdatePress}>
              <Text style={styles.buttonText}>Update Now</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onForceUpdateClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default InstituteCodeView;
