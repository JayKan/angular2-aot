import {
  AngularFireModule,
  AuthMethods,
  FirebaseAppConfig
} from 'angularfire2';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAbYUDfUaW7WNYe5CxkUfBrEiTodYMUQ0g",
  authDomain: "angular2-aot.firebaseapp.com",
  databaseURL: "https://angular2-aot.firebaseio.com",
  storageBucket: "angular2-aot.appspot.com"
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);