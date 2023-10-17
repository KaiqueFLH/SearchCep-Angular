import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from '../pagina-inicial/pagina-inicial.component';
import { ResultadoCepComponent } from '../resultado-cep/resultado-cep.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ResultadoCepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
