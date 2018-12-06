import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebSocketService {

  private socket; //socket que conecta ao socket.io server

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.apiUrl);

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received a message from websocket server");
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    }

    return Rx.Subject.create(observer, observable);
  }
}
