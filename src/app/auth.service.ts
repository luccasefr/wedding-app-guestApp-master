import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { WeedingService } from './weeding.service';
import { UserService } from './user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface user {
    about: string;
    age: string;
    confirmed: string;
    email: string;
    gender_id: string;
    photo1_url: string;
    photo2_url: string;
    photo3_url: string;
    profile_img: string;
    want_gender_id: string;
}

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router, private weedingService: WeedingService, private user: UserService, public toastr: ToastsManager) {
     }

    isLogged(): user {
        let id = localStorage.getItem('guestId');
        if (id) {
            return {
                about: localStorage.getItem('about'),
                age: localStorage.getItem('age'),
                confirmed: localStorage.getItem('confirmed'),
                email: localStorage.getItem('email'),
                gender_id: localStorage.getItem('gender_id'),
                photo1_url: localStorage.getItem('photo1_url'),
                photo2_url: localStorage.getItem('photo2_url'),
                photo3_url: localStorage.getItem('photo3_url'),
                profile_img: localStorage.getItem('profile_img'),
                want_gender_id: localStorage.getItem('want_gender_id'),
            }
        } else {
            return null;
        }
    }

    clear() {
        localStorage.removeItem('guestId');
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
    }

    login(guestId: string): Promise<any> {

        let header = new HttpHeaders({ 'GuestAuthorization': guestId });
        return new Promise((res, rej) => {

            this.http.get(environment.apiUrl + 'api/guest', { headers: header }).subscribe(async (response: any) => {
                localStorage.setItem('guestId', response.id);
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
                //localStorage.setItem('is_on_singles_meeting',response.is_on_singles_meeting);
                localStorage.setItem('is_on_singles_meeting', '0');

                let wedding = await this.weedingService.getInfo();
                console.log(wedding);
                localStorage.setItem('giftLists', JSON.stringify(wedding.gift_lists));
                localStorage.setItem('wedding_name_1', wedding.name_1);
                localStorage.setItem('wedding_name_2', wedding.name_2);
                if (wedding.wedding_date == null) {
                    localStorage.setItem('wedding_date', '');
                    localStorage.setItem('wedding_time', '');
                } else {
                    let dateTime = wedding.wedding_date.split(" ");
                    localStorage.setItem('wedding_date', dateTime[0]);
                    localStorage.setItem('wedding_time', dateTime[1]);
                }

                if (wedding.address == null) {
                    localStorage.setItem('wedding_address', '');
                } else {
                    localStorage.setItem('wedding_address', wedding.address.street + ' ' + wedding.address.number + ', ' + wedding.address.neighborhood + ', ' + wedding.address.city + ', ' + wedding.address.state + ' ' + wedding.address.cep);
                    localStorage.setItem('wedding_complement', wedding.address.complement == null ? '' : wedding.address.complement);
                }
                if (response.name != null) {
                    // localStorage.setItem('name',response.name);
                    if (response.age != null && response.profile_img != null) {
                        // localStorage.setItem('age',response.age);
                        // localStorage.setItem('profile_img',response.profile_img);

                        this.router.navigate(['/home']);
                    } else {

                        this.router.navigate(['/edit']);
                    }
                } else {

                    this.router.navigate(['/edit']);
                }
                this.user.getUser();
                res(response);
            }, (err) => {

                rej(err);
                this.toastr.error('<span>Código Inválido</span><button type="button" class="btn btn-danger">Ok</button>', null, {dismiss: 'click', enableHTML: true});
            })
        });
    }

}
