import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;

    jwtHelper: JwtHelper = new JwtHelper();
 
    constructor(private http: Http) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let currentUser = localStorage.getItem('currentUser');
        this.token = currentUser;
    }
 
    login(email: string, password: string): Observable<boolean> {

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('email', email);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString()

        return this.http.post('/auth/login', body, {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.setItem('currentUser', this.token );
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    } 

    isTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(this.token);
    }

    delegateToken(): Observable<any> {

        //let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('token', this.token);
        let body = urlSearchParams.toString();
         //console.log(body);
        
        // send token to api for delegation
        return this.http.post('/api/d', body, { headers: headers })
            .map((response: Response) => response.json());
    }

    getToken(): string {
        return this.token;
    }

    setToken( token: string ): void {
        this.token = token;
        localStorage.setItem('currentUser', this.token );
        console.log(localStorage.getItem('currentUser'));
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}