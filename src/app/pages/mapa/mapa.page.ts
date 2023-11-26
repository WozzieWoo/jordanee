import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  //2. variables locales para controlar el mapa:
  map: any;
  marker: any;

  constructor() { }

  async ngOnInit(){
    await this.cargarMapa();
    this.autocompletarInput(this.map, this.marker);
  }
  //3. métodos que trabajen el mapa:
  async cargarMapa(){
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa,{
      center: {lat: -33.598421249370794,lng: -70.5790710037652},
      zoom: 18
    });

     

    this.marker = new google.maps.Marker({
      position: {lat: -33.598421249370794,lng: -70.5790710037652},
      map: this.map,
      title: 'Ubicación inicial'
    });
  }

  async autocompletarInput(mapaLocal:any, marcadorLocal: any){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds', this.map);
  }

}
