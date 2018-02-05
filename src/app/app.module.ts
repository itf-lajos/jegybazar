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
import {LoggedInGuardGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import { AuthInterceptor } from './shared/auth-interceptor';
import { TicketDetailsCardComponent } from './ticket/ticket-details-card/ticket-details-card.component';
import { BiddingCardComponent } from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from 'angular2-moment';
import 'moment/locale/hu';
import { BidFormComponent } from './ticket/bid-form/bid-form.component';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component';
import {BidService} from './shared/bid.service';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import { NavBarItemComponent } from './core/nav-bar-item/nav-bar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    ...AppRoutingModule.routableComponents,
    TicketDetailsCardComponent,
    BiddingCardComponent,
    BidFormComponent,
    LoadingSpinnerComponent,
    NavBarItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MomentModule
  ],
//  providers: [EventService, UserService, TicketService, LoggedInGuardGuard],
  providers: [
    EventService,
    UserService,
    TicketService,
    LoggedInGuardGuard,
    BidService
/*
    {
      provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
*/
  ],
bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
