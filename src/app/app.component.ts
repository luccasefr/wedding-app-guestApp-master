import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  device;

  constructor(public auth: AuthService, public router: Router, private toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    console.log('initied');
    document.addEventListener('deviceready', () => {
      console.log('device ready called');
      // alert(device.platform)
    }, false);
  }

}
