import { Injectable } from '@angular/core';
import {EventModel} from './event-model';

@Injectable()
export class EventService {
  private _events: EventModel[];

  constructor() {
    this._events = [
      {
        'id': 1,
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      },
      {
        'id': 2,
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      },
      {
        'id': 3,
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      },
      {
        'id': 4,
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      },
      {
        'id': 5,
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      },
      {
        'id': 6,
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      },
      {
        'id': 7,
        'name': 'Sziget Fesztivál',
        'date': '2017-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Nyári fesztivál a Hajógyári szigeten.'
      },
      {
        'id': 8,
        'name': 'Diótörő Balett',
        'date': '2017-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Fantasztikus balett előadás neves művészekkel.'
      },
      {
        'id': 9,
        'name': 'Macskák Musical',
        'date': '2018-02-11',
        'pictureURL': 'assets/macskak.jpg',
        'description': 'Az ismert musical a Madách Színház művészeinek előadásában.'
      }
    ];

  }

  getAllEvents(): EventModel[] {
    return this._events;
  }

  getEventById(id: number) {
    const ev = this._events.filter(x => x.id === id);
    return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);
  }

  update(param: EventModel) {
    this._events = this._events.map(ev => ev.id === param.id ? {...param} : ev);
/*
    this._events = this._events.map(ev => {
      if (ev.id === param.id) {
        return {...param};
      } else {
        return ev;
      }
    });
*/
  }

  create(param: EventModel) {
    this._events = [
      ...this._events,
      {
        id: this._getMaxId() + 1,
        ...param
      }
    ];
  }

  private _getMaxId() {
    return this._events.reduce((x, y) => x.id > y.id ? x : y).id;
  }
}
