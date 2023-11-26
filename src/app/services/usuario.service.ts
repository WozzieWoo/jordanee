import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: any[] = [
    {
      rut: '16.666.666-6',
      nombre: 'Lucifer',
      ap_paterno: 'De Nazareth',
      fecha_nac: '2001-08-29',
      email: 'lucifer@duoc.cl',
      clave: 'AAAsss666',
      perfil: 'admin'
    },
    {
      rut: '15.324.543-4',
      nombre: 'freddy',
      ap_paterno: 'mercurio',
      fecha_nac: '2004-08-29',
      email: 'freddy@profesor.duoc.cl',
      clave: 'AAAsss666',
      perfil: 'docente'
    },
    {
      rut: '20.111.222-8',
      nombre: 'jordan',
      ap_paterno: 'rodriguez',
      fecha_nac: '2001-08-29',
      email: 'jord@duocuc.cl',
      clave: 'AAAsss666',
      perfil: 'alumno'
    }
  ];

  constructor() {}

  agregar(usuario: any): boolean {
    if (this.buscar(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminar(rut: string) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }

  listar() {
    return this.usuarios;
  }

  buscar(rut: string) {
    return this.usuarios.find(usu => usu.rut == rut);
  }

  modificar(rut: string, usuario: any) {
    var posicion = this.usuarios.findIndex(usu => usu.rut == rut);
    this.usuarios[posicion] = usuario;
  }

  buscarPorCorreo(correo: string): any | null {
    return this.usuarios.find((usuario) => usuario.email === correo) || null;
  }
}
