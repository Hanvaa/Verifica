import { Component } from '@angular/core';
import {WebserviceService} from "../service/webservice.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public webservice:WebserviceService) {  }
  mail: any;
  pwd: any;

  login() {
    this.webservice.login("login",this.mail,this.pwd);
  }
}
