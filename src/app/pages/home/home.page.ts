import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { UsuariostorageService } from 'src/app/services/usuariostorage.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';

interface Character {
  id: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  subjects: any[] = [];
  tipo_usuario: string = "";
  isAdmin: boolean = false;
  isProfesor: boolean = false;
  isAlumno: boolean = false;
  usuario: any;
  secciones: any [] = [];
  asignaturas: any[] = [];
  characters: Character[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private asignaturaService: AsignaturaService,
    private usuStorage: UsuariostorageService,
    private seccionService: SeccionService,
    private asistencia: AsistenciasService,
    private http: HttpClient,
    private fireService: FirebaseService
  ) {}

  async ngOnInit() {
    
    this.listar();

    this.loadCharacters();

    interface Character {
      id: number;
      image: string;
    }

    
    
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    //sobrescribo el usuario con la propiedad .user del usuario que viaja con navigationExtras
    this.usuario = this.usuario.user;

    // Obtener la información del usuario autenticado desde el localStorage
    const usuarioAutenticado = this.usuStorage.getEstadoLogin()

    console.log(usuarioAutenticado)

    if (usuarioAutenticado) {

      // Establecer tipo_usuario según el perfil del usuario
      if (this.usuario.perfil === 'alumno') {
        this.tipo_usuario = 'Alumno';
      } else if (this.usuario.perfil === 'docente') {
        this.tipo_usuario = 'Profesor';
      } else if (this.usuario.perfil === 'admin') {
        this.tipo_usuario = 'Admin';
      }
    }
    
    //llamar a asignaturasService y cargar la lista de asignaturas

      this.asignaturas = await this.asignaturaService.listar();
      this.asignaturas = this.asignaturas.filter(asignatura => asignatura.profesor === this.usuario.rut);
    
    //la filtra filter.()


    for (let a of this.asignaturas) {
      var subject: any = {
        img: 'assets/img/calidadsoftware.png',
        nombre: '',
        cod_asignatura: '',
        nombre_profesor: '',
      };
      subject.nombre = a.nombre;
      subject.cod_asignatura = a.cod_asignatura;
      subject.nombre_profesor = a.nombre_profesor; // Agrega el nombre del profesor
      this.subjects.push(subject);
    }
  }

 agregar(){
  this.fireService.agregar('Usuarios', this.usuario);
 }

 listar(){
  this.fireService.getDatos('Usuarios')?.subscribe(
    data => {
      this.usuario = [];
      for(let usuario of data){
        console.log(usuario.payload.doc.data());
        let usu: any = usuario.payload.doc.data();
        usu['id'] = usuario.payload.doc.id;
        this.usuario.push(usu);
      }
    }
  )
 }

  logout() {
    // Realiza la lógica de cierre de sesión aquí
    // ...
  
    // Llama a la función para mostrar el Toast
  
  
    // Redirige al usuario a la página de inicio de sesión u otra página según tu flujo de la aplicación
    this.router.navigate(['/inicio'],{ replaceUrl: true });
  }
  

  goToSubject(){

  }

  goToAsistencias(codAsignatura: string) {
    // Navega a la página de asistencias con el código de asignatura como parámetro
    this.router.navigate(['/asistencias', codAsignatura]);
  }

  loadCharacters() {
    this.http.get('https://rickandmortyapi.com/api/character')
      .subscribe((data: any) => {
        this.characters = data.results;
        console.log(this.characters); // Agrega esta línea
      });
  }

getCharacterImage(): string {
  if (this.tipo_usuario === 'Profesor') {
    const rick = this.characters.find(character => character.id === 1);
    return rick ? `url(${rick.image})` : 'url(default-image-url-profesor.jpg';
  } else if (this.tipo_usuario === 'Alumno') {
    const morty = this.characters.find(character => character.id === 2);
    return morty ? `url(${morty.image})` : 'url(default-image-url-alumno.jpg)';
  } else if (this.tipo_usuario === 'Admin') {
    const otroPersonaje = this.characters.find(character => character.id === 3);
    return otroPersonaje ? `url(${otroPersonaje.image})` : 'url(default-image-url-admin.jpg)';
  }
  return 'url(default-image-url.jpg)';
}

onButtonClick(codigoAsignatura: string) {
  // Aquí puedes hacer algo cuando se hace clic en un botón
  console.log('Botón hace clic con el código de asignatura:', codigoAsignatura);
}



  
}  

  