import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: Boolean;
//  @Output() bidWithBidStep = new EventEmitter<void>();

  onBidWithBidStep() {
    alert('Licitálás a következő értékkel')
//    this.bidWithBidStep.emit();
  }
}
