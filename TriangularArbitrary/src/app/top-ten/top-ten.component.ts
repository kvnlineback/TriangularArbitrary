import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageKeys } from '../Enums/Enums';
import { Movers, MoversList } from '../Models/Movers';
import { YahooFinanceService } from '../Services/yahoo-finance.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {

  @Input() isBusy: boolean = null;

  constructor(private serv: YahooFinanceService, private toastr: ToastrService) {}

  topten: Movers[] = [];

  ngOnInit(): void {
    this.topten=[];
    var list = this.getListFromStorage();
    if (list != null) this.topten=list.list;

  }

  getMovers() {
    this.topten=[];
    this.queryMovers();
  }

  addToArray(conversion:Movers) {
    if (this.topten.length<10) {
      this.topten.push(conversion);
      this.setListToStorage()
    }
  }

  queryMovers() {
    this.isBusy = true;
    this.serv.getMovers().subscribe (
      (response) => {
        let data:Object[] = response['quotes'];
        var i:number;
        data.forEach( (element) => {
          this.addToArray(new Movers(element['symbol'],
          element['shortName'],element['regularMarketPrice'],
          element['regularMarketChange'],element['regularMarketChangePercent'],
          element['fiftyTwoWeekRange']));
        });
        this.isBusy = null;
      },
      (error) => {
        if( error.status == 429) {
          this.toastr.info("Too many requests, please wait a minute before trying again.");
        }
        else {
          this.toastr.error("Error ocurred attempting to Generate new Top 10");
        }
        this.isBusy = null;
      });
  }

  getListFromStorage():MoversList {
    let list:MoversList = JSON.parse(localStorage.getItem(LocalStorageKeys.TopTen));
    return list;
  }

  setListToStorage() {
    let toSet:MoversList = new MoversList(this.topten);
    localStorage.setItem(LocalStorageKeys.TopTen, JSON.stringify(toSet));
  }
}
