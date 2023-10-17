import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from 'src/pagina-inicial/pagina-inicial.component';
import { ResultadoCepComponent } from 'src/resultado-cep/resultado-cep.component';

const routes: Routes = [
  {path:"inicial",component:PaginaInicialComponent},
  {path:"resultadoCep",component:ResultadoCepComponent},
  {path:"",redirectTo:"inicial",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
