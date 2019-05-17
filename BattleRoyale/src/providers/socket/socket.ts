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

  hosts=[];
  loosers=[];

  constructor(public http: HttpClient, public socket: Socket) {
    this.socket.on('loosers', (array)=>{
      this.loosers=array;
    });
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

  getSocket():Socket{
    return this.socket;
  }

  disconnect(){
    this.socket.disconnect();
  }
}
