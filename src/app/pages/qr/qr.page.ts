import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ClaseService } from 'src/app/services/clase.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  data: string = 'Porfavor espere a que su profesor empiece la clase';
  navigationExtras : NavigationExtras = {}
  asignaturaSeleccionada: string = "";
  KEYCLA: string = 'clases';
  KEYASI: string = 'asignaturas';
  asignaturas : any = []

  id = 0;
  constructor(private router: Router, private claseService : ClaseService,
     private asignaturasService : AsignaturaService,
      private activatedRoute: ActivatedRoute,
      private fireService: FirebaseService) { 

  }

  async ngOnInit() {
    this.id = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
    this.asignaturas = await this.asignaturasService.listar();
    this.asignaturas = this.asignaturas.filter( (a: any ) => a.profesorAsignatura == this.id);
  }

  volverHome() {
    this.router.navigate(['/home/perfil',], this.navigationExtras);
  }

  async generarClase(){
    
    let actualDate = new Date();
    let clase = {
      idClase: await this.claseService.asignarId(this.KEYCLA),
      fechaClase: actualDate.toLocaleDateString(),
      horaClase: actualDate.toLocaleTimeString(),
      cod_asignatura: this.asignaturaSeleccionada,
      idEstudiantes: []
    }
    await this.claseService.agregar(clase, this.KEYCLA)
    this.data = clase.idClase.toString();
    this.fireService.agregar('Clases',clase);
  }
}
