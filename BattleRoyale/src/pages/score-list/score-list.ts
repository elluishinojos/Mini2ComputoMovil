import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-score-list',
  templateUrl: 'score-list.html',
})
export class ScoreListPage {

  players: any[] = [
    {
      name: "pepe",
      score: 155
    },
    {
      name: "lupe",
      score: 144
    },
    {
      name: "chepe",
      score: 133   
    }
  ];
  nickname: string;
  sacudidas: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.nickname = this.navParams.get('nickname');
    this.sacudidas = this.navParams.get('shake');
    
    this.players.push({name:this.nickname, score:this.sacudidas});
  }

  cerrar() {
    this.navCtrl.popToRoot();
  }

}
