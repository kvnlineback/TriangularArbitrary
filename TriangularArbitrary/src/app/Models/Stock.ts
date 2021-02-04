export class Stock {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  prevClose: string
  change: string;
  changePercent: string;

  constructor(symbol: string,open: any,high: any,low: any,price: any,volume: any,latestTradingDay: any,prevClose: any,change: any,changePercent: any) {
    this.symbol= symbol;
    this.open = open;
    this.high = high;
    this.low = low;
    this.price = price;
    this.volume = volume;
    this.latestTradingDay = latestTradingDay;
    this.prevClose = prevClose;
    this.change = change;
    this.changePercent = changePercent;
  }
}
