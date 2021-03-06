import { SocketProvider } from './../../providers/socket/socket';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, SOUNDS } from "../../data/data.media";
import { ScoreListPage } from "../pages.index";

@IonicPage()
@Component({
  selector: 'page-game-over',
  templateUrl: 'game-over.html',
})
export class GameOverPage {
  nickname: string;
  sacudidas: number;
  audio = new Audio();
  audioTiempo: any;
  mediaSound: Media[] = [];
  allgameover: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public socket: SocketProvider) {
    this.nickname = this.navParams.get('nickname');
    this.sacudidas = this.navParams.get('shake');
    this.mediaSound = SOUNDS.slice(0);


    this.reproducir(this.mediaSound[3]);
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

  continuar() {
    this.navCtrl.push(ScoreListPage, { 'shake': this.sacudidas, 'nickname': this.nickname });
  }
  cerrar() {
    this.socket.disconnect();
    this.navCtrl.popToRoot();
  }

}
