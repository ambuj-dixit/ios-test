import Toast from 'react-native-root-toast';
import {colors} from '../styles';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

/**
 * Shows error message for a global flash message instance
 * @param {string} error
 */
const showErrorMessage = error => {
  let toast = Toast.show(error, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.red,
    opacity: 1,
  });
  setTimeout(() => {
    Toast.hide(toast);
  }, 1000);
};

/**
 * Shows success message for a global flash message instance
 * @param {string} error
 */
const showSuccessMessage = (success, onHide) => {
  let toast = Toast.show(success, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.black,
    opacity: 1,
    onHide,
  });
  setTimeout(() => {
    Toast.hide(toast);
  }, 1000);
};

const groupDashboardItems = data => {
  let updatedData = {};
  for (const item of data) {
    const menuID = item.menuID;
    const ParentID = item.ParentID;

    if (item.ParentID === '-1') {
      if (!updatedData[menuID]) {
        updatedData[menuID] = [];
      }
      updatedData[menuID].push(item);
    } else {
      if (!updatedData[ParentID]) {
        updatedData[ParentID] = [];
      }
      updatedData[item.ParentID].push(item);
    }
  }
  return updatedData;
};

const getUniqueArrayObject = async (data, label, value) => {
  const uniqueCourses = {};

  // Iterate through the array of objects
  data.forEach(item => {
    // Create a unique key based on CourseId and CourseName
    const key = item[label] + '-' + item[value];
    // If the key doesn't exist in uniqueCourses, add the object
    if (!uniqueCourses[key]) {
      uniqueCourses[key] = {
        label: item[label],
        value: item[value],
      };
    }
  });

  // Convert the uniqueCourses object back into an array
  const uniqueArray = Object.values(uniqueCourses);

  return uniqueArray;
};

/**
 * print data for a base string using rn-fetch-blob
 */
const printDataForBase64 = async (fileData, fileName) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}.pdf`;
  if (Platform.OS === 'android') {
    await RNFetchBlob.fs
      .writeFile(path, fileData, 'base64')
      .then(() => {
        RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
      })
      .catch(() => {
        showErrorMessage('Error while downloading file');
      });
  } else {
    await RNFetchBlob.fs
      .writeFile(path, fileData, 'base64')
      .then(() => {
        RNFetchBlob.ios.previewDocument(path);
      })
      .catch(() => {
        showErrorMessage('Error while downloading file');
      });
  }
};

const formatDate = dateInput => {
  if (!dateInput || typeof dateInput !== 'string' || dateInput.trim() === '') {
    console.log('Invalid input:', dateInput); 
    return ""; 
  }

  let date;
  
  if (dateInput.includes('-') && isNaN(dateInput.split('-')[1])) {
    const [day, monthName, year] = dateInput.split('-');
    
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const monthIndex = months.indexOf(monthName);
    if (monthIndex === -1) {
      console.log('Invalid month name:', monthName); 
      return ""; 
    }
    
    date = new Date(year, monthIndex, day);
  } 

  else {
    const [day, month, year] = dateInput.split('-');
    date = new Date(year, month - 1, day); 
  }

  if (isNaN(date.getTime())) {
    console.log('Invalid date object:', date); 
    return ""; 
  }

  const suffixes = ['th', 'st', 'nd', 'rd'];
  const dayNumber = date.getDate();
  const suffix = 
    dayNumber % 10 <= 3 && ![11, 12, 13].includes(dayNumber % 100) 
    ? suffixes[dayNumber % 10] 
    : suffixes[0];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return `${dayNumber}${suffix} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

export {
  showErrorMessage,
  showSuccessMessage,
  groupDashboardItems,
  getUniqueArrayObject,
  formatDate,
  printDataForBase64,
};
