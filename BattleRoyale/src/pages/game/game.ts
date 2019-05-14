import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, Platform, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Shake } from '@ionic-native/shake';
import { GameOverPage } from "../pages.index";


@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public timer = 0;
  nickname = '';
  sacudidas: number = 0;
  life: number = 100;
  //messages = [];
  //message = '';

  constructor(
    private navParams: NavParams,
    private socket: Socket,
    private platform: Platform,
    private shake: Shake,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {

    this.startGame()

    this.platform.ready().then(() => {
      this.shake.startWatch().subscribe(data => {
        this.sacudidas++;
        this.timer = 0;
      });
    })

    this.nickname = this.navParams.get('nickname');

    //this.getMessages().subscribe(message => {
    //  this.messages.push(message);
    //});

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  startGame() {
    var interval = setInterval(function () {
      this.timer++;
      if (this.timer % 3 == 0) {
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

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
