import { Component, Input, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';

@Component({
  selector: 'app-resultado-cep',
  templateUrl: './resultado-cep.component.html',
  styleUrls: ['./resultado-cep.component.css']
})
export class ResultadoCepComponent implements OnInit {

  dado: any;

  // @Input()
  // cepPassado!: string;

  constructor(public cepService: CepService) { }

  async ngOnInit(): Promise<void> {
    let url = window.location.href.substring(window.location.href.lastIndexOf('/'));
    url.length > 1 ? url = url.substring(1) : url = url;



    await this.retornaCep(url);

  }

  async retornaCep(cep: string) {
    this.cepService.getCep(cep).subscribe((resposta: any) => {
      this.dado = resposta;
    });

    return JSON.stringify(this.dado);
  }

}
