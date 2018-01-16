import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../shared/event.service';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  editForm = false;

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _userService: UserService,
              private _location: Location) {
  }

  ngOnInit() {
    const evId = +this._route.snapshot.params['id'];        // + castolás számmá
    if (evId) {
      this.event = this._eventService.getEventById(evId);
      this._eventService.create(this.event);
    } else {
      this.event = new EventModel(EventModel.emptyEvent);
      this.editForm = true;
    }
  }

  onSubmit(form) {
    if (this.event.id) {
      this._eventService.update(this.event);
    } else {
      this._eventService.create(this.event);
    }
//    this._router.navigate(['/event/list']);
    this._location.back();
  }

  navigateBack() {
    this._location.back();
  }
}
