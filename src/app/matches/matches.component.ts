import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from '../matches.service';
import { NotificationsService } from '../notifications.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements OnInit {
    
    matches;
    imgPerfil;
    public loading = false;
    constructor(public router: Router, private MatchesService: MatchesService, private notificationsService: NotificationsService) { 
        this.getMatches();
    }

    ngOnInit() {
        this.loading = true;
    }

    getMatchesImg(post) {
        return new Promise(async (res, rej) => {
            let reader = new FileReader();
            reader.onload = (response: any) => {
                this.matches.image = response.target.result;
                res(response.target.result);
                
            }
            reader.readAsDataURL(await this.MatchesService.getMatchesImg(post.id));
        });
    }

    getProfileImg(i ,id){
        return new Promise(async (res, rej) => {
            let reader = new FileReader();
            reader.onload = (response: any) => {
                this.matches[i].imgPerfil = response.target.result;
                res(response.target.result);
            }
            reader.readAsDataURL(await this.MatchesService.getProfileImage(id));
        });
    }

    async getMatches() {
        this.matches = await this.MatchesService.getMatches();  
        this.loading = false;
        for (let i = 0; i < this.matches.length; i++) {
            this.getProfileImg(i ,this.matches[i].id);
            if (this.matches[i].image_url) {
                this.getMatchesImg(this.matches[i]);
            }
            if (this.matches[i].guest_id == localStorage.getItem('guestId')) {
                this.matches[i].isMine = true;
            } else {
                this.matches[i].isMine = false;
            }
        }
    }
}