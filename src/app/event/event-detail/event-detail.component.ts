import { Component, OnDestroy, OnInit } from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../shared/event.service';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: EventModel;
  viewForm = true;
  private _destroy$ = new Subject<void>();

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _location: Location,
              public userService: UserService
  ) {
  }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];        // + castolás számmá nem kell
    this.event = new EventModel();
//    this.event = new EventModel(EventModel.emptyEvent);
    this.viewForm = !!evId;   // a !! egy dupla negalas amit arra hasznalunk, hogy fix true/false-t kapjunk barmilyen ertekbol
    if (evId) {
      this._eventService.getEventById(evId)
        .takeUntil(this._destroy$)
        .subscribe(evm => this.event = evm);
      console.log('kaptunk eventid-t', evId);
      /*
            this._eventService.getEventById(evId).subscribe(evm => this.event = evm);
          } else {
      //      this.event = new EventModel(EventModel.emptyEvent);
            this.editForm = true;
          }
      */
    }
  }

  ngOnDestroy() {
/*
    ez a fgv a komponens pusztulasakor fog lefutni
    es a takeUntil()-eken keresztul jelzunk minden stream-nek hogy zarodjon
    igaz ez ebben az esetben kicsit eroltett pl mert, bár __MOST__
    tudjuk, hogy minden streamunk http ami szepen zarja magát, de ez nem lesz mindig így
    ezért elkezdjuk megszokni mint mintat, mert kesobb ez jol jon, hogy pedansak vagyunk
    http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
*/
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit() {
    this._eventService.save(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  }

  delete() {
    this._eventService.delete(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  }

  navigateBack() {
    this._location.back();
  }

    /*
      onSubmit(eventForm) {
        if (this.event.id) {
          this._eventService.update(this.event);
        } else {
          this._eventService.create(this.event);
        }
    //    this._router.navigate(['/event/list']);
        this._location.back();
      }
    */

}
