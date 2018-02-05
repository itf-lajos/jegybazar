import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {EventModel} from '../../shared/event-model';
import {TicketService} from '../../shared/ticket.service';
import {EventService} from '../../shared/event.service';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
  ticket: TicketModel;
  events$: Observable<EventModel[]>;
  private _subs: Subscription;
//  events: EventModel[];

  constructor(private _ticketService: TicketService,
              private _eventService: EventService,
              private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
    this.ticket = new TicketModel();
    this.ticket.eventId = '';
    this._userService.getCurrentUser().subscribe(
      user => this.ticket.sellerUserId = user.id
    );
/*
    this._userService.getCurrentUser().subscribe(
      user => this.ticket.sellerUserId = user.id
    );
*/
//    this.ticket.sellerUserId = this._userService.getCurrentUser().id;
//    this.ticket.sellerUserId = this._userService.getCurrentUserModel().id;
    this.events$ = this._eventService.getAllEvents();
    // this.ticket = new TicketModel(TicketModel.emptyTicket);
    // this.ticket.sellerUserId = this._userService.getCurrentUser().id;
    // this.events = this._eventService.getAllEvents();
  }

  ngOnDestroy() {
    if (this._subs != null && !this._subs.closed) {
      this._subs.unsubscribe();
    }
//    this._subs.unsubscribe();
  }

  onSubmit() {
    this._subs = this._ticketService.create(this.ticket)
      .subscribe(newTicketId => this._router.navigate(['/ticket']));
/*
    console.log(this.ticket);
    this._ticketService.create(this.ticket);
    this._router.navigate(['/ticket']);
*/
  }

}
