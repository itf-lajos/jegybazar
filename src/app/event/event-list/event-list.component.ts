import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from '@reactivex/rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit {
//  public eventsGrouppedBy3: EventModel[];
//  public events$: Observable<EventModel[]>;
//  public events: EventModel[];
  public eventsGrouppedBy3$: Observable<EventModel[][]>;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
      .flatMap(
        events => {
          return this.filteredText$.map(
            filterText => {
              if (filterText == null) {
                return events;
              } else {
                return events.filter(
                  event => {
                    return event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                  }
                );
              }
            }
          );
        }
      )
      .map(data => {
//        return data.reduce((acc, curr: EventModel, ind: number) => {
        return data.reduce((acc: Array<any>, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
     });
  }

  ngAfterViewInit(): void {
    console.log(this.searchInput);
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .delay(300)
      .map(
        (event: Event) => {
          // debugger;
          return (event.srcElement as HTMLInputElement).value;
        }
      )
      .distinctUntilChanged()
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      );
  }

/*
    this._eventService.getAllEvents().subscribe(data => {
      this.eventsGrouppedBy3 = data.reduce((acc, curr: EventModel, ind: number) => {
        if (ind % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, []);
    });
*/

    // this.events$ = this._eventService.getAllEvents();
/*
    this.eventsGrouppedBy3 = this._eventService.getAllEvents()
      .reduce((acc, curr: EventModel, ind: number) => {
        if (ind % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, []);
    console.log(this.eventsGrouppedBy3);
  }
*/

}
