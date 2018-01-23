import { Injectable } from '@angular/core';
import { EventModel } from './event-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventService {
  private _events: EventModel[];

  constructor(private _http: HttpClient) {
//    this._events = this._getMockData();
  }

  getAllEvents(): Observable<EventModel[]> {
//    getAllEvents(): Observable<EventModel[]> {
    console.log(`${environment.firebase.baseUrl}/events.json`);
    return this._http.get(`${environment.firebase.baseUrl}/events.json`)
      .map(data => Object.values(data).map(evm => new EventModel(evm)));
//    return this._events;
  }

  getEventById(id: string) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
/*
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/id.json`)
      .map(data => Object.values(data).map(evm => new EventModel(evm)));
*/
    /*
        const ev = this._events.filter(x => x.id === +id);
        return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);
    */
  }

  save(param: EventModel) {
    console.log(param);
    if (param.id) {
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param)
        .map((fbPostReturn: { name: string }) => fbPostReturn.name)
        .switchMap(fbId => this._http.patch(
          `${environment.firebase.baseUrl}/events/${fbId}.json`,
          {id: fbId}
        ));
      // return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else {
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param);
    }
  }

// itt kitalalni, hogy hogyan akarjuk kezelni a fuggosegeket es aszerint implementalni
  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

  addTicket(eventId: string, ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/events/${eventId}/tickets.json`,
      {[ticketId]: true}
    )
    .map(rel => Object.keys(rel)[0]);
  }


  /*
    update(param: EventModel) {
      this._events = this._events.map(ev => {
        return ev.id === param.id ? {...param} : ev;
      });
      // this._events = this._events.map(ev => ev.id === param.id ? {...param} : ev);
  /!*
      this._events = this._events.map(ev => {
        if (ev.id === param.id) {
          return {...param};
        } else {
          return ev;
        }
      });
  *!/
    }
  */

/*
  create(param: EventModel) {
    this._events = [
      ...this._events,
      {
        id: this._getMaxId() + 1,
        ...param
      }
    ];

  }
*/

/*
  private _getMaxId() {
    return this._events.reduce((x, y) => x.id > y.id ? x : y).id;
  }
*/

/*
  private _getMockData() {
    return [
      new EventModel({
        'id': '1',
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      }),
      new EventModel({
        'id': '2',
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      }),
      new EventModel({
        'id': '3',
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      }),
      new EventModel({
        'id': '4',
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      }),
      new EventModel({
        'id': '5',
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      }),
      new EventModel({
        'id': '6',
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      }),
      new EventModel({
        'id': '7',
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      }),
      new EventModel({
        'id': '8',
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      }),
      new EventModel({
        'id': '9',
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      })
    ];
  }
*/

}


