import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AsignaturaService } from './asignatura.service';

@Injectable({
  providedIn: 'root',
})
export class SeccionService {
  constructor(private storage: Storage, private asignaturaservice: AsignaturaService) {
    this.initStorage();
  }

  secciones: any[] = [
    {
      codSeccion: '004D',
      usuarios: [
        '16.666.666-6', // Rut de usuarios asignados a esta sección
        '15.324.543-4',
      ],
    },
    {
      codSeccion: '006D',
      usuarios: [
        '20.111.222-8',
      ],
    },
    // Agrega más secciones según tus necesidades
  ];
  
  
  private async initStorage() {
    await this.storage.create();
  }

  async agregarSeccion(codAsignatura: string, seccion: any): Promise<boolean> {
    const secciones = await this.storage.get(`secciones_${codAsignatura}`) || [];
    secciones.push(seccion);
    await this.storage.set(`secciones_${codAsignatura}`, secciones);
    return true;
  }

    /*async asignarUsuario(codAsignatura: string, codSeccion: string, usuario: any): Promise<boolean> {
    // Obtén las secciones de la asignatura desde el almacenamiento
    const seccionesString = await this.storage.get(`secciones_${codAsignatura}`) || '[]';
    const secciones = JSON.parse(seccionesString);
  
    // Busca la sección por su código
    const seccion = secciones.find((seccion) => seccion.codSeccion === codSeccion);
  
    if (seccion) {
      // Asegúrate de que la propiedad 'usuarios' esté definida como un arreglo
      seccion.usuarios = seccion.usuarios || [];
  
      // Agrega el usuario a la sección
      seccion.usuarios.push(usuario);
  
      // Convierte nuevamente las secciones a JSON y guárdalas en el almacenamiento
      const seccionesActualizadas = JSON.stringify(secciones);
      await this.storage.set(`secciones_${codAsignatura}`, seccionesActualizadas);
      return true;
    }
    return false;
  }*/
  

  async listarSecciones(codAsignatura: string): Promise<any[]> {
    return await this.storage.get(`secciones_${codAsignatura}`) || [];
  }
}
