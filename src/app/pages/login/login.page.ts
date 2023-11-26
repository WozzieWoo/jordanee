import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { UsuariostorageService } from 'src/app/services/usuariostorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = "";
  clave: string = "";

  constructor(private router: Router, private usuStorage: UsuariostorageService) {}

  ngOnInit() {}

  /*async login() {
    // Obtén la lista de usuarios almacenados en el servicio
    const listaUsuarios: any[] = await this.usuStorage.listar('usuarios');
    
    // Busca el usuario por correo y clave
    const usuarioEncontrado = listaUsuarios.find(
      (usu) => usu.email === this.correo && usu.clave === this.clave
    );

    if (usuarioEncontrado) {
      this.usuStorage.setEstadoLogin(true);
      this.router.navigate(['/home'],{ replaceUrl: true });
    } else {
      console.log('Usuario no encontrado');
      alert("USUARIO O CONTRASEÑA INCORRECTOS!");
    }
  }*/

  async login(){
    const usuario_encontrado: any = await this.usuStorage.login(this.correo, this.clave, 'usuarios');
    if(usuario_encontrado != undefined){
      //ELEMENTO NUEVO PARA EL LOGIN:
      this.usuStorage.setEstadoLogin(true);
      var navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      };
      this.router.navigate(['/home'], navigationExtras);
    }else{
      alert("USUARIO O CLAVE NO EXISTE!");
    }
  }
}
