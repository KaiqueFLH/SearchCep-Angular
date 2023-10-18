import { Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService{

  
  constructor(private httpClient : HttpClient) { 

  }

  
  getCep(cep:string):Observable<string>{
    const apiURL = 'https://viacep.com.br/ws/'+cep+'/json/';
    
    return this.httpClient.get<any>(apiURL);
  }

    // let value = this.httpClient.get(this.apiURL).subscribe((resposta: any) => {return value;});
  

  
  
}
