import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { HeaderWithTitle } from '../../components';
import { backgroundImage } from '../../assets/images';
import { colors } from '../../styles';
import { indent, halfIndent } from '../../styles/dimensions';
import { globalConstants } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DayOutDashboard = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Rejected'];

  const [dayOutsList, setDayOutsList] = useState([
    {
      id: '1',
      date: '12-06-2024',
      fromTime: '09:30 AM',
      toTime: '05:00 PM',
      reason: 'Market Visit',
      status: 'Pending',
      isUrgent: false,
    },
    {
      id: '2',
      date: '10-06-2024',
      fromTime: '10:00 AM',
      toTime: '04:00 PM',
      reason: 'Medical Checkup',
      status: 'Approved',
      isUrgent: true,
    }
  ]);

  useEffect(() => {
    if (route.params?.newDayOut) {
      const newEntry = route.params.newDayOut;
      setDayOutsList(prev => [newEntry, ...prev]);
      navigation.setParams({ newDayOut: undefined });
      setActiveTab('Pending');
    }
  }, [route.params?.newDayOut]);

  const filteredData = dayOutsList.filter(item => {
    if (activeTab === 'Rejected') return item.status === 'Rejected' || item.status === 'Cancelled';
    return item.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#4CAF50';
      case 'Rejected':
      case 'Cancelled': return '#F44336';
      case 'Pending': return '#FF9800';
      default: return colors.black3;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.clayCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.fromTime} - {item.toTime}</Text>
        </View>
        {item.isUrgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        )}
      </View>

      <Text style={styles.reasonText}>{item.reason}</Text>

      <View style={styles.footer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <HeaderWithTitle title="My Day Outs" navigation={navigation} />

        <View style={styles.tabWrapper}>
          <View style={styles.tabContainer}>
            {tabs.map(tab => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="clock-alert-outline" size={80} color="#D1D9E6" />
              <Text style={styles.emptyText}>No {activeTab} requests</Text>
            </View>
          }
        />

        <Pressable
          style={styles.clayFab}
          onPress={() => navigation.navigate(globalConstants.default.routeNames.ADD_DAY_OUT)}
        >
          <Icon name="plus" size={32} color={colors.white} />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F3F8' },
  bg: { width: '100%', height: '100%' },
  tabWrapper: { paddingVertical: 15, alignItems: 'center' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E5EC',
    borderRadius: 30,
    padding: 5,
    shadowColor: "#a3b1c6",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25 },
  activeTab: {
    backgroundColor: colors.blue,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  tabText: { color: colors.black3, fontSize: 13, fontWeight: '600' },
  activeTabText: { color: colors.white },

  listContent: { padding: indent, paddingBottom: 100 },
  clayCard: {
    backgroundColor: '#F0F3F8',
    padding: indent,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: "#a3b1c6",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 6
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  dateText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  timeText: { fontSize: 13, color: colors.blue, marginTop: 2, fontWeight: '500' },
  urgentBadge: { backgroundColor: '#FFEBEE', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  urgentText: { color: '#F44336', fontSize: 9, fontWeight: '900' },
  reasonText: { fontSize: 14, color: '#667C8A', marginBottom: 15, lineHeight: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E0E5EC', paddingTop: 10 },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { fontSize: 13, fontWeight: 'bold' },

  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 15, color: '#A3B1C6', fontSize: 16, fontWeight: '500' },

  clayFab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.blue,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)'
  }
});

export default DayOutDashboard;
