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
 
    constructor(private router: Router, private authService: AuthenticationService) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            // console.log('has token');
            // console.log('____');
            // console.log(localStorage.getItem('currentUser'));
            // this.authService.delegateToken()
            //     .subscribe(user => {
            //         this.token = user;
            //      localStorage.setItem('currentUser', this.token );
            //         console.log(user);
            //         this.pass = true;
            //     }

            // );

            // if (this.pass) {
            //     return true;
            // }
            // else {
            //     this.router.navigate(['/login']);
            // }
             return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}