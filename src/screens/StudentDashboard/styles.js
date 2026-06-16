import {StyleSheet, Platform, Dimensions} from 'react-native';
import {indent} from '../../styles/dimensions';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Greeting Section
  greetingContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 15,
    color: '#8E949A',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  studentName: {
    fontSize: 18, // Further reduced from 20 for a more compact and elegant look
    fontWeight: 'bold',
    color: '#003399',
    marginTop: 2,
  },

  // Profile Card (Modern horizontal design)
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 2,
    shadowColor: '#0052CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    marginBottom: 15,
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F4F7FF',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 10,
  },
  courseName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1D1E',
    lineHeight: 20,
  },
  schoolName: {
    fontSize: 12,
    color: '#6A6A6A',
    marginTop: 4,
  },
  chevronIcon: {
    opacity: 0.3,
  },

  // Academic Info Grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginBottom: 15,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#8E949A',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1D1E',
    marginTop: 2,
  },

  // Fees Section (Blue Card)
  feesCard: {
    backgroundColor: '#003399',
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    elevation: 8,
    shadowColor: '#003399',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  feesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  feeStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  feeStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textAlign: 'center',
  },
  feeStatValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 6,
  },
  feeDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
  },
  payButton: {
    backgroundColor: '#FFFFFF',
    height: 54,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  payButtonText: {
    color: '#003399',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButtonIcon: {
    position: 'absolute',
    right: 15,
  },

  // Quick Actions
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D1E',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionItem: {
    width: width * 0.2,
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 10,
    color: '#1A1D1E',
    fontWeight: '500',
    textAlign: 'center',
  },

  // ESIM Pulse Support
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 30,
  },
  botIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botIcon: {
    width: 45,
    height: 45,
  },
  supportInfo: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1D1E',
  },
  supportSub: {
    fontSize: 11,
    color: '#6A6A6A',
    marginTop: 2,
  },
  getHelpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E8FF',
  },
  getHelpText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0052CC',
    marginLeft: 5,
  },
});

export default styles;
