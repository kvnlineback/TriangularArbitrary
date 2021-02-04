import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Currencies, LocalStorageKeys } from '../Enums/Enums';
import { CurrencyConversion, CurrencyConversionList } from '../Models/CurrencyConversion';
import { AlphaVantageService } from '../Services/alpha-vantage.service';


export class Money{
  fromCurrency: string;
  toCurrency: string;
}


@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  @Input() isBusy: boolean = null;

  constructor(private serv: AlphaVantageService, private toastr: ToastrService) {}

  conversions: CurrencyConversion[] = [];

  money = new Money;
  currencies:string[] = [
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'AUD',
    'NZD',
    'HKD',
    'CHF',
    'CAD'
  ];

  noData: string = '';
  conversionForm: FormGroup;


  ngOnInit(): void {
    this.conversionForm = new FormGroup({
      from: new FormControl(this.money.fromCurrency, [Validators.required]),
      to: new FormControl(this.money.toCurrency, [Validators.required])
    });


    var list:CurrencyConversionList = this.getFromStorage();
    if(list != null) this.conversions = list.list;

  }

  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  getFromStorage():CurrencyConversionList {
    let retrieved:CurrencyConversionList = JSON.parse(localStorage.getItem(LocalStorageKeys.Conversions));
    return retrieved;
  }

  setStorage() {
    let toSet:CurrencyConversionList = new CurrencyConversionList(this.conversions);
    localStorage.setItem(LocalStorageKeys.Conversions, JSON.stringify(toSet));
  }

  addToArray(conversion:CurrencyConversion) {
    if (this.conversions.length>=5) {
      this.conversions.shift();
    }
    this.conversions.push(conversion);
    this.setStorage();
  }

  getConversions():void {
    this.isBusy = true;
    this.serv.getCurrencyExchange(this.money.toCurrency,this.money.fromCurrency).subscribe
    (
      (response) => {

        let data = response['Realtime Currency Exchange Rate'];

        let newConversion = new CurrencyConversion(data['1. From_Currency Code'],data['2. From_Currency Name'],data['3. To_Currency Code'],
          data['4. To_Currency Name'],data['5. Exchange Rate'],data['6. Last Refreshed'],data['7. Time Zone'],data['8. Bid Price'],
          data['9. Ask Price']);
        this.addToArray(newConversion);
        this.isBusy = null;
      },
      (error) => {
        this.isBusy = null;
        this.toastr.info('Too many requests, please wait a minute before trying again.');
      }
    )
  }
}
