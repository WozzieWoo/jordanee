import { Component, OnInit } from '@angular/core';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { ActivatedRoute, Router } from '@angular/router'; // Asegúrate de importar ActivatedRoute también

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asistencias: any[] = [];

  constructor(
    private asistenciasService: AsistenciasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.asistenciasService.obtenerAsistencias().then(asistencias => {
      this.asistencias = asistencias;
    });
  }

  async obtenerAsistencias() {
    this.asistencias = await this.asistenciasService.obtenerAsistencias();
    console.log('Asistencias:', this.asistencias);
  }

  goToAsistencias(codAsignatura: string) {
    console.log('Navigating to /asistencias/' + codAsignatura);
    this.router.navigate(['/asistencias', codAsignatura], { relativeTo: this.route });
  }

  generarAsistencia(codigoAsignatura: string, nombreAsignatura: string, nombreProfesor: string) {
    // Genera la asistencia y obtén el código
    const codigoAsistencia = 1; // Debes obtener el código real de alguna manera
  
    // Navega a la página QR sin exponer los parámetros en la URL
    this.router.navigate(['/qr'], {
      state: {
        
        cod_asignatura: codigoAsignatura,
        nombre: nombreAsignatura,
        nombre_profesor: nombreProfesor,
        codigo: codigoAsistencia,
      },
    });
  }
}
