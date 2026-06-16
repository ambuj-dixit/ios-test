import { StyleSheet, Platform, Dimensions } from 'react-native';
import { indent, width } from '../../styles/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  backButtonContainer: {
    padding: 5,
  },
  backIconStyle: {
    height: indent * 2,
    width: indent,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081735',
    textAlign: 'center',
    flex: 1,
  },
  bellIconContainer: {
    position: 'relative',
    padding: 5,
  },
  bellIconStyle: {
    height: indent * 1.75,
    width: indent * 1.75,
  },
  badge: {
    backgroundColor: '#F34336',
    position: 'absolute',
    right: -2,
    top: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F3F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  leftStrip: {
    width: 4,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  deptTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deptText: {
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081735',
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    color: '#6E768A',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#8E949A',
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default styles;
