import { Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaService{

  
  constructor(private httpClient : HttpClient) { 

  }

  
  getCoordinatesByCep(cep: string) {
    const apiUrl = "https://nominatim.openstreetmap.org/search?postalcode="+cep+"&format=json&bounded=1&polygon=1&addressdetails=1";
    
    return this.httpClient.get(apiUrl);
  }

    // let value = this.httpClient.get(this.apiURL).subscribe((resposta: any) => {return value;});
  

  
  
}