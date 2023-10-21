import { Component, Input, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';
import { MapaService } from '../services/mapa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

interface coordinatesInterface {
  lat: string;
  lon: string;
  boundingbox: string[];
  // [key: string]: string;
}
@Component({
  selector: 'app-resultado-cep',
  templateUrl: './resultado-cep.component.html',
  styleUrls: ['./resultado-cep.component.css']
})

export class ResultadoCepComponent implements OnInit {

  dado: any;

  cep: string = "";
  logradouro: string = "";
  complemento: string = "";
  bairro: string = "";
  localidade: string = "";
  uf: string = "";
  ddd: string = "";

  lat: string = "";
  lon: string = "";

  cepData: cepInterface = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    ddd: ''
  }

  urlMapa!: SafeResourceUrl;

  coordinates: coordinatesInterface = {
    lat: "",
    lon: "",
    boundingbox: []
  };


  // @Input()
  // cepPassado!: string;

  constructor(public cepService: CepService, public mapaService: MapaService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    let url = window.location.href.substring(window.location.href.lastIndexOf('/'));
    url.length > 1 ? url = url.substring(1) : url = url;

    await this.retornaCep(url);
    await this.searchCoordinatesByCep(url)

  }

  async searchCoordinatesByCep(cep: string) {
    this.mapaService.getCoordinatesByCep(cep).subscribe((resposta: any) => {
      this.coordinates.lat = resposta[0].lat;
      this.coordinates.lon = resposta[0].lon;
      this.coordinates.boundingbox = resposta[0].boundingbox.toString();
      // Construa a URL correta do Google Maps com base nas coordenadas
      const googleMapsUrl = `https://nominatim.openstreetmap.org/search?postalcode=${cep}`;
      // `https://www.openstreetmap.org/export/embed.html?bbox=${this.coordinates.boundingbox}&amp;layer=mapnik`;
      // Sanitize a URL para evitar erros de URL insegura
      this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
    });
  }

  async retornaCep(cep: string) {
    this.cepService.getCep(cep).subscribe((resposta: any) => {
      if (cep != undefined && cep != "") {
        if (cep != resposta.cep) {
          alert("CEP não encontrado, revise a formatação e tente novamente.");
          window.location.href = "http://localhost:4200/";
        } else {
          this.cepData = resposta;

          for (const key in this.cepData) {
            if (Object.prototype.hasOwnProperty.call(this.cepData, key)) {
              if (this.cepData[key] == "" || this.cepData[key] == undefined) {
                this.cepData[key] = "Não encontrado.";
              }

            }
          }

        }

      }

    });
    return this.cepData.cep;
  }

  
  //fazer aceitar outros parametros



}
