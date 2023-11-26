import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL: string ="";

//debemos crear una variable privada para utilizar la peticion
  constructor(private http: HttpClient) { }

  //metodos para consumir la api:
  //1.-Consuma todos los valores de la api
  getDatos(){
    return this.http.get(this.URL);
  }

  //2.-Consuma solamente un valor de la api:
  getDato(id: number){
    return this.http.get(this.URL + '/' + id)

  }
}
