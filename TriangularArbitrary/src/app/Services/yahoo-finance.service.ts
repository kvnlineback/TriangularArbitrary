import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   getMovers() {
    let headers = new HttpHeaders().set('x-rapidapi-host', environment.yahooAPIConfig.xRapidApiHost)
                                   .set('x-rapidapi-key', environment.yahooAPIConfig.xRapidApiKey);
    try {
      return this.http.get("https://yahoo-finance15.p.rapidapi.com/api/yahoo/mu/topmutualfunds?start=0", {headers});
    }
    catch(e) {
      throw new Error('Error ocurred attempting to get Movers from Yahoo Finance');
    }
  }


}
