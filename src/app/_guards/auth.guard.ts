import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
    users: User[] = [];
    token: any;
    pass: boolean = false;
    expired: boolean;
 
    constructor(private router: Router, private authService: AuthenticationService) { }
 
    canActivate() {


        this.token = this.authService.getToken();
        this.expired = this.authService.isTokenExpired();

        if ( this.token ) {
            
            if (this.expired) {
                var response: any = this.authService.delegateToken().subscribe(result => {
                    console.log(localStorage.getItem('currentUser'));
                    console.log(result);
                    return result;
                });

                if ( response.status === 200 ) {
                   this.authService.setToken( response.t );
                   return true;
                }
                else {
                    this.authService.logout();
                    this.router.navigate(['/login']);
                    return false;

                }
            }


            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}