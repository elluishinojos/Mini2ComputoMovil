import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {

  constructor(public http: HttpClient, public socket: Socket) {
    console.log('Hello SocketProvider Provider');
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  disconnect(){
    this.socket.disconnect();
  }
}
