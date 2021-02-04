import { TicketStorageService } from './../Services/ticket-storage.service';
import { ITicketModel } from './../Models/ITicketModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserModel } from '../Models/IUserModel';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UserAccountType, Currency, UserAccountContext } from '../Enums/Enums';
import { AccountService } from './../Services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  //Input properties for tracking changes against and binding based on parent component context
  @Input() isBusy: boolean = false;
  @Input() formSuccess: boolean = false;
  @Input() formFailure: boolean = false;
  @Input() model = new IUserModel();
  @Input() myTickets: ITicketModel[];

  @Output() accountCreationEvent = new EventEmitter<boolean>();

  // set a local variable to this enum so we can traverse it for setting user-account title
  userAccountContext = UserAccountContext;

  enumKeys = Object.keys;
  accountTypes = UserAccountType;
  currencies = Currency;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService, private ticketService: TicketStorageService) {
    if(this.model === undefined || this.model == null){
      this.model = new IUserModel();
    }else{

      this.model = accountService.getUserAccount();
    }
    this.myTickets = ticketService.getAllFirebaseTicketsByEmail(this.model.email);
  }

  ngOnInit(): void {
  }


  async onSubmit(form:NgForm): Promise<void>{
    this.isBusy = true;
    if(this.model.accountContext === UserAccountContext.create) {
      this.model.isSocialUser = false;
      this.accountService.insertUserAccount(this.model)
      .then(()=> {
        this.accountService.setUserAccount(this.model);
        this.model.isAuthenticated = true;
        this.accountCreationEvent.emit(true)
        this.model = new IUserModel();
        form.reset();
        this.isBusy = false;
        this.displaySuccessToastMessage();
        this.router.navigate(['favorites'])
      }).catch((e) => {
        this.displayFailureToastMessage(e);
        this.isBusy = false;
      });
    }
    else if(this.model.accountContext === UserAccountContext.update) {

      await this.accountService.updateUserAccount(this.model)
      .then(()=> {
        this.accountCreationEvent.emit(false)
        this.isBusy = false;
        this.displaySuccessToastMessage();
      }).catch((e) => {
        this.displayFailureToastMessage(e);
        this.isBusy = false;
      });
    }

  }

  displaySuccessToastMessage = () => {
    this.toastr.success(this.model.accountContext + " successful.");
  }

  displayFailureToastMessage = (e) => {
    this.toastr.error(this.model.accountContext + " failed.");
  }

  onCancel(form: NgForm): void {
    this.accountCreationEvent.emit(false);

    if (this.model.accountContext == UserAccountContext.create){
      this.router.navigate(['login'])
    }
    else if (this.model.accountContext == UserAccountContext.update) {
      this.router.navigate(['favorites']);
    }
  }
}
