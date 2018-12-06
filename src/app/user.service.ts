import { Injectable, NgZone } from '@angular/core';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { environment } from '../environments/environment';

declare var FCMPlugin;

@Injectable()
export class UserService {
    user;
    token;
    
    constructor(private http: AuthenticatedHttpService, private zone: NgZone) {
        console.log('user service creator');
        this.getUser();
    }

    getUser() {
        this.user = {
            name: localStorage.getItem('name'),
            about: localStorage.getItem('about'),
            age: localStorage.getItem('age'),
            confirmed: localStorage.getItem('confirmed'),
            is_on_singles_meeting: localStorage.getItem('is_on_singles_meeting'),
            email: localStorage.getItem('email'),
            gender_id: localStorage.getItem('gender_id'),
            photo1_url: localStorage.getItem('photo1_url'),
            photo2_url: localStorage.getItem('photo2_url'),
            photo3_url: localStorage.getItem('photo3_url'),
            profile_img: localStorage.getItem('profile_img'),
            want_gender_id: localStorage.getItem('want_gender_id'),
            wedding_name_1: localStorage.getItem('wedding_name_1'),
            wedding_name_2: localStorage.getItem('wedding_name_2'),
            wedding_address: localStorage.getItem('wedding_address'),
            wedding_date: localStorage.getItem('wedding_date'),
            wedding_time: localStorage.getItem('wedding_time'),
            giftLists: JSON.parse(localStorage.getItem('giftLists'))
        }
        this.loadImages();
        this.setCallBackToken();
    }

    loadImages() {
        this.loadProfileImage();
        this.loadImage1();
        this.loadImage2();
        this.loadImage3();
    }

    registerFcmToken(token): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/guest/register-fcm-token', { 'token': token }).subscribe((response: any) => {
                res(response);
                console.log(response)

            }, (error) => {
                rej(error);
            })
        });
    }


    setCallBackToken() {
        try {
            FCMPlugin.onTokenRefresh(async (token) => {
                this.token = token;
                console.log("ON TOKEN REFRESH");
                console.log(token);

                let response = await this.registerFcmToken(token)
            });

            FCMPlugin.getToken(async (token) => {
                this.token = token;
                console.log("GET TOKEN");
                console.log(token);

                let response = await this.registerFcmToken(token)
                console.log('registro token', response);
            });
        } catch (err) {

        }
    }
    confirmPresence(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/guest/confirm-presence', {}).subscribe((response) => {
                this.user.confirmed = 1;
                localStorage.setItem('confirmed', '1'),
                    res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    unconfirmPresence(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/guest/unconfirm-presence', {}).subscribe((response) => {
                this.user.confirmed = 0;
                localStorage.setItem('confirmed', '0'),
                    res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    clear() {
        this.user = undefined;
        localStorage.removeItem('name');
        localStorage.removeItem('about');
        localStorage.removeItem('age');
        localStorage.removeItem('confirmed');
        localStorage.removeItem('email');
        localStorage.removeItem('gender_id');
        localStorage.removeItem('photo1_url');
        localStorage.removeItem('photo2_url');
        localStorage.removeItem('photo3_url');
        localStorage.removeItem('profile_img');
        localStorage.removeItem('want_gender_id');
        localStorage.removeItem('wedding_name_1');
        localStorage.removeItem('wedding_name_2');
        localStorage.removeItem('is_on_singles_meeting');
    }

    update(guest): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/guest/' + localStorage.getItem('guestId') + '/update', guest).subscribe((response: any) => {
                console.log(response);
                localStorage.setItem('name', response.name == null ? '' : response.name);
                localStorage.setItem('about', response.about == null ? '' : response.about);
                localStorage.setItem('age', response.age == null ? '' : response.age);
                localStorage.setItem('confirmed', response.confirmed);
                localStorage.setItem('email', response.email == null ? '' : response.email);
                localStorage.setItem('gender_id', response.gender_id);
                localStorage.setItem('photo1_url', response.photo1_url);
                localStorage.setItem('photo2_url', response.photo2_url);
                localStorage.setItem('photo3_url', response.photo3_url);
                localStorage.setItem('profile_img', response.profile_img);
                localStorage.setItem('want_gender_id', response.want_gender_id);
                localStorage.setItem('is_on_singles_meeting', response.is_on_singles_meeting);
                this.user = {
                    name: response.name,
                    about: response.about,
                    age: response.age,
                    confirmed: response.confirmed,
                    email: response.email,
                    gender_id: response.gender_id,
                    photo1_url: response.photo1_url,
                    photo2_url: response.photo2_url,
                    photo3_url: response.photo3_url,
                    profile_img: response.profile_img,
                    want_gender_id: response.want_gender_id,
                    is_on_singles_meeting: response.is_on_singles_meeting,
                    wedding_name_1: localStorage.getItem('wedding_name_1'),
                    wedding_name_2: localStorage.getItem('wedding_name_2'),
                    giftLists: JSON.parse(localStorage.getItem('giftLists'))
                }
                this.loadImages();
                res(response);
            }, (err) => {
                rej(err);
            });
        });
    }

    getProfileImage(id?): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + (id ? id : localStorage.getItem('guestId')) + '/profile-img', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getImage1(id?): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + (id ? id : localStorage.getItem('guestId')) + '/image1', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getImage2(id?): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + (id ? id : localStorage.getItem('guestId')) + '/image2', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getImage3(id?): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + (id ? id : localStorage.getItem('guestId')) + '/image3', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    async loadProfileImage() {
        let reader = new FileReader();

        reader.onload = (fileLoadedEvent: any) => this.zone.run(() => {
            this.user.profileImgData = fileLoadedEvent.target.result;
            console.log(this.user);
        });

        reader.readAsDataURL(await this.getProfileImage());
    }

    async loadImage1() {
        if (this.user.photo1_url != "null" && this.user.photo1_url != null) {
            let reader = new FileReader();

            reader.onload = (fileLoadedEvent: any) => this.zone.run(() => {
                this.user.image1Data = fileLoadedEvent.target.result;
            });

            try {
                reader.readAsDataURL(await this.getImage1());
            } catch (err) {
            }
        }
    }

    async loadImage2() {
        if (this.user.photo2_url != "null" && this.user.photo2_url != null) {
            let reader = new FileReader();

            reader.onload = (fileLoadedEvent: any) => this.zone.run(() => {
                this.user.image2Data = fileLoadedEvent.target.result;
            });

            try {
                reader.readAsDataURL(await this.getImage2());
            } catch (err) {

            }
        }
    }

    async loadImage3() {
        if (this.user.photo3_url != "null" && this.user.photo3_url != null) {
            let reader = new FileReader();

            reader.onload = (fileLoadedEvent: any) => this.zone.run(() => {
                this.user.image3Data = fileLoadedEvent.target.result;
            });

            try {
                reader.readAsDataURL(await this.getImage3());
            } catch (err) {

            }
        }
    }
}
