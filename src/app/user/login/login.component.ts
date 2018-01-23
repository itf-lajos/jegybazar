import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../shared/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;
//  public currentUser = 'angular';

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this._userService.login(email, password).subscribe(
    (user: UserModel) => {
      // console.log('login cmp', user);
      this._router.navigate(['/home']);
      // this._router.navigate(['/user']);
    },
    err => console.warn('Hibára futottunk a logincmp-ben', err)
    );
/*
    if (!this._userService.login(email, password)) {
      this.error = 'Hiba a belépési adatokban! Próbáld újra!';
    } else {
      this._router.navigate(['/user']);
    }
    console.log(this._userService.isLoggedin);
*/
  }

  clearError() {
    delete(this.error);
  }

}
