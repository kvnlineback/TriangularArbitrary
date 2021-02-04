import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  keys = environment.alphaVantageAPIConfig.xRapidApiKeys;
  rotationCount = 0;
  keyIndex = 0;

 constructor(private http: HttpClient) { }

  getStocks(symbol: string) {
    var key: string = this.getKey();
    let headers = new HttpHeaders().set('x-rapidapi-host', environment.alphaVantageAPIConfig.xRapidApiHost)
                                  .set('x-rapidapi-key', key);
    try {
      return this.http.get("https://alpha-vantage.p.rapidapi.com/query?symbol=" + symbol + "&function=GLOBAL_QUOTE",{ headers });
    }
    catch (e) {
      throw new Error('Error occurred attempting to get stocks from AlphaVantage');
    }
  }

  getCurrencyExchange(to:string, from:string) {
    var key: string = this.getKey();
    let headers = new HttpHeaders().set('x-rapidapi-host',environment.alphaVantageAPIConfig.xRapidApiHost)
                                  .set('x-rapidapi-key', key);
    try {
      return this.http.get("https://alpha-vantage.p.rapidapi.com/query?function=CURRENCY_EXCHANGE_RATE&to_currency="+to+"&from_currency="+from, {headers});
    } catch(e) {
      throw new Error('Error ocurred attempting to get currency exchange rates from AlphaVantage');
    }
  }

  private getKey(): string {
    if(this.rotationCount === 5) {
      if(this.keyIndex === this.keys.length -1) {
          this.keyIndex = 0;
      }
      else {
          this.keyIndex = this.keyIndex + 1;
      }
      this.rotationCount = 0;
    }
    this.rotationCount = this.rotationCount + 1;
    return this.keys[this.keyIndex];
  }

}
