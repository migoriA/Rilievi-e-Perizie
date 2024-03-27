import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { ActiveClassDirective } from './components/aside-bar/active-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AsideBarComponent,
    ActiveClassDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
