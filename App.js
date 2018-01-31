/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AppState, 
  Alert
} from 'react-native';
// Import App Center Crashes at the top of the file.
// import Crashes from 'appcenter-crashes';
import Crashes, { ErrorAttachmentLog } from 'appcenter-crashes';
import Push from 'appcenter-push';
// import { AppState, Alert } from 'react-native';
// import App Center Analytics at the top of the file.
import Analytics from 'appcenter-analytics';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Button
            title="crash" 
            onPress={onCrash}
        >    
        </Button>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}
function onCrash(){
  throw new Error("This is a test JavaScript Crash!"); 
}

Analytics.trackEvent('Video clicked', { Category: 'Music', FileName: 'favorite.avi' });

Crashes.setListener({
    getErrorAttachments(report) {
        const textAttachment = ErrorAttachmentLog.attachmentWithText('Hello text attachment!', 'hello.txt');
        const binaryAttachment = ErrorAttachmentLog.attachmentWithBinary(`${imageAsBase64string}`, 'logo.png', 'image/png');
        return [textAttachment, binaryAttachment];
    }

    // Other callbacks must also be defined at the same time if used.
    // Default values are used if a method with return parameter is not defined.
});

class MyApp extends Component {
}
Push.setListener({
  onPushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null || message === undefined) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'Android background';
      message = '<empty>';
    }

    // Custom name/value pairs set in the App Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
    }
    else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
