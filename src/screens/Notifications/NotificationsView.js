import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar, LayoutAnimation, Platform, UIManager, Image, Pressable } from 'react-native';
import styles from './styles';
import { bell, backIcon } from '../../assets/images';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NotificationsView = ({ navigation, notifications, unreadCount }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    // Mapping API fields based on the response format provided
    const title = item.TitleNotification || 'No Title';
    const body = item.BodyNotification || 'No Content';
    const category = item.CategoryName || 'General';
    const dateTime = item.EntryDateTime || '';
    const id = item.CategoryID + item.TitleNotification; // Creating a unique key

    const isExpanded = expandedId === id;

    // Mapping icons and colors based on CategoryName
    const getCategoryStyles = (name) => {
      const cat = name.toLowerCase();
      if (cat.includes('exam')) return { icon: 'file-document-edit-outline', color: '#AA66CC' };
      if (cat.includes('fee') || cat.includes('finance')) return { icon: 'cash-multiple', color: '#00C851' };
      if (cat.includes('placement')) return { icon: 'account-tie-outline', color: '#FFBB33' };
      if (cat.includes('event')) return { icon: 'calendar-star', color: '#2E5BFF' };
      if (cat.includes('library')) return { icon: 'library-outline', color: '#A52A2A' };
      return { icon: 'bell-outline', color: '#33B5E5' }; // Default
    };

    const config = getCategoryStyles(category);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleExpand(id)}
        style={styles.notificationCard}
      >
        <View style={[styles.leftStrip, { backgroundColor: config.color }]} />
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: config.color + '15' }]}>
            <MIcon name={config.icon} size={28} color={config.color} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.topRow}>
              <View style={[styles.deptTag, { backgroundColor: config.color + '15' }]}>
                <Text style={[styles.deptText, { color: config.color }]}>{category}</Text>
              </View>
              {/* Unread dot logic can be added here if 'isRead' field exists in future */}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text
              style={styles.body}
              numberOfLines={isExpanded ? undefined : 2}
            >
              {body}
            </Text>
            <View style={styles.footer}>
              <View style={styles.footerItem}>
                <MIcon name="clock-outline" size={14} color="#8E949A" />
                <Text style={styles.footerText}>{dateTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Image source={backIcon} style={styles.backIconStyle} resizeMode="contain" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.bellIconContainer}>
          <Image source={bell} style={styles.bellIconStyle} resizeMode="contain" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
      <FlatList
        data={notifications || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text>No Notifications Found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default NotificationsView;