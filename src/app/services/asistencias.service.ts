import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AsignaturaService } from './asignatura.service';

@Injectable({
  providedIn: 'root',
})
export class AsistenciasService {
  constructor(private storage: Storage, private asignaturaService: AsignaturaService) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();

    
  }

  async crearAsistencia() {
    // Recuperar las asistencias existentes del almacenamiento local
    const asistencias = await this.storage.get('asistencias') || [];
  
    // Obtener el código de asignatura del servicio de asignaturas
    const codAsignatura = this.asignaturaService.codigosAsignaturas[0]; // Asegúrate de obtener el código de asignatura correcto
  
    // Determina el nuevo código de asistencia
    let nuevoCodigo = 1;
  
    if (asistencias.length > 0) {
      const ultimaAsistencia = asistencias[asistencias.length - 1];
      nuevoCodigo = ultimaAsistencia.codigo + 1;
    }
  
    // Crea un nuevo objeto de asistencia
    const nuevaAsistencia = {
      codigo: nuevoCodigo,
      fecha: new Date(),
      cod_asignatura: codAsignatura,
      alumnos: [],
    };
  
    // Agrega la nueva asistencia al arreglo
    asistencias.push(nuevaAsistencia);
  
    // Almacena el arreglo de asistencias actualizado en el almacenamiento local
    await this.storage.set('asistencias', asistencias);
  
    // Agrega console.log para ver lo que está ocurriendo
    console.log('Nueva asistencia creada:', nuevaAsistencia);
    console.log('Asistencias almacenadas:', asistencias);
  
    // Devuelve la nueva asistencia
    return nuevaAsistencia;
  }

  async obtenerAsistencias(): Promise<any[]> {
    const asistencias = await this.storage.get('asistencias');
    return asistencias || [];
  }

  listarAsistencias() {
    // Implementa la lógica para listar asistencias aquí
  }


 

}
