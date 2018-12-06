import { Injectable } from '@angular/core';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class WeedingService {

    constructor(private http: AuthenticatedHttpService) { }

    getInfo(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/guest/wedding').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            });
        });
    }

}
