import { SocketProvider } from './../../providers/socket/socket';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-over',
  templateUrl: 'game-over.html',
})
export class GameOverPage {
  nickname: string;
  sacudidas: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public socket: SocketProvider) {
    this.nickname = this.navParams.get('nickname');
    this.sacudidas = this.navParams.get('shake');
  }

  cerrar() {
    this.socket.disconnect();
    this.navCtrl.popToRoot();
  }

}
