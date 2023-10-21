import { Component, Input, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';
import { MapaService } from '../services/mapa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resultado-cep',
  templateUrl: './resultado-cep.component.html',
  styleUrls: ['./resultado-cep.component.css']
})

export class ResultadoCepComponent implements OnInit {

  dado: any;

  lat: string = "";
  lon: string = "";

  cepData: any = {
    place_id: "",
    licence: "",
    lat: "",
    lon: "",
    classType: "",
    type: "",
    place_rank: "",
    importance: "",
    addressType: "",
    name: "",
    display_name: "",
    address: {
      suburb: "",
      town: "",
      municipality: "",
      postcode: "",
      region: "",
      state: "",
      ISO3166_2_lvl4: "",
      country: "",
      country_code: ""
    },
    boundingbox: []

  }

  urlMapa!: SafeResourceUrl;

  coordinates: any = {
    lat: "",
    lon: "",
    boundingbox: []
  };


  constructor(public cepService: CepService, public mapaService: MapaService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    let url = window.location.href.substring(window.location.href.lastIndexOf('/'));
    url.length > 1 ? url = url.substring(1) : url = url;

    await this.retornaCep(url);
    await this.searchCoordinatesByCep(url)

  }

  isCep(cep: string) {
    if (cep.length == 8 && cep.includes("-") == true) {
      return true;
    } else {
      return false;
    }
  }

  isLocalidade(localidade: string) {
    if (localidade.length > 8 && localidade.includes("-") == false) {
      return true;
    } else {
      return false;
    }
  }


  async searchCoordinatesByCep(cep: string) {
    this.mapaService.getCoordinates(cep).subscribe((resposta: any) => {
      this.coordinates.lat = resposta[0].lat;
      this.coordinates.lon = resposta[0].lon;
      this.coordinates.boundingbox = resposta[0].boundingbox.toString();

      const googleMapsUrl = `https://nominatim.openstreetmap.org/search?postalcode=${cep}`;

      this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
    });
  }

  async retornaCep(cep: string) {
    this.mapaService.getCoordinates(cep).subscribe((resposta: any) => {
      console.log(resposta);
      
      if (cep != undefined && cep != "") {
        if (cep != resposta[0].name) {
          alert("CEP não encontrado, revise a formatação e tente novamente.");
          window.location.href = "http://localhost:4200/";
        } else {
          this.cepData = resposta[0];

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
    return this.cepData;
  }

  //fazer aceitar outros parametros
}
