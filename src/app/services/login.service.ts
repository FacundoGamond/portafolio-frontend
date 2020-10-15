//Modulos para hacer peticiones ajax
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


//Url api
import { Global } from './global';

@Injectable()
export class LoginService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url
    }

    login(data): Observable<any>{
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, { headers: headers });
    }

}