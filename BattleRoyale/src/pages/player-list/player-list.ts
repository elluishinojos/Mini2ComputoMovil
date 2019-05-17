import { SocketProvider } from './../../providers/socket/socket';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from "../pages.index";

@IonicPage()
@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html',
})
export class PlayerListPage {
  nickname = '';
  usuario: boolean;


  ionViewDidLoad(){
    console.log(this.usuario);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public socket: SocketProvider) {

    this.nickname = this.navParams.get('nickname');
    this.usuario = this.navParams.get('tipo');
    console.log(this.nickname);
    this.socket.getSocket().on('start', (name) => {
      this.navCtrl.push(GamePage, { nickname: this.nickname });
    })
  }

  startGame() {
    this.socket.getSocket().emit('game-start', this.nickname);
  }

}
