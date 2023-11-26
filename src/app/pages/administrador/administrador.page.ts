import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariostorageService } from 'src/app/services/usuariostorage.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})

export class AdministradorPage implements OnInit {
  secciones: any[] = [];
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    ap_paterno: new FormControl('', [Validators.required]),
    fecha_nac: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
    perfil: new FormControl('', [Validators.required]),
  });

  usuarios: any[] = [];
  KEY: string = 'usuarios';
  profesores: any[] = [];

  asignatura = new FormGroup({
    cod_asignatura: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    profesor: new FormControl('', [Validators.required]),
  });
  KEY_Asignaturas: string = 'asignaturas';
  asignaturas: any[] = [];

  asistenciaForm = new FormGroup({
    rutAlumno: new FormControl('', [Validators.required]),
  });

  asistencias: any[] = [];
  KEY_Asistencias: string = 'asistencias';

  constructor(
    private usuStorage: UsuariostorageService,
    private asignaturaService: AsignaturaService,
    private seccionService: SeccionService,
    private asistenciasService: AsistenciasService,
    private fireService: FirebaseService
  ) {}

  async ngOnInit() {
    
    await this.listarUsuarios();
    await this.listarAsignaturas();


    this.usuarios = this.usuarios.filter(
      (usuario) =>
        usuario.email.endsWith('@profesor.duoc.cl') || usuario.perfil === 'docente'
    );

    this.asignaturas = this.asignaturas.filter(
      (asignatura) => asignatura.profesor !== ''
    );
  }

  async listarUsuarios() {
    this.usuarios = await this.usuStorage.listar(this.KEY);
  }

  async guardarUsuario() {
    if (this.usuario.valid) {
      var resp: boolean = await this.usuStorage.agregar(this.usuario.value, this.KEY);
      if (resp) {
        this.fireService.agregar('Usuarios', this.usuario.value);
        alert('Usuario agregado!');
        await this.listarUsuarios();
      } else {
        alert('NO SE GUARDÓ!');
      }
    } else {
      alert(
        'El formulario de usuario no es válido. Por favor, complete todos los campos requeridos.'
      );
    }
  }

  async eliminarUsuario(rutEliminar: string) {
    await this.usuStorage.eliminar(rutEliminar, this.KEY);
    
    await this.listarUsuarios();
    alert('Usuario eliminado!');
  }

  

  async buscarUsuario(rutBuscar: string) {
    var usuarioEncontrado: any = await this.usuStorage.buscar(rutBuscar, this.KEY);
    this.usuario.setValue(usuarioEncontrado);
  }

  async modificarUsuario() {
    if (this.usuario.valid) {
      var resp: boolean = await this.usuStorage.modificar(this.usuario.value, this.KEY);
      if (resp) {
       
        alert('Usuario modificado!');
        await this.listarUsuarios();
      } else {
        alert('USUARIO NO EXISTE!');
      }
    } else {
      alert(
        'El formulario de usuario no es válido. Por favor, complete todos los campos requeridos.'
      );
    }
  }

  async listarAsignaturas() {
    this.asignaturas = await this.asignaturaService.listar();
  }

  async guardarAsignatura() {
    if (this.asignatura.valid) {
      const nuevaAsignatura = this.asignatura.value;

      var res: boolean = await this.asignaturaService.agregarAsignatura(nuevaAsignatura);

      if (res) {
        this.fireService.agregar('Asignaturas', this.asignatura.value);
        alert('Asignatura Agregada!');
      } else {
        alert('Asignatura NO Agregada!');
      }
    }
  }

  async modificarAsignatura() {
    if (this.asignatura.valid) {
      const asignaturaModificada = {
        cod_asignatura: this.asignatura.get('cod_asignatura')?.value,
        nombre: this.asignatura.get('nombre')?.value,
        profesor: this.asignatura.get('profesor')?.value,
      };

      const index = this.asignaturas.findIndex(
        (asignatura) => asignatura.cod_asignatura === asignaturaModificada.cod_asignatura
      );

      if (index !== -1) {
        this.asignaturas[index] = asignaturaModificada;
        const resp: boolean = await this.asignaturaService.modificar(asignaturaModificada);
        if (resp) {
          alert('Asignatura modificada!');
        } else {
          alert('Asignatura NO EXISTE!');
        }
      } else {
        alert('Asignatura NO EXISTE!');
      }
    } else {
      alert(
        'El formulario de asignatura no es válido. Por favor, complete todos los campos requeridos.'
      );
    }
  }

  async buscarAsignatura(codAsignatura: string) {
    const asignaturaEncontrada: any = await this.asignaturaService.buscar(codAsignatura);
    this.asignatura.setValue(asignaturaEncontrada);
  }

  async eliminarAsignatura(codAsignatura: string) {
    const index = this.asignaturas.findIndex(
      (asignatura) => asignatura.cod_asignatura === codAsignatura
    );

    if (index !== -1) {
      const resp: boolean = await this.asignaturaService.eliminarAsignatura(codAsignatura);

      if (resp) {
        this.asignaturas.splice(index, 1);
        this.asignaturaService.eliminarAsignatura(codAsignatura);
        alert('Asignatura eliminada!');
      } else {
        alert('Asignatura NO EXISTE!');
      }
    } else {
      alert('Asignatura NO EXISTE!');
    }
  }

  obtenerNombreProfesor(rutProfesor: string): string {
    const profesor = this.usuarios.find(usuario => usuario.rut === rutProfesor);
    return profesor ? profesor.nombre : 'Profesor no encontrado';
  }

  async modificarAsistencia() {
    // Agrega la lógica para modificar una asistencia aquí.
  }

  async buscarAsistencia(codigoAsistencia: string) {
    // Agrega la lógica para buscar una asistencia aquí.
  }

  
}

