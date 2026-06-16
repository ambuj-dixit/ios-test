import React, {useEffect, useState} from 'react';
import PayFeeView from './PayFeeView';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View, Alert, Platform, ActivityIndicator} from 'react-native';
import {admitCardOperations} from '../../reduxOperations/admincard';
import {profileOperations} from '../../reduxOperations/profile';
import {colors} from '../../styles';
import RazorpayCheckout from 'react-native-razorpay';
import {navigate} from '../../navigation/RootNavigation';
import {feeDetailOperations} from '../../reduxOperations/feedetail';
import {globalConstants} from '../../constants';
import {showErrorMessage} from '../../utils/commonFunctions';

import {
  Card,
  CFCardPayment,
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
  CFUPI,
  CFUPIIntentCheckoutPayment,
  CFUPIPayment,
  SavedCard,
  UPIMode,
  ElementCard,
} from 'cashfree-pg-api-contract';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import WebView from 'react-native-webview';
import { styles } from './styles';

const PayFeeContainer = props => {
  const dispatch = useDispatch();
  const {userDetails} = useSelector(state => state.login);
  const {profileData} = useSelector(state => state.profile);


  console.log(userDetails?.AccessToken, 'userDetails');
  const orderId = userDetails?.AccessToken
    ? 'order_' + userDetails?.AccessToken
    : 'order_123sdas1213';
  const sessionId = userDetails?.AccessToken;

  const [amount, setAmount] = useState();
  const [error, setError] = useState('');
  const [pay, setPay] = useState(false);
  const [data, setData] = useState({
    amount: '',
  });



  useEffect(() => {
  CFPaymentGatewayService.setCallback({
    async onVerify(orderId) {
      console.log('✅ onVerify orderId:', orderId);

      try {
       const response = await fetch(
         `https://api.cashfree.com/pg/orders/${orderId}/payments`,
         {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'X-Client-Id': '90535216cab5a1df4e34aa5f79253509',
             'X-Client-Secret':
               'cfsk_ma_prod_80956c8711ba61359bae9197544c40fe_290f8e96',
             'x-api-version': '2023-08-01',
           },
         },
       );

        const data = await response.json();
        const paymentInfo = data?.[0];

        const payload = {
          paymentId: paymentInfo?.cf_payment_id,
          Studentid: props.userDetails.StudentId,
          VoucherNo: props?.route?.params?.voucher,
          amount: paymentInfo?.payment_amount,
        };

        console.log('📦 Payment details:', paymentInfo);

        // Define callbacks before use
        const successCallback = res => {
          console.log('✅ Payment update success:', res);
          Alert.alert('ESIM', 'Payment Successful');
           props.navigation.replace('main', {
             screen: 'home',
             params: {
               params: {
                 paymentData: data,
               },
             },
           });
          // props.navigation.navigate('main'
          //   // globalConstants.default.routeNames.FEE_PAY,
          //   // {
          //   //   paymentData: data,
          //   // },
          // );
        };

        const failureCallback = err => {
          console.error('❌ Payment update failed:', err);
          Alert.alert(
            'Payment Update Failed',
            'We could not update your payment status.',
          );
             props.navigation.replace('main', {
               screen: 'home',
               params: {
                 params: {
                   paymentData: data,
                 },
               },
             });
          //  props.navigation.navigate(
          //    'main',
          //    // globalConstants.default.routeNames.FEE_PAY,
          //    // {
          //    //   paymentData: data,
          //    // },
          //  );
        };

        // Call your Redux action
        dispatch(
          feeDetailOperations.postPaymentResponseUpdate(
            payload,
            successCallback,
            failureCallback,
          ),
        );
      } catch (error) {
        console.error('❌ Failed to fetch payment info:', error);
      }
    },

    onError(errors) {
      console.log('❌ onError:', errors);
    },
  });

  return () => {
    CFPaymentGatewayService.removeCallback(); // Clean up
  };
}, []);

//   useEffect(() => {
//     CFPaymentGatewayService.setCallback({
//       onVerify(orderIds) {
//         console.log('onVerify', orderIds);
//       },
//       onError(errors, orderIds) {
//         console.log('onError', errors, orderIds);
//       },
//     });
//   }, []);

  const sendPaymentInitiateDetails = payload => {
    const successCallback = res => {
      // props.navigation.navigate(
      //   globalConstants.default.routeNames.FEE_PAY,
      // );
    };
    const failureCallback = () => {};
    // return;
    // dispatch(
    //   feeDetailOperations.postPaymentDetails(
    //     payload,
    //     successCallback,
    //     failureCallback,
    //   ),
    // );
  };

  // const handleFeePay = () => {
  //   if (data?.amount > 0 && data?.amount <= 500000) {
  //     const {profileData} = props;
  //     let options = {
  //       description: 'Pay Fee',
  //       currency: 'INR',
  //       key: 'rzp_live_CORoIz9wJo1pH7',
  //       amount: data?.amount * 100,
  //       name: globalConstants.default.appName,
  //       prefill: {
  //         email: profileData?.Email ?? '',
  //         contact: profileData?.ContactNo ?? '',
  //         name: profileData?.StudentName ?? '',
  //       },
  //       theme: {color: colors.blue},
  //     };

  //     if (Number(data?.amount) > Number(amount)) {
  //       return Alert.alert(
  //         'ESIM',
  //         'Entered amount must be less than balance amount',
  //       );
  //     }
  //     const payloadForInitiate = {
  //       Studentid: props.userDetails.StudentId,
  //       Action: `Platform:${Platform.OS},Amount:${data.amount},Studentname:${
  //         props.userDetails.studentname
  //       },Time:${new Date().toLocaleTimeString()}`,
  //       FormName: 'Fee Payment',
  //       // time: new Date().toLocaleTimeString(),
  //       type: 'S',
  //       InstId: props.userDetails.InstituteID,
  //     };

  //     sendPaymentInitiateDetails(payloadForInitiate);

  //     RazorpayCheckout.open(options)
  //       .then(response => {
  //         let payload = {
  //           paymentId: response.razorpay_payment_id,
  //           Studentid: props.userDetails?.StudentId,
  //           VoucherNo: props?.route?.params?.voucher,
  //           amount: data?.amount,
  //         };

  //         const successCallback = () => {
  //           const payload2 = {
  //             Studentid: props.userDetails.StudentId,
  //             Action: `Platform:${Platform.OS},Amount:${
  //               data.amount
  //             },Studentname:${
  //               props.userDetails.studentname
  //             },Time:${new Date().toLocaleTimeString()},Status:Success`,
  //             FormName: 'Fee Payment',
  //             type: 'S',
  //             InstId: props.userDetails.InstituteID,
  //           };

  //           sendPaymentInitiateDetails(payload2);

  //           props.navigation.navigate(
  //             globalConstants.default.routeNames.FEE_PAY,
  //           );
  //         };
  //         const failureCallback = () => {};
  //         dispatch(
  //           feeDetailOperations.postPaymentResponseUpdate(
  //             payload,
  //             successCallback,
  //             failureCallback,
  //           ),
  //         );
  //       })
  //       .catch(err => {
  //         const payload = {
  //           Studentid: props.userDetails.StudentId,
  //           Action: `Platform:${Platform.OS},Amount:${
  //             data.amount
  //           },Studentname:${
  //             props.userDetails.studentname
  //           },Time:${new Date().toLocaleTimeString()},Status:Fail,Reason=${
  //             err?.error?.reason
  //           }`,
  //           FormName: 'Fee Payment',
  //           type: 'S',
  //           InstId: props.userDetails.InstituteID,
  //         };

  //         if (err?.error?.description) {
  //           showErrorMessage(err?.error.description);
  //         }
  //         sendPaymentInitiateDetails(payload);
  //       });
  //   } else {
  //     setError('Amount must be between 0 & 5 Lakh.');
  //   }
  // };
 const getSession = async () => {
   try {
     const payload = {
       StudentID: props.userDetails.StudentId,
       StudentName: props.userDetails.studentname,
       RegNo: props.userDetails.RegNo,
       Amount: data?.amount,
       VoucherNo: props?.route?.params?.voucher,
       SemID: props.userDetails.CurrentSemID,
       CourseID: props.userDetails.CourseID,
       SessionID: props.userDetails.SessionID,
       Phone: profileData?.ContactNo,
     };

     console.log('Payload sent to Cashfree API:', JSON.stringify(payload));

     return new Promise((resolve, reject) => {
       const successCallback = res => {
         const {order_id, token} = res || {};
         console.log('Order ID received:', order_id);
         console.log('Token received:', token);

         if (!order_id || !token) {
           return reject(new Error('Missing order_id or token in response'));
         }

         const session = new CFSession(token, order_id, CFEnvironment.PRODUCTION);
         console.log('Generated Session object:', session);
         resolve(session);
       };

       const failureCallback = err => {
         console.error('Failed to generate Cashfree order/token:', err);
         if (err.response) {
           console.error(
             '❌ Server responded with:',
             err.response.status,
             err.response.data,
           );
         } else if (err.request) {
           console.error('❌ No response received:', err.request);
         } else {
           console.error('❌ Error setting up request:', err);
         }
         reject(err);
       };

       dispatch(
         feeDetailOperations.CashfreeOrderAndTokenGeneration(
           payload,
           successCallback,
           failureCallback,
         ),
       );
     });
   } catch (error) {
     console.error('Error while getting session:', error.message);
     throw error;
   }
 };

 const [showCCAvenue, setShowCCAvenue] = useState(false);
 const [webViewContent, setWebViewContent] = useState(null);
 const [loading, setLoading] = useState(false);
 
  const handleFeePay = async () => {
    const studentId = props.userDetails.School_ID;
    console.log('studentId', studentId);
    console.log('props.userDetails',props?.userDetails);
    

    if (data?.amount <= 0 || data?.amount > 500000) {
      return setError('Amount must be between 0 & 5 Lakh.');
    }

    if (Number(data?.amount) > Number(amount)) {
      return Alert.alert(
        'ESIM',
        'Entered amount must be less than balance amount',
      );
    }

    const commonPayload = {
      Studentid: props.userDetails.StudentId,
      Action: `Platform:${Platform.OS},Amount:${data.amount},Studentname:${
        props.userDetails.studentname
      },Time:${new Date().toLocaleTimeString()}`,
      FormName: 'Fee Payment',
      type: 'S',
      InstId: props.userDetails.InstituteID,
    };

    if (studentId == 2) {
      if (data?.amount > 0 && data?.amount <= 500000) {
        if (Number(data?.amount) > Number(amount)) {
          return Alert.alert(
            'ESIM',
            'Entered amount must be less than balance amount',
          );
        }

        const payload = {
          StudentID: props.userDetails.StudentId,
          StudentName: props.userDetails.studentname,
          SessionId: props.userDetails.SessionID,
          SemId: props.userDetails.CurrentSemID,
          SchoolID: props.userDetails.School_ID,
          CourseID: props.userDetails.CourseID,
          SplId: props.userDetails.Specialization,
          Amount: data.amount,
          PayType: 'Academic Fee',
          VoucherNo: props?.route?.params?.voucher,
        };

        console.log('ccavnuepayload', payload);

        setLoading(true); // Show loader

        const successCallback = res => {
          setLoading(false); // Hide loader

          const paymentData = res;
          console.log('paymentData', paymentData);

          if (!paymentData?.enc_val || !paymentData?.access_code) {
            return setError('Invalid payment response. Please try again.');
          }
          const htmlForm = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background: #fff;
      }
      form {
        width: 100%;
        height: 100%;
      }
      iframe, img {
        max-width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <form id="ccavenueForm" method="post" action="https://secure.ccavenue.com/transaction.do?command=initiateTransaction">
      <input type="hidden" name="encRequest" value="${paymentData.enc_val}" />
      <input type="hidden" name="access_code" value="${paymentData.access_code}" />
    </form>
    <script type="text/javascript">
      document.getElementById('ccavenueForm').submit();
    </script>
  </body>
</html>
`;


        //   const htmlForm = `
        //   <html>
        //     <body>
        //       <form id="ccavenueForm" method="post" action="https://secure.ccavenue.com/transaction.do?command=initiateTransaction">
        //         <input type="hidden" name="encRequest" value="${paymentData.enc_val}" />
        //         <input type="hidden" name="access_code" value="${paymentData.access_code}" />
        //       </form>
        //       <script type="text/javascript">document.getElementById('ccavenueForm').submit();</script>
        //     </body>
        //   </html>
        // `;

          setWebViewContent(htmlForm);
          setShowCCAvenue(true);
        };

        const failureCallback = error => {
          console.error('CCAvenue Payment Error:', error);
          setError('Failed to initiate payment. Please try again later.');
        };

        // Dispatch the Redux thunk or call axios directly:
        dispatch(
          feeDetailOperations.CCAvenuePaymentRequestGeneration(
            payload,
            successCallback,
            failureCallback,
          ),
        );
      } else {
        setError('Amount must be between 0 & 5 Lakh.');
      }
      // Razorpay flow
      // const {profileData} = props;

      // let options = {
      //   description: 'Pay Fee',
      //   currency: 'INR',
      //   key: 'rzp_live_CORoIz9wJo1pH7', // Use live key in production
      //   amount: data?.amount * 100,
      //   name: globalConstants.default.appName,
      //   prefill: {
      //     email: profileData?.Email ?? '',
      //     contact: profileData?.ContactNo ?? '',
      //     name: profileData?.StudentName ?? '',
      //   },
      //   theme: {color: colors.blue},
      // };

      // sendPaymentInitiateDetails(commonPayload);

      // RazorpayCheckout.open(options)
      //   .then(response => {
      //     let payload = {
      //       paymentId: response.razorpay_payment_id,
      //       Studentid: props.userDetails?.StudentId,
      //       VoucherNo: props?.route?.params?.voucher,
      //       amount: data?.amount,
      //     };

      //     const successCallback = () => {
      //       const payload2 = {
      //         ...commonPayload,
      //         Status: 'Success',
      //       };

      //       sendPaymentInitiateDetails(payload2);

      //       props.navigation.replace('main', {
      //         screen: 'home',
      //         params: {
      //           params: {
      //             paymentData: data,
      //           },
      //         },
      //       });

      //       Alert.alert('ESIM', 'Payment Successful');
      //     };

      //     const failureCallback = () => {
      //       // Optionally handle failure UI update
      //     };

      //     dispatch(
      //       feeDetailOperations.postPaymentResponseUpdate(
      //         payload,
      //         successCallback,
      //         failureCallback,
      //       ),
      //     );
      //   })
      //   .catch(err => {
      //     const failPayload = {
      //       ...commonPayload,
      //       Status: 'Fail',
      //       Reason: err?.error?.reason ?? 'Unknown',
      //     };

      //     if (err?.error?.description) {
      //       showErrorMessage(err?.error.description);
      //     }

      //     sendPaymentInitiateDetails(failPayload);
      //   });
    }
    // else if (studentId === 2) {
    //     if (data?.amount > 0 && data?.amount <= 500000) {
    //       if (Number(data?.amount) > Number(amount)) {
    //         return Alert.alert(
    //           'ESIM',
    //           'Entered amount must be less than balance amount',
    //         );
    //       }

    //       const payload = {
    //         StudentID: props.userDetails.StudentId,
    //         StudentName: props.userDetails.studentname,
    //         SessionId: props.userDetails.SessionID,
    //         SemId: props.userDetails.CurrentSemID,
    //         SchoolID: props.userDetails.School_ID,
    //         CourseID: props.userDetails.CourseID,
    //         SplId: props.userDetails.Specialization,
    //         Amount: data.amount,
    //         PayType: 'Academic Fee',
    //         VoucherNo: props?.route?.params?.voucher,
    //       };

    //       console.log("ccavnuepayload",payload);
          

    //       setLoading(true); // Show loader

    //       const successCallback = res => {
    //         setLoading(false); // Hide loader

    //         const paymentData = res;
    //         console.log('paymentData', paymentData);

    //         if (!paymentData?.enc_val || !paymentData?.access_code) {
    //           return setError('Invalid payment response. Please try again.');
    //         }

    //         const htmlForm = `
    //         <html>
    //           <body>
    //             <form id="ccavenueForm" method="post" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
    //               <input type="hidden" name="encRequest" value="${paymentData.enc_val}" />
    //               <input type="hidden" name="access_code" value="${paymentData.access_code}" />
    //             </form>
    //             <script type="text/javascript">document.getElementById('ccavenueForm').submit();</script>
    //           </body>
    //         </html>
    //       `;

    //         setWebViewContent(htmlForm);
    //         setShowCCAvenue(true);
    //       };

    //       const failureCallback = error => {
    //         console.error('CCAvenue Payment Error:', error);
    //         setError('Failed to initiate payment. Please try again later.');
    //       };

    //       // Dispatch the Redux thunk or call axios directly:
    //       dispatch(
    //         feeDetailOperations.CCAvenuePaymentRequestGeneration(
    //           payload,
    //           successCallback,
    //           failureCallback,
    //         ),
    //       );
    //     } else {
    //       setError('Amount must be between 0 & 5 Lakh.');
    //     }
    // } 
    else {
      // Cashfree flow
      try {
        const session = await getSession();

        const paymentModes = new CFPaymentComponentBuilder()
          .add(CFPaymentModes.CARD)
          .add(CFPaymentModes.UPI)
          .add(CFPaymentModes.WALLET)
          .build();

        const theme = new CFThemeBuilder()
          .setNavigationBarBackgroundColor(colors.blue)
          .build();

        const dropPayment = new CFDropCheckoutPayment(
          session,
          paymentModes,
          theme,
        );

        sendPaymentInitiateDetails(commonPayload);

        CFPaymentGatewayService.doPayment(dropPayment);
        // You can track completion via listeners if needed
      } catch (err) {
        console.error('Error during Cashfree setup:', err);

        const failPayload = {
          ...commonPayload,
          Status: 'Fail',
          Reason: err?.message ?? 'Unknown',
        };

        sendPaymentInitiateDetails(failPayload);
        setError('Failed to initiate payment. Please try again later.');
      }
    }
  };


//   const handleFeePay = () => {
//     if (data?.amount > 0 && data?.amount <= 500000) {
//       const {profileData} = props;

//       if (Number(data?.amount) > Number(amount)) {
//         return Alert.alert(
//           'ESIM',
//           'Entered amount must be less than balance amount',
//         );
//       }
//       const session = getSession();
//       const paymentModes = new CFPaymentComponentBuilder()
//         .add(CFPaymentModes.CARD)
//         .add(CFPaymentModes.UPI)
//         .add(CFPaymentModes.WALLET)
//         .build();
//       console.log('session are : ', session, paymentModes);
//       const theme = new CFThemeBuilder()
//         .setNavigationBarBackgroundColor(colors.blue)
//         .build();
//       const dropPayment = new CFDropCheckoutPayment(
//         session,
//         paymentModes,
//         theme,
//       );
//       console.log('payment is', JSON.stringify(dropPayment));
//       CFPaymentGatewayService.doPayment(dropPayment);
//     } else {
//       setError('Amount must be between 0 & 5 Lakh.');
//     }
//   };

  const handleUpdate = (key, val) => {
    if (val <= 500000) {
      setData(d => ({...d, [key]: val}));
      setError('');
    } else {
      setError('Amount must be between 0 & 5 Lakh.');
    }
  };

  useEffect(() => {
    const voucher = props?.route?.params?.voucher ?? '';

    if (props.feeDetail) {
      let voucherDetail = props?.feeDetail?.voucherDetail?.filter(
        itm => itm?.VoucherNo == voucher,
      );

      if (voucherDetail?.length > 0) {
        setAmount(voucherDetail[0]?.BalAmt);
      }
    }

    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
      };
      const successCallback = () => {};
      const failureCallback = () => {};
      dispatch(
        admitCardOperations.getAdmitCard(
          payload,
          successCallback,
          failureCallback,
        ),
      );
      dispatch(
        profileOperations.getProfileData(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  const handlePayment = async () => {
    try {
      // Call backend to create order
      const response = await fetch('http://localhost:5000/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: 500, customerId: 1}),
      });

      const data = await response.json();

      console.log(data, 'OrderResponse');
      if (!data.sessionId || !data.orderId) {
        throw new Error('Failed to get order details');
      }

      // Start Cashfree Payment
      CFPaymentGatewayService.doPayment({
        orderId: data.orderId,
        sessionId: data.sessionId,
        paymentOption: 'upi', // or 'card', 'netbanking', etc.
      });

      CFPaymentGatewayService.setCallback({
        onVerify(orderIds) {
          console.log('onVerify', orderIds);
          Alert.alert('Payment Successful', `Order ID: ${orderIds}`);
        },
        onError(errors, orderIds) {
          console.log('onError', errors, orderIds);
          Alert.alert(
            'Payment Failed',
            errors.message || 'Something went wrong',
          );
        },
      });
    } catch (error) {
      console.error('Payment Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      {showCCAvenue ? (
        <>
          <WebView
            originWhitelist={['*']}
            source={{html: webViewContent}}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={navState => {
              const {url} = navState;
              if (url.includes('payment/success')) {
                Alert.alert('Payment Successful!');
                setShowCCAvenue(false);
              } else if (url.includes('payment/cancel')) {
                Alert.alert('Payment Cancelled');
                setShowCCAvenue(false);
              }
            }}
          />
        </>
      ) : (
        <PayFeeView
          data={data}
          feeDetail={props.feeDetail}
          navigation={props.navigation}
          userDetails={props.admitCardDetail}
          amount={amount}
          handleUpdate={handleUpdate}
          error={error}
          handlePay={handleFeePay}
          isPay={pay}
        />
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
  admitCardDetail: state.admitCard.admitCardData?.student_detail,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(PayFeeContainer);
