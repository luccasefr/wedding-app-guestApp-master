import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { WeedingService } from '../weeding.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
    user;
    profileImgData;
    data:any={};
  constructor(public userService:UserService,public router:Router) {
  }

  ngOnInit() {
      this.user = this.userService.user;
      console.log(this.user)
      this.data.name = this.user.name;
      this.data.gender_id = this.user.gender_id;
      this.data.age = this.user.age;
  }

  async uploadImage(event){
      if(event.target.files.length>0){
         let formData = new FormData();
         formData.append('image',event.target.files[0]);

         let response = await this.userService.update(formData);
         this.user = this.userService.user;
         this.userService.loadImages();
     };
  }

  async onSubmit(){
       let response = await this.userService.update(this.data);
       this.router.navigate(['/home']);
  }

  async loadImage(){
      let reader = new FileReader();

      reader.onload=(fileLoadedEvent:any)=>{
          this.profileImgData=fileLoadedEvent.target.result;
      }

      reader.readAsDataURL(await this.userService.getProfileImage());
  }



}
