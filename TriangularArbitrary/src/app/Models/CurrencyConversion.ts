
export class CurrencyConversionList {
  list:CurrencyConversion [];

  constructor(list:CurrencyConversion[]) {
    this.list = list;
  }
}



export class CurrencyConversion {
  fromCurrencyCode: String;
  fromCurrencyName: String;
  toCurrencyCode: Number;
  toCurrencyName: Number;
  exchangeRate : Number;
  lastRefreshed: String;
  timeZone: String;
  bidPrice:String;
  askPrice: Number;


  constructor(fromCurrencyCode: String, fromCurrencyName: String, toCurrencyCode: Number, toCurrencyName: Number,
    exchangeRate : Number, lastRefreshed: String, timeZone: String,bidPrice:String,
    askPrice: Number) {
      this.fromCurrencyCode = fromCurrencyCode;
      this.fromCurrencyName = fromCurrencyName;
      this.toCurrencyCode = toCurrencyCode;
      this.toCurrencyName = toCurrencyName;
      this.exchangeRate = exchangeRate;
      this.lastRefreshed = lastRefreshed;
      this.timeZone = timeZone;
      this.bidPrice = bidPrice;
      this.askPrice = askPrice;
  }
}
