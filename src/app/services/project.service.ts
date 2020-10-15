//Modulos para hacer peticiones ajax
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Modelos
import { Project } from '../models/project';
import { Email } from '../models/email'

//Url api
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url
    }

    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(params);

        return this._http.post(this.url + 'save-project', params, { headers: headers });
    }

    getProjects(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'projects', { headers: headers });
    }

    getProject(projectId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'project/' + projectId, { headers: headers });
    }

    getImg(image): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'get-image/' + image, { headers: headers });
    }

    deleteProject(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'project-delete/' + id, { headers: headers });
    }

    updateProject(data, id){
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'project-update/'+id, params, { headers: headers });
    }

    sendEmail(data: Email): Observable<any>{
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'send-email', params, { headers: headers });
    }
}