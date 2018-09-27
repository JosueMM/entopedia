import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from '../../../user';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  closeResult: string;
  users: User[];
  current_user: User;
  logUser : User;
  repeat_password: string;
  operation = { is_new: true };

  constructor(private modalService: NgbModal, private userService: UserService,private router:Router) { }

  open(content) {
    if (this.operation.is_new) {
      this.current_user = new User();
    }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.current_user = new User();
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.current_user = new User();
      this.ngOnInit();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.logUser = JSON.parse(sessionStorage.getItem('user'));
    let token = sessionStorage.getItem("token");
if(token == undefined ){
  this.router.navigateByUrl('/login');
}else if (this.logUser.is_admi == false){
  alert('Oops! :(\nPermisos no validos')
  this.router.navigateByUrl('/principal');
}
    this.getUsers();
    this.current_user = new User();
    this.current_user.is_admi = true;
    this.current_user.is_active = true;
    this.repeat_password = "";

  }

  editUser(user: User) {
    this.current_user = user;
    this.operation.is_new = false;
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.json();
      });
  }

  addUser() {
    if(this.logUser.is_admi){
      if (this.operation.is_new) {
        this.userService.addUser(this.current_user)
          .subscribe(res => {
            this.operation.is_new = false;
            this.current_user = new User();
            this.ngOnInit();
          });
        return;
      }
      this.userService.updateUser(this.current_user)
        .subscribe(res => {
          this.current_user = new User();
          this.operation.is_new = true;
          alert("Usuario Editado con exito");
          this.router.navigateByUrl("/usuario")
        });
    }else{
      alert("No eres Administrador");
    }
 
  }

  deleteUser(id: number) {
    if(this.logUser.is_admi){
    this.userService.deleteUser(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }else{
    alert("No eres administrador");
  }
  }

}
