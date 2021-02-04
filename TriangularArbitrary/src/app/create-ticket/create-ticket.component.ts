import { AccountService } from './../Services/account.service';
import { TicketStorageService } from './../Services/ticket-storage.service';
import { TicketTypes, TicketSeverityTypes, LocalStorageKeys } from './../Enums/Enums';
import { ITicketModel } from './../Models/ITicketModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  @Input() model: ITicketModel;
  @Input() Tickets = JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets)) as ITicketModel[];
  @Input() isBusy = false;
  @Input() formSubmitted = false;

  private ticketService: TicketStorageService;
  private accountService: AccountService;

  ticketTypes = TicketTypes;
  severityTypes = TicketSeverityTypes;
  enumKeys = Object.keys;

  constructor(ticketService: TicketStorageService, accountService: AccountService, private toastr: ToastrService) {
    this.model = new ITicketModel();
    this.ticketService = ticketService;
    this.accountService = accountService;
   }

  ngOnInit(): void {
  }

  // SubmitTicket to save the ITicketModel object to LocalStorage as a POC and then if we add Firebase, we'll set it there somehow
  SubmitTicket(form: NgForm): void {
    this.ticketService.saveTicket(this.model);
    this.Tickets = this.ticketService.getAllTickets();
  }

  // SubmitTicket to save the ITicketModle object to Firebase as a POC for firebase
  SubmitTicketFirebase(form: NgForm): any {
    // starts the loading spinner
    this.isBusy = true;
    var user = this.accountService.getUserAccount()
    this.ticketService.saveFirebaseTicket(this.model, user)
      .then(() => {
        this.model = new ITicketModel();
        form.reset();
        this.isBusy = false;
        this.formSubmitted = true;
      }).catch((e) => {
        this.toastr.error("Error ocurred attempting to submit ticket. Please try again later.");
        this.isBusy = false;
      });
  }
}
