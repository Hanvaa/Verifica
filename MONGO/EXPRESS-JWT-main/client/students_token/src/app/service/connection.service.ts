import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient:HttpClient) { }

  private URL_SERVICE = "http://localhost:8888/api/";

  public sendGetRequest(endPoint: string,headers:any){
    console.log(this.URL_SERVICE+endPoint);
    return this.httpClient.get(this.URL_SERVICE+endPoint,headers);
  }

  public sendPostRequest(endPoint: string, par: any, headers:any):Observable<any> {
    console.log("URL: " + this.URL_SERVICE + endPoint + " ---- " + headers);
    return this.httpClient.post(this.URL_SERVICE + endPoint, par, headers);
  }
}
