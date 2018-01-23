import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  private _subs: Subscription;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.user = this._userService.getCurrentUser();
//    this._subs = this._userService.getCurrentUser().subscribe(user => this.user = user);
//    this.user = this._userService.isLoggedin ? this._userService.getCurrentUser() : new UserModel();
    // this.user = this._userService.getCurrentUser();
  }

/*
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
*/

}
