import {View, Text, Pressable, LayoutAnimation} from 'react-native';
import styles from './styles';
import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles';
import {halfIndent, indent} from '../../styles/dimensions';
import {globalConstants} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WebViewScreen from '../../screens/Webview';
import {useSelector} from 'react-redux';

// Assume WebViewScreen is already added to your navigation stack
const DrawerItem = (screen, props) => {
  const [showChild, setshowChild] = useState(false);

  const {userDetails} = useSelector(state => state.login);

  const onCardPress = event => {

    const UID = userDetails?.StudentId || userDetails?.Empid;

    const instID = userDetails?.InstituteID;
    const SesnID = userDetails?.SessionID;

    const fullURL = `${event?.routeNames}?UID=${UID}&instID=${instID}&SesnID=${SesnID}&WebView=True`;
    if (
      event?.isWebView === 'True'
    ) {
      // Navigate to WebViewScreen if 'isWebView' is true
      screen?.navigation?.navigate(globalConstants.default.routeNames.Webview, {
        url: fullURL,
        Title: event?.Title,
      });
    } else if (event.routeNames) {
      // For normal navigation, use routeNames
      screen?.navigation?.navigate(
        globalConstants.default.routeNames[event.routeNames],
      );
    }
  };

  const toggleChild = () => {
    setshowChild(v => !v);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const getParentItem = useCallback(() => {
    for (let eachItem of screen.item) {
      if (eachItem.ParentID === '-1') {
        return eachItem;
      }
    }
  }, [screen?.item]);

  if (!screen?.item?.length) {
    return null;
  }

  if (screen.item.length === 1) {
    return (
      <Pressable
        style={styles.routeCard}
        onPress={() => onCardPress(screen.item[0])}>
        <View style={styles.iconContainer}>
          <Icon
            name={
              screen?.item[0]?.ClassName ? screen?.item[0]?.ClassName : 'file-o'
            }
            size={indent * 1.5}
            style={styles.icon}
            color={colors.black3}
          />
        </View>
        <Text style={styles.routeName}>{screen?.item[0]?.Title}</Text>
      </Pressable>
    );
  } else {
    return (
      <View style={styles.expandView}>
        <Pressable
          onPress={toggleChild}
          style={[styles.routeCard, styles.toggleCard]}>
          <View style={styles.parentRow}>
            <View style={styles.iconContainer}>
              <Icon
                name={
                  getParentItem()?.ClassName
                    ? getParentItem()?.ClassName
                    : 'file-o'
                }
                size={indent * 1.5}
                style={styles.icon}
                color={colors.black3}
              />
            </View>
            <Text style={styles.routeName}>{getParentItem()?.Title}</Text>
          </View>

          <AntDesign
            name={showChild ? 'up' : 'down'}
            color={colors.black}
            size={15}
          />
        </Pressable>
        {showChild &&
          screen?.item?.map(
            eachItem =>
              eachItem?.ParentID !== '-1' && (
                <Pressable
                  style={[styles.routeCard, styles.childCard]}
                  onPress={() => onCardPress(eachItem)}
                  key={eachItem.routeNames}>
                  <Icon
                    name={eachItem?.ClassName ? eachItem?.ClassName : 'file-o'}
                    size={indent * 1.5}
                    style={styles.icon}
                    color={colors.black3}
                  />

                  <Text style={[styles.routeName, {marginLeft: halfIndent}]}>
                    {eachItem?.Title}
                  </Text>
                </Pressable>
              ),
          )}
      </View>
    );
  }
};

export default DrawerItem;
