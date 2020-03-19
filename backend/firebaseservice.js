const firebase = require("firebase-admin");
 
  const serviceAccount = require("./secrete.json");
 
  // The Firebase token of the device which will get the notification
  // It can be a string or an array of strings
  

  const firebaseToken = 'dpshIytR30Y:APA91bHNVYSMYlIvH_Y9Vu_wL4Mc0vr9OjHIeawXf71WiYlgwv2md2A3wRwHKVjFmg02ZrYLK_yzHuTS14MXvQ17xO7aeklAIzHZtLJx-bnp7rwWPSjl13BtmkHq4q_GpcrsQmQBlrEg';
 
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://pushservice.firebaseio.com"
  });
 
  const payload = {
    notification: {
      title: 'Notification Title',
      body: 'This is an example notification',
    }
  };
 
  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
  };
  
  const messaging = firebase.messaging(); 
  messaging.sendToDevice(firebaseToken, payload, options);
