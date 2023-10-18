import { Component, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';

@Component({
  selector: 'app-resultado-cep',
  templateUrl: './resultado-cep.component.html',
  styleUrls: ['./resultado-cep.component.css']
})
export class ResultadoCepComponent implements OnInit {

  constructor(public cepService : CepService) { }

  ngOnInit(): void {
    this.cepService.getCep('01001000').subscribe((resposta: any) => {console.log(resposta);} );
  }

}
