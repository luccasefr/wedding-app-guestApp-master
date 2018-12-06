import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticatedHttpService {

    constructor(private http: HttpClient) {
    }

    get(endpoint, contentType?) {
        let httpOptions = {
            headers: new HttpHeaders({ 'GuestAuthorization': localStorage.getItem('guestId') }),
            responseType: contentType ? contentType : 'json'
        };
        return this.http.get(endpoint, httpOptions);
    }

    post(endpoint, data) {
        let httpOptions = {
            headers: new HttpHeaders({ 'GuestAuthorization': localStorage.getItem('guestId') })
        };
        return this.http.post(endpoint, data, httpOptions);
    }

}
