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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.nickname = this.navParams.get('nickname');
    this.usuario = this.navParams.get('tipo');
  }

  startGame() {
    this.navCtrl.push(GamePage, { nickname: this.nickname });
  }

}
