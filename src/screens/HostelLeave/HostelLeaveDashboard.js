import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { HeaderWithTitle } from '../../components';
import { backgroundImage } from '../../assets/images';
import { colors } from '../../styles';
import { indent, halfIndent } from '../../styles/dimensions';
import { globalConstants } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HostelLeaveDashboard = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Rejected', 'Completed', 'Expired'];

  // Initial leaves list (In real app, this would come from API)
  const [leavesList, setLeavesList] = useState([
    {
      id: '1',
      startDate: '10-06-2024',
      endDate: '12-06-2024',
      reason: 'Going home for sibling wedding',
      status: 'Pending',
      isUrgent: true,
    },
    {
      id: '2',
      startDate: '01-05-2024',
      endDate: '03-05-2024',
      reason: 'Fever and rest',
      status: 'Approved',
      isUrgent: false,
    }
  ]);

  // Listen for new leave additions from the form
  useEffect(() => {
    if (route.params?.newLeave) {
      const newEntry = route.params.newLeave;
      // Add the new leave to the top of the list
      setLeavesList(prev => [newEntry, ...prev]);

      // Reset the navigation parameter so it doesn't add again on re-render
      navigation.setParams({ newLeave: undefined });

      // Automatically switch to Pending tab to show the new entry
      setActiveTab('Pending');
    }
  }, [route.params?.newLeave]);

  const filteredLeaves = leavesList.filter(item => item.status === activeTab);

  const renderLeaveItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.startDate} to {item.endDate}</Text>
        {item.isUrgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        )}
      </View>
      <Text style={styles.reasonText}>{item.reason}</Text>
      <View style={styles.statusRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#4CAF50';
      case 'Rejected': return '#F44336';
      case 'Pending': return '#FF9800';
      default: return colors.black3;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <HeaderWithTitle title="Leave Request" navigation={navigation} />

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map(tab => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredLeaves}
          renderItem={renderLeaveItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="file-document-outline" size={80} color={colors.black3} />
              <Text style={styles.emptyText}>No {activeTab} leave applications found</Text>
            </View>
          }
        />

        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate(globalConstants.default.routeNames.ADD_HOSTEL_LEAVE)}
        >
          <Icon name="plus" size={30} color={colors.white} />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { width: '100%', height: '100%' },
  tabContainer: { paddingVertical: 10, paddingHorizontal: 5 },
  tab: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.blue },
  activeTab: { backgroundColor: colors.blue },
  tabText: { color: colors.blue, fontSize: 13, fontWeight: 'bold' },
  activeTabText: { color: colors.white },
  listContent: { padding: indent, paddingBottom: 100 },
  card: { backgroundColor: colors.white, padding: indent, borderRadius: 10, marginBottom: indent, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: halfIndent },
  dateText: { fontSize: 15, fontWeight: 'bold', color: colors.black },
  urgentBadge: { backgroundColor: '#ffebee', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  urgentText: { color: 'red', fontSize: 10, fontWeight: 'bold' },
  reasonText: { fontSize: 14, color: colors.black3, marginBottom: halfIndent },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 13, color: colors.black, marginRight: 5 },
  statusText: { fontSize: 13, fontWeight: 'bold' },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, color: colors.black3, fontSize: 16 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: colors.blue, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});

export default HostelLeaveDashboard;
