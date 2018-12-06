import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule }   from '@angular/forms';

import { AuthService } from './auth.service';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { AuthGuardService } from './auth-guard.service';
import { WeedingService } from './weeding.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { MatchesService } from './matches.service';
import { NotificationsService } from './notifications.service';
import { SinglesService } from './singles.service';
import { AppComponent } from './app.component';
import { PlaylistService } from './playlist.service';
import { WebSocketService } from './web-socket.service';
import { webSocketChatService } from './webSocketChat.service';
import { routes } from '../routes';

import { LoginComponent } from './login/login.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { ModalComponent } from './modal/modal.component';
import { InfoComponent } from './info/info.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SinglesMeetingComponent } from './singles-meeting/singles-meeting.component';
import { ChatComponent } from './chat/chat.component';

import { LoadingModule } from 'ngx-loading';

//Import toast module
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatchesComponent } from './matches/matches.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditInfoComponent,
    HomeComponent,
    NavbarComponent,
    PostsComponent,
    ModalComponent,
    InfoComponent,
    PlaylistComponent,
    SinglesMeetingComponent,
    ChatComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule, 
    LoadingModule,
    ToastModule.forRoot()
  ],
  providers: [
      AuthService,
      AuthenticatedHttpService,
      AuthGuardService,
      WeedingService,
      UserService,
      PostService,
      PlaylistService,
      SinglesService,
      MatchesService,
      NotificationsService,
      WebSocketService,
      webSocketChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
