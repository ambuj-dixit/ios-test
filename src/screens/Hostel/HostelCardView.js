import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import React from 'react';
import { backgroundImage,HostelImage} from '../../assets/images'; 
import { HeaderWithTitle } from '../../components';
import styles from './styles';
import { formatDate } from '../../utils/commonFunctions';

const HostelCardView = ({ hostelDetails, feesDetails, navigation }) => {
const getStudentName = (name) => {
const endIndex = name.indexOf(")");
return endIndex !== -1 ? name.substring(0, endIndex + 1) : name;
};

  const getUniversityName = (name) => {
    const addIndex = name.indexOf("Add:");
    if (addIndex !== -1) {
      const afterAdd = name.substring(addIndex + 4);
      const newlineIndex = afterAdd.indexOf("\n");
      const universityName = newlineIndex !== -1
        ? afterAdd.substring(0, newlineIndex).trim()
        : afterAdd.trim();

 
      if (/sanskriti university/i.test(universityName)) {
        return universityName;
      }
    }
    return ""; 
  };

  const getWardenName = (warden) => {
    const openParenIndex = warden.indexOf("(");
    return openParenIndex !== -1 ? warden.substring(0, openParenIndex).trim() : warden;
  };

  const getWardenId = (warden) => {
    const openParenIndex = warden.indexOf("(");
    const closeParenIndex = warden.indexOf(")");
    return openParenIndex !== -1 && closeParenIndex !== -1
      ? warden.substring(openParenIndex + 1, closeParenIndex).trim()
      : "";
  };

  const getStatusWithoutHostelPass = (status) => {
    return status?.replace("Hostel Pass", "").trim() || "";
  };

  const getCourseBatch = (course, batch) => {
    if (course && batch) {
      return `${course} (${batch})`; 
    } else if (course) {
      return course; 
    } else if (batch) {
      return `(${batch})`; 
    }
    return ""; 
  };

  if (!hostelDetails) {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={backgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
            <View style={styles.imageContainer}>
            <Image source={HostelImage} style={styles.profileImage} resizeMode="contain" />
            <Text style={styles.Detailnotfound}>No Hostel Details Found</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const studentName = hostelDetails?.Student_Name || "";
  const displayStudentName = getStudentName(studentName);
  const displayUniversityName = getUniversityName(studentName);
  const wardenName = hostelDetails?.WardenName || "";
  const displayWardenName = getWardenName(wardenName);
  const displayWardenId = getWardenId(wardenName);
  const status = hostelDetails?.Status || "";
  const displayStatus = getStatusWithoutHostelPass(status);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <HeaderWithTitle title="Hostel Details" navigation={navigation} />
        <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
          <View style={styles.rowContainer}>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Due</Text>
              <Text style={styles.infoinput}>{feesDetails?.Total_Due}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Paid</Text>
              <Text style={styles.infoinput}>{feesDetails?.Total_Paid}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.infoheading}>Balance</Text>
              <Text style={styles.infoinput}>{feesDetails?.Balance_Amount}</Text>
            </View>
          </View>

          <View style={styles.transportDetails}>
            <View style={[styles.subtitle, styles.verticalline]}>
              <Text style={styles.subtitle}>Basic Information</Text>
            </View>
            <View style={[styles.rowContainer1]}>
              <Text style={styles.infoheading1}>Student Name</Text>
              <Text style={styles.infoinput1}>{displayStudentName}</Text>
            </View>
            <View style={[styles.rowContainer1]}>
              <Text style={styles.infoheading1}>University</Text>
              <Text style={styles.infoinput1}>{displayUniversityName}</Text>
            </View>
            <View style={[styles.rowContainer1]}>
              <Text style={styles.infoheading1}>Course(Batch)</Text>
              <Text style={styles.infoinput1}> {getCourseBatch(hostelDetails?.Course_Class, hostelDetails?.Batch)}</Text>
            </View>
            <View style={[styles.rowContainer1]}>
              <Text style={styles.infoheading1}>Hostel Name</Text>
              <Text style={styles.infoinput1}>{hostelDetails?.Hostel_Name}</Text>
            </View>

            <View style={[styles.subtitle, styles.verticalline, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Accommodation</Text>
            </View>
            <View style={[styles.rowContainer1]}>
              <Text style={styles.infoheading1}>Warden Name</Text>
              <Text style={styles.infoheading1}>Warden ID</Text>
              <Text style={styles.infoheading1}>Floor</Text>
            </View>

            <View style={[styles.rowContainer2]}>
              <Text style={styles.infoinput1}>{displayWardenName}</Text>
              <Text style={styles.infoinput1}>{displayWardenId}</Text>
              <Text style={styles.infoinput1}>{hostelDetails?.Floor_Number}</Text>
            </View>

            <View style={styles.rowContainer1}>
              <Text style={styles.infoheading1}>Room Type</Text>
              <Text style={styles.infoheading1}>Bed Number</Text>
              <Text style={styles.infoheading1}>Room No.</Text>
            </View>
            <View style={[styles.verticalline]}>
              <View style={[styles.rowContainer2]}>
                <Text style={styles.infoinput1}>{hostelDetails?.Room_Type}</Text>
                <Text style={styles.infoinput1}>{hostelDetails?.Bed_No}</Text>
                <Text style={styles.infoinput1}>{hostelDetails?.Room_Number}</Text>
              </View>
            </View>
            <View style={styles.rowContainer1}>
              <Text style={styles.infoheading1}>Start From</Text>
              <Text style={styles.infoheading1}>End on</Text>
              <Text style={styles.infoheading1}>Status</Text>
            </View>
            <View style={[styles.rowContainer2]}>
              <Text style={styles.infoinput1}>{formatDate(hostelDetails?.From_Date)}</Text>
              <Text style={styles.infoinput1}>{formatDate(hostelDetails?.To_Date)}</Text>
              <Text style={[styles.infoinput1, { color: hostelDetails?.Status === "Hostel Pass Ongoing" ? "green" : "red" }]}>
                {displayStatus}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default HostelCardView;
