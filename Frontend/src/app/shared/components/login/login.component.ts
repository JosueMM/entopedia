import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  userExist: boolean;

  constructor(private loginService: LoginService, private router: Router, private users : UserService) { }

  ngOnInit() {
  }

  doLogin() {
    var status = false;
    this.loginService.doLogin(this.email,this.password)
      .subscribe(res => {
       
        let data = res.json();
        
        if(data.user.length == 0){
          alert("Credenciales incorrectos!");
        }else{
          sessionStorage.setItem('token', data.token);
          for (let index = 0; index < data.user.length; index++) {
            
              let user = {
                id: data.user[index]['id'],
                name: data.user[index]['name'],
                first_surname: data.user[index]['first_surname'],
                is_admi: data.user[index]['is_admi']

               
              }
              sessionStorage.setItem('user', JSON.stringify(user));
              this.router.navigateByUrl('/principal');
            }
            
        }
        
        
          
        
       
      });
  }

}