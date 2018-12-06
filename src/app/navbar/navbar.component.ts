import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    faBars=faBars;
    profileImgData;
    name;
    opened=false;
    pages=[
        {name:'Home',route:'/home'},
        {name:'Mural',route:'/posts'},
        {name:'Informações',route:'/info'},
        {name:'Crush',route:'/singles-meeting'},
        {name:'Playlist',route:'/playlist'},
        {name:'Outros eventos',route:'/home'},
        {name:'Perfil',route:'/edit'},
        {name:'Matches',route:'/matches'},
        {name:'Sair',route:'/login'},
    ]

  constructor(public userService:UserService,public router:Router) { }

  ngOnInit() {
      // this.loadImage();
      // this.name = this.userService.user.name;
  }

  async loadImage(){
      let reader = new FileReader();

      reader.onload=(fileLoadedEvent:any)=>{
          this.profileImgData=fileLoadedEvent.target.result;
      }

      reader.readAsDataURL(await this.userService.getProfileImage());
  }

}
