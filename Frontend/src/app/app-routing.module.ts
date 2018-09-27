import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';
import { AdvanceComponent } from './shared/components/advance/advance.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IndexComponent } from './user/components/index/index.component';
import { SearchComponent } from './shared/components/search/search.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { CalendarComponent } from './user/components/calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: IndexComponent },
  { path: 'buscar', component: SearchComponent },
  { path: 'usuario', component: AddUserComponent },
  { path: 'calendario', component: CalendarComponent },
  { path: 'avance', component: AdvanceComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
