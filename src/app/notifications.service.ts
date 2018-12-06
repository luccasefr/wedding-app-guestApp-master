import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var FCMPlugin;

@Injectable()
export class NotificationsService {
  titulo;
  constructor(public router: Router, public toastr: ToastsManager) {
    this.receiveNotificationMessage()
  }

  receiveNotificationMessage() {
    try {
      FCMPlugin.onNotification(
        (data) => {
          if (data.wasTapped) {
            //Notification was received on device tray and tapped by the user.
            //console.log(JSON.stringify(data))
            this.titulo = JSON.stringify(data.title)

            switch (this.titulo) {
              case '"chat"': {
                this.router.navigate(['/matches']);
                alert("Você foi redirecionado para o chat")
                break;
              }
              case '"post"': {
                this.router.navigate(['/posts']);
                alert("Você foi redirecionado para o mural")
                break;
              }
              case '"match"': {
                this.router.navigate(['/singles-meeting'])
                alert("Você foi redirecionado para matches")
                break;
              }
              default: {
                alert(this.titulo)
                alert("Não há titulo na mensagem")
                break;
              }
            }
          } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            //console.log(JSON.stringify(data))
            this.titulo = JSON.stringify(data.title)

            switch (this.titulo) {
              case '"chat"': {
                this.router.navigate(['/matches'])
                alert("Você será redirecionado para o chat")
                break;
              }
              case '"post"': {
                this.router.navigate(['/posts'])
                alert("Você será redirecionado para o mural")
                break;
              }
              case '"match"': {
                this.router.navigate(['/singles-meeting'])
                alert("Você será redirecionado para matches")
                break;
              }
              default: {
                alert(this.titulo)
                alert("Não há titulo na mensagem")
                break;
              }
            }
          }
        },
        function (msg) {
          console.log('onNotification callback successfully registered: ' + msg);
        },
        function (err) {
          console.log('Error registering onNotification callback: ' + err);
        }
      );
      console.log('Received Event: ');
    } catch (err) {
      console.log("ERRO no on Notification Error callback " + err)
    }
  }
}
  /*******  Token tablet approx ********/

  //dZOkgEuyYq8:APA91bFX00gUFimqskoiK9Rg1vF3iLtajfhsRJ1-Kqc1XKHDR7b6gf6Mvq6nvuTUoZL6rESWzJfVcs7mJVgMYCXt9s4ptzpovP3xTK3Frrqf9fMzbtz5G24xHQcEXlTBOtmTu-olUYwF
// API KEY: AIzaSyBWwRdbAChSOW0uRkbrBm-_IKAMrYtgvwM
