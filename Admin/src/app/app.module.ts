import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { ActiveClassDirective } from './components/aside-bar/active-class.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AsideBarComponent,
    ActiveClassDirective,
    NavBarComponent,
    HomeCardsComponent,
    UserListComponent,
    ListComponent,
    MapComponent,
    ClientsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
