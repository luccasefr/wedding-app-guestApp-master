import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchesService } from '../matches.service';
import { NotificationsService } from '../notifications.service';
import { WebSocketService } from '../web-socket.service';
import { webSocketChatService } from '../webSocketChat.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  wsMessages: Subject<any>;
  messageJson;
  form;
  text;
  name: string;
  id: string;
  imgPerfil;
  conversations;
  msg = false;
  public loading = false;

  constructor(public router: Router,
    private matchService: MatchesService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private wsService: WebSocketService,
    private wsChat: webSocketChatService) 
    {
    this.id = route.snapshot.params['id'];
    this.name = route.snapshot.params['name'];
    this.getAll(this.id);
    this.form = new FormData();

    this.wsMessages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
    }

  ngOnInit() {
    this.loading = true;
    this.wsChat.messages.subscribe(message => {
      console.log(message);
    })
  }

  async onSubmit() {
    this.form.append('message', this.text);
    this.postarMensagem(this.text);
    console.log("%c AS CONVERSAS ESTÃO AQUII", 'color:pink; font-weight: bold;');
    console.log("THIS CONVERSATIONS", this.conversations);
    await this.matchService.postGuestConversationsMatch(this.id, this.form);
    this.msg = true;
  }

  postarMensagem(message) {
    this.conversations.push({ 'message': message });
    this.wsMessages.next(message);
    this.wsChat.sendMessage(this.text);
    this.text = "";
    this.getMsg();
  }

  getProfileImg(id) {
    return new Promise(async (res) => {
      let reader = new FileReader();
      reader.onload = (response: any) => {
        this.imgPerfil = response.target.result;
        res(response.target.result);
        this.loading = false;
      }
      reader.readAsDataURL(await this.matchService.getProfileImage(id));
    });
  }

  async getMsg() {
    this.messageJson = await this.notificationsService.receiveNotificationMessage();
    console.log('%c AQUI TA A MENSAGEM JSON', 'color:yellow; font-weight: bold;');
    console.log(this.messageJson);
  }

  async getAll(id) {
    this.conversations = await this.matchService.guestConversationsMatch(id);
    if (this.conversations.length != 0) {
      this.msg = true;
    }

    this.getProfileImg(id);
    this.loading = false;
  }
}