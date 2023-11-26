import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fire: AngularFirestore) { }


//crud

agregar(coleccion: string, value:any){
  try{
    this.fire.collection(coleccion).add(value);
    //this.fire.collection(coleccion).doc(id).set(value);
  } catch (error){
    console.log(error);
  }
}

getDatos(coleccion: string){

    return this.fire.collection(coleccion).snapshotChanges();
  
}

eliminar(coleccion : string, id: string){
  try{
    this.fire.collection(coleccion).doc(id).delete();
  } catch (error){
    console.log(error);
  }
}

getDato(coleccion: string, id: string){
  
    return this.fire.collection(coleccion).doc(id).get();
 
}

modificar (coleccion: string, id: string, value: any){
  try{
    this.fire.collection(coleccion).doc(id).set(value);
  } catch (error){
    console.error(error);

  }

  }
}



