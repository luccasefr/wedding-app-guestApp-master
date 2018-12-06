import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    showBox=false;
    modalShow=false;

    title;
    message;
    onConfirmed:()=>void;

  constructor() { }

  ngOnInit() {
  }

  open(title:string,message:string,onConfirmed:()=>void){
      this.title=title;
      this.message = message;
      this.onConfirmed = onConfirmed;
      this.modalShow=true;
      setTimeout(()=>{
          this.showBox = true;
      },1);
  }

  Close(){
      this.showBox=false;
      setTimeout(()=>{
          this.modalShow = false;
      },150);
  }

  Confirm(){
      this.onConfirmed();
      this.Close();
  }

}
