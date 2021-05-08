import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { APP_ROUTE } from './app.routes';
import { NfDropFileDirective } from './directives/nf-drop-file.directive';


@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NfDropFileDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTE,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
