import { Component, OnInit, NgZone } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ModalComponent } from '../modal/modal.component';

// declare var window.QRScanne

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    faCamera = faCamera;
    faTimesCircle = faTimesCircle;
    scaning = false;
    code;

    constructor(private zone: NgZone, private auth: AuthService, private user: UserService) { }

    ngOnInit() {
        this.user.clear();
        this.auth.clear();
    }

    async onSubmit() {

        await this.auth.login(this.code);
  
    }

    QRScan() {
        (<any>window).QRScanner.scan((err, text) => this.zone.run(async () => {
            if (err) {
                console.log(err);
                alert("Erro ao scanear");
            } else {
                this.code = text;
                this.scaning = false;
                (<any>window).QRScanner.destroy(function (status) {
                    console.log(status);
                });
                await this.auth.login(this.code);
                // alert(text);
            }
        }));
    }

    openQRScaner() {
        (<any>window).QRScanner.show((status) => {
            console.log(status);
            this.QRScan();
            this.scaning = true;
        });
    }

    hideQRScaner() {
        this.scaning = false;
        (<any>window).QRScanner.hide();
    }

}
