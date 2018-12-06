import { Injectable } from '@angular/core';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class MatchesService {

    constructor(private http: AuthenticatedHttpService) { }

    guestConversations(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/match-conversation').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    guestConversationsMatch(id): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + id + '/match-conversation').subscribe((response) => {
                res(response);
                console.log("PROMISE NO SERVICE", response)
            }, (err) => {
                rej(err);
            })
        });
    }

    postGuestConversationsMatch(id, data): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/guest/' + id + '/match', data).subscribe((response) => {
                res(response);
                console.log("RESPOSTA NO SERVICE", response)
            }, (err) => {
                rej(err);
            })
        });
    }

    getMatches(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/guests-matches').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getMatchesImg(postId): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/post/' + postId + '/image', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getProfileImage(guestId): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/' + guestId + '/profile-img', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }
}