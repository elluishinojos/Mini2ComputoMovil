import { PlayerListPage } from './../pages.index';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html',
})
export class LobbyPage {
  nickname = '';
  tipo: boolean;

  constructor(public navCtrl: NavController, private socket: Socket) { }

  joinGame(type: boolean) {
    this.tipo = type;
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);

    console.log(this.tipo);
    this.navCtrl.push(PlayerListPage, { 'nickname': this.nickname, 'tipo': this.tipo });
  }
}