import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {bidMinimumValidator} from './bid.validators';
import {BidService} from '../../shared/bid.service';


@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit, OnChanges {
  @Input() ticket: TicketModel;
  @Output() bid = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;
  disabled = false;

  constructor(
    private fb: FormBuilder,
    private bidService: BidService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && changes['ticket'].currentValue != null) {
      this.disabled = false;
      this.form.reset({bid: null});
      this.form.get('bid').enable();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
/*
        bid: null,                                    // sima verzió
        bid: [null, Validators.required],             // adat neve, értéke ha 1 validator van
*/
        bid: [
          null,
          Validators.compose(
          [
            Validators.required,
            bidMinimumValidator(() => {return this.ticket; })
            ]
          )
        ]
/*
            bidMinimumValidator(() => return {this.ticket}; )
        bid: [null, Validators.compose([Validators.required,
          bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)])]
*/    }
    );
/*
    this.form.get('bid').valueChanges.subscribe(
      val => console.log('bid change:', val)
    );
*/
  }

/*
  testMethod() {
    this.form.addControl('bid2', new FormControl());
  }
*/

  onBidWithBidStep() {
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
      .subscribe(
        () => {
          this.submitSuccessAlert = true;         // notification user
          this.bid.emit();
          this.form.get('bid').enable();
        },
          err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
      );
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();                          // megáll az esemény
    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
//      this.bidService.bid(this.ticket.id, this.form.value['bid'])
      this.toBid(this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
//            this.form.reset({bid: null});
            this.submitSuccessAlert = true;         // notification user
            this.bid.emit();
//            this.form.get('bid').enable();
          },
          err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
        );
    }
    console.log('licitáltak');
    console.log(this.form.value);
    console.log(this.form.valid);
  }

  toBid(value: number) {
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;
    this.form.get('bid').disable();
    this.disabled = true;
    return this.bidService.bid(this.ticket.id, value);
  }

}
