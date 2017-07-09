import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
 
@Component({
    moduleId: module.id.toString(),
    styleUrls: [ 'home.component.css' ],
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    users: User[] = [];
    token: any;
    debug = '';
 
    constructor(private userService: UserService) { }
 
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
    }
 
}