import { Component, Input, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';
import { MapaService } from '../services/mapa.service';

interface cepInterface {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ddd: string;
  [key: string]: string;

}
@Component({
  selector: 'app-resultado-cep',
  templateUrl: './resultado-cep.component.html',
  styleUrls: ['./resultado-cep.component.css']
})

export class ResultadoCepComponent implements OnInit {

  dado: any;

  cep: string="";
  logradouro: string="";
  complemento: string="";
  bairro: string="";
  localidade: string="";
  uf: string="";
  ddd: string="";

  cepData:cepInterface = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    ddd: ''
  }

  urlMapa!:string;
  coordinates!: { lat: any; lon: any; };
  

  // @Input()
  // cepPassado!: string;

  constructor(public cepService: CepService,public mapaService:MapaService) { }

  async ngOnInit(): Promise<void> {
    let url = window.location.href.substring(window.location.href.lastIndexOf('/'));
    url.length > 1 ? url = url.substring(1) : url = url;

    await this.retornaCep(url);
    await this.searchCoordinatesByCep()

  }

  async searchCoordinatesByCep() {
    this.mapaService.getCoordinatesByCep(this.cep).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[2];
        this.coordinates = {
          lat: firstResult.location.lat,
          lon: firstResult.location.lng
        };
        console.log(this.coordinates);
        
      } 
    });
  }

  async retornaCep(cepP: string) {
    

    this.cepService.getCep(cepP).subscribe((resposta: any) => {
      this.cepData = resposta;

      this.urlMapa = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7140.085510730014!2d-49.12212908123324!3d-26.518749357150956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de94a7e5f2e1cd%3A0x8e943b9531499bc1!2sR.%20Padre%20Alu%C3%ADsio%20Boeing%20-%20Barra%20do%20Rio%20Cerro%2C%20Jaragu%C3%A1%20do%20Sul%20-%20SC%2C%2089270000!5e0!3m2!1spt-BR!2sbr!4v1697760951342!5m2!1spt-BR!2sbr"

      for (const key in this.cepData) {
        if (Object.prototype.hasOwnProperty.call(this.cepData, key)) {
          if (this.cepData[key] == "" || undefined) {
            this.cepData[key] = "Não encontrado.";
          }
          
        }
      }

      this.dado = JSON.stringify(this.dado);
    });
    
     
     
    return this.dado;
  }

}
