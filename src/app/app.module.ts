import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { QRCodeModule } from 'angularx-qrcode';
import { AsignaturaService } from './services/asignatura.service';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
             IonicModule.forRoot(),
              AppRoutingModule,
               IonicStorageModule.forRoot(),
               QRCodeModule,
               HttpClientModule,
               AngularFireModule.initializeApp(environment.firebaseConfig)
  
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
