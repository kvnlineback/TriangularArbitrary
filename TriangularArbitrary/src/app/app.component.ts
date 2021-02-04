import { LocalStorageKeys, UserAccountContext } from './Enums/Enums';
import { Component, Input } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';


import { AccountService } from './Services/account.service';
import { IUserModel } from './Models/IUserModel';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Input properties to track changes against
  @Input() accountCreationClicked = false;
  @Input() account: IUserModel;

  title = 'TriangularArbitrary';
  localStorageKeys = Object.keys(LocalStorageKeys);
  showImage: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {

    // get account object for use authenticating and contextualizing the app
    this.getAppSessionAccount();

    // On Construction of the App Component,
    // get the localStorage Key/Value pair for storage (Could move pieces out to other components,
    // could remove if we use firebase or something else for storage)
    // Simply add the key to the LocalStorageKeys enum and set key/value where you need to it. (localStorage.setItem(...))
    // this.localStorageKeys.forEach(element => {
    //   localStorage.getItem(element);
    // });

    // Firebase initialization - takes the firebaseConfig constant that points to the TriangularArbitrary firebase app
    // and initializes its development functions for use
    let app = firebase.initializeApp(environment.firebaseConfig);

    //DEBUG without login
    // this.account.isAuthenticated = true;
  }

  signOut():void{

    if(this.account.isSocialUser) {
      this.accountService.signOut();
    }

    this.account = new IUserModel();
    this.account.isAuthenticated = false;
    this.accountCreationClicked = false;
    this.router.navigate(['login']).then(() => window.location.reload());
  }

  getAppSessionAccount():void {
    //Load up the user account for app use
    this.account = this.accountService.getUserAccount();
  }

  accountUpdateClicked(): void {
    this.account.accountContext = UserAccountContext.update;
    this.accountCreationClicked = false;
    this.router.navigate(['user-account']);
  }

  accountCreationEvent(e: boolean) {
    this.account.accountContext = UserAccountContext.create;
    this.accountCreationClicked = e;
  }


  userAuthEvent(e: boolean) {
    this.account.isAuthenticated = e;
  }

  handleTitleClick = () => {
    this.account?.isAuthenticated ? this.router.navigate(['favorites']) : this.router.navigate(['login']);
  }

}


