import { Component } from '@angular/core';
import { WebserviceService } from '../service/webservice.service';

@Component({
  selector: 'utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent {
  constructior(public webService:WebserviceService){}

  nome:any;
  cognome:any;
  email:any;
  password:any;


  //FARE NGMODEL PER PRENDERE DATI ALL'INTERNO DEL FORM


  async getDati(){
    await this.webService.getStudents("getStudents");
  }

  async addStudent(){
    await this.webService.addStudent("addStudent",this.nome,this.cognome,this.email,this.password);
  }
}
