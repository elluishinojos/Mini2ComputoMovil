import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, Platform, NavController } from 'ionic-angular';
import { SocketProvider } from '../../providers/socket/socket';
import { Observable } from 'rxjs/Observable';
import { Shake } from '@ionic-native/shake';
import { GameOverPage } from "../pages.index";
import { Media, SOUNDS } from "../../data/data.media";
import { NativeAudio } from '@ionic-native/native-audio';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public timer = 0;
  nickname = '';
  sacudidas: number = 0;
  life: number = 10;
  //messages = [];
  //message = '';
  audio = new Audio();
  audioTiempo: any;
  mediaSound: Media[] = [];

  constructor(
    private navParams: NavParams,
    private socket: SocketProvider,
    private platform: Platform,
    private shake: Shake,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private nativeAudio: NativeAudio
  ) {
    this.mediaSound = SOUNDS.slice(0);
    this.nativeAudio.preloadSimple('ticking', 'assets/sounds/ticking.wav').then(() => {

      this.nativeAudio.loop('ticking').then(() => console.log('uniqueId1 is done playing'));
    });

    this.startGame()

    this.platform.ready().then(() => {
      this.shake.startWatch().subscribe(data => {
        this.sacudidas++;
        this.timer = 0;
        this.reproducir(this.mediaSound[2]);
      });
    })

    this.nickname = this.navParams.get('nickname');

    //this.socket.getMessages().subscribe(message => {
    //  this.messages.push(message);
    //});

    this.socket.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  reproducir(sound: Media) {
    if (sound.reproduciendo) {
      sound.reproduciendo = false;
      return;
    }
    console.log(sound);
    this.audio.src = sound.audio;
    this.audio.load();
    this.audio.play();
    sound.reproduciendo = true;
    this.audioTiempo = setTimeout(() => sound.reproduciendo = false, sound.duracion * 1000);
  }


  startGame() {
    var interval = setInterval(function () {
      this.timer++;
      if (this.timer % 2 == 0) {
        this.life--;
      }
      if (this.life == 0) {
        clearInterval(interval)
        this.gameOver();
      }
    }.bind(this), 1000)
  }

  gameOver() {
    this.navCtrl.push(GameOverPage, { 'shake': this.sacudidas, 'nickname': this.nickname });
    this.socket.disconnect();
  }

  //sendMessage() {
  //  this.socket.emit('add-message', { text: this.message });
  //  this.message = '';
  //}

  ionViewWillLeave() {

    this.nativeAudio.unload('ticking').then(()=>{});
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
