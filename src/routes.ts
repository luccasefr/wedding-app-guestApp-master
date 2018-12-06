
import { Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { AuthGuardService } from './app/auth-guard.service';
import { EditInfoComponent } from './app/edit-info/edit-info.component';
import { HomeComponent } from './app/home/home.component';
import { PostsComponent } from './app/posts/posts.component';
import { InfoComponent } from './app/info/info.component';
import { PlaylistComponent } from './app/playlist/playlist.component';
import { SinglesMeetingComponent } from './app/singles-meeting/singles-meeting.component';
import { ChatComponent } from './app/chat/chat.component';
import { MatchesComponent } from './app/matches/matches.component';

export const routes:Routes=[
    { path:'login',component:LoginComponent},
    { path:'edit',component:EditInfoComponent,canActivate: [AuthGuardService] },
    { path:'singles-meeting',component:SinglesMeetingComponent,canActivate: [AuthGuardService] },
    { path:'home',component:HomeComponent,canActivate: [AuthGuardService] },
    { path:'posts',component:PostsComponent,canActivate: [AuthGuardService] },
    { path:'info',component:InfoComponent,canActivate: [AuthGuardService] },
    { path:'playlist',component:PlaylistComponent,canActivate: [AuthGuardService] },
    { path:'chat',component:ChatComponent,canActivate: [AuthGuardService] },
    { path:'matches',component:MatchesComponent,canActivate: [AuthGuardService] },
    { path:'chat/:id/:name',component:ChatComponent,canActivate: [AuthGuardService] },
    { path: '',redirectTo: '/home',pathMatch: 'full' },
    { path: '**',component:LoginComponent }
];
