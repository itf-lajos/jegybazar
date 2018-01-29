import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;
  progressRefreshTicket = false;

  constructor(
    private _ticketService: TicketService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.isLoggedIn = true;
//    this.isLoggedIn = _userService.isLoggedin;
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
  }

  onRefreshTicket() {
    this.refreshTicket(this.ticket.id);
  }
}
