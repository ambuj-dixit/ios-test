import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import styles from './styles';
import {backgroundImage, downloadIcon} from '../../assets/images';
import {HeaderWithTitle} from '../../components';

import RNFetchBlob from 'rn-fetch-blob';
// import ReactNativeBlobUtil from 'react-native-blob-util';

import {hideLoader, showLoader} from '../../components/appLoader';
import {printDataForBase64} from '../../utils/commonFunctions';

const NoticesAndCircular = ({
  dashboardItems,
  navigation,
  noticesAndCirculars,
}) => {
  async function downloadFile(item) {
    showLoader();
    try {
      if (item?.AttachedFileType && item?.AttachedFile && item?.FileName) {
        const fileName = item?.FileName.replace(/\s/g, '');
        const data = item.AttachedFile.replace(
          /^data:([A-Za-z-+/]+);base64,/,
          '',
        );
        printDataForBase64(data, fileName);
        hideLoader();
      }
    } catch (error) {
      hideLoader();

      Alert.alert('Error', 'Error downloading file');
    }
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item?.Title}</Text>
        {item?.InnerContent !== 'N/A' && (
          <Text style={styles.subTitle}>{item?.InnerContent}</Text>
        )}
        <Text style={styles.postedOn}>Posted On: {item?.UserEntryDate}</Text>
        <Text style={styles.postedOn}>Posted By: {item?.PostedBy}</Text>

        {item?.AttachedFile !== 'N/A' && item?.AttachedFileType !== 'N/A' && (
          <Pressable style={styles.fileRow} onPress={() => downloadFile(item)}>
            <Text style={styles.attachedFile}>{item?.FileName}</Text>
            <Image
              source={downloadIcon}
              resizeMode="contain"
              style={styles.downloadIcon}
            />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.rootContainer}>
      <HeaderWithTitle title="Notices & Circulars" navigation={navigation} />

      <View style={styles.cardContainer}>
        {noticesAndCirculars?.length > 0 && (
          <FlatList
            data={noticesAndCirculars}
            renderItem={renderItem}
            contentContainerStyle={styles.noticeScroll}
            keyExtractor={item => item.ID}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default NoticesAndCircular;
