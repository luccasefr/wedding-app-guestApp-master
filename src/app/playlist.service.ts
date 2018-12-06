import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthenticatedHttpService } from './authenticated-http.service';

@Injectable()
export class PlaylistService {

    constructor(private http: AuthenticatedHttpService) { }

    save(data): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/songs', data).subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            });
        });
    }

    getAll(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/songs').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            });
        });
    }

    like(songId) {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/song/' + songId + '/like', {}).subscribe((response: any) => {
                res(response.guests_likes);
            }, (err) => {
                rej(err);
            });
        });
    }
}
