import { Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaService{

  
  constructor(private httpClient : HttpClient) { 

  }

  
  getCoordinates(param: string): Observable<any> {
    
    
    return this.httpClient.get(`https://nominatim.openstreetmap.org/search?postalcode=${param}&format=json&bounded=1&polygon=1&addressdetails=1`);
  }

    // let value = this.httpClient.get(this.apiURL).subscribe((resposta: any) => {return value;});
  

  
  
}