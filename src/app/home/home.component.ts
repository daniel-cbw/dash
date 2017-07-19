import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
 
@Component({
    moduleId: module.id.toString(),
    styleUrls: [ 'home.component.css' ],
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    users: User[] = [];
    token: any;
    debug = '';

    jwtHelper: JwtHelper = new JwtHelper();
 
    constructor(private userService: UserService,public authHttp: AuthHttp) { }
 
    ngOnInit() {
        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(users => {
        //          this.users = users;
                
        //         console.log(users);
        //     });

        // this.authService.delegateToken()
        //     .subscribe(user => {
        //         this.token = user;
        //     // this.user.id = users.user.id;
        //         // this.token = user.
        //      localStorage.setItem('currentUser', this.token );
        //     console.log(user);
        //     }
        // );

        var token = localStorage.getItem('currentUser');

            console.log(
                this.jwtHelper.decodeToken(token),
                this.jwtHelper.getTokenExpirationDate(token),
                this.jwtHelper.isTokenExpired(token)
            );

            var msec: any = this.jwtHelper.getTokenExpirationDate(token);
            console.log(msec);
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            console.log(msec);
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            console.log(msec);
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            console.log(msec);
            console.log(localStorage.getItem('refresh_token'));
    }

    thing: object;
    

      // getThing() {
      //   this.authHttp.get('http://example.com/api/thing')
      //     .subscribe(
      //       data => this.thing = data,
      //       err => console.log(err),
      //       () => console.log('Request Complete')
      //     );
      // }
 
}