import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GamePage, LobbyPage, PlayerListPage, GameOverPage, ScoreListPage } from '../pages/pages.index';

import { Shake } from '@ionic-native/shake';
import { NativeAudio } from '@ionic-native/native-audio';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SocketProvider } from '../providers/socket/socket';
const config: SocketIoConfig = { url: 'http://10.2.60.32:3001', options: {} };




@NgModule({
  declarations: [
    MyApp,
    GamePage, 
    LobbyPage,
    PlayerListPage, 
    GameOverPage,
    ScoreListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage, 
    LobbyPage,
    PlayerListPage, 
    GameOverPage,
    ScoreListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Shake,
    NativeAudio,
    SocketProvider,
    HttpClient
  ]
})
export class AppModule {}
