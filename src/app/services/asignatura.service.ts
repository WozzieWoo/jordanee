import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
  asignaturas: any[] = [];
  codigosAsignaturas: string[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    
    await this.storage.create();
  }

  async buscar(codAsignatura: string): Promise<any> {
    this.asignaturas = await this.storage.get('asignaturas') || [];
    return this.asignaturas.find(asignatura => asignatura.cod_asignatura === codAsignatura);
  }

  async agregarAsignatura(asignatura: any): Promise<boolean> {
    this.asignaturas = await this.storage.get('asignaturas') || [];
    const asignaturaEncontrada = await this.buscar(asignatura.cod_asignatura);
    if (!asignaturaEncontrada) {
      this.asignaturas.push(asignatura);
      await this.storage.set('asignaturas', this.asignaturas);
      return true;
    }
    return false;
  }

  async modificar(asignatura: any): Promise<boolean> {
    this.asignaturas = await this.storage.get('asignaturas') || [];
    const index = this.asignaturas.findIndex(a => a.cod_asignatura === asignatura.cod_asignatura);
    if (index !== -1) {
      this.asignaturas[index] = asignatura;
      await this.storage.set('asignaturas', this.asignaturas);
      return true;
    }
    return false;
  }

  async eliminarAsignatura(codAsignatura: string): Promise<boolean> {
    this.asignaturas = await this.storage.get('asignaturas') || [];
    const index = this.asignaturas.findIndex(a => a.cod_asignatura === codAsignatura);
    if (index !== -1) {
      this.asignaturas.splice(index, 1);
      await this.storage.set('asignaturas', this.asignaturas);
      return true;
    }
    return false;
  }

  async listar(): Promise<any[]> {
    this.asignaturas = await this.storage.get('asignaturas') || [];
    return this.asignaturas;
  }

  // Método auxiliar para actualizar las asignaturas en el almacenamiento
  private async actualizarAsignaturasEnStorage() {
    await this.storage.set('asignaturas', this.asignaturas);
  }
}
