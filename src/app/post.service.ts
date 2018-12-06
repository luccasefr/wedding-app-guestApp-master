import { Injectable } from '@angular/core';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { environment } from '../environments/environment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class PostService {

    constructor(private http: AuthenticatedHttpService, public toastr: ToastsManager) { }

    post(data): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/post', data).subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
                this.toastr.error('<span>Error</span><button type="button" class="btn btn-danger">Ok</button>', null, { dismiss: 'click', enableHTML: true });
            })
        });
    }

    getAll(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/posts').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    getPpostImage(postId): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/post/' + postId + '/image', 'blob').subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    deletePost(postId) {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/post/' + postId, { '_method': 'delete' }).subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    like(id): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/post/' + id + '/like', {}).subscribe((response) => {
                res(response);
            }, (err) => {
                rej(err);
            })
        });
    }

    likes(id): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/post/' + id + '/likes').subscribe((response) => {
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
