import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilesPageRoutingModule } from './perfiles-routing.module';

import { PerfilesPage } from './perfiles.page';

import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule aquí
    IonicModule,
    PerfilesPageRoutingModule
  ],
  declarations: [PerfilesPage]
})
export class PerfilesPageModule {}

