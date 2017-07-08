import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
 
@Component({
    moduleId: module.id.toString(),
    styleUrls: [ 'home.component.css' ],
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    users: User[] = [];
 
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
 
}