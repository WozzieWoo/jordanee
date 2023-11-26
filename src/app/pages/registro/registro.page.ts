import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(2)]),
    fecha_nac: new FormControl('', [Validators.required, validarEdadMinima]),
    email: new FormControl('', [Validators.email, Validators.required]),
    perfil: new FormControl(''),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
    confirmarClave: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  usuarios: any[] = [];
  boton_modificar: boolean = true;
  tipoUsuario: string | null = null;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController,private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create(); // Crea la instancia de Storage
    this.usuarios = this.listar_usuarios();
  }
  

  public onChangeCorreo() {
    const correo = this.usuario.get('email')?.value;

    if (correo) {
      if (correo.endsWith('@duocuc.cl')) {
        this.usuario.get('perfil')?.setValue('alumno');
      } else if (correo.endsWith('@profesor.duoc.cl')) {
        this.usuario.get('perfil')?.setValue('docente');
      } else if (correo.endsWith('@duoc.cl')) {
        this.usuario.get('perfil')?.setValue('admin');
      } else {
        // Cambiar a un valor por defecto o mostrar un mensaje de error
      }
    }
  }

  public registrar() {
    const respuesta: boolean = this.usuarioService.agregar(this.usuario.value);
    if (respuesta) {
      this.mostrarToast("top", "Usuario Registrado!", 3000);
      this.usuario.reset();
      this.listar_usuarios();
  
      // Almacena la lista de usuarios en el almacenamiento local
      this.storage.set('usuarios', this.usuarioService.listar());
    }
    console.table(this.usuarioService.listar());
  }
  

  public listar_usuarios() {
    return this.usuarioService.listar();
  }

  public eliminar(rut_eliminar: string) {
    this.usuarioService.eliminar(rut_eliminar);
    this.mostrarToast('middle', "USUARIO ELIMINADO CON ÉXITO!", 3000);
    this.listar_usuarios();
  }

  public buscar(rut_buscar: string) {
    const usuario_encontrado: any = this.usuarioService.buscar(rut_buscar);
    this.usuario.setValue(usuario_encontrado);
    this.boton_modificar = false;
    document.getElementById("rut")?.setAttribute("disabled", "true");
  }

  public modificar() {
    const rut: string = this.usuario.controls.rut.value || '';
    this.usuarioService.modificar(rut, this.usuario.value);
    this.mostrarToast("bottom", "Usuario modificado!", 3000);
    this.usuario.reset();
    document.getElementById("rut")?.removeAttribute("disabled");
    this.boton_modificar = true;
  }

  async mostrarToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });

    await toast.present();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const clave = control.get('clave');
    const confirmarClave = control.get('confirmarClave');
  
    if (!clave || !confirmarClave) {
      return null;
    }
  
    if (clave.value !== confirmarClave.value) {
      confirmarClave.setErrors({ 'passwordMismatch': true }); // Establece el error en confirmarClave
      return { 'passwordMismatch': true };
    }
  
    return null;
  }

  // Método para verificar la validez del formulario
  public esFormularioValido(): boolean {
    return (
      this.usuario.valid &&
      this.usuario.get('confirmarClave')?.value === this.usuario.get('clave')?.value
    );
  }
}

function validarEdadMinima(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const fechaNacimiento = new Date(control.value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 17) {
      return { 'edadInvalida': true };
    }
  }
  return null;
}
