export enum TicketSeverityTypes {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

export enum TicketTypes {
  AccountIssue = 'Account Issue',
  Bug = 'Bug'
}

export enum LocalStorageKeys {
  Tickets = 'Tickets',
  Accounts = 'Accounts',
  Favorites = 'Favorites',
  Conversions = 'Conversions',
  TopTen = 'TopTen'
}

export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  GBP = 'GBP',
  AUD = 'AUD',
  NZD = 'NZD',
  HKD = 'HKD',
  CHF = 'CHF',
  CAD = 'CAD'

}

export enum Cryptos {
  BTC = 'BTC',
  BNB = 'BNB',
  ETH = 'ETH',
  XRP = 'XRP',
  BCH = 'BCH',
  LTC = 'LTC'
}

export enum UserAccountType{
  Regular = 'Regular',
  PowerUser = 'Power User',
  Lucky = 'Lucky',
  Administrator = 'Administrator',
  FraudDetector = 'Fraud Detector',
  Undeclared = 'Undeclared'
}

export enum Currency{
  USD = 'USD',
  CAD = 'CAD',
  BitCoin = 'BitCoin',
  Undeclared = 'Undeclared'
}

export enum UserAccountContext {
  create = 'Create Account',
  update = 'Update Account'
}
