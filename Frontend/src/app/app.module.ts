import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './user/components/menu/menu.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './shared/components/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';


import { HomeService } from './shared/services/home.service';
import { UserService } from './user/services/user.service';
import { CalendarService } from './user/services/calendar.service';
import { ArthropodService } from './shared/services/arthropod.service';
import { LoginService } from './shared/services/login.service';
import { PhotoService } from './shared/services/photo.service';

import { InitialMenuComponent } from './shared/components/initial-menu/initial-menu.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IndexComponent } from './user/components/index/index.component';
import { SearchComponent } from './shared/components/search/search.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { CalendarComponent } from './user/components/calendar/calendar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../../node_modules/demo-utils/module';
import { AdvanceComponent } from './shared/components/advance/advance.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    InitialMenuComponent,
    LoginComponent,
    IndexComponent,
    SearchComponent,
    AddUserComponent,
    CalendarComponent,
    AdvanceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    DemoUtilsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HomeService,
    UserService,
    CalendarService,
    ArthropodService,
    LoginService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
