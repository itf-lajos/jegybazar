import {EventModel} from './event-model';
import {UserModel} from './user-model';

export class TicketModel {
  id: string;
  // date: string;
  // artist: string;
  numberOfTickets: number;
  minimalBidPrice: number;
  bidStep: number;
  // bidStartDate: string;
  // bidEndDate: string;
  eventId: string;
  event: EventModel;
  sellerUserId: string;
  seller: UserModel;
  currentBid: number;
  bidCounter: number;
  bidEndDate: number;
  details: string;

  constructor(param?: TicketModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

/*  static get emptyTicket(): TicketModel {
    return {
      date: '',
      numberOfTickets: 0,
      minimalBidPrice: 0,
      bidStep: 0,
      eventId: 0,
      sellerUserId: 0
    };
  }*/

}
