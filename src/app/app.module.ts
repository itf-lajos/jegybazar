///<reference path="app-routing.module.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AlertModule, CollapseModule} from 'ngx-bootstrap';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';
import { EventcardComponent } from './event/eventcard/eventcard.component';
import { FooterComponent } from './core/footer/footer.component';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    ...AppRoutingModule.routableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EventService, UserService, TicketService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
