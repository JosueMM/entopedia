import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  redirectToFacebook() {
    window.open("https://www.facebook.com/Club-de-Entomología-UTN-San-Carlos-1186973771382964");
  }

}
