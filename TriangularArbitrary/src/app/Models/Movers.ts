

export class MoversWithTimestamp {
  timestamp:Date;
  list:Movers [];

  constructor(timestamp:Date, list:Movers[]) {
    this.timestamp = timestamp;
    this.list = list;
  }
}

export class MoversList {
  list:Movers[];
  constructor(list:Movers[]) {
    this.list=list;
  }
}


export class Movers {
  symbol:string;
  shortName:string;
  regularMarketPrice:number;
  regularMarketChange:number;
  regularMarketChangePercent:number;
  fiftyTwoWeekRange:string;


  constructor(symbol:string, shortName:string,
    regularMarketPrice:number, regularMarketChange:number,
    regularMarketChangePercent:number, fiftyTwoWeekRange:string) {
    this.symbol=symbol;
    this.shortName=shortName;
    this.regularMarketPrice=regularMarketPrice;
    this.regularMarketChange=regularMarketChange;
    this.regularMarketChangePercent=regularMarketChangePercent;
    this.fiftyTwoWeekRange=fiftyTwoWeekRange;

  }
}
