import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  clases: any[] = [];

  constructor(private storage: Storage) {
    storage.create();
  }

  async agregar(clase: any, key: string): Promise<boolean> {
    this.clases = await this.storage.get(key) || [];
    if (await this.buscar(clase.idClase, key) == undefined) {
      this.clases.push(clase);
      await this.storage.set(key, this.clases);
      return true;
    }
    return false;
  }

  async eliminar(id: number, key: string): Promise<boolean> {
    this.clases = await this.storage.get(key) || [];
    for (let index = 0; index < this.clases.length; index++) {
      const cla = this.clases[index];
      if (cla.id === id) {
        this.clases.splice(index, 1);
        await this.storage.set(key, this.clases);
        return true;
      }
    }
    return false;
  }


  async listar(key: string): Promise<any> {
    this.clases = await this.storage.get(key) || [];
    return this.clases;
  }

  async buscar(id: number, key: string): Promise<any> {
    this.clases = await this.storage.get(key) || [];
    return this.clases.find(usu => usu.idClase == id);
  }

  async modificar(id: number, clase: any, key: string): Promise<boolean> {
    this.clases = await this.storage.get(key) || [];
    var posicion = this.clases.findIndex(usu => usu.id == id);
    if (posicion == -1) {
      return false;
    }
    this.clases[posicion] = clase;
    await this.storage.set(key, this.clases);
    return true;
  }

  async asignarId(key: string) {
    let clases = await this.storage.get(key) || [];
    let id = 1;
    // Encuentra el primer ID que no existe en la lista de usuarios
    while (clases.some((cla: any) => cla.idClase === id)) {
      id++;
    }
    return id;
  }

  async regAsis(idClase: number, idEstudiante: number, key: string) {
    let clases = await this.storage.get(key) || [];
    // Encuentra la clase con el idClase especificado
    let claseIndex = clases.findIndex((clase: any )=> clase.idClase == idClase);
    console.log(claseIndex)
    if (claseIndex != -1) {
      let clase = clases[claseIndex];
      
  
      // Verifica si el idEstudiante ya está registrado en la clase
      if (!clase.idEstudiantes.includes(idEstudiante)) {
        // El idEstudiante no está registrado, agrégalo a idEstudiantes de esa clase
        clase.idEstudiantes.push(idEstudiante);
  
        // Actualiza la clase en el Storage
        await this.storage.set(key, clases);
        return true; // Indica que se ha agregado el idEstudiante correctamente
      } else {
        // El idEstudiante ya está registrado en la clase
        console.log("Estudiante ya registrado")
        return false;
      }
    } else {
      // La clase no fue encontrada, devuelve false para indicar que no se ha agregado el idEstudiante
      console.log("Clase no encontrada")
      return false;
    }
  }
  
}
