import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit, OnDestroy {
  ticket$: Observable<TicketModel>;
//  ticket: TicketModel;
//  isLoggedIn: Boolean;
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;
  private ticketWatcherSubscription: Subscription;

  constructor(
    private _ticketService: TicketService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
      this.isLoggedIn$ = _userService.isLoggedIn$;
/*
      _userService.isLoggedIn$.subscribe(
        isLoggedIn => this.isLoggedIn = isLoggedIn
      );
*/
//    this.isLoggedIn = true;
//    this.isLoggedIn = _userService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.ticketWatcherSubscription.unsubscribe();
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this.refreshTicket(params.get('id'));
      }
    );
    /*
        const id = '-Ky0HolLJBH3Q5uVHWZf';
        this._ticketService.getOne(id).subscribe(
          ticket => this.ticket = ticket
        );
    */
  }

  private refreshTicket(id: string) {
    this.progressRefreshTicket = true;
    const handle404 = () => {
      this._router.navigate(['404']);
    };
    this.ticket$ = this._ticketService.getOne(id).share();
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null) {
          handle404();
        }
      },
      err => {
        return handle404();
      }
    );
/*
    this._ticketService.getOne(id).subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null) {
          handle404();
        } else {
          this.ticket = ticket;
        }
      },
      err => {
        return handle404();
      }
    );
*/
  }

/*
  onRefreshTicket() {
    this.refreshTicket(this.ticket.id);
  }
*/
  onBid() {
    this.progressRefreshTicket = true;
  }
}
