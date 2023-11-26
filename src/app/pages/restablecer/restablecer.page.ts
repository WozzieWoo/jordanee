import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  correo: string = '';
  correoError: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private toastController: ToastController
  ) {}

  restablecerContrasena() {
    this.correoError = false;

    if (!this.correo || !this.validarCorreo(this.correo)) {
      this.correoError = true;
      return;
    }

    const usuario = this.usuarioService.buscarPorCorreo(this.correo);

    if (usuario) {
      // El correo está registrado, muestra un toast de éxito
      this.mostrarToast('top', 'Correo enviado con éxito', 3000,'success');
    } else {
      // El correo no está registrado, muestra un toast de error
      this.mostrarToast('top', 'Correo no registrado', 3000,'error');
    }
  }

  validarCorreo(correo: string): boolean {
    // Puedes implementar tu propia lógica de validación de correo aquí
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo);
  }

  async mostrarToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number, tipo?: 'success' | 'error') {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      cssClass: tipo === 'success' ? 'toast-success' : 'toast-error', // Aplica la clase CSS según el tipo de toast
    });
  
    await toast.present();
  }
  
}
