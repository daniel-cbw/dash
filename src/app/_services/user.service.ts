import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    // delegateToken(): Observable<User[]> {
    //     // add authorization header with jwt token
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     let options = new RequestOptions({ headers: headers });
 
    //     // get users from api
    //     return this.http.get('/api/r', options)
    //         .map((response: Response) => response.json());
    // }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/u', options)
            .map((response: Response) => response.json());
    }
}