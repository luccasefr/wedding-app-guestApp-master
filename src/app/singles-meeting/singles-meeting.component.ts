import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SinglesService } from '../singles.service';
import { NotificationsService } from '../notifications.service';

@Component({
    selector: 'app-singles-meeting',
    templateUrl: './singles-meeting.component.html',
    styleUrls: ['./singles-meeting.component.css']
})
export class SinglesMeetingComponent implements OnInit {

    editing = false;
    choosing = false;
    gueststoChose: Array<any>;
    actualGuest;
    data = {
        is_on_singles_meeting: 1
    };
    faHeart = faHeart;
    faTimes = faTimes;
    sending = false;
    done = false;
    public loading = false;
    finishedMatch = false;
    
    constructor(public userService: UserService, public singlesService: SinglesService, private notificationsService: NotificationsService) {
        this.checkIfIsAlredyOnSinglesMeeting();
    }

    async checkIfIsAlredyOnSinglesMeeting() {
        if (this.userService.user.is_on_singles_meeting == 1) {
            this.choosing = true;
            this.gueststoChose = await this.singlesService.getAll();
            this.actualGuest = this.gueststoChose.pop();
            console.log(this.actualGuest);
            this.loadGuestImages();
            console.log("texto");
            this.done = true;
            console.log(this.gueststoChose);
        }
    }

    readImage(data): Promise<any> {
        return new Promise((res, rej) => {
            let reader = new FileReader();

            reader.onload = (fileLoadedEvent: any) => {
                res(fileLoadedEvent.target.result);
            };

            reader.readAsDataURL(data);
        });
    }

    async loadGuestImages() {
        try {
            if (this.actualGuest == undefined || this.actualGuest == null) {
                this.finishedMatch = true;
                console.log("entrou no if")
            } else {
                this.loading = true;
                console.log("buscar imagens", this.actualGuest);
                this.actualGuest.mainImg = await this.readImage(await this.userService.getProfileImage(this.actualGuest.id));
                console.log("mainImg");
                this.actualGuest.img1 = await this.readImage(await this.userService.getImage1(this.actualGuest.id));
                console.log("img1");
                this.actualGuest.img2 = await this.readImage(await this.userService.getImage2(this.actualGuest.id));
                console.log("img2");
                this.actualGuest.img3 = await this.readImage(await this.userService.getImage3(this.actualGuest.id));
                console.log("img3");
                this.loading = false;
            }
            console.log("fora do else")
        } catch{
            this.loading = false;
            console.log("buscou");
        }
    }

    ngOnInit() {

    }

    async uploadImage(event, name) {
        if (event.target.files.length > 0) {
            let formData = new FormData();
            formData.append(name, event.target.files[0]);

            let response = await this.userService.update(formData);
        };
    }

    async uploadProfilleImage(event) {
        await this.uploadImage(event, 'image');
        this.userService.loadImages();
    }

    async uploadImage1Image(event) {
        await this.uploadImage(event, 'image_1');
        this.userService.loadImages();
    }

    async uploadImage2Image(event) {
        await this.uploadImage(event, 'image_2');
        this.userService.loadImages();
    }

    async uploadImage3Image(event) {
        await this.uploadImage(event, 'image_3');
        this.userService.loadImages();
    }

    async onSubmit() {
        console.log('a');
        this.loading = true;
        let response = await this.userService.update(this.data);
        console.log('b');
        this.checkIfIsAlredyOnSinglesMeeting();
        this.editing = false;
        this.loading = false;
        console.log('c');
    }

    like() {
        this.singlesService.like(this.actualGuest.id);
        if (this.gueststoChose.length == 1) {
            this.finishedMatch = true;
        } else {
            this.actualGuest = this.gueststoChose.pop();
            this.loadGuestImages();
        }
    }

    deslike() {
        this.singlesService.deslike(this.actualGuest.id);
        if (this.gueststoChose.length == 1) {
            this.finishedMatch = true;
        } else {
            this.actualGuest = this.gueststoChose.pop();
            this.loadGuestImages();
        }
    }

}
