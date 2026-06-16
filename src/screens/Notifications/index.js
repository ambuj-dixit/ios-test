import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {clearNotificationsCount} from '../../reduxOperations/dashboard/actions';
import NotificationsView from './NotificationsView';

const NotificationsContainer = props => {
  useEffect(() => {
    // 1. Fetch notifications
    // 2. In the success callback, the reducer will set unreadCount = length
    // 3. Then we immediately clear it so the badge disappears
    props.getNotifications(null, () => {
      props.clearNotificationsCount();
    });
  }, []);

  return (
    <NotificationsView
      {...props}
      notifications={props.notifications}
    />
  );
};

const mapStateToProps = state => ({
  notifications: state.dashboard.notifications,
  unreadCount: state.dashboard.unreadCount,
});

const mapDispatchToProps = {
  getNotifications: dashboardOperations.getNotifications,
  clearNotificationsCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
