import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoAssetService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   getCrypto(symbol: string, currency: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', environment.cryptoAPIConfig.xApiKey)
      .set('x-api-secret', environment.cryptoAPIConfig.xApiSecret)
      .set('x-rapidapi-host', environment.cryptoAPIConfig.xApiRapidApiHost)
      .set('x-rapidapi-key',environment.cryptoAPIConfig.xRapidApiKey);

    return this.http.get("https://crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com/api/v1/exchanges/trades?exchange=Kraken&asset=BTC&denominator=USD",{ headers });
  }

}
