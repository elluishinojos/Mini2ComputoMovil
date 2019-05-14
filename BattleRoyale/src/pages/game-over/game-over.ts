import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, SOUNDS } from "../../data/data.media";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nickname = this.navParams.get('nickname');
    this.sacudidas = this.navParams.get('shake');
    this.mediaSound = SOUNDS.slice(0);


    this.reproducir(this.mediaSound[0]);
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

  cerrar() {
    this.navCtrl.popToRoot();
  }

}
