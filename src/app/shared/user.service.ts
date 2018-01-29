import {Injectable, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {FirebaseLoginModel} from './firebase-login-model';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {FirebaseRegistrationModel} from './firebase-registration-model';

@Injectable()
export class UserService {
  public isLoggedin = false;
  public currentUserName = '';
  private _user = new UserModel();
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined;
//  private _allUsers: UserModel[];

  constructor(private _router: Router,
              private _http: HttpClient) {
//    this._allUsers = this._getMockData();
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apiKey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      }
    )
    .do((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse)
    .switchMap(fbLogin => this.getUserById(fbLogin.localId))
    .do(user => this._user = user)
    .do(user => this.isLoggedin = true)
    .do(user => console.log('sikeres login ezzel a userrel: ', user))
    .do(user => this.currentUserName = this._user.name);

/*
    .switchMap(fbLogin => this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`))
    .do(user => this.isLoggedin = true)
    .do(user => this._user = user)
    .do(user => console.log('sikeres login ezzel a userrel: ', user))
    .do(user => this.currentUserName = this._user.name);
*/
    /*
        if (email === 'angular' && password === 'angular') {
          this._user = this._allUsers[2];
    //      this._user = new UserModel(this.getUserById(1));
    //      this._user = new UserModel(UserModel.exampleUser);
          this.isLoggedin = true;
          this.currentUserName = this._user.name;
    //      this._router.navigate(['/home']);
    //      this._router.navigate(['/user']);
          return true;
        }
        return false;
    */
  }

/*
  login(email: string, password: string): boolean {
    return this._user;
  }
*/

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
     `${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
     {
       'email': param.email,
       'password': password,
       'returnSecureToken': true
      }
     )
    .do((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse)
    .map(fbreg => {
      return {
        id: fbreg.localId,
        ...param
      };
    })
    .switchMap(user => this.save(user))
    .do(user => this.isLoggedin = true)
    .do(user => console.log('sikeres reg ezzel a userrel: ', user))
    .do(user => this.currentUserName = this._user.name);
  }

  /*
    register(param?: UserModel) {
      if (param) {
        this._user = new UserModel({id: 4, ...param});
        this._allUsers = [...this._allUsers, this._user];
        /!*
              this._user = new UserModel(param);
            } else {
              this._user = new UserModel(UserModel.exampleUser);
        *!/
      }
      this.isLoggedin = true;
      this.currentUserName = this._user.name;
  //    this._router.navigate(['/home']);
  //    this._router.navigate(['/user']);
    }
  */

  save(param: UserModel) {
    // na ez itt azert kulonleges, mert a tobbi helyettol elteroen en nem akarom, hogy
    // generaljon nekem kulcsot a firebase, hanem a registraciokor kapott id-t szeretnem
    // kulcs kent hasznalni adatmentesnel kulcskent az adatbazisban
    // illetve put-ra fb a bekuldott adatszerkezetet adja vissz igy tudom tovabb hasznalni
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}.json`, param)
      .do(user => this._user = user);
  }

  logout() {
    this._user = new UserModel();
    this.isLoggedin = false;
    delete(this._fbAuthData);
    this.currentUserName = '';
    this._router.navigate(['/home']);
    console.log('kileptunk');
  }

  /*
    logout() {
      this._user = new UserModel();
      // delete(this._user);
      this.isLoggedin = false;
      this.currentUserName = '';
      this._router.navigate(['/home']);
    }
  */

/*
    updateUser(param: UserModel) {
        //      this._user = new UserModel(param);
    }
  */

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  }

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
//    return this.afDb.object(`users/${fbid}`);
  }

/*
  getUserById(id: string) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }
*/

  getCurrentUser() {
    return this._user;
//    return Observable.of(this._user);
//    return this._user ? this._user : new UserModel(UserModel.emptyUser);
//    return this._user;
  }

  addTicket(ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/users/${this._user.id}/tickets.json`,
      {[ticketId]: true}
     )
    .map(rel => Object.keys(rel)[0]);
  }

  get fbIdToken(): string | null {
    return this._fbAuthData ? this._fbAuthData.idToken : null;
  }

  /*  getCurrentUserModel() {
      return this._user;
    }*/

/*
  private _getMockData() {
    return [
      new UserModel({
        'id': 0,
        'name': 'Legyek Réka Matlida',
        'email': 'legyekrekamatilda@valami.com',
        'address': 'Futrinka utca',
        'dateOfBirth': '2001.01.01',
        'gender': 'female',
        'profilePictureUrl': 'assets/131.jpg'
    }),
    new UserModel({
        'id': 1,
        'name': 'Mekk Elek',
        'email': 'mekk@gmail.com',
        'address': '1021 Budapest',
        'dateOfBirth': '1991.08.12',
        'gender': 'male',
        'profilePictureUrl': ''
      }),
      new UserModel({
        'id': 2,
        'name': 'Gipsz Jakab',
        'email': 'gipsz@gmail.com',
        'address': '8100 Veszprém',
        'dateOfBirth': '1980.02.20',
        'gender': 'male',
        'profilePictureUrl': ''
      }),
      new UserModel({
        'id': 3,
        'name': 'Szalmon Ella',
        'email': 'szalmon@gmail.com',
        'address': '8000 Székesfehárvár',
        'dateOfBirth': '2000.05.23',
        'gender': 'female',
        'profilePictureUrl': ''
      })
    ];
  }
*/

}
