import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent {
}

/*
export class TicketComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detach();
  }

}
*/
