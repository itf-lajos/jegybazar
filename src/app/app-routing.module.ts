import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {EventComponent} from './event/event.component';
import {TicketComponent} from './ticket/ticket.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './user/login/login.component';
// import {RegistrationComponent} from './user/registration/registration.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {TicketListComponent} from './ticket/ticket-list/ticket-list.component';
import {TicketDetailComponent} from './ticket/ticket-detail/ticket-detail.component';
import {BidComponent} from './ticket/bid/bid.component';
import {LoggedInGuardGuard} from './shared/logged-in.guard';

// /event/ -> /event
// /event/valami -> /event/:id
// user/:ID -> view mode
// user/:ID/edit  -> edit mode
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'event', component: EventComponent,
    children: [
      {path: '', component: EventListComponent},
      {path: 'new', component: EventDetailComponent, canActivate: [LoggedInGuardGuard]},
      {path: ':id', component: EventDetailComponent}
    ]
  },
  {path: 'ticket', component: TicketComponent,
    children: [
      {path: '', component: TicketListComponent},
      {path: 'new', component: TicketDetailComponent, canActivate: [LoggedInGuardGuard]},
      {path: ':id', component: BidComponent}
    ]
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuardGuard]},
      {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuardGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: ProfileEditComponent},
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
  static routableComponents = [
    HomeComponent,
    EventComponent,
    EventListComponent,
    EventDetailComponent,
    TicketComponent,
    TicketListComponent,
    TicketDetailComponent,
    BidComponent,
    AboutComponent,
    LoginComponent,
//    RegistrationComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent
  ];

}
