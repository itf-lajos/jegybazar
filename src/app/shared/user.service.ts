import {Injectable, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

@Injectable()
export class UserService {
  isLoggedin = false;
  private _user: UserModel;
  private _allUsers: UserModel[];
  //  @Output() currentUserName: string;

  constructor(private _router: Router) {
    this._allUsers = [
      new UserModel({
        'id': 1,
        'name': 'Mekk Elek',
        'email': 'mekk@gmail.com',
        'address': '1021 Budapest',
        'dateOfBirth': '1991.08.12',
        'gender': 'male'
      }),
      new UserModel({
        'id': 2,
        'name': 'Gipsz Jakab',
        'email': 'gipsz@gmail.com',
        'address': '8100 Veszprém',
        'dateOfBirth': '1980.02.20',
        'gender': 'male'
      }),
      new UserModel({
        'id': 3,
        'name': 'Szalmon Ella',
        'email': 'szalmon@gmail.com',
        'address': '8000 Székesfehárvár',
        'dateOfBirth': '2000.05.23',
        'gender': 'female'
      })
    ];
  }

  login(email: string, password: string) {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(this.getUserById(1));
//      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedin = true;
//      this.currentUserName = this._user.name;
//      console.log(this.currentUserName);
      this._router.navigate(['/home']);
//      this._router.navigate(['/user']);
    }
    return false;
  }

  register(param?: UserModel) {
    if (param) {
      this._user = new UserModel(param);
    } else {
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedin = true;
//    this.currentUserName = this._user.name;
    this._router.navigate(['/home']);
//    this._router.navigate(['/user']);
  }

  logout() {
    this._user = new UserModel();
    // delete(this._user);
    this.isLoggedin = false;
//    this.currentUserName = '';
    this._router.navigate(['/home']);

  }

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this._user;
  }
}
