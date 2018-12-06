import { Injectable } from '@angular/core';
import { AuthenticatedHttpService } from './authenticated-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class SinglesService {

    constructor(private http:AuthenticatedHttpService) {
    }

    getAll():Promise<any>{
        return new Promise((res,rej)=>{
            this.http.get(environment.apiUrl+'api/guest/singles').subscribe((response)=>{
                res(response);
                console.log("imprimir response", response)
            },(err)=>{
                rej(err);
            });
        });
    }

    like(guestId):Promise<any>{
        return new Promise((res,rej)=>{
            this.http.post(environment.apiUrl+'api/guest/'+guestId+'/like',{liked:true}).subscribe((response)=>{
                res(response);
            },(err)=>{
                rej(err);
            });
        });
    }

    deslike(guestId):Promise<any>{
        return new Promise((res,rej)=>{
            this.http.post(environment.apiUrl+'api/guest/'+guestId+'/like',{liked:false}).subscribe((response)=>{
                res(response);
            },(err)=>{
                rej(err);
            });
        });
    }

}
