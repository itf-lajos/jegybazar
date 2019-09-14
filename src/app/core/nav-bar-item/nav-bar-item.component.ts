import {AfterViewChecked, Component, DoCheck, Input} from '@angular/core';

@Component({
  selector: 'app-nav-bar-item',
  templateUrl: './nav-bar-item.component.html',
  styleUrls: ['./nav-bar-item.component.css']
})
export class NavBarItemComponent implements DoCheck, AfterViewChecked {
  @Input() url: string;
  @Input() name: string;

  constructor() { }


  ngDoCheck(): void {
    console.log('NavbarItemComponent ngDoCheck');
  }

  ngAfterViewChecked(): void {
    console.log('NavbarItemComponent ngAfterViewChecked');
  }
}
