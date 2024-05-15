import { Injectable } from '@angular/core';
import {ConnectionService} from "./connection.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private connectionService:ConnectionService) { }

  headers = new HttpHeaders();
  loginResponse:any;
  datiUtenti:any;

  async login (endPoint: string, u:string, p:string): Promise<any>{
    await new Promise((resolve,reject)=>{
      this.headers=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      this.connectionService.sendPostRequest(endPoint,{username: u, password: p},{headers:this.headers}).subscribe(
        (data:any)=>{
          console.log(data.token);
          localStorage.setItem("token",data.token);
          resolve(this.loginResponse=data.msg);
        },
        (error:any)=>{
          console.log("Errore login...");
          console.log(error);
          reject();
        }
      );
    });
  }

  async getStudents(endPoint:string):Promise<any>{
    await new Promise((resolve,reject) =>{
      this.headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',token:localStorage.getItem("token") || ""});//or perchè se il local storage è vuoto, allora la stringa è null e va in errore, perciò la impongo vuota
      //abbiamo preso il token dalla chiamata iniziale, e ora con questo token faremo una richiesta dello studente
      this.connectionService.sendGetRequest(endPoint,{headers:this.headers,}).subscribe((data:any)=>{
        localStorage.setItem("token",data.token);//Aggiorno il token che è stato aggiornato dal servizio del server getStudents
        resolve(this.datiUtenti = data.data);//Prendo i dati raccolti dalla richiesta eseguita
      },(error:any)=>{
        console.log("Errore, token non presente o non valido");
        console.log(error);
        reject();
      });//ora facciamo la richiesta
    }
  
  )
  }


  async addStudent(endPoint:string, nome:string, cognome:string, email:string, password:string):Promise<any>{
    await new Promise((resolve,reject)=>{
      this.headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',token:localStorage.getItem("token") || ""});
      this.connectionService.sendPostRequest(endPoint,{nome:nome,cognome:cognome,email:email,password:password},{headers:this.headers}).subscribe((data:any)=>{
        localStorage.setItem("token",data.token);
        resolve(this.datiUtenti = data.msg);
      },(error:any)=>{
        console.log("Errore, token non presente o non valido");
        console.log(error);
        reject();
      });
    });
  }
}
