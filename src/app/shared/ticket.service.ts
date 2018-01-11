import { Injectable } from '@angular/core';
import {TicketModel} from './ticket-model';
import {EventService} from './event.service';
import {UserService} from './user.service';

@Injectable()
export class TicketService {
  private _tickets: TicketModel[];

  constructor(private _eventService: EventService,
              private _userService: UserService) {
    this._tickets = [
      new TicketModel({
        'id': 1,
        'date': '2018-05-02',
        'artist': 'Iron Maiden',
        'numberOfTickets': 5,
        'minimalBidPrice': 2000,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'bidEndDate': '2017-12-05',
        'eventId': 1,
        'sellerUserId': 1
      }),
      new TicketModel({
        'id': 2,
        'date': '2018-05-02',
        'artist': 'Quimby',
        'numberOfTickets': 10,
        'minimalBidPrice': 1500,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'bidEndDate': '2017-12-05',
        'eventId': 1,
        'sellerUserId': 2
      }),
      new TicketModel({
        'id': 3,
        'date': '2018-05-02',
        'artist': 'Győri Balett',
        'numberOfTickets': 10,
        'minimalBidPrice': 3000,
        'bidStep': 1000,
        'bidStartDate': '2017-11-05',
        'bidEndDate': '2017-12-05',
        'eventId': 2,
        'sellerUserId': 1
      }),
      new TicketModel({
        'id': 4,
        'date': '2018-05-02',
        'artist': 'Madách Színház',
        'numberOfTickets': 5,
        'minimalBidPrice': 3000,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'bidEndDate': '2017-12-05',
        'eventId': 3,
        'sellerUserId': 3
      })
    ];
  }

  getAllTickets(): TicketModel[] {
    return this._tickets.map(ticket => {
      return {
        ...ticket,
        event: this._eventService.getEventById(ticket.eventId),
        seller: this._userService.getUserById(ticket.sellerUserId)
      };
    });
  }

  getEventNameById(id: number) {
    return this._eventService.getEventById(id).name;
  }
}
