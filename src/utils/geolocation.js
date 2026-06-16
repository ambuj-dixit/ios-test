import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';

export const getOneTimeLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      // Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        res = {
          lat: currentLatitude,
          lng: currentLongitude,
          status: 1,
          msg: 'Location fetched successfully',
        };

        resolve(res);
      },
      error => {
        reject({
          status: 0,
          msg: 'Location not fetched. Refresh your GPS and try again.',
        });
      },
      // {
      //   enableHighAccuracy: false,
      //   timeout: 15000,
      //   maximumAge: 1000,
      //   fastestInterval:5000
      // },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 10000,
        fastestInterval: 1000, // set the fastest interval to 1 second
        interval: 5000, // set the interval to 5 seconds
      },
    );
  });
};
