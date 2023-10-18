import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ResultadoCepComponent } from './resultado-cep/resultado-cep.component';

const routes: Routes = [
  {path:"inicial",component:PaginaInicialComponent},
  {path:"resultadoCep",component:ResultadoCepComponent},
  {path:"",redirectTo:"resultadoCep",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
