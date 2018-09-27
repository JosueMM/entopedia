import { Component, OnInit } from '@angular/core';
import { MENUOPTIONS } from '../../../mock-menu';
import { MenuOptions } from '../../../menu-options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
user:string;
  
  menu_options: MenuOptions[] = MENUOPTIONS;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user   = JSON.parse(sessionStorage.getItem('user'));

  }

  sessionOff(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.ngOnInit();
  }

}
