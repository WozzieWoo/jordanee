import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariostorageService {

  usuarios: any[] = []
  estado_login: boolean = false;

  constructor(private storage:Storage, private router: Router,private toastController: ToastController) {

    storage.create();

   }

   //Métodos del crud:
  /*Comandos del storage:
    storage.create(): crea o me permite utilizar el storage.
    storage.get(KEY): obtener la información del storage. (select...)
    storage.set(KEY, VALOR): modificar o entregar valor al storage.
    storage.clear(): limpia el storage.
    storage.keys(): nombre de las llaves que tiene el storage.
    storage.length(): tamaño del storage.
  */
  
  //buscar: que buscar y donde buscarlo.
  

  async guardarUsuario(usuario: any) {
    // Agregar el usuario a la lista de usuarios almacenados
    this.usuarios = await this.storage.get('usuarios') || [];
    this.usuarios.push(usuario);

    // Guardar la lista actualizada en el Storage
    await this.storage.set('usuarios', this.usuarios);
  }

  async buscar(rut: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  //agregar: que agregar y donde agregarlo.
  async agregar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let usuarioEncontrado = await this.buscar(usuario.rut, key);
    if(usuarioEncontrado == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  //actualizar:
  async modificar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    if(index == -1){
      return false;
    }
    this.usuarios[index] = usuario;
    await this.storage.set(key, this.usuarios);
    return true;
  }

  //eliminar:
  async eliminar(rut: string, key: string): Promise<boolean>{
    var resp: boolean = false;
    this.usuarios = await this.storage.get(key) || [];
    this.usuarios.forEach((usuario, index) => {
      if(usuario.rut == rut){
        this.usuarios.splice(index,1);
        resp = true;
      }
    });
    await this.storage.set(key, this.usuarios);
    return resp;
  }

  //listar:
  async listar(key: string): Promise<any[]>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;
  }

  //método para loguear:
  async login(correo: string, clave: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usu => usu.email == correo && usu.clave == clave);
  }


  logout(){
    this.estado_login = false;
    
    this.router.navigate(['/login'])
    this.presentToast();
  }

  getEstadoLogin(){
    return this.estado_login;
  }
  setEstadoLogin(estado: boolean){
    this.estado_login = estado;   
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cierre de sesión exitoso', // Mensaje del Toast
      duration: 2000, // Duración en milisegundos
      position: 'bottom', // Posición del Toast (top, bottom, middle)
      color: 'success' // Color del Toast (success, warning, danger, etc.)
    });
    toast.present(); // Muestra el Toast
  }

}
