import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {EventService} from './event.service';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EventModel} from './event-model';
import {UserModel} from './user-model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class TicketService {
//  private _tickets: TicketModel[];

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _http: HttpClient) {
//    this._tickets = this._getMockTickets();
  }

// Mi is tortenik itt, mert izi :) - logikai lepesekkel, hogy hogyan epulunk fel
// 1. lepesben lekerjuk http.get-el az osszes ticketet, amik objectben erkeznek meg
//    {key1: ticketObject1, key2: TicketObject2, key3: ticketObject3, ...}
// 2. lepesben ezt atalakitjuk tombbe Object.values() segitsegevel
//    [ticketObject1, ticketObject2, ticketObject3, ...]
// 3. lepesben vegigmegyunk minden ticketObjectX-en es az Observable.zip() segitsegevel minden ticketObjectX-t atalakitunk
//    3.a) krealunk 3 streamet: ticketObjectX-nek, illetve Eventnek es Usernek a ticketObjectX-ben tarolt id-k alapjan
//      ticketObjectX-nek azert kell observable-t generalni, hogy alkalmazni tudjuk ra is a .zip()-et
//    3.b) miutan a 2 uj streamunk is visszatert ertekkel egybefuzzuk az utolso parameterkent megadott fat arrow function-el
//    3.c) es csinalunk belole egy uj streamet, amiben 1 ertek van, es ez az osszefuzott verzio
//         ezen a ponton van egy [zipStream1, zipStream2, zipStream3, ...]
// 4. osszeallitjuk a vegso streamunket
//    4.a) Observable.forkJoin segitsegevel az osszes tombben kapott streamunk utolso elemet osszefuzzuk 1 tombbe
//         es a keletkezett uj streamen ezt az 1 elemet emitteljuk
//    4.b) mivel minket csak az osszefuzott ertek erdekel a streamen ezert a switchmap-el erre valtunk
// ----------
// Gondolatkiserlet: itt azert erdemes megnezni a devtoolbar network tabjat XHR szuresben,
//                   es vegiggondolni, hogy hogy lehetne spórolni ezekkel a keresekkel!
// -----
// puffancs uzeni: "elkepzelheto", hogy egyszerubb megoldas is van, de szerintem ez szep
//                 es mar nagyon vagytam valami agyzsibbasztora a projektben :)

  getAllTickets() {
    return this._http.get(`${environment.firebase.baseUrl}/tickets.json`)
      .map(ticketsObject => Object.values(ticketsObject))
      .map(ticketsArray => ticketsArray.map(tm =>
        Observable.zip(
          Observable.of(tm),
          this._eventService.getEventById(tm.eventId),
          this._userService.getUserById(tm.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          })
      ))
      .switchMap(zipStreamArray => Observable.forkJoin(zipStreamArray));
  }

  create(param: TicketModel) {
    return this._http.post<{ name: string }>(`${environment.firebase.baseUrl}/tickets.json`, param)
      .map(fbPostReturn => fbPostReturn.name)
      .switchMap(ticketId => this._saveGeneratedId(ticketId))
      .switchMap(ticketId => this._eventService.addTicket(param.eventId, ticketId))
      .switchMap(ticketId => this._userService.addTicket(ticketId));

    /*
        // ez itt amiatt kell, hogy meglegyen a fbid objektumon belul is,
        // mert kesobb epitunk erre az infora
        // viszont ezt csak a post valaszaban kapjuk vissza
        // es legalabb hasznaljuk a patch-et is :)
        return this._http.post(`${environment.firebase.baseUrl}/tickets.json`, param)
          .switchMap((fbPostReturn: { name: string }) => this._http.patch(
          `${environment.firebase.baseUrl}/tickets/${fbPostReturn.name}.json`,
          {id: fbPostReturn.name}
        ));
    //    return this._http.post(`${environment.firebase.baseUrl}/tickets.json`, param);
    */
  }

  getOne(id: string): Observable<TicketModel> {
    return this._http.get<TicketModel>(`${environment.firebase.baseUrl}/tickets/${id}.json`)
      .flatMap(
        ticket => Observable.combineLatest(
          Observable.of(new TicketModel(ticket)),
          this._eventService.getEventById(ticket.eventId),
          this._userService.getUserById(ticket.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          }
        )
      );
  }

  getEventNameById(id: string) {
//    return this._eventService.getEventById(id).name;
  }

  /*
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
  */

  /*  // getAllTickets(): TicketModel[] {
    getAllTickets() {
      return this._tickets.map(ticket => {
        return {
          ...ticket,
          event: this._eventService.getEventById(ticket.eventId),
          seller: this._userService.getUserById(ticket.sellerUserId)
        };
      });
    }*/

  /*  create(param: TicketModel) {
  /!*
      this._tickets = [
        ...this._tickets,
        new TicketModel(
        {
          id: this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1,
          ...param,
          event: this._eventService.getEventById(param.eventId),
          seller: this._userService.getUserById(param.sellerUserId)
        })
      ];
  *!/
    }*/

  private _saveGeneratedId(ticketId: string): Observable<string> {
    return this._http.patch<{ id: string }>(
      `${environment.firebase.baseUrl}/tickets/${ticketId}.json`,
      {id: ticketId}
    )
      .map(x => x.id);
  }

  /*
    private _getMockTickets() {
      return [
        new TicketModel({
          'id': 1,
          'date': '2018-05-02',
          'numberOfTickets': 5,
          'minimalBidPrice': 2000,
          'bidStep': 500,
          'eventId': 1,
          'sellerUserId': 1
        }),
          new TicketModel({
            'id': 2,
            'date': '2018-05-02',
            'numberOfTickets': 10,
            'minimalBidPrice': 1500,
            'bidStep': 500,
            'eventId': 1,
            'sellerUserId': 2
          }),
          new TicketModel({
            'id': 3,
            'date': '2018-05-02',
            'numberOfTickets': 10,
            'minimalBidPrice': 3000,
            'bidStep': 1000,
            'eventId': 2,
            'sellerUserId': 1
          }),
          new TicketModel({
            'id': 4,
            'date': '2018-05-02',
            'numberOfTickets': 5,
            'minimalBidPrice': 3000,
            'bidStep': 500,
            'eventId': 3,
            'sellerUserId': 3
        })
      ];
    }
  */

}
