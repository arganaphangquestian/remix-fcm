import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React from "react";
import { firebaseConfig } from "~/utils/fcm-config";

const Fcm = () => {
  // TODO: Register Firebase and Generate Token
  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const getTokenFCM = async () => {
      return await getToken(getMessaging());
    };
    getTokenFCM().then((token) => {
      console.log(`USER TOKEN = ${token}`);
    });
    // onMessage(getMessaging(), (payload) => {
    //   console.log(payload);
    // });
    return () => {};
  }, []);
  return <></>;
};

export default Fcm;
