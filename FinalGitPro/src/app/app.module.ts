import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapViewPage } from '../pages/map-view/map-view';
import { ProfilePage } from '../pages/profile/profile';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


export const firebaseConfig = {
    apiKey: "AIzaSyAUuFQ1uPHen0b-sohkNT3b0gkZP5K-NXs",
    authDomain: "gitproject-1518386227613.firebaseapp.com",
    databaseURL: "https://gitproject-1518386227613.firebaseio.com",
    projectId: "gitproject-1518386227613",
    storageBucket: "gitproject-1518386227613.appspot.com",
    messagingSenderId: "544252970004"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	MapViewPage,
	ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
		MapViewPage,
		ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Geolocation, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
